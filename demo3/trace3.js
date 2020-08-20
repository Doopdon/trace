function traceInit(__scope){
////////////////////////////WRAPPERS//////////////////////////////
    //base class for wrapper objects Wrappers are not to be used directly by the user.
    class Wrapper{
        constructor(){
            this.onRenderFunction = null;//this is the default value for the 'onRenderFunction' which is called when the element is added
            this.hidden = false;
        }
        addChild(childWrapper){//when a child element is added it kept in the 'childWrapper' list
            this.childWrappers.push(childWrapper)
        }
        removeChild(childWrapper){//when an element is removed, it needs to be removed from the 'childWrapper' list as well as from the HTML
            this.childWrappers = this.childWrappers.filter(x=>x !== childWrapper);
        }
        onRenderEvent(){//when the element is added to the dom, call this function, pas in the element and the wrapper to the function (that way the user has access to the element reference)
            this.onRenderFunction && this.onRenderFunction(this.$element,this);
        }
        onRender(onRenderFunction){//this is the call that adds an 'onRenderFunction' is added to the wrapper
            this.onRenderFunction = onRenderFunction;
            delete this.onRender; //TODO see if I can get rid of this. 76767
        }
    }

    //Element wrapper holds a reference to an HTML element, and to its parent and child element wrappers.
    class ElementWrapper extends Wrapper{
        constructor(renderFunction){
            super();
            this.renderFunction = renderFunction;//each element wrapper has a render function that creates an element
            this.$element = null;//The created element is stored here 
            this.childWrappers = [];//Holds a list of all the chid element wrappers so traversal can happen.
        }    
        update(){//1234 when something is changed, the render function needs to be re run.
            if(!document.contains(this.$parent)) return false;//if the parent is not on the document the wrapper needs to be removed from memory. (false indicates it is not on the dom)
            this.parentWrapper.removeChild(this);//additional processing needs to happen when a wrapper is deleted. so the base.removeChild function is called.
            this.render(this.$parent,this.parentWrapper);//
            return true;
        }
        render($parent,parentWrapper){//takes a parent element and parent wrapper (list wrapper does not contain an element. it does have a parent element.)
            if(this.__hidden) return;
            this.$parent = $parent;
            this.parentWrapper = parentWrapper;//set the parent and parent wrapper for this wrapper
            parentWrapper && parentWrapper.addChild(this);//add itself to the parents children
            let $element = this.renderFunction($parent,this);//use the render function to generate an element and insert it into the parent
            if(!this.$element) $parent.appendChild($element);//if a rendered element does not exist, simply append it to the parent
            else{//if there is a referenced element, 
                $parent.insertBefore($element,this.$element);//the new element needs to be appended before the old one
                $parent.removeChild(this.$element);//remove the old element
            }
            return (this.$element = $element);//set the element reference to the new element todo 2232 see if I can get rid of the return
        }
        unRender(){
            this.hidden = true;
            this.$parent.removeChild(this.$element);
            this.$element = null;
        }
        reRender(){
            this.hidden = false;
            this.update();
        }
    }
    //List wrappers do not hold an element reference, just a parent. They reuse the given render function for each item in the renderProps parameter
    class ElementWrapperList extends Wrapper{
        constructor(renderFunction,renderProps){
            super();
            this.renderFunction = renderFunction;//set the render function for this list
            this.__initialChildWrappers = renderProps.map(x=>x.display(renderFunction));//get every wrapper for each render prop.
            this.childWrappers = [];//holds a reference to all the child wrappers in the list
        }
        __getFooterElement(){//finds the first element no in the list, so elements can be inserted before it
            let foundSelf = false;
            let $foundElement;
            this.parentWrapper.childWrappers.find(x=>{//find this wrapper reference in the parents children
                if(foundSelf) return !!($foundElement = x.$element)//if the self has been found return the next wrapper
                if(x === this) foundSelf = true; return false;//if the current wrapper is self, then set found self to true, return false, the next element is the element after
            })
            return $foundElement;//return the found element if it exists
        }
        get $element(){//return the first element, if it exists
            return this.childWrappers[0] && this.childWrappers[0].$element;
        }
        insertAt(index,renderProp){//insert an item (render prop) at the given index
            let $element = this.childWrappers[index] && this.childWrappers[index].$element || this.__getFooterElement()//find the element at the index, or find the footer if there is none.
            let newWrapper = renderProp.display(this.renderFunction);//create a new wrapper with the renderFunction
            let $newElement = newWrapper.render(this.$parent,this);//hand in the parent, and render the element. hand in the reference to the list (this) so the parent wrapper can be set.
            this.childWrappers.splice(index,0,this.childWrappers.pop());//the wrapper needs to be inserted into the list, but its already at the end, so its popped off and then inserted
            $element && this.$parent.insertBefore($newElement,$element) || this.$parent.appendChild($newElement)//if the footer element exists append before it, or just append to the parent
        }
        deleteAt(index){//
            let $elementToDelete = this.childWrappers[index] && this.childWrappers[index].$element;
            if(!$elementToDelete) throw {message:`ERROR: Cannot delete element because none was found at index [${index}].`,invalidObject:this.childWrappers}
            this.childWrappers.splice(index,1);
            this.$parent.removeChild($elementToDelete);
        }
        move(sourceIndex,destIndex){        
            var sourceWrapper = this.childWrappers[sourceIndex];
            this.$parent.appendChild(sourceWrapper.$element);
            this.$parent.insertBefore(sourceWrapper.$element,this.childWrappers[destIndex].$element)
            this.childWrappers.splice(sourceIndex,1)
            this.childWrappers.splice(destIndex,0,sourceWrapper);
        }
        render($parent,parentWrapper){
            this.$parent = $parent;
            this.parentWrapper = parentWrapper;
            parentWrapper && parentWrapper.addChild(this);
            this.__initialChildWrappers.forEach(x=>x.render($parent,this))
        }
    }
    ///////////////////////////////AttributeInserts//////////////////
    class AttributeInsert{
        constructor(renderFunction,rProp){
            this.renderFunction = renderFunction || (x=>x);
            this.rProp = rProp;
        }
        update(){
            if(!this.$element) return;
            let val = this.renderFunction(this.rProp.get(),this.rProp)
            if(this.atrName === 'innerHTML') 
                return (this.$element.innerHTML = val)
            this.$element.setAttribute(this.atrName,val)
        }
        generateAttribute(atrName,$element){
            this.$element =  $element
            this.atrName =  atrName;
            this.update();
        }
    }

    ///////////////////////////////Props/////////////////////////////
    class Prop{
        constructor(){
            this.attributeInserts = [];
            this.changeEvents = [];
            this.__hidden = false;
        }
        atr(renderFunction){
            let atrInsert = new AttributeInsert(renderFunction,this);
            this.attributeInserts.push(atrInsert);
            return atrInsert;
        }
        __changeEvent(info){
            this.attributeInserts.forEach(x=>x.update())
            this.changeEvents.forEach(x=>x(info));
        }
        onChange(event){
            this.changeEvents.push(event);
        }
        removeOnChange(event){
            this.changeEvents = this.changeEvents.filter(x=>x !== event);
        }
        display(renderFunction){
            if(renderFunction instanceof Wrapper) 
                throw {message: `ERROR: Cannot pass an "Element Wrapper" into display(), it must be a function ex: prop.display(x=>h1('text')) not prop.display(h1('text'))`, invalidObj:renderFunction}
            if(typeof renderFunction !== 'function') 
                throw {message:'ERROR: Display must receive a function',invalidObject:renderFunction}
        }
        update(updateFunction){
            updateFunction = updateFunction || (x=>x)
            this.set(updateFunction(this.get()));
        }
        getObjectValue(){}//todo
        static toRenderProp(){}
    }

    class RenderProp extends Prop{
        constructor(value){
            super();
            this.value = value
            this.wrappers = [];
        }
        set(value){
            this.value = value;
            this.wrappers = this.wrappers.filter(x=>x.update())
            this.__changeEvent({type:'value-set',prop:this,value})
        }
        get(){return this.value}
        display(renderFunction){
            super.display(renderFunction);
            let newWrapper = new ElementWrapper((p,ref)=>renderFunction(this.value,this).render(p,ref))
            this.wrappers.push(newWrapper);
            return newWrapper;
        }
    }

    class RenderListProp extends RenderProp{
        constructor(value,parent){
            super(value);
            this.parentRenderList = parent;
            this.__id = parent.idItr++;
        }
        delete(){
            this.parentRenderList.deleteAt(this.getIndex())
        }
        move(index){
            this.parentRenderList.move(this.getIndex(),index)
        }
        getIndex(){
            //return this.parentRenderList.__idMap[this.__id];
            let ind;
            this.parentRenderList.renderProps.find((x,i)=>x===this && (ind = i));
            return ind;
        }
    }

    class RenderList extends Prop{
        constructor(values){
            super();
            this.idItr = 0;
            this.renderProps = values.map(x=>new RenderListProp(x,this));
            this.__mapIndexes();
            this.listWrappers = [];
        }
        get(){
            return this.renderProps.map(x=>x.value);
        }
        set(newArray){
            this.renderProps.forEach(()=>this.deleteAt(0,false))
            newArray.forEach(x=>this.insertAt(0,x,false))
            this.__mapIndexes();
        }
        display(renderFunction){
            super.display(renderFunction);
            let listWrapper = new ElementWrapperList(renderFunction,this.renderProps )
            this.listWrappers.push(listWrapper)
            return listWrapper
        }
        push(value){
            this.insertAt(this.renderProps.length,value)
        }
        unshift(value){
            this.insertAt(0,value)
        }
        insertAt(index,value,__remap = true){
            index = Math.min(index,this.renderProps.length);
            let rProp = new RenderListProp(value,this)
            this.listWrappers.forEach(x=>x.insertAt(index,rProp))
            this.renderProps.splice(index,0,rProp);
            __remap && this.__mapIndexes();
            this.__changeEvent({type:'index-inserted',prop:this,index,value})
        }
        pop(){
            return this.deleteAt(this.renderProps.length-1)
        }
        shift(){
            return this.deleteAt(0)
        }
        deleteAt(index, __remap = true){
            this.listWrappers.forEach(x=>x.deleteAt(index))
            let val = this.renderProps[index].get();
            this.renderProps.splice(index,1);
            __remap && this.__mapIndexes();
            this.__changeEvent({type:'index-deleted',prop:this,index})
            return val;
        }
        move(sourceIndex,destIndex,__remap=true){
            console.warn('need to add source, dest index bounds checks')
            if(sourceIndex === destIndex) return;//no need to continue, the item is where it should be.
            var val = this.renderProps[sourceIndex];
            this.renderProps.splice(sourceIndex,1)
            this.renderProps.splice(destIndex,0,val);
            this.listWrappers.forEach(x=>x.move(sourceIndex,destIndex));
            __remap && this.__mapIndexes();
            this.__changeEvent({type:'index-moved',prop:this,sourceIndex,destIndex})
        }
        sortOn(propGetter,reverse){//todo test this
            if(!['undefined','null','boolean'].includes(typeof reverse)) throw `reverse parameter must be type bool, instead received: '${typeof reverse}'`
            if(typeof propGetter === 'string') 
                return this.sort((x,y)=>this.__betterSort(x[propGetter],y[propGetter],reverse));
            if(typeof propGetter === 'function')
                return this.sort((x,y,rx,ry)=>this.__betterSort(propGetter(x,rx),propGetter(y,ry),reverse))
            throw {message:`sortOn requires either a string or function as its argument, instead it received ${typeof propGetter}`,invalidObj:propGetter}
        }
        sort(sortFunction){        
            if(this.renderProps.length <= 1)return//do not sort lists with 1 or less items
            sortFunction = sortFunction || this.__betterSort;//set the sort function to the parameter, or the custom sort function 'betterSort'
            var renderPropCopy = [...this.renderProps];//copy the render prop array, so that items can be sorted but not affect the order (yet)
            renderPropCopy.sort((a,b)=>sortFunction(a.value,b.value));//sort the render props, use the value 
            renderPropCopy.forEach(renderProp => renderProp.move(0,false))//move all the render props, 1 by 1 to the first position. This will re-order the list.
            this.__mapIndexes();//re map the indexes so the items can be looked up
            this.__changeEvent({type:'sorted',prop:this,sortFunction})//trigger the change event.
        }
        removeWhen(removeFunction){
            let deleteList = [];
            this.renderProps.forEach(x=>{
                if(removeFunction(x.value)) deleteList.push(x)
            });
            deleteList.forEach(renderProp => renderProp.delete());
        }
        __betterSort(x,y,reverse){
            reverse = reverse? 1 : -1//if reverse is true, set it to 1 otherwise -1. Multiply the result by reverse to reverse the order (if the value is -1)
            if(x === y) return 0; //if the values are the same, return 0 (do nothing)
            if(isNaN(x)  && !isNaN(y)) return 1*reverse;//if x is a number but 1 is not x is first
            if(isNaN(y)  && !isNaN(x)) return -1*reverse;//if y is a number but x is not y is first
            if(!isNaN(x)) x=x*1;//turn string like numbers into real numbers
            if(!isNaN(y)) y=y*1;//same
            return x > y? 1*reverse:-1*reverse;//this will actually sort the list backwards, but that is because it gets rendered backwards, so it reverses the reverse.
        }
        __mapIndexes(){
            this.__idMap = {};//clear the id map
            this.renderProps.forEach((rp,i)=>{//go through each item
                this.__idMap[rp.__id] = i//set the map at the 'id' index to the position in the list
            })
        }
    }

    ///////////////////FUNCTION GENERATION///////////////////////
    function generateElement(elementType,param1,param2,toMany){
        if(toMany) throw {message:`ERROR: ${elementType}(), contained too many parameters`,invalidObj:toMany};
        var attributes = param2 != null ? param1 : null;
        var content = param2 != null ? param2 : param1
        return new ElementWrapper(createElement)
        function createElement(intentionallyUnused,elementWrapperRef){
            let $element = document.createElement(elementType);
            applyContent(content);
            applyAttributes(attributes)
            return $element;
            function applyContent(content){
                if(content == null) return
                if(Array.isArray(content)) 
                    return content.forEach(x=>applyContent(x))
                if(content instanceof Wrapper)
                    return content.render($element,elementWrapperRef)
                if(content instanceof Element)
                    return $element.appendChild(content);
                $element.innerHTML+= content.toString();
            }
            function applyAttributes(attributes){
                if(attributes == null) return;
                if(attributes instanceof Wrapper) 
                    throw {message:`ERROR: cannot use "Element Wrapper" as attribute parameter`,invalidObj:attributes}
                if(typeof attributes !== 'object') throw {message:`ERROR: attributes parameter must be an object. not a ${typeof attributes}`, invalidObj:attributes}
                Object.keys(attributes).forEach(key=>{
                    if(attributes[key] instanceof AttributeInsert)
                        attributes[key].generateAttribute(key,$element)
                    else if(typeof attributes[key] === 'function' || key === 'innerHTML')
                        $element[key] = attributes[key];
                    else $element.setAttribute(key,attributes[key])
                })
            }
        }
    }
    let exp = __scope || {};
    exp.RenderProp = RenderProp;
    exp.RenderList = RenderList;
    const allElementNames = "a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bb,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,command,datagrid,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,eventsource,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,isindex,kbd,keygen,label,legend,li,link,map,mark,menu,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr"
    allElementNames.split(',').forEach(elementName=>exp[elementName] = (attr,content,toMany)=>generateElement(elementName,attr,content,toMany));
    return exp;
}
//export default traceInit;

