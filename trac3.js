function traceInit(__scope){
    ////////////////////////////WRAPPERS//////////////////////////////
    //base class for wrapper objects Wrappers are not to be used directly by the user.
    class Wrapper{
        constructor(){
            this.onRenderFunction = null;//this is the default value for the 'onRenderFunction' which is called when the element is added
        }
        addChild(childWrapper){//when a child element is added it kept in the 'childWrapper' list
            this.childWrappers.push(childWrapper)
        }
        removeChild(childWrapper){//when an element is removed, it needs to be removed from the 'childWrapper' list as well as from the HTML
            this.childWrappers = this.childWrappers.filter(x=>x !== childWrapper);
        }
        onRenderEvent(){//when the element is added to the dom, call this function, pass in the element and the wrapper to the function (that way the user has access to the element reference)
            this.onRenderFunction && this.onRenderFunction(this.$element,this);
        }
        onRender(onRenderFunction){//this is the call that adds an 'onRenderFunction' is added to the wrapper
            this.onRenderFunction = onRenderFunction;
            delete this.onRender;
            return this;
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
        update($triggerElem){//when something is changed, the render function needs to be re run.
            if($triggerElem && this.$element.contains($triggerElem)) return true;//if the element param is present and this wrappers element contains it. do not update
            if(!document.contains(this.$parent)) return false;//if the parent is not on the document the wrapper needs to be removed from memory. (false indicates it is not on the dom)
            this.render(this.$parent,this.parentWrapper);//
            return true;
        }
        render($parent,parentWrapper, loc){//takes a parent element and parent wrapper (list wrapper does not contain an element. it does have a parent element.)
            if(typeof $parent === 'string') $parent = document.getElementById($parent);//use the string as an id to find the element as shorthand
            this.$parent = $parent;
            this.parentWrapper = parentWrapper;//set the parent and parent wrapper for this wrapper
            
            let $element = this.renderFunction($parent,this)//use the render function to generate an element and insert it into the parent.
            if(!this.$element){////if a rendered element does not exist: 
                parentWrapper?.addChild(this); //add itself to the parents children
                let $afterElm = loc >= 0 && $parent.children[loc]; //determine if it is supposed to be inserted at a specific location
                if($afterElm) $parent.insertBefore($element,$afterElm)//insert it at that location
                else $parent.appendChild($element);//or add it to the end.
            }
            //if(!this.$element) $parent.appendChild($element);//if a rendered element does not exist, simply append it to the parent
            else{//if there is a referenced element, 
                $parent.insertBefore($element,this.$element);//the new element needs to be appended before the old one
                $parent.removeChild(this.$element);//remove the old element
            }
            this.$element = $element;//set the element reference to the new element todo 2232 see if I can get rid of the return
            this.onRenderEvent();//call this so the user can run code when the element is rendered
            return this.$element;
        }
        append(wrapper){
            wrapper.render(this.$element,this);
        }
        prepend(wrapper){
            wrapper.render(this.$element,this,0);
        }
        insertAt(wrapper,loc){
            wrapper.render(this.$element,this,loc);
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
        __getFooterElement(){//finds the first element not in the list, so elements can be inserted before it
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
            let $element = this.childWrappers[index]?.$element || this.__getFooterElement()//find the element at the index, or find the footer if there is none.
            let newWrapper = renderProp.display(this.renderFunction);//create a new wrapper with the renderFunction
            let $newElement = newWrapper.render(this.$parent,this);//hand in the parent, and render the element. hand in the reference to the list (this) so the parent wrapper can be set.
            this.childWrappers.splice(index,0,this.childWrappers.pop());//the wrapper needs to be inserted into the list, but its already at the end (because the render method adds it to the end), so its popped off and then inserted
            $element && this.$parent.insertBefore($newElement,$element) || this.$parent.appendChild($newElement)//if the footer element exists append before it, or just append to the parent
        }
        deleteAt(index){//this will delete an child element wrapper at a given index
            let $elementToDelete = this.childWrappers[index]?.$element; //get the actual element of the child element wrapper
            if(!$elementToDelete) throw {message:`ERROR: Cannot delete element because none was found at index [${index}].`,invalidObject:this.childWrappers}//throw an error if the index does not point to an element
            this.childWrappers.splice(index,1);//remove wrapper from child wrapper list
            this.$parent.removeChild($elementToDelete);//remove the element from the dom
        }
        render($parent,parentWrapper){//render function for ElementWrapperList only renders child wrappers
            this.$parent = $parent;//set the parent element for dom manipulation purposes.
            this.parentWrapper = parentWrapper;//set the parent wrapper for the ElementWrapperList
            parentWrapper && parentWrapper.addChild(this);//add self to child wrapper list (childWrappers) of parent
            this.__initialChildWrappers.forEach(x=>x.render($parent,this))//this will add all the wrappers to the child wrapper list (childWrappers). all subsequent additions will not use the __initialChildWrappers but the childWrappers
        }//todo add update to list(i think)
    }
    ///////////////////////////////AttributeInserts//////////////////
    //Attribute Insert class handles changes to attributes of individual elements without re rendering the element (which could be expensive if there are many child elements)
    class AttributeInsert{
        constructor(renderFunction,rProp){
            this.renderFunction = renderFunction || (x=>x);
            this.rProp = rProp;
        }
        update(){
            if(!this.$element) return;
            let val = this.renderFunction(this.rProp.val,this.rProp)
            if(this.atrName === 'innerHTML') 
                return (this.$element.innerHTML = val)
            if(typeof val === 'boolean')//TODO figure out why i dont need this for standard attributes
                return (this.$element[this.atrName] = val)
            this.$element.setAttribute(this.atrName,val)
        }
        generateAttribute(atrName,$element){
            this.$element =  $element
            this.atrName =  atrName;
            this.update();
        }
    }

    ///////////////////////////////Props/////////////////////////////
    //base class for all RenderProp functionality
    class Prop{
        constructor(){
            this.attributeInserts = [];//holds a list of all attribute Inserts which tie the Prop value to element attributes
        }
        atr(renderFunction){//adds an attribute insert to an element meant to be used inside the "{}" argument TODO make sure that only works there
            let atrInsert = new AttributeInsert(renderFunction,this);//adds the render function that may add additional processing to the value before passing it into the attribute
            this.attributeInserts.push(atrInsert);//add the AttributeInsert to the list
            return atrInsert;
        }
        display(renderFunction){//display functions very by type of render prop so the base simply does a check for invalid parameters
            if(renderFunction instanceof Wrapper) 
                throw {message: `ERROR: Cannot pass an "Element Wrapper" into display(), it must be a function ex: prop.display(x=>h1('text')) not prop.display(h1('text'))`, invalidObj:renderFunction}
            if(typeof renderFunction !== 'function') 
                throw {message:'ERROR: Display must receive a function',invalidObject:renderFunction}
        }
        baseChange(){//gets called on value change to insure attribute inserts get changed TODO see if I need to do this. I think i do.
            this.attributeInserts.forEach(x=>x.update());//TODO check for mem leaks.
            this.__onChange && this.__onChange(this.val,this);
        }
        update(funct){
            funct = funct || (x=>x);
            this.val = funct(this.val);
        }
        onChange(callback){
            this.__onChange = callback;
        }
    }

    class RenderProp extends Prop{
        constructor(value){
            super();
            this.__value = value;//value that represents the state of the render prop
            this.wrappers = [];//holds a list of wrappers that need to be updated when the value is changed
            this.boundWrappers = [];
            this.hidden = false;
        }
        get val(){
            return this.__value;
        }
        set val(value){
            this.__setValue(value)
        }
        __setValue(value,element){
            this.__value = value;//change the value/
            this.baseChange()//apply any changes that the base class needs.
            this.wrappers = this.wrappers.filter(x=>x.update(element))//re-run all the render functions for the wrappers
        }
        update(funct){
            funct = funct || (x=>x);
            this.val = funct(this.val);
        }
        display(renderFunction){//adds a new wrapper to be updated when the value is changed.
            super.display(renderFunction);//check for errors.
            let newWrapper = new ElementWrapper((p,ref)=>{//create a new wrapper that will be updated wrappers take a "render function" that is normally a function of another element wrapper
                var val = renderFunction(this.__value,this)//this time we call the render function, and pass in the value and the reference to the the whole renderProp (useful for list items)
                return  val.render && val.render(p,ref) || div({style:'display:none !important'},[]).render(p,ref);//add a blank div if no render function is available. TODO 38383
            });//when called render function we pass in returns an element wrapper. which has its own render function which we then call with the parent element wrapper 
            this.wrappers.push(newWrapper);//push the new wrapper so it can be accessed later and updated if needed.
            return newWrapper;//return the element wrapper so the parent has a reference to it.
        }
        boundUpdate(event_element,value){//when the boundUpdate is triggered, the wrapper containing the element is not updated (this stops re-renders while typing.)
            let $element = event_element?.target || event_element; //get the event.target, or just the target (element)
            if(!$element) throw "element or event not provided";
            value = value || $element.value;//get the value from the element or from the parameter
            this.__setValue(value,$element)//call the __setValue function but hand in the element so this element wont be updated.
        }
        bUp(){return this.boundUpdate.bind(this)}//helps with short-handing boundUpdate function. onclick:(e)=>boundUpdate(e) vs onclick:bUp()
    }
    //This Class is a render prop that is inside a render list. it has a few extra features to easy use of renderLists
    class RenderListProp extends RenderProp{
        constructor(value,parent,id){
            super(value);
            this.parentRenderList = parent;//save a reverence to the parent "render list" so functions can be called on it
            this.__id = id || parent.__idItr++;//set the id of this list item. (it will stay the same until the list item is removed)
        }
        delete(){//using the second parameter in the the display function ex:(x,r)=>r.delete();
            this.parentRenderList.deleteAt(this.index)//deletes self from the parent list using this props index.
        }
        moveTo(index){//moves this item somewhere else in the list. it can be called like the display function ex: (x,r)=>r.move(5)
            this.parentRenderList.move(this.index,index)//tell the parent to move this element to another index (using its initial index)
        }
        get index(){//gets the index that the renderProp is currently at in the list (this can change if items are moved, removed or added)
            return this.parentRenderList.__idMap[this.__id]//the parent list has a map of ids to indexes. so the index can be found quickly with the id.
        }
    }

    class RenderList extends Prop{
        constructor(values){
            super();
            this.__idItr = 0;//this is a running total of the number of items added to the list. it increments each time. This can theoretically fail after you add more items than there are plank volumes in the observable universe.
            this.renderProps = values.map(x=>new RenderListProp(x,this)); //list of all the render props that are represented.
            this.__mapIndexes();//calling this function ties all the ids to indexes in O of N time.
            this.__listWrappers = [];//this holds all the places the list is to be rendered
            this.length = new RenderProp(this.renderProps.length);//this is to show a changing list length value.
        }
        get val(){
            return this.renderProps.map(x=>x.val);//the value is just the val of each render prop put into an array.
        }
        set val(newArray){
            this.baseChange()//insure that any AttributeInserts get updated.
            while(this.renderProps.length) this.deleteAt(0,false)//delete each item. (do not map the indexes until the end to improve performance)
            newArray.forEach(x=>this.insertAt(0,x,null,false))//add each one into the array (do not override id and do not re-map each time for performance)
            this.length.val = this.renderProps.length//update the length once so it doesn't render each time.
            this.__mapIndexes();//after all items are added, then remap the indexes.
        }
        display(renderFunction){
            super.display(renderFunction);
            let listWrapper = new ElementWrapperList(renderFunction,this.renderProps )
            this.__listWrappers.push(listWrapper)
            return listWrapper
        }
        push(value){
            this.insertAt(this.renderProps.length,value)
        }
        unshift(value){
            this.insertAt(0,value)
        }
        insertAt(index,value,id,__mapIndexes = true){
            index = Math.min(index,this.renderProps.length);//the index should be at max the length of the render props list
            let rProp = new RenderListProp(value,this,id)//create the new prop
            this.__listWrappers.forEach(x=>x.insertAt(index,rProp))//go through each list wrapper and insert it at the index
            this.renderProps.splice(index,0,rProp);//insert the prop into the list of props
            __mapIndexes && this.__mapIndexes();//if this is a mass delete or add, do not map the indexes till the end.
            __mapIndexes && (this.length.val = this.renderProps.length);//update the length.
        }
        pop(){
            return this.deleteAt(this.renderProps.length-1)
        }
        shift(){
            return this.deleteAt(0)
        }
        deleteAt(index,__mapIndexes = true){
            this.__listWrappers.forEach(x=>x.deleteAt(index))
            let val = this.renderProps[index].val;
            this.renderProps.splice(index,1);
            __mapIndexes && (this.length.val = this.renderProps.length);
            __mapIndexes && this.__mapIndexes();
            return val;
        }
        move(sourceIndex,destIndex){
            if(sourceIndex === destIndex) return;//no need to continue, the item is where it should be.
            if(sourceIndex<0 || sourceIndex>=this.renderProps.length)//check the source and destination are in-bounds
                throw `Cannot move: Source Index [${sourceIndex}] is out of bounds`
            if(destIndex<0 || destIndex>=this.renderProps.length)
                throw `Cannot move: Destination Index [${destIndex}] is out of bounds`
            let propId = this.renderProps[sourceIndex].__id;//save the prop id
            let val = this.deleteAt(sourceIndex,false);//delete the item, (do not remap)
            this.insertAt(destIndex,val,propId);//add the item back in at the correct location. use the prop id instead of generating a new one.
        }
        __mapIndexes(){
            this.__idMap = {};//clear the id map
            this.renderProps.forEach((rp,i)=>{//go through each item
                this.__idMap[rp.__id] = i//set the map at the 'id' index to the position in the list
            })
        }
    }

    ///////////////////FUNCTION GENERATION///////////////////////
    function generateElement(elementType,param1,param2,tooMany){// the arguments can be given in multiple ways so they are written as param1 and 2
        if(tooMany instanceof Wrapper) throw {message:`ERROR: ${elementType}(), contained too many parameters, it appears you are not using an array in the parameter`,invalidObj:tooMany}
        if(tooMany) throw {message:`ERROR: ${elementType}(), contained too many parameters`,invalidObj:tooMany};//there should only be 2 arguments supplied by the user. additional arguments will cause sever problems.
        var attributes = param2 != null ? param1 : null;//if there is a second parameter, the first one is attributes
        var content = param2 != null ? param2 : param1;//if there is no second parameter the first one is the content, otherwise its the second one.
        return new ElementWrapper(createElement)//create a new ElementWrapper with a renderFunction that creates a dom element outlined by the attributes and content parameters.
        //understanding why the first parameter is unused is difficult (even for me) basically the virtual dom, made of ElementWrappers, is created bottom up. so the elements with no children, followed by their parents. But the dom needs to create the parents first then the children. The generate element does not actually place the element on the dom. the Element wrapper does, and it uses a parent element. But this function does not, but since its called by the ElementWrapper like it does we need to ignore the first param.
        function createElement(intentionallyUnused,elementWrapperRef){//All you really need to know is that if you take it out it breaks.
            let $element = document.createElement(elementType);//generate the element of the given type
            if(typeof content === 'string') $element.textContent += content;//if there is only a string parameter, set the textContent TODO make this work with arays somehow
            else applyContent(content);//apply the content that is usually given in the "[]" second param
            applyAttributes(attributes)//apply the attributes to the element
            return $element;//return the created element
            //applies the content that the element contains.
            function applyContent(content){
                if(content == null) return//can't apply content that isn't there.
                if(Array.isArray(content))//if the content is an array:
                    return content.forEach(x=>applyContent(x));//run the "apply content" function for each item in the array (this works recursively for arrays in arrays [[...],...,[...]])
                if(content instanceof Wrapper)//if you have a wrapper
                    return content.render($element,elementWrapperRef);//render the wrapper (this will call its "create element" function outlined above)
                if(content instanceof Element)//if its an element (if you create an element and put it in, it will still work)
                    return $element.appendChild(content);//add content to the parent element above since its an element TODO test this
                $element.innerHTML += content.toString();//if its a string, set the inner html to it. no more elements need to be generated as its children TODO dont use innerHTML
            }
            //applies the attributes to the element
            function applyAttributes(attributes){
                if(attributes == null) return;//do not apply null attributes
                if(attributes instanceof Wrapper) //this would happen if the user enters parameters wrong
                    throw {message:`ERROR: cannot use "Element Wrapper" as attribute parameter`,invalidObj:attributes}
                if(typeof attributes !== 'object') throw {message:`ERROR: attributes parameter must be an object. not a ${typeof attributes}`, invalidObj:attributes}//attributes are stored as key value objects and cannot be anything else.
                Object.keys(attributes).forEach(key=>{//go through each key.
                    if(attributes[key] instanceof AttributeInsert)//if the value is an AttributeInsert:
                        attributes[key].generateAttribute(key,$element)//call its generateAttribute method. this will return a value to set the attribute to, as well as tie the element to the AttributeInsert so it can be changed in the future.
                    else if(typeof attributes[key] === 'function' || key === 'innerHTML')//if a function is handed in or innerHTML: TODO dont use innerHTML
                        $element[key] = attributes[key];//the elements attributes need to be set programmatically, not with setAttribute.
                    else $element.setAttribute(key,attributes[key])//otherwise just use setAttribute with the key as the name and the value as the value. TODO add string check.
                })
            }
        }
    }

    let exp = __scope || window;
    exp.RenderProp = RenderProp;
    exp.RenderList = RenderList;
    exp.trace3globals = {};//to be use by other plugins to stay consistent
    exp.__trac3Internals = {Wrapper,ElementWrapper,ElementWrapperList,Prop,version:'0.0.1'}
    const allElementNames = "a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bb,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,command,datagrid,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,eventsource,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,isindex,kbd,keygen,label,legend,li,link,map,mark,menu,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr"
    allElementNames.split(',').forEach(elementName=>exp[elementName] = //for every element type. add a function to exp of with that name as a type
        (attr,content,tooMany)=>generateElement(elementName,attr,content,tooMany));//the function takes 2 arguments. 3 is "tooMany" and will throw an error 
        //this function returns what is created by the "generateElement" function which needs the two arguments and a "type name" of the element to be created (given by the element type in the string)
    return exp;//the export will have the RenderList the RenderProp and a function for each type of element you can make.                                                        
}
    //export default traceInit;
    
    //todo sort on dates
    //todo handle div([],{}) better
    //todo add auto document.getElementById 
    //get rid of hack that allows you to hide elements in a list ***********
    
    

    //2232
    //76767

    //todo h3(['If you want to get started <h1>this should not be an element </h1> you can look into installing trace here:',a({href:window.location.href.split('?')[0]+'?installingTrace'},'installing trace'),'Have fun!']) this does not work.

    //todo looks like there is an issue with swapping double arrays out. It seems to break sub "display" functions but only for large numbers
    
    //todo two way binding would be nice

    //todo better error //elementNum.display(x=>x) dispaly function does not return an element wrapper 

    //todo do an extra parameter on hide, show and remove. it the hide function should take the value and the render function
    
    //todo make the divs not there, not just invisible. when hidden.
    
    //change "addChild" to "appendChild"

    //todo handle disabled as an Atr()

    //TODO 38383 see if i can get no element at all

    //todo see if i can get rid of idex to id tying, by just resetting the id every time the slit changes

    //REMOVED FEATURES
    //hiding showing filtering and "onchange" events, remap perfomance optimiser

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