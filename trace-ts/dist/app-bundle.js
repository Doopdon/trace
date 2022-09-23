/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_0__, __WEBPACK_LOCAL_MODULE_0__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
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
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_LOCAL_MODULE_0__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
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
}).apply(__WEBPACK_LOCAL_MODULE_0__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_0__ === undefined && (__WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, trace_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    (0, trace_1.div)({}, [
        (0, trace_1.div)('hey im working')
    ]).render('root');
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDZDtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsSUFBSSxVQUFVO0FBQ2Q7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLElBQUksVUFBVTtBQUNkO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxJQUFJLFVBQVU7QUFDZDtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsSUFBSSxVQUFVO0FBQ2Q7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLElBQUksVUFBVTtBQUNkO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxJQUFJLFlBQVk7QUFDaEI7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLElBQUksY0FBYztBQUNsQjtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsSUFBSSxjQUFjO0FBQ2xCO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxJQUFJLFVBQVU7QUFDZDtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsSUFBSSxZQUFZO0FBQ2hCO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxJQUFJLFNBQVM7QUFDYjtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsSUFBSSxjQUFjO0FBQ2xCO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxJQUFJLFdBQVc7QUFDZjtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsSUFBSSxhQUFhO0FBQ2pCO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxJQUFJLFdBQVc7QUFDZjtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsSUFBSSxlQUFlO0FBQ25CO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxJQUFJLFdBQVc7QUFDZjtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsSUFBSSxjQUFjO0FBQ2xCO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxJQUFJLGFBQWE7QUFDakI7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLElBQUksY0FBYztBQUNsQjtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FB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QUNBLElBQUksVUFBVTtBQUNkO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxJQUFJLGFBQWE7QUFDakI7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLElBQUksWUFBWTtBQUNoQjtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsSUFBSSxhQUFhO0FBQ2pCO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxJQUFJLFVBQVU7QUFDZDtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsSUFBSSxhQUFhO0FBQ2pCO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxJQUFJLFVBQVU7QUFDZDtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsSUFBSSxTQUFTO0FBQ2I7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLElBQUksVUFBVTtBQUNkLG9DQUFvQyxxQkFBcUIsMkRBQTJEO0FBQ3BIO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxJQUFJLGFBQWE7QUFDakI7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLElBQUksV0FBVztBQUNmLENBQUMsNExBQUM7QUFDRixpQ0FBYyxDQUFDLG1CQUFTLEVBQUUsT0FBUyxFQUFFLDBCQUFPLENBQUMsbUNBQUU7QUFDL0M7QUFDQSxJQUFJLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUNqRSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBLENBQUM7QUFBQSxrR0FBQzs7Ozs7OztVQ3JpQ0Y7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuZGVmaW5lKFwidHJhY2VcIiwgW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMud2JyID0gZXhwb3J0cy52aWRlbyA9IGV4cG9ydHMudWwgPSBleHBvcnRzLnUgPSBleHBvcnRzLnR0ID0gZXhwb3J0cy50cmFjayA9IGV4cG9ydHMudHIgPSBleHBvcnRzLnRpdGxlID0gZXhwb3J0cy50aW1lID0gZXhwb3J0cy50aGVhZCA9IGV4cG9ydHMudGggPSBleHBvcnRzLnRmb290ID0gZXhwb3J0cy50ZXh0YXJlYSA9IGV4cG9ydHMudGQgPSBleHBvcnRzLnRib2R5ID0gZXhwb3J0cy50YWJsZSA9IGV4cG9ydHMuc3VwID0gZXhwb3J0cy5zdWIgPSBleHBvcnRzLnN0eWxlID0gZXhwb3J0cy5zdHJvbmcgPSBleHBvcnRzLnN0cmlrZSA9IGV4cG9ydHMuc3BhbiA9IGV4cG9ydHMuc291cmNlID0gZXhwb3J0cy5zbWFsbCA9IGV4cG9ydHMuc2VsZWN0ID0gZXhwb3J0cy5zZWN0aW9uID0gZXhwb3J0cy5zY3JpcHQgPSBleHBvcnRzLnNhbXAgPSBleHBvcnRzLnMgPSBleHBvcnRzLnJ1YnkgPSBleHBvcnRzLnJ0ID0gZXhwb3J0cy5ycCA9IGV4cG9ydHMucSA9IGV4cG9ydHMucHJvZ3Jlc3MgPSBleHBvcnRzLnByZSA9IGV4cG9ydHMucGFyYW0gPSBleHBvcnRzLnAgPSBleHBvcnRzLm91dHB1dCA9IGV4cG9ydHMub3B0aW9uID0gZXhwb3J0cy5vcHRncm91cCA9IGV4cG9ydHMub2wgPSBleHBvcnRzLm9iamVjdCA9IGV4cG9ydHMubm9zY3JpcHQgPSBleHBvcnRzLm5vZnJhbWVzID0gZXhwb3J0cy5uYXYgPSBleHBvcnRzLm1ldGVyID0gZXhwb3J0cy5tZXRhID0gZXhwb3J0cy5tZW51ID0gZXhwb3J0cy5tYXJrID0gZXhwb3J0cy5tYXAgPSBleHBvcnRzLmxpbmsgPSBleHBvcnRzLmxpID0gZXhwb3J0cy5sZWdlbmQgPSBleHBvcnRzLmxhYmVsID0gZXhwb3J0cy5rZXlnZW4gPSBleHBvcnRzLmtiZCA9IGV4cG9ydHMuaXNpbmRleCA9IGV4cG9ydHMuaW5zID0gZXhwb3J0cy5pbnB1dCA9IGV4cG9ydHMuaW1nID0gZXhwb3J0cy5pZnJhbWUgPSBleHBvcnRzLmkgPSBleHBvcnRzLmh0bWwgPSBleHBvcnRzLmhyID0gZXhwb3J0cy5oZ3JvdXAgPSBleHBvcnRzLmhlYWRlciA9IGV4cG9ydHMuaGVhZCA9IGV4cG9ydHMuaDYgPSBleHBvcnRzLmg1ID0gZXhwb3J0cy5oNCA9IGV4cG9ydHMuaDMgPSBleHBvcnRzLmgyID0gZXhwb3J0cy5oMSA9IGV4cG9ydHMuZnJhbWVzZXQgPSBleHBvcnRzLmZyYW1lID0gZXhwb3J0cy5mb3JtID0gZXhwb3J0cy5mb290ZXIgPSBleHBvcnRzLmZvbnQgPSBleHBvcnRzLmZpZ3VyZSA9IGV4cG9ydHMuZmlnY2FwdGlvbiA9IGV4cG9ydHMuZmllbGRzZXQgPSBleHBvcnRzLmV2ZW50c291cmNlID0gZXhwb3J0cy5lbWJlZCA9IGV4cG9ydHMuZW0gPSBleHBvcnRzLmR0ID0gZXhwb3J0cy5kbCA9IGV4cG9ydHMuZGl2ID0gZXhwb3J0cy5kaXIgPSBleHBvcnRzLmRpYWxvZyA9IGV4cG9ydHMuZGZuID0gZXhwb3J0cy5kZXRhaWxzID0gZXhwb3J0cy5kZWwgPSBleHBvcnRzLmRkID0gZXhwb3J0cy5kYXRhbGlzdCA9IGV4cG9ydHMuZGF0YWdyaWQgPSBleHBvcnRzLmNvbW1hbmQgPSBleHBvcnRzLmNvbGdyb3VwID0gZXhwb3J0cy5jb2wgPSBleHBvcnRzLmNvZGUgPSBleHBvcnRzLmNpdGUgPSBleHBvcnRzLmNlbnRlciA9IGV4cG9ydHMuY2FwdGlvbiA9IGV4cG9ydHMuY2FudmFzID0gZXhwb3J0cy5idXR0b24gPSBleHBvcnRzLmJyID0gZXhwb3J0cy5ib2R5ID0gZXhwb3J0cy5ibG9ja3F1b3RlID0gZXhwb3J0cy5iaWcgPSBleHBvcnRzLmJkbyA9IGV4cG9ydHMuYmIgPSBleHBvcnRzLmJhc2Vmb250ID0gZXhwb3J0cy5iYXNlID0gZXhwb3J0cy5iID0gZXhwb3J0cy5hdWRpbyA9IGV4cG9ydHMuYXNpZGUgPSBleHBvcnRzLmFydGljbGUgPSBleHBvcnRzLmFyZWEgPSBleHBvcnRzLmFwcGxldCA9IGV4cG9ydHMuYWRkcmVzcyA9IGV4cG9ydHMuYWNyb255bSA9IGV4cG9ydHMuYWJiciA9IGV4cG9ydHMuYSA9IGV4cG9ydHMuUmVuZGVyTGlzdCA9IGV4cG9ydHMuUmVuZGVyUHJvcCA9IHZvaWQgMDtcbiAgICB2YXIgV3JhcHBlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gV3JhcHBlcigpIHtcbiAgICAgICAgICAgIHRoaXMub25SZW5kZXJGdW5jdGlvbiA9IG51bGw7IC8vdGhpcyBpcyB0aGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlICdvblJlbmRlckZ1bmN0aW9uJyB3aGljaCBpcyBjYWxsZWQgd2hlbiB0aGUgZWxlbWVudCBpcyBhZGRlZFxuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXcmFwcGVyLnByb3RvdHlwZSwgXCIkZWxlbWVudFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fJGVsZW1lbnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl8kZWxlbWVudCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICAvL3RoaXMgZG9lcyBub3RoaW5nIGFzIGl0IHNob3VsZCBub3QgYmUgY2FsbGVkLiB0aGUgY2hpbGRyZW4gd2lsbCBoYXZlIHdvcmtpbmcgdmVyc2lvbnNcbiAgICAgICAgV3JhcHBlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGZhbHNlOyB9O1xuICAgICAgICAvL3RoaXMgZG9lcyBub3RoaW5nIGFzIGl0IHNob3VsZCBub3QgYmUgY2FsbGVkLiB0aGUgY2hpbGRyZW4gd2lsbCBoYXZlIHdvcmtpbmcgdmVyc2lvbnNcbiAgICAgICAgV3JhcHBlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGUsIHQpIHsgcmV0dXJuIG51bGw7IH07XG4gICAgICAgIFdyYXBwZXIucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24gKGNoaWxkV3JhcHBlcikge1xuICAgICAgICAgICAgdGhpcy5jaGlsZFdyYXBwZXJzLnB1c2goY2hpbGRXcmFwcGVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgV3JhcHBlci5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAoY2hpbGRXcmFwcGVyKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkV3JhcHBlcnMgPSB0aGlzLmNoaWxkV3JhcHBlcnMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICE9PSBjaGlsZFdyYXBwZXI7IH0pO1xuICAgICAgICB9O1xuICAgICAgICBXcmFwcGVyLnByb3RvdHlwZS5vblJlbmRlckV2ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5vblJlbmRlckZ1bmN0aW9uICYmIHRoaXMub25SZW5kZXJGdW5jdGlvbih0aGlzLiRlbGVtZW50LCB0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgV3JhcHBlci5wcm90b3R5cGUub25SZW5kZXIgPSBmdW5jdGlvbiAob25SZW5kZXJGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5vblJlbmRlckZ1bmN0aW9uID0gb25SZW5kZXJGdW5jdGlvbjtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm9uUmVuZGVyO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBXcmFwcGVyO1xuICAgIH0oKSk7XG4gICAgLy9FbGVtZW50IHdyYXBwZXIgaG9sZHMgYSByZWZlcmVuY2UgdG8gYW4gSFRNTCBlbGVtZW50LCBhbmQgdG8gaXRzIHBhcmVudCBhbmQgY2hpbGQgZWxlbWVudCB3cmFwcGVycy5cbiAgICB2YXIgRWxlbWVudFdyYXBwZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhFbGVtZW50V3JhcHBlciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gRWxlbWVudFdyYXBwZXIocmVuZGVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgICAgICBfdGhpcy5yZW5kZXJGdW5jdGlvbiA9IHJlbmRlckZ1bmN0aW9uOyAvL2VhY2ggZWxlbWVudCB3cmFwcGVyIGhhcyBhIHJlbmRlciBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgYW4gZWxlbWVudFxuICAgICAgICAgICAgX3RoaXMuJGVsZW1lbnQgPSBudWxsOyAvL1RoZSBjcmVhdGVkIGVsZW1lbnQgaXMgc3RvcmVkIGhlcmUgXG4gICAgICAgICAgICBfdGhpcy5jaGlsZFdyYXBwZXJzID0gW107IC8vSG9sZHMgYSBsaXN0IG9mIGFsbCB0aGUgY2hpZCBlbGVtZW50IHdyYXBwZXJzIHNvIHRyYXZlcnNhbCBjYW4gaGFwcGVuLlxuICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgICAgICB9XG4gICAgICAgIEVsZW1lbnRXcmFwcGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoJHRyaWdnZXJFbGVtKSB7XG4gICAgICAgICAgICBpZiAoJHRyaWdnZXJFbGVtID09PSB2b2lkIDApIHsgJHRyaWdnZXJFbGVtID0gbnVsbDsgfVxuICAgICAgICAgICAgaWYgKCR0cmlnZ2VyRWxlbSAmJiB0aGlzLiRlbGVtZW50LmNvbnRhaW5zKCR0cmlnZ2VyRWxlbSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vaWYgdGhlIGVsZW1lbnQgcGFyYW0gaXMgcHJlc2VudCBhbmQgdGhpcyB3cmFwcGVycyBlbGVtZW50IGNvbnRhaW5zIGl0LiBkbyBub3QgdXBkYXRlXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmNvbnRhaW5zKHRoaXMuJHBhcmVudCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvL2lmIHRoZSBwYXJlbnQgaXMgbm90IG9uIHRoZSBkb2N1bWVudCB0aGUgd3JhcHBlciBuZWVkcyB0byBiZSByZW1vdmVkIGZyb20gbWVtb3J5LiAoZmFsc2UgaW5kaWNhdGVzIGl0IGlzIG5vdCBvbiB0aGUgZG9tKVxuICAgICAgICAgICAgdGhpcy5yZW5kZXIodGhpcy4kcGFyZW50LCB0aGlzLnBhcmVudFdyYXBwZXIpOyAvL1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIEVsZW1lbnRXcmFwcGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoJHBhcmVudCwgcGFyZW50V3JhcHBlciwgbG9jKSB7XG4gICAgICAgICAgICBpZiAobG9jID09PSB2b2lkIDApIHsgbG9jID0gbnVsbDsgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiAkcGFyZW50ID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAkcGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJHBhcmVudCk7IC8vdXNlIHRoZSBzdHJpbmcgYXMgYW4gaWQgdG8gZmluZCB0aGUgZWxlbWVudCBhcyBzaG9ydGhhbmRcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudCA9ICRwYXJlbnQ7XG4gICAgICAgICAgICB0aGlzLnBhcmVudFdyYXBwZXIgPSBwYXJlbnRXcmFwcGVyOyAvL3NldCB0aGUgcGFyZW50IGFuZCBwYXJlbnQgd3JhcHBlciBmb3IgdGhpcyB3cmFwcGVyXG4gICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSB0aGlzLnJlbmRlckZ1bmN0aW9uKCRwYXJlbnQsIHRoaXMpOyAvL3VzZSB0aGUgcmVuZGVyIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGFuIGVsZW1lbnQgYW5kIGluc2VydCBpdCBpbnRvIHRoZSBwYXJlbnQuXG4gICAgICAgICAgICBpZiAoIXRoaXMuJGVsZW1lbnQpIHsgLy8vL2lmIGEgcmVuZGVyZWQgZWxlbWVudCBkb2VzIG5vdCBleGlzdDogXG4gICAgICAgICAgICAgICAgcGFyZW50V3JhcHBlciA9PT0gbnVsbCB8fCBwYXJlbnRXcmFwcGVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJlbnRXcmFwcGVyLmFkZENoaWxkKHRoaXMpOyAvL2FkZCBpdHNlbGYgdG8gdGhlIHBhcmVudHMgY2hpbGRyZW5cbiAgICAgICAgICAgICAgICB2YXIgJGFmdGVyRWxtID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIGlmIChsb2MgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkYWZ0ZXJFbG0gPSAkcGFyZW50LmNoaWxkcmVuW2xvY107IC8vZGV0ZXJtaW5lIGlmIGl0IGlzIHN1cHBvc2VkIHRvIGJlIGluc2VydGVkIGF0IGEgc3BlY2lmaWMgbG9jYXRpb25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEhJGFmdGVyRWxtKVxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50Lmluc2VydEJlZm9yZSgkZWxlbWVudCwgJGFmdGVyRWxtKTsgLy9pbnNlcnQgaXQgYXQgdGhhdCBsb2NhdGlvblxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hcHBlbmRDaGlsZCgkZWxlbWVudCk7IC8vb3IgYWRkIGl0IHRvIHRoZSBlbmQuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2lmKCF0aGlzLiRlbGVtZW50KSAkcGFyZW50LmFwcGVuZENoaWxkKCRlbGVtZW50KTsvL2lmIGEgcmVuZGVyZWQgZWxlbWVudCBkb2VzIG5vdCBleGlzdCwgc2ltcGx5IGFwcGVuZCBpdCB0byB0aGUgcGFyZW50XG4gICAgICAgICAgICBlbHNlIHsgLy9pZiB0aGVyZSBpcyBhIHJlZmVyZW5jZWQgZWxlbWVudCwgXG4gICAgICAgICAgICAgICAgJHBhcmVudC5pbnNlcnRCZWZvcmUoJGVsZW1lbnQsIHRoaXMuJGVsZW1lbnQpOyAvL3RoZSBuZXcgZWxlbWVudCBuZWVkcyB0byBiZSBhcHBlbmRlZCBiZWZvcmUgdGhlIG9sZCBvbmVcbiAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMuJGVsZW1lbnQpOyAvL3JlbW92ZSB0aGUgb2xkIGVsZW1lbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDsgLy9zZXQgdGhlIGVsZW1lbnQgcmVmZXJlbmNlIHRvIHRoZSBuZXcgZWxlbWVudCB0b2RvIDIyMzIgc2VlIGlmIEkgY2FuIGdldCByaWQgb2YgdGhlIHJldHVyblxuICAgICAgICAgICAgdGhpcy5vblJlbmRlckV2ZW50KCk7IC8vY2FsbCB0aGlzIHNvIHRoZSB1c2VyIGNhbiBydW4gY29kZSB3aGVuIHRoZSBlbGVtZW50IGlzIHJlbmRlcmVkXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kZWxlbWVudDtcbiAgICAgICAgfTtcbiAgICAgICAgRWxlbWVudFdyYXBwZXIucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uICh3cmFwcGVyKSB7XG4gICAgICAgICAgICB3cmFwcGVyLnJlbmRlcih0aGlzLiRlbGVtZW50LCB0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgRWxlbWVudFdyYXBwZXIucHJvdG90eXBlLnByZXBlbmQgPSBmdW5jdGlvbiAod3JhcHBlcikge1xuICAgICAgICAgICAgd3JhcHBlci5yZW5kZXIodGhpcy4kZWxlbWVudCwgdGhpcywgMCk7XG4gICAgICAgIH07XG4gICAgICAgIEVsZW1lbnRXcmFwcGVyLnByb3RvdHlwZS5pbnNlcnRBdCA9IGZ1bmN0aW9uICh3cmFwcGVyLCBsb2MpIHtcbiAgICAgICAgICAgIHdyYXBwZXIucmVuZGVyKHRoaXMuJGVsZW1lbnQsIHRoaXMsIGxvYyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBFbGVtZW50V3JhcHBlcjtcbiAgICB9KFdyYXBwZXIpKTtcbiAgICAvL0xpc3Qgd3JhcHBlcnMgZG8gbm90IGhvbGQgYW4gZWxlbWVudCByZWZlcmVuY2UsIGp1c3QgYSBwYXJlbnQuIFRoZXkgcmV1c2UgdGhlIGdpdmVuIHJlbmRlciBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtIGluIHRoZSByZW5kZXJQcm9wcyBwYXJhbWV0ZXJcbiAgICB2YXIgRWxlbWVudFdyYXBwZXJMaXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoRWxlbWVudFdyYXBwZXJMaXN0LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBFbGVtZW50V3JhcHBlckxpc3QocmVuZGVyRnVuY3Rpb24sIHJlbmRlclByb3BzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICAgICAgX3RoaXMucmVuZGVyRnVuY3Rpb24gPSByZW5kZXJGdW5jdGlvbjsgLy9zZXQgdGhlIHJlbmRlciBmdW5jdGlvbiBmb3IgdGhpcyBsaXN0XG4gICAgICAgICAgICBfdGhpcy5fX2luaXRpYWxDaGlsZFdyYXBwZXJzID0gcmVuZGVyUHJvcHMubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LmRpc3BsYXkocmVuZGVyRnVuY3Rpb24pOyB9KTsgLy9nZXQgZXZlcnkgd3JhcHBlciBmb3IgZWFjaCByZW5kZXIgcHJvcC5cbiAgICAgICAgICAgIF90aGlzLmNoaWxkV3JhcHBlcnMgPSBbXTsgLy9ob2xkcyBhIHJlZmVyZW5jZSB0byBhbGwgdGhlIGNoaWxkIHdyYXBwZXJzIGluIHRoZSBsaXN0XG4gICAgICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICAgIH1cbiAgICAgICAgRWxlbWVudFdyYXBwZXJMaXN0LnByb3RvdHlwZS5fX2dldEZvb3RlckVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGZvdW5kU2VsZiA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyICRmb3VuZEVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnBhcmVudFdyYXBwZXIuY2hpbGRXcmFwcGVycy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kU2VsZilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhKCRmb3VuZEVsZW1lbnQgPSB4LiRlbGVtZW50KTsgLy9pZiB0aGUgc2VsZiBoYXMgYmVlbiBmb3VuZCByZXR1cm4gdGhlIG5leHQgd3JhcHBlclxuICAgICAgICAgICAgICAgIGlmICh4ID09PSBfdGhpcylcbiAgICAgICAgICAgICAgICAgICAgZm91bmRTZWxmID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vaWYgdGhlIGN1cnJlbnQgd3JhcHBlciBpcyBzZWxmLCB0aGVuIHNldCBmb3VuZCBzZWxmIHRvIHRydWUsIHJldHVybiBmYWxzZSwgdGhlIG5leHQgZWxlbWVudCBpcyB0aGUgZWxlbWVudCBhZnRlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gJGZvdW5kRWxlbWVudDsgLy9yZXR1cm4gdGhlIGZvdW5kIGVsZW1lbnQgaWYgaXQgZXhpc3RzXG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFbGVtZW50V3JhcHBlckxpc3QucHJvdG90eXBlLCBcIiRlbGVtZW50XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkV3JhcHBlcnNbMF0gJiYgdGhpcy5jaGlsZFdyYXBwZXJzWzBdLiRlbGVtZW50O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBFbGVtZW50V3JhcHBlckxpc3QucHJvdG90eXBlLmluc2VydEF0ID0gZnVuY3Rpb24gKGluZGV4LCByZW5kZXJQcm9wKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAoKF9hID0gdGhpcy5jaGlsZFdyYXBwZXJzW2luZGV4XSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLiRlbGVtZW50KSB8fCB0aGlzLl9fZ2V0Rm9vdGVyRWxlbWVudCgpOyAvL2ZpbmQgdGhlIGVsZW1lbnQgYXQgdGhlIGluZGV4LCBvciBmaW5kIHRoZSBmb290ZXIgaWYgdGhlcmUgaXMgbm9uZS5cbiAgICAgICAgICAgIHZhciBuZXdXcmFwcGVyID0gcmVuZGVyUHJvcC5kaXNwbGF5KHRoaXMucmVuZGVyRnVuY3Rpb24pOyAvL2NyZWF0ZSBhIG5ldyB3cmFwcGVyIHdpdGggdGhlIHJlbmRlckZ1bmN0aW9uXG4gICAgICAgICAgICB2YXIgJG5ld0VsZW1lbnQgPSBuZXdXcmFwcGVyLnJlbmRlcih0aGlzLiRwYXJlbnQsIHRoaXMpOyAvL2hhbmQgaW4gdGhlIHBhcmVudCwgYW5kIHJlbmRlciB0aGUgZWxlbWVudC4gaGFuZCBpbiB0aGUgcmVmZXJlbmNlIHRvIHRoZSBsaXN0ICh0aGlzKSBzbyB0aGUgcGFyZW50IHdyYXBwZXIgY2FuIGJlIHNldC5cbiAgICAgICAgICAgIHRoaXMuY2hpbGRXcmFwcGVycy5zcGxpY2UoaW5kZXgsIDAsIHRoaXMuY2hpbGRXcmFwcGVycy5wb3AoKSk7IC8vdGhlIHdyYXBwZXIgbmVlZHMgdG8gYmUgaW5zZXJ0ZWQgaW50byB0aGUgbGlzdCwgYnV0IGl0cyBhbHJlYWR5IGF0IHRoZSBlbmQgKGJlY2F1c2UgdGhlIHJlbmRlciBtZXRob2QgYWRkcyBpdCB0byB0aGUgZW5kKSwgc28gaXRzIHBvcHBlZCBvZmYgYW5kIHRoZW4gaW5zZXJ0ZWRcbiAgICAgICAgICAgICRlbGVtZW50ICYmIHRoaXMuJHBhcmVudC5pbnNlcnRCZWZvcmUoJG5ld0VsZW1lbnQsICRlbGVtZW50KSB8fCB0aGlzLiRwYXJlbnQuYXBwZW5kQ2hpbGQoJG5ld0VsZW1lbnQpOyAvL2lmIHRoZSBmb290ZXIgZWxlbWVudCBleGlzdHMgYXBwZW5kIGJlZm9yZSBpdCwgb3IganVzdCBhcHBlbmQgdG8gdGhlIHBhcmVudFxuICAgICAgICB9O1xuICAgICAgICBFbGVtZW50V3JhcHBlckxpc3QucHJvdG90eXBlLmRlbGV0ZUF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICB2YXIgJGVsZW1lbnRUb0RlbGV0ZSA9IChfYSA9IHRoaXMuY2hpbGRXcmFwcGVyc1tpbmRleF0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS4kZWxlbWVudDsgLy9nZXQgdGhlIGFjdHVhbCBlbGVtZW50IG9mIHRoZSBjaGlsZCBlbGVtZW50IHdyYXBwZXJcbiAgICAgICAgICAgIGlmICghJGVsZW1lbnRUb0RlbGV0ZSlcbiAgICAgICAgICAgICAgICB0aHJvdyB7IG1lc3NhZ2U6IFwiRVJST1I6IENhbm5vdCBkZWxldGUgZWxlbWVudCBiZWNhdXNlIG5vbmUgd2FzIGZvdW5kIGF0IGluZGV4IFtcIi5jb25jYXQoaW5kZXgsIFwiXS5cIiksIGludmFsaWRPYmplY3Q6IHRoaXMuY2hpbGRXcmFwcGVycyB9OyAvL3Rocm93IGFuIGVycm9yIGlmIHRoZSBpbmRleCBkb2VzIG5vdCBwb2ludCB0byBhbiBlbGVtZW50XG4gICAgICAgICAgICB0aGlzLmNoaWxkV3JhcHBlcnMuc3BsaWNlKGluZGV4LCAxKTsgLy9yZW1vdmUgd3JhcHBlciBmcm9tIGNoaWxkIHdyYXBwZXIgbGlzdFxuICAgICAgICAgICAgdGhpcy4kcGFyZW50LnJlbW92ZUNoaWxkKCRlbGVtZW50VG9EZWxldGUpOyAvL3JlbW92ZSB0aGUgZWxlbWVudCBmcm9tIHRoZSBkb21cbiAgICAgICAgfTtcbiAgICAgICAgRWxlbWVudFdyYXBwZXJMaXN0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoJHBhcmVudCwgcGFyZW50V3JhcHBlcikge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudCA9ICRwYXJlbnQ7IC8vc2V0IHRoZSBwYXJlbnQgZWxlbWVudCBmb3IgZG9tIG1hbmlwdWxhdGlvbiBwdXJwb3Nlcy5cbiAgICAgICAgICAgIHRoaXMucGFyZW50V3JhcHBlciA9IHBhcmVudFdyYXBwZXI7IC8vc2V0IHRoZSBwYXJlbnQgd3JhcHBlciBmb3IgdGhlIEVsZW1lbnRXcmFwcGVyTGlzdFxuICAgICAgICAgICAgcGFyZW50V3JhcHBlciAmJiBwYXJlbnRXcmFwcGVyLmFkZENoaWxkKHRoaXMpOyAvL2FkZCBzZWxmIHRvIGNoaWxkIHdyYXBwZXIgbGlzdCAoY2hpbGRXcmFwcGVycykgb2YgcGFyZW50XG4gICAgICAgICAgICB0aGlzLl9faW5pdGlhbENoaWxkV3JhcHBlcnMuZm9yRWFjaChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5yZW5kZXIoJHBhcmVudCwgX3RoaXMpOyB9KTsgLy90aGlzIHdpbGwgYWRkIGFsbCB0aGUgd3JhcHBlcnMgdG8gdGhlIGNoaWxkIHdyYXBwZXIgbGlzdCAoY2hpbGRXcmFwcGVycykuIGFsbCBzdWJzZXF1ZW50IGFkZGl0aW9ucyB3aWxsIG5vdCB1c2UgdGhlIF9faW5pdGlhbENoaWxkV3JhcHBlcnMgYnV0IHRoZSBjaGlsZFdyYXBwZXJzXG4gICAgICAgIH07IC8vdG9kbyBhZGQgdXBkYXRlIHRvIGxpc3QoaSB0aGluaylcbiAgICAgICAgcmV0dXJuIEVsZW1lbnRXcmFwcGVyTGlzdDtcbiAgICB9KFdyYXBwZXIpKTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vQXR0cmlidXRlSW5zZXJ0cy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vQXR0cmlidXRlIEluc2VydCBjbGFzcyBoYW5kbGVzIGNoYW5nZXMgdG8gYXR0cmlidXRlcyBvZiBpbmRpdmlkdWFsIGVsZW1lbnRzIHdpdGhvdXQgcmUgcmVuZGVyaW5nIHRoZSBlbGVtZW50ICh3aGljaCBjb3VsZCBiZSBleHBlbnNpdmUgaWYgdGhlcmUgYXJlIG1hbnkgY2hpbGQgZWxlbWVudHMpXG4gICAgdmFyIEF0dHJpYnV0ZUluc2VydCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gQXR0cmlidXRlSW5zZXJ0KHJlbmRlckZ1bmN0aW9uLCByUHJvcCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJGdW5jdGlvbiA9IHJlbmRlckZ1bmN0aW9uIHx8IChmdW5jdGlvbiAocywgdCkgeyByZXR1cm4gczsgfSk7XG4gICAgICAgICAgICB0aGlzLnJQcm9wID0gclByb3A7XG4gICAgICAgIH1cbiAgICAgICAgQXR0cmlidXRlSW5zZXJ0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuJGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHZhbCA9IHRoaXMucmVuZGVyRnVuY3Rpb24odGhpcy5yUHJvcC52YWwsIHRoaXMuclByb3ApO1xuICAgICAgICAgICAgdmFyIHQgPSB0aGlzLiRlbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgICAgIGlmICh0aGlzLmF0ck5hbWUgPT09ICdpbm5lckhUTUwnKVxuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy4kZWxlbWVudC5pbm5lckhUTUwgPSB2YWwpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdib29sZWFuJykgLy9UT0RPIGZpZ3VyZSBvdXQgd2h5IGkgZG9udCBuZWVkIHRoaXMgZm9yIHN0YW5kYXJkIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuJGVsZW1lbnRbdGhpcy5hdHJOYW1lXSA9IHZhbCk7XG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LnNldEF0dHJpYnV0ZSh0aGlzLmF0ck5hbWUsIHZhbCk7XG4gICAgICAgIH07XG4gICAgICAgIEF0dHJpYnV0ZUluc2VydC5wcm90b3R5cGUuZ2VuZXJhdGVBdHRyaWJ1dGUgPSBmdW5jdGlvbiAoYXRyTmFtZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuYXRyTmFtZSA9IGF0ck5hbWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQXR0cmlidXRlSW5zZXJ0O1xuICAgIH0oKSk7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1Byb3BzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvL2Jhc2UgY2xhc3MgZm9yIGFsbCBSZW5kZXJQcm9wIGZ1bmN0aW9uYWxpdHlcbiAgICB2YXIgUHJvcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gUHJvcCgpIHtcbiAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlSW5zZXJ0cyA9IFtdOyAvL2hvbGRzIGEgbGlzdCBvZiBhbGwgYXR0cmlidXRlIEluc2VydHMgd2hpY2ggdGllIHRoZSBQcm9wIHZhbHVlIHRvIGVsZW1lbnQgYXR0cmlidXRlc1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQcm9wLnByb3RvdHlwZSwgXCJ2YWxcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBQcm9wLnByb3RvdHlwZS5hdHIgPSBmdW5jdGlvbiAocmVuZGVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciBhdHJJbnNlcnQgPSBuZXcgQXR0cmlidXRlSW5zZXJ0KHJlbmRlckZ1bmN0aW9uLCB0aGlzKTsgLy9hZGRzIHRoZSByZW5kZXIgZnVuY3Rpb24gdGhhdCBtYXkgYWRkIGFkZGl0aW9uYWwgcHJvY2Vzc2luZyB0byB0aGUgdmFsdWUgYmVmb3JlIHBhc3NpbmcgaXQgaW50byB0aGUgYXR0cmlidXRlXG4gICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZUluc2VydHMucHVzaChhdHJJbnNlcnQpOyAvL2FkZCB0aGUgQXR0cmlidXRlSW5zZXJ0IHRvIHRoZSBsaXN0XG4gICAgICAgICAgICByZXR1cm4gYXRySW5zZXJ0O1xuICAgICAgICB9O1xuICAgICAgICBQcm9wLnByb3RvdHlwZS5kaXNwbGF5ID0gZnVuY3Rpb24gKHJlbmRlckZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBpZiAocmVuZGVyRnVuY3Rpb24gaW5zdGFuY2VvZiBXcmFwcGVyKVxuICAgICAgICAgICAgICAgIHRocm93IHsgbWVzc2FnZTogXCJFUlJPUjogQ2Fubm90IHBhc3MgYW4gXFxcIkVsZW1lbnQgV3JhcHBlclxcXCIgaW50byBkaXNwbGF5KCksIGl0IG11c3QgYmUgYSBmdW5jdGlvbiBleDogcHJvcC5kaXNwbGF5KHg9PmgxKCd0ZXh0JykpIG5vdCBwcm9wLmRpc3BsYXkoaDEoJ3RleHQnKSlcIiwgaW52YWxpZE9iajogcmVuZGVyRnVuY3Rpb24gfTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVuZGVyRnVuY3Rpb24gIT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgdGhyb3cgeyBtZXNzYWdlOiAnRVJST1I6IERpc3BsYXkgbXVzdCByZWNlaXZlIGEgZnVuY3Rpb24nLCBpbnZhbGlkT2JqZWN0OiByZW5kZXJGdW5jdGlvbiB9O1xuICAgICAgICB9O1xuICAgICAgICBQcm9wLnByb3RvdHlwZS5iYXNlQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVJbnNlcnRzLmZvckVhY2goZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgudXBkYXRlKCk7IH0pOyAvL1RPRE8gY2hlY2sgZm9yIG1lbSBsZWFrcy5cbiAgICAgICAgICAgIHRoaXMuX19vbkNoYW5nZSAmJiB0aGlzLl9fb25DaGFuZ2UodGhpcy52YWwsIHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICBQcm9wLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZnVuY3QpIHtcbiAgICAgICAgICAgIGZ1bmN0ID0gZnVuY3QgfHwgKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4OyB9KTtcbiAgICAgICAgICAgIHRoaXMudmFsID0gZnVuY3QodGhpcy52YWwpO1xuICAgICAgICB9O1xuICAgICAgICBQcm9wLnByb3RvdHlwZS5vbkNoYW5nZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fX29uQ2hhbmdlID0gY2FsbGJhY2s7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBQcm9wO1xuICAgIH0oKSk7XG4gICAgdmFyIFJlbmRlclByb3AgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhSZW5kZXJQcm9wLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBSZW5kZXJQcm9wKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICAgICAgX3RoaXMudmFsID0gdmFsdWU7IC8vdmFsdWUgdGhhdCByZXByZXNlbnRzIHRoZSBzdGF0ZSBvZiB0aGUgcmVuZGVyIHByb3BcbiAgICAgICAgICAgIF90aGlzLndyYXBwZXJzID0gW107IC8vaG9sZHMgYSBsaXN0IG9mIHdyYXBwZXJzIHRoYXQgbmVlZCB0byBiZSB1cGRhdGVkIHdoZW4gdGhlIHZhbHVlIGlzIGNoYW5nZWRcbiAgICAgICAgICAgIF90aGlzLmJvdW5kV3JhcHBlcnMgPSBbXTtcbiAgICAgICAgICAgIF90aGlzLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZW5kZXJQcm9wLnByb3RvdHlwZSwgXCJ2YWxcIiwge1xuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fc2V0VmFsdWUodmFsdWUsIG51bGwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBSZW5kZXJQcm9wLnByb3RvdHlwZS5fX3NldFZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnZhbCA9IHZhbHVlOyAvL2NoYW5nZSB0aGUgdmFsdWUvXG4gICAgICAgICAgICB0aGlzLmJhc2VDaGFuZ2UoKTsgLy9hcHBseSBhbnkgY2hhbmdlcyB0aGF0IHRoZSBiYXNlIGNsYXNzIG5lZWRzLlxuICAgICAgICAgICAgdGhpcy53cmFwcGVycyA9IHRoaXMud3JhcHBlcnMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LnVwZGF0ZShlbGVtZW50KTsgfSk7IC8vcmUtcnVuIGFsbCB0aGUgcmVuZGVyIGZ1bmN0aW9ucyBmb3IgdGhlIHdyYXBwZXJzXG4gICAgICAgIH07XG4gICAgICAgIFJlbmRlclByb3AucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChmdW5jdCkge1xuICAgICAgICAgICAgZnVuY3QgPSBmdW5jdCB8fCAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHg7IH0pO1xuICAgICAgICAgICAgdGhpcy52YWwgPSBmdW5jdCh0aGlzLnZhbCk7XG4gICAgICAgIH07XG4gICAgICAgIFJlbmRlclByb3AucHJvdG90eXBlLmRpc3BsYXkgPSBmdW5jdGlvbiAocmVuZGVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRpc3BsYXkuY2FsbCh0aGlzLCByZW5kZXJGdW5jdGlvbik7IC8vY2hlY2sgZm9yIGVycm9ycy5cbiAgICAgICAgICAgIHZhciBuZXdXcmFwcGVyID0gbmV3IEVsZW1lbnRXcmFwcGVyKGZ1bmN0aW9uIChwLCByZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gcmVuZGVyRnVuY3Rpb24oX3RoaXMudmFsLCBfdGhpcyk7IC8vdGhpcyB0aW1lIHdlIGNhbGwgdGhlIHJlbmRlciBmdW5jdGlvbiwgYW5kIHBhc3MgaW4gdGhlIHZhbHVlIGFuZCB0aGUgcmVmZXJlbmNlIHRvIHRoZSB0aGUgd2hvbGUgcmVuZGVyUHJvcCAodXNlZnVsIGZvciBsaXN0IGl0ZW1zKVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwucmVuZGVyICYmIHZhbC5yZW5kZXIocCwgcmVmKSB8fCBkaXYoeyBzdHlsZTogJ2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50JyB9LCBbXSkucmVuZGVyKHAsIHJlZik7IC8vYWRkIGEgYmxhbmsgZGl2IGlmIG5vIHJlbmRlciBmdW5jdGlvbiBpcyBhdmFpbGFibGUuIFRPRE8gMzgzODNcbiAgICAgICAgICAgIH0pOyAvL3doZW4gY2FsbGVkIHJlbmRlciBmdW5jdGlvbiB3ZSBwYXNzIGluIHJldHVybnMgYW4gZWxlbWVudCB3cmFwcGVyLiB3aGljaCBoYXMgaXRzIG93biByZW5kZXIgZnVuY3Rpb24gd2hpY2ggd2UgdGhlbiBjYWxsIHdpdGggdGhlIHBhcmVudCBlbGVtZW50IHdyYXBwZXIgXG4gICAgICAgICAgICB0aGlzLndyYXBwZXJzLnB1c2gobmV3V3JhcHBlcik7IC8vcHVzaCB0aGUgbmV3IHdyYXBwZXIgc28gaXQgY2FuIGJlIGFjY2Vzc2VkIGxhdGVyIGFuZCB1cGRhdGVkIGlmIG5lZWRlZC5cbiAgICAgICAgICAgIHJldHVybiBuZXdXcmFwcGVyOyAvL3JldHVybiB0aGUgZWxlbWVudCB3cmFwcGVyIHNvIHRoZSBwYXJlbnQgaGFzIGEgcmVmZXJlbmNlIHRvIGl0LlxuICAgICAgICB9O1xuICAgICAgICBSZW5kZXJQcm9wLnByb3RvdHlwZS5ib3VuZFVwZGF0ZSA9IGZ1bmN0aW9uIChldmVudF9lbGVtZW50LCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gKGV2ZW50X2VsZW1lbnQgPT09IG51bGwgfHwgZXZlbnRfZWxlbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXZlbnRfZWxlbWVudC50YXJnZXQpIHx8IGV2ZW50X2VsZW1lbnQ7IC8vZ2V0IHRoZSBldmVudC50YXJnZXQsIG9yIGp1c3QgdGhlIHRhcmdldCAoZWxlbWVudClcbiAgICAgICAgICAgIGlmICghJGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJlbGVtZW50IG9yIGV2ZW50IG5vdCBwcm92aWRlZFwiO1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSB8fCAkZWxlbWVudC52YWx1ZTsgLy9nZXQgdGhlIHZhbHVlIGZyb20gdGhlIGVsZW1lbnQgb3IgZnJvbSB0aGUgcGFyYW1ldGVyXG4gICAgICAgICAgICB0aGlzLl9fc2V0VmFsdWUodmFsdWUsICRlbGVtZW50KTsgLy9jYWxsIHRoZSBfX3NldFZhbHVlIGZ1bmN0aW9uIGJ1dCBoYW5kIGluIHRoZSBlbGVtZW50IHNvIHRoaXMgZWxlbWVudCB3b250IGJlIHVwZGF0ZWQuXG4gICAgICAgIH07XG4gICAgICAgIFJlbmRlclByb3AucHJvdG90eXBlLmJVcCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuYm91bmRVcGRhdGUuYmluZCh0aGlzKTsgfTsgLy9oZWxwcyB3aXRoIHNob3J0LWhhbmRpbmcgYm91bmRVcGRhdGUgZnVuY3Rpb24uIG9uY2xpY2s6KGUpPT5ib3VuZFVwZGF0ZShlKSB2cyBvbmNsaWNrOmJVcCgpXG4gICAgICAgIHJldHVybiBSZW5kZXJQcm9wO1xuICAgIH0oUHJvcCkpO1xuICAgIGV4cG9ydHMuUmVuZGVyUHJvcCA9IFJlbmRlclByb3A7XG4gICAgLy9UaGlzIENsYXNzIGlzIGEgcmVuZGVyIHByb3AgdGhhdCBpcyBpbnNpZGUgYSByZW5kZXIgbGlzdC4gaXQgaGFzIGEgZmV3IGV4dHJhIGZlYXR1cmVzIHRvIGVhc3kgdXNlIG9mIHJlbmRlckxpc3RzXG4gICAgdmFyIFJlbmRlckxpc3RQcm9wID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoUmVuZGVyTGlzdFByb3AsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFJlbmRlckxpc3RQcm9wKHZhbHVlLCBwYXJlbnQsIGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCB2YWx1ZSkgfHwgdGhpcztcbiAgICAgICAgICAgIF90aGlzLnBhcmVudFJlbmRlckxpc3QgPSBwYXJlbnQ7IC8vc2F2ZSBhIHJldmVyZW5jZSB0byB0aGUgcGFyZW50IFwicmVuZGVyIGxpc3RcIiBzbyBmdW5jdGlvbnMgY2FuIGJlIGNhbGxlZCBvbiBpdFxuICAgICAgICAgICAgX3RoaXMuX19pZCA9IGlkIHx8IHBhcmVudC5fX2lkSXRyKys7IC8vc2V0IHRoZSBpZCBvZiB0aGlzIGxpc3QgaXRlbS4gKGl0IHdpbGwgc3RheSB0aGUgc2FtZSB1bnRpbCB0aGUgbGlzdCBpdGVtIGlzIHJlbW92ZWQpXG4gICAgICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICAgIH1cbiAgICAgICAgUmVuZGVyTGlzdFByb3AucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50UmVuZGVyTGlzdC5kZWxldGVBdCh0aGlzLmluZGV4KTsgLy9kZWxldGVzIHNlbGYgZnJvbSB0aGUgcGFyZW50IGxpc3QgdXNpbmcgdGhpcyBwcm9wcyBpbmRleC5cbiAgICAgICAgfTtcbiAgICAgICAgUmVuZGVyTGlzdFByb3AucHJvdG90eXBlLm1vdmVUbyA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRSZW5kZXJMaXN0Lm1vdmUodGhpcy5pbmRleCwgaW5kZXgpOyAvL3RlbGwgdGhlIHBhcmVudCB0byBtb3ZlIHRoaXMgZWxlbWVudCB0byBhbm90aGVyIGluZGV4ICh1c2luZyBpdHMgaW5pdGlhbCBpbmRleClcbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlbmRlckxpc3RQcm9wLnByb3RvdHlwZSwgXCJpbmRleFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRSZW5kZXJMaXN0Ll9faWRNYXBbdGhpcy5fX2lkXTsgLy90aGUgcGFyZW50IGxpc3QgaGFzIGEgbWFwIG9mIGlkcyB0byBpbmRleGVzLiBzbyB0aGUgaW5kZXggY2FuIGJlIGZvdW5kIHF1aWNrbHkgd2l0aCB0aGUgaWQuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBSZW5kZXJMaXN0UHJvcDtcbiAgICB9KFJlbmRlclByb3ApKTtcbiAgICB2YXIgUmVuZGVyTGlzdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFJlbmRlckxpc3QsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFJlbmRlckxpc3QodmFsdWVzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICAgICAgX3RoaXMuX19pZEl0ciA9IDA7IC8vdGhpcyBpcyBhIHJ1bm5pbmcgdG90YWwgb2YgdGhlIG51bWJlciBvZiBpdGVtcyBhZGRlZCB0byB0aGUgbGlzdC4gaXQgaW5jcmVtZW50cyBlYWNoIHRpbWUuIFRoaXMgY2FuIHRoZW9yZXRpY2FsbHkgZmFpbCBhZnRlciB5b3UgYWRkIG1vcmUgaXRlbXMgdGhhbiB0aGVyZSBhcmUgcGxhbmsgdm9sdW1lcyBpbiB0aGUgb2JzZXJ2YWJsZSB1bml2ZXJzZS5cbiAgICAgICAgICAgIF90aGlzLnJlbmRlclByb3BzID0gdmFsdWVzLm1hcChmdW5jdGlvbiAoeCwgaSkgeyByZXR1cm4gbmV3IFJlbmRlckxpc3RQcm9wKHgsIF90aGlzLCBpKTsgfSk7IC8vbGlzdCBvZiBhbGwgdGhlIHJlbmRlciBwcm9wcyB0aGF0IGFyZSByZXByZXNlbnRlZC5cbiAgICAgICAgICAgIF90aGlzLl9fbWFwSW5kZXhlcygpOyAvL2NhbGxpbmcgdGhpcyBmdW5jdGlvbiB0aWVzIGFsbCB0aGUgaWRzIHRvIGluZGV4ZXMgaW4gTyBvZiBOIHRpbWUuXG4gICAgICAgICAgICBfdGhpcy5fX2xpc3RXcmFwcGVycyA9IFtdOyAvL3RoaXMgaG9sZHMgYWxsIHRoZSBwbGFjZXMgdGhlIGxpc3QgaXMgdG8gYmUgcmVuZGVyZWRcbiAgICAgICAgICAgIF90aGlzLmxlbmd0aCA9IG5ldyBSZW5kZXJQcm9wKF90aGlzLnJlbmRlclByb3BzLmxlbmd0aCk7IC8vdGhpcyBpcyB0byBzaG93IGEgY2hhbmdpbmcgbGlzdCBsZW5ndGggdmFsdWUuXG4gICAgICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlbmRlckxpc3QucHJvdG90eXBlLCBcInZhbFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJQcm9wcy5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgudmFsOyB9KTsgLy90aGUgdmFsdWUgaXMganVzdCB0aGUgdmFsIG9mIGVhY2ggcmVuZGVyIHByb3AgcHV0IGludG8gYW4gYXJyYXkuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3QXJyYXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHRoaXMuYmFzZUNoYW5nZSgpOyAvL2luc3VyZSB0aGF0IGFueSBBdHRyaWJ1dGVJbnNlcnRzIGdldCB1cGRhdGVkLlxuICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLnJlbmRlclByb3BzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGVBdCgwLCBmYWxzZSk7IC8vZGVsZXRlIGVhY2ggaXRlbS4gKGRvIG5vdCBtYXAgdGhlIGluZGV4ZXMgdW50aWwgdGhlIGVuZCB0byBpbXByb3ZlIHBlcmZvcm1hbmNlKVxuICAgICAgICAgICAgICAgIG5ld0FycmF5LmZvckVhY2goZnVuY3Rpb24gKHgpIHsgcmV0dXJuIF90aGlzLmluc2VydEF0KDAsIHgsIG51bGwsIGZhbHNlKTsgfSk7IC8vYWRkIGVhY2ggb25lIGludG8gdGhlIGFycmF5IChkbyBub3Qgb3ZlcnJpZGUgaWQgYW5kIGRvIG5vdCByZS1tYXAgZWFjaCB0aW1lIGZvciBwZXJmb3JtYW5jZSlcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aC52YWwgPSB0aGlzLnJlbmRlclByb3BzLmxlbmd0aDsgLy91cGRhdGUgdGhlIGxlbmd0aCBvbmNlIHNvIGl0IGRvZXNuJ3QgcmVuZGVyIGVhY2ggdGltZS5cbiAgICAgICAgICAgICAgICB0aGlzLl9fbWFwSW5kZXhlcygpOyAvL2FmdGVyIGFsbCBpdGVtcyBhcmUgYWRkZWQsIHRoZW4gcmVtYXAgdGhlIGluZGV4ZXMuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIFJlbmRlckxpc3QucHJvdG90eXBlLmRpc3BsYXkgPSBmdW5jdGlvbiAocmVuZGVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuZGlzcGxheS5jYWxsKHRoaXMsIHJlbmRlckZ1bmN0aW9uKTtcbiAgICAgICAgICAgIHZhciBsaXN0V3JhcHBlciA9IG5ldyBFbGVtZW50V3JhcHBlckxpc3QocmVuZGVyRnVuY3Rpb24sIHRoaXMucmVuZGVyUHJvcHMpO1xuICAgICAgICAgICAgdGhpcy5fX2xpc3RXcmFwcGVycy5wdXNoKGxpc3RXcmFwcGVyKTtcbiAgICAgICAgICAgIHJldHVybiBsaXN0V3JhcHBlcjtcbiAgICAgICAgfTtcbiAgICAgICAgUmVuZGVyTGlzdC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRBdCh0aGlzLnJlbmRlclByb3BzLmxlbmd0aCwgdmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICBSZW5kZXJMaXN0LnByb3RvdHlwZS51bnNoaWZ0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmluc2VydEF0KDAsIHZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgUmVuZGVyTGlzdC5wcm90b3R5cGUuaW5zZXJ0QXQgPSBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlLCBpZCwgX19tYXBJbmRleGVzKSB7XG4gICAgICAgICAgICBpZiAoaWQgPT09IHZvaWQgMCkgeyBpZCA9IG51bGw7IH1cbiAgICAgICAgICAgIGlmIChfX21hcEluZGV4ZXMgPT09IHZvaWQgMCkgeyBfX21hcEluZGV4ZXMgPSB0cnVlOyB9XG4gICAgICAgICAgICBpbmRleCA9IE1hdGgubWluKGluZGV4LCB0aGlzLnJlbmRlclByb3BzLmxlbmd0aCk7IC8vdGhlIGluZGV4IHNob3VsZCBiZSBhdCBtYXggdGhlIGxlbmd0aCBvZiB0aGUgcmVuZGVyIHByb3BzIGxpc3RcbiAgICAgICAgICAgIHZhciByUHJvcCA9IG5ldyBSZW5kZXJMaXN0UHJvcCh2YWx1ZSwgdGhpcywgaWQpOyAvL2NyZWF0ZSB0aGUgbmV3IHByb3BcbiAgICAgICAgICAgIHRoaXMuX19saXN0V3JhcHBlcnMuZm9yRWFjaChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5pbnNlcnRBdChpbmRleCwgclByb3ApOyB9KTsgLy9nbyB0aHJvdWdoIGVhY2ggbGlzdCB3cmFwcGVyIGFuZCBpbnNlcnQgaXQgYXQgdGhlIGluZGV4XG4gICAgICAgICAgICB0aGlzLnJlbmRlclByb3BzLnNwbGljZShpbmRleCwgMCwgclByb3ApOyAvL2luc2VydCB0aGUgcHJvcCBpbnRvIHRoZSBsaXN0IG9mIHByb3BzXG4gICAgICAgICAgICBfX21hcEluZGV4ZXMgJiYgdGhpcy5fX21hcEluZGV4ZXMoKTsgLy9pZiB0aGlzIGlzIGEgbWFzcyBkZWxldGUgb3IgYWRkLCBkbyBub3QgbWFwIHRoZSBpbmRleGVzIHRpbGwgdGhlIGVuZC5cbiAgICAgICAgICAgIF9fbWFwSW5kZXhlcyAmJiAodGhpcy5sZW5ndGgudmFsID0gdGhpcy5yZW5kZXJQcm9wcy5sZW5ndGgpOyAvL3VwZGF0ZSB0aGUgbGVuZ3RoLlxuICAgICAgICB9O1xuICAgICAgICBSZW5kZXJMaXN0LnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWxldGVBdCh0aGlzLnJlbmRlclByb3BzLmxlbmd0aCAtIDEpO1xuICAgICAgICB9O1xuICAgICAgICBSZW5kZXJMaXN0LnByb3RvdHlwZS5zaGlmdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZUF0KDApO1xuICAgICAgICB9O1xuICAgICAgICBSZW5kZXJMaXN0LnByb3RvdHlwZS5kZWxldGVBdCA9IGZ1bmN0aW9uIChpbmRleCwgX19tYXBJbmRleGVzKSB7XG4gICAgICAgICAgICBpZiAoX19tYXBJbmRleGVzID09PSB2b2lkIDApIHsgX19tYXBJbmRleGVzID0gdHJ1ZTsgfVxuICAgICAgICAgICAgdGhpcy5fX2xpc3RXcmFwcGVycy5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LmRlbGV0ZUF0KGluZGV4KTsgfSk7XG4gICAgICAgICAgICB2YXIgdmFsID0gdGhpcy5yZW5kZXJQcm9wc1tpbmRleF0udmFsO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJQcm9wcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgX19tYXBJbmRleGVzICYmICh0aGlzLmxlbmd0aC52YWwgPSB0aGlzLnJlbmRlclByb3BzLmxlbmd0aCk7XG4gICAgICAgICAgICBfX21hcEluZGV4ZXMgJiYgdGhpcy5fX21hcEluZGV4ZXMoKTtcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH07XG4gICAgICAgIFJlbmRlckxpc3QucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbiAoc291cmNlSW5kZXgsIGRlc3RJbmRleCkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZUluZGV4ID09PSBkZXN0SW5kZXgpXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvL25vIG5lZWQgdG8gY29udGludWUsIHRoZSBpdGVtIGlzIHdoZXJlIGl0IHNob3VsZCBiZS5cbiAgICAgICAgICAgIGlmIChzb3VyY2VJbmRleCA8IDAgfHwgc291cmNlSW5kZXggPj0gdGhpcy5yZW5kZXJQcm9wcy5sZW5ndGgpIC8vY2hlY2sgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gYXJlIGluLWJvdW5kc1xuICAgICAgICAgICAgICAgIHRocm93IFwiQ2Fubm90IG1vdmU6IFNvdXJjZSBJbmRleCBbXCIuY29uY2F0KHNvdXJjZUluZGV4LCBcIl0gaXMgb3V0IG9mIGJvdW5kc1wiKTtcbiAgICAgICAgICAgIGlmIChkZXN0SW5kZXggPCAwIHx8IGRlc3RJbmRleCA+PSB0aGlzLnJlbmRlclByb3BzLmxlbmd0aClcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbm5vdCBtb3ZlOiBEZXN0aW5hdGlvbiBJbmRleCBbXCIuY29uY2F0KGRlc3RJbmRleCwgXCJdIGlzIG91dCBvZiBib3VuZHNcIik7XG4gICAgICAgICAgICB2YXIgcHJvcElkID0gdGhpcy5yZW5kZXJQcm9wc1tzb3VyY2VJbmRleF0uX19pZDsgLy9zYXZlIHRoZSBwcm9wIGlkXG4gICAgICAgICAgICB2YXIgdmFsID0gdGhpcy5kZWxldGVBdChzb3VyY2VJbmRleCwgZmFsc2UpOyAvL2RlbGV0ZSB0aGUgaXRlbSwgKGRvIG5vdCByZW1hcClcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0QXQoZGVzdEluZGV4LCB2YWwsIHByb3BJZCk7IC8vYWRkIHRoZSBpdGVtIGJhY2sgaW4gYXQgdGhlIGNvcnJlY3QgbG9jYXRpb24uIHVzZSB0aGUgcHJvcCBpZCBpbnN0ZWFkIG9mIGdlbmVyYXRpbmcgYSBuZXcgb25lLlxuICAgICAgICB9O1xuICAgICAgICBSZW5kZXJMaXN0LnByb3RvdHlwZS5fX21hcEluZGV4ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5fX2lkTWFwID0ge307IC8vY2xlYXIgdGhlIGlkIG1hcFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJQcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChycCwgaSkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9faWRNYXBbcnAuX19pZF0gPSBpOyAvL3NldCB0aGUgbWFwIGF0IHRoZSAnaWQnIGluZGV4IHRvIHRoZSBwb3NpdGlvbiBpbiB0aGUgbGlzdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBSZW5kZXJMaXN0O1xuICAgIH0oUHJvcCkpO1xuICAgIGV4cG9ydHMuUmVuZGVyTGlzdCA9IFJlbmRlckxpc3Q7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vL0ZVTkNUSU9OIEdFTkVSQVRJT04vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGZ1bmN0aW9uIGdlbmVyYXRlRWxlbWVudChlbGVtZW50VHlwZSwgcGFyYW0xLCBwYXJhbTIsIHRvb01hbnkpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgaWYgKHRvb01hbnkgPT09IHZvaWQgMCkgeyB0b29NYW55ID0gdW5kZWZpbmVkOyB9XG4gICAgICAgIGlmICh0b29NYW55IGluc3RhbmNlb2YgV3JhcHBlcilcbiAgICAgICAgICAgIHRocm93IHsgbWVzc2FnZTogXCJFUlJPUjogXCIuY29uY2F0KGVsZW1lbnRUeXBlLCBcIigpLCBjb250YWluZWQgdG9vIG1hbnkgcGFyYW1ldGVycywgaXQgYXBwZWFycyB5b3UgYXJlIG5vdCB1c2luZyBhbiBhcnJheSBpbiB0aGUgcGFyYW1ldGVyXCIpLCBpbnZhbGlkT2JqOiB0b29NYW55IH07XG4gICAgICAgIGlmICh0b29NYW55KVxuICAgICAgICAgICAgdGhyb3cgeyBtZXNzYWdlOiBcIkVSUk9SOiBcIi5jb25jYXQoZWxlbWVudFR5cGUsIFwiKCksIGNvbnRhaW5lZCB0b28gbWFueSBwYXJhbWV0ZXJzXCIpLCBpbnZhbGlkT2JqOiB0b29NYW55IH07IC8vdGhlcmUgc2hvdWxkIG9ubHkgYmUgMiBhcmd1bWVudHMgc3VwcGxpZWQgYnkgdGhlIHVzZXIuIGFkZGl0aW9uYWwgYXJndW1lbnRzIHdpbGwgY2F1c2Ugc2V2ZXIgcHJvYmxlbXMuXG4gICAgICAgIHZhciBhdHRyaWJ1dGVzID0gcGFyYW0yICE9IG51bGwgPyBwYXJhbTEgOiBudWxsOyAvL2lmIHRoZXJlIGlzIGEgc2Vjb25kIHBhcmFtZXRlciwgdGhlIGZpcnN0IG9uZSBpcyBhdHRyaWJ1dGVzXG4gICAgICAgIHZhciBjb250ZW50ID0gcGFyYW0yICE9IG51bGwgPyBwYXJhbTIgOiBwYXJhbTE7IC8vaWYgdGhlcmUgaXMgbm8gc2Vjb25kIHBhcmFtZXRlciB0aGUgZmlyc3Qgb25lIGlzIHRoZSBjb250ZW50LCBvdGhlcndpc2UgaXRzIHRoZSBzZWNvbmQgb25lLlxuICAgICAgICByZXR1cm4gbmV3IEVsZW1lbnRXcmFwcGVyKGNyZWF0ZUVsZW1lbnQpOyAvL2NyZWF0ZSBhIG5ldyBFbGVtZW50V3JhcHBlciB3aXRoIGEgcmVuZGVyRnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEgZG9tIGVsZW1lbnQgb3V0bGluZWQgYnkgdGhlIGF0dHJpYnV0ZXMgYW5kIGNvbnRlbnQgcGFyYW1ldGVycy5cbiAgICAgICAgLy91bmRlcnN0YW5kaW5nIHdoeSB0aGUgZmlyc3QgcGFyYW1ldGVyIGlzIHVudXNlZCBpcyBkaWZmaWN1bHQgKGV2ZW4gZm9yIG1lKSBiYXNpY2FsbHkgdGhlIHZpcnR1YWwgZG9tLCBtYWRlIG9mIEVsZW1lbnRXcmFwcGVycywgXG4gICAgICAgIC8vaXMgY3JlYXRlZCBib3R0b20gdXAuIHNvIHRoZSBlbGVtZW50cyB3aXRoIG5vIGNoaWxkcmVuLCBmb2xsb3dlZCBieSB0aGVpciBwYXJlbnRzLiBCdXQgdGhlIGRvbSBuZWVkcyB0byBjcmVhdGUgdGhlIHBhcmVudHMgZmlyc3RcbiAgICAgICAgLy8gdGhlbiB0aGUgY2hpbGRyZW4uIFRoZSBnZW5lcmF0ZWQgZWxlbWVudCBkb2VzIG5vdCBhY3R1YWxseSBwbGFjZSB0aGUgZWxlbWVudCBvbiB0aGUgZG9tLiB0aGUgRWxlbWVudCB3cmFwcGVyIGRvZXMsIGFuZCBpdCB1c2VzIGEgcGFyZW50IGVsZW1lbnQuIFxuICAgICAgICAvL0J1dCB0aGlzIGZ1bmN0aW9uIGRvZXMgbm90LCBidXQgc2luY2UgaXRzIGNhbGxlZCBieSB0aGUgRWxlbWVudFdyYXBwZXIgbGlrZSBpdCBkb2VzIHdlIG5lZWQgdG8gaWdub3JlIHRoZSBmaXJzdCBwYXJhbS5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChpbnRlbnRpb25hbGx5VW51c2VkLCBlbGVtZW50V3JhcHBlclJlZikge1xuICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7IC8vZ2VuZXJhdGUgdGhlIGVsZW1lbnQgb2YgdGhlIGdpdmVuIHR5cGVcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQudGV4dENvbnRlbnQgKz0gY29udGVudDsgLy9pZiB0aGVyZSBpcyBvbmx5IGEgc3RyaW5nIHBhcmFtZXRlciwgc2V0IHRoZSB0ZXh0Q29udGVudCBUT0RPIG1ha2UgdGhpcyB3b3JrIHdpdGggYXJheXMgc29tZWhvd1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGFwcGx5Q29udGVudChjb250ZW50KTsgLy9hcHBseSB0aGUgY29udGVudCB0aGF0IGlzIHVzdWFsbHkgZ2l2ZW4gaW4gdGhlIFwiW11cIiBzZWNvbmQgcGFyYW1cbiAgICAgICAgICAgIGFwcGx5QXR0cmlidXRlcyhhdHRyaWJ1dGVzKTsgLy9hcHBseSB0aGUgYXR0cmlidXRlcyB0byB0aGUgZWxlbWVudFxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50OyAvL3JldHVybiB0aGUgY3JlYXRlZCBlbGVtZW50XG4gICAgICAgICAgICAvL2FwcGxpZXMgdGhlIGNvbnRlbnQgdGhhdCB0aGUgZWxlbWVudCBjb250YWlucy5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFwcGx5Q29udGVudChjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvL2Nhbid0IGFwcGx5IGNvbnRlbnQgdGhhdCBpc24ndCB0aGVyZS5cbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb250ZW50KSkgLy9pZiB0aGUgY29udGVudCBpcyBhbiBhcnJheTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQuZm9yRWFjaChmdW5jdGlvbiAoeCkgeyByZXR1cm4gYXBwbHlDb250ZW50KHgpOyB9KTsgLy9ydW4gdGhlIFwiYXBwbHkgY29udGVudFwiIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5ICh0aGlzIHdvcmtzIHJlY3Vyc2l2ZWx5IGZvciBhcnJheXMgaW4gYXJyYXlzIFtbLi4uXSwuLi4sWy4uLl1dKVxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50IGluc3RhbmNlb2YgV3JhcHBlcikgLy9pZiB5b3UgaGF2ZSBhIHdyYXBwZXJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQucmVuZGVyKCRlbGVtZW50LCBlbGVtZW50V3JhcHBlclJlZik7IC8vcmVuZGVyIHRoZSB3cmFwcGVyICh0aGlzIHdpbGwgY2FsbCBpdHMgXCJjcmVhdGUgZWxlbWVudFwiIGZ1bmN0aW9uIG91dGxpbmVkIGFib3ZlKVxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50IGluc3RhbmNlb2YgRWxlbWVudCkgLy9pZiBpdHMgYW4gZWxlbWVudCAoaWYgeW91IGNyZWF0ZSBhbiBlbGVtZW50IGFuZCBwdXQgaXQgaW4sIGl0IHdpbGwgc3RpbGwgd29yaylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LmFwcGVuZENoaWxkKGNvbnRlbnQpOyAvL2FkZCBjb250ZW50IHRvIHRoZSBwYXJlbnQgZWxlbWVudCBhYm92ZSBzaW5jZSBpdHMgYW4gZWxlbWVudCBUT0RPIHRlc3QgdGhpc1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmlubmVySFRNTCArPSBjb250ZW50LnRvU3RyaW5nKCk7IC8vaWYgaXRzIGEgc3RyaW5nLCBzZXQgdGhlIGlubmVyIGh0bWwgdG8gaXQuIG5vIG1vcmUgZWxlbWVudHMgbmVlZCB0byBiZSBnZW5lcmF0ZWQgYXMgaXRzIGNoaWxkcmVuIFRPRE8gZG9udCB1c2UgaW5uZXJIVE1MXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2FwcGxpZXMgdGhlIGF0dHJpYnV0ZXMgdG8gdGhlIGVsZW1lbnRcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFwcGx5QXR0cmlidXRlcyhhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXMgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvL2RvIG5vdCBhcHBseSBudWxsIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlcyBpbnN0YW5jZW9mIFdyYXBwZXIpIC8vdGhpcyB3b3VsZCBoYXBwZW4gaWYgdGhlIHVzZXIgZW50ZXJzIHBhcmFtZXRlcnMgd3JvbmdcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgeyBtZXNzYWdlOiBcIkVSUk9SOiBjYW5ub3QgdXNlIFxcXCJFbGVtZW50IFdyYXBwZXJcXFwiIGFzIGF0dHJpYnV0ZSBwYXJhbWV0ZXJcIiwgaW52YWxpZE9iajogYXR0cmlidXRlcyB9O1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcyAhPT0gJ29iamVjdCcpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IHsgbWVzc2FnZTogXCJFUlJPUjogYXR0cmlidXRlcyBwYXJhbWV0ZXIgbXVzdCBiZSBhbiBvYmplY3QuIG5vdCBhIFwiLmNvbmNhdCh0eXBlb2YgYXR0cmlidXRlcyksIGludmFsaWRPYmo6IGF0dHJpYnV0ZXMgfTsgLy9hdHRyaWJ1dGVzIGFyZSBzdG9yZWQgYXMga2V5IHZhbHVlIG9iamVjdHMgYW5kIGNhbm5vdCBiZSBhbnl0aGluZyBlbHNlLlxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlc1trZXldIGluc3RhbmNlb2YgQXR0cmlidXRlSW5zZXJ0KSAvL2lmIHRoZSB2YWx1ZSBpcyBhbiBBdHRyaWJ1dGVJbnNlcnQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2tleV0uZ2VuZXJhdGVBdHRyaWJ1dGUoa2V5LCAkZWxlbWVudCk7IC8vY2FsbCBpdHMgZ2VuZXJhdGVBdHRyaWJ1dGUgbWV0aG9kLiB0aGlzIHdpbGwgcmV0dXJuIGEgdmFsdWUgdG8gc2V0IHRoZSBhdHRyaWJ1dGUgdG8sIGFzIHdlbGwgYXMgdGllIHRoZSBlbGVtZW50IHRvIHRoZSBBdHRyaWJ1dGVJbnNlcnQgc28gaXQgY2FuIGJlIGNoYW5nZWQgaW4gdGhlIGZ1dHVyZS5cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnc3R5bGUnICYmIHR5cGVvZiBhdHRyaWJ1dGVzW2tleV0gPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbigkZWxlbWVudC5zdHlsZSwgYXR0cmlidXRlc1trZXldKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGF0dHJpYnV0ZXNba2V5XSA9PT0gJ2Z1bmN0aW9uJyB8fCBrZXkgPT09ICdpbm5lckhUTUwnKSAvL2lmIGEgZnVuY3Rpb24gaXMgaGFuZGVkIGluIG9yIGlubmVySFRNTDogVE9ETyBkb250IHVzZSBpbm5lckhUTUxcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50W2tleV0gPSBhdHRyaWJ1dGVzW2tleV07IC8vdGhlIGVsZW1lbnRzIGF0dHJpYnV0ZXMgbmVlZCB0byBiZSBzZXQgcHJvZ3JhbW1hdGljYWxseSwgbm90IHdpdGggc2V0QXR0cmlidXRlLiAodGhpcyBpcyBmb3IgZnVuY3Rpb25zIGFuZCApXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7IC8vb3RoZXJ3aXNlIGp1c3QgdXNlIHNldEF0dHJpYnV0ZSB3aXRoIHRoZSBrZXkgYXMgdGhlIG5hbWUgYW5kIHRoZSB2YWx1ZSBhcyB0aGUgdmFsdWUuIFRPRE8gYWRkIHN0cmluZyBjaGVjay5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2EsYWJicixhY3JvbnltLGFkZHJlc3MsYXBwbGV0LGFyZWEsYXJ0aWNsZSxhc2lkZSxhdWRpbyxiLGJhc2UsYmFzZWZvbnQsYmIsYmRvLGJpZyxibG9ja3F1b3RlLGJvZHksYnIsYnV0dG9uLGNhbnZhcyxjYXB0aW9uLGNlbnRlcixjaXRlLGNvZGUsY29sLGNvbGdyb3VwLGNvbW1hbmQsZGF0YWdyaWQsZGF0YWxpc3QsZGQsZGVsLGRldGFpbHMsZGZuLGRpYWxvZyxkaXIsZGl2LGRsLGR0LGVtLGVtYmVkLGV2ZW50c291cmNlLGZpZWxkc2V0LGZpZ2NhcHRpb24sZmlndXJlLGZvbnQsZm9vdGVyLGZvcm0sZnJhbWUsZnJhbWVzZXQsaDEsaDIsaDMsaDQsaDUsaDYsaGVhZCxoZWFkZXIsaGdyb3VwLGhyLGh0bWwsaSxpZnJhbWUsaW1nLGlucHV0LGlucyxpc2luZGV4LGtiZCxrZXlnZW4sbGFiZWwsbGVnZW5kLGxpLGxpbmssbWFwLG1hcmssbWVudSxtZXRhLG1ldGVyLG5hdixub2ZyYW1lcyxub3NjcmlwdCxvYmplY3Qsb2wsb3B0Z3JvdXAsb3B0aW9uLG91dHB1dCxwLHBhcmFtLHByZSxwcm9ncmVzcyxxLHJwLHJ0LHJ1YnkscyxzYW1wLHNjcmlwdCxzZWN0aW9uLHNlbGVjdCxzbWFsbCxzb3VyY2Usc3BhbixzdHJpa2Usc3Ryb25nLHN0eWxlLHN1YixzdXAsdGFibGUsdGJvZHksdGQsdGV4dGFyZWEsdGZvb3QsdGgsdGhlYWQsdGltZSx0aXRsZSx0cix0cmFjayx0dCx1LHVsLHZhcix2aWRlbyx3YnJcbiAgICBmdW5jdGlvbiBhKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2EnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuYSA9IGE7XG4gICAgZnVuY3Rpb24gYWJicihwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdhYmJyJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmFiYnIgPSBhYmJyO1xuICAgIGZ1bmN0aW9uIGFjcm9ueW0ocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnYWNyb255bScsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5hY3JvbnltID0gYWNyb255bTtcbiAgICBmdW5jdGlvbiBhZGRyZXNzKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2FkZHJlc3MnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuYWRkcmVzcyA9IGFkZHJlc3M7XG4gICAgZnVuY3Rpb24gYXBwbGV0KHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2FwcGxldCcsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5hcHBsZXQgPSBhcHBsZXQ7XG4gICAgZnVuY3Rpb24gYXJlYShwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdhcmVhJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmFyZWEgPSBhcmVhO1xuICAgIGZ1bmN0aW9uIGFydGljbGUocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnYXJ0aWNsZScsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5hcnRpY2xlID0gYXJ0aWNsZTtcbiAgICBmdW5jdGlvbiBhc2lkZShwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdhc2lkZScsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5hc2lkZSA9IGFzaWRlO1xuICAgIGZ1bmN0aW9uIGF1ZGlvKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2F1ZGlvJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmF1ZGlvID0gYXVkaW87XG4gICAgZnVuY3Rpb24gYihwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdiJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmIgPSBiO1xuICAgIGZ1bmN0aW9uIGJhc2UocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnYmFzZScsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5iYXNlID0gYmFzZTtcbiAgICBmdW5jdGlvbiBiYXNlZm9udChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdiYXNlZm9udCcsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5iYXNlZm9udCA9IGJhc2Vmb250O1xuICAgIGZ1bmN0aW9uIGJiKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2JiJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmJiID0gYmI7XG4gICAgZnVuY3Rpb24gYmRvKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2JkbycsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5iZG8gPSBiZG87XG4gICAgZnVuY3Rpb24gYmlnKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2JpZycsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5iaWcgPSBiaWc7XG4gICAgZnVuY3Rpb24gYmxvY2txdW90ZShwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdibG9ja3F1b3RlJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmJsb2NrcXVvdGUgPSBibG9ja3F1b3RlO1xuICAgIGZ1bmN0aW9uIGJvZHkocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnYm9keScsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5ib2R5ID0gYm9keTtcbiAgICBmdW5jdGlvbiBicihwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdicicsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5iciA9IGJyO1xuICAgIGZ1bmN0aW9uIGJ1dHRvbihwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdidXR0b24nLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuYnV0dG9uID0gYnV0dG9uO1xuICAgIGZ1bmN0aW9uIGNhbnZhcyhwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdjYW52YXMnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuY2FudmFzID0gY2FudmFzO1xuICAgIGZ1bmN0aW9uIGNhcHRpb24ocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnY2FwdGlvbicsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5jYXB0aW9uID0gY2FwdGlvbjtcbiAgICBmdW5jdGlvbiBjZW50ZXIocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnY2VudGVyJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmNlbnRlciA9IGNlbnRlcjtcbiAgICBmdW5jdGlvbiBjaXRlKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2NpdGUnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuY2l0ZSA9IGNpdGU7XG4gICAgZnVuY3Rpb24gY29kZShwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdjb2RlJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmNvZGUgPSBjb2RlO1xuICAgIGZ1bmN0aW9uIGNvbChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdjb2wnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuY29sID0gY29sO1xuICAgIGZ1bmN0aW9uIGNvbGdyb3VwKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2NvbGdyb3VwJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmNvbGdyb3VwID0gY29sZ3JvdXA7XG4gICAgZnVuY3Rpb24gY29tbWFuZChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdjb21tYW5kJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmNvbW1hbmQgPSBjb21tYW5kO1xuICAgIGZ1bmN0aW9uIGRhdGFncmlkKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2RhdGFncmlkJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmRhdGFncmlkID0gZGF0YWdyaWQ7XG4gICAgZnVuY3Rpb24gZGF0YWxpc3QocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnZGF0YWxpc3QnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuZGF0YWxpc3QgPSBkYXRhbGlzdDtcbiAgICBmdW5jdGlvbiBkZChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdkZCcsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5kZCA9IGRkO1xuICAgIGZ1bmN0aW9uIGRlbChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdkZWwnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuZGVsID0gZGVsO1xuICAgIGZ1bmN0aW9uIGRldGFpbHMocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnZGV0YWlscycsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5kZXRhaWxzID0gZGV0YWlscztcbiAgICBmdW5jdGlvbiBkZm4ocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnZGZuJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmRmbiA9IGRmbjtcbiAgICBmdW5jdGlvbiBkaWFsb2cocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnZGlhbG9nJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmRpYWxvZyA9IGRpYWxvZztcbiAgICBmdW5jdGlvbiBkaXIocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnZGlyJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmRpciA9IGRpcjtcbiAgICBmdW5jdGlvbiBkaXYocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnZGl2JywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmRpdiA9IGRpdjtcbiAgICBmdW5jdGlvbiBkbChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdkbCcsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5kbCA9IGRsO1xuICAgIGZ1bmN0aW9uIGR0KHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2R0JywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmR0ID0gZHQ7XG4gICAgZnVuY3Rpb24gZW0ocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnZW0nLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuZW0gPSBlbTtcbiAgICBmdW5jdGlvbiBlbWJlZChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdlbWJlZCcsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5lbWJlZCA9IGVtYmVkO1xuICAgIGZ1bmN0aW9uIGV2ZW50c291cmNlKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2V2ZW50c291cmNlJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmV2ZW50c291cmNlID0gZXZlbnRzb3VyY2U7XG4gICAgZnVuY3Rpb24gZmllbGRzZXQocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnZmllbGRzZXQnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuZmllbGRzZXQgPSBmaWVsZHNldDtcbiAgICBmdW5jdGlvbiBmaWdjYXB0aW9uKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2ZpZ2NhcHRpb24nLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuZmlnY2FwdGlvbiA9IGZpZ2NhcHRpb247XG4gICAgZnVuY3Rpb24gZmlndXJlKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2ZpZ3VyZScsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5maWd1cmUgPSBmaWd1cmU7XG4gICAgZnVuY3Rpb24gZm9udChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdmb250JywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmZvbnQgPSBmb250O1xuICAgIGZ1bmN0aW9uIGZvb3RlcihwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdmb290ZXInLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuZm9vdGVyID0gZm9vdGVyO1xuICAgIGZ1bmN0aW9uIGZvcm0ocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnZm9ybScsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5mb3JtID0gZm9ybTtcbiAgICBmdW5jdGlvbiBmcmFtZShwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdmcmFtZScsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5mcmFtZSA9IGZyYW1lO1xuICAgIGZ1bmN0aW9uIGZyYW1lc2V0KHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2ZyYW1lc2V0JywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmZyYW1lc2V0ID0gZnJhbWVzZXQ7XG4gICAgZnVuY3Rpb24gaDEocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnaDEnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuaDEgPSBoMTtcbiAgICBmdW5jdGlvbiBoMihwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdoMicsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5oMiA9IGgyO1xuICAgIGZ1bmN0aW9uIGgzKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2gzJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmgzID0gaDM7XG4gICAgZnVuY3Rpb24gaDQocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnaDQnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuaDQgPSBoNDtcbiAgICBmdW5jdGlvbiBoNShwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdoNScsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5oNSA9IGg1O1xuICAgIGZ1bmN0aW9uIGg2KHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2g2JywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmg2ID0gaDY7XG4gICAgZnVuY3Rpb24gaGVhZChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdoZWFkJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmhlYWQgPSBoZWFkO1xuICAgIGZ1bmN0aW9uIGhlYWRlcihwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdoZWFkZXInLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuaGVhZGVyID0gaGVhZGVyO1xuICAgIGZ1bmN0aW9uIGhncm91cChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdoZ3JvdXAnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuaGdyb3VwID0gaGdyb3VwO1xuICAgIGZ1bmN0aW9uIGhyKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2hyJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmhyID0gaHI7XG4gICAgZnVuY3Rpb24gaHRtbChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdodG1sJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmh0bWwgPSBodG1sO1xuICAgIGZ1bmN0aW9uIGkocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnaScsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5pID0gaTtcbiAgICBmdW5jdGlvbiBpZnJhbWUocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnaWZyYW1lJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmlmcmFtZSA9IGlmcmFtZTtcbiAgICBmdW5jdGlvbiBpbWcocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnaW1nJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmltZyA9IGltZztcbiAgICBmdW5jdGlvbiBpbnB1dChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdpbnB1dCcsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5pbnB1dCA9IGlucHV0O1xuICAgIGZ1bmN0aW9uIGlucyhwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdpbnMnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuaW5zID0gaW5zO1xuICAgIGZ1bmN0aW9uIGlzaW5kZXgocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnaXNpbmRleCcsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5pc2luZGV4ID0gaXNpbmRleDtcbiAgICBmdW5jdGlvbiBrYmQocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgna2JkJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmtiZCA9IGtiZDtcbiAgICBmdW5jdGlvbiBrZXlnZW4ocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgna2V5Z2VuJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmtleWdlbiA9IGtleWdlbjtcbiAgICBmdW5jdGlvbiBsYWJlbChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdsYWJlbCcsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5sYWJlbCA9IGxhYmVsO1xuICAgIGZ1bmN0aW9uIGxlZ2VuZChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdsZWdlbmQnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMubGVnZW5kID0gbGVnZW5kO1xuICAgIGZ1bmN0aW9uIGxpKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ2xpJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmxpID0gbGk7XG4gICAgZnVuY3Rpb24gbGluayhwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdsaW5rJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLmxpbmsgPSBsaW5rO1xuICAgIGZ1bmN0aW9uIG1hcChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdtYXAnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMubWFwID0gbWFwO1xuICAgIGZ1bmN0aW9uIG1hcmsocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnbWFyaycsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5tYXJrID0gbWFyaztcbiAgICBmdW5jdGlvbiBtZW51KHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ21lbnUnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMubWVudSA9IG1lbnU7XG4gICAgZnVuY3Rpb24gbWV0YShwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdtZXRhJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLm1ldGEgPSBtZXRhO1xuICAgIGZ1bmN0aW9uIG1ldGVyKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ21ldGVyJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLm1ldGVyID0gbWV0ZXI7XG4gICAgZnVuY3Rpb24gbmF2KHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ25hdicsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5uYXYgPSBuYXY7XG4gICAgZnVuY3Rpb24gbm9mcmFtZXMocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnbm9mcmFtZXMnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMubm9mcmFtZXMgPSBub2ZyYW1lcztcbiAgICBmdW5jdGlvbiBub3NjcmlwdChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdub3NjcmlwdCcsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5ub3NjcmlwdCA9IG5vc2NyaXB0O1xuICAgIGZ1bmN0aW9uIG9iamVjdChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdvYmplY3QnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMub2JqZWN0ID0gb2JqZWN0O1xuICAgIGZ1bmN0aW9uIG9sKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ29sJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLm9sID0gb2w7XG4gICAgZnVuY3Rpb24gb3B0Z3JvdXAocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnb3B0Z3JvdXAnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMub3B0Z3JvdXAgPSBvcHRncm91cDtcbiAgICBmdW5jdGlvbiBvcHRpb24ocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnb3B0aW9uJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLm9wdGlvbiA9IG9wdGlvbjtcbiAgICBmdW5jdGlvbiBvdXRwdXQocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgnb3V0cHV0JywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLm91dHB1dCA9IG91dHB1dDtcbiAgICBmdW5jdGlvbiBwKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ3AnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMucCA9IHA7XG4gICAgZnVuY3Rpb24gcGFyYW0ocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgncGFyYW0nLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMucGFyYW0gPSBwYXJhbTtcbiAgICBmdW5jdGlvbiBwcmUocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgncHJlJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLnByZSA9IHByZTtcbiAgICBmdW5jdGlvbiBwcm9ncmVzcyhwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdwcm9ncmVzcycsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5wcm9ncmVzcyA9IHByb2dyZXNzO1xuICAgIGZ1bmN0aW9uIHEocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgncScsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5xID0gcTtcbiAgICBmdW5jdGlvbiBycChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdycCcsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5ycCA9IHJwO1xuICAgIGZ1bmN0aW9uIHJ0KHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ3J0JywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLnJ0ID0gcnQ7XG4gICAgZnVuY3Rpb24gcnVieShwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdydWJ5JywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLnJ1YnkgPSBydWJ5O1xuICAgIGZ1bmN0aW9uIHMocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgncycsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5zID0gcztcbiAgICBmdW5jdGlvbiBzYW1wKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ3NhbXAnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuc2FtcCA9IHNhbXA7XG4gICAgZnVuY3Rpb24gc2NyaXB0KHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ3NjcmlwdCcsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5zY3JpcHQgPSBzY3JpcHQ7XG4gICAgZnVuY3Rpb24gc2VjdGlvbihwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdzZWN0aW9uJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLnNlY3Rpb24gPSBzZWN0aW9uO1xuICAgIGZ1bmN0aW9uIHNlbGVjdChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdzZWxlY3QnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuc2VsZWN0ID0gc2VsZWN0O1xuICAgIGZ1bmN0aW9uIHNtYWxsKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ3NtYWxsJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLnNtYWxsID0gc21hbGw7XG4gICAgZnVuY3Rpb24gc291cmNlKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ3NvdXJjZScsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgZnVuY3Rpb24gc3BhbihwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdzcGFuJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLnNwYW4gPSBzcGFuO1xuICAgIGZ1bmN0aW9uIHN0cmlrZShwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdzdHJpa2UnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuc3RyaWtlID0gc3RyaWtlO1xuICAgIGZ1bmN0aW9uIHN0cm9uZyhwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCdzdHJvbmcnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMuc3Ryb25nID0gc3Ryb25nO1xuICAgIGZ1bmN0aW9uIHN0eWxlKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ3N0eWxlJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLnN0eWxlID0gc3R5bGU7XG4gICAgZnVuY3Rpb24gc3ViKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ3N1YicsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5zdWIgPSBzdWI7XG4gICAgZnVuY3Rpb24gc3VwKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ3N1cCcsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy5zdXAgPSBzdXA7XG4gICAgZnVuY3Rpb24gdGFibGUocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgndGFibGUnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMudGFibGUgPSB0YWJsZTtcbiAgICBmdW5jdGlvbiB0Ym9keShwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCd0Ym9keScsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy50Ym9keSA9IHRib2R5O1xuICAgIGZ1bmN0aW9uIHRkKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ3RkJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLnRkID0gdGQ7XG4gICAgZnVuY3Rpb24gdGV4dGFyZWEocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgndGV4dGFyZWEnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMudGV4dGFyZWEgPSB0ZXh0YXJlYTtcbiAgICBmdW5jdGlvbiB0Zm9vdChwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCd0Zm9vdCcsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy50Zm9vdCA9IHRmb290O1xuICAgIGZ1bmN0aW9uIHRoKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ3RoJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLnRoID0gdGg7XG4gICAgZnVuY3Rpb24gdGhlYWQocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgndGhlYWQnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMudGhlYWQgPSB0aGVhZDtcbiAgICBmdW5jdGlvbiB0aW1lKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ3RpbWUnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMudGltZSA9IHRpbWU7XG4gICAgZnVuY3Rpb24gdGl0bGUocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgndGl0bGUnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMudGl0bGUgPSB0aXRsZTtcbiAgICBmdW5jdGlvbiB0cihwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCd0cicsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy50ciA9IHRyO1xuICAgIGZ1bmN0aW9uIHRyYWNrKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ3RyYWNrJywgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgICBleHBvcnRzLnRyYWNrID0gdHJhY2s7XG4gICAgZnVuY3Rpb24gdHQocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgndHQnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMudHQgPSB0dDtcbiAgICBmdW5jdGlvbiB1KHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICAgIGlmIChwYXJhbTIgPT09IHZvaWQgMCkgeyBwYXJhbTIgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVsZW1lbnQoJ3UnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMudSA9IHU7XG4gICAgZnVuY3Rpb24gdWwocGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgaWYgKHBhcmFtMiA9PT0gdm9pZCAwKSB7IHBhcmFtMiA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgndWwnLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMudWwgPSB1bDtcbiAgICAvL2V4cG9ydCBmdW5jdGlvbiB2YXIocGFyYW0xOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHwgV3JhcHBlcltdIHwgc3RyaW5nLCBwYXJhbTI6IFdyYXBwZXJbXSA9IG51bGwpOiBXcmFwcGVyIHsgcmV0dXJuIGdlbmVyYXRlRWxlbWVudCgndmFyJywgcGFyYW0xLCBwYXJhbTIpIH1cbiAgICBmdW5jdGlvbiB2aWRlbyhwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCd2aWRlbycsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gICAgZXhwb3J0cy52aWRlbyA9IHZpZGVvO1xuICAgIGZ1bmN0aW9uIHdicihwYXJhbTEsIHBhcmFtMikge1xuICAgICAgICBpZiAocGFyYW0yID09PSB2b2lkIDApIHsgcGFyYW0yID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50KCd3YnInLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIGV4cG9ydHMud2JyID0gd2JyO1xufSk7XG5kZWZpbmUoXCJhcHBcIiwgW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCJ0cmFjZVwiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIHRyYWNlXzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgKDAsIHRyYWNlXzEuZGl2KSh7fSwgW1xuICAgICAgICAoMCwgdHJhY2VfMS5kaXYpKCdoZXkgaW0gd29ya2luZycpXG4gICAgXSkucmVuZGVyKCdyb290Jyk7XG59KTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=