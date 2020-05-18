function trace(context){
    context = context || {};
    var allowedTypes = "string,number,boolean".split(',');
    
    var elemTypes = 
    "a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bb,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,command,datagrid,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,eventsource,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,,head,header,hgroup,hr,html,i,iframe,img,input,ins,isindex,kbd,keygen,label,legend,li,link,map,mark,menu,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr"
    .split(',');
    
    context.blank = function(){return document.createElement('div')};
    elemTypes.forEach(function(elemName){
        context[elemName] = function(param1,param2,extra){
            if(extra) throw "RenderObject cannot have more than 2 parameters"
            return generateElement(elemName,param1,param2)}
    })
    
    function generateElement(elemType,param1,param2){
        var params = processParams(param1,param2)
        return new renderObject(params,elemType)

        function processParams(param1,param2){
            if(isContent(param1)){
                if(!param2) return {content:param1}
                else throw "cannot have another parameter after content"
            } 
            if(isContent(param2) && isAttributes(param1)) return {attributes:param1,content:param2}
            if(isAttributes(param1)) return {attributes:param1}
            return {};
            function isContent(param){
                return allowedTypes.includes(typeof(param)) 
                || param instanceof renderObject 
                || Array.isArray(param)
                || param instanceof Element;
            }
            function isAttributes(param){
                return !!param;
            }
        }
    }

    function renderObject(params,elemType){
        var ref = this;
        ref.parameters = params,
        ref.elementType = elemType
        ref.render = function(parent,oldElem){
            ref.element = createElement();
            oldElem && parent.insertBefore(ref.element,oldElem);
            oldElem && parent.removeChild(oldElem);
            !oldElem && parent.appendChild(ref.element);
            return ref.element;
        }
        ref.delete = function(){
            ref.element.parentNode.removeChild(ref.element)
        }
        ref.onRender = function(callback){
            return{render:function(parent,elem){
                var elem = ref.render(parent,elem);
                callback(elem,ref);
            }}
        }
        function createElement(){
            var elem = document.createElement(elemType);
            params.content != null && params.content != undefined && setContent(elem,params.content);
            params.attributes && setAttributes(elem,params.attributes);
            return elem;

            function setContent(element,content){
                setContentRecursive(content);  
                function setContentRecursive(cnt){
                    if(Array.isArray(cnt)) return cnt.forEach(setContentRecursive);
                    if(allowedTypes.includes(typeof cnt)) 
                        return (element.innerHTML += cnt);
                    if(content instanceof Element)
                        return element.appendChild(cnt)
                    cnt.render && cnt.render(element);
                    cnt instanceof Element && element.appendChild(cnt);
                }
            }

            function setAttributes(element,attributes){
                Object.keys(attributes).forEach(function(key){
                    (typeof attributes[key] == "function") && 
                    (element[key] = attributes[key]) || 
                    element.setAttribute(key,attributes[key])
                });
            }
        }
    }
}

class RenderProp{
    constructor(value){
        var ref = this;
        if(value instanceof RenderProp) ref.value = value.get();
        ref.__renders = [];
        ref.__value = value;
        var utils;
  
        ref.update = function(updateFunction){
            ref.set(updateFunction(ref.get()))
        }
        ref.get = function(){return ref.__value};
        ref.set = function(newValue){
            ref.__value =  newValue;
            ref.__value = newValue;
            ref.__renders = ref.__renders.filter(function(x){
                if(!document.body.contains(x.elem)) return false;
                if(x.unFoc && (x.elem.contains(document.activeElement) || x.elem === document.activeElement)) return true;
                var renderObj = x.renderFunction(ref.__value,utils)
                var newElem = renderObj.render(x.parent,x.elem)
                x.elem =  newElem;
                return true;
            })
        }
        ref.deleteAll = function(){
            ref.__renders.forEach(x=>{
                x.parent.removeChild(x.elem);
            })
        }
        ref.ufDisplay = function(renderFunction,utl){
            return bind(renderFunction,utl,true)
        }
        ref.display = function(renderFunction){
            return bind(renderFunction,false)
        }

        function bind(renderFunction,unFoc){
            return {
                render:function(parent){
                    var rObj = renderFunction(ref.__value,utils);
                    if(!(rObj && rObj.render))
                        throw "display function did not return a RenderObject. it returned: "+JSON.stringify(rObj)
                    var elem = rObj.render(parent);
                    ref.__renders.push({renderFunction,elem,parent,unFoc})
                    return elem;
                }
            }
        }
    }
}

