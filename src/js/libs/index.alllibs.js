/* underscore */
!function(n,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define("underscore",r):(n=n||self,function(){var t=n._,e=n._=r();e.noConflict=function(){return n._=t,e}}())}(this,(function(){
  //     Underscore.js 1.12.1
  //     https://underscorejs.org
  //     (c) 2009-2020 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
  //     Underscore may be freely distributed under the MIT license.
  var n="1.12.1",r="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global||Function("return this")()||{},t=Array.prototype,e=Object.prototype,u="undefined"!=typeof Symbol?Symbol.prototype:null,o=t.push,i=t.slice,a=e.toString,f=e.hasOwnProperty,c="undefined"!=typeof ArrayBuffer,l="undefined"!=typeof DataView,s=Array.isArray,p=Object.keys,v=Object.create,h=c&&ArrayBuffer.isView,y=isNaN,d=isFinite,g=!{toString:null}.propertyIsEnumerable("toString"),b=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],m=Math.pow(2,53)-1;function j(n,r){return r=null==r?n.length-1:+r,function(){for(var t=Math.max(arguments.length-r,0),e=Array(t),u=0;u<t;u++)e[u]=arguments[u+r];switch(r){case 0:return n.call(this,e);case 1:return n.call(this,arguments[0],e);case 2:return n.call(this,arguments[0],arguments[1],e)}var o=Array(r+1);for(u=0;u<r;u++)o[u]=arguments[u];return o[r]=e,n.apply(this,o)}}function _(n){var r=typeof n;return"function"===r||"object"===r&&!!n}function w(n){return void 0===n}function A(n){return!0===n||!1===n||"[object Boolean]"===a.call(n)}function x(n){var r="[object "+n+"]";return function(n){return a.call(n)===r}}var S=x("String"),O=x("Number"),M=x("Date"),E=x("RegExp"),B=x("Error"),N=x("Symbol"),I=x("ArrayBuffer"),k=x("Function"),T=r.document&&r.document.childNodes;"function"!=typeof/./&&"object"!=typeof Int8Array&&"function"!=typeof T&&(k=function(n){return"function"==typeof n||!1});var D=k,R=x("Object"),F=l&&R(new DataView(new ArrayBuffer(8))),V="undefined"!=typeof Map&&R(new Map),P=x("DataView");var q=F?function(n){return null!=n&&D(n.getInt8)&&I(n.buffer)}:P,U=s||x("Array");function W(n,r){return null!=n&&f.call(n,r)}var z=x("Arguments");!function(){z(arguments)||(z=function(n){return W(n,"callee")})}();var L=z;function $(n){return O(n)&&y(n)}function C(n){return function(){return n}}function K(n){return function(r){var t=n(r);return"number"==typeof t&&t>=0&&t<=m}}function J(n){return function(r){return null==r?void 0:r[n]}}var G=J("byteLength"),H=K(G),Q=/\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;var X=c?function(n){return h?h(n)&&!q(n):H(n)&&Q.test(a.call(n))}:C(!1),Y=J("length");function Z(n,r){r=function(n){for(var r={},t=n.length,e=0;e<t;++e)r[n[e]]=!0;return{contains:function(n){return r[n]},push:function(t){return r[t]=!0,n.push(t)}}}(r);var t=b.length,u=n.constructor,o=D(u)&&u.prototype||e,i="constructor";for(W(n,i)&&!r.contains(i)&&r.push(i);t--;)(i=b[t])in n&&n[i]!==o[i]&&!r.contains(i)&&r.push(i)}function nn(n){if(!_(n))return[];if(p)return p(n);var r=[];for(var t in n)W(n,t)&&r.push(t);return g&&Z(n,r),r}function rn(n,r){var t=nn(r),e=t.length;if(null==n)return!e;for(var u=Object(n),o=0;o<e;o++){var i=t[o];if(r[i]!==u[i]||!(i in u))return!1}return!0}function tn(n){return n instanceof tn?n:this instanceof tn?void(this._wrapped=n):new tn(n)}function en(n){return new Uint8Array(n.buffer||n,n.byteOffset||0,G(n))}tn.VERSION=n,tn.prototype.value=function(){return this._wrapped},tn.prototype.valueOf=tn.prototype.toJSON=tn.prototype.value,tn.prototype.toString=function(){return String(this._wrapped)};var un="[object DataView]";function on(n,r,t,e){if(n===r)return 0!==n||1/n==1/r;if(null==n||null==r)return!1;if(n!=n)return r!=r;var o=typeof n;return("function"===o||"object"===o||"object"==typeof r)&&function n(r,t,e,o){r instanceof tn&&(r=r._wrapped);t instanceof tn&&(t=t._wrapped);var i=a.call(r);if(i!==a.call(t))return!1;if(F&&"[object Object]"==i&&q(r)){if(!q(t))return!1;i=un}switch(i){case"[object RegExp]":case"[object String]":return""+r==""+t;case"[object Number]":return+r!=+r?+t!=+t:0==+r?1/+r==1/t:+r==+t;case"[object Date]":case"[object Boolean]":return+r==+t;case"[object Symbol]":return u.valueOf.call(r)===u.valueOf.call(t);case"[object ArrayBuffer]":case un:return n(en(r),en(t),e,o)}var f="[object Array]"===i;if(!f&&X(r)){if(G(r)!==G(t))return!1;if(r.buffer===t.buffer&&r.byteOffset===t.byteOffset)return!0;f=!0}if(!f){if("object"!=typeof r||"object"!=typeof t)return!1;var c=r.constructor,l=t.constructor;if(c!==l&&!(D(c)&&c instanceof c&&D(l)&&l instanceof l)&&"constructor"in r&&"constructor"in t)return!1}o=o||[];var s=(e=e||[]).length;for(;s--;)if(e[s]===r)return o[s]===t;if(e.push(r),o.push(t),f){if((s=r.length)!==t.length)return!1;for(;s--;)if(!on(r[s],t[s],e,o))return!1}else{var p,v=nn(r);if(s=v.length,nn(t).length!==s)return!1;for(;s--;)if(p=v[s],!W(t,p)||!on(r[p],t[p],e,o))return!1}return e.pop(),o.pop(),!0}(n,r,t,e)}function an(n){if(!_(n))return[];var r=[];for(var t in n)r.push(t);return g&&Z(n,r),r}function fn(n){var r=Y(n);return function(t){if(null==t)return!1;var e=an(t);if(Y(e))return!1;for(var u=0;u<r;u++)if(!D(t[n[u]]))return!1;return n!==hn||!D(t[cn])}}var cn="forEach",ln="has",sn=["clear","delete"],pn=["get",ln,"set"],vn=sn.concat(cn,pn),hn=sn.concat(pn),yn=["add"].concat(sn,cn,ln),dn=V?fn(vn):x("Map"),gn=V?fn(hn):x("WeakMap"),bn=V?fn(yn):x("Set"),mn=x("WeakSet");function jn(n){for(var r=nn(n),t=r.length,e=Array(t),u=0;u<t;u++)e[u]=n[r[u]];return e}function _n(n){for(var r={},t=nn(n),e=0,u=t.length;e<u;e++)r[n[t[e]]]=t[e];return r}function wn(n){var r=[];for(var t in n)D(n[t])&&r.push(t);return r.sort()}function An(n,r){return function(t){var e=arguments.length;if(r&&(t=Object(t)),e<2||null==t)return t;for(var u=1;u<e;u++)for(var o=arguments[u],i=n(o),a=i.length,f=0;f<a;f++){var c=i[f];r&&void 0!==t[c]||(t[c]=o[c])}return t}}var xn=An(an),Sn=An(nn),On=An(an,!0);function Mn(n){if(!_(n))return{};if(v)return v(n);var r=function(){};r.prototype=n;var t=new r;return r.prototype=null,t}function En(n){return _(n)?U(n)?n.slice():xn({},n):n}function Bn(n){return U(n)?n:[n]}function Nn(n){return tn.toPath(n)}function In(n,r){for(var t=r.length,e=0;e<t;e++){if(null==n)return;n=n[r[e]]}return t?n:void 0}function kn(n,r,t){var e=In(n,Nn(r));return w(e)?t:e}function Tn(n){return n}function Dn(n){return n=Sn({},n),function(r){return rn(r,n)}}function Rn(n){return n=Nn(n),function(r){return In(r,n)}}function Fn(n,r,t){if(void 0===r)return n;switch(null==t?3:t){case 1:return function(t){return n.call(r,t)};case 3:return function(t,e,u){return n.call(r,t,e,u)};case 4:return function(t,e,u,o){return n.call(r,t,e,u,o)}}return function(){return n.apply(r,arguments)}}function Vn(n,r,t){return null==n?Tn:D(n)?Fn(n,r,t):_(n)&&!U(n)?Dn(n):Rn(n)}function Pn(n,r){return Vn(n,r,1/0)}function qn(n,r,t){return tn.iteratee!==Pn?tn.iteratee(n,r):Vn(n,r,t)}function Un(){}function Wn(n,r){return null==r&&(r=n,n=0),n+Math.floor(Math.random()*(r-n+1))}tn.toPath=Bn,tn.iteratee=Pn;var zn=Date.now||function(){return(new Date).getTime()};function Ln(n){var r=function(r){return n[r]},t="(?:"+nn(n).join("|")+")",e=RegExp(t),u=RegExp(t,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,r):n}}var $n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},Cn=Ln($n),Kn=Ln(_n($n)),Jn=tn.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g},Gn=/(.)^/,Hn={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},Qn=/\\|'|\r|\n|\u2028|\u2029/g;function Xn(n){return"\\"+Hn[n]}var Yn=/^\s*(\w|\$)+\s*$/;var Zn=0;function nr(n,r,t,e,u){if(!(e instanceof r))return n.apply(t,u);var o=Mn(n.prototype),i=n.apply(o,u);return _(i)?i:o}var rr=j((function(n,r){var t=rr.placeholder,e=function(){for(var u=0,o=r.length,i=Array(o),a=0;a<o;a++)i[a]=r[a]===t?arguments[u++]:r[a];for(;u<arguments.length;)i.push(arguments[u++]);return nr(n,e,this,this,i)};return e}));rr.placeholder=tn;var tr=j((function(n,r,t){if(!D(n))throw new TypeError("Bind must be called on a function");var e=j((function(u){return nr(n,e,r,this,t.concat(u))}));return e})),er=K(Y);function ur(n,r,t,e){if(e=e||[],r||0===r){if(r<=0)return e.concat(n)}else r=1/0;for(var u=e.length,o=0,i=Y(n);o<i;o++){var a=n[o];if(er(a)&&(U(a)||L(a)))if(r>1)ur(a,r-1,t,e),u=e.length;else for(var f=0,c=a.length;f<c;)e[u++]=a[f++];else t||(e[u++]=a)}return e}var or=j((function(n,r){var t=(r=ur(r,!1,!1)).length;if(t<1)throw new Error("bindAll must be passed function names");for(;t--;){var e=r[t];n[e]=tr(n[e],n)}return n}));var ir=j((function(n,r,t){return setTimeout((function(){return n.apply(null,t)}),r)})),ar=rr(ir,tn,1);function fr(n){return function(){return!n.apply(this,arguments)}}function cr(n,r){var t;return function(){return--n>0&&(t=r.apply(this,arguments)),n<=1&&(r=null),t}}var lr=rr(cr,2);function sr(n,r,t){r=qn(r,t);for(var e,u=nn(n),o=0,i=u.length;o<i;o++)if(r(n[e=u[o]],e,n))return e}function pr(n){return function(r,t,e){t=qn(t,e);for(var u=Y(r),o=n>0?0:u-1;o>=0&&o<u;o+=n)if(t(r[o],o,r))return o;return-1}}var vr=pr(1),hr=pr(-1);function yr(n,r,t,e){for(var u=(t=qn(t,e,1))(r),o=0,i=Y(n);o<i;){var a=Math.floor((o+i)/2);t(n[a])<u?o=a+1:i=a}return o}function dr(n,r,t){return function(e,u,o){var a=0,f=Y(e);if("number"==typeof o)n>0?a=o>=0?o:Math.max(o+f,a):f=o>=0?Math.min(o+1,f):o+f+1;else if(t&&o&&f)return e[o=t(e,u)]===u?o:-1;if(u!=u)return(o=r(i.call(e,a,f),$))>=0?o+a:-1;for(o=n>0?a:f-1;o>=0&&o<f;o+=n)if(e[o]===u)return o;return-1}}var gr=dr(1,vr,yr),br=dr(-1,hr);function mr(n,r,t){var e=(er(n)?vr:sr)(n,r,t);if(void 0!==e&&-1!==e)return n[e]}function jr(n,r,t){var e,u;if(r=Fn(r,t),er(n))for(e=0,u=n.length;e<u;e++)r(n[e],e,n);else{var o=nn(n);for(e=0,u=o.length;e<u;e++)r(n[o[e]],o[e],n)}return n}function _r(n,r,t){r=qn(r,t);for(var e=!er(n)&&nn(n),u=(e||n).length,o=Array(u),i=0;i<u;i++){var a=e?e[i]:i;o[i]=r(n[a],a,n)}return o}function wr(n){var r=function(r,t,e,u){var o=!er(r)&&nn(r),i=(o||r).length,a=n>0?0:i-1;for(u||(e=r[o?o[a]:a],a+=n);a>=0&&a<i;a+=n){var f=o?o[a]:a;e=t(e,r[f],f,r)}return e};return function(n,t,e,u){var o=arguments.length>=3;return r(n,Fn(t,u,4),e,o)}}var Ar=wr(1),xr=wr(-1);function Sr(n,r,t){var e=[];return r=qn(r,t),jr(n,(function(n,t,u){r(n,t,u)&&e.push(n)})),e}function Or(n,r,t){r=qn(r,t);for(var e=!er(n)&&nn(n),u=(e||n).length,o=0;o<u;o++){var i=e?e[o]:o;if(!r(n[i],i,n))return!1}return!0}function Mr(n,r,t){r=qn(r,t);for(var e=!er(n)&&nn(n),u=(e||n).length,o=0;o<u;o++){var i=e?e[o]:o;if(r(n[i],i,n))return!0}return!1}function Er(n,r,t,e){return er(n)||(n=jn(n)),("number"!=typeof t||e)&&(t=0),gr(n,r,t)>=0}var Br=j((function(n,r,t){var e,u;return D(r)?u=r:(r=Nn(r),e=r.slice(0,-1),r=r[r.length-1]),_r(n,(function(n){var o=u;if(!o){if(e&&e.length&&(n=In(n,e)),null==n)return;o=n[r]}return null==o?o:o.apply(n,t)}))}));function Nr(n,r){return _r(n,Rn(r))}function Ir(n,r,t){var e,u,o=-1/0,i=-1/0;if(null==r||"number"==typeof r&&"object"!=typeof n[0]&&null!=n)for(var a=0,f=(n=er(n)?n:jn(n)).length;a<f;a++)null!=(e=n[a])&&e>o&&(o=e);else r=qn(r,t),jr(n,(function(n,t,e){((u=r(n,t,e))>i||u===-1/0&&o===-1/0)&&(o=n,i=u)}));return o}function kr(n,r,t){if(null==r||t)return er(n)||(n=jn(n)),n[Wn(n.length-1)];var e=er(n)?En(n):jn(n),u=Y(e);r=Math.max(Math.min(r,u),0);for(var o=u-1,i=0;i<r;i++){var a=Wn(i,o),f=e[i];e[i]=e[a],e[a]=f}return e.slice(0,r)}function Tr(n,r){return function(t,e,u){var o=r?[[],[]]:{};return e=qn(e,u),jr(t,(function(r,u){var i=e(r,u,t);n(o,r,i)})),o}}var Dr=Tr((function(n,r,t){W(n,t)?n[t].push(r):n[t]=[r]})),Rr=Tr((function(n,r,t){n[t]=r})),Fr=Tr((function(n,r,t){W(n,t)?n[t]++:n[t]=1})),Vr=Tr((function(n,r,t){n[t?0:1].push(r)}),!0),Pr=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;function qr(n,r,t){return r in t}var Ur=j((function(n,r){var t={},e=r[0];if(null==n)return t;D(e)?(r.length>1&&(e=Fn(e,r[1])),r=an(n)):(e=qr,r=ur(r,!1,!1),n=Object(n));for(var u=0,o=r.length;u<o;u++){var i=r[u],a=n[i];e(a,i,n)&&(t[i]=a)}return t})),Wr=j((function(n,r){var t,e=r[0];return D(e)?(e=fr(e),r.length>1&&(t=r[1])):(r=_r(ur(r,!1,!1),String),e=function(n,t){return!Er(r,t)}),Ur(n,e,t)}));function zr(n,r,t){return i.call(n,0,Math.max(0,n.length-(null==r||t?1:r)))}function Lr(n,r,t){return null==n||n.length<1?null==r||t?void 0:[]:null==r||t?n[0]:zr(n,n.length-r)}function $r(n,r,t){return i.call(n,null==r||t?1:r)}var Cr=j((function(n,r){return r=ur(r,!0,!0),Sr(n,(function(n){return!Er(r,n)}))})),Kr=j((function(n,r){return Cr(n,r)}));function Jr(n,r,t,e){A(r)||(e=t,t=r,r=!1),null!=t&&(t=qn(t,e));for(var u=[],o=[],i=0,a=Y(n);i<a;i++){var f=n[i],c=t?t(f,i,n):f;r&&!t?(i&&o===c||u.push(f),o=c):t?Er(o,c)||(o.push(c),u.push(f)):Er(u,f)||u.push(f)}return u}var Gr=j((function(n){return Jr(ur(n,!0,!0))}));function Hr(n){for(var r=n&&Ir(n,Y).length||0,t=Array(r),e=0;e<r;e++)t[e]=Nr(n,e);return t}var Qr=j(Hr);function Xr(n,r){return n._chain?tn(r).chain():r}function Yr(n){return jr(wn(n),(function(r){var t=tn[r]=n[r];tn.prototype[r]=function(){var n=[this._wrapped];return o.apply(n,arguments),Xr(this,t.apply(tn,n))}})),tn}jr(["pop","push","reverse","shift","sort","splice","unshift"],(function(n){var r=t[n];tn.prototype[n]=function(){var t=this._wrapped;return null!=t&&(r.apply(t,arguments),"shift"!==n&&"splice"!==n||0!==t.length||delete t[0]),Xr(this,t)}})),jr(["concat","join","slice"],(function(n){var r=t[n];tn.prototype[n]=function(){var n=this._wrapped;return null!=n&&(n=r.apply(n,arguments)),Xr(this,n)}}));var Zr=Yr({__proto__:null,VERSION:n,restArguments:j,isObject:_,isNull:function(n){return null===n},isUndefined:w,isBoolean:A,isElement:function(n){return!(!n||1!==n.nodeType)},isString:S,isNumber:O,isDate:M,isRegExp:E,isError:B,isSymbol:N,isArrayBuffer:I,isDataView:q,isArray:U,isFunction:D,isArguments:L,isFinite:function(n){return!N(n)&&d(n)&&!isNaN(parseFloat(n))},isNaN:$,isTypedArray:X,isEmpty:function(n){if(null==n)return!0;var r=Y(n);return"number"==typeof r&&(U(n)||S(n)||L(n))?0===r:0===Y(nn(n))},isMatch:rn,isEqual:function(n,r){return on(n,r)},isMap:dn,isWeakMap:gn,isSet:bn,isWeakSet:mn,keys:nn,allKeys:an,values:jn,pairs:function(n){for(var r=nn(n),t=r.length,e=Array(t),u=0;u<t;u++)e[u]=[r[u],n[r[u]]];return e},invert:_n,functions:wn,methods:wn,extend:xn,extendOwn:Sn,assign:Sn,defaults:On,create:function(n,r){var t=Mn(n);return r&&Sn(t,r),t},clone:En,tap:function(n,r){return r(n),n},get:kn,has:function(n,r){for(var t=(r=Nn(r)).length,e=0;e<t;e++){var u=r[e];if(!W(n,u))return!1;n=n[u]}return!!t},mapObject:function(n,r,t){r=qn(r,t);for(var e=nn(n),u=e.length,o={},i=0;i<u;i++){var a=e[i];o[a]=r(n[a],a,n)}return o},identity:Tn,constant:C,noop:Un,toPath:Bn,property:Rn,propertyOf:function(n){return null==n?Un:function(r){return kn(n,r)}},matcher:Dn,matches:Dn,times:function(n,r,t){var e=Array(Math.max(0,n));r=Fn(r,t,1);for(var u=0;u<n;u++)e[u]=r(u);return e},random:Wn,now:zn,escape:Cn,unescape:Kn,templateSettings:Jn,template:function(n,r,t){!r&&t&&(r=t),r=On({},r,tn.templateSettings);var e=RegExp([(r.escape||Gn).source,(r.interpolate||Gn).source,(r.evaluate||Gn).source].join("|")+"|$","g"),u=0,o="__p+='";n.replace(e,(function(r,t,e,i,a){return o+=n.slice(u,a).replace(Qn,Xn),u=a+r.length,t?o+="'+\n((__t=("+t+"))==null?'':_.escape(__t))+\n'":e?o+="'+\n((__t=("+e+"))==null?'':__t)+\n'":i&&(o+="';\n"+i+"\n__p+='"),r})),o+="';\n";var i,a=r.variable;if(a){if(!Yn.test(a))throw new Error("variable is not a bare identifier: "+a)}else o="with(obj||{}){\n"+o+"}\n",a="obj";o="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+o+"return __p;\n";try{i=new Function(a,"_",o)}catch(n){throw n.source=o,n}var f=function(n){return i.call(this,n,tn)};return f.source="function("+a+"){\n"+o+"}",f},result:function(n,r,t){var e=(r=Nn(r)).length;if(!e)return D(t)?t.call(n):t;for(var u=0;u<e;u++){var o=null==n?void 0:n[r[u]];void 0===o&&(o=t,u=e),n=D(o)?o.call(n):o}return n},uniqueId:function(n){var r=++Zn+"";return n?n+r:r},chain:function(n){var r=tn(n);return r._chain=!0,r},iteratee:Pn,partial:rr,bind:tr,bindAll:or,memoize:function(n,r){var t=function(e){var u=t.cache,o=""+(r?r.apply(this,arguments):e);return W(u,o)||(u[o]=n.apply(this,arguments)),u[o]};return t.cache={},t},delay:ir,defer:ar,throttle:function(n,r,t){var e,u,o,i,a=0;t||(t={});var f=function(){a=!1===t.leading?0:zn(),e=null,i=n.apply(u,o),e||(u=o=null)},c=function(){var c=zn();a||!1!==t.leading||(a=c);var l=r-(c-a);return u=this,o=arguments,l<=0||l>r?(e&&(clearTimeout(e),e=null),a=c,i=n.apply(u,o),e||(u=o=null)):e||!1===t.trailing||(e=setTimeout(f,l)),i};return c.cancel=function(){clearTimeout(e),a=0,e=u=o=null},c},debounce:function(n,r,t){var e,u,o,i,a,f=function(){var c=zn()-u;r>c?e=setTimeout(f,r-c):(e=null,t||(i=n.apply(a,o)),e||(o=a=null))},c=j((function(c){return a=this,o=c,u=zn(),e||(e=setTimeout(f,r),t&&(i=n.apply(a,o))),i}));return c.cancel=function(){clearTimeout(e),e=o=a=null},c},wrap:function(n,r){return rr(r,n)},negate:fr,compose:function(){var n=arguments,r=n.length-1;return function(){for(var t=r,e=n[r].apply(this,arguments);t--;)e=n[t].call(this,e);return e}},after:function(n,r){return function(){if(--n<1)return r.apply(this,arguments)}},before:cr,once:lr,findKey:sr,findIndex:vr,findLastIndex:hr,sortedIndex:yr,indexOf:gr,lastIndexOf:br,find:mr,detect:mr,findWhere:function(n,r){return mr(n,Dn(r))},each:jr,forEach:jr,map:_r,collect:_r,reduce:Ar,foldl:Ar,inject:Ar,reduceRight:xr,foldr:xr,filter:Sr,select:Sr,reject:function(n,r,t){return Sr(n,fr(qn(r)),t)},every:Or,all:Or,some:Mr,any:Mr,contains:Er,includes:Er,include:Er,invoke:Br,pluck:Nr,where:function(n,r){return Sr(n,Dn(r))},max:Ir,min:function(n,r,t){var e,u,o=1/0,i=1/0;if(null==r||"number"==typeof r&&"object"!=typeof n[0]&&null!=n)for(var a=0,f=(n=er(n)?n:jn(n)).length;a<f;a++)null!=(e=n[a])&&e<o&&(o=e);else r=qn(r,t),jr(n,(function(n,t,e){((u=r(n,t,e))<i||u===1/0&&o===1/0)&&(o=n,i=u)}));return o},shuffle:function(n){return kr(n,1/0)},sample:kr,sortBy:function(n,r,t){var e=0;return r=qn(r,t),Nr(_r(n,(function(n,t,u){return{value:n,index:e++,criteria:r(n,t,u)}})).sort((function(n,r){var t=n.criteria,e=r.criteria;if(t!==e){if(t>e||void 0===t)return 1;if(t<e||void 0===e)return-1}return n.index-r.index})),"value")},groupBy:Dr,indexBy:Rr,countBy:Fr,partition:Vr,toArray:function(n){return n?U(n)?i.call(n):S(n)?n.match(Pr):er(n)?_r(n,Tn):jn(n):[]},size:function(n){return null==n?0:er(n)?n.length:nn(n).length},pick:Ur,omit:Wr,first:Lr,head:Lr,take:Lr,initial:zr,last:function(n,r,t){return null==n||n.length<1?null==r||t?void 0:[]:null==r||t?n[n.length-1]:$r(n,Math.max(0,n.length-r))},rest:$r,tail:$r,drop:$r,compact:function(n){return Sr(n,Boolean)},flatten:function(n,r){return ur(n,r,!1)},without:Kr,uniq:Jr,unique:Jr,union:Gr,intersection:function(n){for(var r=[],t=arguments.length,e=0,u=Y(n);e<u;e++){var o=n[e];if(!Er(r,o)){var i;for(i=1;i<t&&Er(arguments[i],o);i++);i===t&&r.push(o)}}return r},difference:Cr,unzip:Hr,transpose:Hr,zip:Qr,object:function(n,r){for(var t={},e=0,u=Y(n);e<u;e++)r?t[n[e]]=r[e]:t[n[e][0]]=n[e][1];return t},range:function(n,r,t){null==r&&(r=n||0,n=0),t||(t=r<n?-1:1);for(var e=Math.max(Math.ceil((r-n)/t),0),u=Array(e),o=0;o<e;o++,n+=t)u[o]=n;return u},chunk:function(n,r){if(null==r||r<1)return[];for(var t=[],e=0,u=n.length;e<u;)t.push(i.call(n,e,e+=r));return t},mixin:Yr,default:tn});return Zr._=Zr,Zr}));

/* KAS */
/*! KAS | https://github.com/Khan/KAS */
// This is a @generated file
var _, KAS = {};

if (typeof module === "object" && module.exports) {
    _ = require("underscore");
    module.exports = KAS;
} else {
    _ = window._;
    window.KAS = KAS;
}

