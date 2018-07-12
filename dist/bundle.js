!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("prop-types")):"function"==typeof define&&define.amd?define(["react","prop-types"],t):"object"==typeof exports?exports["easy-form"]=t(require("react"),require("prop-types")):e["easy-form"]=t(e.react,e["prop-types"])}(window,function(e,t){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(1),i=n.n(o);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var u=a.a.createContext({}),s=u;function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var y=function(e){function t(){var e,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return m(h(h(n=function(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?h(e):t}(this,(e=d(t)).call.apply(e,[this].concat(a))))),"handleChangeAndValidate",function(e,t){if(e){var r=n.props,a=r.name,o=r.onFieldChange,i=r.validateItem,l=r.validateTrigger,u=r.onValidate,s=r[l],c=n.format(e,t,a);o(c);var f=i(a,c[a],n.props);if(f&&f.then(u,u),s){for(var p=arguments.length,d=new Array(p>2?p-2:0),v=2;v<p;v++)d[v-2]=arguments[v];s.apply(void 0,[e,t].concat(d))}}}),m(h(h(n)),"handleValueChange",function(e,t){if(e){var r=n.props,a=r.name,o=r.onFieldChange,i=r[r.validateTrigger];if(o(n.format(e,t,a)),i){for(var l=arguments.length,u=new Array(l>2?l-2:0),s=2;s<l;s++)u[s-2]=arguments[s];i.apply(void 0,[e,t].concat(u))}}}),m(h(h(n)),"handleValidate",function(e,t){var r,a=n.props,o=a.name,i=a.validateItem,l=a.onValidate;e?r=i(o,n.format(e,t,o)[o],n.props):r=i(o,null,n.props);return r&&r.then(l,l),r}),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(t,r["Component"]),function(e,t,n){t&&p(e.prototype,t),n&&p(e,n)}(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.subscribe,n=e.name;t&&t(n,this.handleValidate)}},{key:"componentWillUnmount",value:function(){var e=this.props,t=e.unSubscribe,n=e.name;t&&t(n)}},{key:"getValueFromEvent",value:function(e,t){var n=this.props.valuePropName;return e.preventDefault?null!=t?t:null!=e.target[n]?e.target[n]:e.target.value:e}},{key:"format",value:function(e,t,n){var r=this.props.formatter,a=this.getValueFromEvent(e,t),o=r?r(a):a;return"object"===f(o)?o:m({},n,o)}},{key:"render",value:function(){var e,t,n=this.props,r=n.defaultValue,a=n.values,o=n.errors,i=n.validatings,l=n.name,u=n.render,s=n.validateTrigger,f=n.valuePropName,p=n.trigger,d=c(n,["defaultValue","values","errors","validatings","name","render","validateTrigger","valuePropName","trigger"]),v=(m(e={},f,a[l]||r),m(e,p,this.handleValueChange),e);return"ignore"!==s&&(v[s]=s===p?this.handleChangeAndValidate:this.handleValidate),i[l]?t="validating":o[l]&&o[l].length>0?t="error":o[l]&&0===o[l].length&&(t="success"),u(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){m(e,t,n[t])})}return e}({},d,{id:"easy-form-".concat(l),name:l,dataBindProps:v,trigger:p,status:t,onValidate:this.handleValidate,onValueChange:this.handleValueChange,onValueChangeAndValidate:this.handleChangeAndValidate,error:o[l],validating:i[l]}))}}]),t}();m(y,"propTypes",{valuePropName:i.a.string,validateTrigger:i.a.string,trigger:i.a.string,name:i.a.string.isRequired,defaultValue:i.a.oneOfType([i.a.string,i.a.number,i.a.bool]),onValidate:i.a.func,formatter:i.a.func,render:i.a.func.isRequired}),m(y,"defaultProps",{valuePropName:"value",validateTrigger:"onChange",trigger:"onChange",defaultValue:""});var b=function(e){return function(t){return a.a.createElement(u.Consumer,null,function(n){return a.a.createElement(e,l({},n,t))})}}(y);function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function O(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var w=function(){function e(t){var n=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{first:!0,concurrent:!1};(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,e),this.transformToPromise=function(e,t,r){for(var a=arguments.length,o=new Array(a>3?a-3:0),i=3;i<a;i++)o[i-3]=arguments[i];if("function"!=typeof e.validator)throw"invalid validator";var l=e.validator.apply(e,[t].concat(o));l&&l.then&&l.catch||(l=l?Promise.resolve(l):Promise.reject(l));var u={errors:r,target:t};return l.then(function(e){return Object.assign(u,{promiseValue:e})},function(a){return u.errors=n.messageHandler.apply(n,[r,e.message,t,a].concat(o)),Promise.reject(Object.assign(u,{promiseValue:a}))})},this.lastValidator={},this.schema=t,this.options=r}return function(e,t,n){t&&g(e.prototype,t),n&&g(e,n)}(e,[{key:"validate",value:function(e,t){for(var n=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=arguments.length,o=new Array(a>3?a-3:0),i=3;i<a;i++)o[i-3]=arguments[i];var l=[];return!t||t.length<1?Promise.resolve({value:e}):(Array.isArray(t)||(t=[t]),r.concurrent?Promise.all(t.map(function(t){return n.transformToPromise.apply(n,[t,e,l].concat(o)).then(function(e){return e},r.first?function(e){return e}:null)})):t.reduce(function(t,a){return t.then(function(){return n.transformToPromise.apply(n,[a,e,l].concat(o))},r.first?null:function(){return n.transformToPromise.apply(n,[a,e,l].concat(o))})},Promise.resolve()))}},{key:"validateItem",value:function(e,t,n){var r=this,a=this.schema[t],o=e[t];if(a&&a.withFields){var i=Array.isArray(a.withFields)?a.withFields:[a.withFields];o=[t].concat(O(i)).map(function(t){return e[t]})}a&&a.rules&&(a=a.rules);for(var l=arguments.length,u=new Array(l>3?l-3:0),s=3;s<l;s++)u[s-3]=arguments[s];var c=this.validate.apply(this,[o,a,this.options].concat(u));return this.lastValidator[t]=c,c.then(function(e){return e&&(e.fieldName=t,n&&r.lastValidator[t]===c&&(r.lastValidator[t]=null,n(null,e.target))),e},function(e){return e&&(e.fieldName=t,n&&r.lastValidator[t]===c&&(r.lastValidator[t]=null,n(e.errors,e.target))),e})}},{key:"messageHandler",value:function(e,t,n,r){if("function"==typeof t){for(var a=arguments.length,o=new Array(a>4?a-4:0),i=4;i<a;i++)o[i-4]=arguments[i];e.push("".concat(t.apply(void 0,[n,r].concat(o))||"Error!").trim())}else e.push("".concat(null!=t?t:"Error!").trim());return e}},{key:"cancelItem",value:function(e){this.lastValidator[e]=null}},{key:"cancelAll",value:function(){this.lastValidator={}}},{key:"setSchema",value:function(e){this.schema=e}},{key:"setOptions",value:function(e){this.options=e}}]),e}();function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function P(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var S=function(e){var t=e.color,n=void 0===t?"#CDCDCD":t,r=P(e,["color"]);return a.a.createElement("svg",j({viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},r),a.a.createElement("path",{d:"M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3-22.2-52.4-53.9-99.4-94.3-139.9-40.4-40.4-87.5-72.2-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z",fill:n}))};n(7);function x(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function V(e){var t=e.children,n=e.id,o=e.error,i=e.validating,l=e.label,u=e.dataBindProps,s=Object(r.cloneElement)(t,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){x(e,t,n[t])})}return e}({id:n},u));return a.a.createElement("div",{className:"easy-form-field"},a.a.createElement("label",{htmlFor:n,className:"easy-form-label"},l),a.a.createElement("div",{className:"easy-form-main"},a.a.createElement("div",{className:"easy-form-input"},s,i?a.a.createElement(S,{className:"easy-form-loading easy-form-state-icon"}):null),a.a.createElement("span",{className:"easy-form-helper-text"},o)))}V.propTypes={id:i.a.string,error:i.a.string,label:i.a.string,validating:i.a.bool,dataBindProps:i.a.object},V.defaultProps={id:"",error:"",label:"",validating:!1,dataBindProps:{}};var C=V;function E(e){return(E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function A(){return(A=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function k(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function T(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){U(e,t,n[t])})}return e}function F(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function I(e){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function R(e,t){return(R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function N(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function U(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var _=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return function(o){var l,u;return u=l=function(e){function i(e,r){var a;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),U(N(N(a=function(e,t){return!t||"object"!==E(t)&&"function"!=typeof t?N(e):t}(this,I(i).call(this,e,r)))),"isPristine",!0),U(N(N(a)),"fieldValidators",{}),U(N(N(a)),"getFieldValue",function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=a.props.onChange;a.isPristine=!1,a.setState(function(n){return{values:e=T({},n.values,t)}}),n&&n(t,e)}),U(N(N(a)),"handleFieldChange",function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=n.onFormChange;t?t(a.props,e,a.getFieldValue):a.getFieldValue(e)}),U(N(N(a)),"initialize",function(){var e=n.onFormReset;a.validator.cancelAll(),a.isPristine=!0,e?e(a.props,a.originalData,a.updateValues):a.updateValues(a.originalData),a.setState(function(){return{errors:{},validatings:{}}})}),U(N(N(a)),"updateValues",function(e){a.setState({values:e})}),U(N(N(a)),"updateFieldValue",function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];a.isPristine=!1,a.setState(function(n){return{values:Object.assign({},n.values,U({},e,t))}}),n&&(a.fieldValidators[e]?a.fieldValidators[e](t):a.validateItem(e,t))}),U(N(N(a)),"subscribe",function(e,t){a.fieldValidators[e]=t}),U(N(N(a)),"unSubscribe",function(e){a.fieldValidators[e]=null}),U(N(N(a)),"updateSchema",function(e){a.schema=e,a.validator.setSchema(e)}),U(N(N(a)),"validateItem",function(e,t){var n,r=a.state.values;a.setState(function(t){return{validatings:T({},t.validatings,U({},e,!0))}});for(var o=arguments.length,i=new Array(o>2?o-2:0),l=2;l<o;l++)i[l-2]=arguments[l];return(n=a.validator).validateItem.apply(n,[Object.assign({},r,null!=t?U({},e,t):{}),e,function(t){a.setState(function(n){return{errors:T({},n.errors,U({},e,t)),validatings:T({},n.validatings,U({},e,!1))}})},r].concat(i))}),U(N(N(a)),"validateAll",function(){return Promise.all(Object.keys(a.schema).map(function(e){return a.fieldValidators[e]?a.fieldValidators[e]():a.validateItem(e)}))}),U(N(N(a)),"submit",function(e,t){return function(){a.setState({isSubmitting:!0});var n=a.state.values;return a.validateAll().then(function(r){var a={};r.forEach(function(e){a[e.fieldName]=e.errors}),Object.values(a).filter(function(e){return e&&e.length>0}).length>0?t&&t(a):e&&e(n)}).then(function(){a.setState({isSubmitting:!1})},function(){a.setState({isSubmitting:!1})})}});var o=e.values;return a.originalData=o,a.schema=t,a.state={values:a.originalData,errors:{},validatings:{},isSubmitting:!1},a.validator=new w(t,n),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&R(e,t)}(i,r["Component"]),function(e,t,n){t&&F(e.prototype,t),n&&F(e,n)}(i,[{key:"render",value:function(){var e=this.props,t=(e.onFormChange,e.onChange,k(e,["onFormChange","onChange"])),r=this.state,i=r.validatings,l=r.errors,u=Object.values(i).filter(function(e){return e}).length>0,c=Object.values(l).filter(function(e){return e&&e.length>0}).length<=0;return a.a.createElement(s.Provider,{value:T({},this.state,{onFieldChange:this.handleFieldChange,validateItem:this.validateItem,render:n.fieldRender||C,subscribe:this.subscribe,unSubscribe:this.unSubscribe})},a.a.createElement(o,A({},t,this.state,{updateFieldValue:this.updateFieldValue,updateValues:this.updateValues,updateSchema:this.updateSchema,isValidating:u,isValid:c,validateAll:this.validateAll,validateItem:this.validateItem,initialize:this.initialize,submit:this.submit,isPristine:this.isPristine})))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var n=e.values,r={};return e.values!==t.lastValues&&Object.assign(r,{values:n,lastValues:e.values}),r}}]),i}(),U(l,"defaultProps",{values:e}),U(l,"propTypes",{values:i.a.object,onChange:i.a.func}),u}};n.d(t,"ValidationField",function(){return b}),n.d(t,"createForm",function(){return _}),n.d(t,"FormContext",function(){return s});t.default=_},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var a,o=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o)?e:(a=0===o.indexOf("//")?o:0===o.indexOf("/")?n+o:r+o.replace(/^\.\//,""),"url("+JSON.stringify(a)+")")})}},function(e,t,n){var r={},a=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),o=function(e){var t={};return function(e){if("function"==typeof e)return e();if(void 0===t[e]){var n=function(e){return document.querySelector(e)}.call(this,e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),i=null,l=0,u=[],s=n(3);function c(e,t){for(var n=0;n<e.length;n++){var a=e[n],o=r[a.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](a.parts[i]);for(;i<a.parts.length;i++)o.parts.push(m(a.parts[i],t))}else{var l=[];for(i=0;i<a.parts.length;i++)l.push(m(a.parts[i],t));r[a.id]={id:a.id,refs:1,parts:l}}}}function f(e,t){for(var n=[],r={},a=0;a<e.length;a++){var o=e[a],i=t.base?o[0]+t.base:o[0],l={css:o[1],media:o[2],sourceMap:o[3]};r[i]?r[i].parts.push(l):n.push(r[i]={id:i,parts:[l]})}return n}function p(e,t){var n=o(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=u[u.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),u.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var a=o(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,a)}}function d(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=u.indexOf(e);t>=0&&u.splice(t,1)}function v(e){var t=document.createElement("style");return void 0===e.attrs.type&&(e.attrs.type="text/css"),h(t,e.attrs),p(e,t),t}function h(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function m(e,t){var n,r,a,o;if(t.transform&&e.css){if(!(o=t.transform(e.css)))return function(){};e.css=o}if(t.singleton){var u=l++;n=i||(i=v(t)),r=b.bind(null,n,u,!1),a=b.bind(null,n,u,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",h(t,e.attrs),p(e,t),t}(t),r=function(e,t,n){var r=n.css,a=n.sourceMap,o=void 0===t.convertToAbsoluteUrls&&a;(t.convertToAbsoluteUrls||o)&&(r=s(r));a&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */");var i=new Blob([r],{type:"text/css"}),l=e.href;e.href=URL.createObjectURL(i),l&&URL.revokeObjectURL(l)}.bind(null,n,t),a=function(){d(n),n.href&&URL.revokeObjectURL(n.href)}):(n=v(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),a=function(){d(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else a()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=f(e,t);return c(n,t),function(e){for(var a=[],o=0;o<n.length;o++){var i=n[o];(l=r[i.id]).refs--,a.push(l)}e&&c(f(e,t),t);for(o=0;o<a.length;o++){var l;if(0===(l=a[o]).refs){for(var u=0;u<l.parts.length;u++)l.parts[u]();delete r[l.id]}}}};var y=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function b(e,t,n,r){var a=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,a);else{var o=document.createTextNode(a),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(o,i[t]):e.appendChild(o)}}},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var a=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(r),o=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(o).concat([a]).join("\n")}return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},a=0;a<this.length;a++){var o=this[a][0];"number"==typeof o&&(r[o]=!0)}for(a=0;a<e.length;a++){var i=e[a];"number"==typeof i[0]&&r[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),t.push(i))}},t}},function(e,t,n){(e.exports=n(5)(!1)).push([e.i,".easy-form-loading {\n  width: 14px;\n  height: 14px;\n  padding: 4px;\n  animation-duration: 0.6s;\n  animation-timing-function: cubic-bezier(0.42, 0.61, 0.58, 0.41);\n  animation-iteration-count: infinite;\n  animation-name: rotate;\n}\n\n.easy-form-field {\n  display: flex;\n  margin: 10px;\n  font-size: 14px;\n}\n\n.easy-form-label {\n  min-width: 160px;\n  margin-right: 10px;\n  text-align: right;\n}\n\n.easy-form-label::after {\n  content: ':';\n}\n\n.easy-form-main {\n  display: flex;\n  flex: 1;\n  flex-flow: column nowrap;\n  max-width: 320px;\n}\n\n.easy-form-input {\n  display: flex;\n  position: relative;\n  align-items: center;\n  margin-right: 32px;\n}\n\n.easy-form-input > *:first-child {\n  flex: 1;\n}\n\n.easy-form-state-icon {\n  position: absolute;\n  left: 100%;\n}\n\n.easy-form-helper-text {\n  color: #f00;\n  font-size: 12px;\n}\n\n@keyframes rotate {\n  0% {\n    transform: rotate(0);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n}\n",""])},function(e,t,n){var r=n(6);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(4)(r,a);r.locals&&(e.exports=r.locals)}])});
//# sourceMappingURL=bundle.js.map