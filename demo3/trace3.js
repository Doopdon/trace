let idIterator = 0;
function generateElement(elementType,param1,param2){
    var attributes = param2 && param1;
    var content = param2 || param1
    return new ElementWrapper(createElement)
    function createElement(unused,elementWrapperRef){
        let $element = document.createElement(elementType);
        applyContent(content);
        console.warn('need to finish attributes')
        return $element;
        function applyContent(content){
            if(content instanceof Array) 
                return content.forEach(x=>applyContent(x))
            if(content instanceof Wrapper)
                return content.render($element,elementWrapperRef)
            if(content instanceof Element)
                return $element.appendChild(content);
            $element.innerHTML+=content.toString();
        }
    }
}

class Wrapper{
    constructor(){
        this.id = idIterator++;
    }
    addChild(childWrapper){
        this.childWrappers.push(childWrapper)
    }
    removeChild(childWrapper){
        this.childWrappers = this.childWrappers.filter(x=>x !== childWrapper);
    }
}

class ElementWrapper extends Wrapper{
    constructor(renderFunction){
        super();
        this.renderFunction = renderFunction;
        this.childWrappers = [];
        this.type = 'single'
    }    
    update(){
        this.parentWrapper.removeChild(this)
        this.render(this.$parent,this.parentWrapper)
        return document.contains(this.$parent);
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
        this.childWrappers = []; //do not populate till render
        this.type = 'list'
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
        return this.childWrappers[0] && this.childWrappers[0].$element || this.__getFooterElement()
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



class Prop{
    makeValidFunction(renderFunction){
        return (p,ref)=>renderFunction(this.value,this).render(p,ref)
    }
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
    }
    get(){return this.value}
    display(renderFunction){
        let newWrapper = new ElementWrapper(this.makeValidFunction(renderFunction))
        this.wrappers.push(newWrapper);
        return newWrapper;
    }
}

class RenderList extends Prop{
    constructor(values){
        super();
        this.renderProps = values.map(x=>new RenderProp(x));
        this.listWrappers = [];
    }
    get value(){
        return this.renderProps.map(x=>x.value);
    }
    display(renderFunction){
        let listWrapper = new ElementWrapperList(renderFunction,this.renderProps )
        this.listWrappers.push(listWrapper)
        return listWrapper
    }
    insertAt(index,value){
        let rProp = new RenderProp(value)
        this.listWrappers.forEach(x=>x.insertAt(index,rProp))
        this.renderProps.splice(index,0,rProp)
    }
    deleteAt(index){
        this.listWrappers.forEach(x=>x.deleteAt(index))
        this.renderProps.splice(index,1);
    }
    move(sourceIndex,destIndex){
        console.warn('need to add source, dest index bounds checks')
        var val = this.renderProps[sourceIndex];
        this.renderProps.splice(sourceIndex,1)
        this.renderProps.splice(destIndex,0,val);
        this.listWrappers.forEach(x=>x.move(sourceIndex,destIndex));
    }
    sort(sortFunction){
        sortFunction = sortFunction || betterSort;
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
}

"a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bb,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,command,datagrid,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,eventsource,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,isindex,kbd,keygen,label,legend,li,link,map,mark,menu,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr"
.split(',').forEach(t=>window[t] = (attr,content)=>generateElement(t,attr,content));