(function(KAS) {

/* parser generated by jison 0.4.15 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,17],$V2=[1,13],$V3=[1,14],$V4=[1,15],$V5=[1,32],$V6=[1,22],$V7=[1,23],$V8=[1,24],$V9=[1,25],$Va=[1,26],$Vb=[1,33],$Vc=[1,27],$Vd=[1,28],$Ve=[1,29],$Vf=[1,30],$Vg=[1,20],$Vh=[1,36],$Vi=[1,37],$Vj=[5,6,8,10,33,35,41,43,45],$Vk=[1,39],$Vl=[1,40],$Vm=[5,6,8,10,12,14,16,19,21,22,28,29,30,31,32,33,34,35,37,39,41,42,43,44,45,46],$Vn=[10,16,19,21,22,28,29,30,31,32,34,37,39,42,43,44,46],$Vo=[5,6,8,10,12,14,16,18,19,21,22,28,29,30,31,32,33,34,35,37,39,41,42,43,44,45,46];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"equation":3,"expression":4,"SIGN":5,"EOF":6,"additive":7,"+":8,"multiplicative":9,"-":10,"triglog":11,"*":12,"negative":13,"/":14,"trig":15,"TRIG":16,"trigfunc":17,"^":18,"TRIGINV":19,"logbase":20,"ln":21,"log":22,"_":23,"subscriptable":24,"power":25,"primitive":26,"variable":27,"VAR":28,"CONST":29,"INT":30,"FLOAT":31,"{":32,"}":33,"(":34,")":35,"function":36,"FUNC":37,"invocation":38,"sqrt":39,"[":40,"]":41,"abs":42,"|":43,"LEFT|":44,"RIGHT|":45,"FRAC":46,"$accept":0,"$end":1},
terminals_: {2:"error",5:"SIGN",6:"EOF",8:"+",10:"-",12:"*",14:"/",16:"TRIG",18:"^",19:"TRIGINV",21:"ln",22:"log",23:"_",28:"VAR",29:"CONST",30:"INT",31:"FLOAT",32:"{",33:"}",34:"(",35:")",37:"FUNC",39:"sqrt",40:"[",41:"]",42:"abs",43:"|",44:"LEFT|",45:"RIGHT|",46:"FRAC"},
productions_: [0,[3,4],[3,2],[3,1],[4,1],[7,3],[7,3],[7,1],[9,2],[9,3],[9,3],[9,1],[13,2],[13,1],[15,1],[17,1],[17,3],[17,1],[20,1],[20,1],[20,3],[11,2],[11,2],[11,1],[25,3],[25,1],[27,1],[24,3],[24,1],[24,1],[24,1],[24,1],[24,3],[24,3],[36,1],[38,4],[38,4],[38,7],[38,4],[38,3],[38,3],[38,4],[26,1],[26,1],[26,7]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return new yy.Eq($$[$0-3], $$[$0-2], $$[$0-1]);
break;
case 2:
return $$[$0-1];
break;
case 3:
return new yy.Add([]);
break;
case 4: case 7: case 11: case 13: case 15: case 20: case 23: case 25: case 42: case 43:
this.$ = $$[$0];
break;
case 5:
this.$ = yy.Add.createOrAppend($$[$0-2], $$[$0]);
break;
case 6:
this.$ = yy.Add.createOrAppend($$[$0-2], yy.Mul.handleNegative($$[$0], "subtract"));
break;
case 8:
this.$ = yy.Mul.fold(yy.Mul.createOrAppend($$[$0-1], $$[$0]));
break;
case 9:
this.$ = yy.Mul.fold(yy.Mul.createOrAppend($$[$0-2], $$[$0]));
break;
case 10:
this.$ = yy.Mul.fold(yy.Mul.handleDivide($$[$0-2], $$[$0]));
break;
case 12:
this.$ = yy.Mul.handleNegative($$[$0]);
break;
case 14: case 17:
this.$ = [yytext];
break;
case 16:
this.$ = $$[$0-2].concat($$[$0]);
break;
case 18:
this.$ = yy.Log.natural();
break;
case 19:
this.$ = yy.Log.common();
break;
case 21:
this.$ = yy.Trig.create($$[$0-1], $$[$0]);
break;
case 22:
this.$ = yy.Log.create($$[$0-1], $$[$0]);
break;
case 24:
this.$ = new yy.Pow($$[$0-2], $$[$0]);
break;
case 26: case 34:
this.$ = yytext;
break;
case 27:
this.$ = new yy.Var($$[$0-2], $$[$0]);
break;
case 28:
this.$ = new yy.Var($$[$0]);
break;
case 29:
this.$ = new yy.Const(yytext.toLowerCase());
break;
case 30:
this.$ = yy.Int.create(Number(yytext));
break;
case 31:
this.$ = yy.Float.create(Number(yytext));
break;
case 32:
this.$ = $$[$0-1].completeParse();
break;
case 33:
this.$ = $$[$0-1].completeParse().addHint('parens');
break;
case 35: case 36:
this.$ = yy.Pow.sqrt($$[$0-1]);
break;
case 37:
this.$ = new yy.Pow.nthroot($$[$0-1], $$[$0-4]);
break;
case 38: case 39: case 40:
this.$ = new yy.Abs($$[$0-1]);
break;
case 41:
this.$ = new yy.Func($$[$0-3], $$[$0-1]);
break;
case 44:
this.$ = yy.Mul.handleDivide($$[$0-4], $$[$0-1]);
break;
}
},
table: [{3:1,4:2,6:[1,3],7:4,9:5,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{1:[3]},{5:[1,34],6:[1,35]},{1:[2,3]},o([5,6],[2,4],{8:$Vh,10:$Vi}),o($Vj,[2,7],{17:9,20:10,25:11,15:12,26:16,24:18,38:19,27:21,36:31,11:38,12:$Vk,14:$Vl,16:$V1,19:$V2,21:$V3,22:$V4,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,37:$Vb,39:$Vc,42:$Vd,44:$Vf,46:$Vg}),o($Vm,[2,11]),{10:$V0,11:8,13:41,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},o($Vm,[2,13]),{10:$V0,11:8,13:42,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{10:$V0,11:8,13:43,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},o($Vm,[2,23]),o($Vn,[2,15],{18:[1,44]}),o($Vn,[2,17]),o($Vn,[2,18]),o($Vn,[2,19],{23:[1,45]}),o($Vm,[2,25],{18:[1,46]}),o([10,16,18,19,21,22,28,29,30,31,32,34,37,39,42,43,44,46],[2,14]),o($Vo,[2,42]),o($Vo,[2,43]),{32:[1,47]},o($Vo,[2,28],{23:[1,48]}),o($Vo,[2,29]),o($Vo,[2,30]),o($Vo,[2,31]),{7:49,9:5,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{7:50,9:5,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{32:[1,52],34:[1,51],40:[1,53]},{34:[1,54]},{7:55,9:5,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{7:56,9:5,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{34:[1,57]},o([5,6,8,10,12,14,16,18,19,21,22,23,28,29,30,31,32,33,34,35,37,39,41,42,43,44,45,46],[2,26]),{34:[2,34]},{4:58,7:4,9:5,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{1:[2,2]},{9:59,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{9:60,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},o($Vm,[2,8]),{10:$V0,11:8,13:61,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{10:$V0,11:8,13:62,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},o($Vm,[2,12]),o($Vm,[2,21]),o($Vm,[2,22]),{10:$V0,11:8,13:63,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{24:64,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va},{10:$V0,11:8,13:65,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{7:66,9:5,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{24:67,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va},{8:$Vh,10:$Vi,33:[1,68]},{8:$Vh,10:$Vi,35:[1,69]},{7:70,9:5,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{7:71,9:5,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{7:72,9:5,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{7:73,9:5,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{8:$Vh,10:$Vi,43:[1,74]},{8:$Vh,10:$Vi,45:[1,75]},{7:76,9:5,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{6:[1,77]},o($Vj,[2,5],{17:9,20:10,25:11,15:12,26:16,24:18,38:19,27:21,36:31,11:38,12:$Vk,14:$Vl,16:$V1,19:$V2,21:$V3,22:$V4,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,37:$Vb,39:$Vc,42:$Vd,44:$Vf,46:$Vg}),o($Vj,[2,6],{17:9,20:10,25:11,15:12,26:16,24:18,38:19,27:21,36:31,11:38,12:$Vk,14:$Vl,16:$V1,19:$V2,21:$V3,22:$V4,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,37:$Vb,39:$Vc,42:$Vd,44:$Vf,46:$Vg}),o($Vm,[2,9]),o($Vm,[2,10]),o($Vn,[2,16]),o($Vn,[2,20]),o($Vm,[2,24]),{8:$Vh,10:$Vi,33:[1,78]},o($Vo,[2,27]),o($Vo,[2,32]),o($Vo,[2,33]),{8:$Vh,10:$Vi,35:[1,79]},{8:$Vh,10:$Vi,33:[1,80]},{8:$Vh,10:$Vi,41:[1,81]},{8:$Vh,10:$Vi,35:[1,82]},o($Vo,[2,39]),o($Vo,[2,40]),{8:$Vh,10:$Vi,35:[1,83]},{1:[2,1]},{32:[1,84]},o($Vo,[2,35]),o($Vo,[2,36]),{32:[1,85]},o($Vo,[2,38]),o($Vo,[2,41]),{7:86,9:5,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{7:87,9:5,10:$V0,11:8,13:6,15:12,16:$V1,17:9,19:$V2,20:10,21:$V3,22:$V4,24:18,25:11,26:16,27:21,28:$V5,29:$V6,30:$V7,31:$V8,32:$V9,34:$Va,36:31,37:$Vb,38:19,39:$Vc,42:$Vd,43:$Ve,44:$Vf,46:$Vg},{8:$Vh,10:$Vi,33:[1,88]},{8:$Vh,10:$Vi,33:[1,89]},o($Vo,[2,44]),o($Vo,[2,37])],
defaultActions: {3:[2,3],33:[2,34],35:[2,2],77:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    //_token_stack:
        function lex() {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"flex":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:/* skip \space */
break;
case 2:/* skip '\ ' */
break;
case 3:return "INT"
break;
case 4:return "FLOAT"
break;
case 5:return "^"
break;
case 6:return "*"
break;
case 7:return "*"
break;
case 8:return "*"
break;
case 9:return "*"
break;
case 10:return "/"
break;
case 11:return "/"
break;
case 12:return "-"
break;
case 13:return "-"
break;
case 14:return "+"
break;
case 15:return "^"
break;
case 16:return "("
break;
case 17:return ")"
break;
case 18:return "("
break;
case 19:return ")"
break;
case 20:return "["
break;
case 21:return "]"
break;
case 22:return "{"
break;
case 23:return "}"
break;
case 24:return "{"
break;
case 25:return "}"
break;
case 26:return "_"
break;
case 27:return "|"
break;
case 28:return "LEFT|"
break;
case 29:return "RIGHT|"
break;
case 30:return "!"
break;
case 31:return "SIGN"
break;
case 32:yy_.yytext = "<="; return "SIGN"
break;
case 33:yy_.yytext = ">="; return "SIGN"
break;
case 34:yy_.yytext = "<="; return "SIGN"
break;
case 35:yy_.yytext = ">="; return "SIGN"
break;
case 36:yy_.yytext = "<>"; return "SIGN"
break;
case 37:yy_.yytext = "<>"; return "SIGN"
break;
case 38:yy_.yytext = "<>"; return "SIGN"
break;
case 39:yy_.yytext = "<>"; return "SIGN"
break;
case 40:yy_.yytext = "<="; return "SIGN"
break;
case 41:yy_.yytext = ">="; return "SIGN"
break;
case 42:return "FRAC"
break;
case 43:return "FRAC"
break;
case 44:return "sqrt"
break;
case 45:return "abs"
break;
case 46:return "ln"
break;
case 47:return "log"
break;
case 48:return "TRIG"
break;
case 49:return "TRIG"
break;
case 50:return "TRIG"
break;
case 51:return "TRIG"
break;
case 52:yy_.yytext = "sin"; return "TRIG"
break;
case 53:yy_.yytext = "cos"; return "TRIG"
break;
case 54:yy_.yytext = "tan"; return "TRIG"
break;
case 55:yy_.yytext = "csc"; return "TRIG"
break;
case 56:yy_.yytext = "sec"; return "TRIG"
break;
case 57:yy_.yytext = "cot"; return "TRIG"
break;
case 58:yy_.yytext = "arcsin"; return "TRIG"
break;
case 59:yy_.yytext = "arccos"; return "TRIG"
break;
case 60:yy_.yytext = "arctan"; return "TRIG"
break;
case 61:yy_.yytext = "arccsc"; return "TRIG"
break;
case 62:yy_.yytext = "arcsec"; return "TRIG"
break;
case 63:yy_.yytext = "arccot"; return "TRIG"
break;
case 64:return "TRIGINV"
break;
case 65:return "TRIGINV"
break;
case 66:yy_.yytext = "sinh"; return "TRIG"
break;
case 67:yy_.yytext = "cosh"; return "TRIG"
break;
case 68:yy_.yytext = "tanh"; return "TRIG"
break;
case 69:yy_.yytext = "csch"; return "TRIG"
break;
case 70:yy_.yytext = "sech"; return "TRIG"
break;
case 71:yy_.yytext = "tanh"; return "TRIG"
break;
case 72:return "CONST"
break;
case 73:yy_.yytext = "pi"; return "CONST"
break;
case 74:yy_.yytext = "pi"; return "CONST"
break;
case 75:return "VAR"
break;
case 76:yy_.yytext = "theta"; return "VAR"
break;
case 77:yy_.yytext = "theta"; return "VAR"
break;
case 78:return "VAR"
break;
case 79:yy_.yytext = "phi"; return "VAR"
break;
case 80:yy_.yytext = "phi"; return "VAR"
break;
case 81:return yy.symbolLexer(yy_.yytext)
break;
case 82:return "EOF"
break;
case 83:return "INVALID"
break;
case 84:console.log(yy_.yytext);
break;
}
},
rules: [/^(?:\s+)/,/^(?:\\space)/,/^(?:\\ )/,/^(?:[0-9]+\.?)/,/^(?:([0-9]+)?\.[0-9]+)/,/^(?:\*\*)/,/^(?:\*)/,/^(?:\\cdot|·)/,/^(?:\\times|×)/,/^(?:\\ast)/,/^(?:\/)/,/^(?:\\div|÷)/,/^(?:-)/,/^(?:−)/,/^(?:\+)/,/^(?:\^)/,/^(?:\()/,/^(?:\))/,/^(?:\\left\()/,/^(?:\\right\))/,/^(?:\[)/,/^(?:\])/,/^(?:\{)/,/^(?:\})/,/^(?:\\left\{)/,/^(?:\\right\})/,/^(?:_)/,/^(?:\|)/,/^(?:\\left\|)/,/^(?:\\right\|)/,/^(?:\!)/,/^(?:<=|>=|<>|<|>|=)/,/^(?:\\le)/,/^(?:\\ge)/,/^(?:\\leq)/,/^(?:\\geq)/,/^(?:=\/=)/,/^(?:\\ne)/,/^(?:\\neq)/,/^(?:≠)/,/^(?:≤)/,/^(?:≥)/,/^(?:\\frac)/,/^(?:\\dfrac)/,/^(?:sqrt|\\sqrt)/,/^(?:abs|\\abs)/,/^(?:ln|\\ln)/,/^(?:log|\\log)/,/^(?:sin|cos|tan)/,/^(?:csc|sec|cot)/,/^(?:sinh|cosh|tanh)/,/^(?:csch|sech|coth)/,/^(?:\\sin)/,/^(?:\\cos)/,/^(?:\\tan)/,/^(?:\\csc)/,/^(?:\\sec)/,/^(?:\\cot)/,/^(?:\\arcsin)/,/^(?:\\arccos)/,/^(?:\\arctan)/,/^(?:\\arccsc)/,/^(?:\\arcsec)/,/^(?:\\arccot)/,/^(?:arcsin|arccos|arctan)/,/^(?:arccsc|arcsec|arccot)/,/^(?:\\sinh)/,/^(?:\\cosh)/,/^(?:\\tanh)/,/^(?:\\csch)/,/^(?:\\sech)/,/^(?:\\coth)/,/^(?:pi)/,/^(?:π)/,/^(?:\\pi)/,/^(?:theta)/,/^(?:θ)/,/^(?:\\theta)/,/^(?:phi)/,/^(?:φ)/,/^(?:\\phi)/,/^(?:[a-zA-Z])/,/^(?:$)/,/^(?:.)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();

KAS.parser = parser;
})(KAS);
// this is a @generated file
(function(KAS) {

/* parser generated by jison 0.4.15 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,11],$V1=[1,9],$V2=[8,17],$V3=[6,11],$V4=[6,11,13,17];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"unitvalue":3,"magnitude":4,"unit":5,"EOF":6,"float":7,"POW":8,"int":9,"multatoms":10,"DIV":11,"expatom":12,"MUL":13,"atom":14,"^":15,"nat":16,"ATOM":17,"FLOAT":18,"NAT":19,"NEG":20,"$accept":0,"$end":1},
terminals_: {2:"error",6:"EOF",8:"POW",11:"DIV",13:"MUL",15:"^",17:"ATOM",18:"FLOAT",19:"NAT",20:"NEG"},
productions_: [0,[3,3],[3,2],[4,3],[4,1],[5,3],[5,1],[10,3],[10,2],[10,1],[12,3],[12,1],[14,1],[7,1],[7,1],[16,1],[9,2],[9,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

            return {
                type: "unitMagnitude",
                magnitude: $$[$0-2],
                unit: $$[$0-1],
            };
        
break;
case 2:

            return {
                type: "unitStandalone",
                unit: $$[$0-1],
            }
        
break;
case 3:

            this.$ = $$[$0-2] + "e" + $$[$0];
        
break;
case 4: case 13: case 14: case 15: case 17:
 this.$ = $$[$0]; 
break;
case 5:

            this.$ = {
                num: $$[$0-2],
                denom: $$[$0],
            };
        
break;
case 6:

            this.$ = {
                num: $$[$0],
                denom: null,
            };
        
break;
case 7:
 this.$ = [$$[$0-2]].concat($$[$0]); 
break;
case 8:
 this.$ = [$$[$0-1]].concat($$[$0]); 
break;
case 9:
 this.$ = [$$[$0]]; 
break;
case 10:

            this.$ = {
                name: $$[$0-2],
                pow: $$[$0],
            };
        
break;
case 11:

            this.$ = {
                name: $$[$0],
                pow: 1,
            };
        
break;
case 12:
 this.$ = yytext; 
break;
case 16:
 this.$ = "-" + $$[$0]; 
break;
}
},
table: [{3:1,4:2,5:3,7:4,10:5,12:8,14:10,16:7,17:$V0,18:[1,6],19:$V1},{1:[3]},{5:12,10:5,12:8,14:10,17:$V0},{6:[1,13]},{8:[1,14],17:[2,4]},{6:[2,6],11:[1,15]},o($V2,[2,13]),o($V2,[2,14]),o($V3,[2,9],{12:8,14:10,10:17,13:[1,16],17:$V0}),o([6,8,11,13,17],[2,15]),o($V4,[2,11],{15:[1,18]}),o([6,11,13,15,17],[2,12]),{6:[1,19]},{1:[2,2]},{9:20,19:[1,22],20:[1,21]},{10:23,12:8,14:10,17:$V0},{10:24,12:8,14:10,17:$V0},o($V3,[2,8]),{16:25,19:$V1},{1:[2,1]},{17:[2,3]},{19:[1,26]},{17:[2,17]},{6:[2,5]},o($V3,[2,7]),o($V4,[2,10]),{17:[2,16]}],
defaultActions: {13:[2,2],19:[2,1],20:[2,3],22:[2,17],23:[2,5],26:[2,16]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    //_token_stack:
        function lex() {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 11;
break;
case 1:return '(';
break;
case 2:return ')';
break;
case 3:return 8;
break;
case 4:return 15;
break;
case 5:return 13;
break;
case 6:return 18;
break;
case 7:return 19;
break;
case 8:return 20;
break;
case 9:return 17;
break;
case 10:return 17;
break;
case 11:return 17;
break;
case 12:/* skip whitespace */
break;
case 13:return 6;
break;
}
},
rules: [/^(?:\/)/,/^(?:\()/,/^(?:\))/,/^(?:(\*|x|\u00d7|\u2219|\u22c5|\u00b7)\s*10\s*\^)/,/^(?:\^)/,/^(?:\*)/,/^(?:[0-9]+\.[0-9]+)/,/^(?:[0-9]+)/,/^(?:-)/,/^(?:\u00b0( ?)[cCfF])/,/^(?:fl\.? oz\.?)/,/^(?:[\u00b5]?([A-Za-z-]+|[\u2103\u2109\u212b]))/,/^(?:\s+)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();

KAS.unitParser = parser;
})(KAS);
/* TODO(charlie): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable indent, no-undef, no-var, one-var, no-dupe-keys, no-new-func, no-redeclare, no-unused-vars, comma-dangle, max-len, prefer-spread, space-infix-ops, space-unary-ops */

