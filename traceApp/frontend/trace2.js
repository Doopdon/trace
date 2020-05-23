let allowedInnerHTMLTypes = "string,number,boolean";
let elementTypes = "a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bb,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,command,datagrid,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,eventsource,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,isindex,kbd,keygen,label,legend,li,link,map,mark,menu,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr"

let errors ={
    excessParamsError : "error1",
    noContextError: "error2",
    afterContentError : "cannot have another parameter after content",
    attributeNotAlone: "error3",
    listNotLastError: "error4"
}

function trace(context){
    if(!context) throw errors.noContextError
    elementTypes.split(',').forEach(elementType=>{
        context[elementType] = function(){
            let params = tedium.processParams(arguments)
            return new ElementObject(params,elementType)
        } 
    });
}

class ElementObjectBase{
    constructor(){
        this.__childElementObjects = []
    }
    insertInto($parent,$newElement,$elementToReplace,parentElementObject){
        parentElementObject && parentElementObject.__childElementObjects.push(this);
        this.__parentElementObject = parentElementObject;
        if($elementToReplace){
            $parent.insertBefore($newElement,$elementToReplace);
            $parent.removeChild($elementToReplace);
        }
        else $parent.appendChild($newElement);
        this.onInsertFunction && this.onInsertFunction($newElement,this);
        this.$element = $newElement;
        this.$parent = $parent;
        return this.$element;
    }
    delete(){
        this.$parent.removeChild(this.$element);
        this.onDeleteFunction && this.onDeleteFunction(this.$element,this);
    }
    onInsert(onInsertFunction){this.onInsertFunction = onInsertFunction}
    onDelete(onDeleteFunction){this.onDeleteFunction = onDeleteFunction}
}

class ElementObject extends ElementObjectBase{
    constructor(params,elementType){
        super()
        this.elementType = elementType;
        this.content = params.content;
        this.attributes = params.attributes;
        this.__childElementObjects = []
    }
    insertInto($parent,$elementToReplace,parentElementObject){
        let $element = document.createElement(this.elementType);
        tedium.setAttributes($element,this.attributes);
        tedium.setContent($element,this.content,this);
        return super.insertInto($parent,$element,$elementToReplace,parentElementObject);
    }
}

class SingleObjectBase extends ElementObjectBase{
    constructor(propRef,renderFunction){
        super();
        this.propRef = propRef;
        this.__renderFunction = ()=>
            renderFunction(propRef.get(),propRef,this.$element);
    }
}

class PropElementObject extends SingleObjectBase{
    constructor(propRef,renderFunction){
        super(propRef,renderFunction)
    }
    update(){
        let $element = this.__renderFunction().insertInto(this.$parent);
        return super.insertInto(this.$parent,$element,this.$element,this.__parentElementObject);
    }
    insertInto($parent,$elementToReplace,parentElementObject){
        let $element = this.__renderFunction().insertInto($parent);
        return super.insertInto($parent,$element,$elementToReplace,parentElementObject);//todo delete self when not on dom
    }
}

class ListElementObject extends ElementObjectBase{
    constructor(propRef,renderFunction){
        super()
        this.displayId = propRef.__listElementObjects.length-1
        this.listItems = propRef.__data.map(x=>
            x.__displayInList(renderFunction,this.displayId));
        this.renderFunction = renderFunction;
    }
    insertInto($parent,$elementToReplace,parentElementObject){
        parentElementObject && parentElementObject.__childElementObjects.push(this);
        this.__parentElementObject = parentElementObject;
        this.$parent = $parent;
        $elementToReplace && $parent.removeChild($elementToReplace) //todo handel list replacement
        this.listItems.forEach(x=>x.insertInto($parent,null,this))
    }
    __resetOrder(){
        
    }
    get $element(){
        return this.listItems[0] && this.listItems[0].$element;
    }
    __insertAt(index,renderListItem){
        var $child = this.listItems[index] && this.listItems[index].$element || tedium.getElementAfterThis(this)
        let newVal = renderListItem.__displayInList(this.renderFunction,this.displayId)//todo remove display id
        newVal.insertInto(this.$parent,null,this);
        this.listItems.splice(index,0,newVal);
        if($child) this.$parent.insertBefore(newVal.$element,$child)
    }
    __deleteAt(index){
        let elementObject = this.listItems[index];
        if(!elementObject) return;
        elementObject.delete();
        this.listItems.splice(index,1);
    }
    __move(fromIndex,toIndex){

    }
}

