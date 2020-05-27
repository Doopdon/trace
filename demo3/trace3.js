function traceInit(__scope){
////////////////////////////WRAPPERS//////////////////////////////
    class Wrapper{
        constructor(){
            this.onRenderFunction = null;
        }
        addChild(childWrapper){
            this.childWrappers.push(childWrapper)
        }
        removeChild(childWrapper){
            this.childWrappers = this.childWrappers.filter(x=>x !== childWrapper);
        }
        onRenderEvent(){
            this.onRenderFunction && this.onRenderFunction(this.$element,this);
        }
        onRender(onRenderFunction){
            this.onRenderFunction = onRenderFunction;
            delete this.onRender;
        }
    }

    class ElementWrapper extends Wrapper{
        constructor(renderFunction){
            super();
            this.renderFunction = renderFunction;
            this.childWrappers = [];
            this.$element = null;
        }    
        update(){
            if(!document.contains(this.$parent)) return false
            this.parentWrapper.removeChild(this)
            this.render(this.$parent,this.parentWrapper)
            return true;
        }
        render($parent,parentWrapper){
            this.$parent = $parent;
            this.parentWrapper = parentWrapper;
            parentWrapper && parentWrapper.addChild(this);
            let $element = this.renderFunction($parent,this);   
            if(!this.$element) $parent.appendChild($element);
            else{
                $parent.insertBefore($element,this.$element)
                $parent.removeChild(this.$element)
            }
            return (this.$element = $element);
        }
    }

    class ElementWrapperList extends Wrapper{
        constructor(renderFunction,renderProps){
            super();
            this.renderFunction = renderFunction;
            this.__initialChildWrappers = renderProps.map(x=>x.display(renderFunction));
            this.childWrappers = [];
        }
        __getFooterElement(){
            let foundSelf = false;
            let $foundElement;
            this.parentWrapper.childWrappers.find(x=>{
                if(foundSelf) return !!($foundElement = x.$element)
                if(x === this) foundSelf = true; return false;
            })
            return $foundElement;
        }
        get $element(){
            return this.childWrappers[0] && this.childWrappers[0].$element;
        }
        insertAt(index,renderProp){
            let $element = this.childWrappers[index] && this.childWrappers[index].$element || this.__getFooterElement()
            let newWrapper = renderProp.display(this.renderFunction)
            let $newElement = newWrapper.render(this.$parent,this);
            this.childWrappers.splice(index,0,this.childWrappers.pop());
            $element && this.$parent.insertBefore($newElement,$element) || this.$parent.appendChild($newElement)
        }
        deleteAt(index){
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
        getObjectValue(){}
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
        }
        delete(){
            this.parentRenderList.deleteAt(this.getIndex())
        }
        move(index){
            this.parentRenderList.move(this.getIndex(),index)
        }
        getIndex(){
            let ind;
            this.parentRenderList.renderProps.find((x,i)=>x===this && (ind = i));
            return ind;
        }
    }

    class RenderList extends Prop{
        constructor(values){
            super();
            this.renderProps = values.map(x=>new RenderListProp(x,this));
            this.listWrappers = [];
        }
        get(){
            return this.renderProps.map(x=>x.value);
        }
        set(newArray){
            this.renderProps.forEach(()=>this.deleteAt(0))
            newArray.forEach(x=>this.insertAt(0,x))
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
        insertAt(index,value){
            index = Math.min(index,this.renderProps.length);
            let rProp = new RenderListProp(value,this)
            this.listWrappers.forEach(x=>x.insertAt(index,rProp))
            this.renderProps.splice(index,0,rProp);
            this.__changeEvent({type:'index-inserted',prop:this,index,value})
        }
        pop(){
            return this.deleteAt(this.renderProps.length-1)
        }
        shift(){
            return this.deleteAt(0)
        }
        deleteAt(index){
            this.listWrappers.forEach(x=>x.deleteAt(index))
            let val = this.renderProps[index].get();
            this.renderProps.splice(index,1);
            this.__changeEvent({type:'index-deleted',prop:this,index})
            return val;
        }
        move(sourceIndex,destIndex){
            console.warn('need to add source, dest index bounds checks')
            var val = this.renderProps[sourceIndex];
            this.renderProps.splice(sourceIndex,1)
            this.renderProps.splice(destIndex,0,val);
            this.listWrappers.forEach(x=>x.move(sourceIndex,destIndex));
            this.__changeEvent({type:'index-moved',prop:this,sourceIndex,destIndex})
        }
        sortOn(propGetter,reverse){//todo test this
            if(!['undefined','null','boolean'].includes(typeof reverse)) throw `reverse parameter must be type bool, instead received: '${typeof reverse}'`
            if(typeof propGetter === 'string') 
                return this.sort((x,y)=>this.__betterSort(x[propGetter],y[propGetter],reverse));
            if(typeof propGetter === 'function')
                throw this.sort((x,y,rx,ry)=>this.__betterSort(propGetter(x,rx),propGetter(y,ry),reverse))
            throw {message:`sortOn requires either a string or function as its argument, instead it received ${typeof propGetter}`,invalidObj:propGetter}
        }
        sort(sortFunction){
            sortFunction = sortFunction || this.__betterSort;
            this.renderProps.sort((x,y)=>sortFunction(x.get(),y.get(),x,y))

            this.listWrappers.forEach((lw,i)=>{
                var tempList = [];
                let $firstElem
                this.renderProps.forEach((rp,j)=>{ 
                    rp = this.renderProps[this.renderProps.length-(j+1)]
                    $firstElem = $firstElem || lw.childWrappers[0].$element;
                    lw.$parent.insertBefore(rp.wrappers[i].$element,$firstElem);
                    $firstElem = rp.wrappers[i].$element;
                    tempList.unshift(rp.wrappers[i])
                })
                lw.childWrappers = tempList;
            })
            this.__changeEvent({type:'sorted',prop:this,sortFunction})
        }
        __betterSort(x,y,reverse){
            reverse = reverse? -1 : 1
            if(x === y) return 0; 
            if(!isNaN(x)){
            if(!isNaN(y)) return (x-y)*reverse;
            return -1*reverse;
            }
            if(!isNaN(y)) return 1*reverse;
            return x > y? 1*reverse:-1*reverse;
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
    allElementNames.split(',').forEach(t=>exp[t] = (attr,content,tm)=>generateElement(t,attr,content,tm));
    return exp;
}
//export default traceInit;

//todo sort on dates