(function(KAS) {

/*  The node hierarcy is as follows:

    (Expr)
        (Seq)           2+ children
            Add
            Mul
        Pow             2 children
        Log             2 children
        Eq              2 children
        Trig            1 child
        Abs             1 child
        (Symbol)
            Func        1 child     e.g. f(x)
            Var         leaf node   e.g. x, x_n
            Const       leaf node   e.g. pi, e, <i>
            Unit        leaf node   e.g. kg
        (Num)           leaf node
            Rational                e.g. 2/3
                Int
            Float

    (abstract, not meant to be instantiated)

    == Key design concepts ==
    Functional: All methods return new nodes - nodes are never mutated.
    Ignore commutativity: Commutative inputs should be parsed equivalently.
    Exploit commutativity: Output should take advantage of ordering.
*/

/* non user-facing functions */

// assert that all abstract methods have been overridden
var abstract = function() {
    // Try to give people a bit of information when this happens
    throw new Error("Abstract method - must override for expr: " +
            this.print());
};

// throw an error that is meant to be caught by the test suite (not user facing)
var error = function(message) { throw new Error(message); };

// reliably detect NaN
var isNaN = function(object) { return object !== object; };

// return a random float between min (inclusive) and max (exclusive),
// not that inclusivity means much, probabilistically, on floats
var randomFloat = function(min, max) {
    var extent = max - min;
    return Math.random() * extent + min;
};

/* constants */
var ITERATIONS = 12;
var TOLERANCE = 9; // decimal places


/* abstract base expression node */
function Expr() {}

_.extend(Expr.prototype, {

    // this node's immediate constructor
    func: abstract,

    // an array of the arguments to this node's immediate constructor
    args: abstract,

    // make a new node with the given arguments
    construct: function(args) {
        var instance = new this.func();
        this.func.apply(instance, args);
        return instance;
    },

    // an abstraction for chainable, bottom-up recursion
    recurse: function(method) {
        var passed = Array.prototype.slice.call(arguments, 1);
        var args = _.map(this.args(), function(arg) {
            return _.isString(arg) ? arg : arg[method].apply(arg, passed);
        });
        return this.construct(args);
    },

    // evaluate numerically with given variable mapping
    eval: abstract,

    codegen: abstract,

    compile: function() {
        var code = this.codegen();
        try {
            return new Function("vars", "return " + code + ";");
        } catch (e) {
            throw new Error("Function did not compile: " + code);
        }
    },

    // returns a string unambiguously representing the expression
    // should be valid as input
    // e.g. this.equals(parse(this.print())) === true
    print: abstract,

    // returns a TeX string representing the expression
    tex: abstract,

    // returns a TeX string, modified by the given options
    asTex: function(options) {

        options = options || {};
        _.defaults(options, {
            display: true,
            dynamic: true,
            times: false
        });

        var tex = this.tex();

        if (options.display) {
            tex = "\\displaystyle " + tex;
        }
        if (options.dynamic) {
            tex = tex.replace(/\(/g, "\\left(");
            tex = tex.replace(/\)/g, "\\right)");
        }
        if (options.times) {
            tex = tex.replace(/\\cdot/g, "\\times");
        }

        return tex;
    },

    // returns the name of this expression's constructor as a string
    // only used for testing and debugging (the ugly regex is for IE8)
    name: function() {
        if (this.func.name) {
            return this.func.name;
        } else {
            return this.func.toString().match(/^function\s*([^\s(]+)/)[1];
        }
    },

    // returns a string representing current node structure
    repr: function() {
        return this.name() + "(" + _.map(this.args(), function(arg) {
            return _.isString(arg) ? arg : arg.repr();
        }).join(",") + ")";
    },

    // removes all negative signs
    strip: function() { return this.recurse("strip"); },

    // canonically reorders all commutative elements
    normalize: function() { return this.recurse("normalize"); },

    // expands the expression
    expand: function() { return this.recurse("expand"); },

    // naively factors out like terms
    factor: function(options) { return this.recurse("factor", options); },

    // collect all like terms
    collect: function(options) { return this.recurse("collect", options); },

    // strict syntactic equality check
    equals: function(other) {
        return this.normalize().print() === other.normalize().print();
    },

    // expand and collect until the expression no longer changes
    simplify: function(options) {
        options = _.extend({
            once: false
        }, options);

        // Attempt to factor and collect
        var step1 = this.factor(options);
        var step2 = step1.collect(options);

        // Rollback if collect didn't do anything
        if (step1.equals(step2)) {
            step2 = this.collect(options);
        }

        // Attempt to expand and collect
        var step3 = step2.expand(options);
        var step4 = step3.collect(options);

        // Rollback if collect didn't do anything
        if (step3.equals(step4)) {
            step4 = step2.collect(options);
        }

        // One round of simplification complete
        var simplified = step4;

        if (options.once || this.equals(simplified)) {
            return simplified;
        } else {
            return simplified.simplify(options);
        }
    },

    // check whether this expression is simplified
    isSimplified: function() {
        return this.equals(this.simplify());
    },

    // return the child nodes of this node
    exprArgs: function() {
        return _.filter(this.args(), function(arg) {
            return arg instanceof Expr;
        });
    },

    // return the variables (function and non) within the expression
    getVars: function(excludeFunc) {
        return _.uniq(_.flatten(_.invoke(this.exprArgs(), "getVars", excludeFunc))).sort();
    },

    getConsts: function() {
        return _.uniq(_.flatten(_.invoke(this.exprArgs(), "getConsts"))).sort();
    },

    getUnits: function() {
        return _.flatten(_.invoke(this.exprArgs(), "getUnits"));
    },

    // check whether this expression node is of a particular type
    is: function(func) {
        return this instanceof func;
    },

    // check whether this expression has a particular node type
    has: function(func) {
        if (this instanceof func) {
            return true;
        }
        return _.any(this.exprArgs(), function(arg) { return arg.has(func); });
    },

    // raise this expression to a given exponent
    // most useful for eventually implementing i^3 = -i, etc.
    raiseToThe: function(exp) {
        return new Pow(this, exp);
    },

    // does this expression have a specific rendering hint?
    // rendering hints are picked up while parsing, but are lost during transformations
    isSubtract: function() { return false; },
    isDivide:  function() { return false; },
    isRoot:  function() { return false; },

    // whether this node needs an explicit multiplication sign if following a Num
    needsExplicitMul: function() {
        return this.args()[0].needsExplicitMul();
    },

    // check that the variables in both expressions are the same
    sameVars: function(other) {
        var vars1 = this.getVars();
        var vars2 = other.getVars();

        // the other Expr can have more variables than this one
        // this lets you multiply equations by other variables
        var same = function(array1, array2) {
            return !_.difference(array1, array2).length;
        };

        var lower = function(array) {
            return _.uniq(_.invoke(array, "toLowerCase")).sort();
        };

        var equal = same(vars1, vars2);
        var equalIgnoringCase = same(lower(vars1), lower(vars2));

        return {equal: equal, equalIgnoringCase: equalIgnoringCase};
    },

    // semantic equality check, call after sameVars() to avoid potential false positives
    // plug in random numbers for the variables in both expressions
    // if they both consistently evaluate the same, then they're the same
    compare: function(other) {
        // equation comparisons are handled by Eq.compare()
        if (other instanceof Eq) {
            return false;
        }

        var varList = _.union(
            this.getVars(/* excludeFunc */ true),
            other.getVars(/* excludeFunc */ true));

        // If the numbers are large we would like to do a relative comparison
        // rather than an absolute one, but if they're small enough then an
        // absolute comparison makes more sense
        var getDelta = function(num1, num2) {
            if (Math.abs(num1) < 1 || Math.abs(num2) < 1) {
                return Math.abs(num1 - num2);
            } else {
                return Math.abs(1 - num1 / num2);
            }
        };

        var equalNumbers = function(num1, num2) {
            var delta = getDelta(num1, num2);
            return ((num1 === num2) || /* needed if either is +/- Infinity */
                    (isNaN(num1) && isNaN(num2)) ||
                    (delta < Math.pow(10, -TOLERANCE)));
        };

        // if no variables, only need to evaluate once
        if (!varList.length && !this.has(Unit) && !other.has(Unit)) {
            return equalNumbers(this.eval(), other.eval());
        }

        // collect here to avoid sometimes dividing by zero, and sometimes not
        // it is better to be deterministic, e.g. x/x -> 1
        // TODO(alex): may want to keep track of assumptions as they're made
        var expr1 = this.collect();
        var expr2 = other.collect();

        var unitList1 = this.getUnits();
        var unitList2 = other.getUnits();
        if (!_.isEqual(unitList1, unitList2)) {
            return false;
        }

        // Compare at a set number (currently 12) of points to determine
        // equality.
        //
        // `range` (and `vars`) is the only variable that varies through the
        // iterations. For each of range = 10, 100, and 1000, each random
        // variable is picked from (-range, range).
        //
        // Note that because there are 12 iterations and three ranges, each
        // range is checked four times.
        for (var i = 0; i < ITERATIONS; i++) {

            var vars = {};

            // One third total iterations each with range 10, 100, and 1000
            var range = Math.pow(10, 1 + Math.floor(3 * i / ITERATIONS));

            // Half of the iterations should only use integer values.
            // This is because expressions like (-2)^x are common but result
            // in NaN when evaluated in JS with non-integer values of x.
            // Without this, (-2)^x and (-2)^(x+1) both end up always being NaN
            // and thus equivalent. With this, the most common failure case is
            // avoided. However, less common cases such as (-2)^(x+0.1) and
            // (-2)^(x+1.1) will still both evaluate to NaN and result in a
            // false positive.
            //
            // Note that the above is only true in vanilla JS Number-land,
            // which has no concept of complex numbers. The solution is simple:
            // Integrate a library for handling complex numbers.
            //
            // TODO(alex): Add support for complex numbers, then remove this.
            var useFloats = i % 2 === 0;

            _.each(varList, function(v) {
                vars[v] = useFloats ? randomFloat(-range, range)
                                    : _.random(-range, range);
            });

            var equal;
            if (expr1.has(Func) || expr2.has(Func) ||
                    expr1.has(Unit) || expr2.has(Unit)) {

                var result1 = expr1.partialEval(vars);
                var result2 = expr2.partialEval(vars);

                equal = result1.simplify().equals(result2.simplify());
            } else {
                var result1 = expr1.eval(vars);
                var result2 = expr2.eval(vars);

                equal = equalNumbers(result1, result2);
            }

            if (!equal) {
                return false;
            }
        }

        return true;
    },

    // evaluate as much of the expression as possible
    partialEval: function(vars) {
        if (this instanceof Unit) {
            return this;
        } else if (!this.has(Func)) {
            return new Float(this.eval(vars).toFixed(TOLERANCE)).collect();
        } else if (this instanceof Func) {
            return new Func(this.symbol, this.arg.partialEval(vars));
        } else {
            return this.recurse("partialEval", vars);
        }
    },

    // check that the structure of both expressions is the same
    // all negative signs are stripped and the expressions are converted to
    // a canonical commutative form
    // should only be done after compare() returns true to avoid false positives
    sameForm: function(other) {
        return this.strip().equals(other.strip());
    },

    // returns the GCD of this expression and the given factor
    findGCD: function(factor) {
        return this.equals(factor) ? factor : Num.One;
    },

    // return this expression's denominator
    getDenominator: function() {
        return Num.One;
    },

    // return this expression as a Mul
    asMul: function() {
        return new Mul(Num.One, this);
    },

    // TODO(alex): rename to isDefinitePositive or similar?
    // return whether this expression is 100% positive
    isPositive: abstract,

    // TODO(alex): rename to hasNegativeSign or similar?
    // return whether this expression has a negative sign
    isNegative: function() { return false; },

    // return a factor of this expression that is 100% positive
    asPositiveFactor: function() {
        return this.isPositive() ? this : Num.One;
    },

    // return a copy of the expression with a new hint set (preserves hints)
    addHint: function(hint) {
        if (!hint) {
            return this;
        }

        var expr = this.construct(this.args());
        expr.hints = _.clone(this.hints);
        expr.hints[hint] = true;
        return expr;
    },

    hints: {
        parens: false
    },

    // currently unused!
    asExpr: function() { return this; },

    // complete parse by performing a few necessary transformations
    completeParse: function() { return this.recurse("completeParse"); },

    abs: abstract,

    negate: function() {
        return new Mul(Num.Neg, this);
    }
});


/* abstract sequence node */
function Seq() {}
Seq.prototype = new Expr();

_.extend(Seq.prototype, {
    args: function() { return this.terms; },

    normalize: function() {
        var terms = _.sortBy(_.invoke(this.terms, "normalize"), function(term) {
            return term.print();
        });

        return new this.func(terms);
    },

    expand: function() {
        return this.recurse("expand").flatten();
    },

    // partition the sequence into its numeric and non-numeric parts
    // makes no guarantees about the validity of either part!
    partition: function() {
        var terms = _.groupBy(this.terms, function(term) {
            return term instanceof Num;
        });

        // XXX using a boolean as a key just converts it to a string. I don't
        // think this code was written with that in mind. Probably doesn't
        // matter except for readability.
        var numbers = terms[true] || [];
        var others = terms[false] || [];

        return [new this.func(numbers), new this.func(others)];
    },

    // ensure that sequences have 2+ terms and no nested sequences of the same type
    // this is a shallow flattening and will return a non-Seq if terms.length <= 1
    flatten: function() {
        var type = this;
        var terms = _.reject(this.terms, function(term) {
            return term.equals(type.identity);
        });

        if (terms.length === 0) {
            return type.identity;
        }
        if (terms.length === 1) {
            return terms[0];
        }

        var grouped = _.groupBy(terms, function(term) {
            return term instanceof type.func;
        });

        // same contains the children which are Seqs of the same type as this Seq
        var same = grouped[true] || [];
        var others = grouped[false] || [];

        var flattened = others.concat(_.flatten(_.pluck(same, "terms"), /* shallow: */ true));
        return new type.func(flattened);
    },

    // the identity associated with the sequence
    identity: undefined,

    // reduce a numeric sequence to a Num
    reduce: abstract,

    isPositive: function() {
        var terms = _.invoke(this.terms, "collect");
        return _.all(_.invoke(terms, "isPositive"));
    },

    // return a new Seq with a given term replaced by a different term
    // (or array of terms). given term can be passed directly, or by index
    // if no new term is provided, the old one is simply removed
    replace: function(oldTerm, newTerm) {
        var index;

        if (oldTerm instanceof Expr) {
            index = _.indexOf(this.terms, oldTerm);
        } else {
            index = oldTerm;
        }

        var newTerms = [];
        if (_.isArray(newTerm)) {
            newTerms = newTerm;
        } else if (newTerm) {
            newTerms = [newTerm];
        }

        var terms = this.terms.slice(0, index)
                    .concat(newTerms)
                    .concat(this.terms.slice(index + 1));

        return new this.func(terms);
    },

    // syntactic sugar for replace()
    remove: function(term) {
        return this.replace(term);
    },

    getDenominator: function() {
        // TODO(alex): find and return LCM
        return new Mul(_.invoke(this.terms, "getDenominator")).flatten();
    }
});


/* sequence of additive terms */
function Add() {
    if (arguments.length === 1) {
        this.terms = arguments[0];
    } else {
        this.terms = _.toArray(arguments);
    }
}
Add.prototype = new Seq();

_.extend(Add.prototype, {
    func: Add,

    eval: function(vars, options) {
        return _.reduce(this.terms, function(memo, term) { return memo + term.eval(vars, options); }, 0);
    },

    codegen: function() {
        return _.map(this.terms, function(term) {
            return "(" + term.codegen() + ")";
        }).join(" + ") || "0";
    },

    print: function() {
        return _.invoke(this.terms, "print").join("+");
    },

    tex: function() {
        var tex = "";

        _.each(this.terms, function(term) {
            if (!tex || term.isSubtract()) {
                tex += term.tex();
            } else {
                tex += "+" + term.tex();
            }
        });

        return tex;
    },

    collect: function(options) {
        var terms = _.invoke(this.terms, "collect", options);

        // [Expr expr, Num coefficient]
        var pairs = [];

        _.each(terms, function(term) {
            if (term instanceof Mul) {
                var muls = term.partition();
                pairs.push([muls[1].flatten(), muls[0].reduce(options)]);
            } else if (term instanceof Num) {
                pairs.push([Num.One, term]);
            } else {
                pairs.push([term, Num.One]);
            }
        });

        // { (Expr expr).print(): [[Expr expr, Num coefficient]] }
        var grouped = _.groupBy(pairs, function(pair) {
            return pair[0].normalize().print();
        });

        var collected = _.compact(_.map(grouped, function(pairs) {
            var expr = pairs[0][0];
            var sum = new Add(_.zip.apply(_, pairs)[1]);
            var coefficient = sum.reduce(options);
            return new Mul(coefficient, expr).collect(options);
        }));

        // TODO(alex): use the Pythagorean identity here
        // e.g. x*sin^2(y) + x*cos^2(y) -> x

        return new Add(collected).flatten();
    },

    // naively factor out anything that is common to all terms
    // if options.keepNegative is specified, won't factor out a common -1
    factor: function(options) {
        options = _.extend({
            keepNegative: false
        }, options);

        var terms = _.invoke(this.terms, "collect");
        var factors;

        if (terms[0] instanceof Mul) {
            factors = terms[0].terms;
        } else {
            factors = [terms[0]];
        }

        _.each(_.rest(this.terms), function(term) {
            factors = _.map(factors, function(factor) {
                return term.findGCD(factor);
            });
        });

        if (!options.keepNegative && this.isNegative()) {
            factors.push(Num.Neg);
        }

        factors = new Mul(factors).flatten().collect();

        var remainder = _.map(terms, function(term) {
            return Mul.handleDivide(term, factors).simplify();
        });
        remainder = new Add(remainder).flatten();

        return Mul.createOrAppend(factors, remainder).flatten();
    },

    reduce: function(options) {
        return _.reduce(this.terms, function(memo, term) {
            return memo.add(term, options);
        }, this.identity);
    },

    needsExplicitMul: function() { return false; },

    isNegative: function() {
        var terms = _.invoke(this.terms, "collect");
        return _.all(_.invoke(terms, "isNegative"));
    },

    negate: function() {
        return new Add(_.invoke(this.terms, "negate"));
    }
});


/* sequence of multiplicative terms */
function Mul() {
    if (arguments.length === 1) {
        this.terms = arguments[0];
    } else {
        this.terms = _.toArray(arguments);
    }
}
Mul.prototype = new Seq();

_.extend(Mul.prototype, {
    func: Mul,

    eval: function(vars, options) {
        return _.reduce(this.terms, function(memo, term) { return memo * term.eval(vars, options); }, 1);
    },

    codegen: function() {
        return _.map(this.terms, function(term) {
            return "(" + term.codegen() + ")";
        }).join(" * ") || "0";
    },

    print: function() {
        return _.map(this.terms, function(term) {
            return (term instanceof Add) ? "(" + term.print() + ")" : term.print();
        }).join("*");
    },

    getUnits: function() {
        var tmUnits = _(this.terms)
            .chain()
            .map(function(term) {
                return term.getUnits();
            })
            .flatten()
            .value();

        tmUnits.sort(function(a, b) {
            return a.unit < b.unit;
        });

        return tmUnits;
    },

    // since we don't care about commutativity, we can render a Mul any way we choose
    // so we follow convention: first any negatives, then any numbers, then everything else
    tex: function() {
        var cdot = " \\cdot ";

        var terms = _.groupBy(this.terms, function(term) {
            if (term.isDivide()) {
                return "inverse";
            } else if (term instanceof Num) {
                return "number";
            } else {
                return "other";
            }
        });

        var inverses = terms.inverse || [];
        var numbers = terms.number || [];
        var others = terms.other || [];

        var negatives = "";
        var numerator;

        // check all the numbers to see if there is a rational we can extract,
        // since we would like 1/2x/y to come out as \frac{1}{2}\frac{x}{y},
        // and not \frac{1x}{2y}.
        for (var i = 0; i < numbers.length; i++) {
            var isRational = numbers[i] instanceof Rational &&
                                !(numbers[i] instanceof Int);
            if (isRational && others.length > 0 && inverses.length > 0) {
                var withThisRemoved = numbers.slice();
                withThisRemoved.splice(i, 1);
                var newTerms = withThisRemoved.concat(inverses).concat(others);
                return numbers[i].tex() + new Mul(newTerms).tex();
            }
        }

        numbers = _.compact(_.map(numbers, function(term) {
            var hasDenom = (term instanceof Rational) && !(term instanceof Int);
            var shouldPushDown = !term.hints.fraction || inverses.length > 0;
            if (hasDenom && shouldPushDown) {
                // e.g. 3x/4 -> 3/4*x (internally) -> 3x/4 (rendered)
                inverses.push(new Pow(new Int(term.d), Num.Div));
                var number = new Int(term.n);
                number.hints = term.hints;
                return _.any(term.hints) ? number : null;
            } else {
                return term;
            }
        }));

        if (numbers.length === 0 && others.length === 1) {
            // e.g. (x+y)/z -> \frac{x+y}{z}
            numerator = others[0].tex();
        } else {
            var tex = "";

            _.each(numbers, function(term) {
                if (term.hints.subtract && term.hints.entered) {
                    negatives += "-";
                    tex += (tex ? cdot : "") + term.abs().tex();
                } else if ((term instanceof Int) && (term.n === -1) &&
                    (term.hints.negate || term.hints.subtract)) {
                    // e.g. -1*-1 -> --1
                    // e.g. -1*x -> -x
                    negatives += "-";
                } else {
                    // e.g. 2*3 -> 2(dot)3
                    tex += (tex ? cdot : "") + term.tex();
                }
            });

            _.each(others, function(term) {
                if (term.needsExplicitMul()) {
                    // e.g. 2*2^3 -> 2(dot)2^3
                    tex += (tex ? cdot : "") + term.tex();
                } else if (term instanceof Add) {
                    // e.g. (a+b)*c -> (a+b)c
                    tex += "(" + term.tex() + ")";
                } else {
                    // e.g. a*b*c -> abc
                    tex += term.tex();
                }
            });

            numerator = tex ? tex : "1";
        }

        if (!inverses.length) {
            return negatives + numerator;
        } else {
            var denominator = new Mul(_.invoke(inverses, "asDivide")).flatten().tex();
            return negatives + "\\frac{" + numerator + "}{" + denominator + "}";
        }
    },

    strip: function() {
        var terms = _.map(this.terms, function(term) {
            return term instanceof Num ? term.abs() : term.strip();
        });
        return new Mul(terms).flatten();
    },

    // expand numerator and denominator separately
    expand: function() {

        var isAdd = function(term) {
            return term instanceof Add;
        };

        var isInverse = function(term) {
            return term instanceof Pow && term.exp.isNegative();
        };

        var isInverseAdd = function(term) {
            return isInverse(term) && isAdd(term.base);
        };

        var mul = this.recurse("expand").flatten();

        var hasAdd = _.any(mul.terms, isAdd);
        var hasInverseAdd = _.any(mul.terms, isInverseAdd);

        if (!(hasAdd || hasInverseAdd)) {
            return mul;
        }

        var terms = _.groupBy(mul.terms, isInverse);
        var normals = terms[false] || [];
        var inverses = terms[true] || [];

        if (hasAdd) {
            var grouped = _.groupBy(normals, isAdd);
            var adds = grouped[true] || [];
            var others = grouped[false] || [];

            // loop over each additive sequence
            var expanded = _.reduce(adds, function(expanded, add) {
                // loop over each expanded array of terms
                return _.reduce(expanded, function(temp, array) {
                    // loop over each additive sequence's terms
                    return temp.concat(_.map(add.terms, function(term) {
                        return array.concat(term);
                    }));
                }, []);
            }, [[]]);

            // join each fully expanded array of factors with remaining multiplicative factors
            var muls = _.map(expanded, function(array) {
                return new Mul(others.concat(array)).flatten();
            });

            normals = [new Add(muls)];
        }

        if (hasInverseAdd) {
            var denominator = new Mul(_.invoke(inverses, "getDenominator")).flatten();
            inverses = [new Pow(denominator.expand(), Num.Div)];
        }

        return new Mul(normals.concat(inverses)).flatten();
    },

    factor: function(options) {
        var factored = this.recurse("factor", options).flatten();
        if (! (factored instanceof Mul)) {
            return factored;
        }

        // Combine any factored out Rationals into one, but don't collect
        var grouped = _.groupBy(factored.terms, function(term) {
            return term instanceof Rational;
        });

        // Could also accomplish this by passing a new option
        // e.g. return  memo.mul(term, {autocollect: false});
        // TODO(alex): Decide whether this is a good use of options or not
        var rational = _.reduce(grouped[true], function(memo, term) {
            return {n: memo.n * term.n, d: memo.d * term.d};
        }, {n: 1, d: 1});

        if (rational.d === 1) {
            rational = new Int(rational.n);
        } else {
            rational = new Rational(rational.n, rational.d);
        }

        return new Mul((grouped[false] || []).concat(rational)).flatten();
    },

    collect: function(options) {
        var partitioned = this.recurse("collect", options).partition();
        var number = partitioned[0].reduce(options);

        // e.g. 0*x -> 0
        if (number.eval() === 0) {
            return Num.Zero;
        }

        var others = partitioned[1].flatten();

        // e.g. 2*2 -> 4
        // e.g. 2*2*x -> 4*x
        if (!(others instanceof Mul)) {
            return new Mul(number, others).flatten();
        }

        others = others.terms;

        // [Expr base, Expr exp]
        var pairs = [];

        _.each(others, function(term) {
            if (term instanceof Pow) {
                pairs.push([term.base, term.exp]);
            } else {
                pairs.push([term, Num.One]);
            }
        });

        // {(Expr base).print(): [[Expr base, Expr exp]]}
        var grouped = _.groupBy(pairs, function(pair) {
            return pair[0].normalize().print();
        });

        // [[Expr base, Expr exp]]
        var summed = _.compact(_.map(grouped, function(pairs) {
            var base = pairs[0][0];
            var sum = new Add(_.zip.apply(_, pairs)[1]);
            var exp = sum.collect(options);

            if (exp instanceof Num && exp.eval() === 0) {
                return null;
            } else {
                return [base, exp];
            }
        }));

        // XXX `pairs` is shadowed four or five times in this function
        var pairs = _.groupBy(summed, function(pair) {
            if (pair[0] instanceof Trig && pair[0].isBasic()) {
                return "trig";
            } else if (pair[0] instanceof Log) {
                return "log";
            } else {
                return "expr";
            }
        });
        var trigs = pairs.trig || [];
        var logs = pairs.log || [];
        var exprs = pairs.expr || [];

        if (trigs.length > 1) {
            // combine sines and cosines into other trig functions

            // {Trig.arg.print(): [[Trig base, Expr exp]]}
            var byArg = _.groupBy(trigs, function(pair) {
                return pair[0].arg.normalize().print();
            });

            trigs = [];
            _.each(byArg, function(pairs) {
                var arg = pairs[0][0].arg;

                // {Trig.type: Expr exp}
                var funcs = {sin: Num.Zero, cos: Num.Zero};
                _.each(pairs, function(pair) {
                    funcs[pair[0].type] = pair[1];
                });

                if (Mul.handleNegative(funcs.sin).collect(options).equals(funcs.cos)) {
                    // e.g. sin^x(y)/cos^x(y) -> tan^x(y)
                    if (funcs.cos.isNegative()) {
                        funcs = {tan: funcs.sin};
                    } else {
                        funcs = {cot: funcs.cos};
                    }
                }

                // TODO(alex): combine even if exponents not a perfect match
                // TODO(alex): transform 1/sin and 1/cos into csc and sec

                _.each(funcs, function(exp, type) {
                    trigs.push([new Trig(type, arg), exp]);
                });
            });
        }

        if (logs.length > 1) {
            // combine logs with the same base

            // {Log.base.print(): [[Log base, Expr exp]]}
            var byBase = _.groupBy(logs, function(pair) {
                return pair[0].base.normalize().print();
            });

            logs = [];

            _.each(byBase, function(pairs) {
                // only combine two logs of the same base, otherwise commutative
                // differences result in different equally valid output
                // e.g. ln(x)/ln(z)*ln(y) -> log_z(x)*ln(y)
                // e.g. ln(x)*ln(y)/ln(z) -> ln(x)*log_z(y)
                if (pairs.length === 2 &&
                    Mul.handleNegative(pairs[0][1]).collect(options).equals(pairs[1][1])) {
                    // e.g. ln(x)^y/ln(b)^y -> log_b(x)^y
                    if (pairs[0][1].isNegative()) {
                        logs.push([new Log(pairs[0][0].power, pairs[1][0].power), pairs[1][1]]);
                    } else {
                        logs.push([new Log(pairs[1][0].power, pairs[0][0].power), pairs[0][1]]);
                    }
                } else {
                    logs = logs.concat(pairs);
                }
            });

            // TODO(alex): combine if all inverses are the same e.g. ln(y)*ln(z)/ln(x)/ln(x)
        }

        pairs = trigs.concat(logs).concat(exprs);

        var collected = _.map(pairs, function(pair) {
            return new Pow(pair[0], pair[1]).collect(options);
        });

        return new Mul([number].concat(collected)).flatten();
    },

    isSubtract: function() {
        return _.any(this.terms, function(term) {
            return term instanceof Num && term.hints.subtract;
        });
    },

    // factor a single -1 in to the Mul
    // combine with a Num if all Nums are positive, else add as a term
    factorIn: function(hint) {
        var partitioned = this.partition();
        var numbers = partitioned[0].terms;
        var fold = numbers.length && _.all(numbers, function(num) {
            return num.n > 0;
        });

        if (fold) {
            // e.g. - x*2*3 -> x*-2*3
            var num = numbers[0].negate();
            num.hints = numbers[0].hints;
            return this.replace(numbers[0], num.addHint(hint));
        } else {
            // e.g. - x*y -> -1*x*y
            // e.g. - x*-2 -> -1*x*-2
            return new Mul([Num.negativeOne(hint)].concat(this.terms));
        }
    },

    // factor out a single hinted -1 (assume it is the division hint)
    // TODO(alex): make more general or rename to be more specific
    factorOut: function() {
        var factored = false;
        var terms = _.compact(_.map(this.terms, function(term, i, list) {
            if (!factored && term instanceof Num && term.hints.divide) {
                factored = true;
                return term.n !== -1 ? term.negate() : null;
            } else {
                return term;
            }
        }));

        if (terms.length === 1) {
            return terms[0];
        } else {
            return new Mul(terms);
        }
    },

    reduce: function(options) {
        return _.reduce(this.terms, function(memo, term) {
            return memo.mul(term, options);
        }, this.identity);
    },

    findGCD: function(factor) {
        return new Mul(_.invoke(this.terms, "findGCD", factor)).flatten();
    },

    asMul: function() {
        return this;
    },

    asPositiveFactor: function() {
        if (this.isPositive()) {
            return this;
        } else {
            var terms = _.invoke(this.collect().terms, "asPositiveFactor");
            return new Mul(terms).flatten();
        }
    },

    isNegative: function() {
        return _.any(_.invoke(this.collect().terms, "isNegative"));
    },

    fold: function() {
        return Mul.fold(this);
    },

    negate: function() {
        var isNum = function(expr) { return expr instanceof Num; };
        if (_.any(this.terms, isNum)) {
            var num = _.find(this.terms, isNum);
            return this.replace(num, num.negate());
        } else {
            return new Mul([Num.Neg].concat(this.terms));
        }
    }
});

// static methods for the sequence types
_.each([Add, Mul], function(type) {
    _.extend(type, {
        // create a new sequence unless left is already one (returns a copy)
        createOrAppend: function(left, right) {
            if (left instanceof type) {
                return new type(left.terms.concat(right));
            } else {
                return new type(left, right);
            }
        }
    });
});

_.extend(Mul, {
    // negative signs should be folded into numbers whenever possible
    // never fold into a Num that's already negative or a Mul that has a negative Num
    // an optional hint is kept track of to properly render user input
    // an empty hint means negation
    handleNegative: function(expr, hint) {
        if (expr instanceof Num && expr.n > 0) {
            // e.g. - 2 -> -2
            var negated = expr.negate();
            // TODO(alex): rework hint system so that this isn't necessary
            negated.hints = expr.hints;
            return negated.addHint(hint);
        } else if (expr instanceof Mul) {
            // e.g. - x*2*3 -> x*-2*3
            // e.g. - x*y -> -1*x*y
            // e.g. - x*-2 -> -1*x*-2
            return expr.factorIn(hint);
        } else {
            // e.g. - x -> -1*x
            return new Mul(Num.negativeOne(hint), expr);
        }
    },

    // division can create either a Rational or a Mul
    handleDivide: function(left, right) {

        // dividing by a Mul is the same as repeated division by its terms
        if (right instanceof Mul) {
            var first = Mul.handleDivide(left, right.terms[0]);
            var rest = new Mul(_.rest(right.terms)).flatten();
            return Mul.handleDivide(first, rest);
        }

        var isInt = function(expr) { return expr instanceof Int; };
        var isRational = function(expr) { return expr instanceof Rational; };

        // for simplification purposes, fold Ints into Rationals if possible
        // e.g. 3x / 4 -> 3/4 * x (will still render as 3x/4)
        if (isInt(right) && left instanceof Mul && _.any(left.terms, isInt)) {

            // search from the right
            var reversed = left.terms.slice().reverse();
            var num = _.find(reversed, isRational);

            if (!isInt(num)) {
                return new Mul(left.terms.concat([new Rational(1, right.n).addHint("fraction")]));
            }

            var rational = new Rational(num.n, right.n);
            rational.hints = num.hints;

            // in the case of something like 1/3 * 6/8, we want the
            // 6/8 to be considered a fraction, not just a division
            if (num === reversed[0]) {
                rational = rational.addHint("fraction");
            }

            var result;
            if (num.n < 0 && right.n < 0) {
                rational.d = -rational.d;
                return left.replace(num, [Num.Neg, rational]);
            } else {
                return left.replace(num, rational);
            }
        }

        var divide = function(a, b) {
            if (b instanceof Int) {
                if (a instanceof Int) {
                    if (a.n < 0 && b.n < 0) {
                        // e.g. -2 / -3 -> -1*-2/3
                        return [Num.Neg, new Rational(a.n, -b.n).addHint("fraction")];
                    } else {
                        // e.g. 2 / 3 -> 2/3
                        // e.g. -2 / 3 -> -2/3
                        // e.g. 2 / -3 -> -2/3
                        return [new Rational(a.n, b.n).addHint("fraction")];
                    }
                } else {
                    // e.g. x / 3 -> x*1/3
                    // e.g. x / -3 -> x*-1/3
                    var inverse = new Rational(1, b.eval());
                    if (b.eval() < 0) {
                        return [a, inverse.addHint("negate")];
                    } else {
                        return [a, inverse];
                    }
                }
            } else {
                var pow;

                if (b instanceof Trig && b.exp) {
                    // e.g. sin^2(x) -> sin(x)^2
                    var exp = b.exp;
                    b.exp = undefined;
                    b = new Pow(b, exp);
                }

                if (b instanceof Pow) {
                    // e.g. (x^2) ^ -1 -> x^-2
                    // e.g. (x^y) ^ -1 -> x^(-1*y)
                    // e.g. (x^(yz)) ^ -1 -> x^(-1*y*z)
                    pow = new Pow(b.base, Mul.handleNegative(b.exp, "divide"));
                } else {
                    // e.g. x ^ -1 -> x^-1
                    pow = new Pow(b, Num.Div);
                }

                if (a instanceof Int && a.n === 1) {
                    // e.g. 1 / x -> x^-1
                    return [pow];
                } else {
                    // e.g. 2 / x -> 2*x^-1
                    return [a, pow];
                }
            }
        };

        if (left instanceof Mul) {
            var divided = divide(_.last(left.terms), right);
            return new Mul(_.initial(left.terms).concat(divided));
        } else {
            var divided = divide(left, right);
            return new Mul(divided).flatten();
        }
    },

    // fold negative signs into numbers if possible
    // negative signs are not the same as multiplying by negative one!
    // e.g. -x      ->  -1*x    simplified
    // e.g. -2*x    ->  -2*x    simplified
    // e.g. -x*2    ->  -1*x*2  not simplified -> x*-2 simplified
    // e.g. -1*x*2  ->  -1*x*2  not simplified

    // also fold multiplicative terms into open Trig and Log nodes
    // e.g. (sin x)*x -> sin(x)*x
    // e.g. sin(x)*x -> sin(x)*x
    // e.g. sin(x)*(x) -> sin(x)*x
    // e.g. sin(x)*sin(y) -> sin(x)*sin(y)
    fold: function(expr) {
        if (expr instanceof Mul) {
            // assuming that this will be second to last
            var trigLog = _.find(_.initial(expr.terms), function(term) {
                return (term instanceof Trig || term instanceof Log) && term.hints.open;
            });
            var index = _.indexOf(expr.terms, trigLog);

            if (trigLog) {
                var last = _.last(expr.terms);
                if (trigLog.hints.parens || last.hints.parens ||
                          last.has(Trig) || last.has(Log)) {
                    trigLog.hints.open = false;
                } else {
                    var newTrigLog;
                    if (trigLog instanceof Trig) {
                        newTrigLog = Trig.create([trigLog.type, trigLog.exp], Mul.createOrAppend(trigLog.arg, last).fold());
                    } else {
                        newTrigLog = Log.create(trigLog.base, Mul.createOrAppend(trigLog.power, last).fold());
                    }

                    if (index === 0) {
                        return newTrigLog;
                    } else {
                        return new Mul(expr.terms.slice(0, index).concat(newTrigLog)).fold();
                    }
                }
            }

            var partitioned = expr.partition();
            var numbers = partitioned[0].terms;

            var pos = function(num) { return num.n > 0; };
            var neg = function(num) { return num.n === -1 && num.hints.negate; };
            var posOrNeg = function(num) { return pos(num) || neg(num); };

            if (numbers.length > 1 &&
                _.some(numbers, neg) &&
                _.some(numbers, pos) &&
                _.every(numbers, posOrNeg)) {

                var firstNeg = _.indexOf(expr.terms, _.find(expr.terms, neg));
                var firstNum = _.indexOf(expr.terms, _.find(expr.terms, pos));

                // e.g. -x*2 -> x*-2
                if (firstNeg < firstNum) {
                    return expr.replace(firstNum,
                                        expr.terms[firstNum].negate())
                               .remove(firstNeg);
                }
            }
        }

        // in all other cases, make no change
        return expr;
    }
});


/* exponentiation */
function Pow(base, exp) { this.base = base; this.exp = exp; }
Pow.prototype = new Expr();

_.extend(Pow.prototype, {
    func: Pow,
    args: function() { return [this.base, this.exp]; },

    eval: function(vars, options) {
        var evaledBase = this.base.eval(vars, options);
        var evaledExp = this.exp.eval(vars, options);

        // Math.pow unequivocally returns NaN when provided with both a
        // negative base and a fractional exponent. However, in some cases, we
        // know that our exponent is actually valid for use with negative
        // bases (e.g., (-5)^(1/3)).
        //
        // Here, we explicitly check for such cases. We really only handle a
        // limited subset (by requiring that the exponent is rational with an
        // odd denominator), but it's still useful.
        //   See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
        if (evaledBase < 0) {
            var simplifiedExp = this.exp.simplify();

            // If Float, convert to a Rational to enable the logic below
            if (simplifiedExp instanceof Float) {
                var num = simplifiedExp.n;
                var decimals = (num - num.toFixed()).toString().length - 2;
                var denominator = Math.pow(10, decimals);
                var rationalExp = new Rational(num * denominator, denominator);
                simplifiedExp = rationalExp.simplify();
            }
            if (simplifiedExp instanceof Rational) {
                var oddDenominator = Math.abs(simplifiedExp.d) % 2 === 1;
                if (oddDenominator) {
                    var oddNumerator = Math.abs(simplifiedExp.n) % 2 === 1;
                    var sign = (oddNumerator) ? -1 : 1;
                    return sign * Math.pow(-1 * evaledBase, evaledExp);
                }
            }
        }
        return Math.pow(evaledBase, evaledExp);
    },

    getUnits: function() {
        return this.base.getUnits().map(function(unit) {
            return {
                unit: unit.unit,
                pow: unit.pow * this.exp.n
            };
        }.bind(this));
    },

    codegen: function() {
        return "Math.pow(" + this.base.codegen() +
            ", " + this.exp.codegen() + ")";
    },

    print: function() {
        var base = this.base.print();
        if (this.base instanceof Seq || this.base instanceof Pow) {
            base = "(" + base + ")";
        }
        return base + "^(" + this.exp.print() + ")";
    },

    tex: function() {
        if (this.isDivide()) {

            // e.g. x ^ -1 w/hint -> 1/x
            return "\\frac{1}{" + this.asDivide().tex() + "}";

        } else if (this.isRoot()) {

            if (this.exp.n !== 1) {
                error("Node marked with hint 'root' does not have exponent " +
                      "of form 1/x.");
            }

            if (this.exp.d === 2) {
                // e.g. x ^ 1/2 w/hint -> sqrt{x}
                return "\\sqrt{" + this.base.tex() + "}";
            } else {
                // e.g. x ^ 1/y w/hint -> sqrt[y]{x}
                return "\\sqrt[" + this.exp.d + "]{" + this.base.tex() + "}";
            }

        } else if (this.base instanceof Trig && !this.base.isInverse() &&
            this.exp instanceof Num && this.exp.isSimple() &&
            this.exp.eval() >= 0) {

            // e.g sin(x) ^ 2 -> sin^2(x)
            var split = this.base.tex({split: true});
            return split[0] + "^{" + this.exp.tex() + "}" + split[1];

        } else {

            // e.g. x ^ y -> x^y
            var base = this.base.tex();
            if (this.base instanceof Seq || this.base instanceof Pow ||
                (this.base instanceof Num && !this.base.isSimple())) {
                // e.g. a+b ^ c -> (a+b)^c
                base = "(" + base + ")";
            } else if (this.base instanceof Trig || this.base instanceof Log) {
                // e.g. ln(x) ^ 2 -> [ln(x)]^2
                base = "[" + base + "]";
            }
            return base + "^{" + this.exp.tex() + "}";
        }
    },

    needsExplicitMul: function() {
        return this.isRoot() ? false : this.base.needsExplicitMul();
    },

    expand: function() {
        var pow = this.recurse("expand");

        if (pow.base instanceof Mul) {
            // e.g. (ab)^c -> a^c*b^c

            var terms = _.map(pow.base.terms, function(term) {
                return new Pow(term, pow.exp);
            });

            return new Mul(terms).expand();

        } else if (pow.base instanceof Add && pow.exp instanceof Int && pow.exp.abs().eval() > 1) {
            // e.g. (a+b)^2 -> a*a+a*b+a*b+b*b
            // e.g. (a+b)^-2 -> (a*a+a*b+a*b+b*b)^-1

            var positive = pow.exp.eval() > 0;
            var n = pow.exp.abs().eval();

            var signed = function(mul) {
                return positive ? mul : new Pow(mul, Num.Div);
            };

            // compute and cache powers of 2 up to n
            var cache = { 1: pow.base };
            for (var i = 2; i <= n; i *= 2) {
                var mul = new Mul(cache[i / 2], cache[i / 2]);
                cache[i] = mul.expand().collect();
            }

            // if n is a power of 2, you're done!
            if (_.has(cache, n)) {
                return signed(cache[n]);
            }

            // otherwise decompose n into powers of 2 ...
            var indices = _.map(n.toString(2).split(""), function(str, i, list) {
                return Number(str) * Math.pow(2, list.length - i - 1);
            });
            indices = _.without(indices, 0);

            // ... then combine
            var mul = new Mul(_.pick(cache, indices)).expand().collect();
            return signed(mul);

        } else if (pow.exp instanceof Add) { // DEFINITELY want behind super-simplify() flag
            // e.g. x^(a+b) -> x^a*x^b

            var terms = _.map(pow.exp.terms, function(term) {
                return new Pow(pow.base, term).expand();
            });

            return new Mul(terms).expand();
        } else {
            return pow;
        }
    },

    factor: function() {
        var pow = this.recurse("factor");
        if (pow.base instanceof Mul) {
            var terms = _.map(pow.base.terms, function(term) {
                if (term instanceof Int && pow.exp.equals(Num.Div)) {
                    // Anything that can be a Rational should be a Rational
                    // e.g. 2^(-1) -> 1/2
                    return new Rational(1, term.n);
                } else {
                    return new Pow(term, pow.exp);
                }
            });
            return new Mul(terms);
        } else {
            return pow;
        }
    },

    collect: function(options) {

        if (this.base instanceof Pow) {
            // collect this first to avoid having to deal with float precision
            // e.g. sqrt(2)^2 -> 2, not 2.0000000000000004
            // e.g. (x^y)^z -> x^(yz)
            var base = this.base.base;
            var exp = Mul.createOrAppend(this.base.exp, this.exp);
            return new Pow(base, exp).collect(options);
        }

        var pow = this.recurse("collect", options);

        var isSimilarLog = function(term) {
            return term instanceof Log && term.base.equals(pow.base);
        };

        if (pow.exp instanceof Num &&
            pow.exp.eval() === 0) {

            // e.g. x^0 -> 1
            return Num.One;

        } else if (pow.exp instanceof Num &&
            pow.exp.eval() === 1) {

            // e.g. x^1 -> x
            return pow.base;

        } else if (isSimilarLog(pow.exp)) {

            // e.g. b^(log_b(x)) -> x
            return pow.exp.power;

        } else if (pow.exp instanceof Mul &&
            _.any(pow.exp.terms, isSimilarLog)) {

            // e.g. b^(2*y*log_b(x)) -> x^(2*y)
            var log = _.find(pow.exp.terms, isSimilarLog);
            var base = log.power;
            var exp = pow.exp.remove(log).flatten();
            return new Pow(base, exp).collect(options);

        } else if (pow.base instanceof Num &&
            pow.exp instanceof Num) {

            // TODO(alex): Consider encapsualting this logic (and similar logic
            // elsewhere) into a separate Decimal class for user-entered floats
            if (options && options.preciseFloats) {
                // Avoid creating an imprecise float
                // e.g. 23^1.5 -> 12167^0.5, not ~110.304

                // If you take the root as specified by the denominator and
                // end up with more digits after the decimal point,
                // the result is imprecise. This works for rationals as well
                // as floats, but ideally rationals should be pre-processed
                // e.g. (1/27)^(1/3) -> 1/3 to avoid most cases.
                // TODO(alex): Catch such cases and avoid converting to floats.
                var exp = pow.exp.asRational();
                var decimalsInBase = pow.base.getDecimalPlaces();
                var root = new Pow(pow.base, new Rational(1, exp.d));
                var decimalsInRoot = root.collect().getDecimalPlaces();

                if (decimalsInRoot > decimalsInBase) {
                    // Collecting over this denominator would result in an
                    // imprecise float, so avoid doing so.
                    var newBase = new Pow(pow.base, new Int(exp.n)).collect();
                    return new Pow(newBase, new Rational(1, exp.d));
                }
            }

            // e.g. 4^1.5 -> 8
            return pow.base.raiseToThe(pow.exp, options);
        } else {
            return pow;
        }
    },

    // checks whether this Pow represents user-entered division
    isDivide: function() {
        var isDiv = function(arg) { return arg instanceof Num && arg.hints.divide; };
        return isDiv(this.exp) || (this.exp instanceof Mul && _.any(this.exp.terms, isDiv));
    },

    // assuming this Pow represents user-entered division, returns the denominator
    asDivide: function() {
        if (this.exp instanceof Num) {
            if (this.exp.eval() === -1) {
                return this.base;
            } else {
                var negated = this.exp.negate();
                negated.hints = _.clone(this.exp.hints);
                negated.hints.divide = false;
                return new Pow(this.base, negated);
            }
        } else if (this.exp instanceof Mul) {
            return new Pow(this.base, this.exp.factorOut());
        } else {
            error("called asDivide() on an Expr that wasn't a Num or Mul");
        }
    },

    isRoot: function() {
        return this.exp instanceof Rational && this.exp.hints.root;
    },

    isSquaredTrig: function() {
        return this.base instanceof Trig && !this.base.isInverse() &&
            this.exp instanceof Num && this.exp.eval() === 2;
    },

    // extract whatever denominator makes sense, ignoring hints
    // if negative exponent, will recursively include the base's denominator as well
    getDenominator: function() {
        if (this.exp instanceof Num && this.exp.eval() === -1) {
            return Mul.createOrAppend(this.base, this.base.getDenominator()).flatten();
        } else if (this.exp.isNegative()) {
            var pow = new Pow(this.base, Mul.handleNegative(this.exp).collect());
            return Mul.createOrAppend(pow, pow.collect().getDenominator()).flatten();
        } else if (this.base instanceof Num) {
            return new Pow(this.base.getDenominator(), this.exp).collect();
        } else {
            return Num.One;
        }
    },

    findGCD: function(factor) {
        var base, exp;
        if (factor instanceof Pow) {
            base = factor.base;
            exp = factor.exp;
        } else {
            base = factor;
            exp = Num.One;
        }

        // GCD is only relevant if same base
        if (this.base.equals(base)) {
            if (this.exp.equals(exp)) {
                // exact match
                // e.g. GCD(x^y^z, x^y^z) -> x^y^z
                return this;
            } else if (this.exp instanceof Num && exp instanceof Num) {
                // two numerical exponents
                // e.g. GCD(x^3, x^2) -> x^2
                return new Pow(this.base, Num.min(this.exp, exp)).collect();
            } else if (this.exp instanceof Num || exp instanceof Num) {
                // one numerical exponent
                // e.g. GCD(x^2, x^y) -> 1
                return Num.One;
            }

            var expA = this.exp.asMul().partition();
            var expB = exp.asMul().partition();

            if (expA[1].equals(expB[1])) {
                // exponents match except for coefficient
                // e.g. GCD(x^3y, x^y) -> x^y
                var coefficient = Num.min(expA[0].reduce(), expB[0].reduce());
                var mul = new Mul(coefficient, expA[1].flatten()).flatten();
                return new Pow(base, mul).collect();
            }
        }

        return Num.One;
    },

    isPositive: function() {
        if (this.base.isPositive()) {
            return true;
        }

        var exp = this.exp.simplify();
        return exp instanceof Int && exp.eval() % 2 === 0;
    },

    asPositiveFactor: function() {
        if (this.isPositive()) {
            return this;
        } else {
            var exp = this.exp.simplify();
            if (exp instanceof Int) {
                var n = exp.eval();
                if (n > 2) {
                    // e.g. x^3 -> x^2
                    return new Pow(this.base, new Int(n-1));
                } else if (n < -2) {
                    // e.g. x^-3 -> x^-2
                    return new Pow(this.base, new Int(n+1));
                }
            }
            return Num.One;
        }
    }
});

_.extend(Pow, {
    sqrt: function(arg) {
        return new Pow(arg, Num.Sqrt);
    },

    nthroot: function(radicand, degree) {
        var exp = Mul.fold(Mul.handleDivide(new Int(1), degree));

        // FIXME(johnsullivan): If oneOverDegree ends up being a pow object,
        //     this "root" hint is lost between here and when tex() is called.
        return new Pow(radicand, exp.addHint("root"));
    },
});


/* logarithm */
function Log(base, power) { this.base = base; this.power = power; }
Log.prototype = new Expr();

_.extend(Log.prototype, {
    func: Log,
    args: function() { return [this.base, this.power]; },

    eval: function(vars, options) {
        return Math.log(this.power.eval(vars, options)) / Math.log(this.base.eval(vars, options));
    },

    codegen: function() {
        return "(Math.log(" + this.power.codegen() +
            ") / Math.log(" + this.base.codegen() + "))";
    },

    print: function() {
        var power = "(" + this.power.print() + ")";
        if (this.isNatural()) {
            return "ln" + power;
        } else {
            return "log_(" + this.base.print() + ") " + power;
        }
    },

    tex: function() {
        var power = "(" + this.power.tex() + ")";
        if (this.isNatural()) {
            return "\\ln" + power;
        } else {
            return "\\log_{" + this.base.tex() + "}" + power;
        }
    },

    collect: function(options) {
        var log = this.recurse("collect", options);

        if (log.power instanceof Num && log.power.eval() === 1) {

            // e.g. ln(1) -> 0
            return Num.Zero;

        } else if (log.base.equals(log.power)) {

            // e.g. log_b(b) -> 1
            return Num.One;

        } else if (log.power instanceof Pow &&
            log.power.base.equals(log.base)) {

            // e.g. log_b(b^x) -> x
            return log.power.exp;
        } else {
            return log;
        }
    },

    expand: function() {
        var log = this.recurse("expand");

        if (log.power instanceof Mul) {  // might want behind super-simplify() flag
            // e.g. ln(xy) -> ln(x) + ln(y)

            var terms = _.map(log.power.terms, function(term) {
                // need to expand again in case new log powers are Pows
                return new Log(log.base, term).expand();
            });

            return new Add(terms);

        } else if (log.power instanceof Pow) {
            // e.g. ln(x^y) -> y*ln(x)

            return new Mul(log.power.exp, new Log(log.base, log.power.base).expand()).flatten();
        } else if (!log.isNatural()) {
            // e.g. log_b(x) -> ln(x)/ln(b)

            return Mul.handleDivide(new Log(Const.e, log.power), new Log(Const.e, log.base));
        } else {
            return log;
        }
    },

    hints: _.extend(Log.prototype.hints, {
        open: false
    }),

    isPositive: function() {
        var log = this.collect();

        if (log.base instanceof Num &&
            log.power instanceof Num) {
            return this.eval() > 0;
        } else {
            return false;
        }
    },

    needsExplicitMul: function() { return false; },

    isNatural: function() { return this.base.equals(Const.e); }
});

_.extend(Log, {
    natural: function() { return Const.e; },
    common: function() { return Num.Ten; },

    create: function(base, power) {
        var log = new Log(base, power);
        if (!power.hints.parens) {
            log = log.addHint("open");
        }
        return log;
    }
});


/* trigonometric functions */
function Trig(type, arg) { this.type = type; this.arg = arg; }
Trig.prototype = new Expr();

_.extend(Trig.prototype, {
    func: Trig,
    args: function() { return [this.type, this.arg]; },

    functions: {
        sin: {
            eval: Math.sin,
            codegen: "Math.sin((",
            tex: "\\sin",
            expand: function() { return this; }
        },
        cos: {
            eval: Math.cos,
            codegen: "Math.cos((",
            tex: "\\cos",
            expand: function() { return this; }
        },
        tan: {
            eval: Math.tan,
            codegen: "Math.tan((",
            tex: "\\tan",
            expand: function() {
                return Mul.handleDivide(Trig.sin(this.arg), Trig.cos(this.arg));
            }
        },
        csc: {
            eval: function(arg) { return 1 / Math.sin(arg); },
            codegen: "(1/Math.sin(",
            tex: "\\csc",
            expand: function() {
                return Mul.handleDivide(Num.One, Trig.sin(this.arg));
            }
        },
        sec: {
            eval: function(arg) { return 1 / Math.cos(arg); },
            codegen: "(1/Math.cos(",
            tex: "\\sec",
            expand: function() {
                return Mul.handleDivide(Num.One, Trig.cos(this.arg));
            }
        },
        cot: {
            eval: function(arg) { return 1 / Math.tan(arg); },
            codegen: "(1/Math.tan(",
            tex: "\\cot",
            expand: function() {
                return Mul.handleDivide(Trig.cos(this.arg), Trig.sin(this.arg));
            }
        },
        arcsin: {
            eval: Math.asin,
            codegen: "Math.asin((",
            tex: "\\arcsin"
        },
        arccos: {
            eval: Math.acos,
            codegen: "Math.acos((",
            tex: "\\arccos"
        },
        arctan: {
            eval: Math.atan,
            codegen: "Math.atan((",
            tex: "\\arctan"
        },
        arccsc: {
            eval: function(arg) { return Math.asin(1 / arg); },
            codegen: "Math.asin(1/(",
            tex: "\\operatorname{arccsc}"
        },
        arcsec: {
            eval: function(arg) { return Math.acos(1 / arg); },
            codegen: "Math.acos(1/(",
            tex: "\\operatorname{arcsec}"
        },
        arccot: {
            eval: function(arg) { return Math.atan(1 / arg); },
            codegen: "Math.atan(1/(",
            tex: "\\operatorname{arccot}"
        },
        sinh: {
            eval: function(arg) {
                return (Math.exp(arg) - Math.exp(-arg)) / 2;
            },
            codegen: function(argStr) {
                return "((Math.exp(" + argStr + ") - Math.exp(-(" + argStr + "))) / 2)";
            },
            tex: "\\sinh",
            expand: function() { return this; }
        },
        cosh: {
            eval: function(arg) {
                return (Math.exp(arg) + Math.exp(-arg)) / 2;
            },
            codegen: function(argStr) {
                return "((Math.exp(" + argStr + ") + Math.exp(-(" + argStr + "))) / 2)";
            },
            tex: "\\cosh",
            expand: function() { return this; }
        },
        tanh: {
            eval: function(arg) {
                return (Math.exp(arg) - Math.exp(-arg)) / (Math.exp(arg) + Math.exp(-arg));
            },
            codegen: function(argStr) {
                return "(" +
                    "(Math.exp(" + argStr + ") - Math.exp(-(" + argStr + ")))" +
                    " / " +
                    "(Math.exp(" + argStr + ") + Math.exp(-(" + argStr + ")))" +
                    ")";
            },
            tex: "\\tanh",
            expand: function() {
                return Mul.handleDivide(Trig.sinh(this.arg), Trig.cosh(this.arg));
            }
        },
        csch: {
            eval: function(arg) { return 2 / (Math.exp(arg) - Math.exp(-arg)); },
            codegen: function(argStr) {
                return "(2 / (Math.exp(" + argStr + ") - Math.exp(-(" + argStr + "))))";
            },
            tex: "\\csch",
            expand: function() {
                return Mul.handleDivide(Num.One, Trig.sinh(this.arg));
            }
        },
        sech: {
            eval: function(arg) { return 2 / (Math.exp(arg) + Math.exp(-arg)); },
            codegen: function(argStr) {
                return "(2 / (Math.exp(" + argStr + ") + Math.exp(-(" + argStr + "))))";
            },
            tex: "\\sech",
            expand: function() {
                return Mul.handleDivide(Num.One, Trig.cosh(this.arg));
            }
        },
        coth: {
            eval: function(arg) {
                return (Math.exp(arg) + Math.exp(-arg)) / (Math.exp(arg) - Math.exp(-arg));
            },
            codegen: function(argStr) {
                return "(" +
                    "(Math.exp(" + argStr + ") + Math.exp(-(" + argStr + ")))" +
                    " / " +
                    "(Math.exp(" + argStr + ") - Math.exp(-(" + argStr + ")))" +
                    ")";
            },
            tex: "\\coth",
            expand: function() {
                return Mul.handleDivide(Trig.cosh(this.arg), Trig.sinh(this.arg));
            }
        },
    },

    isEven: function() {
        return _.contains(["cos", "sec"], this.type);
    },

    isInverse: function() {
        return this.type.indexOf("arc") === 0;
    },

    isBasic: function() {
        return _.contains(["sin", "cos"], this.type);
    },

    eval: function(vars, options) {
        var func = this.functions[this.type].eval;
        var arg = this.arg.eval(vars, options);
        return func(arg);
    },

    codegen: function() {
        var func = this.functions[this.type].codegen;
        if (typeof func === "function") {
            return func(this.arg.codegen());
        } else if (typeof func === "string") {
            return func + this.arg.codegen() + "))";
        } else {
            throw new Error("codegen not implemented for " + this.type);
        }
    },

    print: function() {
        return this.type + "(" + this.arg.print() + ")";
    },

    tex: function(options) {
        var func = this.functions[this.type].tex;
        var arg = "(" + this.arg.tex() + ")";
        return (options && options.split) ? [func, arg] : func + arg;
    },

    hints: _.extend(Trig.prototype.hints, {
        open: false
    }),

    isPositive: function() {
        var trig = this.collect();

        if (trig.arg instanceof Num) {
            return this.eval() > 0;
        } else {
            return false;
        }
    },

    completeParse: function() {
        if (this.exp) {
            var pow = new Pow(this, this.exp);
            this.exp = undefined;
            return pow;
        } else {
            return this;
        }
    },

    // TODO(alex): does every new node type need to redefine these?
    needsExplicitMul: function() { return false; },

    expand: function() {
        var trig = this.recurse("expand");
        if (!trig.isInverse()) {
            // e.g. tan(x) -> sin(x)/cos(x)
            var expand = trig.functions[trig.type].expand;
            return _.bind(expand, trig)();
        } else {
            return trig;
        }
    },

    collect: function(options) {
        var trig = this.recurse("collect", options);
        if (!trig.isInverse() && trig.arg.isNegative()) {
            var arg;
            if (trig.arg instanceof Num) {
                arg = trig.arg.abs();
            } else {
                arg = Mul.handleDivide(trig.arg, Num.Neg).collect(options);
            }

            if (trig.isEven()) {
                // e.g. cos(-x) -> cos(x)
                return new Trig(trig.type, arg);

            } else {
                // e.g. sin(-x) -> -sin(x)
                return new Mul(Num.Neg, new Trig(trig.type, arg));
            }
        } else {
            return trig;
        }
    }
});

_.extend(Trig, {
    create: function(pair, arg) {
        var type = pair[0];
        var exp = pair[1];

        if (exp && exp.equals(Num.Neg)) {
            // e.g. sin^-1(x) -> arcsin(x)
            type = "arc" + type;
            exp = undefined;
        }

        var trig = new Trig(type, arg);
        if (!arg.hints.parens) {
            trig = trig.addHint("open");
        }

        if (exp) {
            trig.exp = exp;
        }

        return trig;
    },

    sin: function(arg) {
        return new Trig("sin", arg);
    },

    cos: function(arg) {
        return new Trig("cos", arg);
    },

    sinh: function(arg) {
        return new Trig("sinh", arg);
    },

    cosh: function(arg) {
        return new Trig("cosh", arg);
    }
});


function Abs(arg) { this.arg = arg; }
Abs.prototype = new Expr();

_.extend(Abs.prototype, {
    func: Abs,
    args: function() { return [this.arg]; },
    eval: function(vars, options) { return Math.abs(this.arg.eval(vars, options)); },
    codegen: function() { return "Math.abs(" + this.arg.codegen() + ")"; },
    print: function() { return "abs(" + this.arg.print() + ")"; },

    tex: function() {
        return "\\left|" + this.arg.tex() + "\\right|";
    },

    collect: function(options) {
        var abs = this.recurse("collect", options);

        if (abs.arg.isPositive()) {
            // e.g. |2^x| -> 2^x
            return abs.arg;
        } else if (abs.arg instanceof Num) {
            // e.g. |-2| -> 2
            return abs.arg.abs();
        } else if (abs.arg instanceof Mul) {
            // e.g. |-2*pi*x| -> 2*pi*|x|
            var terms = _.groupBy(abs.arg.terms, function(term) {
                if (term.isPositive()) {
                    return "positive";
                } else if (term instanceof Num) {
                    return "number";
                } else {
                    return "other";
                }
            });

            var positives = terms.positive.concat(_.invoke(terms.number, "abs"));

            if (terms.other.length) {
                positives.push(new Abs(new Mul(terms.other).flatten()));
            }

            return new Mul(positives).flatten();
        } else {
            return abs;
        }
    },

    // this should definitely be behind a super-simplify flag
    expand: function() {
        var abs = this.recurse("expand");

        if (abs.arg instanceof Mul) {
            // e.g. |xyz| -> |x|*|y|*|z|
            var terms = _.map(abs.arg.terms, function(term) {
                return new Abs(term);
            });
            return new Mul(terms);
        } else {
            return abs;
        }
    },

    isPositive: function() { return true; }
});


/* equation */
function Eq(left, type, right) {
    this.left = left;
    this.type = type;
    this.right = right;
}
Eq.prototype = new Expr();

_.extend(Eq.prototype, {
    func: Eq,
    args: function() { return [this.left, this.type, this.right]; },

    needsExplicitMul: function() { return false; },

    print: function() {
        return this.left.print() + this.type + this.right.print();
    },

    signs: {
        "=": " = ",
        "<": " < ",
        ">": " > ",
        "<>": " \\ne ",
        "<=": " \\le ",
        ">=": " \\ge "
    },

    tex: function() {
        return this.left.tex() + this.signs[this.type] + this.right.tex();
    },

    normalize: function() {
        var eq = this.recurse("normalize");

        if (_.contains([">", ">="], eq.type)) {
            // inequalities should have the smaller side on the left
            return new Eq(eq.right, eq.type.replace(">", "<"), eq.left);
        } else {
            return eq;
        }
    },

    // convert this equation to an expression set to zero
    // the expression is normalized to a canonical form
    // e.g. y/2=x/4 -> y/2-x/4(=0) -> 2y-x(=0)
    // unless unfactored is specified, will then divide through
    asExpr: function(unfactored) {
        var isZero = function(expr) {
            return expr instanceof Num && expr.isSimple() && expr.eval() === 0;
        };

        // first convert to a sequence of additive terms
        var terms = [];

        if (this.left instanceof Add) {
            terms = _.clone(this.left.terms);
        } else if (!isZero(this.left)) {
            terms = [this.left];
        }

        if (this.right instanceof Add) {
            terms = terms.concat(this.right.negate().terms);
        } else if (!isZero(this.right)) {
            terms.push(this.right.negate());
        }

        var isInequality = !this.isEquality();

        // Collect over each term individually to transform simple expressions
        // into numbers that might have denominators, taking into account
        // float precision. We have to be very careful to not introduce any
        // irrational floats before asExpr() returns, because by definition
        // they do not have exact denominators...
        terms = _.invoke(terms, "collect", {preciseFloats: true});

        // ...and we multiply through by every denominator.
        for (var i = 0; i < terms.length; i++) {
            var denominator = terms[i].getDenominator();

            // Can't multiply inequalities by non 100% positive factors
            if (isInequality && !denominator.isPositive()) {
                denominator = denominator.asPositiveFactor();
            }

            if (!denominator.equals(Num.One)) {
                terms = _.map(terms, function(term) {
                    return Mul.createOrAppend(term, denominator).simplify({
                        once: true,
                        preciseFloats: true
                    });
                });
            }
        }

        var add = new Add(terms).flatten();
        return unfactored ? add : this.divideThrough(add);
    },

    // divide through by every common factor in the expression
    // e.g. 2y-4x(=0) -> y-2x(=0)
    // TODO(alex): Make it an option to only divide by variables/expressions
    // guaranteed to be nonzero
    divideThrough: function(expr) {
        var isInequality = !this.isEquality();

        var simplified = expr.simplify({once: true});
        var factored = simplified.factor({keepNegative: isInequality});

        if (!(factored instanceof Mul)) {
            return expr;
        }

        var terms = factored.terms;

        var isAdd = function(term) { return term instanceof Add; };
        var hasVar = function(term) { return !!term.getVars().length; };
        var isOne = function(term) { return term.equals(Num.One); };

        var grouped = _.groupBy(terms, isAdd);
        var adds = grouped[true] || [];
        var others = grouped[false] || [];

        if (adds.length && this.isEquality()) {
            // keep only Adds
            // e.g. 2xy(z+1)(=0) -> z+1(=0)
            return new Mul(adds).flatten();
        }

        var denominator = others;

        if (!adds.length) {
            // if no Adds, keep all variable terms to preserve meaning
            // e.g. 42xyz(=0) -> xyz(=0)
            denominator = _.reject(denominator, hasVar);
        }

        if (isInequality) {
            // can't divide inequalities by non 100% positive factors
            // e.g. 42x^2y(z+1)(=0) -> y(z+1)(=0)
            denominator = _.invoke(denominator, "asPositiveFactor");
        }

        // don't need to divide by one
        denominator = _.reject(denominator, isOne);

        denominator = _.map(denominator, function(term) {
            return new Pow(term, Num.Div);
        });

        var dividedResult = new Mul(terms.concat(denominator)).collect();

        // If the end result is the same as the original factoring,
        // rollback the factoring and discard all intermediate steps.
        if (dividedResult.equals(factored)) {
            return simplified;
        } else {
            return dividedResult;
        }
    },

    isEquality: function() {
        return _.contains(["=", "<>"], this.type);
    },

    compare: function(other) {
        // expression comparisons are handled by Expr.compare()
        if (!(other instanceof Eq)) {
            return false;
        }

        var eq1 = this.normalize();
        var eq2 = other.normalize();

        if (eq1.type !== eq2.type) {
            return false;
        }

        // need to collect to properly factor out common factors
        // e.g x+2x=6 -> 3x=6 -> 3x-6(=0) -> x-2(=0)
        var expr1 = eq1.divideThrough(eq1.asExpr(/* unfactored */ true).collect());
        var expr2 = eq2.divideThrough(eq2.asExpr(/* unfactored */ true).collect());

        if (eq1.isEquality()) {
            // equals and not-equals can be subtracted either way
            return expr1.compare(expr2) ||
                   expr1.compare(Mul.handleNegative(expr2));
        } else {
            return expr1.compare(expr2);
        }
    },

    // should only be done after compare() returns true to avoid false positives
    sameForm: function(other) {
        var eq1 = this.normalize();
        var eq2 = other.normalize();

        var same = eq1.left.sameForm(eq2.left) && eq1.right.sameForm(eq2.right);

        if (eq1.isEquality()) {
            // equals and not-equals can be commutative with respect to the sign
            return same || (eq1.left.sameForm(eq2.right) && eq1.right.sameForm(eq2.left));
        } else {
            return same;
        }
    },

    // we don't want to override collect because it would turn y=x into y-x(=0)
    // instead, we ask if the equation was in that form, would it be simplified?
    isSimplified: function() {
        var expr = this.asExpr(/* unfactored */ true);
        var simplified = this.divideThrough(expr).simplify();
        return expr.equals(simplified) &&
               this.left.isSimplified() &&
               this.right.isSimplified();
    }
});

_.extend(Eq.prototype, {
    // Assumptions: Expression is of the form a+bx, and we solve for x
    solveLinearEquationForVariable: function(variable) {
        var expr = this.asExpr();
        if (!expr.is(Add) || expr.terms.length !== 2) {
            throw new Error("Can only handle linear equations of the form " +
                            "a + bx (= 0)");
        }

        var hasVar = function(term) {
            return term.has(Var) && _.contains(term.getVars(), variable.symbol);
        };

        var a, b;

        if (hasVar(expr.terms[0])) {
            a = Mul.handleNegative(expr.terms[1]);
            b = Mul.handleDivide(expr.terms[0], variable);
        } else {
            a = Mul.handleNegative(expr.terms[0]);
            b = Mul.handleDivide(expr.terms[1], variable);
        }

        return Mul.handleDivide(a, b).simplify();
    }
});


/* abstract symbol node */
function Symbol() {}
Symbol.prototype = new Expr();

_.extend(Symbol.prototype, {

    needsExplicitMul: function() { return false; },

    findGCD: function(factor) {
        if (factor instanceof Symbol || factor instanceof Num) {
            return this.equals(factor) ? this : Num.One;
        } else {
            return factor.findGCD(this);
        }
    }
});


/* function variable */
function Func(symbol, arg) {
    this.symbol = symbol; this.arg = arg;
}
Func.prototype = new Symbol();

_.extend(Func.prototype, {
    func: Func,
    args: function() { return [this.symbol, this.arg]; },

    print: function() {
        return this.symbol + "(" + this.arg.print() + ")";
    },

    tex: function() {
        return this.symbol + "(" + this.arg.tex() + ")";
    },

    eval: function(vars, options) {
        var arg = this.arg;
        var func = vars[this.symbol];
        var newVars = _.extend(_.clone(vars), {
            x: arg.eval(vars, options)
        });
        var parsedFunc = KAS.parse(func, options);
        if (parsedFunc.parsed) {
            return parsedFunc.expr.eval(newVars, options);
        }
        // If parsedFunc isn't actually parsed, return its error
        return parsedFunc;
    },

    codegen: function() {
        return 'vars["' + this.symbol + '"](' +
            this.arg.codegen() + ')';
    },

    getUnits: function() {
        return this.arg.getUnits();
    },

    getVars: function(excludeFunc) {
        if (excludeFunc) {
            return this.arg.getVars();
        } else {
            return _.union(this.arg.getVars(), [this.symbol]).sort();
        }
    },

    getConsts: function() {
        return this.arg.getConsts();
    },
});


/* variable */
function Var(symbol, subscript) {
    this.symbol = symbol;
    this.subscript = subscript;
}
Var.prototype = new Symbol();

_.extend(Var.prototype, {
    func: Var,
    args: function() { return [this.symbol, this.subscript]; },

    exprArgs: function() { return []; },
    recurse: function() { return this; },

    print: function() {
        var sub = "";
        if (this.subscript) {
            sub = "_(" + this.subscript.print() + ")";
        }
        return this.symbol + sub;
    },

    // Provide a way to easily evalate expressions with the common case,
    // subscripts that consist of a single number or symbol e.g. x_a or x_42
    prettyPrint: function() {
        var sub = this.subscript;
        if (sub && (sub instanceof Num || sub instanceof Symbol)) {
            return this.symbol + "_" + sub.print();
        } else {
            return this.print();
        }
    },

    tex: function() {
        var sub = "";
        if (this.subscript) {
            sub = "_{" + this.subscript.tex() + "}";
        }
        var prefix = this.symbol.length > 1 ? "\\" : "";
        return prefix + this.symbol + sub;
    },

    repr: function() { return "Var(" + this.print() + ")"; },

    eval: function(vars, options) {
        return vars[this.prettyPrint()];
    },

    codegen: function() {
        return 'vars["' + this.prettyPrint() + '"]';
    },

    getVars: function() { return [this.prettyPrint()]; },

    isPositive: function() { return false; }
});


/* constant */
function Const(symbol) { this.symbol = symbol; }
Const.prototype = new Symbol();

_.extend(Const.prototype, {
    func: Const,
    args: function() { return [this.symbol]; },
    recurse: function() { return this; },

    eval: function(vars, options) {
        if (this.symbol === "pi") {
            return Math.PI;
        } else if (this.symbol === "e") {
            return Math.E;
        }
    },

    codegen: function() {
        if (this.symbol === "pi") {
            return "Math.PI";
        } else if (this.symbol === "e") {
            return "Math.E";
        }
    },

    print: function() { return this.symbol; },

    tex: function() {
        if (this.symbol === "pi") {
            return "\\pi ";
        } else if (this.symbol === "e") {
            return "e";
        }
    },

    isPositive: function() {
        return this.eval() > 0;
    },

    abs: function() {
        if (this.eval() > 0) {
            return this;
        } else {
            return Mul.handleNegative(this);
        }
    },

    getConsts: function() {
        return [this.print()];
    },
});

Const.e = new Const("e");
Const.pi = new Const("pi");


/* abstract number node */
function Num() {}
Num.prototype = new Expr();

_.extend(Num.prototype, {
    repr: function() { return this.print(); },
    strip: function() { return this.abs(); },
    recurse: function() { return this; },
    codegen: function() { return this.print(); },

    // takes another Num and returns a new Num
    add: abstract,
    mul: abstract,

    // returns this Num's additive inverse
    negate: abstract,

    isSubtract: function() { return this.hints.subtract; },

    // return the absolute value of the number
    abs: abstract,

    needsExplicitMul: function() { return true; },

    findGCD: abstract,

    isPositive: function() {
        return this.eval() > 0;
    },

    isNegative: function() {
        return this.eval() < 0;
    },

    asPositiveFactor: function() {
        return this.isPositive() ? this : this.abs();
    },

    // hints for interpreting and rendering user input
    hints: _.extend(Num.prototype.hints, {
        negate: false,
        subtract: false,
        divide: false,
        root: false,
        fraction: false,
        entered: false
    }),

    // whether a number is considered simple (one term)
    // e.g. for reals, ints and floats are simple
    isSimple: abstract,

    // Based on http://stackoverflow.com/a/10454560/2571482
    getDecimalPlaces: function() {
        var match = ("" + this.n).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (match) {
            return Math.max(
                0,
                // Number of digits right of decimal point
                (match[1] ? match[1].length : 0) -
                // Adjust for scientific notation
                (match[2] ? +match[2] : 0)
            );
        } else {
            return 0;
        }
    },

    asRational: abstract
});


/* rational number (n: numerator, d: denominator) */
function Rational(numerator, denominator) {
    var n = numerator; var d = denominator;
    if (d < 0) {
        n = -n; d = -d;
    }
    this.n = n; this.d = d;
}
Rational.prototype = new Num();

_.extend(Rational.prototype, {
    func: Rational,
    args: function() { return [this.n, this.d]; },
    eval: function() { return this.n / this.d; },

    print: function() {
        return this.n.toString() + "/" + this.d.toString();
    },

    tex: function() {
        var tex = "\\frac{" + Math.abs(this.n).toString() + "}{" + this.d.toString() + "}";
        return this.n < 0 ? "-" + tex : tex;
    },

    add: function(num, options) {
        if (num instanceof Rational) {
            return new Rational(this.n * num.d + this.d * num.n, this.d * num.d).collect();
        } else {
            return num.add(this, options);
        }
    },

    mul: function(num, options) {
        if (num instanceof Rational) {
            return new Rational(this.n * num.n, this.d * num.d).collect();
        } else {
            return num.mul(this, options);
        }
    },

    collect: function() {
        var gcd = Num.findGCD(this.n, this.d);

        var n = this.n / gcd;
        var d = this.d / gcd;

        if (d === 1) {
            return new Int(n);
        } else {
            return new Rational(n, d);
        }
    },

    negate: function() {
        return new Rational(-this.n, this.d);
    },

    abs: function() {
        return new Rational(Math.abs(this.n), this.d);
    },

    findGCD: function(factor) {
        // Attempt to factor out common numerators and denominators to return
        // a Rational instead of a Float
        if (factor instanceof Rational) {
            // For more background, see
            // http://math.stackexchange.com/questions/151081/gcd-of-rationals
            var numerator = Num.findGCD(this.n * factor.d, factor.n * this.d);
            var denominator = this.d * factor.d;
            // Create the rational, then call .collect() to simplify it
            return new Rational(numerator, denominator).collect();
        } else if (factor instanceof Int) {
            return new Rational(Num.findGCD(this.n, factor.n), this.d);
        } else {
            return factor.findGCD(this);
        }
    },

    // for now, assuming that exp is a Num
    raiseToThe: function(exp) {
        if (exp instanceof Int) {
            var positive = exp.eval() > 0;
            var abs = exp.abs().eval();
            var n = Math.pow(this.n, abs);
            var d = Math.pow(this.d, abs);
            if (positive) {
                return new Rational(n, d).collect();
            } else {
                return new Rational(d, n).collect();
            }
        } else {
            return new Float(this.eval()).raiseToThe(exp);
        }
    },

    getDenominator: function() {
        return new Int(this.d);
    },

    isSimple: function() { return false; },

    asRational: function() { return this; }
});


/* integer (n: numerator/number) */
function Int(number) { this.n = number; }
Int.prototype = new Rational(0, 1);

_.extend(Int.prototype, {
    func: Int,
    args: function() { return [this.n]; },
    print: function() { return this.n.toString(); },
    tex: function() { return this.n.toString(); },
    negate: function() { return new Int(-this.n); },
    abs: function() { return new Int(Math.abs(this.n)); },
    isSimple: function() { return true; },
    findGCD: function(factor) {
        if (factor instanceof Int) {
            return new Int(Num.findGCD(this.n, factor.n));
        } else {
            return factor.findGCD(this);
        }
    }
});

_.extend(Int, {
    create: function(n) { return new Int(n).addHint("entered"); }
});

/* float (n: number) */
function Float(number) { this.n = number; }
Float.prototype = new Num();

_.extend(Float.prototype, {
    func: Float,
    args: function() { return [this.n]; },
    eval: function() { return this.n; },

    // TODO(alex): when we internationalize number parsing/display
    // we should make sure to use the appropriate decimal mark here
    print: function() { return this.n.toString(); },
    tex: function() { return this.n.toString(); },

    add: function(num, options) {
        if (options && options.preciseFloats) {
            return Float.toDecimalPlaces(
                this.n + num.eval(),
                Math.max(this.getDecimalPlaces(), num.getDecimalPlaces())
            );
        } else {
            return new Float(this.n + num.eval()).collect();
        }
    },

    mul: function(num, options) {
        if (options && options.preciseFloats) {
            return Float.toDecimalPlaces(
                this.n * num.eval(),
                this.getDecimalPlaces() + num.getDecimalPlaces()
            );
        } else {
            return new Float(this.n * num.eval()).collect();
        }
    },

    collect: function() {
        // We used to simplify Floats to Ints here whenever possible, but no
        // longer do so in order to preserve significant figures.
        return this;
    },

    negate: function() { return new Float(-this.n); },
    abs: function() { return new Float(Math.abs(this.n)); },

    findGCD: function(factor) {
        if (factor instanceof Num) {
            return new Float(Num.findGCD(this.eval(), factor.eval())).collect();
        } else {
            return factor.findGCD(this);
        }
    },

    // for now, assuming that exp is a Num
    raiseToThe: function(exp, options) {
        if (options && options.preciseFloats &&
                exp instanceof Int && exp.n > 1) {
            return Float.toDecimalPlaces(
                new Pow(this, exp).eval(),
                this.getDecimalPlaces() * exp.n
            );
        } else {
            return new Float(new Pow(this, exp).eval()).collect();
        }
    },

    // only to be used on non-repeating decimals (e.g. user-provided)
    asRational: function() {
        var parts = this.n.toString().split(".");
        if (parts.length === 1) {
            return new Rational(this.n, 1);
        } else {
            var numerator = Number(parts.join(""));
            var denominator = Math.pow(10, parts[1].length);
            return new Rational(numerator, denominator).collect();
        }
    },

    getDenominator: function() {
        return this.asRational().getDenominator();
    },

    isSimple: function() { return true; }
});

_.extend(Float, {
    create: function(n) { return new Float(n).addHint("entered"); },

    // Account for floating point imprecision by explicitly controlling the
    // number of decimal places in common operations (e.g. +, *, ^)
    toDecimalPlaces: function(n, places) {
        return new Float(+n.toFixed(Math.min(places, 20))).collect();
    }
});

// static methods and fields that are best defined on Num
_.extend(Num, {
    negativeOne: function(hint) {
        if (hint === "subtract") {
            return Num.Sub;
        } else if (hint === "divide") {
            return Num.Div;
        } else {
            return Num.Neg;
        }
    },

    // find the greatest common denominator
    findGCD: function(a, b) {
        var mod;

        a = Math.abs(a);
        b = Math.abs(b);

        // Euclid's method doesn't handle non-integers very well. For now
        // we just say we can't pull out a common factor. It might be
        // reasonable to do better than this in the future.
        if (a !== Math.floor(a) || b !== Math.floor(b)) {
            return 1;
        }

        while (b) {
            mod = a % b;
            a = b;
            b = mod;
        }

        return a;
    },

    min: function() {
        return _.min(_.toArray(arguments), function(num) {
            return num.eval();
        });
    },

    max: function() {
        return _.max(_.toArray(arguments), function(num) {
            return num.eval();
        });
    }
});

Num.Neg = new Int(-1).addHint("negate");
Num.Sub = new Int(-1).addHint("subtract");
Num.Div = new Int(-1).addHint("divide");

Num.Sqrt = new Rational(1, 2).addHint("root");

Num.Zero = new Int(0);
Num.One = new Int(1);
Num.Ten = new Int(10);


// set identities here
Add.prototype.identity = Num.Zero;
Mul.prototype.identity = Num.One;


var parser = KAS.parser;

var parseError = function(str, hash) {
    // return int location of parsing error
    throw new Error(hash.loc.first_column);
};

// expose concrete nodes to parser scope
// see http://zaach.github.io/jison/docs/#sharing-scope
parser.yy = {
    Add: Add,
    Mul: Mul,
    Pow: Pow,
    Log: Log,
    Trig: Trig,
    Eq: Eq,
    Abs: Abs,
    Func: Func,
    Const: Const,
    Var: Var,
    Int: Int,
    Float: Float,
    parseError: parseError,

    constants: ["e"],
    symbolLexer: function(symbol) {
        if (_.contains(parser.yy.constants, symbol)) {
            return "CONST";
        } else if (_.contains(parser.yy.functions, symbol)) {
            return "FUNC";
        } else {
            return "VAR";
        }
    }
};

KAS.parse = function(input, options) {
    try {
        if (options && options.functions) {
            // reserve the symbol "i" for complex numbers
            parser.yy.functions = _.without(options.functions, "i");
        } else {
            parser.yy.functions = [];
        }

        // If ',' is the decimal dividor in your country, replace any ','s
        // with '.'s.
        // This isn't perfect, since the output will all still have '.'s.
        // TODO(jack): Fix the output to have ','s in this case
        if (options && options.decimal_separator) {
            input = input.split(options.decimal_separator).join(".");
        }

        var expr = parser.parse(input).completeParse();
        return { parsed: true, expr: expr };
    } catch (e) {
        return { parsed: false, error: e.message };
    }
};

/* unit */
function Unit(symbol) {
    this.symbol = symbol;
}
Unit.prototype = new Symbol();

// If possible, replace unit prefixes with a multiplication.
//
// "g" -> Unit("g")
// "kg" -> 1000 * Unit("g")
var unprefixify = function(symbol) {
    if (_(baseUnits).has(symbol) || _(derivedUnits).has(symbol)) {
        return new Unit(symbol);
    }

    // check for prefix
    var prefix = _(_(siPrefixes).keys()).find(function(testPrefix) {
        return new RegExp("^" + testPrefix).test(symbol);
    });

    if (prefix) {
        var base = symbol.replace(new RegExp("^" + prefix), "");

        // It's okay to be here if either:
        // * `base` is a base unit (the seven units listed in baseUnits)
        // * `base` is a derived unit which allows prefixes
        //
        // Otherwise, we're trying to parse a unit label which is not
        // allowed (mwk, mBTU, etc).
        if (_(baseUnits).has(base) ||
            (derivedUnits[base] &&
             derivedUnits[base].prefixes === hasPrefixes)) {

            return new Mul(siPrefixes[prefix], new Unit(base));
        } else {
            throw new Error(base + " does not allow prefixes");
        }
    } else {
        return new Unit(symbol);
    }
};

KAS.unitParse = function(input) {
    try {
        var parseResult = KAS.unitParser.parse(input);

        // parseResult looks like:
        // {
        //   magnitude: "5",
        //   unit: {
        //     num: [
        //       { name: "s", pow: 2 }
        //     ],
        //     denom: [
        //       { name: "kg", pow: 1 }
        //     ]
        //   }
        // }
        //
        // denom is optionally null

        var unitArray = [];

        _(parseResult.unit.num).each(function(unitSpec) {
            unitArray.push(
                new Pow(unprefixify(unitSpec.name), new Int(unitSpec.pow))
            );
        });

        _(parseResult.unit.denom).each(function(unitSpec) {
            unitArray.push(
                new Pow(unprefixify(unitSpec.name), new Int(-1 * unitSpec.pow))
            );
        });

        var unit = new Mul(unitArray).flatten();

        if (parseResult.type === "unitMagnitude") {
            // in the first case we have a magnitude coefficient as well as the
            // unit itself.
            var coefArray =
                [new Float(+parseResult.magnitude)].concat(unitArray);
            var expr = new Mul(coefArray);
            return {
                parsed: true,
                unit: unit,
                expr: expr,
                coefficient: parseResult.magnitude,
                type: parseResult.type
            };
        } else {

            // in the second case it's just the unit with no magnitude.
            return {
                parsed: true,
                unit: unit,
                type: parseResult.type,
            };
        }
    } catch (e) {
        return { parsed: false, error: e.message };
    }
};

_.extend(Unit.prototype, {
    func: Unit,
    args: function() { return [this.symbol]; },
    recurse: function() { return this; },

    eval: function(vars, options) {
        // This is called when comparing units. A unit doesn't affect the
        // numerical value of its coefficient, so this needs to be 1.
        //
        // On the other hand, things must not evaluate to the same thing if
        // they don't have the same type. I believe that's also true - form is
        // checked before numerical equivalence. I do not know where, though.
        // However, there are a couple tests checking this.
        return 1;
    },

    getUnits: function() { return [{ unit: this.symbol, pow: 1 }]; },

    codegen: function() { return "1"; },

    print: function() { return this.symbol; },

    tex: function() { return this.symbol; },

    // Simplify units by replacing prefixes with multiplication
    collect: function(options) {
        if (_(baseUnits).has(this.symbol)) {
            return this;
        } else if (_(derivedUnits).has(this.symbol)) {
            return derivedUnits[this.symbol].conversion;
        } else {
            throw new Error("could not understand unit: " + this.symbol);
        }
    },
});

var baseUnits = {
    m: new Unit("m"),
    // Note: kg is the SI base unit but we use g for consistency
    g: new Unit("g"),
    s: new Unit("s"),
    A: new Unit("A"),
    K: new Unit("K"),
    mol: new Unit("mol"),
    cd: new Unit("cd"),
};

var siPrefixes = {
    a: new Pow(new Int(10), new Int(-18)),
    f: new Pow(new Int(10), new Int(-15)),
    p: new Pow(new Int(10), new Int(-12)),
    n: new Pow(new Int(10), new Int(-9)),
    u: new Pow(new Int(10), new Int(-6)),
    m: new Pow(new Int(10), new Int(-3)),
    c: new Pow(new Int(10), new Int(-2)),
    d: new Pow(new Int(10), new Int(-1)),
    da: new Int(10),
    h: new Pow(new Int(10), new Int(2)),
    k: new Pow(new Int(10), new Int(3)),
    M: new Pow(new Int(10), new Int(6)),
    G: new Pow(new Int(10), new Int(9)),
    T: new Pow(new Int(10), new Int(12)),
    P: new Pow(new Int(10), new Int(15)),
    E: new Pow(new Int(10), new Int(18)),
    // http://en.wikipedia.org/wiki/Metric_prefix#.22Hella.22_prefix_proposal
    hella: new Pow(new Int(10), new Int(27)),
};

// Use these two values to mark a unit as either SI-prefixable or not.
var hasPrefixes = {};
var hasntPrefixes = {};

var makeAlias = function(str, prefixes) {
    var splits = str.split("|");
    var coefficientStr = splits[0].trim();
    var unitsStr = splits[1].trim();

    var coefficient = Num.One;
    if (coefficientStr !== "") {
        coefficient = KAS.parse(coefficientStr).expr;
    }

    var numdenomStr = unitsStr.split("/");
    var numdenom = [coefficient];

    if (numdenomStr[0]) {
        numdenomStr[0]
            .split(" ")
            .filter(function(x) {
                return x !== "";
            }).map(function(x) {
                numdenom.push(new Unit(x));
            });
    }

    if (numdenomStr[1]) {
        numdenomStr[1]
            .split(" ")
            .filter(function(x) {
                return x !== "";
            }).map(function(x) {
                numdenom.push(new Pow(new Unit(x), Num.Div));
            });
    }

    return {
        conversion: new Mul(numdenom),
        prefixes: prefixes,
    };
};

// This is a mapping of derived units (or different names for a unit) to their
// definitions. For example, an inch is defined as 0.0254 m.
//
// Definitions don't need to be in terms of base units. For example, tsp is
// defined in terms of tbsp (which is defined in terms of cup -> gal -> L ->
// m^3). However, units must get simpler. I.e. there's no loop checking.
//
// makeAlias takes two parameters:
// * a string specifying the simplification to perform
//   - a required pipe separates the constant factor from the base units
//   - the constant factor is parsed by KAS
//   - the base units are in a simple format which disallows exponents and
//     requires multiplicands to be space-separated ("m m" rather than "m^2)
//     with an optional "/" separating numerator and denominator
//   - prefixes are not allowed to be used in the converted to units
//     (note that this restriction, the format of the string, and the choice to
//     use a string in the first place are made out of laziness to minimize
//     both typing and parsing)
// * a boolean specifying whether or not it's acceptable to use SI units
//
// Where possible, these units are taken from "The International System of
// Units (SI)" 8th edition (2006).
var derivedUnits = {
    // mass
    // The atomic mass unit / dalton.
    Da: makeAlias("1.6605388628 x 10^-24 | g", hasPrefixes),
    u: makeAlias("| Da", hasntPrefixes),

    // length
    "meter": makeAlias("| m", hasntPrefixes),
    "meters": makeAlias("| m", hasntPrefixes),
    "in": makeAlias("254 / 10000 | m", hasntPrefixes),
    "ft": makeAlias("3048  / 10000 | m", hasntPrefixes),
    "yd": makeAlias("9144  / 10000 | m", hasntPrefixes),
    "mi": makeAlias("1609344 / 1000 | m", hasntPrefixes),
    "ly": makeAlias("9.4607 x 10^15 | m", hasntPrefixes),
    "nmi": makeAlias("1852 | m", hasntPrefixes),
    "Å": makeAlias("10^-10 | m", hasntPrefixes),
    "pc": makeAlias("3.0857 x 10^16 | m", hasntPrefixes),

    // time
    "min": makeAlias("60 | s", hasntPrefixes),
    "hr": makeAlias("3600 | s", hasntPrefixes),
    "sec": makeAlias("| s", hasntPrefixes),
    // TODO(joel) make day work
    "day": makeAlias("86400 | s", hasntPrefixes),
    "wk": makeAlias("604800 | s", hasntPrefixes),
    "fortnight": makeAlias("14 | day", hasntPrefixes),
    "shake": makeAlias("10^-8 | s", hasntPrefixes),
    "olympiad": makeAlias("126200000 | s", hasntPrefixes),

    // temperature
    "°C": makeAlias("1 | K", hasntPrefixes),
    "°F": makeAlias("5/9 | K", hasntPrefixes),
    "°R": makeAlias("5/9 | K", hasntPrefixes),

    // electric charge
    "e": makeAlias("1.6021765314 x 10^-19 | C", hasntPrefixes),

    // speed
    "c": makeAlias("299792458 | m / s", hasntPrefixes),
    "kn": makeAlias("514/1000 | m / s", hasntPrefixes),
    "kt": makeAlias("| kn", hasntPrefixes),
    "knot": makeAlias("| kn", hasntPrefixes),

    // energy
    "J": makeAlias("| N m", hasPrefixes),
    "BTU": makeAlias("1060 | J", hasntPrefixes),
    "cal": makeAlias("4184 / 1000 | J", hasPrefixes),
    "eV": makeAlias("1.602176514 x 10^-19 | J", hasPrefixes),
    "erg": makeAlias("10^−7 | J", hasPrefixes),

    // power
    "W": makeAlias("| J / s", hasPrefixes),
    "H-e": makeAlias("80 | W", hasntPrefixes),

    // force
    "N": makeAlias("1000 | g m / s s", hasPrefixes),
    // "lb": makeAlias("4448 / 1000 | N", hasntPrefixes),
    // 4.4482216152605
    "lb": makeAlias("4448221615 / 1000000000 | N", hasntPrefixes),
    "dyn": makeAlias("10^-5 | N", hasntPrefixes),

    // pressure
    "Pa": makeAlias("1 | N / m m m", hasPrefixes),
    "bar": makeAlias("10^5 | Pa", hasPrefixes),
    "㏔": makeAlias("1/1000 | bar", hasntPrefixes),
    "㍴": makeAlias("| bar", hasntPrefixes),
    "atm": makeAlias("101325 | Pa", hasntPrefixes),
    "Torr": makeAlias("1/760 | atm", hasntPrefixes),
    "mmHg": makeAlias("| Torr", hasntPrefixes),

    // area
    "ha": makeAlias("10^4 | m m", hasntPrefixes),
    "b": makeAlias("10^−28 | m m", hasPrefixes),
    "barn": makeAlias("| b", hasPrefixes),
    "acre": makeAlias("4046.87 | m m", hasntPrefixes),
    "skilodge": makeAlias("10^-31 | m m", hasntPrefixes),
    "outhouse": makeAlias("10^-34 | m m", hasntPrefixes),
    "shed": makeAlias("10^-52 | m m", hasntPrefixes),

    // volume
    "L": makeAlias("1/1000 | m m m", hasPrefixes),
    "gal": makeAlias("3785/1000 | L", hasPrefixes),
    "cup": makeAlias("1/16 | gal", hasntPrefixes),
    "qt": makeAlias("1/4 | gal", hasntPrefixes),
    "quart": makeAlias("| qt", hasntPrefixes),
    "p": makeAlias("1/8 | gal", hasntPrefixes),
    "pt": makeAlias("| p", hasntPrefixes),
    "pint": makeAlias("| p", hasntPrefixes),
    "fl oz": makeAlias("1/8 | cup", hasntPrefixes),
    "fl. oz.": makeAlias("1/8 | cup", hasntPrefixes),
    "tbsp": makeAlias("1/16 | cup", hasntPrefixes),
    "tsp": makeAlias("1/3 | tbsp", hasntPrefixes),

    // rotational
    // "rad":
    "rev": makeAlias("2 pi | rad", hasntPrefixes),
    "deg": makeAlias("180 pi | rad", hasntPrefixes),
    "°": makeAlias("| deg", hasntPrefixes),
    "arcminute": makeAlias("1/60 | deg", hasntPrefixes),
    "arcsec": makeAlias("1/3600 | deg", hasntPrefixes),

    // dimensionless
    // "B": makeAlias("10 | dB", hasntPrefixes), // XXX danger - logarithmic
    // "dB"
    // "nP"
    "Hu": makeAlias("1000 | dB", hasPrefixes),
    "dozen": makeAlias("12 |", hasntPrefixes),
    // XXX
    "mol": makeAlias("6.0221412927 x 10^23 |", hasPrefixes),
    "%": makeAlias("1/100 |", hasntPrefixes),
    "percent": makeAlias("| %", hasntPrefixes),
    "ppm": makeAlias("1/1000000 |", hasntPrefixes),

    // electric / magnetic
    "V": makeAlias("1000 | g m m / s s C", hasPrefixes),
    "C": makeAlias("| A s", hasPrefixes),
    "ampere": makeAlias("| A", hasntPrefixes),
    "Ω": makeAlias("| V / A", hasPrefixes),
    "ohm": makeAlias("| Ω", hasntPrefixes),
    "F": makeAlias("| C / V", hasPrefixes),
    "H": makeAlias("| ohm s", hasPrefixes),
    "T": makeAlias("1000 | g / C s", hasPrefixes),
    "Wb": makeAlias("1000 | g m m / C s", hasPrefixes),

    // photometry
    // TODO not sure this is right
    "lm": makeAlias("pi x 10^4 | cd / m m", hasntPrefixes),
    "lx": makeAlias("| lm / m m", hasntPrefixes),
    "nit": makeAlias("| cd / m m", hasntPrefixes),
    "sb": makeAlias("10^4 | cd / m m", hasntPrefixes),
    "stilb": makeAlias("1 | sb", hasntPrefixes),
    "apostilb": makeAlias("1 / pi x 10^(-4) | sb", hasntPrefixes),
    "blondel": makeAlias("| apostilb", hasntPrefixes),
    "asb": makeAlias("| apostilb", hasntPrefixes),
    "la": makeAlias("| lm", hasntPrefixes),
    "Lb": makeAlias("| lm", hasntPrefixes),
    "sk": makeAlias("10^-7 | lm", hasntPrefixes),
    "skot": makeAlias("| sk", hasntPrefixes),
    "bril": makeAlias("10^-11 | lm", hasntPrefixes),

    // other
    "Hz": makeAlias("| / s", hasPrefixes),
};

KAS.Add = Add;
KAS.Mul = Mul;
KAS.Pow = Pow;
KAS.Log = Log;
KAS.Eq = Eq;
KAS.Trig = Trig;
KAS.Abs = Abs;
KAS.Func = Func;
KAS.Var = Var;
KAS.Const = Const;
KAS.Unit = Unit;
KAS.Rational = Rational;
KAS.Int = Int;
KAS.Float = Float;
KAS.Zero = Num.Zero;
KAS.One = Num.One;

})(KAS);

(function(KAS) {
    // Assumes that both expressions have already been parsed
    // TODO(alex): be able to pass a random() function to compare()
    KAS.compare = function(expr1, expr2, options) {
        var defaults = {
            form: false, // Check that the two expressions have the same form
            simplify: false, // Check that the second expression is simplified
        };

        /* Options that could be added in the future:
         * - Allow ratios: e.g. 3/1 and 3 should both be accepted for something
         *   like slope
         * - Allow student to choose their own variable names
         */

        if (options !== undefined) {
            // eslint-disable-next-line no-undef
            options = _.extend(defaults, options);
        } else {
            options = defaults;
        }

        // TODO(CP-1614): Figure out how to make these messages translatable

        // Variable check
        var vars = expr1.sameVars(expr2);
        if (!vars.equal) {
            var message;
            if (vars.equalIgnoringCase) {
                message =
                    "Check your variables; one or more are using " +
                    "the wrong case (upper or lower).";
            } else {
                message =
                    "Check your variables; you may have used the wrong " +
                    "letter for one or more of them.";
            }
            return {
                equal: false,
                wrongVariableCase: vars.equalIgnoringCase,
                wrongVariableNames: !vars.equalIgnoringCase,
                message: message,
            };
        }

        // Semantic check
        if (!expr1.compare(expr2)) {
            return {equal: false, message: null};
        }

        // Syntactic check
        if (options.form && !expr1.sameForm(expr2)) {
            return {
                equal: false,
                message: "Your answer is not in the correct form.",
            };
        }

        // Syntactic check
        if (options.simplify && !expr1.isSimplified()) {
            return {
                equal: false,
                message: "Your answer is not fully expanded and simplified.",
            };
        }

        return {equal: true, message: null};
    };
})(KAS);

/* big.js */
/*
 *  big.js v6.0.3
 *  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
 *  Copyright (c) 2020 Michael Mclaughlin
 *  https://github.com/MikeMcl/big.js/LICENCE.md
 */
;(function (GLOBAL) {
  'use strict';
  var Big,

/************************************** EDITABLE DEFAULTS *****************************************/


    // The default values below must be integers within the stated ranges.

    /*
     * The maximum number of decimal places (DP) of the results of operations involving division:
     * div and sqrt, and pow with negative exponents.
     */
    DP = 20,            // 0 to MAX_DP

    /*
     * The rounding mode (RM) used when rounding to the above decimal places.
     *
     *  0  Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
     *  1  To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
     *  2  To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
     *  3  Away from zero.                                  (ROUND_UP)
     */
    RM = 1,             // 0, 1, 2 or 3

    // The maximum value of DP and Big.DP.
    MAX_DP = 1E6,       // 0 to 1000000

    // The maximum magnitude of the exponent argument to the pow method.
    MAX_POWER = 1E6,    // 1 to 1000000

    /*
     * The negative exponent (NE) at and beneath which toString returns exponential notation.
     * (JavaScript numbers: -7)
     * -1000000 is the minimum recommended exponent value of a Big.
     */
    NE = -11,            // 0 to -1000000

    /*
     * The positive exponent (PE) at and above which toString returns exponential notation.
     * (JavaScript numbers: 21)
     * 1000000 is the maximum recommended exponent value of a Big, but this limit is not enforced.
     */
    PE = 21,            // 0 to 1000000

    /*
     * When true, an error will be thrown if a primitive number is passed to the Big constructor,
     * or if valueOf is called, or if toNumber is called on a Big which cannot be converted to a
     * primitive number without a loss of precision.
     */
    STRICT = false,     // true or false


/**************************************************************************************************/


    // Error messages.
    NAME = '[big.js] ',
    INVALID = NAME + 'Invalid ',
    INVALID_DP = INVALID + 'decimal places',
    INVALID_RM = INVALID + 'rounding mode',
    DIV_BY_ZERO = NAME + 'Division by zero',

    // The shared prototype object.
    P = {},
    UNDEFINED = void 0,
    NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;


  /*
   * Create and return a Big constructor.
   */
  function _Big_() {

    /*
     * The Big constructor and exported function.
     * Create and return a new instance of a Big number object.
     *
     * n {number|string|Big} A numeric value.
     */
    function Big(n) {
      var x = this;

      // Enable constructor usage without new.
      if (!(x instanceof Big)) return n === UNDEFINED ? _Big_() : new Big(n);

      // Duplicate.
      if (n instanceof Big) {
        x.s = n.s;
        x.e = n.e;
        x.c = n.c.slice();
      } else {
        if (typeof n !== 'string') {
          if (Big.strict === true) {
            throw TypeError(INVALID + 'number');
          }

          // Minus zero?
          n = n === 0 && 1 / n < 0 ? '-0' : String(n);
        }

        parse(x, n);
      }

      // Retain a reference to this Big constructor.
      // Shadow Big.prototype.constructor which points to Object.
      x.constructor = Big;
    }

    Big.prototype = P;
    Big.DP = DP;
    Big.RM = RM;
    Big.NE = NE;
    Big.PE = PE;
    Big.strict = STRICT;

    return Big;
  }


  /*
   * Parse the number or string value passed to a Big constructor.
   *
   * x {Big} A Big number instance.
   * n {number|string} A numeric value.
   */
  function parse(x, n) {
    var e, i, nl;

    if (!NUMERIC.test(n)) {
      throw Error(INVALID + 'number');
    }

    // Determine sign.
    x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;

    // Decimal point?
    if ((e = n.indexOf('.')) > -1) n = n.replace('.', '');

    // Exponential form?
    if ((i = n.search(/e/i)) > 0) {

      // Determine exponent.
      if (e < 0) e = i;
      e += +n.slice(i + 1);
      n = n.substring(0, i);
    } else if (e < 0) {

      // Integer.
      e = n.length;
    }

    nl = n.length;

    // Determine leading zeros.
    for (i = 0; i < nl && n.charAt(i) == '0';) ++i;

    if (i == nl) {

      // Zero.
      x.c = [x.e = 0];
    } else {

      // Determine trailing zeros.
      for (; nl > 0 && n.charAt(--nl) == '0';);
      x.e = e - i - 1;
      x.c = [];

      // Convert string to array of digits without leading/trailing zeros.
      for (e = 0; i <= nl;) x.c[e++] = +n.charAt(i++);
    }

    return x;
  }


  /*
   * Round Big x to a maximum of sd significant digits using rounding mode rm.
   *
   * x {Big} The Big to round.
   * sd {number} Significant digits: integer, 0 to MAX_DP inclusive.
   * rm {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   * [more] {boolean} Whether the result of division was truncated.
   */
  function round(x, sd, rm, more) {
    var xc = x.c;

    if (rm === UNDEFINED) rm = Big.RM;
    if (rm !== 0 && rm !== 1 && rm !== 2 && rm !== 3) {
      throw Error(INVALID_RM);
    }

    if (sd < 1) {
      more =
        rm === 3 && (more || !!xc[0]) || sd === 0 && (
        rm === 1 && xc[0] >= 5 ||
        rm === 2 && (xc[0] > 5 || xc[0] === 5 && (more || xc[1] !== UNDEFINED))
      );

      xc.length = 1;

      if (more) {

        // 1, 0.1, 0.01, 0.001, 0.0001 etc.
        x.e = x.e - sd + 1;
        xc[0] = 1;
      } else {

        // Zero.
        xc[0] = x.e = 0;
      }
    } else if (sd < xc.length) {

      // xc[sd] is the digit after the digit that may be rounded up.
      more =
        rm === 1 && xc[sd] >= 5 ||
        rm === 2 && (xc[sd] > 5 || xc[sd] === 5 &&
          (more || xc[sd + 1] !== UNDEFINED || xc[sd - 1] & 1)) ||
        rm === 3 && (more || !!xc[0]);

      // Remove any digits after the required precision.
      xc.length = sd--;

      // Round up?
      if (more) {

        // Rounding up may mean the previous digit has to be rounded up.
        for (; ++xc[sd] > 9;) {
          xc[sd] = 0;
          if (!sd--) {
            ++x.e;
            xc.unshift(1);
          }
        }
      }

      // Remove trailing zeros.
      for (sd = xc.length; !xc[--sd];) xc.pop();
    }

    return x;
  }


  /*
   * Return a string representing the value of Big x in normal or exponential notation.
   * Handles P.toExponential, P.toFixed, P.toJSON, P.toPrecision, P.toString and P.valueOf.
   */
  function stringify(x, doExponential, isNonzero) {
    var e = x.e,
      s = x.c.join(''),
      n = s.length;

    // Exponential notation?
    if (doExponential) {
      s = s.charAt(0) + (n > 1 ? '.' + s.slice(1) : '') + (e < 0 ? 'e' : 'e+') + e;

    // Normal notation.
    } else if (e < 0) {
      for (; ++e;) s = '0' + s;
      s = '0.' + s;
    } else if (e > 0) {
      if (++e > n) {
        for (e -= n; e--;) s += '0';
      } else if (e < n) {
        s = s.slice(0, e) + '.' + s.slice(e);
      }
    } else if (n > 1) {
      s = s.charAt(0) + '.' + s.slice(1);
    }

    return x.s < 0 && isNonzero ? '-' + s : s;
  }


  // Prototype/instance methods


  /*
   * Return a new Big whose value is the absolute value of this Big.
   */
  P.abs = function () {
    var x = new this.constructor(this);
    x.s = 1;
    return x;
  };


  /*
   * Return 1 if the value of this Big is greater than the value of Big y,
   *       -1 if the value of this Big is less than the value of Big y, or
   *        0 if they have the same value.
   */
  P.cmp = function (y) {
    var isneg,
      x = this,
      xc = x.c,
      yc = (y = new x.constructor(y)).c,
      i = x.s,
      j = y.s,
      k = x.e,
      l = y.e;

    // Either zero?
    if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j : i;

    // Signs differ?
    if (i != j) return i;

    isneg = i < 0;

    // Compare exponents.
    if (k != l) return k > l ^ isneg ? 1 : -1;

    j = (k = xc.length) < (l = yc.length) ? k : l;

    // Compare digit by digit.
    for (i = -1; ++i < j;) {
      if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
    }

    // Compare lengths.
    return k == l ? 0 : k > l ^ isneg ? 1 : -1;
  };


  /*
   * Return a new Big whose value is the value of this Big divided by the value of Big y, rounded,
   * if necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
   */
  P.div = function (y) {
    var x = this,
      Big = x.constructor,
      a = x.c,                  // dividend
      b = (y = new Big(y)).c,   // divisor
      k = x.s == y.s ? 1 : -1,
      dp = Big.DP;

    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }

    // Divisor is zero?
    if (!b[0]) {
      throw Error(DIV_BY_ZERO);
    }

    // Dividend is 0? Return +-0.
    if (!a[0]) {
      y.s = k;
      y.c = [y.e = 0];
      return y;
    }

    var bl, bt, n, cmp, ri,
      bz = b.slice(),
      ai = bl = b.length,
      al = a.length,
      r = a.slice(0, bl),   // remainder
      rl = r.length,
      q = y,                // quotient
      qc = q.c = [],
      qi = 0,
      p = dp + (q.e = x.e - y.e) + 1;    // precision of the result

    q.s = k;
    k = p < 0 ? 0 : p;

    // Create version of divisor with leading zero.
    bz.unshift(0);

    // Add zeros to make remainder as long as divisor.
    for (; rl++ < bl;) r.push(0);

    do {

      // n is how many times the divisor goes into current remainder.
      for (n = 0; n < 10; n++) {

        // Compare divisor and remainder.
        if (bl != (rl = r.length)) {
          cmp = bl > rl ? 1 : -1;
        } else {
          for (ri = -1, cmp = 0; ++ri < bl;) {
            if (b[ri] != r[ri]) {
              cmp = b[ri] > r[ri] ? 1 : -1;
              break;
            }
          }
        }

        // If divisor < remainder, subtract divisor from remainder.
        if (cmp < 0) {

          // Remainder can't be more than 1 digit longer than divisor.
          // Equalise lengths using divisor with extra leading zero?
          for (bt = rl == bl ? b : bz; rl;) {
            if (r[--rl] < bt[rl]) {
              ri = rl;
              for (; ri && !r[--ri];) r[ri] = 9;
              --r[ri];
              r[rl] += 10;
            }
            r[rl] -= bt[rl];
          }

          for (; !r[0];) r.shift();
        } else {
          break;
        }
      }

      // Add the digit n to the result array.
      qc[qi++] = cmp ? n : ++n;

      // Update the remainder.
      if (r[0] && cmp) r[rl] = a[ai] || 0;
      else r = [a[ai]];

    } while ((ai++ < al || r[0] !== UNDEFINED) && k--);

    // Leading zero? Do not remove if result is simply zero (qi == 1).
    if (!qc[0] && qi != 1) {

      // There can't be more than one zero.
      qc.shift();
      q.e--;
      p--;
    }

    // Round?
    if (qi > p) round(q, p, Big.RM, r[0] !== UNDEFINED);

    return q;
  };


  /*
   * Return true if the value of this Big is equal to the value of Big y, otherwise return false.
   */
  P.eq = function (y) {
    return this.cmp(y) === 0;
  };


  /*
   * Return true if the value of this Big is greater than the value of Big y, otherwise return
   * false.
   */
  P.gt = function (y) {
    return this.cmp(y) > 0;
  };


  /*
   * Return true if the value of this Big is greater than or equal to the value of Big y, otherwise
   * return false.
   */
  P.gte = function (y) {
    return this.cmp(y) > -1;
  };


  /*
   * Return true if the value of this Big is less than the value of Big y, otherwise return false.
   */
  P.lt = function (y) {
    return this.cmp(y) < 0;
  };


  /*
   * Return true if the value of this Big is less than or equal to the value of Big y, otherwise
   * return false.
   */
  P.lte = function (y) {
    return this.cmp(y) < 1;
  };


  /*
   * Return a new Big whose value is the value of this Big minus the value of Big y.
   */
  P.minus = P.sub = function (y) {
    var i, j, t, xlty,
      x = this,
      Big = x.constructor,
      a = x.s,
      b = (y = new Big(y)).s;

    // Signs differ?
    if (a != b) {
      y.s = -b;
      return x.plus(y);
    }

    var xc = x.c.slice(),
      xe = x.e,
      yc = y.c,
      ye = y.e;

    // Either zero?
    if (!xc[0] || !yc[0]) {
      if (yc[0]) {
        y.s = -b;
      } else if (xc[0]) {
        y = new Big(x);
      } else {
        y.s = 1;
      }
      return y;
    }

    // Determine which is the bigger number. Prepend zeros to equalise exponents.
    if (a = xe - ye) {

      if (xlty = a < 0) {
        a = -a;
        t = xc;
      } else {
        ye = xe;
        t = yc;
      }

      t.reverse();
      for (b = a; b--;) t.push(0);
      t.reverse();
    } else {

      // Exponents equal. Check digit by digit.
      j = ((xlty = xc.length < yc.length) ? xc : yc).length;

      for (a = b = 0; b < j; b++) {
        if (xc[b] != yc[b]) {
          xlty = xc[b] < yc[b];
          break;
        }
      }
    }

    // x < y? Point xc to the array of the bigger number.
    if (xlty) {
      t = xc;
      xc = yc;
      yc = t;
      y.s = -y.s;
    }

    /*
     * Append zeros to xc if shorter. No need to add zeros to yc if shorter as subtraction only
     * needs to start at yc.length.
     */
    if ((b = (j = yc.length) - (i = xc.length)) > 0) for (; b--;) xc[i++] = 0;

    // Subtract yc from xc.
    for (b = i; j > a;) {
      if (xc[--j] < yc[j]) {
        for (i = j; i && !xc[--i];) xc[i] = 9;
        --xc[i];
        xc[j] += 10;
      }

      xc[j] -= yc[j];
    }

    // Remove trailing zeros.
    for (; xc[--b] === 0;) xc.pop();

    // Remove leading zeros and adjust exponent accordingly.
    for (; xc[0] === 0;) {
      xc.shift();
      --ye;
    }

    if (!xc[0]) {

      // n - n = +0
      y.s = 1;

      // Result must be zero.
      xc = [ye = 0];
    }

    y.c = xc;
    y.e = ye;

    return y;
  };


  /*
   * Return a new Big whose value is the value of this Big modulo the value of Big y.
   */
  P.mod = function (y) {
    var ygtx,
      x = this,
      Big = x.constructor,
      a = x.s,
      b = (y = new Big(y)).s;

    if (!y.c[0]) {
      throw Error(DIV_BY_ZERO);
    }

    x.s = y.s = 1;
    ygtx = y.cmp(x) == 1;
    x.s = a;
    y.s = b;

    if (ygtx) return new Big(x);

    a = Big.DP;
    b = Big.RM;
    Big.DP = Big.RM = 0;
    x = x.div(y);
    Big.DP = a;
    Big.RM = b;

    return this.minus(x.times(y));
  };


  /*
   * Return a new Big whose value is the value of this Big plus the value of Big y.
   */
  P.plus = P.add = function (y) {
    var e, k, t,
      x = this,
      Big = x.constructor;

    y = new Big(y);

    // Signs differ?
    if (x.s != y.s) {
      y.s = -y.s;
      return x.minus(y);
    }

    var xe = x.e,
      xc = x.c,
      ye = y.e,
      yc = y.c;

    // Either zero?
    if (!xc[0] || !yc[0]) {
      if (!yc[0]) {
        if (xc[0]) {
          y = new Big(x);
        } else {
          y.s = x.s;
        }
      }
      return y;
    }

    xc = xc.slice();

    // Prepend zeros to equalise exponents.
    // Note: reverse faster than unshifts.
    if (e = xe - ye) {
      if (e > 0) {
        ye = xe;
        t = yc;
      } else {
        e = -e;
        t = xc;
      }

      t.reverse();
      for (; e--;) t.push(0);
      t.reverse();
    }

    // Point xc to the longer array.
    if (xc.length - yc.length < 0) {
      t = yc;
      yc = xc;
      xc = t;
    }

    e = yc.length;

    // Only start adding at yc.length - 1 as the further digits of xc can be left as they are.
    for (k = 0; e; xc[e] %= 10) k = (xc[--e] = xc[e] + yc[e] + k) / 10 | 0;

    // No need to check for zero, as +x + +y != 0 && -x + -y != 0

    if (k) {
      xc.unshift(k);
      ++ye;
    }

    // Remove trailing zeros.
    for (e = xc.length; xc[--e] === 0;) xc.pop();

    y.c = xc;
    y.e = ye;

    return y;
  };


  /*
   * Return a Big whose value is the value of this Big raised to the power n.
   * If n is negative, round to a maximum of Big.DP decimal places using rounding
   * mode Big.RM.
   *
   * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
   */
  P.pow = function (n) {
    var x = this,
      one = new x.constructor('1'),
      y = one,
      isneg = n < 0;

    if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) {
      throw Error(INVALID + 'exponent');
    }

    if (isneg) n = -n;

    for (;;) {
      if (n & 1) y = y.times(x);
      n >>= 1;
      if (!n) break;
      x = x.times(x);
    }

    return isneg ? one.div(y) : y;
  };


  /*
   * Return a new Big whose value is the value of this Big rounded to a maximum precision of sd
   * significant digits using rounding mode rm, or Big.RM if rm is not specified.
   *
   * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */
  P.prec = function (sd, rm) {
    if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
      throw Error(INVALID + 'precision');
    }
    return round(new this.constructor(this), sd, rm);
  };


  /*
   * Return a new Big whose value is the value of this Big rounded to a maximum of dp decimal places
   * using rounding mode rm, or Big.RM if rm is not specified.
   * If dp is negative, round to an integer which is a multiple of 10**-dp.
   * If dp is not specified, round to 0 decimal places.
   *
   * dp? {number} Integer, -MAX_DP to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */
  P.round = function (dp, rm) {
    if (dp === UNDEFINED) dp = 0;
    else if (dp !== ~~dp || dp < -MAX_DP || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }
    return round(new this.constructor(this), dp + this.e + 1, rm);
  };


  /*
   * Return a new Big whose value is the square root of the value of this Big, rounded, if
   * necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
   */
  P.sqrt = function () {
    var r, c, t,
      x = this,
      Big = x.constructor,
      s = x.s,
      e = x.e,
      half = new Big('0.5');

    // Zero?
    if (!x.c[0]) return new Big(x);

    // Negative?
    if (s < 0) {
      throw Error(NAME + 'No square root');
    }

    // Estimate.
    s = Math.sqrt(x + '');

    // Math.sqrt underflow/overflow?
    // Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.
    if (s === 0 || s === 1 / 0) {
      c = x.c.join('');
      if (!(c.length + e & 1)) c += '0';
      s = Math.sqrt(c);
      e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
      r = new Big((s == 1 / 0 ? '5e' : (s = s.toExponential()).slice(0, s.indexOf('e') + 1)) + e);
    } else {
      r = new Big(s + '');
    }

    e = r.e + (Big.DP += 4);

    // Newton-Raphson iteration.
    do {
      t = r;
      r = half.times(t.plus(x.div(t)));
    } while (t.c.slice(0, e).join('') !== r.c.slice(0, e).join(''));

    return round(r, (Big.DP -= 4) + r.e + 1, Big.RM);
  };


  /*
   * Return a new Big whose value is the value of this Big times the value of Big y.
   */
  P.times = P.mul = function (y) {
    var c,
      x = this,
      Big = x.constructor,
      xc = x.c,
      yc = (y = new Big(y)).c,
      a = xc.length,
      b = yc.length,
      i = x.e,
      j = y.e;

    // Determine sign of result.
    y.s = x.s == y.s ? 1 : -1;

    // Return signed 0 if either 0.
    if (!xc[0] || !yc[0]) {
      y.c = [y.e = 0];
      return y;
    }

    // Initialise exponent of result as x.e + y.e.
    y.e = i + j;

    // If array xc has fewer digits than yc, swap xc and yc, and lengths.
    if (a < b) {
      c = xc;
      xc = yc;
      yc = c;
      j = a;
      a = b;
      b = j;
    }

    // Initialise coefficient array of result with zeros.
    for (c = new Array(j = a + b); j--;) c[j] = 0;

    // Multiply.

    // i is initially xc.length.
    for (i = b; i--;) {
      b = 0;

      // a is yc.length.
      for (j = a + i; j > i;) {

        // Current sum of products at this digit position, plus carry.
        b = c[j] + yc[i] * xc[j - i - 1] + b;
        c[j--] = b % 10;

        // carry
        b = b / 10 | 0;
      }

      c[j] = b;
    }

    // Increment result exponent if there is a final carry, otherwise remove leading zero.
    if (b) ++y.e;
    else c.shift();

    // Remove trailing zeros.
    for (i = c.length; !c[--i];) c.pop();
    y.c = c;

    return y;
  };


  /*
   * Return a string representing the value of this Big in exponential notation rounded to dp fixed
   * decimal places using rounding mode rm, or Big.RM if rm is not specified.
   *
   * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */
  P.toExponential = function (dp, rm) {
    var x = this,
      n = x.c[0];

    if (dp !== UNDEFINED) {
      if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
        throw Error(INVALID_DP);
      }
      x = round(new x.constructor(x), ++dp, rm);
      for (; x.c.length < dp;) x.c.push(0);
    }

    return stringify(x, true, !!n);
  };


  /*
   * Return a string representing the value of this Big in normal notation rounded to dp fixed
   * decimal places using rounding mode rm, or Big.RM if rm is not specified.
   *
   * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   *
   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
   */
  P.toFixed = function (dp, rm) {
    var x = this,
      n = x.c[0];

    if (dp !== UNDEFINED) {
      if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
        throw Error(INVALID_DP);
      }
      x = round(new x.constructor(x), dp + x.e + 1, rm);

      // x.e may have changed if the value is rounded up.
      for (dp = dp + x.e + 1; x.c.length < dp;) x.c.push(0);
    }

    return stringify(x, false, !!n);
  };


  /*
   * Return a string representing the value of this Big.
   * Return exponential notation if this Big has a positive exponent equal to or greater than
   * Big.PE, or a negative exponent equal to or less than Big.NE.
   * Omit the sign for negative zero.
   */
  P.toJSON = P.toString = function () {
    var x = this,
      Big = x.constructor;
    return stringify(x, x.e <= Big.NE || x.e >= Big.PE, !!x.c[0]);
  };


  /*
   * Return the value of this Big as a primitve number.
   */
  P.toNumber = function () {
    var n = Number(stringify(this, true, true));
    if (this.constructor.strict === true && !this.eq(n.toString())) {
      throw Error(NAME + 'Imprecise conversion');
    }
    return n;
  };


  /*
   * Return a string representing the value of this Big rounded to sd significant digits using
   * rounding mode rm, or Big.RM if rm is not specified.
   * Use exponential notation if sd is less than the number of digits necessary to represent
   * the integer part of the value in normal notation.
   *
   * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */
  P.toPrecision = function (sd, rm) {
    var x = this,
      Big = x.constructor,
      n = x.c[0];

    if (sd !== UNDEFINED) {
      if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
        throw Error(INVALID + 'precision');
      }
      x = round(new Big(x), sd, rm);
      for (; x.c.length < sd;) x.c.push(0);
    }

    return stringify(x, sd <= x.e || x.e <= Big.NE || x.e >= Big.PE, !!n);
  };


  /*
   * Return a string representing the value of this Big.
   * Return exponential notation if this Big has a positive exponent equal to or greater than
   * Big.PE, or a negative exponent equal to or less than Big.NE.
   * Include the sign for negative zero.
   */
  P.valueOf = function () {
    var x = this,
      Big = x.constructor;
    if (Big.strict === true) {
      throw Error(NAME + 'valueOf disallowed');
    }
    return stringify(x, x.e <= Big.NE || x.e >= Big.PE, true);
  };


  // Export


  Big = _Big_();

  Big['default'] = Big.Big = Big;

  //AMD.
  if (typeof define === 'function' && define.amd) {
    define(function () { return Big; });

  // Node and other CommonJS-like environments that support module.exports.
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Big;

  //Browser.
  } else {
    GLOBAL.Big = Big;
  }
})(this);

