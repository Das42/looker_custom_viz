!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.hello_world=t():e.hello_world=t()}(window,(function(){return r={},e.m=t=[function(e,t,r){"use strict";e.exports=r(3)},function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return l}));t=r(0);var n=r.n(t);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=i(e);return r=t?(r=i(this).constructor,Reflect.construct(n,arguments,r)):n.apply(this,arguments),n=this,!(r=r)||"object"!==o(r)&&"function"!=typeof r?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(n):r}}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var l=function(){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(o,n.a.Component);var e,t,r=f(o);function o(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),r.call(this,e)}return e=o,(t=[{key:"render",value:function(){return n.a.createElement("div",null,this.props.data)}}])&&u(e.prototype,t),o}()},function(e,t,r){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"!==Object.keys(Object.assign({},n)).join("")?void 0:1}catch(e){return}}()?Object.assign:function(e,t){for(var r,c,f=function(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),i=1;i<arguments.length;i++){for(var l in r=Object(arguments[i]))o.call(r,l)&&(f[l]=r[l]);if(n){c=n(r);for(var a=0;a<c.length;a++)u.call(r,c[a])&&(f[c[a]]=r[c[a]])}}return f}},function(e,t,r){"use strict";
/** @license React v16.14.0
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(2),o="function"==typeof Symbol&&Symbol.for,u=o?Symbol.for("react.element"):60103,c=o?Symbol.for("react.portal"):60106,f=o?Symbol.for("react.fragment"):60107,i=o?Symbol.for("react.strict_mode"):60108,l=o?Symbol.for("react.profiler"):60114,a=o?Symbol.for("react.provider"):60109,s=o?Symbol.for("react.context"):60110,p=o?Symbol.for("react.forward_ref"):60112,y=(r=o?Symbol.for("react.suspense"):60113,o?Symbol.for("react.memo"):60115),d=o?Symbol.for("react.lazy"):60116,b="function"==typeof Symbol&&Symbol.iterator;function h(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},v={};function _(e,t,r){this.props=e,this.context=t,this.refs=v,this.updater=r||m}function g(){}function j(e,t,r){this.props=e,this.context=t,this.refs=v,this.updater=r||m}_.prototype.isReactComponent={},_.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(h(85));this.updater.enqueueSetState(this,e,t,"setState")},_.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},g.prototype=_.prototype,(o=j.prototype=new g).constructor=j,n(o,_.prototype),o.isPureReactComponent=!0;var S={current:null},O=Object.prototype.hasOwnProperty,w={key:!0,ref:!0,__self:!0,__source:!0};function P(e,t,r){var n,o={},c=null,f=null;if(null!=t)for(n in void 0!==t.ref&&(f=t.ref),void 0!==t.key&&(c=""+t.key),t)O.call(t,n)&&!w.hasOwnProperty(n)&&(o[n]=t[n]);var i=arguments.length-2;if(1===i)o.children=r;else if(1<i){for(var l=Array(i),a=0;a<i;a++)l[a]=arguments[a+2];o.children=l}if(e&&e.defaultProps)for(n in i=e.defaultProps)void 0===o[n]&&(o[n]=i[n]);return{$$typeof:u,type:e,key:c,ref:f,props:o,_owner:S.current}}function x(e){return"object"==typeof e&&null!==e&&e.$$typeof===u}var k=/\/+/g,E=[];function R(e,t,r,n){if(E.length){var o=E.pop();return o.result=e,o.keyPrefix=t,o.func=r,o.context=n,o.count=0,o}return{result:e,keyPrefix:t,func:r,context:n,count:0}}function C(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,E.length<10&&E.push(e)}function $(e,t,r){return null==e?0:function e(t,r,n,o){var f=typeof t;"undefined"!==f&&"boolean"!==f||(t=null);var i=!1;if(null===t)i=!0;else switch(f){case"string":case"number":i=!0;break;case"object":switch(t.$$typeof){case u:case c:i=!0}}if(i)return n(o,t,""===r?"."+A(t,0):r),1;if(i=0,r=""===r?".":r+":",Array.isArray(t))for(var l=0;l<t.length;l++){var a=r+A(f=t[l],l);i+=e(f,a,n,o)}else if("function"==typeof(a=null!==t&&"object"==typeof t&&"function"==typeof(a=b&&t[b]||t["@@iterator"])?a:null))for(t=a.call(t),l=0;!(f=t.next()).done;)i+=e(f=f.value,a=r+A(f,l++),n,o);else if("object"===f)throw n=""+t,Error(h(31,"[object Object]"===n?"object with keys {"+Object.keys(t).join(", ")+"}":n,""));return i}(e,"",t,r)}function A(e,t){return"object"==typeof e&&null!==e&&null!=e.key?(e=e.key,r={"=":"=0",":":"=2"},"$"+(""+e).replace(/[=:]/g,(function(e){return r[e]}))):t.toString(36);var r}function M(e,t){e.func.call(e.context,t,e.count++)}function I(e,t,r){var n=e.result,o=e.keyPrefix;e=e.func.call(e.context,t,e.count++),Array.isArray(e)?T(e,n,r,(function(e){return e})):null!=e&&(x(e)&&(r=o+(!(o=e).key||t&&t.key===e.key?"":(""+e.key).replace(k,"$&/")+"/")+r,e={$$typeof:u,type:o.type,key:r,ref:o.ref,props:o.props,_owner:o._owner}),n.push(e))}function T(e,t,r,n,o){var u="";null!=r&&(u=(""+r).replace(k,"$&/")+"/"),$(e,I,t=R(t,u,n,o)),C(t)}var q={current:null};function U(){var e=q.current;if(null===e)throw Error(h(321));return e}o={ReactCurrentDispatcher:q,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:S,IsSomeRendererActing:{current:!1},assign:n},t.Children={map:function(e,t,r){if(null==e)return e;var n=[];return T(e,n,null,t,r),n},forEach:function(e,t,r){if(null==e)return e;$(e,M,t=R(null,null,t,r)),C(t)},count:function(e){return $(e,(function(){return null}),null)},toArray:function(e){var t=[];return T(e,t,null,(function(e){return e})),t},only:function(e){if(!x(e))throw Error(h(143));return e}},t.Component=_,t.Fragment=f,t.Profiler=l,t.PureComponent=j,t.StrictMode=i,t.Suspense=r,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=o,t.cloneElement=function(e,t,r){if(null==e)throw Error(h(267,e));var o,c=n({},e.props),f=e.key,i=e.ref,l=e._owner;if(null!=t)for(a in void 0!==t.ref&&(i=t.ref,l=S.current),void 0!==t.key&&(f=""+t.key),e.type&&e.type.defaultProps&&(o=e.type.defaultProps),t)O.call(t,a)&&!w.hasOwnProperty(a)&&(c[a]=(void 0===t[a]&&void 0!==o?o:t)[a]);var a=arguments.length-2;if(1===a)c.children=r;else if(1<a){o=Array(a);for(var s=0;s<a;s++)o[s]=arguments[s+2];c.children=o}return{$$typeof:u,type:e.type,key:f,ref:i,props:c,_owner:l}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:s,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:a,_context:e},e.Consumer=e},t.createElement=P,t.createFactory=function(e){var t=P.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:p,render:e}},t.isValidElement=x,t.lazy=function(e){return{$$typeof:d,_ctor:e,_status:-1,_result:null}},t.memo=function(e,t){return{$$typeof:y,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return U().useCallback(e,t)},t.useContext=function(e,t){return U().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return U().useEffect(e,t)},t.useImperativeHandle=function(e,t,r){return U().useImperativeHandle(e,t,r)},t.useLayoutEffect=function(e,t){return U().useLayoutEffect(e,t)},t.useMemo=function(e,t){return U().useMemo(e,t)},t.useReducer=function(e,t,r){return U().useReducer(e,t,r)},t.useRef=function(e){return U().useRef(e)},t.useState=function(e){return U().useState(e)},t.version="16.14.0"}],e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},e.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var o in t)e.d(n,o,function(e){return t[e]}.bind(null,o));return n},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},e.p="",e(e.s=1);function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var t,r}));