class AttributeObject extends SingleObjectBase{
    constructor(propRef,renderFunction){
        super(propRef,renderFunction)
    }
    generateAttribute(key,$element){
        this.key = key;
        this.$element = $element;
        this.update();
    }
    update(){
        if(!this.$element) return;
        this.$element.removeAttribute(this.key);
        let res = this.__renderFunction();
        if(typeof res == 'function') this.$element[this.key] = res;
        this.$element.setAttribute(this.key,res);
    }
    insertInto(){
        this.onInsertFunction && this.onInsertFunction($newElement,this);
    }
    delete(){
        if(!this.$element) return;
        this.$element.removeAttribute(this.key);
        this.propRef.deleteAtr(this.renderFunction);
    }
}



class RenderBase{
    constructor(value){
        this.__data = value;
        this.__attributeObjects = []
        this.__onDeleteFunctions = []
        this.__onChangeFunctions = []
    }
    delete(){
        this.__data = undefined;
        this.__onDeleteFunctions.forEach(x=>x())
    }
    onChange(onChangeFunction){
        this.__onChangeFunctions.push(onChangeFunction)
    }
    deleteOnChange(onChangeFunction){
        this.__onChangeFunctions = this.__onChangeFunctions.map(x=>x != onChangeFunction)
    }
    onDelete(onDeleteFunction){
        this.__onDeleteFunctions.push(onDeleteFunction)
    }
    deleteOnDelete(onDeleteFunction){
        this.__onDeleteFunctions = this.__onDeleteFunctions.map(x=>x != onDeleteFunction)
    }
    atr(renderFunction){
        let atrObj = new AttributeObject(this,renderFunction)
        this.__attributeObjects.push(atrObj)
        return atrObj;
    }
    deleteAtr(renderFunction){
        this.__attributeObjects = this.__attributeObjects.filter(x=>x == renderFunction);
    }
    getObjVal(){

    }
    get(){
        return this.__data;
    }
    set(value){
        this.__data = value;
        this.__triggerChanges();
    }
    __triggerChanges(){
        this.__attributeObjects.forEach(x=>x.update());
        this.__onChangeFunctions.forEach(x=>x());
    }
    update(updateFunction = x=>x){
        this.set(updateFunction(this.get()));
    }
}

class RenderProp extends RenderBase{
    constructor(value){
        super();
        this.__RenderPropElementObjects = [];
        this.__data = value;
    }
    set(value){
        super.set(value)
        this.__RenderPropElementObjects.forEach(x=>x.update())
    }
    delete(){
        super.delete()
        this.__RenderPropElementObjects.forEach(x=>x.delete())
        this.__RenderPropElementObjects = [];
        this.__data = undefined;
    }
    display(renderFunction){
        let renderPropElement = new PropElementObject(this,renderFunction)
        this.__RenderPropElementObjects.push(renderPropElement)
        return renderPropElement;
    }
}

class RenderListItem extends RenderProp{
    constructor(listRef,value){
        super(value);
        this.__listRenderPropElementObjects = [];
        this.__id = listRef.__listItemItr++;
        this.listRef = listRef;
    }
    get index(){
        if(this.__index) return this.__index;
        this.__index = new RenderProp(this.listRef.__getIndex(this.__id));
        this.listRef.onChange(()=>{this.index.set(this.listRef.__getIndex(this.__id))});
        return this.__index;
    }
    set(value){
        super.set(value);
        __listRenderPropElementObjects.forEach(x=>x.update())
    }
    __displayInList(renderFunction,displayId){
        let renderPropElement = new PropElementObject(this,renderFunction)
        this.__listRenderPropElementObjects.push(renderPropElement);
        return renderPropElement;
    }
    move(index){
        this.listRef.move(this.index.get(),index);
    }
}

class RenderList extends RenderBase{
    constructor(values){
        super()
        this.__listItemItr = 0;
        this.__data = values.map((value)=>new RenderListItem(this,value));
        this.__indexMap = tedium.createIndexMap(this.__data);
        this.__listElementObjects = []
    }
    __getIndex(id){
        return this.__indexMap[id];
    }
    insertAt(index,value){
        var val = new RenderListItem(this,value)
        this.__data.splice(index,0,val);
        this.__indexMap = tedium.createIndexMap(this.__data);
        this.__listElementObjects.forEach(x=>x.__insertAt(index,val));
        super.__triggerChanges();
    }
    deleteAt(index){
        var val = this.__data[index];
        this.__data.splice(index,1);
        this.__indexMap = tedium.createIndexMap(this.__data);
        var returnVal =  val.get();
        val.delete();
        this.__listElementObjects.forEach(x=>x.__deleteAt(index))
        super.__triggerChanges();
        return returnVal;
    }
    delete(){
        while(this.__data.length) this.deleteAt(0);
        super.__triggerChanges();
    }
    push(value){
        this.insertAt(this.length,value);
    }
    prepend(value){
        this.insertAt(0,value);
    }
    shift(){
        return this.deleteAt(0)
    }
    pop(){
        return this.deleteAt(0)
    }
    sort(){
        super.__triggerChanges();
    }
    sortOn(function_or_property){
        
    }
    move(fromIndex,toIndex){
        super.__triggerChanges();
    }
    set(values){
        this.__data = values.map((value)=>new RenderListItem(this,value));
        this.__indexMap = tedium.createIndexMap(this.__data);
        super.__triggerChanges();
    }
    display(renderFunction){
        let listElement = new ListElementObject(this,renderFunction);
        this.__listElementObjects.push(listElement);
        return listElement;
    }
    insertInto($parent,$elementToReplace){
        this.__data.map(x=>x.display(renderFunction));
    }
    get length(){return this.__data.length;}
}