/* qrious */
/*
 * QRious v4.0.2
 * Copyright (C) 2017 Alasdair Mercer
 * Copyright (C) 2010 Tom Zerucha
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.QRious = factory());
}(this, (function () { 'use strict';

  /*
   * Copyright (C) 2017 Alasdair Mercer, !ninja
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * A bare-bones constructor for surrogate prototype swapping.
   *
   * @private
   * @constructor
   */
  var Constructor = /* istanbul ignore next */ function() {};
  /**
   * A reference to <code>Object.prototype.hasOwnProperty</code>.
   *
   * @private
   * @type {Function}
   */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /**
   * A reference to <code>Array.prototype.slice</code>.
   *
   * @private
   * @type {Function}
   */
  var slice = Array.prototype.slice;

  /**
   * Creates an object which inherits the given <code>prototype</code>.
   *
   * Optionally, the created object can be extended further with the specified <code>properties</code>.
   *
   * @param {Object} prototype - the prototype to be inherited by the created object
   * @param {Object} [properties] - the optional properties to be extended by the created object
   * @return {Object} The newly created object.
   * @private
   */
  function createObject(prototype, properties) {
    var result;
    /* istanbul ignore next */
    if (typeof Object.create === 'function') {
      result = Object.create(prototype);
    } else {
      Constructor.prototype = prototype;
      result = new Constructor();
      Constructor.prototype = null;
    }

    if (properties) {
      extendObject(true, result, properties);
    }

    return result;
  }

  /**
   * Extends the constructor to which this method is associated with the <code>prototype</code> and/or
   * <code>statics</code> provided.
   *
   * If <code>name</code> is provided, it will be used as the class name and can be accessed via a special
   * <code>class_</code> property on the child constructor, otherwise the class name of the super constructor will be used
   * instead. The class name may also be used string representation for instances of the child constructor (via
   * <code>toString</code>), but this is not applicable to the <i>lite</i> version of Nevis.
   *
   * If <code>constructor</code> is provided, it will be used as the constructor for the child, otherwise a simple
   * constructor which only calls the super constructor will be used instead.
   *
   * The super constructor can be accessed via a special <code>super_</code> property on the child constructor.
   *
   * @param {string} [name=this.class_] - the class name to be used for the child constructor
   * @param {Function} [constructor] - the constructor for the child
   * @param {Object} [prototype] - the prototype properties to be defined for the child
   * @param {Object} [statics] - the static properties to be defined for the child
   * @return {Function} The child <code>constructor</code> provided or the one created if none was given.
   * @public
   */
  function extend(name, constructor, prototype, statics) {
    var superConstructor = this;

    if (typeof name !== 'string') {
      statics = prototype;
      prototype = constructor;
      constructor = name;
      name = null;
    }

    if (typeof constructor !== 'function') {
      statics = prototype;
      prototype = constructor;
      constructor = function() {
        return superConstructor.apply(this, arguments);
      };
    }

    extendObject(false, constructor, superConstructor, statics);

    constructor.prototype = createObject(superConstructor.prototype, prototype);
    constructor.prototype.constructor = constructor;

    constructor.class_ = name || superConstructor.class_;
    constructor.super_ = superConstructor;

    return constructor;
  }

  /**
   * Extends the specified <code>target</code> object with the properties in each of the <code>sources</code> provided.
   *
   * if any source is <code>null</code> it will be ignored.
   *
   * @param {boolean} own - <code>true</code> to only copy <b>own</b> properties from <code>sources</code> onto
   * <code>target</code>; otherwise <code>false</code>
   * @param {Object} target - the target object which should be extended
   * @param {...Object} [sources] - the source objects whose properties are to be copied onto <code>target</code>
   * @return {void}
   * @private
   */
  function extendObject(own, target, sources) {
    sources = slice.call(arguments, 2);

    var property;
    var source;

    for (var i = 0, length = sources.length; i < length; i++) {
      source = sources[i];

      for (property in source) {
        if (!own || hasOwnProperty.call(source, property)) {
          target[property] = source[property];
        }
      }
    }
  }

  var extend_1 = extend;

  /**
   * The base class from which all others should extend.
   *
   * @public
   * @constructor
   */
  function Nevis() {}
  Nevis.class_ = 'Nevis';
  Nevis.super_ = Object;

  /**
   * Extends the constructor to which this method is associated with the <code>prototype</code> and/or
   * <code>statics</code> provided.
   *
   * If <code>name</code> is provided, it will be used as the class name and can be accessed via a special
   * <code>class_</code> property on the child constructor, otherwise the class name of the super constructor will be used
   * instead. The class name may also be used string representation for instances of the child constructor (via
   * <code>toString</code>), but this is not applicable to the <i>lite</i> version of Nevis.
   *
   * If <code>constructor</code> is provided, it will be used as the constructor for the child, otherwise a simple
   * constructor which only calls the super constructor will be used instead.
   *
   * The super constructor can be accessed via a special <code>super_</code> property on the child constructor.
   *
   * @param {string} [name=this.class_] - the class name to be used for the child constructor
   * @param {Function} [constructor] - the constructor for the child
   * @param {Object} [prototype] - the prototype properties to be defined for the child
   * @param {Object} [statics] - the static properties to be defined for the child
   * @return {Function} The child <code>constructor</code> provided or the one created if none was given.
   * @public
   * @static
   * @memberof Nevis
   */
  Nevis.extend = extend_1;

  var nevis = Nevis;

  var lite = nevis;

  /**
   * Responsible for rendering a QR code {@link Frame} on a specific type of element.
   *
   * A renderer may be dependant on the rendering of another element, so the ordering of their execution is important.
   *
   * The rendering of a element can be deferred by disabling the renderer initially, however, any attempt get the element
   * from the renderer will result in it being immediately enabled and the element being rendered.
   *
   * @param {QRious} qrious - the {@link QRious} instance to be used
   * @param {*} element - the element onto which the QR code is to be rendered
   * @param {boolean} [enabled] - <code>true</code> this {@link Renderer} is enabled; otherwise <code>false</code>.
   * @public
   * @class
   * @extends Nevis
   */
  var Renderer = lite.extend(function(qrious, element, enabled) {
    /**
     * The {@link QRious} instance.
     *
     * @protected
     * @type {QRious}
     * @memberof Renderer#
     */
    this.qrious = qrious;

    /**
     * The element onto which this {@link Renderer} is rendering the QR code.
     *
     * @protected
     * @type {*}
     * @memberof Renderer#
     */
    this.element = element;
    this.element.qrious = qrious;

    /**
     * Whether this {@link Renderer} is enabled.
     *
     * @protected
     * @type {boolean}
     * @memberof Renderer#
     */
    this.enabled = Boolean(enabled);
  }, {

    /**
     * Draws the specified QR code <code>frame</code> on the underlying element.
     *
     * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
     *
     * @param {Frame} frame - the {@link Frame} to be drawn
     * @return {void}
     * @protected
     * @abstract
     * @memberof Renderer#
     */
    draw: function(frame) {},

    /**
     * Returns the element onto which this {@link Renderer} is rendering the QR code.
     *
     * If this method is called while this {@link Renderer} is disabled, it will be immediately enabled and rendered
     * before the element is returned.
     *
     * @return {*} The element.
     * @public
     * @memberof Renderer#
     */
    getElement: function() {
      if (!this.enabled) {
        this.enabled = true;
        this.render();
      }

      return this.element;
    },

    /**
     * Calculates the size (in pixel units) to represent an individual module within the QR code based on the
     * <code>frame</code> provided.
     *
     * Any configured padding will be excluded from the returned size.
     *
     * The returned value will be at least one, even in cases where the size of the QR code does not fit its contents.
     * This is done so that the inevitable clipping is handled more gracefully since this way at least something is
     * displayed instead of just a blank space filled by the background color.
     *
     * @param {Frame} frame - the {@link Frame} from which the module size is to be derived
     * @return {number} The pixel size for each module in the QR code which will be no less than one.
     * @protected
     * @memberof Renderer#
     */
    getModuleSize: function(frame) {
      var qrious = this.qrious;
      var padding = qrious.padding || 0;
      var pixels = Math.floor((qrious.size - (padding * 2)) / frame.width);

      return Math.max(1, pixels);
    },

    /**
     * Calculates the offset/padding (in pixel units) to be inserted before the QR code based on the <code>frame</code>
     * provided.
     *
     * The returned value will be zero if there is no available offset or if the size of the QR code does not fit its
     * contents. It will never be a negative value. This is done so that the inevitable clipping appears more naturally
     * and it is not clipped from all directions.
     *
     * @param {Frame} frame - the {@link Frame} from which the offset is to be derived
     * @return {number} The pixel offset for the QR code which will be no less than zero.
     * @protected
     * @memberof Renderer#
     */
    getOffset: function(frame) {
      var qrious = this.qrious;
      var padding = qrious.padding;

      if (padding != null) {
        return padding;
      }

      var moduleSize = this.getModuleSize(frame);
      var offset = Math.floor((qrious.size - (moduleSize * frame.width)) / 2);

      return Math.max(0, offset);
    },

    /**
     * Renders a QR code on the underlying element based on the <code>frame</code> provided.
     *
     * @param {Frame} frame - the {@link Frame} to be rendered
     * @return {void}
     * @public
     * @memberof Renderer#
     */
    render: function(frame) {
      if (this.enabled) {
        this.resize();
        this.reset();
        this.draw(frame);
      }
    },

    /**
     * Resets the underlying element, effectively clearing any previously rendered QR code.
     *
     * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
     *
     * @return {void}
     * @protected
     * @abstract
     * @memberof Renderer#
     */
    reset: function() {},

    /**
     * Ensures that the size of the underlying element matches that defined on the associated {@link QRious} instance.
     *
     * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
     *
     * @return {void}
     * @protected
     * @abstract
     * @memberof Renderer#
     */
    resize: function() {}

  });

  var Renderer_1 = Renderer;

  /**
   * An implementation of {@link Renderer} for working with <code>canvas</code> elements.
   *
   * @public
   * @class
   * @extends Renderer
   */
  var CanvasRenderer = Renderer_1.extend({

    /**
     * @override
     */
    draw: function(frame) {
      var i, j;
      var qrious = this.qrious;
      var moduleSize = this.getModuleSize(frame);
      var offset = this.getOffset(frame);
      var context = this.element.getContext('2d');

      context.fillStyle = qrious.foreground;
      context.globalAlpha = qrious.foregroundAlpha;

      for (i = 0; i < frame.width; i++) {
        for (j = 0; j < frame.width; j++) {
          if (frame.buffer[(j * frame.width) + i]) {
            context.fillRect((moduleSize * i) + offset, (moduleSize * j) + offset, moduleSize, moduleSize);
          }
        }
      }
    },

    /**
     * @override
     */
    reset: function() {
      var qrious = this.qrious;
      var context = this.element.getContext('2d');
      var size = qrious.size;

      context.lineWidth = 1;
      context.clearRect(0, 0, size, size);
      context.fillStyle = qrious.background;
      context.globalAlpha = qrious.backgroundAlpha;
      context.fillRect(0, 0, size, size);
    },

    /**
     * @override
     */
    resize: function() {
      var element = this.element;

      element.width = element.height = this.qrious.size;
    }

  });

  var CanvasRenderer_1 = CanvasRenderer;

  /* eslint no-multi-spaces: "off" */



  /**
   * Contains alignment pattern information.
   *
   * @public
   * @class
   * @extends Nevis
   */
  var Alignment = lite.extend(null, {

    /**
     * The alignment pattern block.
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof Alignment
     */
    BLOCK: [
      0,  11, 15, 19, 23, 27, 31,
      16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24,
      26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28
    ]

  });

  var Alignment_1 = Alignment;

  /* eslint no-multi-spaces: "off" */



  /**
   * Contains error correction information.
   *
   * @public
   * @class
   * @extends Nevis
   */
  var ErrorCorrection = lite.extend(null, {

    /**
     * The error correction blocks.
     *
     * There are four elements per version. The first two indicate the number of blocks, then the data width, and finally
     * the ECC width.
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof ErrorCorrection
     */
    BLOCKS: [
      1,  0,  19,  7,     1,  0,  16,  10,    1,  0,  13,  13,    1,  0,  9,   17,
      1,  0,  34,  10,    1,  0,  28,  16,    1,  0,  22,  22,    1,  0,  16,  28,
      1,  0,  55,  15,    1,  0,  44,  26,    2,  0,  17,  18,    2,  0,  13,  22,
      1,  0,  80,  20,    2,  0,  32,  18,    2,  0,  24,  26,    4,  0,  9,   16,
      1,  0,  108, 26,    2,  0,  43,  24,    2,  2,  15,  18,    2,  2,  11,  22,
      2,  0,  68,  18,    4,  0,  27,  16,    4,  0,  19,  24,    4,  0,  15,  28,
      2,  0,  78,  20,    4,  0,  31,  18,    2,  4,  14,  18,    4,  1,  13,  26,
      2,  0,  97,  24,    2,  2,  38,  22,    4,  2,  18,  22,    4,  2,  14,  26,
      2,  0,  116, 30,    3,  2,  36,  22,    4,  4,  16,  20,    4,  4,  12,  24,
      2,  2,  68,  18,    4,  1,  43,  26,    6,  2,  19,  24,    6,  2,  15,  28,
      4,  0,  81,  20,    1,  4,  50,  30,    4,  4,  22,  28,    3,  8,  12,  24,
      2,  2,  92,  24,    6,  2,  36,  22,    4,  6,  20,  26,    7,  4,  14,  28,
      4,  0,  107, 26,    8,  1,  37,  22,    8,  4,  20,  24,    12, 4,  11,  22,
      3,  1,  115, 30,    4,  5,  40,  24,    11, 5,  16,  20,    11, 5,  12,  24,
      5,  1,  87,  22,    5,  5,  41,  24,    5,  7,  24,  30,    11, 7,  12,  24,
      5,  1,  98,  24,    7,  3,  45,  28,    15, 2,  19,  24,    3,  13, 15,  30,
      1,  5,  107, 28,    10, 1,  46,  28,    1,  15, 22,  28,    2,  17, 14,  28,
      5,  1,  120, 30,    9,  4,  43,  26,    17, 1,  22,  28,    2,  19, 14,  28,
      3,  4,  113, 28,    3,  11, 44,  26,    17, 4,  21,  26,    9,  16, 13,  26,
      3,  5,  107, 28,    3,  13, 41,  26,    15, 5,  24,  30,    15, 10, 15,  28,
      4,  4,  116, 28,    17, 0,  42,  26,    17, 6,  22,  28,    19, 6,  16,  30,
      2,  7,  111, 28,    17, 0,  46,  28,    7,  16, 24,  30,    34, 0,  13,  24,
      4,  5,  121, 30,    4,  14, 47,  28,    11, 14, 24,  30,    16, 14, 15,  30,
      6,  4,  117, 30,    6,  14, 45,  28,    11, 16, 24,  30,    30, 2,  16,  30,
      8,  4,  106, 26,    8,  13, 47,  28,    7,  22, 24,  30,    22, 13, 15,  30,
      10, 2,  114, 28,    19, 4,  46,  28,    28, 6,  22,  28,    33, 4,  16,  30,
      8,  4,  122, 30,    22, 3,  45,  28,    8,  26, 23,  30,    12, 28, 15,  30,
      3,  10, 117, 30,    3,  23, 45,  28,    4,  31, 24,  30,    11, 31, 15,  30,
      7,  7,  116, 30,    21, 7,  45,  28,    1,  37, 23,  30,    19, 26, 15,  30,
      5,  10, 115, 30,    19, 10, 47,  28,    15, 25, 24,  30,    23, 25, 15,  30,
      13, 3,  115, 30,    2,  29, 46,  28,    42, 1,  24,  30,    23, 28, 15,  30,
      17, 0,  115, 30,    10, 23, 46,  28,    10, 35, 24,  30,    19, 35, 15,  30,
      17, 1,  115, 30,    14, 21, 46,  28,    29, 19, 24,  30,    11, 46, 15,  30,
      13, 6,  115, 30,    14, 23, 46,  28,    44, 7,  24,  30,    59, 1,  16,  30,
      12, 7,  121, 30,    12, 26, 47,  28,    39, 14, 24,  30,    22, 41, 15,  30,
      6,  14, 121, 30,    6,  34, 47,  28,    46, 10, 24,  30,    2,  64, 15,  30,
      17, 4,  122, 30,    29, 14, 46,  28,    49, 10, 24,  30,    24, 46, 15,  30,
      4,  18, 122, 30,    13, 32, 46,  28,    48, 14, 24,  30,    42, 32, 15,  30,
      20, 4,  117, 30,    40, 7,  47,  28,    43, 22, 24,  30,    10, 67, 15,  30,
      19, 6,  118, 30,    18, 31, 47,  28,    34, 34, 24,  30,    20, 61, 15,  30
    ],

    /**
     * The final format bits with mask (level << 3 | mask).
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof ErrorCorrection
     */
    FINAL_FORMAT: [
      // L
      0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976,
      // M
      0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0,
      // Q
      0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed,
      // H
      0x1689, 0x13be, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b
    ],

    /**
     * A map of human-readable ECC levels.
     *
     * @public
     * @static
     * @type {Object.<string, number>}
     * @memberof ErrorCorrection
     */
    LEVELS: {
      L: 1,
      M: 2,
      Q: 3,
      H: 4
    }

  });

  var ErrorCorrection_1 = ErrorCorrection;

  /**
   * Contains Galois field information.
   *
   * @public
   * @class
   * @extends Nevis
   */
  var Galois = lite.extend(null, {

    /**
     * The Galois field exponent table.
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof Galois
     */
    EXPONENT: [
      0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1d, 0x3a, 0x74, 0xe8, 0xcd, 0x87, 0x13, 0x26,
      0x4c, 0x98, 0x2d, 0x5a, 0xb4, 0x75, 0xea, 0xc9, 0x8f, 0x03, 0x06, 0x0c, 0x18, 0x30, 0x60, 0xc0,
      0x9d, 0x27, 0x4e, 0x9c, 0x25, 0x4a, 0x94, 0x35, 0x6a, 0xd4, 0xb5, 0x77, 0xee, 0xc1, 0x9f, 0x23,
      0x46, 0x8c, 0x05, 0x0a, 0x14, 0x28, 0x50, 0xa0, 0x5d, 0xba, 0x69, 0xd2, 0xb9, 0x6f, 0xde, 0xa1,
      0x5f, 0xbe, 0x61, 0xc2, 0x99, 0x2f, 0x5e, 0xbc, 0x65, 0xca, 0x89, 0x0f, 0x1e, 0x3c, 0x78, 0xf0,
      0xfd, 0xe7, 0xd3, 0xbb, 0x6b, 0xd6, 0xb1, 0x7f, 0xfe, 0xe1, 0xdf, 0xa3, 0x5b, 0xb6, 0x71, 0xe2,
      0xd9, 0xaf, 0x43, 0x86, 0x11, 0x22, 0x44, 0x88, 0x0d, 0x1a, 0x34, 0x68, 0xd0, 0xbd, 0x67, 0xce,
      0x81, 0x1f, 0x3e, 0x7c, 0xf8, 0xed, 0xc7, 0x93, 0x3b, 0x76, 0xec, 0xc5, 0x97, 0x33, 0x66, 0xcc,
      0x85, 0x17, 0x2e, 0x5c, 0xb8, 0x6d, 0xda, 0xa9, 0x4f, 0x9e, 0x21, 0x42, 0x84, 0x15, 0x2a, 0x54,
      0xa8, 0x4d, 0x9a, 0x29, 0x52, 0xa4, 0x55, 0xaa, 0x49, 0x92, 0x39, 0x72, 0xe4, 0xd5, 0xb7, 0x73,
      0xe6, 0xd1, 0xbf, 0x63, 0xc6, 0x91, 0x3f, 0x7e, 0xfc, 0xe5, 0xd7, 0xb3, 0x7b, 0xf6, 0xf1, 0xff,
      0xe3, 0xdb, 0xab, 0x4b, 0x96, 0x31, 0x62, 0xc4, 0x95, 0x37, 0x6e, 0xdc, 0xa5, 0x57, 0xae, 0x41,
      0x82, 0x19, 0x32, 0x64, 0xc8, 0x8d, 0x07, 0x0e, 0x1c, 0x38, 0x70, 0xe0, 0xdd, 0xa7, 0x53, 0xa6,
      0x51, 0xa2, 0x59, 0xb2, 0x79, 0xf2, 0xf9, 0xef, 0xc3, 0x9b, 0x2b, 0x56, 0xac, 0x45, 0x8a, 0x09,
      0x12, 0x24, 0x48, 0x90, 0x3d, 0x7a, 0xf4, 0xf5, 0xf7, 0xf3, 0xfb, 0xeb, 0xcb, 0x8b, 0x0b, 0x16,
      0x2c, 0x58, 0xb0, 0x7d, 0xfa, 0xe9, 0xcf, 0x83, 0x1b, 0x36, 0x6c, 0xd8, 0xad, 0x47, 0x8e, 0x00
    ],

    /**
     * The Galois field log table.
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof Galois
     */
    LOG: [
      0xff, 0x00, 0x01, 0x19, 0x02, 0x32, 0x1a, 0xc6, 0x03, 0xdf, 0x33, 0xee, 0x1b, 0x68, 0xc7, 0x4b,
      0x04, 0x64, 0xe0, 0x0e, 0x34, 0x8d, 0xef, 0x81, 0x1c, 0xc1, 0x69, 0xf8, 0xc8, 0x08, 0x4c, 0x71,
      0x05, 0x8a, 0x65, 0x2f, 0xe1, 0x24, 0x0f, 0x21, 0x35, 0x93, 0x8e, 0xda, 0xf0, 0x12, 0x82, 0x45,
      0x1d, 0xb5, 0xc2, 0x7d, 0x6a, 0x27, 0xf9, 0xb9, 0xc9, 0x9a, 0x09, 0x78, 0x4d, 0xe4, 0x72, 0xa6,
      0x06, 0xbf, 0x8b, 0x62, 0x66, 0xdd, 0x30, 0xfd, 0xe2, 0x98, 0x25, 0xb3, 0x10, 0x91, 0x22, 0x88,
      0x36, 0xd0, 0x94, 0xce, 0x8f, 0x96, 0xdb, 0xbd, 0xf1, 0xd2, 0x13, 0x5c, 0x83, 0x38, 0x46, 0x40,
      0x1e, 0x42, 0xb6, 0xa3, 0xc3, 0x48, 0x7e, 0x6e, 0x6b, 0x3a, 0x28, 0x54, 0xfa, 0x85, 0xba, 0x3d,
      0xca, 0x5e, 0x9b, 0x9f, 0x0a, 0x15, 0x79, 0x2b, 0x4e, 0xd4, 0xe5, 0xac, 0x73, 0xf3, 0xa7, 0x57,
      0x07, 0x70, 0xc0, 0xf7, 0x8c, 0x80, 0x63, 0x0d, 0x67, 0x4a, 0xde, 0xed, 0x31, 0xc5, 0xfe, 0x18,
      0xe3, 0xa5, 0x99, 0x77, 0x26, 0xb8, 0xb4, 0x7c, 0x11, 0x44, 0x92, 0xd9, 0x23, 0x20, 0x89, 0x2e,
      0x37, 0x3f, 0xd1, 0x5b, 0x95, 0xbc, 0xcf, 0xcd, 0x90, 0x87, 0x97, 0xb2, 0xdc, 0xfc, 0xbe, 0x61,
      0xf2, 0x56, 0xd3, 0xab, 0x14, 0x2a, 0x5d, 0x9e, 0x84, 0x3c, 0x39, 0x53, 0x47, 0x6d, 0x41, 0xa2,
      0x1f, 0x2d, 0x43, 0xd8, 0xb7, 0x7b, 0xa4, 0x76, 0xc4, 0x17, 0x49, 0xec, 0x7f, 0x0c, 0x6f, 0xf6,
      0x6c, 0xa1, 0x3b, 0x52, 0x29, 0x9d, 0x55, 0xaa, 0xfb, 0x60, 0x86, 0xb1, 0xbb, 0xcc, 0x3e, 0x5a,
      0xcb, 0x59, 0x5f, 0xb0, 0x9c, 0xa9, 0xa0, 0x51, 0x0b, 0xf5, 0x16, 0xeb, 0x7a, 0x75, 0x2c, 0xd7,
      0x4f, 0xae, 0xd5, 0xe9, 0xe6, 0xe7, 0xad, 0xe8, 0x74, 0xd6, 0xf4, 0xea, 0xa8, 0x50, 0x58, 0xaf
    ]

  });

  var Galois_1 = Galois;

  /**
   * Contains version pattern information.
   *
   * @public
   * @class
   * @extends Nevis
   */
  var Version = lite.extend(null, {

    /**
     * The version pattern block.
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof Version
     */
    BLOCK: [
      0xc94, 0x5bc, 0xa99, 0x4d3, 0xbf6, 0x762, 0x847, 0x60d, 0x928, 0xb78, 0x45d, 0xa17, 0x532,
      0x9a6, 0x683, 0x8c9, 0x7ec, 0xec4, 0x1e1, 0xfab, 0x08e, 0xc1a, 0x33f, 0xd75, 0x250, 0x9d5,
      0x6f0, 0x8ba, 0x79f, 0xb0b, 0x42e, 0xa64, 0x541, 0xc69
    ]

  });

  var Version_1 = Version;

  /**
   * Generates information for a QR code frame based on a specific value to be encoded.
   *
   * @param {Frame~Options} options - the options to be used
   * @public
   * @class
   * @extends Nevis
   */
  var Frame = lite.extend(function(options) {
    var dataBlock, eccBlock, index, neccBlock1, neccBlock2;
    var valueLength = options.value.length;

    this._badness = [];
    this._level = ErrorCorrection_1.LEVELS[options.level];
    this._polynomial = [];
    this._value = options.value;
    this._version = 0;
    this._stringBuffer = [];

    while (this._version < 40) {
      this._version++;

      index = ((this._level - 1) * 4) + ((this._version - 1) * 16);

      neccBlock1 = ErrorCorrection_1.BLOCKS[index++];
      neccBlock2 = ErrorCorrection_1.BLOCKS[index++];
      dataBlock = ErrorCorrection_1.BLOCKS[index++];
      eccBlock = ErrorCorrection_1.BLOCKS[index];

      index = (dataBlock * (neccBlock1 + neccBlock2)) + neccBlock2 - 3 + (this._version <= 9);

      if (valueLength <= index) {
        break;
      }
    }

    this._dataBlock = dataBlock;
    this._eccBlock = eccBlock;
    this._neccBlock1 = neccBlock1;
    this._neccBlock2 = neccBlock2;

    /**
     * The data width is based on version.
     *
     * @public
     * @type {number}
     * @memberof Frame#
     */
    // FIXME: Ensure that it fits instead of being truncated.
    var width = this.width = 17 + (4 * this._version);

    /**
     * The image buffer.
     *
     * @public
     * @type {number[]}
     * @memberof Frame#
     */
    this.buffer = Frame._createArray(width * width);

    this._ecc = Frame._createArray(dataBlock + ((dataBlock + eccBlock) * (neccBlock1 + neccBlock2)) + neccBlock2);
    this._mask = Frame._createArray(((width * (width + 1)) + 1) / 2);

    this._insertFinders();
    this._insertAlignments();

    // Insert single foreground cell.
    this.buffer[8 + (width * (width - 8))] = 1;

    this._insertTimingGap();
    this._reverseMask();
    this._insertTimingRowAndColumn();
    this._insertVersion();
    this._syncMask();
    this._convertBitStream(valueLength);
    this._calculatePolynomial();
    this._appendEccToData();
    this._interleaveBlocks();
    this._pack();
    this._finish();
  }, {

    _addAlignment: function(x, y) {
      var i;
      var buffer = this.buffer;
      var width = this.width;

      buffer[x + (width * y)] = 1;

      for (i = -2; i < 2; i++) {
        buffer[x + i + (width * (y - 2))] = 1;
        buffer[x - 2 + (width * (y + i + 1))] = 1;
        buffer[x + 2 + (width * (y + i))] = 1;
        buffer[x + i + 1 + (width * (y + 2))] = 1;
      }

      for (i = 0; i < 2; i++) {
        this._setMask(x - 1, y + i);
        this._setMask(x + 1, y - i);
        this._setMask(x - i, y - 1);
        this._setMask(x + i, y + 1);
      }
    },

    _appendData: function(data, dataLength, ecc, eccLength) {
      var bit, i, j;
      var polynomial = this._polynomial;
      var stringBuffer = this._stringBuffer;

      for (i = 0; i < eccLength; i++) {
        stringBuffer[ecc + i] = 0;
      }

      for (i = 0; i < dataLength; i++) {
        bit = Galois_1.LOG[stringBuffer[data + i] ^ stringBuffer[ecc]];

        if (bit !== 255) {
          for (j = 1; j < eccLength; j++) {
            stringBuffer[ecc + j - 1] = stringBuffer[ecc + j] ^
              Galois_1.EXPONENT[Frame._modN(bit + polynomial[eccLength - j])];
          }
        } else {
          for (j = ecc; j < ecc + eccLength; j++) {
            stringBuffer[j] = stringBuffer[j + 1];
          }
        }

        stringBuffer[ecc + eccLength - 1] = bit === 255 ? 0 : Galois_1.EXPONENT[Frame._modN(bit + polynomial[0])];
      }
    },

    _appendEccToData: function() {
      var i;
      var data = 0;
      var dataBlock = this._dataBlock;
      var ecc = this._calculateMaxLength();
      var eccBlock = this._eccBlock;

      for (i = 0; i < this._neccBlock1; i++) {
        this._appendData(data, dataBlock, ecc, eccBlock);

        data += dataBlock;
        ecc += eccBlock;
      }

      for (i = 0; i < this._neccBlock2; i++) {
        this._appendData(data, dataBlock + 1, ecc, eccBlock);

        data += dataBlock + 1;
        ecc += eccBlock;
      }
    },

    _applyMask: function(mask) {
      var r3x, r3y, x, y;
      var buffer = this.buffer;
      var width = this.width;

      switch (mask) {
      case 0:
        for (y = 0; y < width; y++) {
          for (x = 0; x < width; x++) {
            if (!((x + y) & 1) && !this._isMasked(x, y)) {
              buffer[x + (y * width)] ^= 1;
            }
          }
        }

        break;
      case 1:
        for (y = 0; y < width; y++) {
          for (x = 0; x < width; x++) {
            if (!(y & 1) && !this._isMasked(x, y)) {
              buffer[x + (y * width)] ^= 1;
            }
          }
        }

        break;
      case 2:
        for (y = 0; y < width; y++) {
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x === 3) {
              r3x = 0;
            }

            if (!r3x && !this._isMasked(x, y)) {
              buffer[x + (y * width)] ^= 1;
            }
          }
        }

        break;
      case 3:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y === 3) {
            r3y = 0;
          }

          for (r3x = r3y, x = 0; x < width; x++, r3x++) {
            if (r3x === 3) {
              r3x = 0;
            }

            if (!r3x && !this._isMasked(x, y)) {
              buffer[x + (y * width)] ^= 1;
            }
          }
        }

        break;
      case 4:
        for (y = 0; y < width; y++) {
          for (r3x = 0, r3y = (y >> 1) & 1, x = 0; x < width; x++, r3x++) {
            if (r3x === 3) {
              r3x = 0;
              r3y = !r3y;
            }

            if (!r3y && !this._isMasked(x, y)) {
              buffer[x + (y * width)] ^= 1;
            }
          }
        }

        break;
      case 5:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y === 3) {
            r3y = 0;
          }

          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x === 3) {
              r3x = 0;
            }

            if (!((x & y & 1) + !(!r3x | !r3y)) && !this._isMasked(x, y)) {
              buffer[x + (y * width)] ^= 1;
            }
          }
        }

        break;
      case 6:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y === 3) {
            r3y = 0;
          }

          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x === 3) {
              r3x = 0;
            }

            if (!((x & y & 1) + (r3x && r3x === r3y) & 1) && !this._isMasked(x, y)) {
              buffer[x + (y * width)] ^= 1;
            }
          }
        }

        break;
      case 7:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y === 3) {
            r3y = 0;
          }

          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x === 3) {
              r3x = 0;
            }

            if (!((r3x && r3x === r3y) + (x + y & 1) & 1) && !this._isMasked(x, y)) {
              buffer[x + (y * width)] ^= 1;
            }
          }
        }

        break;
      }
    },

    _calculateMaxLength: function() {
      return (this._dataBlock * (this._neccBlock1 + this._neccBlock2)) + this._neccBlock2;
    },

    _calculatePolynomial: function() {
      var i, j;
      var eccBlock = this._eccBlock;
      var polynomial = this._polynomial;

      polynomial[0] = 1;

      for (i = 0; i < eccBlock; i++) {
        polynomial[i + 1] = 1;

        for (j = i; j > 0; j--) {
          polynomial[j] = polynomial[j] ? polynomial[j - 1] ^
            Galois_1.EXPONENT[Frame._modN(Galois_1.LOG[polynomial[j]] + i)] : polynomial[j - 1];
        }

        polynomial[0] = Galois_1.EXPONENT[Frame._modN(Galois_1.LOG[polynomial[0]] + i)];
      }

      // Use logs for generator polynomial to save calculation step.
      for (i = 0; i <= eccBlock; i++) {
        polynomial[i] = Galois_1.LOG[polynomial[i]];
      }
    },

    _checkBadness: function() {
      var b, b1, h, x, y;
      var bad = 0;
      var badness = this._badness;
      var buffer = this.buffer;
      var width = this.width;

      // Blocks of same colour.
      for (y = 0; y < width - 1; y++) {
        for (x = 0; x < width - 1; x++) {
          // All foreground colour.
          if ((buffer[x + (width * y)] &&
            buffer[x + 1 + (width * y)] &&
            buffer[x + (width * (y + 1))] &&
            buffer[x + 1 + (width * (y + 1))]) ||
            // All background colour.
            !(buffer[x + (width * y)] ||
            buffer[x + 1 + (width * y)] ||
            buffer[x + (width * (y + 1))] ||
            buffer[x + 1 + (width * (y + 1))])) {
            bad += Frame.N2;
          }
        }
      }

      var bw = 0;

      // X runs.
      for (y = 0; y < width; y++) {
        h = 0;

        badness[0] = 0;

        for (b = 0, x = 0; x < width; x++) {
          b1 = buffer[x + (width * y)];

          if (b === b1) {
            badness[h]++;
          } else {
            badness[++h] = 1;
          }

          b = b1;
          bw += b ? 1 : -1;
        }

        bad += this._getBadness(h);
      }

      if (bw < 0) {
        bw = -bw;
      }

      var count = 0;
      var big = bw;
      big += big << 2;
      big <<= 1;

      while (big > width * width) {
        big -= width * width;
        count++;
      }

      bad += count * Frame.N4;

      // Y runs.
      for (x = 0; x < width; x++) {
        h = 0;

        badness[0] = 0;

        for (b = 0, y = 0; y < width; y++) {
          b1 = buffer[x + (width * y)];

          if (b === b1) {
            badness[h]++;
          } else {
            badness[++h] = 1;
          }

          b = b1;
        }

        bad += this._getBadness(h);
      }

      return bad;
    },

    _convertBitStream: function(length) {
      var bit, i;
      var ecc = this._ecc;
      var version = this._version;

      // Convert string to bit stream. 8-bit data to QR-coded 8-bit data (numeric, alphanumeric, or kanji not supported).
      for (i = 0; i < length; i++) {
        ecc[i] = this._value.charCodeAt(i);
      }

      var stringBuffer = this._stringBuffer = ecc.slice();
      var maxLength = this._calculateMaxLength();

      if (length >= maxLength - 2) {
        length = maxLength - 2;

        if (version > 9) {
          length--;
        }
      }

      // Shift and re-pack to insert length prefix.
      var index = length;

      if (version > 9) {
        stringBuffer[index + 2] = 0;
        stringBuffer[index + 3] = 0;

        while (index--) {
          bit = stringBuffer[index];

          stringBuffer[index + 3] |= 255 & (bit << 4);
          stringBuffer[index + 2] = bit >> 4;
        }

        stringBuffer[2] |= 255 & (length << 4);
        stringBuffer[1] = length >> 4;
        stringBuffer[0] = 0x40 | (length >> 12);
      } else {
        stringBuffer[index + 1] = 0;
        stringBuffer[index + 2] = 0;

        while (index--) {
          bit = stringBuffer[index];

          stringBuffer[index + 2] |= 255 & (bit << 4);
          stringBuffer[index + 1] = bit >> 4;
        }

        stringBuffer[1] |= 255 & (length << 4);
        stringBuffer[0] = 0x40 | (length >> 4);
      }

      // Fill to end with pad pattern.
      index = length + 3 - (version < 10);

      while (index < maxLength) {
        stringBuffer[index++] = 0xec;
        stringBuffer[index++] = 0x11;
      }
    },

    _getBadness: function(length) {
      var i;
      var badRuns = 0;
      var badness = this._badness;

      for (i = 0; i <= length; i++) {
        if (badness[i] >= 5) {
          badRuns += Frame.N1 + badness[i] - 5;
        }
      }

      // FBFFFBF as in finder.
      for (i = 3; i < length - 1; i += 2) {
        if (badness[i - 2] === badness[i + 2] &&
          badness[i + 2] === badness[i - 1] &&
          badness[i - 1] === badness[i + 1] &&
          badness[i - 1] * 3 === badness[i] &&
          // Background around the foreground pattern? Not part of the specs.
          (badness[i - 3] === 0 || i + 3 > length ||
          badness[i - 3] * 3 >= badness[i] * 4 ||
          badness[i + 3] * 3 >= badness[i] * 4)) {
          badRuns += Frame.N3;
        }
      }

      return badRuns;
    },

    _finish: function() {
      // Save pre-mask copy of frame.
      this._stringBuffer = this.buffer.slice();

      var currentMask, i;
      var bit = 0;
      var mask = 30000;

      /*
       * Using for instead of while since in original Arduino code if an early mask was "good enough" it wouldn't try for
       * a better one since they get more complex and take longer.
       */
      for (i = 0; i < 8; i++) {
        // Returns foreground-background imbalance.
        this._applyMask(i);

        currentMask = this._checkBadness();

        // Is current mask better than previous best?
        if (currentMask < mask) {
          mask = currentMask;
          bit = i;
        }

        // Don't increment "i" to a void redoing mask.
        if (bit === 7) {
          break;
        }

        // Reset for next pass.
        this.buffer = this._stringBuffer.slice();
      }

      // Redo best mask as none were "good enough" (i.e. last wasn't bit).
      if (bit !== i) {
        this._applyMask(bit);
      }

      // Add in final mask/ECC level bytes.
      mask = ErrorCorrection_1.FINAL_FORMAT[bit + (this._level - 1 << 3)];

      var buffer = this.buffer;
      var width = this.width;

      // Low byte.
      for (i = 0; i < 8; i++, mask >>= 1) {
        if (mask & 1) {
          buffer[width - 1 - i + (width * 8)] = 1;

          if (i < 6) {
            buffer[8 + (width * i)] = 1;
          } else {
            buffer[8 + (width * (i + 1))] = 1;
          }
        }
      }

      // High byte.
      for (i = 0; i < 7; i++, mask >>= 1) {
        if (mask & 1) {
          buffer[8 + (width * (width - 7 + i))] = 1;

          if (i) {
            buffer[6 - i + (width * 8)] = 1;
          } else {
            buffer[7 + (width * 8)] = 1;
          }
        }
      }
    },

    _interleaveBlocks: function() {
      var i, j;
      var dataBlock = this._dataBlock;
      var ecc = this._ecc;
      var eccBlock = this._eccBlock;
      var k = 0;
      var maxLength = this._calculateMaxLength();
      var neccBlock1 = this._neccBlock1;
      var neccBlock2 = this._neccBlock2;
      var stringBuffer = this._stringBuffer;

      for (i = 0; i < dataBlock; i++) {
        for (j = 0; j < neccBlock1; j++) {
          ecc[k++] = stringBuffer[i + (j * dataBlock)];
        }

        for (j = 0; j < neccBlock2; j++) {
          ecc[k++] = stringBuffer[(neccBlock1 * dataBlock) + i + (j * (dataBlock + 1))];
        }
      }

      for (j = 0; j < neccBlock2; j++) {
        ecc[k++] = stringBuffer[(neccBlock1 * dataBlock) + i + (j * (dataBlock + 1))];
      }

      for (i = 0; i < eccBlock; i++) {
        for (j = 0; j < neccBlock1 + neccBlock2; j++) {
          ecc[k++] = stringBuffer[maxLength + i + (j * eccBlock)];
        }
      }

      this._stringBuffer = ecc;
    },

    _insertAlignments: function() {
      var i, x, y;
      var version = this._version;
      var width = this.width;

      if (version > 1) {
        i = Alignment_1.BLOCK[version];
        y = width - 7;

        for (;;) {
          x = width - 7;

          while (x > i - 3) {
            this._addAlignment(x, y);

            if (x < i) {
              break;
            }

            x -= i;
          }

          if (y <= i + 9) {
            break;
          }

          y -= i;

          this._addAlignment(6, y);
          this._addAlignment(y, 6);
        }
      }
    },

    _insertFinders: function() {
      var i, j, x, y;
      var buffer = this.buffer;
      var width = this.width;

      for (i = 0; i < 3; i++) {
        j = 0;
        y = 0;

        if (i === 1) {
          j = width - 7;
        }
        if (i === 2) {
          y = width - 7;
        }

        buffer[y + 3 + (width * (j + 3))] = 1;

        for (x = 0; x < 6; x++) {
          buffer[y + x + (width * j)] = 1;
          buffer[y + (width * (j + x + 1))] = 1;
          buffer[y + 6 + (width * (j + x))] = 1;
          buffer[y + x + 1 + (width * (j + 6))] = 1;
        }

        for (x = 1; x < 5; x++) {
          this._setMask(y + x, j + 1);
          this._setMask(y + 1, j + x + 1);
          this._setMask(y + 5, j + x);
          this._setMask(y + x + 1, j + 5);
        }

        for (x = 2; x < 4; x++) {
          buffer[y + x + (width * (j + 2))] = 1;
          buffer[y + 2 + (width * (j + x + 1))] = 1;
          buffer[y + 4 + (width * (j + x))] = 1;
          buffer[y + x + 1 + (width * (j + 4))] = 1;
        }
      }
    },

    _insertTimingGap: function() {
      var x, y;
      var width = this.width;

      for (y = 0; y < 7; y++) {
        this._setMask(7, y);
        this._setMask(width - 8, y);
        this._setMask(7, y + width - 7);
      }

      for (x = 0; x < 8; x++) {
        this._setMask(x, 7);
        this._setMask(x + width - 8, 7);
        this._setMask(x, width - 8);
      }
    },

    _insertTimingRowAndColumn: function() {
      var x;
      var buffer = this.buffer;
      var width = this.width;

      for (x = 0; x < width - 14; x++) {
        if (x & 1) {
          this._setMask(8 + x, 6);
          this._setMask(6, 8 + x);
        } else {
          buffer[8 + x + (width * 6)] = 1;
          buffer[6 + (width * (8 + x))] = 1;
        }
      }
    },

    _insertVersion: function() {
      var i, j, x, y;
      var buffer = this.buffer;
      var version = this._version;
      var width = this.width;

      if (version > 6) {
        i = Version_1.BLOCK[version - 7];
        j = 17;

        for (x = 0; x < 6; x++) {
          for (y = 0; y < 3; y++, j--) {
            if (1 & (j > 11 ? version >> j - 12 : i >> j)) {
              buffer[5 - x + (width * (2 - y + width - 11))] = 1;
              buffer[2 - y + width - 11 + (width * (5 - x))] = 1;
            } else {
              this._setMask(5 - x, 2 - y + width - 11);
              this._setMask(2 - y + width - 11, 5 - x);
            }
          }
        }
      }
    },

    _isMasked: function(x, y) {
      var bit = Frame._getMaskBit(x, y);

      return this._mask[bit] === 1;
    },

    _pack: function() {
      var bit, i, j;
      var k = 1;
      var v = 1;
      var width = this.width;
      var x = width - 1;
      var y = width - 1;

      // Interleaved data and ECC codes.
      var length = ((this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2)) + this._neccBlock2;

      for (i = 0; i < length; i++) {
        bit = this._stringBuffer[i];

        for (j = 0; j < 8; j++, bit <<= 1) {
          if (0x80 & bit) {
            this.buffer[x + (width * y)] = 1;
          }

          // Find next fill position.
          do {
            if (v) {
              x--;
            } else {
              x++;

              if (k) {
                if (y !== 0) {
                  y--;
                } else {
                  x -= 2;
                  k = !k;

                  if (x === 6) {
                    x--;
                    y = 9;
                  }
                }
              } else if (y !== width - 1) {
                y++;
              } else {
                x -= 2;
                k = !k;

                if (x === 6) {
                  x--;
                  y -= 8;
                }
              }
            }

            v = !v;
          } while (this._isMasked(x, y));
        }
      }
    },

    _reverseMask: function() {
      var x, y;
      var width = this.width;

      for (x = 0; x < 9; x++) {
        this._setMask(x, 8);
      }

      for (x = 0; x < 8; x++) {
        this._setMask(x + width - 8, 8);
        this._setMask(8, x);
      }

      for (y = 0; y < 7; y++) {
        this._setMask(8, y + width - 7);
      }
    },

    _setMask: function(x, y) {
      var bit = Frame._getMaskBit(x, y);

      this._mask[bit] = 1;
    },

    _syncMask: function() {
      var x, y;
      var width = this.width;

      for (y = 0; y < width; y++) {
        for (x = 0; x <= y; x++) {
          if (this.buffer[x + (width * y)]) {
            this._setMask(x, y);
          }
        }
      }
    }

  }, {

    _createArray: function(length) {
      var i;
      var array = [];

      for (i = 0; i < length; i++) {
        array[i] = 0;
      }

      return array;
    },

    _getMaskBit: function(x, y) {
      var bit;

      if (x > y) {
        bit = x;
        x = y;
        y = bit;
      }

      bit = y;
      bit += y * y;
      bit >>= 1;
      bit += x;

      return bit;
    },

    _modN: function(x) {
      while (x >= 255) {
        x -= 255;
        x = (x >> 8) + (x & 255);
      }

      return x;
    },

    // *Badness* coefficients.
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10

  });

  var Frame_1 = Frame;

  /**
   * The options used by {@link Frame}.
   *
   * @typedef {Object} Frame~Options
   * @property {string} level - The ECC level to be used.
   * @property {string} value - The value to be encoded.
   */

  /**
   * An implementation of {@link Renderer} for working with <code>img</code> elements.
   *
   * This depends on {@link CanvasRenderer} being executed first as this implementation simply applies the data URL from
   * the rendered <code>canvas</code> element as the <code>src</code> for the <code>img</code> element being rendered.
   *
   * @public
   * @class
   * @extends Renderer
   */
  var ImageRenderer = Renderer_1.extend({

    /**
     * @override
     */
    draw: function() {
      this.element.src = this.qrious.toDataURL();
    },

    /**
     * @override
     */
    reset: function() {
      this.element.src = '';
    },

    /**
     * @override
     */
    resize: function() {
      var element = this.element;

      element.width = element.height = this.qrious.size;
    }

  });

  var ImageRenderer_1 = ImageRenderer;

  /**
   * Defines an available option while also configuring how values are applied to the target object.
   *
   * Optionally, a default value can be specified as well a value transformer for greater control over how the option
   * value is applied.
   *
   * If no value transformer is specified, then any specified option will be applied directly. All values are maintained
   * on the target object itself as a field using the option name prefixed with a single underscore.
   *
   * When an option is specified as modifiable, the {@link OptionManager} will be required to include a setter for the
   * property that is defined on the target object that uses the option name.
   *
   * @param {string} name - the name to be used
   * @param {boolean} [modifiable] - <code>true</code> if the property defined on target objects should include a setter;
   * otherwise <code>false</code>
   * @param {*} [defaultValue] - the default value to be used
   * @param {Option~ValueTransformer} [valueTransformer] - the value transformer to be used
   * @public
   * @class
   * @extends Nevis
   */
  var Option = lite.extend(function(name, modifiable, defaultValue, valueTransformer) {
    /**
     * The name for this {@link Option}.
     *
     * @public
     * @type {string}
     * @memberof Option#
     */
    this.name = name;

    /**
     * Whether a setter should be included on the property defined on target objects for this {@link Option}.
     *
     * @public
     * @type {boolean}
     * @memberof Option#
     */
    this.modifiable = Boolean(modifiable);

    /**
     * The default value for this {@link Option}.
     *
     * @public
     * @type {*}
     * @memberof Option#
     */
    this.defaultValue = defaultValue;

    this._valueTransformer = valueTransformer;
  }, {

    /**
     * Transforms the specified <code>value</code> so that it can be applied for this {@link Option}.
     *
     * If a value transformer has been specified for this {@link Option}, it will be called upon to transform
     * <code>value</code>. Otherwise, <code>value</code> will be returned directly.
     *
     * @param {*} value - the value to be transformed
     * @return {*} The transformed value or <code>value</code> if no value transformer is specified.
     * @public
     * @memberof Option#
     */
    transform: function(value) {
      var transformer = this._valueTransformer;
      if (typeof transformer === 'function') {
        return transformer(value, this);
      }

      return value;
    }

  });

  var Option_1 = Option;

  /**
   * Returns a transformed value for the specified <code>value</code> to be applied for the <code>option</code> provided.
   *
   * @callback Option~ValueTransformer
   * @param {*} value - the value to be transformed
   * @param {Option} option - the {@link Option} for which <code>value</code> is being transformed
   * @return {*} The transform value.
   */

  /**
   * Contains utility methods that are useful throughout the library.
   *
   * @public
   * @class
   * @extends Nevis
   */
  var Utilities = lite.extend(null, {

    /**
     * Returns the absolute value of a given number.
     *
     * This method is simply a convenient shorthand for <code>Math.abs</code> while ensuring that nulls are returned as
     * <code>null</code> instead of zero.
     *
     * @param {number} value - the number whose absolute value is to be returned
     * @return {number} The absolute value of <code>value</code> or <code>null</code> if <code>value</code> is
     * <code>null</code>.
     * @public
     * @static
     * @memberof Utilities
     */
    abs: function(value) {
      return value != null ? Math.abs(value) : null;
    },

    /**
     * Returns whether the specified <code>object</code> has a property with the specified <code>name</code> as an own
     * (not inherited) property.
     *
     * @param {Object} object - the object on which the property is to be checked
     * @param {string} name - the name of the property to be checked
     * @return {boolean} <code>true</code> if <code>object</code> has an own property with <code>name</code>.
     * @public
     * @static
     * @memberof Utilities
     */
    hasOwn: function(object, name) {
      return Object.prototype.hasOwnProperty.call(object, name);
    },

    /**
     * A non-operation method that does absolutely nothing.
     *
     * @return {void}
     * @public
     * @static
     * @memberof Utilities
     */
    noop: function() {},

    /**
     * Transforms the specified <code>string</code> to upper case while remaining null-safe.
     *
     * @param {string} string - the string to be transformed to upper case
     * @return {string} <code>string</code> transformed to upper case if <code>string</code> is not <code>null</code>.
     * @public
     * @static
     * @memberof Utilities
     */
    toUpperCase: function(string) {
      return string != null ? string.toUpperCase() : null;
    }

  });

  var Utilities_1 = Utilities;

  /**
   * Manages multiple {@link Option} instances that are intended to be used by multiple implementations.
   *
   * Although the option definitions are shared between targets, the values are maintained on the targets themselves.
   *
   * @param {Option[]} options - the options to be used
   * @public
   * @class
   * @extends Nevis
   */
  var OptionManager = lite.extend(function(options) {
    /**
     * The available options for this {@link OptionManager}.
     *
     * @public
     * @type {Object.<string, Option>}
     * @memberof OptionManager#
     */
    this.options = {};

    options.forEach(function(option) {
      this.options[option.name] = option;
    }, this);
  }, {

    /**
     * Returns whether an option with the specified <code>name</code> is available.
     *
     * @param {string} name - the name of the {@link Option} whose existence is to be checked
     * @return {boolean} <code>true</code> if an {@link Option} exists with <code>name</code>; otherwise
     * <code>false</code>.
     * @public
     * @memberof OptionManager#
     */
    exists: function(name) {
      return this.options[name] != null;
    },

    /**
     * Returns the value of the option with the specified <code>name</code> on the <code>target</code> object provided.
     *
     * @param {string} name - the name of the {@link Option} whose value on <code>target</code> is to be returned
     * @param {Object} target - the object from which the value of the named {@link Option} is to be returned
     * @return {*} The value of the {@link Option} with <code>name</code> on <code>target</code>.
     * @public
     * @memberof OptionManager#
     */
    get: function(name, target) {
      return OptionManager._get(this.options[name], target);
    },

    /**
     * Returns a copy of all of the available options on the <code>target</code> object provided.
     *
     * @param {Object} target - the object from which the option name/value pairs are to be returned
     * @return {Object.<string, *>} A hash containing the name/value pairs of all options on <code>target</code>.
     * @public
     * @memberof OptionManager#
     */
    getAll: function(target) {
      var name;
      var options = this.options;
      var result = {};

      for (name in options) {
        if (Utilities_1.hasOwn(options, name)) {
          result[name] = OptionManager._get(options[name], target);
        }
      }

      return result;
    },

    /**
     * Initializes the available options for the <code>target</code> object provided and then applies the initial values
     * within the speciifed <code>options</code>.
     *
     * This method will throw an error if any of the names within <code>options</code> does not match an available option.
     *
     * This involves setting the default values and defining properties for all of the available options on
     * <code>target</code> before finally calling {@link OptionMananger#setAll} with <code>options</code> and
     * <code>target</code>. Any options that are configured to be modifiable will have a setter included in their defined
     * property that will allow its corresponding value to be modified.
     *
     * If a change handler is specified, it will be called whenever the value changes on <code>target</code> for a
     * modifiable option, but only when done so via the defined property's setter.
     *
     * @param {Object.<string, *>} options - the name/value pairs of the initial options to be set
     * @param {Object} target - the object on which the options are to be initialized
     * @param {Function} [changeHandler] - the function to be called whenever the value of an modifiable option changes on
     * <code>target</code>
     * @return {void}
     * @throws {Error} If <code>options</code> contains an invalid option name.
     * @public
     * @memberof OptionManager#
     */
    init: function(options, target, changeHandler) {
      if (typeof changeHandler !== 'function') {
        changeHandler = Utilities_1.noop;
      }

      var name, option;

      for (name in this.options) {
        if (Utilities_1.hasOwn(this.options, name)) {
          option = this.options[name];

          OptionManager._set(option, option.defaultValue, target);
          OptionManager._createAccessor(option, target, changeHandler);
        }
      }

      this._setAll(options, target, true);
    },

    /**
     * Sets the value of the option with the specified <code>name</code> on the <code>target</code> object provided to
     * <code>value</code>.
     *
     * This method will throw an error if <code>name</code> does not match an available option or matches an option that
     * cannot be modified.
     *
     * If <code>value</code> is <code>null</code> and the {@link Option} has a default value configured, then that default
     * value will be used instead. If the {@link Option} also has a value transformer configured, it will be used to
     * transform whichever value was determined to be used.
     *
     * This method returns whether the value of the underlying field on <code>target</code> was changed as a result.
     *
     * @param {string} name - the name of the {@link Option} whose value is to be set
     * @param {*} value - the value to be set for the named {@link Option} on <code>target</code>
     * @param {Object} target - the object on which <code>value</code> is to be set for the named {@link Option}
     * @return {boolean} <code>true</code> if the underlying field on <code>target</code> was changed; otherwise
     * <code>false</code>.
     * @throws {Error} If <code>name</code> is invalid or is for an option that cannot be modified.
     * @public
     * @memberof OptionManager#
     */
    set: function(name, value, target) {
      return this._set(name, value, target);
    },

    /**
     * Sets all of the specified <code>options</code> on the <code>target</code> object provided to their corresponding
     * values.
     *
     * This method will throw an error if any of the names within <code>options</code> does not match an available option
     * or matches an option that cannot be modified.
     *
     * If any value within <code>options</code> is <code>null</code> and the corresponding {@link Option} has a default
     * value configured, then that default value will be used instead. If an {@link Option} also has a value transformer
     * configured, it will be used to transform whichever value was determined to be used.
     *
     * This method returns whether the value for any of the underlying fields on <code>target</code> were changed as a
     * result.
     *
     * @param {Object.<string, *>} options - the name/value pairs of options to be set
     * @param {Object} target - the object on which the options are to be set
     * @return {boolean} <code>true</code> if any of the underlying fields on <code>target</code> were changed; otherwise
     * <code>false</code>.
     * @throws {Error} If <code>options</code> contains an invalid option name or an option that cannot be modiifed.
     * @public
     * @memberof OptionManager#
     */
    setAll: function(options, target) {
      return this._setAll(options, target);
    },

    _set: function(name, value, target, allowUnmodifiable) {
      var option = this.options[name];
      if (!option) {
        throw new Error('Invalid option: ' + name);
      }
      if (!option.modifiable && !allowUnmodifiable) {
        throw new Error('Option cannot be modified: ' + name);
      }

      return OptionManager._set(option, value, target);
    },

    _setAll: function(options, target, allowUnmodifiable) {
      if (!options) {
        return false;
      }

      var name;
      var changed = false;

      for (name in options) {
        if (Utilities_1.hasOwn(options, name) && this._set(name, options[name], target, allowUnmodifiable)) {
          changed = true;
        }
      }

      return changed;
    }

  }, {

    _createAccessor: function(option, target, changeHandler) {
      var descriptor = {
        get: function() {
          return OptionManager._get(option, target);
        }
      };

      if (option.modifiable) {
        descriptor.set = function(value) {
          if (OptionManager._set(option, value, target)) {
            changeHandler(value, option);
          }
        };
      }

      Object.defineProperty(target, option.name, descriptor);
    },

    _get: function(option, target) {
      return target['_' + option.name];
    },

    _set: function(option, value, target) {
      var fieldName = '_' + option.name;
      var oldValue = target[fieldName];
      var newValue = option.transform(value != null ? value : option.defaultValue);

      target[fieldName] = newValue;

      return newValue !== oldValue;
    }

  });

  var OptionManager_1 = OptionManager;

  /**
   * Called whenever the value of a modifiable {@link Option} is changed on a target object via the defined property's
   * setter.
   *
   * @callback OptionManager~ChangeHandler
   * @param {*} value - the new value for <code>option</code> on the target object
   * @param {Option} option - the modifable {@link Option} whose value has changed on the target object.
   * @return {void}
   */

  /**
   * A basic manager for {@link Service} implementations that are mapped to simple names.
   *
   * @public
   * @class
   * @extends Nevis
   */
  var ServiceManager = lite.extend(function() {
    this._services = {};
  }, {

    /**
     * Returns the {@link Service} being managed with the specified <code>name</code>.
     *
     * @param {string} name - the name of the {@link Service} to be returned
     * @return {Service} The {@link Service} is being managed with <code>name</code>.
     * @throws {Error} If no {@link Service} is being managed with <code>name</code>.
     * @public
     * @memberof ServiceManager#
     */
    getService: function(name) {
      var service = this._services[name];
      if (!service) {
        throw new Error('Service is not being managed with name: ' + name);
      }

      return service;
    },

    /**
     * Sets the {@link Service} implementation to be managed for the specified <code>name</code> to the
     * <code>service</code> provided.
     *
     * @param {string} name - the name of the {@link Service} to be managed with <code>name</code>
     * @param {Service} service - the {@link Service} implementation to be managed
     * @return {void}
     * @throws {Error} If a {@link Service} is already being managed with the same <code>name</code>.
     * @public
     * @memberof ServiceManager#
     */
    setService: function(name, service) {
      if (this._services[name]) {
        throw new Error('Service is already managed with name: ' + name);
      }

      if (service) {
        this._services[name] = service;
      }
    }

  });

  var ServiceManager_1 = ServiceManager;

  var optionManager = new OptionManager_1([
    new Option_1('background', true, 'white'),
    new Option_1('backgroundAlpha', true, 1, Utilities_1.abs),
    new Option_1('element'),
    new Option_1('foreground', true, 'black'),
    new Option_1('foregroundAlpha', true, 1, Utilities_1.abs),
    new Option_1('level', true, 'L', Utilities_1.toUpperCase),
    new Option_1('mime', true, 'image/png'),
    new Option_1('padding', true, null, Utilities_1.abs),
    new Option_1('size', true, 100, Utilities_1.abs),
    new Option_1('value', true, '')
  ]);
  var serviceManager = new ServiceManager_1();

  /**
   * Enables configuration of a QR code generator which uses HTML5 <code>canvas</code> for rendering.
   *
   * @param {QRious~Options} [options] - the options to be used
   * @throws {Error} If any <code>options</code> are invalid.
   * @public
   * @class
   * @extends Nevis
   */
  var QRious = lite.extend(function(options) {
    optionManager.init(options, this, this.update.bind(this));

    var element = optionManager.get('element', this);
    var elementService = serviceManager.getService('element');
    var canvas = element && elementService.isCanvas(element) ? element : elementService.createCanvas();
    var image = element && elementService.isImage(element) ? element : elementService.createImage();

    this._canvasRenderer = new CanvasRenderer_1(this, canvas, true);
    this._imageRenderer = new ImageRenderer_1(this, image, image === element);

    this.update();
  }, {

    /**
     * Returns all of the options configured for this {@link QRious}.
     *
     * Any changes made to the returned object will not be reflected in the options themselves or their corresponding
     * underlying fields.
     *
     * @return {Object.<string, *>} A copy of the applied options.
     * @public
     * @memberof QRious#
     */
    get: function() {
      return optionManager.getAll(this);
    },

    /**
     * Sets all of the specified <code>options</code> and automatically updates this {@link QRious} if any of the
     * underlying fields are changed as a result.
     *
     * This is the preferred method for updating multiple options at one time to avoid unnecessary updates between
     * changes.
     *
     * @param {QRious~Options} options - the options to be set
     * @return {void}
     * @throws {Error} If any <code>options</code> are invalid or cannot be modified.
     * @public
     * @memberof QRious#
     */
    set: function(options) {
      if (optionManager.setAll(options, this)) {
        this.update();
      }
    },

    /**
     * Returns the image data URI for the generated QR code using the <code>mime</code> provided.
     *
     * @param {string} [mime] - the MIME type for the image
     * @return {string} The image data URI for the QR code.
     * @public
     * @memberof QRious#
     */
    toDataURL: function(mime) {
      return this.canvas.toDataURL(mime || this.mime);
    },

    /**
     * Updates this {@link QRious} by generating a new {@link Frame} and re-rendering the QR code.
     *
     * @return {void}
     * @protected
     * @memberof QRious#
     */
    update: function() {
      var frame = new Frame_1({
        level: this.level,
        value: this.value
      });

      this._canvasRenderer.render(frame);
      this._imageRenderer.render(frame);
    }

  }, {

    /**
     * Configures the <code>service</code> provided to be used by all {@link QRious} instances.
     *
     * @param {Service} service - the {@link Service} to be configured
     * @return {void}
     * @throws {Error} If a {@link Service} has already been configured with the same name.
     * @public
     * @static
     * @memberof QRious
     */
    use: function(service) {
      serviceManager.setService(service.getName(), service);
    }

  });

  Object.defineProperties(QRious.prototype, {

    canvas: {
      /**
       * Returns the <code>canvas</code> element being used to render the QR code for this {@link QRious}.
       *
       * @return {*} The <code>canvas</code> element.
       * @public
       * @memberof QRious#
       * @alias canvas
       */
      get: function() {
        return this._canvasRenderer.getElement();
      }
    },

    image: {
      /**
       * Returns the <code>img</code> element being used to render the QR code for this {@link QRious}.
       *
       * @return {*} The <code>img</code> element.
       * @public
       * @memberof QRious#
       * @alias image
       */
      get: function() {
        return this._imageRenderer.getElement();
      }
    }

  });

  var QRious_1$2 = QRious;

  /**
   * The options used by {@link QRious}.
   *
   * @typedef {Object} QRious~Options
   * @property {string} [background="white"] - The background color to be applied to the QR code.
   * @property {number} [backgroundAlpha=1] - The background alpha to be applied to the QR code.
   * @property {*} [element] - The element to be used to render the QR code which may either be an <code>canvas</code> or
   * <code>img</code>. The element(s) will be created if needed.
   * @property {string} [foreground="black"] - The foreground color to be applied to the QR code.
   * @property {number} [foregroundAlpha=1] - The foreground alpha to be applied to the QR code.
   * @property {string} [level="L"] - The error correction level to be applied to the QR code.
   * @property {string} [mime="image/png"] - The MIME type to be used to render the image for the QR code.
   * @property {number} [padding] - The padding for the QR code in pixels.
   * @property {number} [size=100] - The size of the QR code in pixels.
   * @property {string} [value=""] - The value to be encoded within the QR code.
   */

  var index = QRious_1$2;

  /**
   * Defines a service contract that must be met by all implementations.
   *
   * @public
   * @class
   * @extends Nevis
   */
  var Service = lite.extend({

    /**
     * Returns the name of this {@link Service}.
     *
     * @return {string} The service name.
     * @public
     * @abstract
     * @memberof Service#
     */
    getName: function() {}

  });

  var Service_1 = Service;

  /**
   * A service for working with elements.
   *
   * @public
   * @class
   * @extends Service
   */
  var ElementService = Service_1.extend({

    /**
     * Creates an instance of a canvas element.
     *
     * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
     *
     * @return {*} The newly created canvas element.
     * @public
     * @abstract
     * @memberof ElementService#
     */
    createCanvas: function() {},

    /**
     * Creates an instance of a image element.
     *
     * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
     *
     * @return {*} The newly created image element.
     * @public
     * @abstract
     * @memberof ElementService#
     */
    createImage: function() {},

    /**
     * @override
     */
    getName: function() {
      return 'element';
    },

    /**
     * Returns whether the specified <code>element</code> is a canvas.
     *
     * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
     *
     * @param {*} element - the element to be checked
     * @return {boolean} <code>true</code> if <code>element</code> is a canvas; otherwise <code>false</code>.
     * @public
     * @abstract
     * @memberof ElementService#
     */
    isCanvas: function(element) {},

    /**
     * Returns whether the specified <code>element</code> is an image.
     *
     * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
     *
     * @param {*} element - the element to be checked
     * @return {boolean} <code>true</code> if <code>element</code> is an image; otherwise <code>false</code>.
     * @public
     * @abstract
     * @memberof ElementService#
     */
    isImage: function(element) {}

  });

  var ElementService_1 = ElementService;

  /**
   * An implementation of {@link ElementService} intended for use within a browser environment.
   *
   * @public
   * @class
   * @extends ElementService
   */
  var BrowserElementService = ElementService_1.extend({

    /**
     * @override
     */
    createCanvas: function() {
      return document.createElement('canvas');
    },

    /**
     * @override
     */
    createImage: function() {
      return document.createElement('img');
    },

    /**
     * @override
     */
    isCanvas: function(element) {
      return element instanceof HTMLCanvasElement;
    },

    /**
     * @override
     */
    isImage: function(element) {
      return element instanceof HTMLImageElement;
    }

  });

  var BrowserElementService_1 = BrowserElementService;

  index.use(new BrowserElementService_1());

  var QRious_1 = index;

  return QRious_1;

})));

