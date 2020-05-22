
let allowedInnerHTMLTypes = "string,number,boolean";
let elementTypes = "a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bb,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,command,datagrid,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,eventsource,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,isindex,kbd,keygen,label,legend,li,link,map,mark,menu,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr"

let errors ={
    excessParamsError : "error1",
    noContextError: "error2",
    afterContentError : "cannot have another parameter after content"
}

function trace(context){
    if(!context) throw errors.noContextError
    elementTypes.split(',').forEach(elementType=>{
        context[elementType] = function(){
            let params = tedium.processParams(arguments)
            return new ElementObject(params,elementType)
        } 
    })
}


class ElementObject{
    constructor(params,elementType){
        this.elementType = elementType;
        this.content = params.content;
        this.attributes = params.attributes;
    }
    insertInto($parent,$childToReplace){
        this.$element = document.createElement(this.elementType);
        tedium.setAttributes(this.$element,this.attributes);
        tedium.setContent(this.$element,this.content);
        if($childToReplace){
            $parent.insertBefore(this.$element,$childToReplace);
            $parent.removeChild($childToReplace);
        }
        $parent.appendChild(this.$element);
        this.onCreateFunction && this.onCreateFunction(this.$element,this);
    }
    delete(){
        this.$element.parentElement.removeChild(this.$element);
        this.onDeleteFunction && this.onDeleteFunction(this.$element,this);
    }
    onCreateReturnElement(onCreateFunction){this.onCreateFunction = onCreateFunction}
    onDeleteReturnElement(onDeleteFunction){this.onDeleteFunction = onDeleteFunction}
}

class RenderPropElementObject extends ElementObject{
    constructor(){}
    insertInto(parent,childToReplace){}//overrides existing
}

class RenderListItemElementObject extends ElementObject{
    constructor(){}
    insertInto(parent,childToReplace){}//overrides existing
}

class RenderListElementObject extends ElementObject{
    constructor(){}
    insertInto(parent,childToReplace){}//overrides existing
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
        this.__atrFunctions = []
        this.__onDeleteFunctions = []
        this.__onChangeFunctions = []
    }
    __deleteAll(){}
    __changed(){}
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
        this.__renderIdItr = 0;
        this.__renders = [];
        this.__data = value;
    }
    get(){}
    set(value){}
    update(updateFunction){}
    delete(){}
    
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
    setAttributes: function(){},
    setContent: function ($element,content){
        var lastType = null;
        setContentRecursive(content);  
        function setContentRecursive(cnt){
            if(Array.isArray(cnt)) return cnt.forEach(setContentRecursive);
            checkForError(typeof cnt)
            if(allowedTypes.includes(typeof cnt)) 
                return ($element.innerHTML += cnt);
            if(content instanceof Element)
                return element.appendChild(cnt)
            cnt.genAtr && 
            cnt.genAtr('innerHTML',element);
            cnt.render && cnt.render(element);
        }

        function checkForError(ruleType){
            if(ruleTypesUsed[ruleTypesUsed.length-1] == 'list')
                throw 'only one list can be used in each element\'s content, and it must be the last item'
            if(ruleTypesUsed.length && ruleType == 'atrObj' 
            || ruleTypesUsed[ruleTypesUsed.length-1] == 'atrObj')
                throw '.atr(...) needs to be the only item in the parent elements content'
            ruleTypesUsed.push(ruleType)
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