//todo sort on dates

//todo see if I can get rid of the update 1234
//2232
//76767

//todo do an extra parameter on hide, show and remove. it the hide function should take the value and the render function

// hideWhen(hideFunction){
//     this.renderProps.forEach(x=>{
//         if(hideFunction(x.value)) x.unRender();
//     });
// }
// showWhen(showFunction){
//     let length = this.renderProps;
//     let lastShown = null;
//     for(let i = length-1; i>=0; i--){//go through the list of renderProps backwards
//         var renderProp = this.renderProps[i];
//         if(!renderProp.__hidden){//if one is not hidden, it is saved so an element can be inserted before.
//             lastShown = renderProp.$element//save the last render prop that is still visible.
//         }
//         else{
//             if(!showFunction(renderProp.value)) continue;//if the render prop does not pass the showFunction criteria skip it.
//             renderProp.__hidden = false;
//             if(!lastShown){//if there is no 'last shown' render prop it needs to be added to the end of the list wrapper,
//                 this.listWrappers.forEach((lw)=>showLastElemInWrapper(lw,renderProp));
//             }
//             else{//otherwise it just needs to be added before the last shown render prop
//                 $newElem
//             }
//         }
//     }

//     function showLastElemInWrapper(wrapper, renderProp){
//         var $newElem = renderProp.render(wrapper.$parent);
//         var $footer = wrapper.__getFooterElement();//try and get the footer element
//         if($footer) wrapper.$parent.insertBefore($newElem,$footer)//if the footer exists add before it
//         else wrapper.$parent.appendChild($newElem);
//     }
// }
// showAll(){
//     this.renderProps.forEach(x=>x.reRender());
// }