


function installingTrace(){
    let g  = {};
    return div([
        h3('Trace was always meant to be added to existing projects with as little trouble as possible.'),
        h4('It really is as easy as 1,2,3....4'),
        div([
            g.srcCode = input({type:'text', class:'trac3-src', value:__sourceCode},''),
            p('Click the copy button'),
            buttonComp('Copy',copyTextToClipBoard)
        ]),
        div([
            p('Put the code in a script tag somewhwere in your html.')
        ]),
        div([
            p('call the function "traceInit(window)" after that script.')
        ]),
        div([
            p('find the id of an elemnt you want to use h1("Hello world"").render(<element id>)')
        ]),

    ])

    function copyTextToClipBoard(){
        g.srcCode.$element.select();
        document.execCommand("copy");
    }
}

let __sourceCode = `"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _get(e,t,n){return(_get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=_superPropBase(e,t);if(r){var i=Object.getOwnPropertyDescriptor(r,t);return i.get?i.get.call(n):i.value}})(e,t,n||e)}function _superPropBase(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_getPrototypeOf(e)););return e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(e){var t=_isNativeReflectConstruct();return function(){var n,r=_getPrototypeOf(e);if(t){var i=_getPrototypeOf(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return _possibleConstructorReturn(this,n)}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function traceInit(e){var t=function(){function e(){_classCallCheck(this,e),this.onRenderFunction=null}return _createClass(e,[{key:"addChild",value:function(e){this.childWrappers.push(e)}},{key:"removeChild",value:function(e){this.childWrappers=this.childWrappers.filter(function(t){return t!==e})}},{key:"onRenderEvent",value:function(){this.onRenderFunction&&this.onRenderFunction(this.$element,this)}},{key:"onRender",value:function(e){return this.onRenderFunction=e,delete this.onRender,this}}]),e}(),n=function(e){_inherits(r,t);var n=_createSuper(r);function r(e){var t;return _classCallCheck(this,r),(t=n.call(this)).renderFunction=e,t.$element=null,t.childWrappers=[],t}return _createClass(r,[{key:"update",value:function(){return!!document.contains(this.$parent)&&(this.render(this.$parent,this.parentWrapper),!0)}},{key:"render",value:function(e,t,n){"string"==typeof e&&(e=document.getElementById(e)),this.$parent=e,this.parentWrapper=t;var r=this.renderFunction(e,this);if(this.$element)e.insertBefore(r,this.$element),e.removeChild(this.$element);else{null==t||t.addChild(this);var i=n>=0&&e.children[n];i?e.insertBefore(r,i):e.appendChild(r)}return this.$element=r,this.onRenderEvent(),this.$element}},{key:"append",value:function(e){e.render(this.$element,this)}},{key:"prepend",value:function(e){e.render(this.$element,this,0)}},{key:"insertAt",value:function(e,t){e.render(this.$element,this,t)}}]),r}(),r=function(e){_inherits(r,t);var n=_createSuper(r);function r(e,t){var i;return _classCallCheck(this,r),(i=n.call(this)).renderFunction=e,i.__initialChildWrappers=t.map(function(t){return t.display(e)}),i.childWrappers=[],i}return _createClass(r,[{key:"__getFooterElement",value:function(){var e,t=this,n=!1;return this.parentWrapper.childWrappers.find(function(r){return n?!!(e=r.$element):(r===t&&(n=!0),!1)}),e}},{key:"$element",get:function(){return this.childWrappers[0]&&this.childWrappers[0].$element}},{key:"insertAt",value:function(e,t){var n,r=(null===(n=this.childWrappers[e])||void 0===n?void 0:n.$element)||this.__getFooterElement(),i=t.display(this.renderFunction).render(this.$parent,this);this.childWrappers.splice(e,0,this.childWrappers.pop()),r&&this.$parent.insertBefore(i,r)||this.$parent.appendChild(i)}},{key:"deleteAt",value:function(e){var t,n=null===(t=this.childWrappers[e])||void 0===t?void 0:t.$element;if(!n)throw{message:"ERROR: Cannot delete element because none was found at index [".concat(e,"]."),invalidObject:this.childWrappers};this.childWrappers.splice(e,1),this.$parent.removeChild(n)}},{key:"render",value:function(e,t){var n=this;this.$parent=e,this.parentWrapper=t,t&&t.addChild(this),this.__initialChildWrappers.forEach(function(t){return t.render(e,n)})}}]),r}(),i=function(){function e(t,n){_classCallCheck(this,e),this.renderFunction=t||function(e){return e},this.rProp=n}return _createClass(e,[{key:"update",value:function(){if(this.$element){var e=this.renderFunction(this.rProp.val,this.rProp);if("innerHTML"===this.atrName)return this.$element.innerHTML=e;this.$element.setAttribute(this.atrName,e)}}},{key:"generateAttribute",value:function(e,t){this.$element=t,this.atrName=e,this.update()}}]),e}(),s=function(){function e(){_classCallCheck(this,e),this.attributeInserts=[]}return _createClass(e,[{key:"atr",value:function(e){var t=new i(e,this);return this.attributeInserts.push(t),t}},{key:"display",value:function(e){if(e instanceof t)throw{message:"ERROR: Cannot pass an \"Element Wrapper\" into display(), it must be a function ex: prop.display(x=>h1('text')) not prop.display(h1('text'))",invalidObj:e};if("function"!=typeof e)throw{message:"ERROR: Display must receive a function",invalidObject:e}}},{key:"baseChange",value:function(){this.attributeInserts.forEach(function(e){return e.update()})}},{key:"update",value:function(e){e=e||function(e){return e},this.val=e(this.val)}}]),e}(),o=function(e){_inherits(r,s);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this)).__value=e,n.wrappers=[],n.hidden=!1,n}return _createClass(r,[{key:"val",get:function(){return this.__value},set:function(e){this.__value=e,this.baseChange(),this.wrappers=this.wrappers.filter(function(e){return e.update()}),this.upda}},{key:"display",value:function(e){var t=this;_get(_getPrototypeOf(r.prototype),"display",this).call(this,e);var i=new n(function(n,r){return e(t.__value,t).render(n,r)});return this.wrappers.push(i),i}}]),r}(),a=function(e){_inherits(n,o);var t=_createSuper(n);function n(e,r,i){var s;return _classCallCheck(this,n),(s=t.call(this,e)).parentRenderList=r,s.__id=i||r.__idItr++,s}return _createClass(n,[{key:"delete",value:function(){this.parentRenderList.deleteAt(this.index)}},{key:"moveTo",value:function(e){this.parentRenderList.move(this.index,e)}},{key:"index",get:function(){return this.parentRenderList.__idMap[this.__id]}}]),n}(),u=function(e){_inherits(n,s);var t=_createSuper(n);function n(e){var r;return _classCallCheck(this,n),(r=t.call(this)).__idItr=0,r.renderProps=e.map(function(e){return new a(e,_assertThisInitialized(r))}),r.__mapIndexes(),r.__listWrappers=[],r.length=new o(r.renderProps.length),r}return _createClass(n,[{key:"val",get:function(){return this.renderProps.map(function(e){return e.val})},set:function(e){var t=this;this.baseChange(),this.renderProps.forEach(function(){return t.deleteAt(0,!1)}),e.forEach(function(e){return t.insertAt(0,e,null,!1)}),this.__mapIndexes()}},{key:"display",value:function(e){_get(_getPrototypeOf(n.prototype),"display",this).call(this,e);var t=new r(e,this.renderProps);return this.__listWrappers.push(t),t}},{key:"push",value:function(e){this.insertAt(this.renderProps.length,e)}},{key:"unshift",value:function(e){this.insertAt(0,e)}},{key:"insertAt",value:function(e,t,n){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];e=Math.min(e,this.renderProps.length);var i=new a(t,this,n);this.__listWrappers.forEach(function(t){return t.insertAt(e,i)}),this.renderProps.splice(e,0,i),r&&this.__mapIndexes(),this.length.val=this.renderProps.length}},{key:"pop",value:function(){return this.deleteAt(this.renderProps.length-1)}},{key:"shift",value:function(){return this.deleteAt(0)}},{key:"deleteAt",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.__listWrappers.forEach(function(t){return t.deleteAt(e)});var n=this.renderProps[e].val;return this.renderProps.splice(e,1),this.length.val=this.renderProps.length,t&&this.__mapIndexes(),n}},{key:"move",value:function(e,t){if(e!==t){if(e<0||e>=this.renderProps.length)throw"Cannot move: Source Index [".concat(e,"] out of bounds");if(t<0||t>=this.renderProps.length)throw"Cannot move: Destination Index [".concat(t,"] out of bounds");var n=this.renderProps[e].__id,r=this.deleteAt(e,!1);this.insertAt(t,r,n)}}},{key:"__mapIndexes",value:function(){var e=this;this.__idMap={},this.renderProps.forEach(function(t,n){e.__idMap[t.__id]=n})}}]),n}();var l=e||{};l.RenderProp=o,l.RenderList=u;return"a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bb,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,command,datagrid,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,eventsource,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,isindex,kbd,keygen,label,legend,li,link,map,mark,menu,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr".split(",").forEach(function(e){return l[e]=function(r,s,o){return function(e,r,s,o){if(o)throw{message:"ERROR: ".concat(e,"(), contained too many parameters"),invalidObj:o};var a=null!=s?r:null,u=null!=s?s:r;return new n(function(n,r){var s=document.createElement(e);return function e(n){if(null!=n)return Array.isArray(n)?n.forEach(function(t){return e(t)}):n instanceof t?n.render(s,r):n instanceof Element?s.appendChild(n):void(s.innerHTML+=n.toString())}(u),function(e){if(null!=e){if(e instanceof t)throw{message:'ERROR: cannot use "Element Wrapper" as attribute parameter',invalidObj:e};if("object"!==_typeof(e))throw{message:"ERROR: attributes parameter must be an object. not a ".concat(_typeof(e)),invalidObj:e};Object.keys(e).forEach(function(t){e[t]instanceof i?e[t].generateAttribute(t,s):"function"==typeof e[t]||"innerHTML"===t?s[t]=e[t]:s.setAttribute(t,e[t])})}}(a),s})}(e,r,s,o)}}),l}`


