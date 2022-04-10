var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("trace", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wbr = exports.video = exports.ul = exports.u = exports.tt = exports.track = exports.tr = exports.title = exports.time = exports.thead = exports.th = exports.tfoot = exports.textarea = exports.td = exports.tbody = exports.table = exports.sup = exports.sub = exports.style = exports.strong = exports.strike = exports.span = exports.source = exports.small = exports.select = exports.section = exports.script = exports.samp = exports.s = exports.ruby = exports.rt = exports.rp = exports.q = exports.progress = exports.pre = exports.param = exports.p = exports.output = exports.option = exports.optgroup = exports.ol = exports.object = exports.noscript = exports.noframes = exports.nav = exports.meter = exports.meta = exports.menu = exports.mark = exports.map = exports.link = exports.li = exports.legend = exports.label = exports.keygen = exports.kbd = exports.isindex = exports.ins = exports.input = exports.img = exports.iframe = exports.i = exports.html = exports.hr = exports.hgroup = exports.header = exports.head = exports.h6 = exports.h5 = exports.h4 = exports.h3 = exports.h2 = exports.h1 = exports.frameset = exports.frame = exports.form = exports.footer = exports.font = exports.figure = exports.figcaption = exports.fieldset = exports.eventsource = exports.embed = exports.em = exports.dt = exports.dl = exports.div = exports.dir = exports.dialog = exports.dfn = exports.details = exports.del = exports.dd = exports.datalist = exports.datagrid = exports.command = exports.colgroup = exports.col = exports.code = exports.cite = exports.center = exports.caption = exports.canvas = exports.button = exports.br = exports.body = exports.blockquote = exports.big = exports.bdo = exports.bb = exports.basefont = exports.base = exports.b = exports.audio = exports.aside = exports.article = exports.area = exports.applet = exports.address = exports.acronym = exports.abbr = exports.a = exports.RenderList = exports.RenderProp = void 0;
    var Wrapper = /** @class */ (function () {
        function Wrapper() {
            this.onRenderFunction = null; //this is the default value for the 'onRenderFunction' which is called when the element is added
        }
        Object.defineProperty(Wrapper.prototype, "$element", {
            get: function () {
                return this._$element;
            },
            set: function (value) {
                this._$element = value;
            },
            enumerable: false,
            configurable: true
        });
        //this does nothing as it should not be called. the children will have working versions
        Wrapper.prototype.update = function (e) { return false; };
        //this does nothing as it should not be called. the children will have working versions
        Wrapper.prototype.render = function (e, t) { return null; };
        Wrapper.prototype.addChild = function (childWrapper) {
            this.childWrappers.push(childWrapper);
        };
        Wrapper.prototype.removeChild = function (childWrapper) {
            this.childWrappers = this.childWrappers.filter(function (x) { return x !== childWrapper; });
        };
        Wrapper.prototype.onRenderEvent = function () {
            this.onRenderFunction && this.onRenderFunction(this.$element, this);
        };
        Wrapper.prototype.onRender = function (onRenderFunction) {
            this.onRenderFunction = onRenderFunction;
            delete this.onRender;
            return this;
        };
        return Wrapper;
    }());
    //Element wrapper holds a reference to an HTML element, and to its parent and child element wrappers.
    var ElementWrapper = /** @class */ (function (_super) {
        __extends(ElementWrapper, _super);
        function ElementWrapper(renderFunction) {
            var _this = _super.call(this) || this;
            _this.renderFunction = renderFunction; //each element wrapper has a render function that creates an element
            _this.$element = null; //The created element is stored here 
            _this.childWrappers = []; //Holds a list of all the chid element wrappers so traversal can happen.
            return _this;
        }
        ElementWrapper.prototype.update = function ($triggerElem) {
            if ($triggerElem === void 0) { $triggerElem = null; }
            if ($triggerElem && this.$element.contains($triggerElem))
                return true; //if the element param is present and this wrappers element contains it. do not update
            if (!document.contains(this.$parent))
                return false; //if the parent is not on the document the wrapper needs to be removed from memory. (false indicates it is not on the dom)
            this.render(this.$parent, this.parentWrapper); //
            return true;
        };
        ElementWrapper.prototype.render = function ($parent, parentWrapper, loc) {
            if (loc === void 0) { loc = null; }
            if (typeof $parent === 'string')
                $parent = document.getElementById($parent); //use the string as an id to find the element as shorthand
            this.$parent = $parent;
            this.parentWrapper = parentWrapper; //set the parent and parent wrapper for this wrapper
            var $element = this.renderFunction($parent, this); //use the render function to generate an element and insert it into the parent.
            if (!this.$element) { ////if a rendered element does not exist: 
                parentWrapper === null || parentWrapper === void 0 ? void 0 : parentWrapper.addChild(this); //add itself to the parents children
                var $afterElm = void 0;
                if (loc >= 0) {
                    $afterElm = $parent.children[loc]; //determine if it is supposed to be inserted at a specific location
                }
                if (!!$afterElm)
                    $parent.insertBefore($element, $afterElm); //insert it at that location
                else
                    $parent.appendChild($element); //or add it to the end.
            }
            //if(!this.$element) $parent.appendChild($element);//if a rendered element does not exist, simply append it to the parent
            else { //if there is a referenced element, 
                $parent.insertBefore($element, this.$element); //the new element needs to be appended before the old one
                $parent.removeChild(this.$element); //remove the old element
            }
            this.$element = $element; //set the element reference to the new element todo 2232 see if I can get rid of the return
            this.onRenderEvent(); //call this so the user can run code when the element is rendered
            return this.$element;
        };
        ElementWrapper.prototype.append = function (wrapper) {
            wrapper.render(this.$element, this);
        };
        ElementWrapper.prototype.prepend = function (wrapper) {
            wrapper.render(this.$element, this, 0);
        };
        ElementWrapper.prototype.insertAt = function (wrapper, loc) {
            wrapper.render(this.$element, this, loc);
        };
        return ElementWrapper;
    }(Wrapper));
    //List wrappers do not hold an element reference, just a parent. They reuse the given render function for each item in the renderProps parameter
    var ElementWrapperList = /** @class */ (function (_super) {
        __extends(ElementWrapperList, _super);
        function ElementWrapperList(renderFunction, renderProps) {
            var _this = _super.call(this) || this;
            _this.renderFunction = renderFunction; //set the render function for this list
            _this.__initialChildWrappers = renderProps.map(function (x) { return x.display(renderFunction); }); //get every wrapper for each render prop.
            _this.childWrappers = []; //holds a reference to all the child wrappers in the list
            return _this;
        }
        ElementWrapperList.prototype.__getFooterElement = function () {
            var _this = this;
            var foundSelf = false;
            var $foundElement;
            this.parentWrapper.childWrappers.find(function (x) {
                if (foundSelf)
                    return !!($foundElement = x.$element); //if the self has been found return the next wrapper
                if (x === _this)
                    foundSelf = true;
                return false; //if the current wrapper is self, then set found self to true, return false, the next element is the element after
            });
            return $foundElement; //return the found element if it exists
        };
        Object.defineProperty(ElementWrapperList.prototype, "$element", {
            get: function () {
                return this.childWrappers[0] && this.childWrappers[0].$element;
            },
            enumerable: false,
            configurable: true
        });
        ElementWrapperList.prototype.insertAt = function (index, renderProp) {
            var _a;
            var $element = ((_a = this.childWrappers[index]) === null || _a === void 0 ? void 0 : _a.$element) || this.__getFooterElement(); //find the element at the index, or find the footer if there is none.
            var newWrapper = renderProp.display(this.renderFunction); //create a new wrapper with the renderFunction
            var $newElement = newWrapper.render(this.$parent, this); //hand in the parent, and render the element. hand in the reference to the list (this) so the parent wrapper can be set.
            this.childWrappers.splice(index, 0, this.childWrappers.pop()); //the wrapper needs to be inserted into the list, but its already at the end (because the render method adds it to the end), so its popped off and then inserted
            $element && this.$parent.insertBefore($newElement, $element) || this.$parent.appendChild($newElement); //if the footer element exists append before it, or just append to the parent
        };
        ElementWrapperList.prototype.deleteAt = function (index) {
            var _a;
            var $elementToDelete = (_a = this.childWrappers[index]) === null || _a === void 0 ? void 0 : _a.$element; //get the actual element of the child element wrapper
            if (!$elementToDelete)
                throw { message: "ERROR: Cannot delete element because none was found at index [".concat(index, "]."), invalidObject: this.childWrappers }; //throw an error if the index does not point to an element
            this.childWrappers.splice(index, 1); //remove wrapper from child wrapper list
            this.$parent.removeChild($elementToDelete); //remove the element from the dom
        };
        ElementWrapperList.prototype.render = function ($parent, parentWrapper) {
            var _this = this;
            this.$parent = $parent; //set the parent element for dom manipulation purposes.
            this.parentWrapper = parentWrapper; //set the parent wrapper for the ElementWrapperList
            parentWrapper && parentWrapper.addChild(this); //add self to child wrapper list (childWrappers) of parent
            this.__initialChildWrappers.forEach(function (x) { return x.render($parent, _this); }); //this will add all the wrappers to the child wrapper list (childWrappers). all subsequent additions will not use the __initialChildWrappers but the childWrappers
        }; //todo add update to list(i think)
        return ElementWrapperList;
    }(Wrapper));
    ///////////////////////////////AttributeInserts//////////////////
    //Attribute Insert class handles changes to attributes of individual elements without re rendering the element (which could be expensive if there are many child elements)
    var AttributeInsert = /** @class */ (function () {
        function AttributeInsert(renderFunction, rProp) {
            this.renderFunction = renderFunction || (function (s, t) { return s; });
            this.rProp = rProp;
        }
        AttributeInsert.prototype.update = function () {
            if (!this.$element)
                return;
            var val = this.renderFunction(this.rProp.val, this.rProp);
            var t = this.$element.innerHTML;
            if (this.atrName === 'innerHTML')
                return (this.$element.innerHTML = val);
            if (typeof val === 'boolean') //TODO figure out why i dont need this for standard attributes
                return (this.$element[this.atrName] = val);
            this.$element.setAttribute(this.atrName, val);
        };
        AttributeInsert.prototype.generateAttribute = function (atrName, $element) {
            this.$element = $element;
            this.atrName = atrName;
            this.update();
        };
        return AttributeInsert;
    }());
    ///////////////////////////////Props/////////////////////////////
    //base class for all RenderProp functionality
    var Prop = /** @class */ (function () {
        function Prop() {
            this.attributeInserts = []; //holds a list of all attribute Inserts which tie the Prop value to element attributes
        }
        Object.defineProperty(Prop.prototype, "val", {
            get: function () {
                return this._val;
            },
            set: function (value) {
                this._val = value;
            },
            enumerable: false,
            configurable: true
        });
        Prop.prototype.atr = function (renderFunction) {
            var atrInsert = new AttributeInsert(renderFunction, this); //adds the render function that may add additional processing to the value before passing it into the attribute
            this.attributeInserts.push(atrInsert); //add the AttributeInsert to the list
            return atrInsert;
        };
        Prop.prototype.display = function (renderFunction) {
            if (renderFunction instanceof Wrapper)
                throw { message: "ERROR: Cannot pass an \"Element Wrapper\" into display(), it must be a function ex: prop.display(x=>h1('text')) not prop.display(h1('text'))", invalidObj: renderFunction };
            if (typeof renderFunction !== 'function')
                throw { message: 'ERROR: Display must receive a function', invalidObject: renderFunction };
        };
        Prop.prototype.baseChange = function () {
            this.attributeInserts.forEach(function (x) { return x.update(); }); //TODO check for mem leaks.
            this.__onChange && this.__onChange(this.val, this);
        };
        Prop.prototype.update = function (funct) {
            funct = funct || (function (x) { return x; });
            this.val = funct(this.val);
        };
        Prop.prototype.onChange = function (callback) {
            this.__onChange = callback;
        };
        return Prop;
    }());
    var RenderProp = /** @class */ (function (_super) {
        __extends(RenderProp, _super);
        function RenderProp(value) {
            var _this = _super.call(this) || this;
            _this.val = value; //value that represents the state of the render prop
            _this.wrappers = []; //holds a list of wrappers that need to be updated when the value is changed
            _this.boundWrappers = [];
            _this.hidden = false;
            return _this;
        }
        Object.defineProperty(RenderProp.prototype, "val", {
            set: function (value) {
                this.__setValue(value, null);
            },
            enumerable: false,
            configurable: true
        });
        RenderProp.prototype.__setValue = function (value, element) {
            this.val = value; //change the value/
            this.baseChange(); //apply any changes that the base class needs.
            this.wrappers = this.wrappers.filter(function (x) { return x.update(element); }); //re-run all the render functions for the wrappers
        };
        RenderProp.prototype.update = function (funct) {
            funct = funct || (function (x) { return x; });
            this.val = funct(this.val);
        };
        RenderProp.prototype.display = function (renderFunction) {
            var _this = this;
            _super.prototype.display.call(this, renderFunction); //check for errors.
            var newWrapper = new ElementWrapper(function (p, ref) {
                var val = renderFunction(_this.val, _this); //this time we call the render function, and pass in the value and the reference to the the whole renderProp (useful for list items)
                return val.render && val.render(p, ref) || div({ style: 'display:none !important' }, []).render(p, ref); //add a blank div if no render function is available. TODO 38383
            }); //when called render function we pass in returns an element wrapper. which has its own render function which we then call with the parent element wrapper 
            this.wrappers.push(newWrapper); //push the new wrapper so it can be accessed later and updated if needed.
            return newWrapper; //return the element wrapper so the parent has a reference to it.
        };
        RenderProp.prototype.boundUpdate = function (event_element, value) {
            var $element = (event_element === null || event_element === void 0 ? void 0 : event_element.target) || event_element; //get the event.target, or just the target (element)
            if (!$element)
                throw "element or event not provided";
            value = value || $element.value; //get the value from the element or from the parameter
            this.__setValue(value, $element); //call the __setValue function but hand in the element so this element wont be updated.
        };
        RenderProp.prototype.bUp = function () { return this.boundUpdate.bind(this); }; //helps with short-handing boundUpdate function. onclick:(e)=>boundUpdate(e) vs onclick:bUp()
        return RenderProp;
    }(Prop));
    exports.RenderProp = RenderProp;
    //This Class is a render prop that is inside a render list. it has a few extra features to easy use of renderLists
    var RenderListProp = /** @class */ (function (_super) {
        __extends(RenderListProp, _super);
        function RenderListProp(value, parent, id) {
            var _this = _super.call(this, value) || this;
            _this.parentRenderList = parent; //save a reverence to the parent "render list" so functions can be called on it
            _this.__id = id || parent.__idItr++; //set the id of this list item. (it will stay the same until the list item is removed)
            return _this;
        }
        RenderListProp.prototype.delete = function () {
            this.parentRenderList.deleteAt(this.index); //deletes self from the parent list using this props index.
        };
        RenderListProp.prototype.moveTo = function (index) {
            this.parentRenderList.move(this.index, index); //tell the parent to move this element to another index (using its initial index)
        };
        Object.defineProperty(RenderListProp.prototype, "index", {
            get: function () {
                return this.parentRenderList.__idMap[this.__id]; //the parent list has a map of ids to indexes. so the index can be found quickly with the id.
            },
            enumerable: false,
            configurable: true
        });
        return RenderListProp;
    }(RenderProp));
    var RenderList = /** @class */ (function (_super) {
        __extends(RenderList, _super);
        function RenderList(values) {
            var _this = _super.call(this) || this;
            _this.__idItr = 0; //this is a running total of the number of items added to the list. it increments each time. This can theoretically fail after you add more items than there are plank volumes in the observable universe.
            _this.renderProps = values.map(function (x, i) { return new RenderListProp(x, _this, i); }); //list of all the render props that are represented.
            _this.__mapIndexes(); //calling this function ties all the ids to indexes in O of N time.
            _this.__listWrappers = []; //this holds all the places the list is to be rendered
            _this.length = new RenderProp(_this.renderProps.length); //this is to show a changing list length value.
            return _this;
        }
        Object.defineProperty(RenderList.prototype, "val", {
            get: function () {
                return this.renderProps.map(function (x) { return x.val; }); //the value is just the val of each render prop put into an array.
            },
            set: function (newArray) {
                var _this = this;
                this.baseChange(); //insure that any AttributeInserts get updated.
                while (this.renderProps.length)
                    this.deleteAt(0, false); //delete each item. (do not map the indexes until the end to improve performance)
                newArray.forEach(function (x) { return _this.insertAt(0, x, null, false); }); //add each one into the array (do not override id and do not re-map each time for performance)
                this.length.val = this.renderProps.length; //update the length once so it doesn't render each time.
                this.__mapIndexes(); //after all items are added, then remap the indexes.
            },
            enumerable: false,
            configurable: true
        });
        RenderList.prototype.display = function (renderFunction) {
            _super.prototype.display.call(this, renderFunction);
            var listWrapper = new ElementWrapperList(renderFunction, this.renderProps);
            this.__listWrappers.push(listWrapper);
            return listWrapper;
        };
        RenderList.prototype.push = function (value) {
            this.insertAt(this.renderProps.length, value);
        };
        RenderList.prototype.unshift = function (value) {
            this.insertAt(0, value);
        };
        RenderList.prototype.insertAt = function (index, value, id, __mapIndexes) {
            if (id === void 0) { id = null; }
            if (__mapIndexes === void 0) { __mapIndexes = true; }
            index = Math.min(index, this.renderProps.length); //the index should be at max the length of the render props list
            var rProp = new RenderListProp(value, this, id); //create the new prop
            this.__listWrappers.forEach(function (x) { return x.insertAt(index, rProp); }); //go through each list wrapper and insert it at the index
            this.renderProps.splice(index, 0, rProp); //insert the prop into the list of props
            __mapIndexes && this.__mapIndexes(); //if this is a mass delete or add, do not map the indexes till the end.
            __mapIndexes && (this.length.val = this.renderProps.length); //update the length.
        };
        RenderList.prototype.pop = function () {
            return this.deleteAt(this.renderProps.length - 1);
        };
        RenderList.prototype.shift = function () {
            return this.deleteAt(0);
        };
        RenderList.prototype.deleteAt = function (index, __mapIndexes) {
            if (__mapIndexes === void 0) { __mapIndexes = true; }
            this.__listWrappers.forEach(function (x) { return x.deleteAt(index); });
            var val = this.renderProps[index].val;
            this.renderProps.splice(index, 1);
            __mapIndexes && (this.length.val = this.renderProps.length);
            __mapIndexes && this.__mapIndexes();
            return val;
        };
        RenderList.prototype.move = function (sourceIndex, destIndex) {
            if (sourceIndex === destIndex)
                return; //no need to continue, the item is where it should be.
            if (sourceIndex < 0 || sourceIndex >= this.renderProps.length) //check the source and destination are in-bounds
                throw "Cannot move: Source Index [".concat(sourceIndex, "] is out of bounds");
            if (destIndex < 0 || destIndex >= this.renderProps.length)
                throw "Cannot move: Destination Index [".concat(destIndex, "] is out of bounds");
            var propId = this.renderProps[sourceIndex].__id; //save the prop id
            var val = this.deleteAt(sourceIndex, false); //delete the item, (do not remap)
            this.insertAt(destIndex, val, propId); //add the item back in at the correct location. use the prop id instead of generating a new one.
        };
        RenderList.prototype.__mapIndexes = function () {
            var _this = this;
            this.__idMap = {}; //clear the id map
            this.renderProps.forEach(function (rp, i) {
                _this.__idMap[rp.__id] = i; //set the map at the 'id' index to the position in the list
            });
        };
        return RenderList;
    }(Prop));
    exports.RenderList = RenderList;
    ///////////////////FUNCTION GENERATION///////////////////////
    function generateElement(elementType, param1, param2, tooMany) {
        if (param2 === void 0) { param2 = null; }
        if (tooMany === void 0) { tooMany = undefined; }
        if (tooMany instanceof Wrapper)
            throw { message: "ERROR: ".concat(elementType, "(), contained too many parameters, it appears you are not using an array in the parameter"), invalidObj: tooMany };
        if (tooMany)
            throw { message: "ERROR: ".concat(elementType, "(), contained too many parameters"), invalidObj: tooMany }; //there should only be 2 arguments supplied by the user. additional arguments will cause sever problems.
        var attributes = param2 != null ? param1 : null; //if there is a second parameter, the first one is attributes
        var content = param2 != null ? param2 : param1; //if there is no second parameter the first one is the content, otherwise its the second one.
        return new ElementWrapper(createElement); //create a new ElementWrapper with a renderFunction that creates a dom element outlined by the attributes and content parameters.
        //understanding why the first parameter is unused is difficult (even for me) basically the virtual dom, made of ElementWrappers, 
        //is created bottom up. so the elements with no children, followed by their parents. But the dom needs to create the parents first
        // then the children. The generated element does not actually place the element on the dom. the Element wrapper does, and it uses a parent element. 
        //But this function does not, but since its called by the ElementWrapper like it does we need to ignore the first param.
        function createElement(intentionallyUnused, elementWrapperRef) {
            var $element = document.createElement(elementType); //generate the element of the given type
            if (typeof content === 'string')
                $element.textContent += content; //if there is only a string parameter, set the textContent TODO make this work with arays somehow
            else
                applyContent(content); //apply the content that is usually given in the "[]" second param
            applyAttributes(attributes); //apply the attributes to the element
            return $element; //return the created element
            //applies the content that the element contains.
            function applyContent(content) {
                if (content == null)
                    return; //can't apply content that isn't there.
                if (Array.isArray(content)) //if the content is an array:
                    return content.forEach(function (x) { return applyContent(x); }); //run the "apply content" function for each item in the array (this works recursively for arrays in arrays [[...],...,[...]])
                if (content instanceof Wrapper) //if you have a wrapper
                    return content.render($element, elementWrapperRef); //render the wrapper (this will call its "create element" function outlined above)
                if (content instanceof Element) //if its an element (if you create an element and put it in, it will still work)
                    return $element.appendChild(content); //add content to the parent element above since its an element TODO test this
                $element.innerHTML += content.toString(); //if its a string, set the inner html to it. no more elements need to be generated as its children TODO dont use innerHTML
            }
            //applies the attributes to the element
            function applyAttributes(attributes) {
                if (attributes == null)
                    return; //do not apply null attributes
                if (attributes instanceof Wrapper) //this would happen if the user enters parameters wrong
                    throw { message: "ERROR: cannot use \"Element Wrapper\" as attribute parameter", invalidObj: attributes };
                if (typeof attributes !== 'object')
                    throw { message: "ERROR: attributes parameter must be an object. not a ".concat(typeof attributes), invalidObj: attributes }; //attributes are stored as key value objects and cannot be anything else.
                Object.keys(attributes).forEach(function (key) {
                    if (attributes[key] instanceof AttributeInsert) //if the value is an AttributeInsert:
                        attributes[key].generateAttribute(key, $element); //call its generateAttribute method. this will return a value to set the attribute to, as well as tie the element to the AttributeInsert so it can be changed in the future.
                    else if (key === 'style' && typeof attributes[key] === 'object')
                        Object.assign($element.style, attributes[key]);
                    else if (typeof attributes[key] === 'function' || key === 'innerHTML') //if a function is handed in or innerHTML: TODO dont use innerHTML
                        $element[key] = attributes[key]; //the elements attributes need to be set programmatically, not with setAttribute. (this is for functions and )
                    else
                        $element.setAttribute(key, attributes[key]); //otherwise just use setAttribute with the key as the name and the value as the value. TODO add string check.
                });
            }
        }
    }
    //a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bb,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,command,datagrid,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,eventsource,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,isindex,kbd,keygen,label,legend,li,link,map,mark,menu,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr
    function a(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('a', param1, param2);
    }
    exports.a = a;
    function abbr(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('abbr', param1, param2);
    }
    exports.abbr = abbr;
    function acronym(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('acronym', param1, param2);
    }
    exports.acronym = acronym;
    function address(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('address', param1, param2);
    }
    exports.address = address;
    function applet(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('applet', param1, param2);
    }
    exports.applet = applet;
    function area(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('area', param1, param2);
    }
    exports.area = area;
    function article(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('article', param1, param2);
    }
    exports.article = article;
    function aside(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('aside', param1, param2);
    }
    exports.aside = aside;
    function audio(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('audio', param1, param2);
    }
    exports.audio = audio;
    function b(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('b', param1, param2);
    }
    exports.b = b;
    function base(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('base', param1, param2);
    }
    exports.base = base;
    function basefont(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('basefont', param1, param2);
    }
    exports.basefont = basefont;
    function bb(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('bb', param1, param2);
    }
    exports.bb = bb;
    function bdo(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('bdo', param1, param2);
    }
    exports.bdo = bdo;
    function big(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('big', param1, param2);
    }
    exports.big = big;
    function blockquote(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('blockquote', param1, param2);
    }
    exports.blockquote = blockquote;
    function body(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('body', param1, param2);
    }
    exports.body = body;
    function br(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('br', param1, param2);
    }
    exports.br = br;
    function button(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('button', param1, param2);
    }
    exports.button = button;
    function canvas(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('canvas', param1, param2);
    }
    exports.canvas = canvas;
    function caption(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('caption', param1, param2);
    }
    exports.caption = caption;
    function center(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('center', param1, param2);
    }
    exports.center = center;
    function cite(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('cite', param1, param2);
    }
    exports.cite = cite;
    function code(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('code', param1, param2);
    }
    exports.code = code;
    function col(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('col', param1, param2);
    }
    exports.col = col;
    function colgroup(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('colgroup', param1, param2);
    }
    exports.colgroup = colgroup;
    function command(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('command', param1, param2);
    }
    exports.command = command;
    function datagrid(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('datagrid', param1, param2);
    }
    exports.datagrid = datagrid;
    function datalist(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('datalist', param1, param2);
    }
    exports.datalist = datalist;
    function dd(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('dd', param1, param2);
    }
    exports.dd = dd;
    function del(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('del', param1, param2);
    }
    exports.del = del;
    function details(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('details', param1, param2);
    }
    exports.details = details;
    function dfn(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('dfn', param1, param2);
    }
    exports.dfn = dfn;
    function dialog(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('dialog', param1, param2);
    }
    exports.dialog = dialog;
    function dir(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('dir', param1, param2);
    }
    exports.dir = dir;
    function div(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('div', param1, param2);
    }
    exports.div = div;
    function dl(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('dl', param1, param2);
    }
    exports.dl = dl;
    function dt(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('dt', param1, param2);
    }
    exports.dt = dt;
    function em(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('em', param1, param2);
    }
    exports.em = em;
    function embed(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('embed', param1, param2);
    }
    exports.embed = embed;
    function eventsource(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('eventsource', param1, param2);
    }
    exports.eventsource = eventsource;
    function fieldset(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('fieldset', param1, param2);
    }
    exports.fieldset = fieldset;
    function figcaption(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('figcaption', param1, param2);
    }
    exports.figcaption = figcaption;
    function figure(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('figure', param1, param2);
    }
    exports.figure = figure;
    function font(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('font', param1, param2);
    }
    exports.font = font;
    function footer(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('footer', param1, param2);
    }
    exports.footer = footer;
    function form(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('form', param1, param2);
    }
    exports.form = form;
    function frame(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('frame', param1, param2);
    }
    exports.frame = frame;
    function frameset(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('frameset', param1, param2);
    }
    exports.frameset = frameset;
    function h1(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('h1', param1, param2);
    }
    exports.h1 = h1;
    function h2(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('h2', param1, param2);
    }
    exports.h2 = h2;
    function h3(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('h3', param1, param2);
    }
    exports.h3 = h3;
    function h4(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('h4', param1, param2);
    }
    exports.h4 = h4;
    function h5(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('h5', param1, param2);
    }
    exports.h5 = h5;
    function h6(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('h6', param1, param2);
    }
    exports.h6 = h6;
    function head(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('head', param1, param2);
    }
    exports.head = head;
    function header(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('header', param1, param2);
    }
    exports.header = header;
    function hgroup(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('hgroup', param1, param2);
    }
    exports.hgroup = hgroup;
    function hr(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('hr', param1, param2);
    }
    exports.hr = hr;
    function html(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('html', param1, param2);
    }
    exports.html = html;
    function i(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('i', param1, param2);
    }
    exports.i = i;
    function iframe(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('iframe', param1, param2);
    }
    exports.iframe = iframe;
    function img(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('img', param1, param2);
    }
    exports.img = img;
    function input(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('input', param1, param2);
    }
    exports.input = input;
    function ins(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('ins', param1, param2);
    }
    exports.ins = ins;
    function isindex(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('isindex', param1, param2);
    }
    exports.isindex = isindex;
    function kbd(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('kbd', param1, param2);
    }
    exports.kbd = kbd;
    function keygen(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('keygen', param1, param2);
    }
    exports.keygen = keygen;
    function label(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('label', param1, param2);
    }
    exports.label = label;
    function legend(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('legend', param1, param2);
    }
    exports.legend = legend;
    function li(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('li', param1, param2);
    }
    exports.li = li;
    function link(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('link', param1, param2);
    }
    exports.link = link;
    function map(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('map', param1, param2);
    }
    exports.map = map;
    function mark(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('mark', param1, param2);
    }
    exports.mark = mark;
    function menu(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('menu', param1, param2);
    }
    exports.menu = menu;
    function meta(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('meta', param1, param2);
    }
    exports.meta = meta;
    function meter(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('meter', param1, param2);
    }
    exports.meter = meter;
    function nav(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('nav', param1, param2);
    }
    exports.nav = nav;
    function noframes(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('noframes', param1, param2);
    }
    exports.noframes = noframes;
    function noscript(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('noscript', param1, param2);
    }
    exports.noscript = noscript;
    function object(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('object', param1, param2);
    }
    exports.object = object;
    function ol(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('ol', param1, param2);
    }
    exports.ol = ol;
    function optgroup(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('optgroup', param1, param2);
    }
    exports.optgroup = optgroup;
    function option(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('option', param1, param2);
    }
    exports.option = option;
    function output(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('output', param1, param2);
    }
    exports.output = output;
    function p(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('p', param1, param2);
    }
    exports.p = p;
    function param(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('param', param1, param2);
    }
    exports.param = param;
    function pre(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('pre', param1, param2);
    }
    exports.pre = pre;
    function progress(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('progress', param1, param2);
    }
    exports.progress = progress;
    function q(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('q', param1, param2);
    }
    exports.q = q;
    function rp(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('rp', param1, param2);
    }
    exports.rp = rp;
    function rt(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('rt', param1, param2);
    }
    exports.rt = rt;
    function ruby(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('ruby', param1, param2);
    }
    exports.ruby = ruby;
    function s(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('s', param1, param2);
    }
    exports.s = s;
    function samp(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('samp', param1, param2);
    }
    exports.samp = samp;
    function script(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('script', param1, param2);
    }
    exports.script = script;
    function section(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('section', param1, param2);
    }
    exports.section = section;
    function select(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('select', param1, param2);
    }
    exports.select = select;
    function small(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('small', param1, param2);
    }
    exports.small = small;
    function source(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('source', param1, param2);
    }
    exports.source = source;
    function span(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('span', param1, param2);
    }
    exports.span = span;
    function strike(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('strike', param1, param2);
    }
    exports.strike = strike;
    function strong(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('strong', param1, param2);
    }
    exports.strong = strong;
    function style(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('style', param1, param2);
    }
    exports.style = style;
    function sub(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('sub', param1, param2);
    }
    exports.sub = sub;
    function sup(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('sup', param1, param2);
    }
    exports.sup = sup;
    function table(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('table', param1, param2);
    }
    exports.table = table;
    function tbody(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('tbody', param1, param2);
    }
    exports.tbody = tbody;
    function td(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('td', param1, param2);
    }
    exports.td = td;
    function textarea(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('textarea', param1, param2);
    }
    exports.textarea = textarea;
    function tfoot(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('tfoot', param1, param2);
    }
    exports.tfoot = tfoot;
    function th(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('th', param1, param2);
    }
    exports.th = th;
    function thead(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('thead', param1, param2);
    }
    exports.thead = thead;
    function time(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('time', param1, param2);
    }
    exports.time = time;
    function title(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('title', param1, param2);
    }
    exports.title = title;
    function tr(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('tr', param1, param2);
    }
    exports.tr = tr;
    function track(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('track', param1, param2);
    }
    exports.track = track;
    function tt(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('tt', param1, param2);
    }
    exports.tt = tt;
    function u(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('u', param1, param2);
    }
    exports.u = u;
    function ul(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('ul', param1, param2);
    }
    exports.ul = ul;
    //export function var(param1: { [key: string]: any } | Wrapper[] | string, param2: Wrapper[] = null): Wrapper { return generateElement('var', param1, param2) }
    function video(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('video', param1, param2);
    }
    exports.video = video;
    function wbr(param1, param2) {
        if (param2 === void 0) { param2 = null; }
        return generateElement('wbr', param1, param2);
    }
    exports.wbr = wbr;
});
define("trace-app/app", ["require", "exports", "trace"], function (require, exports, trace_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (0, trace_1.div)({}, [
        (0, trace_1.div)('hey im working')
    ]).render('root');
});
