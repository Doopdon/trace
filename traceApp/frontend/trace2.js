
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
    insertInto($parent,$newElement,$elementToReplace){
        if($elementToReplace){
            $parent.insertBefore($newElement,$elementToReplace);
            $parent.removeChild($elementToReplace);
        }
        $parent.appendChild($newElement);
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
    }
    insertInto($parent,$elementToReplace){
        let $element = document.createElement(this.elementType);
        tedium.setAttributes($element,this.attributes);
        tedium.setContent($element,this.content);
        return super.insertInto($parent,$element,$elementToReplace);
    }
}

class RenderPropElementObject extends ElementObjectBase{
    constructor(propRef,renderFunction){
        super()
        this.__renderFunction = ()=>
            renderFunction(propRef.get(),propRef);
    }
    update(){
        let $element = this.__renderFunction().insertInto(this.$parent);
        return super.insertInto(this.$parent,$element,this.$element);
    }
    insertInto($parent,$elementToReplace){
        let $element = this.__renderFunction().insertInto($parent);
        return super.insertInto($parent,$element,$elementToReplace);
    }
}

class RenderListItemElementObject extends ElementObject{
    constructor(){}
    insertInto(parent,childToReplace){}//overrides existing
}

class RenderListElementObject extends ElementObject{
    constructor(){}
    insertInto(parent,childToReplace){}//overrides existing
    footer(renderFunction){}
}

class AttributeObj{
    constructor(atrListRef,renderFunction){
        this.__atrListRef = __atrListRef;
        this.renderFunction = renderFunction;
    }
    genAtr(key,element){}
    updateAtr(){}
}

class RenderBase{
    constructor(){
        this.__attributeObjects = []
        this.__onDeleteFunctions = []
        this.__onChangeFunctions = []
    }
    __delete(){}
    __change(){}
    onChange(onChangeFunction){}
    deleteOnChange(onChangeFunction){}
    onDelete(onDeleteFunction){}
    deleteOnDelete(onDeleteFunction){}
    atr(atrFunction){}
    getObjVal(){}
}



class RenderProp extends RenderBase{
    constructor(value){
        super();
        this.__RenderPropElementObjects = [];
        this.__data = value;
    }
    get(){
        return this.__data;
    }
    set(value){
        this.__data = value;
        super.__change();
        this.__RenderPropElementObjects.forEach(x=>x.update())
    }
    update(updateFunction){
        if(updateFunction) 
            return this.set(updateFunction(this.get()))
        this.set(this.get());
    }
    delete(){
        super.__delete()
        this.__RenderPropElementObjects.forEach(x=>x.delete())
        this.__RenderPropElementObjects = [];
        this.__data = undefined;
    }
    display(renderFunction){
        let renderPropElement = new RenderPropElementObject(this,renderFunction)
        this.__RenderPropElementObjects.push(renderPropElement)
        return renderPropElement;
    }
}

class RenderListItem extends RenderProp{
    constructor(value,params){
        super(value);
        this.__listRenderIdItr = 0;
        this.__listRenders = [];
        this.__id = params.id;
        this.__listRef = params.listRef;
        this.index = new RenderProp(this.__listRef.getIndex(this.__id));//there is an updating RenderProp that holds the current index
        this.__listRef.onChange(()=>{this.index.set(this.__listRef.getIndex(this.__id))});
    }
    insert(optionalIndexParam){}
    deleteItem(){}//overrides/extends base
    move(index){}
}

class RenderList extends RenderBase{
    constructor(values){
        this.__listItemItr = 0;
        this.__data = values.map(new RenderListItem);
        this.__indexMap = tedium.createIndexMap();
    }
    __getIndex(id){};
    insertAt(index,value){}
    deleteAt(index,value){};
    push(value){}
    prepend(value){}
    shift(){}
    pop(){}
    sort(){}
    sortOn(function_or_property){}
    move(fromIndex,toIndex){}
    set(newArray){}
    get(){}
    getAt(index){}
}





let tedium = {
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
                || param instanceof AttributeObj
            }
            function isAttributes(param){
                return !!param;
            }
        }
    },
    setAttributes: function($element,attributes){
        if(!attributes) return;
        Object.keys(attributes).forEach(function(key){
            if(attributes[key].genAtr) return attributes[key].genAtr(key,$element);
            (typeof attributes[key] == "function") && 
            ($element[key] = attributes[key]) || 
            $element.setAttribute(key,attributes[key])
        });
    },
    setContent: function ($element,content){
        var lastType = null;
        setContentRecursive(content);  
        function setContentRecursive(content){
            if(Array.isArray(content)) return content.forEach(setContentRecursive);
            checkForError(content)
            if(allowedInnerHTMLTypes.includes(typeof content)) 
                return ($element.innerHTML += content);
            if(content instanceof Element)
                return $element.appendChild(content)
            if(content instanceof AttributeObj)
                content.genAtr('innerHTML',$element);
            if(content instanceof ElementObjectBase || content instanceof RenderBase)
                content.insertInto($element);
        }

        function checkForError(content){
            if(lastType == AttributeObj) throw errors.attributeNotAlone;
            if(content instanceof AttributeObj){
                if(lastType) throw errors.attributeNotAlone;
                lastType = AttributeObj;
            }
            if(lastType == RenderListElementObject) throw errors.listNotLastError;
            if(content instanceof RenderListElementObject) lastType = RenderListElementObject;
            lastType = ElementObjectBase;
        }
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