//# sourceMappingURL=qrious.js.map

/* SeedRandom */
/*
Copyright 2019 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (global, pool, math) {
  //
  // The following constants are related to IEEE 754 limits.
  //
  
  var width = 256,        // each RC4 output is 0 <= x < 256
      chunks = 6,         // at least six RC4 outputs for each double
      digits = 52,        // there are 52 significant digits in a double
      rngname = 'random', // rngname: name for Math.random and Math.seedrandom
      startdenom = math.pow(width, chunks),
      significance = math.pow(2, digits),
      overflow = significance * 2,
      mask = width - 1,
      nodecrypto;         // node.js crypto module, initialized at the bottom.
  
  //
  // seedrandom()
  // This is the seedrandom function described above.
  //
  function seedrandom(seed, options, callback) {
    var key = [];
    options = (options == true) ? { entropy: true } : (options || {});
  
    // Flatten the seed string or build one from local entropy if needed.
    var shortseed = mixkey(flatten(
      options.entropy ? [seed, tostring(pool)] :
      (seed == null) ? autoseed() : seed, 3), key);
  
    // Use the seed to initialize an ARC4 generator.
    var arc4 = new ARC4(key);
  
    // This function returns a random double in [0, 1) that contains
    // randomness in every bit of the mantissa of the IEEE 754 value.
    var prng = function() {
      var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
          d = startdenom,                 //   and denominator d = 2 ^ 48.
          x = 0;                          //   and no 'extra last byte'.
      while (n < significance) {          // Fill up all significant digits by
        n = (n + x) * width;              //   shifting numerator and
        d *= width;                       //   denominator and generating a
        x = arc4.g(1);                    //   new least-significant-byte.
      }
      while (n >= overflow) {             // To avoid rounding up, before adding
        n /= 2;                           //   last byte, shift everything
        d /= 2;                           //   right using integer math until
        x >>>= 1;                         //   we have exactly the desired bits.
      }
      return (n + x) / d;                 // Form the number within [0, 1).
    };
  
    prng.int32 = function() { return arc4.g(4) | 0; }
    prng.quick = function() { return arc4.g(4) / 0x100000000; }
    prng.double = prng;
  
    // Mix the randomness into accumulated entropy.
    mixkey(tostring(arc4.S), pool);
  
    // Calling convention: what to return as a function of prng, seed, is_math.
    return (options.pass || callback ||
        function(prng, seed, is_math_call, state) {
          if (state) {
            // Load the arc4 state from the given state if it has an S array.
            if (state.S) { copy(state, arc4); }
            // Only provide the .state method if requested via options.state.
            prng.state = function() { return copy(arc4, {}); }
          }
  
          // If called as a method of Math (Math.seedrandom()), mutate
          // Math.random because that is how seedrandom.js has worked since v1.0.
          if (is_math_call) { math[rngname] = prng; return seed; }
  
          // Otherwise, it is a newer calling convention, so return the
          // prng directly.
          else return prng;
        })(
    prng,
    shortseed,
    'global' in options ? options.global : (this == math),
    options.state);
  }
  
  //
  // ARC4
  //
  // An ARC4 implementation.  The constructor takes a key in the form of
  // an array of at most (width) integers that should be 0 <= x < (width).
  //
  // The g(count) method returns a pseudorandom integer that concatenates
  // the next (count) outputs from ARC4.  Its return value is a number x
  // that is in the range 0 <= x < (width ^ count).
  //
  function ARC4(key) {
    var t, keylen = key.length,
        me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];
  
    // The empty key [] is treated as [0].
    if (!keylen) { key = [keylen++]; }
  
    // Set up S using the standard key scheduling algorithm.
    while (i < width) {
      s[i] = i++;
    }
    for (i = 0; i < width; i++) {
      s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
      s[j] = t;
    }
  
    // The "g" method returns the next (count) outputs as one number.
    (me.g = function(count) {
      // Using instance members instead of closure state nearly doubles speed.
      var t, r = 0,
          i = me.i, j = me.j, s = me.S;
      while (count--) {
        t = s[i = mask & (i + 1)];
        r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
      }
      me.i = i; me.j = j;
      return r;
      // For robust unpredictability, the function call below automatically
      // discards an initial batch of values.  This is called RC4-drop[256].
      // See http://google.com/search?q=rsa+fluhrer+response&btnI
    })(width);
  }
  
  //
  // copy()
  // Copies internal state of ARC4 to or from a plain object.
  //
  function copy(f, t) {
    t.i = f.i;
    t.j = f.j;
    t.S = f.S.slice();
    return t;
  };
  
  //
  // flatten()
  // Converts an object tree to nested arrays of strings.
  //
  function flatten(obj, depth) {
    var result = [], typ = (typeof obj), prop;
    if (depth && typ == 'object') {
      for (prop in obj) {
        try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
      }
    }
    return (result.length ? result : typ == 'string' ? obj : obj + '\0');
  }
  
  //
  // mixkey()
  // Mixes a string seed into a key that is an array of integers, and
  // returns a shortened string seed that is equivalent to the result key.
  //
  function mixkey(seed, key) {
    var stringseed = seed + '', smear, j = 0;
    while (j < stringseed.length) {
      key[mask & j] =
        mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
    }
    return tostring(key);
  }
  
  //
  // autoseed()
  // Returns an object for autoseeding, using window.crypto and Node crypto
  // module if available.
  //
  function autoseed() {
    try {
      var out;
      if (nodecrypto && (out = nodecrypto.randomBytes)) {
        // The use of 'out' to remember randomBytes makes tight minified code.
        out = out(width);
      } else {
        out = new Uint8Array(width);
        (global.crypto || global.msCrypto).getRandomValues(out);
      }
      return tostring(out);
    } catch (e) {
      var browser = global.navigator,
          plugins = browser && browser.plugins;
      return [+new Date, global, plugins, global.screen, tostring(pool)];
    }
  }
  
  //
  // tostring()
  // Converts an array of charcodes to a string
  //
  function tostring(a) {
    return String.fromCharCode.apply(0, a);
  }
  
  //
  // When seedrandom.js is loaded, we immediately mix a few bits
  // from the built-in RNG into the entropy pool.  Because we do
  // not want to interfere with deterministic PRNG state later,
  // seedrandom will not call math.random on its own again after
  // initialization.
  //
  mixkey(math.random(), pool);
  
  //
  // Nodejs and AMD support: export the implementation as a module using
  // either convention.
  //
  if ((typeof module) == 'object' && module.exports) {
    module.exports = seedrandom;
    // When in node.js, try using crypto package for autoseeding.
    try {
      nodecrypto = require('crypto');
    } catch (ex) {}
  } else if ((typeof define) == 'function' && define.amd) {
    define(function() { return seedrandom; });
  } else {
    // When included as a plain script, set up Math.seedrandom global.
    math['seed' + rngname] = seedrandom;
  }
  
  
  // End anonymous scope, and pass initial values.
  })(
    // global: `self` in browsers (including strict mode and web workers),
    // otherwise `this` in Node and other environments
    (typeof self !== 'undefined') ? self : this,
    [],     // pool: entropy pool starts empty
    Math    // math: package containing random, pow, and seedrandom
  );
  
/* Vanilla Picker */
/*!
 * vanilla-picker v2.12.3
 * https://vanilla-picker.js.org
 *
 * Copyright 2017-2024 Andreas Borgen (https://github.com/Sphinxxxx), Adam Brooks (https://github.com/dissimulate)
 * Released under the ISC license.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Picker = factory());
})(this, (function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  String.prototype.startsWith = String.prototype.startsWith || function (needle) {
      return this.indexOf(needle) === 0;
  };
  String.prototype.padStart = String.prototype.padStart || function (len, pad) {
      var str = this;while (str.length < len) {
          str = pad + str;
      }return str;
  };

  var colorNames = { cb: '0f8ff', tqw: 'aebd7', q: '-ffff', qmrn: '7fffd4', zr: '0ffff', bg: '5f5dc', bsq: 'e4c4', bck: '---', nch: 'ebcd', b: '--ff', bvt: '8a2be2', brwn: 'a52a2a', brw: 'deb887', ctb: '5f9ea0', hrt: '7fff-', chcT: 'd2691e', cr: '7f50', rnw: '6495ed', crns: '8dc', crms: 'dc143c', cn: '-ffff', Db: '--8b', Dcn: '-8b8b', Dgnr: 'b8860b', Dgr: 'a9a9a9', Dgrn: '-64-', Dkhk: 'bdb76b', Dmgn: '8b-8b', Dvgr: '556b2f', Drng: '8c-', Drch: '9932cc', Dr: '8b--', Dsmn: 'e9967a', Dsgr: '8fbc8f', DsTb: '483d8b', DsTg: '2f4f4f', Dtrq: '-ced1', Dvt: '94-d3', ppnk: '1493', pskb: '-bfff', mgr: '696969', grb: '1e90ff', rbrc: 'b22222', rwht: 'af0', stg: '228b22', chs: '-ff', gnsb: 'dcdcdc', st: '8f8ff', g: 'd7-', gnr: 'daa520', gr: '808080', grn: '-8-0', grnw: 'adff2f', hnw: '0fff0', htpn: '69b4', nnr: 'cd5c5c', ng: '4b-82', vr: '0', khk: '0e68c', vnr: 'e6e6fa', nrb: '0f5', wngr: '7cfc-', mnch: 'acd', Lb: 'add8e6', Lcr: '08080', Lcn: 'e0ffff', Lgnr: 'afad2', Lgr: 'd3d3d3', Lgrn: '90ee90', Lpnk: 'b6c1', Lsmn: 'a07a', Lsgr: '20b2aa', Lskb: '87cefa', LsTg: '778899', Lstb: 'b0c4de', Lw: 'e0', m: '-ff-', mgrn: '32cd32', nn: 'af0e6', mgnt: '-ff', mrn: '8--0', mqm: '66cdaa', mmb: '--cd', mmrc: 'ba55d3', mmpr: '9370db', msg: '3cb371', mmsT: '7b68ee', '': '-fa9a', mtr: '48d1cc', mmvt: 'c71585', mnLb: '191970', ntc: '5fffa', mstr: 'e4e1', mccs: 'e4b5', vjw: 'dead', nv: '--80', c: 'df5e6', v: '808-0', vrb: '6b8e23', rng: 'a5-', rngr: '45-', rch: 'da70d6', pgnr: 'eee8aa', pgrn: '98fb98', ptrq: 'afeeee', pvtr: 'db7093', ppwh: 'efd5', pchp: 'dab9', pr: 'cd853f', pnk: 'c0cb', pm: 'dda0dd', pwrb: 'b0e0e6', prp: '8-080', cc: '663399', r: '--', sbr: 'bc8f8f', rb: '4169e1', sbrw: '8b4513', smn: 'a8072', nbr: '4a460', sgrn: '2e8b57', ssh: '5ee', snn: 'a0522d', svr: 'c0c0c0', skb: '87ceeb', sTb: '6a5acd', sTgr: '708090', snw: 'afa', n: '-ff7f', stb: '4682b4', tn: 'd2b48c', t: '-8080', thst: 'd8bfd8', tmT: '6347', trqs: '40e0d0', vt: 'ee82ee', whT: '5deb3', wht: '', hts: '5f5f5', w: '-', wgrn: '9acd32' };

  function printNum(num) {
      var decs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var str = decs > 0 ? num.toFixed(decs).replace(/0+$/, '').replace(/\.$/, '') : num.toString();
      return str || '0';
  }

  var Color = function () {
      function Color(r, g, b, a) {
          classCallCheck(this, Color);


          var that = this;
          function parseString(input) {

              if (input.startsWith('hsl')) {
                  var _input$match$map = input.match(/([\-\d\.e]+)/g).map(Number),
                      _input$match$map2 = slicedToArray(_input$match$map, 4),
                      h = _input$match$map2[0],
                      s = _input$match$map2[1],
                      l = _input$match$map2[2],
                      _a = _input$match$map2[3];

                  if (_a === undefined) {
                      _a = 1;
                  }

                  h /= 360;
                  s /= 100;
                  l /= 100;
                  that.hsla = [h, s, l, _a];
              } else if (input.startsWith('rgb')) {
                  var _input$match$map3 = input.match(/([\-\d\.e]+)/g).map(Number),
                      _input$match$map4 = slicedToArray(_input$match$map3, 4),
                      _r = _input$match$map4[0],
                      _g = _input$match$map4[1],
                      _b = _input$match$map4[2],
                      _a2 = _input$match$map4[3];

                  if (_a2 === undefined) {
                      _a2 = 1;
                  }

                  that.rgba = [_r, _g, _b, _a2];
              } else {
                  if (input.startsWith('#')) {
                      that.rgba = Color.hexToRgb(input);
                  } else {
                      that.rgba = Color.nameToRgb(input) || Color.hexToRgb(input);
                  }
              }
          }

          if (r === undefined) ; else if (Array.isArray(r)) {
              this.rgba = r;
          } else if (b === undefined) {
              var color = r && '' + r;
              if (color) {
                  parseString(color.toLowerCase());
              }
          } else {
              this.rgba = [r, g, b, a === undefined ? 1 : a];
          }
      }

      createClass(Color, [{
          key: 'printRGB',
          value: function printRGB(alpha) {
              var rgb = alpha ? this.rgba : this.rgba.slice(0, 3),
                  vals = rgb.map(function (x, i) {
                  return printNum(x, i === 3 ? 3 : 0);
              });

              return alpha ? 'rgba(' + vals + ')' : 'rgb(' + vals + ')';
          }
      }, {
          key: 'printHSL',
          value: function printHSL(alpha) {
              var mults = [360, 100, 100, 1],
                  suff = ['', '%', '%', ''];

              var hsl = alpha ? this.hsla : this.hsla.slice(0, 3),
                  vals = hsl.map(function (x, i) {
                  return printNum(x * mults[i], i === 3 ? 3 : 1) + suff[i];
              });

              return alpha ? 'hsla(' + vals + ')' : 'hsl(' + vals + ')';
          }
      }, {
          key: 'printHex',
          value: function printHex(alpha) {
              var hex = this.hex;
              return alpha ? hex : hex.substring(0, 7);
          }
      }, {
          key: 'rgba',
          get: function get() {
              if (this._rgba) {
                  return this._rgba;
              }
              if (!this._hsla) {
                  throw new Error('No color is set');
              }

              return this._rgba = Color.hslToRgb(this._hsla);
          },
          set: function set(rgb) {
              if (rgb.length === 3) {
                  rgb[3] = 1;
              }

              this._rgba = rgb;
              this._hsla = null;
          }
      }, {
          key: 'rgbString',
          get: function get() {
              return this.printRGB();
          }
      }, {
          key: 'rgbaString',
          get: function get() {
              return this.printRGB(true);
          }
      }, {
          key: 'hsla',
          get: function get() {
              if (this._hsla) {
                  return this._hsla;
              }
              if (!this._rgba) {
                  throw new Error('No color is set');
              }

              return this._hsla = Color.rgbToHsl(this._rgba);
          },
          set: function set(hsl) {
              if (hsl.length === 3) {
                  hsl[3] = 1;
              }

              this._hsla = hsl;
              this._rgba = null;
          }
      }, {
          key: 'hslString',
          get: function get() {
              return this.printHSL();
          }
      }, {
          key: 'hslaString',
          get: function get() {
              return this.printHSL(true);
          }
      }, {
          key: 'hex',
          get: function get() {
              var rgb = this.rgba,
                  hex = rgb.map(function (x, i) {
                  return i < 3 ? x.toString(16) : Math.round(x * 255).toString(16);
              });

              return '#' + hex.map(function (x) {
                  return x.padStart(2, '0');
              }).join('');
          },
          set: function set(hex) {
              this.rgba = Color.hexToRgb(hex);
          }
      }], [{
          key: 'hexToRgb',
          value: function hexToRgb(input) {

              var hex = (input.startsWith('#') ? input.slice(1) : input).replace(/^(\w{3})$/, '$1F').replace(/^(\w)(\w)(\w)(\w)$/, '$1$1$2$2$3$3$4$4').replace(/^(\w{6})$/, '$1FF');

              if (!hex.match(/^([0-9a-fA-F]{8})$/)) {
                  throw new Error('Unknown hex color; ' + input);
              }

              var rgba = hex.match(/^(\w\w)(\w\w)(\w\w)(\w\w)$/).slice(1).map(function (x) {
                  return parseInt(x, 16);
              });

              rgba[3] = rgba[3] / 255;
              return rgba;
          }
      }, {
          key: 'nameToRgb',
          value: function nameToRgb(input) {

              var hash = input.toLowerCase().replace('at', 'T').replace(/[aeiouyldf]/g, '').replace('ght', 'L').replace('rk', 'D').slice(-5, 4),
                  hex = colorNames[hash];
              return hex === undefined ? hex : Color.hexToRgb(hex.replace(/\-/g, '00').padStart(6, 'f'));
          }
      }, {
          key: 'rgbToHsl',
          value: function rgbToHsl(_ref) {
              var _ref2 = slicedToArray(_ref, 4),
                  r = _ref2[0],
                  g = _ref2[1],
                  b = _ref2[2],
                  a = _ref2[3];

              r /= 255;
              g /= 255;
              b /= 255;

              var max = Math.max(r, g, b),
                  min = Math.min(r, g, b);
              var h = void 0,
                  s = void 0,
                  l = (max + min) / 2;

              if (max === min) {
                  h = s = 0;
              } else {
                  var d = max - min;
                  s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                  switch (max) {
                      case r:
                          h = (g - b) / d + (g < b ? 6 : 0);break;
                      case g:
                          h = (b - r) / d + 2;break;
                      case b:
                          h = (r - g) / d + 4;break;
                  }

                  h /= 6;
              }

              return [h, s, l, a];
          }
      }, {
          key: 'hslToRgb',
          value: function hslToRgb(_ref3) {
              var _ref4 = slicedToArray(_ref3, 4),
                  h = _ref4[0],
                  s = _ref4[1],
                  l = _ref4[2],
                  a = _ref4[3];

              var r = void 0,
                  g = void 0,
                  b = void 0;

              if (s === 0) {
                  r = g = b = l;
              } else {
                  var hue2rgb = function hue2rgb(p, q, t) {
                      if (t < 0) t += 1;
                      if (t > 1) t -= 1;
                      if (t < 1 / 6) return p + (q - p) * 6 * t;
                      if (t < 1 / 2) return q;
                      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                      return p;
                  };

                  var q = l < 0.5 ? l * (1 + s) : l + s - l * s,
                      p = 2 * l - q;

                  r = hue2rgb(p, q, h + 1 / 3);
                  g = hue2rgb(p, q, h);
                  b = hue2rgb(p, q, h - 1 / 3);
              }

              var rgba = [r * 255, g * 255, b * 255].map(Math.round);
              rgba[3] = a;

              return rgba;
          }
      }]);
      return Color;
  }();

  var EventBucket = function () {
      function EventBucket() {
          classCallCheck(this, EventBucket);

          this._events = [];
      }

      createClass(EventBucket, [{
          key: 'add',
          value: function add(target, type, handler) {
              target.addEventListener(type, handler, false);
              this._events.push({
                  target: target,
                  type: type,
                  handler: handler
              });
          }
      }, {
          key: 'remove',
          value: function remove(target, type, handler) {
              this._events = this._events.filter(function (e) {
                  var isMatch = true;
                  if (target && target !== e.target) {
                      isMatch = false;
                  }
                  if (type && type !== e.type) {
                      isMatch = false;
                  }
                  if (handler && handler !== e.handler) {
                      isMatch = false;
                  }

                  if (isMatch) {
                      EventBucket._doRemove(e.target, e.type, e.handler);
                  }
                  return !isMatch;
              });
          }
      }, {
          key: 'destroy',
          value: function destroy() {
              this._events.forEach(function (e) {
                  return EventBucket._doRemove(e.target, e.type, e.handler);
              });
              this._events = [];
          }
      }], [{
          key: '_doRemove',
          value: function _doRemove(target, type, handler) {
              target.removeEventListener(type, handler, false);
          }
      }]);
      return EventBucket;
  }();

  function parseHTML(htmlString) {

      var div = document.createElement('div');
      div.innerHTML = htmlString;
      return div.firstElementChild;
  }

  function dragTrack(eventBucket, area, callback) {
      var dragging = false;

      function clamp(val, min, max) {
          return Math.max(min, Math.min(val, max));
      }

      function onMove(e, info, starting) {
          if (starting) {
              dragging = true;
          }
          if (!dragging) {
              return;
          }

          e.preventDefault();

          var bounds = area.getBoundingClientRect(),
              w = bounds.width,
              h = bounds.height,
              x = info.clientX,
              y = info.clientY;

          var relX = clamp(x - bounds.left, 0, w),
              relY = clamp(y - bounds.top, 0, h);

          callback(relX / w, relY / h);
      }

      function onMouse(e, starting) {
          var button = e.buttons === undefined ? e.which : e.buttons;
          if (button === 1) {
              onMove(e, e, starting);
          } else {
              dragging = false;
          }
      }

      function onTouch(e, starting) {
          if (e.touches.length === 1) {
              onMove(e, e.touches[0], starting);
          } else {
              dragging = false;
          }
      }

      eventBucket.add(area, 'mousedown', function (e) {
          onMouse(e, true);
      });
      eventBucket.add(area, 'touchstart', function (e) {
          onTouch(e, true);
      });
      eventBucket.add(window, 'mousemove', onMouse);
      eventBucket.add(area, 'touchmove', onTouch);
      eventBucket.add(window, 'mouseup', function (e) {
          dragging = false;
      });
      eventBucket.add(area, 'touchend', function (e) {
          dragging = false;
      });
      eventBucket.add(area, 'touchcancel', function (e) {
          dragging = false;
      });
  }

  var BG_TRANSP = 'linear-gradient(45deg, lightgrey 25%, transparent 25%, transparent 75%, lightgrey 75%) 0 0 / 2em 2em,\n                   linear-gradient(45deg, lightgrey 25%,       white 25%,       white 75%, lightgrey 75%) 1em 1em / 2em 2em';
  var HUES = 360;

  var EVENT_KEY = 'keydown',
      EVENT_CLICK_OUTSIDE = 'mousedown',
      EVENT_TAB_MOVE = 'focusin';

  function $(selector, context) {
      return (context || document).querySelector(selector);
  }

  function stopEvent(e) {

      e.preventDefault();
      e.stopPropagation();
  }
  function onKey(bucket, target, keys, handler, stop) {
      bucket.add(target, EVENT_KEY, function (e) {
          if (keys.indexOf(e.key) >= 0) {
              if (stop) {
                  stopEvent(e);
              }
              handler(e);
          }
      });
  }

  var Picker = function () {
      function Picker(options) {
          classCallCheck(this, Picker);


          this.settings = {

              popup: 'right',
              layout: 'default',
              alpha: true,
              editor: true,
              editorFormat: 'hex',
              cancelButton: false,
              defaultColor: '#0cf'
          };

          this._events = new EventBucket();

          this.onChange = null;

          this.onDone = null;

          this.onOpen = null;

          this.onClose = null;

          this.setOptions(options);
      }

      createClass(Picker, [{
          key: 'setOptions',
          value: function setOptions(options) {
              var _this = this;

              if (!options) {
                  return;
              }
              var settings = this.settings;

              function transfer(source, target, skipKeys) {
                  for (var key in source) {
                      if (skipKeys && skipKeys.indexOf(key) >= 0) {
                          continue;
                      }

                      target[key] = source[key];
                  }
              }

              if (options instanceof HTMLElement) {
                  settings.parent = options;
              } else {

                  if (settings.parent && options.parent && settings.parent !== options.parent) {
                      this._events.remove(settings.parent);
                      this._popupInited = false;
                  }

                  transfer(options, settings);

                  if (options.onChange) {
                      this.onChange = options.onChange;
                  }
                  if (options.onDone) {
                      this.onDone = options.onDone;
                  }
                  if (options.onOpen) {
                      this.onOpen = options.onOpen;
                  }
                  if (options.onClose) {
                      this.onClose = options.onClose;
                  }

                  var col = options.color || options.colour;
                  if (col) {
                      this._setColor(col);
                  }
              }

              var parent = settings.parent;
              if (parent && settings.popup && !this._popupInited) {

                  var openProxy = function openProxy(e) {
                      return _this.openHandler(e);
                  };

                  this._events.add(parent, 'click', openProxy);

                  onKey(this._events, parent, [' ', 'Spacebar', 'Enter'], openProxy);

                  this._popupInited = true;
              } else if (options.parent && !settings.popup) {
                  this.show();
              }
          }
      }, {
          key: 'openHandler',
          value: function openHandler(e) {
              if (this.show()) {

                  e && e.preventDefault();

                  this.settings.parent.style.pointerEvents = 'none';

                  var toFocus = e && e.type === EVENT_KEY ? this._domEdit : this.domElement;
                  setTimeout(function () {
                      return toFocus.focus();
                  }, 100);

                  if (this.onOpen) {
                      this.onOpen(this.colour);
                  }
              }
          }
      }, {
          key: 'closeHandler',
          value: function closeHandler(e) {
              var event = e && e.type;
              var doHide = false;

              if (!e) {
                  doHide = true;
              } else if (event === EVENT_CLICK_OUTSIDE || event === EVENT_TAB_MOVE) {

                  var knownTime = (this.__containedEvent || 0) + 100;
                  if (e.timeStamp > knownTime) {
                      doHide = true;
                  }
              } else {

                  stopEvent(e);

                  doHide = true;
              }

              if (doHide && this.hide()) {
                  this.settings.parent.style.pointerEvents = '';

                  if (event !== EVENT_CLICK_OUTSIDE) {
                      this.settings.parent.focus();
                  }

                  if (this.onClose) {
                      this.onClose(this.colour);
                  }
              }
          }
      }, {
          key: 'movePopup',
          value: function movePopup(options, open) {

              this.closeHandler();

              this.setOptions(options);
              if (open) {
                  this.openHandler();
              }
          }
      }, {
          key: 'setColor',
          value: function setColor(color, silent) {
              this._setColor(color, { silent: silent });
          }
      }, {
          key: '_setColor',
          value: function _setColor(color, flags) {
              if (typeof color === 'string') {
                  color = color.trim();
              }
              if (!color) {
                  return;
              }

              flags = flags || {};
              var c = void 0;
              try {

                  c = new Color(color);
              } catch (ex) {
                  if (flags.failSilently) {
                      return;
                  }
                  throw ex;
              }

              if (!this.settings.alpha) {
                  var hsla = c.hsla;
                  hsla[3] = 1;
                  c.hsla = hsla;
              }
              this.colour = this.color = c;
              this._setHSLA(null, null, null, null, flags);
          }
      }, {
          key: 'setColour',
          value: function setColour(colour, silent) {
              this.setColor(colour, silent);
          }
      }, {
          key: 'show',
          value: function show() {
              var parent = this.settings.parent;
              if (!parent) {
                  return false;
              }

              if (this.domElement) {
                  var toggled = this._toggleDOM(true);

                  this._setPosition();

                  return toggled;
              }

              var html = this.settings.template || '<div class="picker_wrapper" tabindex="-1"><div class="picker_arrow"></div><div class="picker_hue picker_slider"><div class="picker_selector"></div></div><div class="picker_sl"><div class="picker_selector"></div></div><div class="picker_alpha picker_slider"><div class="picker_selector"></div></div><div class="picker_editor"><input aria-label="Type a color name or hex value"/></div><div class="picker_sample"></div><div class="picker_done"><button>Ok</button></div><div class="picker_cancel"><button>Cancel</button></div></div>';
              var wrapper = parseHTML(html);

              this.domElement = wrapper;
              this._domH = $('.picker_hue', wrapper);
              this._domSL = $('.picker_sl', wrapper);
              this._domA = $('.picker_alpha', wrapper);
              this._domEdit = $('.picker_editor input', wrapper);
              this._domSample = $('.picker_sample', wrapper);
              this._domOkay = $('.picker_done button', wrapper);
              this._domCancel = $('.picker_cancel button', wrapper);

              wrapper.classList.add('layout_' + this.settings.layout);
              if (!this.settings.alpha) {
                  wrapper.classList.add('no_alpha');
              }
              if (!this.settings.editor) {
                  wrapper.classList.add('no_editor');
              }
              if (!this.settings.cancelButton) {
                  wrapper.classList.add('no_cancel');
              }
              this._ifPopup(function () {
                  return wrapper.classList.add('popup');
              });

              this._setPosition();

              if (this.colour) {
                  this._updateUI();
              } else {
                  this._setColor(this.settings.defaultColor);
              }
              this._bindEvents();

              return true;
          }
      }, {
          key: 'hide',
          value: function hide() {
              return this._toggleDOM(false);
          }
      }, {
          key: 'destroy',
          value: function destroy() {
              this._events.destroy();
              if (this.domElement) {
                  this.settings.parent.removeChild(this.domElement);
              }
          }
      }, {
          key: '_bindEvents',
          value: function _bindEvents() {
              var _this2 = this;

              var that = this,
                  dom = this.domElement,
                  events = this._events;

              function addEvent(target, type, handler) {
                  events.add(target, type, handler);
              }

              addEvent(dom, 'click', function (e) {
                  return e.preventDefault();
              });

              dragTrack(events, this._domH, function (x, y) {
                  return that._setHSLA(x);
              });

              dragTrack(events, this._domSL, function (x, y) {
                  return that._setHSLA(null, x, 1 - y);
              });

              if (this.settings.alpha) {
                  dragTrack(events, this._domA, function (x, y) {
                      return that._setHSLA(null, null, null, 1 - y);
                  });
              }

              var editInput = this._domEdit;
              {
                  addEvent(editInput, 'input', function (e) {
                      that._setColor(this.value, { fromEditor: true, failSilently: true });
                  });

                  addEvent(editInput, 'focus', function (e) {
                      var input = this;

                      if (input.selectionStart === input.selectionEnd) {
                          input.select();
                      }
                  });
              }

              this._ifPopup(function () {

                  var popupCloseProxy = function popupCloseProxy(e) {
                      return _this2.closeHandler(e);
                  };

                  addEvent(window, EVENT_CLICK_OUTSIDE, popupCloseProxy);
                  addEvent(window, EVENT_TAB_MOVE, popupCloseProxy);
                  onKey(events, dom, ['Esc', 'Escape'], popupCloseProxy);

                  var timeKeeper = function timeKeeper(e) {
                      _this2.__containedEvent = e.timeStamp;
                  };
                  addEvent(dom, EVENT_CLICK_OUTSIDE, timeKeeper);

                  addEvent(dom, EVENT_TAB_MOVE, timeKeeper);

                  addEvent(_this2._domCancel, 'click', popupCloseProxy);
              });

              var onDoneProxy = function onDoneProxy(e) {
                  _this2._ifPopup(function () {
                      return _this2.closeHandler(e);
                  });
                  if (_this2.onDone) {
                      _this2.onDone(_this2.colour);
                  }
              };
              addEvent(this._domOkay, 'click', onDoneProxy);
              onKey(events, dom, ['Enter'], onDoneProxy);
          }
      }, {
          key: '_setPosition',
          value: function _setPosition() {
              var parent = this.settings.parent,
                  elm = this.domElement;

              if (parent !== elm.parentNode) {
                  parent.appendChild(elm);
              }

              this._ifPopup(function (popup) {

                  if (getComputedStyle(parent).position === 'static') {
                      parent.style.position = 'relative';
                  }

                  var cssClass = popup === true ? 'popup_right' : 'popup_' + popup;

                  ['popup_top', 'popup_bottom', 'popup_left', 'popup_right'].forEach(function (c) {

                      if (c === cssClass) {
                          elm.classList.add(c);
                      } else {
                          elm.classList.remove(c);
                      }
                  });

                  elm.classList.add(cssClass);
              });
          }
      }, {
          key: '_setHSLA',
          value: function _setHSLA(h, s, l, a, flags) {
              flags = flags || {};

              var col = this.colour,
                  hsla = col.hsla;

              [h, s, l, a].forEach(function (x, i) {
                  if (x || x === 0) {
                      hsla[i] = x;
                  }
              });
              col.hsla = hsla;

              this._updateUI(flags);

              if (this.onChange && !flags.silent) {
                  this.onChange(col);
              }
          }
      }, {
          key: '_updateUI',
          value: function _updateUI(flags) {
              if (!this.domElement) {
                  return;
              }
              flags = flags || {};

              var col = this.colour,
                  hsl = col.hsla,
                  cssHue = 'hsl(' + hsl[0] * HUES + ', 100%, 50%)',
                  cssHSL = col.hslString,
                  cssHSLA = col.hslaString;

              var uiH = this._domH,
                  uiSL = this._domSL,
                  uiA = this._domA,
                  thumbH = $('.picker_selector', uiH),
                  thumbSL = $('.picker_selector', uiSL),
                  thumbA = $('.picker_selector', uiA);

              function posX(parent, child, relX) {
                  child.style.left = relX * 100 + '%';
              }
              function posY(parent, child, relY) {
                  child.style.top = relY * 100 + '%';
              }

              posX(uiH, thumbH, hsl[0]);

              this._domSL.style.backgroundColor = this._domH.style.color = cssHue;

              posX(uiSL, thumbSL, hsl[1]);
              posY(uiSL, thumbSL, 1 - hsl[2]);

              uiSL.style.color = cssHSL;

              posY(uiA, thumbA, 1 - hsl[3]);

              var opaque = cssHSL,
                  transp = opaque.replace('hsl', 'hsla').replace(')', ', 0)'),
                  bg = 'linear-gradient(' + [opaque, transp] + ')';

              this._domA.style.background = bg + ', ' + BG_TRANSP;

              if (!flags.fromEditor) {
                  var format = this.settings.editorFormat,
                      alpha = this.settings.alpha;

                  var value = void 0;
                  switch (format) {
                      case 'rgb':
                          value = col.printRGB(alpha);break;
                      case 'hsl':
                          value = col.printHSL(alpha);break;
                      default:
                          value = col.printHex(alpha);
                  }
                  this._domEdit.value = value;
              }

              this._domSample.style.color = cssHSLA;
          }
      }, {
          key: '_ifPopup',
          value: function _ifPopup(actionIf, actionElse) {
              if (this.settings.parent && this.settings.popup) {
                  actionIf && actionIf(this.settings.popup);
              } else {
                  actionElse && actionElse();
              }
          }
      }, {
          key: '_toggleDOM',
          value: function _toggleDOM(toVisible) {
              var dom = this.domElement;
              if (!dom) {
                  return false;
              }

              var displayStyle = toVisible ? '' : 'none',
                  toggle = dom.style.display !== displayStyle;

              if (toggle) {
                  dom.style.display = displayStyle;
              }
              return toggle;
          }
      }]);
      return Picker;
  }();

  {
      var style = document.createElement('style');
      style.textContent = '.picker_wrapper.no_alpha .picker_alpha{display:none}.picker_wrapper.no_editor .picker_editor{position:absolute;z-index:-1;opacity:0}.picker_wrapper.no_cancel .picker_cancel{display:none}.layout_default.picker_wrapper{display:flex;flex-flow:row wrap;justify-content:space-between;align-items:stretch;font-size:10px;width:25em;padding:.5em}.layout_default.picker_wrapper input,.layout_default.picker_wrapper button{font-size:1rem}.layout_default.picker_wrapper>*{margin:.5em}.layout_default.picker_wrapper::before{content:"";display:block;width:100%;height:0;order:1}.layout_default .picker_slider,.layout_default .picker_selector{padding:1em}.layout_default .picker_hue{width:100%}.layout_default .picker_sl{flex:1 1 auto}.layout_default .picker_sl::before{content:"";display:block;padding-bottom:100%}.layout_default .picker_editor{order:1;width:6.5rem}.layout_default .picker_editor input{width:100%;height:100%}.layout_default .picker_sample{order:1;flex:1 1 auto}.layout_default .picker_done,.layout_default .picker_cancel{order:1}.picker_wrapper{box-sizing:border-box;background:#f2f2f2;box-shadow:0 0 0 1px silver;cursor:default;font-family:sans-serif;color:#444;pointer-events:auto}.picker_wrapper:focus{outline:none}.picker_wrapper button,.picker_wrapper input{box-sizing:border-box;border:none;box-shadow:0 0 0 1px silver;outline:none}.picker_wrapper button:focus,.picker_wrapper button:active,.picker_wrapper input:focus,.picker_wrapper input:active{box-shadow:0 0 2px 1px #1e90ff}.picker_wrapper button{padding:.4em .6em;cursor:pointer;background-color:#f5f5f5;background-image:linear-gradient(0deg, gainsboro, transparent)}.picker_wrapper button:active{background-image:linear-gradient(0deg, transparent, gainsboro)}.picker_wrapper button:hover{background-color:#fff}.picker_selector{position:absolute;z-index:1;display:block;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);border:2px solid #fff;border-radius:100%;box-shadow:0 0 3px 1px #67b9ff;background:currentColor;cursor:pointer}.picker_slider .picker_selector{border-radius:2px}.picker_hue{position:relative;background-image:linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta, red);box-shadow:0 0 0 1px silver}.picker_sl{position:relative;box-shadow:0 0 0 1px silver;background-image:linear-gradient(180deg, white, rgba(255, 255, 255, 0) 50%),linear-gradient(0deg, black, rgba(0, 0, 0, 0) 50%),linear-gradient(90deg, #808080, rgba(128, 128, 128, 0))}.picker_alpha,.picker_sample{position:relative;background:linear-gradient(45deg, lightgrey 25%, transparent 25%, transparent 75%, lightgrey 75%) 0 0/2em 2em,linear-gradient(45deg, lightgrey 25%, white 25%, white 75%, lightgrey 75%) 1em 1em/2em 2em;box-shadow:0 0 0 1px silver}.picker_alpha .picker_selector,.picker_sample .picker_selector{background:none}.picker_editor input{font-family:monospace;padding:.2em .4em}.picker_sample::before{content:"";position:absolute;display:block;width:100%;height:100%;background:currentColor}.picker_arrow{position:absolute;z-index:-1}.picker_wrapper.popup{position:absolute;z-index:2;margin:1.5em}.picker_wrapper.popup,.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{background:#f2f2f2;box-shadow:0 0 10px 1px rgba(0,0,0,.4)}.picker_wrapper.popup .picker_arrow{width:3em;height:3em;margin:0}.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{content:"";display:block;position:absolute;top:0;left:0;z-index:-99}.picker_wrapper.popup .picker_arrow::before{width:100%;height:100%;-webkit-transform:skew(45deg);transform:skew(45deg);-webkit-transform-origin:0 100%;transform-origin:0 100%}.picker_wrapper.popup .picker_arrow::after{width:150%;height:150%;box-shadow:none}.popup.popup_top{bottom:100%;left:0}.popup.popup_top .picker_arrow{bottom:0;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.popup.popup_bottom{top:100%;left:0}.popup.popup_bottom .picker_arrow{top:0;left:0;-webkit-transform:rotate(90deg) scale(1, -1);transform:rotate(90deg) scale(1, -1)}.popup.popup_left{top:0;right:100%}.popup.popup_left .picker_arrow{top:0;right:0;-webkit-transform:scale(-1, 1);transform:scale(-1, 1)}.popup.popup_right{top:0;left:100%}.popup.popup_right .picker_arrow{top:0;left:0}';
      document.documentElement.firstElementChild.appendChild(style);

      Picker.StyleElement = style;
  }

  return Picker;

}));
