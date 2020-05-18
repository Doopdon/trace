function trace(context){
    context = context || {};
    var allowedTypes = "string,number,boolean".split(',');
    var elemTypes = "a,p,br,div,span,h1,h2,h3,h4,h5,h6,table,tr,td,th,label,button,textArea".split(',');
    
    context.blank = function(){return document.createElement('div')};
    elemTypes.forEach(function(elemName){
        context[elemName] = function(param1,param2){return generateElement(elemName,param1,param2)}
    })
    
    function generateElement(elemType,param1,param2){
        var params = processParams(param1,param2)
        return new renderObject(params,elemType)

        function processParams(param1,param2){
            if(isContent(param1)) return {content:param1}
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
                if(allowedTypes.includes(typeof content)) 
                    return (element.innerHTML = content);
                if(content instanceof Element)
                    return element.appendChild(content)

                setContentRecursive(content);  
                function setContentRecursive(cnt){
                    if(Array.isArray(cnt)) return cnt.forEach(setContentRecursive);
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

class renderProp{
    constructor(value,id){
        var ref = this;
        if(value instanceof renderProp) ref.value = value.get();
        ref.__renders = [];
        ref.__value = value;
        ref.id = id;
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
                var newElem = x.renderFunction(ref.__value,utils).render(x.parent,x.elem)
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
        ref.display = function(renderFunction,utl){
            return bind(renderFunction,utl,false)
        }

        function bind(renderFunction,utl,unFoc){
            utils = utl;
            return {
                render:function(parent){
                    var elem = renderFunction(ref.__value,utils).render(parent);
                    ref.__renders.push({renderFunction,elem,parent,unFoc})
                    return elem;
                }
            }
        }
    }
}

class renderList{
    constructor(values){
        var ref = this;
        var id= 0;
        ref.__values = values.map(x=>new renderProp(x,id++));
        ref.__renders = [];

        ref.at = function(index){
            return ref.__values[index];
        }
        ref.length = function(){
            return ref.values.length;
        }

        ref.pop = function(){
            return ref.deleteAt(ref.__values.length-1)
        };
        ref.shift = function(){
            return ref.deleteAt(0);
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
                insertBefore:function(value){
                    ref.insertAt(getIndexFromId(rProp.id),value)
                },
                delete:function(){
                    return ref.deleteAt(getIndexFromId(rProp.id))
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
            var newProp = new renderProp(value,id++);
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
        ref.deleteAt = function(index){
            var rProp = ref.__values[index];
            if(!rProp) return null;
            rProp.deleteAll();
            ref.__values.splice(index,1);
            return rProp.get();
        }
        ref.display = function(renderFunction){
            return {render:function(parent){
                ref.__renders.push({renderFunction,parent});
                ref.__values.forEach(x=>x.display(renderFunction,getUtils(x)).render(parent))
            }}
        }
    }
}

//IT AINT DONE YET

//autocomplete fix for vscode 26
//todo remove renderfunctions from the renderlist that are no longer viable 13
//todo stop user from using multiple lists per parent 5
//todo renderProp attributes/values 5
//todo "footer" prop for lists. 3
//loose focus update. 2
//todo add all html elements 5
//todo turn classes into methods 3
//todo add better error for handing in null instead of renderObject
//todo add way to parse out all renderProps/lists and turn it back into a simple object
//TODO make ['string'] work.
//todo capitalize object names
//todo make trace work on both front and backend
//todo make trace handle onkeypress events.
//todo handle p(["some stuff",span("more stuff"),"continuing with stuff"])



//bugs the render on a renderList does not remove existing element.  vvvv broken code vvvv
// var state = new renderProp({data:null})

// function app(root){
//     trace(this);
//     div([
//         state.display(x=>{
//             if(!x.data) 
//                 return h1('Loading...')
//             let y = x.data.display(x=>h1('item'))
//             return y;
//         })
//     ]).render(root)
// }

// //fetch('/api/test').then(x=>console.log(x))
// makeCall('getall',data=>{
//     state.update(x=>{
//         x.data = new renderList(JSON.parse(data))
//         return x;
//     })
// })
// var _root = document.getElementById('root');
// app(_root)

// function makeCall(route,callback) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200)
//             callback(this.response)
//     };
//     xhttp.open("GET", "api/"+route, true);
//     xhttp.send();
// }

//needs to take renderObject alone 
//td([coolButton('buy')]) vs td(coolButton('buy'))