class RenderListItem extends RenderProp{
    constructor(value,id){
        super(value);
        var ref = this;
        ref.utils = null;
        ref.id = id;
        var baseDisplay = this.display;
        ref.display = function(renderFunction,utils){
            ref.utils = utils
            return baseDisplay(renderFunction)
        }
    }
    static generateFromRenderProp(){
        return {};
    } 
}

class RenderList{
    constructor(values){
        var ref = this;
        var id= 0;
        ref.__values = values.map(x=>new RenderListItem(x,id++));//here111
        ref.__renders = [];

        ref.at = function(index){
            return ref.__values[index];
        }
        ref.length = function(){
            return ref.values.length;
        }

        ref.pop = function(){
            return ref.removeAt(ref.__values.length-1)
        };
        ref.shift = function(){
            return ref.removeAt(0);
        };
        
        ref.prepend = function(value){
            ref.insertAt(0,value)
        };
        ref.append = function(value){
            ref.insertAt(ref.__values.length,value)
        }

        function getIndexFromId(id){
            var index;
            ref.__values.find((x,i)=>x.id == id && (index =i))
            return index;
        }

        function getUtils(rProp){
            return{
                rProp,
                insertBefore:function(value){
                    ref.insertAt(getIndexFromId(rProp.id),value)
                },
                delete:function(){
                    return ref.removeAt(getIndexFromId(rProp.id))
                },
                insertAfter:function(value){
                    ref.insertAt(getIndexFromId(rProp.id)+1,value)
                },
                getIndex:function(){
                    return getIndexFromId(rProp.id);
                },
                val:function(){
                    return ref.at(getIndexFromId(rProp.id))
                },
            }
        }

        ref.insertAt = function(index,value){
            var currentProp = ref.__values[index];
            var newProp = new RenderProp(value,id++);
            if(currentProp){
                ref.__renders.forEach(x=>{
                    var currentRender = getRender(currentProp,x.parent);
                    var newElem = newProp.display(x.renderFunction,getUtils(newProp)).render(x.parent)
                    x.parent.insertBefore(newElem,currentRender.elem)
                })
                ref.__values.splice(index,0,newProp);
            }
            else{
                ref.__renders.forEach(x=>{
                    newProp.display(x.renderFunction,getUtils(newProp)).render(x.parent)
                })
                ref.__values.splice(index,0,newProp);
            }

            function getRender(rProp,parent){
                return rProp.__renders.find(x=> x.parent == parent)
            }
        }
        ref.removeAt = function(index){
            var rProp = ref.__values[index];
            if(!rProp) return null;
            rProp.deleteAll();
            ref.__values.splice(index,1);
            return rProp.get();
        }
        ref.display = function(renderFunction){
            return {render:function(parent,element){
                element && parent.removeChild(element);
                ref.__renders.push({renderFunction,parent});
                ref.__values.forEach(x=>x.display(renderFunction,getUtils(x)).render(parent))
            }}
        }
        ref.ufDisplay = function(renderFunction){
            throw "not done yet" //here222
        }
    }
}

//IT AINT DONE YET

//autocomplete fix for vscode 26
//todo remove renderfunctions from the renderlist that are no longer viable 13
//todo stop user from using multiple lists per parent 5
//todo RenderProp attributes/values 5
//todo "footer" prop for lists. 3
//loose focus update. 2
//todo turn classes into methods 3
//todo add way to parse out all RenderProps/lists and turn it back into a simple object
//todo make trace work on both front and backend
//todo make trace handle onkeypress events.
//todo rename it it "gium" or "vestigium" or "nishaan" or "rastro" or "Spur" something
//todo revisit renderprop mapping "here111"
//todo make renderprop object for lists that extends a regular renderprop
//todo finish ufDisplay for lists.