let tedium = {
    createIndexMap: function(arr){
        let indexMap = {};
        arr.forEach((x,i)=>indexMap[x.__id]=i)
        return indexMap;
    },
    processParams:function(params){
        if(params[2]) throw errors.excessParamsError
        return processParams(params[0],params[1])
        function processParams(param1,param2){
            if(isContent(param1)){
                if(!param2) return {content:param1}
                else throw error.afterContentError
            } 
            if(isContent(param2) && isAttributes(param1)) return {attributes:param1,content:param2}
            if(isAttributes(param1)) return {attributes:param1}
            return {};
            function isContent(param){
                return allowedInnerHTMLTypes.includes(typeof(param)) 
                || Array.isArray(param)
                || param instanceof Element
                || param instanceof ElementObject
                || param instanceof AttributeObject
            }
            function isAttributes(param){
                return !!param;
            }
        }
    },
    setAttributes: function($element,attributes){
        if(!attributes) return;
        Object.keys(attributes).forEach(function(key){
            if(attributes[key] instanceof AttributeObject)
                return attributes[key].generateAttribute(key,$element);
            (typeof attributes[key] == "function") && 
            ($element[key] = attributes[key]) || 
            $element.setAttribute(key,attributes[key])
        });
    },
    setContent: function ($element,content,elementObject){
        var lastType = null;
        setContentRecursive(content);  
        function setContentRecursive(content){
            if(Array.isArray(content)) return content.forEach(setContentRecursive);
            checkForError(content)
            if(allowedInnerHTMLTypes.includes(typeof content)) 
                return ($element.innerHTML += content);
            if(content instanceof Element)
                return $element.appendChild(content)
            if(content instanceof AttributeObject)
                content.generateAttribute('innerHTML',$element);
            if(content instanceof ElementObjectBase || content instanceof RenderBase)
                content.insertInto($element,null,elementObject);
        }

        function checkForError(content){
            if(lastType == AttributeObject) throw errors.attributeNotAlone;
            if(content instanceof AttributeObject){
                if(lastType) throw errors.attributeNotAlone;
                lastType = AttributeObject;
            }
            if(lastType == ListElementObject) throw errors.listNotLastError;
            if(content instanceof ListElementObject) lastType = ListElementObject;
            lastType = ElementObjectBase;
        }
    },
    getElementAfterThis(elementObject){
        var $element;
        var foundSelf = false;
        elementObject.__parentElementObject.__childElementObjects.find((x,i)=>{
            if(foundSelf) return x.$element && ($element = x.$element);
            if(x === elementObject) return !(foundSelf = true);
        })
        return $element;
    }
}


// lO = new listObj([{a:'10',b:'c'},{a:'5',b:'q'},{a:7,b:'a'},{a:5,b:'1'}])
// console.log(lO.sortOn('a'))


function listObj(inputList){
  this.list = inputList;
  this.sortOn = function(functOrProp){
   if(typeof(functOrProp) === 'string'){
     return this.sort(x=>x[functOrProp])
   }
    return this.sort(functOrProp)
  }
  this.sort = function(funct){
    if(funct) 
      return this.list.sort((x,y)=>betterSort(funct(x),funct(y)))
    return this.list.sort(betterSort);
  }
  function betterSort(x,y){
    if(x === y) return 0; 
    if(isNum(x)){
      if(isNum(y)) return x-y;
      return -1;
    }
    if(isNum(y)) return 1;
    return x > y? 1:-1;
    function isNum(num){
      return (typeof(num) === 'number' || !isNaN(num));}
  }
}

//todo move display to renderBase
//todo list errors are not working
//tod when objects are inserted with no render function or whatever, show [object]