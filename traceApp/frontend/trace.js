(function(){
    // "use strict"
    window.trace = function(context){
        context = context || {};
        var allowedTypes = "string,number,boolean".split(','); 

        "a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bb,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,command,datagrid,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,eventsource,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,isindex,kbd,keygen,label,legend,li,link,map,mark,menu,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr"
        .split(',').forEach(function(elemName){
            context[elemName] = function(param1,param2,extra){
                if(extra) throw elemName+"() cannot have more than 2 parameters"
                return generateElement(elemName,param1,param2)}
        })
        return context;

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
                    || Array.isArray(param)
                    || param instanceof Element
                    || (param && param.render)
                    || (param && param.genAtr);
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
                var ruleTypesUsed =[];
                params.content != null && params.content != undefined && setContent(elem,params.content);
                params.attributes && setAttributes(elem,params.attributes);
            
                return elem;
                
                function setContent(element,content){
                    setContentRecursive(content);  
                    function setContentRecursive(cnt){
                        if(Array.isArray(cnt)) return cnt.forEach(setContentRecursive);
                        checkForError(cnt.ruleType)
                        if(allowedTypes.includes(typeof cnt)) 
                            return (element.innerHTML += cnt);
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

                function setAttributes(element,attributes){
                    Object.keys(attributes).forEach(function(key){
                        if(attributes[key].genAtr) return attributes[key].genAtr(key,element);
                        (typeof attributes[key] == "function") && 
                        (element[key] = attributes[key]) || 
                        element.setAttribute(key,attributes[key])
                    });
                }
            }
        }
    }
    window.RenderProp = function(value){
        var ref = this || {};
        if(value instanceof RenderProp) ref.value = value.get();
        ref.__renders = [];
        atrFunctions(ref);
        ref.__value = value;

        ref.update = function(updateFunction){
            updateFunction = updateFunction || function(x){return x}
            ref.set(updateFunction(ref.get()))
        }
        ref.get = function(){return ref.__value};
        ref.set = function(newValue){
            ref.__value =  newValue;
            ref.__runAllAtrFunctions();
            ref.__renders = ref.__renders.filter(function(x){
                if(!document.body.contains(x.elem)) {
                    ref.onDeleteRF && ref.onDeleteRF(x.renderFunction)
                    return false;
                }
                if(x.unFoc && x.elem.contains(document.activeElement)) return true;
                var renderObj = x.renderFunction(ref.__value,ref)
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
        ref.ufDisplay = function(renderFunction){return bind(renderFunction,true)}
        ref.display = function(renderFunction){return bind(renderFunction,false)}
        ref.getObjValue = function(){
            var output = {};
            Object.keys(ref.__value).forEach(key=>{
                var val = ref.__value[key];
                val = val.getObjValue && val.getObjValue() || val;
                output[key] = val;
            })
            return output;
        }
        return ref;
        function bind(renderFunction,unFoc){
            return {
                render:function(parent){
                    var rObj = renderFunction(ref.__value,ref);
                    if(!(rObj && rObj.render))
                        throw "display function did not return a RenderObject. it returned: "+JSON.stringify(rObj)
                    var elem = rObj.render(parent);
                    if(unFoc) {
                        elem.addEventListener("onfocusout", function(){
                            renderFunction(ref.__value,ref).render(parent,elem)
                        })
                    }
                    ref.__renders.push({renderFunction,elem,parent,unFoc})
                    return elem;
                }
            }
        }
    }

    function makeRenderListItem(renderProp,id,getUtils,onDeleteRF){
        renderProp instanceof RenderProp || (renderProp = new RenderProp(renderProp))
        renderProp.utils = getUtils(renderProp);
        renderProp.id = id;
        renderProp.onDeleteRF = onDeleteRF;
        return renderProp
    }

    window.RenderList = function(values){
        var ref = this || {};
        var idItr= 0;
        atrFunctions(ref);
        ref.__values = values.map(function(x){ return makeRenderListItem(x,idItr++,getUtils,deleteRF) });
        ref.__renders = [];

        ref.at = function(index){return ref.__values[index];}
        ref.getLength = function(){return ref.values.length;}

        ref.pop = function(){return ref.removeAt(ref.__values.length-1)};
        ref.shift = function(){return ref.removeAt(0);};
        ref.prepend = function(value){ref.insertAt(0,value)};
        ref.append = function(value){ref.insertAt(ref.__values.length,value)}

        ref.insertAt = function(index,value){
            var currentProp = ref.__values[index];
            var newProp = makeRenderListItem(value,idItr++,getUtils,deleteRF);
            if(currentProp){
                ref.__renders.forEach(x=>{
                    var currentRender = currentProp.__renders.find(r=> r.parent == x.parent)//getRender(currentProp,x.parent);
                    var newElem = newProp.display(x.renderFunction,getUtils(newProp)).render(x.parent)
                    x.parent.insertBefore(newElem,currentRender.elem)
                })
                ref.__values.splice(index,0,newProp);
            }
            else{
                ref.__renders.forEach(x=>{
                    var elem = newProp.display(x.renderFunction,getUtils(newProp)).render(x.parent)
                    x.footerElms && x.parent.insertBefore(elem,x.footerElms[0]);
                })
                ref.__values.splice(index,0,newProp);
            }
            ref.__runAllAtrFunctions()
        }
        ref.removeAt = function(index){
            var rProp = ref.__values[index];
            if(!rProp) return null;
            rProp.deleteAll();
            ref.__values.splice(index,1);
            ref.__runAllAtrFunctions()
            return rProp.get();
        }

        ref.display = function(renderFunction){return bind(renderFunction,false)}
        ref.ufDisplay = function(renderFunction){return bind(renderFunction,true)}
        ref.getObjValue = function(){
            return ref.__values.map(function(x){return x.getObjValue()})
        }
        return ref;

        function getIndexFromId(id){
            var index;
            ref.__values.find((x,i)=>x.id == id && (index =i))
            return index;
        }

        function getUtils(rProp){
            rProp.delete = function(){return ref.removeAt(getIndexFromId(rProp.id))}
            rProp.getIndex = function(){return getIndexFromId(rProp.id)}
            rProp.insertAt = function(index,value){return ref.insertAt(index,value)}
        }

        function deleteRF(renderFunction){
            ref.__renders.filter(function(x){x != renderFunction})
        }

        
        function bind(renderFunction,uf){
            var footers;
            var render = function(parent,element){
                element && parent.removeChild(element);
                var functionName = uf && 'ufDisplay' || 'display'
                ref.__values.forEach(x=>x[functionName](renderFunction,x).render(parent))
                var footerElms = footers && footers.map(function(x){return x.render(parent)});
                ref.__renders.push({renderFunction,parent,footerElms});
            }
            var footer = function(footerRF){
                footers = footers || []
                if(footerRF.ruleType == 'list') throw 'footer cannot directly contain a RenderList, it can, however, contain an element with a list in it.'
                footers.push(footerRF);
                return{ruleType:'list',footer,render}
            }
            return {ruleType:'list',footer,render}
        }
    }

    function atrFunctions(ref){
        ref.__atrRenders = [];
        ref.atr = function(renderFunction){
            renderFunction =  renderFunction || function(x){return x};
            return {
                ruleType:'atrObj',
                genAtr:function(atrName,elem){
                    function atrRender(){
                        if(atrName == 'innerHTML') return elem.innerHTML =
                            renderFunction(ref.__value || ref.__values,ref);
                        elem.setAttribute(atrName,renderFunction(ref.__value || ref.__values,ref))
                    }
                    ref.__atrRenders.push({atrRender,elem});
                    atrRender();
                }
            }
        }
        ref.__runAllAtrFunctions = function(){
            ref.__atrRenders = ref.__atrRenders.filter(function(x){
                if(!document.body.contains(x.elem)) return false;
                x.atrRender();
                return true
            })
        }
    }
})()

//IT AINT DONE YET

//autocomplete fix for vscode 26
//todo make trace work on both front and backend 13
//todo rename it it "gium" or "vestigium" or "nishaan" or "rastro" or "Spur" or "harch" "kursdom" "layshon"
//todo test on IE ughghghg
//rename render to insertInto
//html to trace converter
//addEventListener thing
//todo remove ufDisplay. its a hack and people should do it themselves. (add it to the widgets)
//
//
//bug "trace(this)" pollutes the global scope