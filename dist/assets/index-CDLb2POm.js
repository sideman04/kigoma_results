function j_(t,e){for(var n=0;n<e.length;n++){const i=e[n];if(typeof i!="string"&&!Array.isArray(i)){for(const r in i)if(r!=="default"&&!(r in t)){const s=Object.getOwnPropertyDescriptor(i,r);s&&Object.defineProperty(t,r,s.get?s:{enumerable:!0,get:()=>i[r]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function X_(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var yg={exports:{}},uc={},Mg={exports:{}},Ge={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var to=Symbol.for("react.element"),$_=Symbol.for("react.portal"),Y_=Symbol.for("react.fragment"),q_=Symbol.for("react.strict_mode"),K_=Symbol.for("react.profiler"),Z_=Symbol.for("react.provider"),J_=Symbol.for("react.context"),Q_=Symbol.for("react.forward_ref"),ex=Symbol.for("react.suspense"),tx=Symbol.for("react.memo"),nx=Symbol.for("react.lazy"),ep=Symbol.iterator;function ix(t){return t===null||typeof t!="object"?null:(t=ep&&t[ep]||t["@@iterator"],typeof t=="function"?t:null)}var Eg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Tg=Object.assign,wg={};function Ws(t,e,n){this.props=t,this.context=e,this.refs=wg,this.updater=n||Eg}Ws.prototype.isReactComponent={};Ws.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ws.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Ag(){}Ag.prototype=Ws.prototype;function Nf(t,e,n){this.props=t,this.context=e,this.refs=wg,this.updater=n||Eg}var Pf=Nf.prototype=new Ag;Pf.constructor=Nf;Tg(Pf,Ws.prototype);Pf.isPureReactComponent=!0;var tp=Array.isArray,Rg=Object.prototype.hasOwnProperty,Lf={current:null},Cg={key:!0,ref:!0,__self:!0,__source:!0};function bg(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)Rg.call(e,i)&&!Cg.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:to,type:t,key:s,ref:a,props:r,_owner:Lf.current}}function rx(t,e){return{$$typeof:to,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function If(t){return typeof t=="object"&&t!==null&&t.$$typeof===to}function sx(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var np=/\/+/g;function Oc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?sx(""+t.key):e.toString(36)}function al(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case to:case $_:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+Oc(a,0):i,tp(r)?(n="",t!=null&&(n=t.replace(np,"$&/")+"/"),al(r,e,n,"",function(c){return c})):r!=null&&(If(r)&&(r=rx(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(np,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",tp(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+Oc(s,o);a+=al(s,e,n,l,r)}else if(l=ix(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+Oc(s,o++),a+=al(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function go(t,e,n){if(t==null)return t;var i=[],r=0;return al(t,i,"","",function(s){return e.call(n,s,r++)}),i}function ax(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var on={current:null},ol={transition:null},ox={ReactCurrentDispatcher:on,ReactCurrentBatchConfig:ol,ReactCurrentOwner:Lf};function Ng(){throw Error("act(...) is not supported in production builds of React.")}Ge.Children={map:go,forEach:function(t,e,n){go(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return go(t,function(){e++}),e},toArray:function(t){return go(t,function(e){return e})||[]},only:function(t){if(!If(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ge.Component=Ws;Ge.Fragment=Y_;Ge.Profiler=K_;Ge.PureComponent=Nf;Ge.StrictMode=q_;Ge.Suspense=ex;Ge.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ox;Ge.act=Ng;Ge.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Tg({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=Lf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)Rg.call(e,l)&&!Cg.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];i.children=o}return{$$typeof:to,type:t.type,key:r,ref:s,props:i,_owner:a}};Ge.createContext=function(t){return t={$$typeof:J_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Z_,_context:t},t.Consumer=t};Ge.createElement=bg;Ge.createFactory=function(t){var e=bg.bind(null,t);return e.type=t,e};Ge.createRef=function(){return{current:null}};Ge.forwardRef=function(t){return{$$typeof:Q_,render:t}};Ge.isValidElement=If;Ge.lazy=function(t){return{$$typeof:nx,_payload:{_status:-1,_result:t},_init:ax}};Ge.memo=function(t,e){return{$$typeof:tx,type:t,compare:e===void 0?null:e}};Ge.startTransition=function(t){var e=ol.transition;ol.transition={};try{t()}finally{ol.transition=e}};Ge.unstable_act=Ng;Ge.useCallback=function(t,e){return on.current.useCallback(t,e)};Ge.useContext=function(t){return on.current.useContext(t)};Ge.useDebugValue=function(){};Ge.useDeferredValue=function(t){return on.current.useDeferredValue(t)};Ge.useEffect=function(t,e){return on.current.useEffect(t,e)};Ge.useId=function(){return on.current.useId()};Ge.useImperativeHandle=function(t,e,n){return on.current.useImperativeHandle(t,e,n)};Ge.useInsertionEffect=function(t,e){return on.current.useInsertionEffect(t,e)};Ge.useLayoutEffect=function(t,e){return on.current.useLayoutEffect(t,e)};Ge.useMemo=function(t,e){return on.current.useMemo(t,e)};Ge.useReducer=function(t,e,n){return on.current.useReducer(t,e,n)};Ge.useRef=function(t){return on.current.useRef(t)};Ge.useState=function(t){return on.current.useState(t)};Ge.useSyncExternalStore=function(t,e,n){return on.current.useSyncExternalStore(t,e,n)};Ge.useTransition=function(){return on.current.useTransition()};Ge.version="18.3.1";Mg.exports=Ge;var Y=Mg.exports;const Pg=X_(Y),lx=j_({__proto__:null,default:Pg},[Y]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cx=Y,ux=Symbol.for("react.element"),dx=Symbol.for("react.fragment"),fx=Object.prototype.hasOwnProperty,hx=cx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,px={key:!0,ref:!0,__self:!0,__source:!0};function Lg(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)fx.call(e,i)&&!px.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:ux,type:t,key:s,ref:a,props:r,_owner:hx.current}}uc.Fragment=dx;uc.jsx=Lg;uc.jsxs=Lg;yg.exports=uc;var u=yg.exports,Gu={},Ig={exports:{}},Tn={},Dg={exports:{}},Ug={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(B,F){var V=B.length;B.push(F);e:for(;0<V;){var K=V-1>>>1,de=B[K];if(0<r(de,F))B[K]=F,B[V]=de,V=K;else break e}}function n(B){return B.length===0?null:B[0]}function i(B){if(B.length===0)return null;var F=B[0],V=B.pop();if(V!==F){B[0]=V;e:for(var K=0,de=B.length,be=de>>>1;K<be;){var Z=2*(K+1)-1,me=B[Z],ye=Z+1,Ce=B[ye];if(0>r(me,V))ye<de&&0>r(Ce,me)?(B[K]=Ce,B[ye]=V,K=ye):(B[K]=me,B[Z]=V,K=Z);else if(ye<de&&0>r(Ce,V))B[K]=Ce,B[ye]=V,K=ye;else break e}}return F}function r(B,F){var V=B.sortIndex-F.sortIndex;return V!==0?V:B.id-F.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],c=[],f=1,p=null,h=3,m=!1,g=!1,y=!1,v=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function S(B){for(var F=n(c);F!==null;){if(F.callback===null)i(c);else if(F.startTime<=B)i(c),F.sortIndex=F.expirationTime,e(l,F);else break;F=n(c)}}function M(B){if(y=!1,S(B),!g)if(n(l)!==null)g=!0,Q(R);else{var F=n(c);F!==null&&G(M,F.startTime-B)}}function R(B,F){g=!1,y&&(y=!1,d(w),w=-1),m=!0;var V=h;try{for(S(F),p=n(l);p!==null&&(!(p.expirationTime>F)||B&&!P());){var K=p.callback;if(typeof K=="function"){p.callback=null,h=p.priorityLevel;var de=K(p.expirationTime<=F);F=t.unstable_now(),typeof de=="function"?p.callback=de:p===n(l)&&i(l),S(F)}else i(l);p=n(l)}if(p!==null)var be=!0;else{var Z=n(c);Z!==null&&G(M,Z.startTime-F),be=!1}return be}finally{p=null,h=V,m=!1}}var A=!1,x=null,w=-1,I=5,C=-1;function P(){return!(t.unstable_now()-C<I)}function O(){if(x!==null){var B=t.unstable_now();C=B;var F=!0;try{F=x(!0,B)}finally{F?X():(A=!1,x=null)}}else A=!1}var X;if(typeof _=="function")X=function(){_(O)};else if(typeof MessageChannel<"u"){var D=new MessageChannel,$=D.port2;D.port1.onmessage=O,X=function(){$.postMessage(null)}}else X=function(){v(O,0)};function Q(B){x=B,A||(A=!0,X())}function G(B,F){w=v(function(){B(t.unstable_now())},F)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(B){B.callback=null},t.unstable_continueExecution=function(){g||m||(g=!0,Q(R))},t.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<B?Math.floor(1e3/B):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(B){switch(h){case 1:case 2:case 3:var F=3;break;default:F=h}var V=h;h=F;try{return B()}finally{h=V}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(B,F){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var V=h;h=B;try{return F()}finally{h=V}},t.unstable_scheduleCallback=function(B,F,V){var K=t.unstable_now();switch(typeof V=="object"&&V!==null?(V=V.delay,V=typeof V=="number"&&0<V?K+V:K):V=K,B){case 1:var de=-1;break;case 2:de=250;break;case 5:de=1073741823;break;case 4:de=1e4;break;default:de=5e3}return de=V+de,B={id:f++,callback:F,priorityLevel:B,startTime:V,expirationTime:de,sortIndex:-1},V>K?(B.sortIndex=V,e(c,B),n(l)===null&&B===n(c)&&(y?(d(w),w=-1):y=!0,G(M,V-K))):(B.sortIndex=de,e(l,B),g||m||(g=!0,Q(R))),B},t.unstable_shouldYield=P,t.unstable_wrapCallback=function(B){var F=h;return function(){var V=h;h=F;try{return B.apply(this,arguments)}finally{h=V}}}})(Ug);Dg.exports=Ug;var mx=Dg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gx=Y,En=mx;function re(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Fg=new Set,Ia={};function Xr(t,e){Ls(t,e),Ls(t+"Capture",e)}function Ls(t,e){for(Ia[t]=e,t=0;t<e.length;t++)Fg.add(e[t])}var Ni=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Hu=Object.prototype.hasOwnProperty,vx=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ip={},rp={};function _x(t){return Hu.call(rp,t)?!0:Hu.call(ip,t)?!1:vx.test(t)?rp[t]=!0:(ip[t]=!0,!1)}function xx(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Sx(t,e,n,i){if(e===null||typeof e>"u"||xx(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function ln(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var Wt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Wt[t]=new ln(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Wt[e]=new ln(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Wt[t]=new ln(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Wt[t]=new ln(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Wt[t]=new ln(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Wt[t]=new ln(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Wt[t]=new ln(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Wt[t]=new ln(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Wt[t]=new ln(t,5,!1,t.toLowerCase(),null,!1,!1)});var Df=/[\-:]([a-z])/g;function Uf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Df,Uf);Wt[e]=new ln(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Df,Uf);Wt[e]=new ln(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Df,Uf);Wt[e]=new ln(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Wt[t]=new ln(t,1,!1,t.toLowerCase(),null,!1,!1)});Wt.xlinkHref=new ln("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Wt[t]=new ln(t,1,!1,t.toLowerCase(),null,!0,!0)});function Ff(t,e,n,i){var r=Wt.hasOwnProperty(e)?Wt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Sx(e,n,r,i)&&(n=null),i||r===null?_x(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ui=gx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,vo=Symbol.for("react.element"),us=Symbol.for("react.portal"),ds=Symbol.for("react.fragment"),Of=Symbol.for("react.strict_mode"),Vu=Symbol.for("react.profiler"),Og=Symbol.for("react.provider"),Bg=Symbol.for("react.context"),Bf=Symbol.for("react.forward_ref"),Wu=Symbol.for("react.suspense"),ju=Symbol.for("react.suspense_list"),kf=Symbol.for("react.memo"),$i=Symbol.for("react.lazy"),kg=Symbol.for("react.offscreen"),sp=Symbol.iterator;function ea(t){return t===null||typeof t!="object"?null:(t=sp&&t[sp]||t["@@iterator"],typeof t=="function"?t:null)}var xt=Object.assign,Bc;function ma(t){if(Bc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Bc=e&&e[1]||""}return`
`+Bc+t}var kc=!1;function zc(t,e){if(!t||kc)return"";kc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{kc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ma(t):""}function yx(t){switch(t.tag){case 5:return ma(t.type);case 16:return ma("Lazy");case 13:return ma("Suspense");case 19:return ma("SuspenseList");case 0:case 2:case 15:return t=zc(t.type,!1),t;case 11:return t=zc(t.type.render,!1),t;case 1:return t=zc(t.type,!0),t;default:return""}}function Xu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ds:return"Fragment";case us:return"Portal";case Vu:return"Profiler";case Of:return"StrictMode";case Wu:return"Suspense";case ju:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Bg:return(t.displayName||"Context")+".Consumer";case Og:return(t._context.displayName||"Context")+".Provider";case Bf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case kf:return e=t.displayName||null,e!==null?e:Xu(t.type)||"Memo";case $i:e=t._payload,t=t._init;try{return Xu(t(e))}catch{}}return null}function Mx(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Xu(e);case 8:return e===Of?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function pr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function zg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Ex(t){var e=zg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function _o(t){t._valueTracker||(t._valueTracker=Ex(t))}function Gg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=zg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function wl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function $u(t,e){var n=e.checked;return xt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function ap(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=pr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Hg(t,e){e=e.checked,e!=null&&Ff(t,"checked",e,!1)}function Yu(t,e){Hg(t,e);var n=pr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?qu(t,e.type,n):e.hasOwnProperty("defaultValue")&&qu(t,e.type,pr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function op(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function qu(t,e,n){(e!=="number"||wl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var ga=Array.isArray;function Es(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+pr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Ku(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(re(91));return xt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function lp(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(re(92));if(ga(n)){if(1<n.length)throw Error(re(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:pr(n)}}function Vg(t,e){var n=pr(e.value),i=pr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function cp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Wg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Zu(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Wg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var xo,jg=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(xo=xo||document.createElement("div"),xo.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=xo.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Da(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ea={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Tx=["Webkit","ms","Moz","O"];Object.keys(Ea).forEach(function(t){Tx.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ea[e]=Ea[t]})});function Xg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Ea.hasOwnProperty(t)&&Ea[t]?(""+e).trim():e+"px"}function $g(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Xg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var wx=xt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ju(t,e){if(e){if(wx[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(re(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(re(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(re(61))}if(e.style!=null&&typeof e.style!="object")throw Error(re(62))}}function Qu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ed=null;function zf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var td=null,Ts=null,ws=null;function up(t){if(t=ro(t)){if(typeof td!="function")throw Error(re(280));var e=t.stateNode;e&&(e=mc(e),td(t.stateNode,t.type,e))}}function Yg(t){Ts?ws?ws.push(t):ws=[t]:Ts=t}function qg(){if(Ts){var t=Ts,e=ws;if(ws=Ts=null,up(t),e)for(t=0;t<e.length;t++)up(e[t])}}function Kg(t,e){return t(e)}function Zg(){}var Gc=!1;function Jg(t,e,n){if(Gc)return t(e,n);Gc=!0;try{return Kg(t,e,n)}finally{Gc=!1,(Ts!==null||ws!==null)&&(Zg(),qg())}}function Ua(t,e){var n=t.stateNode;if(n===null)return null;var i=mc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(re(231,e,typeof n));return n}var nd=!1;if(Ni)try{var ta={};Object.defineProperty(ta,"passive",{get:function(){nd=!0}}),window.addEventListener("test",ta,ta),window.removeEventListener("test",ta,ta)}catch{nd=!1}function Ax(t,e,n,i,r,s,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var Ta=!1,Al=null,Rl=!1,id=null,Rx={onError:function(t){Ta=!0,Al=t}};function Cx(t,e,n,i,r,s,a,o,l){Ta=!1,Al=null,Ax.apply(Rx,arguments)}function bx(t,e,n,i,r,s,a,o,l){if(Cx.apply(this,arguments),Ta){if(Ta){var c=Al;Ta=!1,Al=null}else throw Error(re(198));Rl||(Rl=!0,id=c)}}function $r(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Qg(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function dp(t){if($r(t)!==t)throw Error(re(188))}function Nx(t){var e=t.alternate;if(!e){if(e=$r(t),e===null)throw Error(re(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return dp(r),t;if(s===i)return dp(r),e;s=s.sibling}throw Error(re(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(re(189))}}if(n.alternate!==i)throw Error(re(190))}if(n.tag!==3)throw Error(re(188));return n.stateNode.current===n?t:e}function ev(t){return t=Nx(t),t!==null?tv(t):null}function tv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=tv(t);if(e!==null)return e;t=t.sibling}return null}var nv=En.unstable_scheduleCallback,fp=En.unstable_cancelCallback,Px=En.unstable_shouldYield,Lx=En.unstable_requestPaint,Mt=En.unstable_now,Ix=En.unstable_getCurrentPriorityLevel,Gf=En.unstable_ImmediatePriority,iv=En.unstable_UserBlockingPriority,Cl=En.unstable_NormalPriority,Dx=En.unstable_LowPriority,rv=En.unstable_IdlePriority,dc=null,ci=null;function Ux(t){if(ci&&typeof ci.onCommitFiberRoot=="function")try{ci.onCommitFiberRoot(dc,t,void 0,(t.current.flags&128)===128)}catch{}}var Kn=Math.clz32?Math.clz32:Bx,Fx=Math.log,Ox=Math.LN2;function Bx(t){return t>>>=0,t===0?32:31-(Fx(t)/Ox|0)|0}var So=64,yo=4194304;function va(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function bl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=va(o):(s&=a,s!==0&&(i=va(s)))}else a=n&~r,a!==0?i=va(a):s!==0&&(i=va(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Kn(e),r=1<<n,i|=t[n],e&=~r;return i}function kx(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function zx(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-Kn(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=kx(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function rd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function sv(){var t=So;return So<<=1,!(So&4194240)&&(So=64),t}function Hc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function no(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Kn(e),t[e]=n}function Gx(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Kn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Hf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Kn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var nt=0;function av(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var ov,Vf,lv,cv,uv,sd=!1,Mo=[],sr=null,ar=null,or=null,Fa=new Map,Oa=new Map,Ki=[],Hx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function hp(t,e){switch(t){case"focusin":case"focusout":sr=null;break;case"dragenter":case"dragleave":ar=null;break;case"mouseover":case"mouseout":or=null;break;case"pointerover":case"pointerout":Fa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Oa.delete(e.pointerId)}}function na(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=ro(e),e!==null&&Vf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Vx(t,e,n,i,r){switch(e){case"focusin":return sr=na(sr,t,e,n,i,r),!0;case"dragenter":return ar=na(ar,t,e,n,i,r),!0;case"mouseover":return or=na(or,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Fa.set(s,na(Fa.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Oa.set(s,na(Oa.get(s)||null,t,e,n,i,r)),!0}return!1}function dv(t){var e=br(t.target);if(e!==null){var n=$r(e);if(n!==null){if(e=n.tag,e===13){if(e=Qg(n),e!==null){t.blockedOn=e,uv(t.priority,function(){lv(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ll(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=ad(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);ed=i,n.target.dispatchEvent(i),ed=null}else return e=ro(n),e!==null&&Vf(e),t.blockedOn=n,!1;e.shift()}return!0}function pp(t,e,n){ll(t)&&n.delete(e)}function Wx(){sd=!1,sr!==null&&ll(sr)&&(sr=null),ar!==null&&ll(ar)&&(ar=null),or!==null&&ll(or)&&(or=null),Fa.forEach(pp),Oa.forEach(pp)}function ia(t,e){t.blockedOn===e&&(t.blockedOn=null,sd||(sd=!0,En.unstable_scheduleCallback(En.unstable_NormalPriority,Wx)))}function Ba(t){function e(r){return ia(r,t)}if(0<Mo.length){ia(Mo[0],t);for(var n=1;n<Mo.length;n++){var i=Mo[n];i.blockedOn===t&&(i.blockedOn=null)}}for(sr!==null&&ia(sr,t),ar!==null&&ia(ar,t),or!==null&&ia(or,t),Fa.forEach(e),Oa.forEach(e),n=0;n<Ki.length;n++)i=Ki[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Ki.length&&(n=Ki[0],n.blockedOn===null);)dv(n),n.blockedOn===null&&Ki.shift()}var As=Ui.ReactCurrentBatchConfig,Nl=!0;function jx(t,e,n,i){var r=nt,s=As.transition;As.transition=null;try{nt=1,Wf(t,e,n,i)}finally{nt=r,As.transition=s}}function Xx(t,e,n,i){var r=nt,s=As.transition;As.transition=null;try{nt=4,Wf(t,e,n,i)}finally{nt=r,As.transition=s}}function Wf(t,e,n,i){if(Nl){var r=ad(t,e,n,i);if(r===null)Jc(t,e,i,Pl,n),hp(t,i);else if(Vx(r,t,e,n,i))i.stopPropagation();else if(hp(t,i),e&4&&-1<Hx.indexOf(t)){for(;r!==null;){var s=ro(r);if(s!==null&&ov(s),s=ad(t,e,n,i),s===null&&Jc(t,e,i,Pl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Jc(t,e,i,null,n)}}var Pl=null;function ad(t,e,n,i){if(Pl=null,t=zf(i),t=br(t),t!==null)if(e=$r(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Qg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Pl=t,null}function fv(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ix()){case Gf:return 1;case iv:return 4;case Cl:case Dx:return 16;case rv:return 536870912;default:return 16}default:return 16}}var Qi=null,jf=null,cl=null;function hv(){if(cl)return cl;var t,e=jf,n=e.length,i,r="value"in Qi?Qi.value:Qi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return cl=r.slice(t,1<i?1-i:void 0)}function ul(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Eo(){return!0}function mp(){return!1}function wn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Eo:mp,this.isPropagationStopped=mp,this}return xt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Eo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Eo)},persist:function(){},isPersistent:Eo}),e}var js={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Xf=wn(js),io=xt({},js,{view:0,detail:0}),$x=wn(io),Vc,Wc,ra,fc=xt({},io,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:$f,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ra&&(ra&&t.type==="mousemove"?(Vc=t.screenX-ra.screenX,Wc=t.screenY-ra.screenY):Wc=Vc=0,ra=t),Vc)},movementY:function(t){return"movementY"in t?t.movementY:Wc}}),gp=wn(fc),Yx=xt({},fc,{dataTransfer:0}),qx=wn(Yx),Kx=xt({},io,{relatedTarget:0}),jc=wn(Kx),Zx=xt({},js,{animationName:0,elapsedTime:0,pseudoElement:0}),Jx=wn(Zx),Qx=xt({},js,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),eS=wn(Qx),tS=xt({},js,{data:0}),vp=wn(tS),nS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},iS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},rS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function sS(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=rS[t])?!!e[t]:!1}function $f(){return sS}var aS=xt({},io,{key:function(t){if(t.key){var e=nS[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ul(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?iS[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:$f,charCode:function(t){return t.type==="keypress"?ul(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ul(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),oS=wn(aS),lS=xt({},fc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),_p=wn(lS),cS=xt({},io,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:$f}),uS=wn(cS),dS=xt({},js,{propertyName:0,elapsedTime:0,pseudoElement:0}),fS=wn(dS),hS=xt({},fc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),pS=wn(hS),mS=[9,13,27,32],Yf=Ni&&"CompositionEvent"in window,wa=null;Ni&&"documentMode"in document&&(wa=document.documentMode);var gS=Ni&&"TextEvent"in window&&!wa,pv=Ni&&(!Yf||wa&&8<wa&&11>=wa),xp=" ",Sp=!1;function mv(t,e){switch(t){case"keyup":return mS.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function gv(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var fs=!1;function vS(t,e){switch(t){case"compositionend":return gv(e);case"keypress":return e.which!==32?null:(Sp=!0,xp);case"textInput":return t=e.data,t===xp&&Sp?null:t;default:return null}}function _S(t,e){if(fs)return t==="compositionend"||!Yf&&mv(t,e)?(t=hv(),cl=jf=Qi=null,fs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return pv&&e.locale!=="ko"?null:e.data;default:return null}}var xS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function yp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!xS[t.type]:e==="textarea"}function vv(t,e,n,i){Yg(i),e=Ll(e,"onChange"),0<e.length&&(n=new Xf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Aa=null,ka=null;function SS(t){Cv(t,0)}function hc(t){var e=ms(t);if(Gg(e))return t}function yS(t,e){if(t==="change")return e}var _v=!1;if(Ni){var Xc;if(Ni){var $c="oninput"in document;if(!$c){var Mp=document.createElement("div");Mp.setAttribute("oninput","return;"),$c=typeof Mp.oninput=="function"}Xc=$c}else Xc=!1;_v=Xc&&(!document.documentMode||9<document.documentMode)}function Ep(){Aa&&(Aa.detachEvent("onpropertychange",xv),ka=Aa=null)}function xv(t){if(t.propertyName==="value"&&hc(ka)){var e=[];vv(e,ka,t,zf(t)),Jg(SS,e)}}function MS(t,e,n){t==="focusin"?(Ep(),Aa=e,ka=n,Aa.attachEvent("onpropertychange",xv)):t==="focusout"&&Ep()}function ES(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return hc(ka)}function TS(t,e){if(t==="click")return hc(e)}function wS(t,e){if(t==="input"||t==="change")return hc(e)}function AS(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Jn=typeof Object.is=="function"?Object.is:AS;function za(t,e){if(Jn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Hu.call(e,r)||!Jn(t[r],e[r]))return!1}return!0}function Tp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function wp(t,e){var n=Tp(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Tp(n)}}function Sv(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Sv(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function yv(){for(var t=window,e=wl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=wl(t.document)}return e}function qf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function RS(t){var e=yv(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Sv(n.ownerDocument.documentElement,n)){if(i!==null&&qf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=wp(n,s);var a=wp(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var CS=Ni&&"documentMode"in document&&11>=document.documentMode,hs=null,od=null,Ra=null,ld=!1;function Ap(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ld||hs==null||hs!==wl(i)||(i=hs,"selectionStart"in i&&qf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ra&&za(Ra,i)||(Ra=i,i=Ll(od,"onSelect"),0<i.length&&(e=new Xf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=hs)))}function To(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ps={animationend:To("Animation","AnimationEnd"),animationiteration:To("Animation","AnimationIteration"),animationstart:To("Animation","AnimationStart"),transitionend:To("Transition","TransitionEnd")},Yc={},Mv={};Ni&&(Mv=document.createElement("div").style,"AnimationEvent"in window||(delete ps.animationend.animation,delete ps.animationiteration.animation,delete ps.animationstart.animation),"TransitionEvent"in window||delete ps.transitionend.transition);function pc(t){if(Yc[t])return Yc[t];if(!ps[t])return t;var e=ps[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Mv)return Yc[t]=e[n];return t}var Ev=pc("animationend"),Tv=pc("animationiteration"),wv=pc("animationstart"),Av=pc("transitionend"),Rv=new Map,Rp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function vr(t,e){Rv.set(t,e),Xr(e,[t])}for(var qc=0;qc<Rp.length;qc++){var Kc=Rp[qc],bS=Kc.toLowerCase(),NS=Kc[0].toUpperCase()+Kc.slice(1);vr(bS,"on"+NS)}vr(Ev,"onAnimationEnd");vr(Tv,"onAnimationIteration");vr(wv,"onAnimationStart");vr("dblclick","onDoubleClick");vr("focusin","onFocus");vr("focusout","onBlur");vr(Av,"onTransitionEnd");Ls("onMouseEnter",["mouseout","mouseover"]);Ls("onMouseLeave",["mouseout","mouseover"]);Ls("onPointerEnter",["pointerout","pointerover"]);Ls("onPointerLeave",["pointerout","pointerover"]);Xr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Xr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Xr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Xr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Xr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Xr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var _a="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),PS=new Set("cancel close invalid load scroll toggle".split(" ").concat(_a));function Cp(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,bx(i,e,void 0,t),t.currentTarget=null}function Cv(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;Cp(r,o,c),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;Cp(r,o,c),s=l}}}if(Rl)throw t=id,Rl=!1,id=null,t}function lt(t,e){var n=e[hd];n===void 0&&(n=e[hd]=new Set);var i=t+"__bubble";n.has(i)||(bv(e,t,2,!1),n.add(i))}function Zc(t,e,n){var i=0;e&&(i|=4),bv(n,t,i,e)}var wo="_reactListening"+Math.random().toString(36).slice(2);function Ga(t){if(!t[wo]){t[wo]=!0,Fg.forEach(function(n){n!=="selectionchange"&&(PS.has(n)||Zc(n,!1,t),Zc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[wo]||(e[wo]=!0,Zc("selectionchange",!1,e))}}function bv(t,e,n,i){switch(fv(e)){case 1:var r=jx;break;case 4:r=Xx;break;default:r=Wf}n=r.bind(null,e,n,t),r=void 0,!nd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Jc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=br(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}Jg(function(){var c=s,f=zf(n),p=[];e:{var h=Rv.get(t);if(h!==void 0){var m=Xf,g=t;switch(t){case"keypress":if(ul(n)===0)break e;case"keydown":case"keyup":m=oS;break;case"focusin":g="focus",m=jc;break;case"focusout":g="blur",m=jc;break;case"beforeblur":case"afterblur":m=jc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=gp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=qx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=uS;break;case Ev:case Tv:case wv:m=Jx;break;case Av:m=fS;break;case"scroll":m=$x;break;case"wheel":m=pS;break;case"copy":case"cut":case"paste":m=eS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=_p}var y=(e&4)!==0,v=!y&&t==="scroll",d=y?h!==null?h+"Capture":null:h;y=[];for(var _=c,S;_!==null;){S=_;var M=S.stateNode;if(S.tag===5&&M!==null&&(S=M,d!==null&&(M=Ua(_,d),M!=null&&y.push(Ha(_,M,S)))),v)break;_=_.return}0<y.length&&(h=new m(h,g,null,n,f),p.push({event:h,listeners:y}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",h&&n!==ed&&(g=n.relatedTarget||n.fromElement)&&(br(g)||g[Pi]))break e;if((m||h)&&(h=f.window===f?f:(h=f.ownerDocument)?h.defaultView||h.parentWindow:window,m?(g=n.relatedTarget||n.toElement,m=c,g=g?br(g):null,g!==null&&(v=$r(g),g!==v||g.tag!==5&&g.tag!==6)&&(g=null)):(m=null,g=c),m!==g)){if(y=gp,M="onMouseLeave",d="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(y=_p,M="onPointerLeave",d="onPointerEnter",_="pointer"),v=m==null?h:ms(m),S=g==null?h:ms(g),h=new y(M,_+"leave",m,n,f),h.target=v,h.relatedTarget=S,M=null,br(f)===c&&(y=new y(d,_+"enter",g,n,f),y.target=S,y.relatedTarget=v,M=y),v=M,m&&g)t:{for(y=m,d=g,_=0,S=y;S;S=Kr(S))_++;for(S=0,M=d;M;M=Kr(M))S++;for(;0<_-S;)y=Kr(y),_--;for(;0<S-_;)d=Kr(d),S--;for(;_--;){if(y===d||d!==null&&y===d.alternate)break t;y=Kr(y),d=Kr(d)}y=null}else y=null;m!==null&&bp(p,h,m,y,!1),g!==null&&v!==null&&bp(p,v,g,y,!0)}}e:{if(h=c?ms(c):window,m=h.nodeName&&h.nodeName.toLowerCase(),m==="select"||m==="input"&&h.type==="file")var R=yS;else if(yp(h))if(_v)R=wS;else{R=ES;var A=MS}else(m=h.nodeName)&&m.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(R=TS);if(R&&(R=R(t,c))){vv(p,R,n,f);break e}A&&A(t,h,c),t==="focusout"&&(A=h._wrapperState)&&A.controlled&&h.type==="number"&&qu(h,"number",h.value)}switch(A=c?ms(c):window,t){case"focusin":(yp(A)||A.contentEditable==="true")&&(hs=A,od=c,Ra=null);break;case"focusout":Ra=od=hs=null;break;case"mousedown":ld=!0;break;case"contextmenu":case"mouseup":case"dragend":ld=!1,Ap(p,n,f);break;case"selectionchange":if(CS)break;case"keydown":case"keyup":Ap(p,n,f)}var x;if(Yf)e:{switch(t){case"compositionstart":var w="onCompositionStart";break e;case"compositionend":w="onCompositionEnd";break e;case"compositionupdate":w="onCompositionUpdate";break e}w=void 0}else fs?mv(t,n)&&(w="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(w="onCompositionStart");w&&(pv&&n.locale!=="ko"&&(fs||w!=="onCompositionStart"?w==="onCompositionEnd"&&fs&&(x=hv()):(Qi=f,jf="value"in Qi?Qi.value:Qi.textContent,fs=!0)),A=Ll(c,w),0<A.length&&(w=new vp(w,t,null,n,f),p.push({event:w,listeners:A}),x?w.data=x:(x=gv(n),x!==null&&(w.data=x)))),(x=gS?vS(t,n):_S(t,n))&&(c=Ll(c,"onBeforeInput"),0<c.length&&(f=new vp("onBeforeInput","beforeinput",null,n,f),p.push({event:f,listeners:c}),f.data=x))}Cv(p,e)})}function Ha(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Ll(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Ua(t,n),s!=null&&i.unshift(Ha(t,s,r)),s=Ua(t,e),s!=null&&i.push(Ha(t,s,r))),t=t.return}return i}function Kr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function bp(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&c!==null&&(o=c,r?(l=Ua(n,s),l!=null&&a.unshift(Ha(n,l,o))):r||(l=Ua(n,s),l!=null&&a.push(Ha(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var LS=/\r\n?/g,IS=/\u0000|\uFFFD/g;function Np(t){return(typeof t=="string"?t:""+t).replace(LS,`
`).replace(IS,"")}function Ao(t,e,n){if(e=Np(e),Np(t)!==e&&n)throw Error(re(425))}function Il(){}var cd=null,ud=null;function dd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var fd=typeof setTimeout=="function"?setTimeout:void 0,DS=typeof clearTimeout=="function"?clearTimeout:void 0,Pp=typeof Promise=="function"?Promise:void 0,US=typeof queueMicrotask=="function"?queueMicrotask:typeof Pp<"u"?function(t){return Pp.resolve(null).then(t).catch(FS)}:fd;function FS(t){setTimeout(function(){throw t})}function Qc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Ba(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Ba(e)}function lr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Lp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Xs=Math.random().toString(36).slice(2),ai="__reactFiber$"+Xs,Va="__reactProps$"+Xs,Pi="__reactContainer$"+Xs,hd="__reactEvents$"+Xs,OS="__reactListeners$"+Xs,BS="__reactHandles$"+Xs;function br(t){var e=t[ai];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Pi]||n[ai]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Lp(t);t!==null;){if(n=t[ai])return n;t=Lp(t)}return e}t=n,n=t.parentNode}return null}function ro(t){return t=t[ai]||t[Pi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ms(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(re(33))}function mc(t){return t[Va]||null}var pd=[],gs=-1;function _r(t){return{current:t}}function ct(t){0>gs||(t.current=pd[gs],pd[gs]=null,gs--)}function at(t,e){gs++,pd[gs]=t.current,t.current=e}var mr={},Jt=_r(mr),hn=_r(!1),Fr=mr;function Is(t,e){var n=t.type.contextTypes;if(!n)return mr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function pn(t){return t=t.childContextTypes,t!=null}function Dl(){ct(hn),ct(Jt)}function Ip(t,e,n){if(Jt.current!==mr)throw Error(re(168));at(Jt,e),at(hn,n)}function Nv(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(re(108,Mx(t)||"Unknown",r));return xt({},n,i)}function Ul(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||mr,Fr=Jt.current,at(Jt,t),at(hn,hn.current),!0}function Dp(t,e,n){var i=t.stateNode;if(!i)throw Error(re(169));n?(t=Nv(t,e,Fr),i.__reactInternalMemoizedMergedChildContext=t,ct(hn),ct(Jt),at(Jt,t)):ct(hn),at(hn,n)}var Mi=null,gc=!1,eu=!1;function Pv(t){Mi===null?Mi=[t]:Mi.push(t)}function kS(t){gc=!0,Pv(t)}function xr(){if(!eu&&Mi!==null){eu=!0;var t=0,e=nt;try{var n=Mi;for(nt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Mi=null,gc=!1}catch(r){throw Mi!==null&&(Mi=Mi.slice(t+1)),nv(Gf,xr),r}finally{nt=e,eu=!1}}return null}var vs=[],_s=0,Fl=null,Ol=0,Ln=[],In=0,Or=null,Ti=1,wi="";function Rr(t,e){vs[_s++]=Ol,vs[_s++]=Fl,Fl=t,Ol=e}function Lv(t,e,n){Ln[In++]=Ti,Ln[In++]=wi,Ln[In++]=Or,Or=t;var i=Ti;t=wi;var r=32-Kn(i)-1;i&=~(1<<r),n+=1;var s=32-Kn(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,Ti=1<<32-Kn(e)+r|n<<r|i,wi=s+t}else Ti=1<<s|n<<r|i,wi=t}function Kf(t){t.return!==null&&(Rr(t,1),Lv(t,1,0))}function Zf(t){for(;t===Fl;)Fl=vs[--_s],vs[_s]=null,Ol=vs[--_s],vs[_s]=null;for(;t===Or;)Or=Ln[--In],Ln[In]=null,wi=Ln[--In],Ln[In]=null,Ti=Ln[--In],Ln[In]=null}var yn=null,Sn=null,ft=!1,Xn=null;function Iv(t,e){var n=Un(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Up(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,yn=t,Sn=lr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,yn=t,Sn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Or!==null?{id:Ti,overflow:wi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Un(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,yn=t,Sn=null,!0):!1;default:return!1}}function md(t){return(t.mode&1)!==0&&(t.flags&128)===0}function gd(t){if(ft){var e=Sn;if(e){var n=e;if(!Up(t,e)){if(md(t))throw Error(re(418));e=lr(n.nextSibling);var i=yn;e&&Up(t,e)?Iv(i,n):(t.flags=t.flags&-4097|2,ft=!1,yn=t)}}else{if(md(t))throw Error(re(418));t.flags=t.flags&-4097|2,ft=!1,yn=t}}}function Fp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;yn=t}function Ro(t){if(t!==yn)return!1;if(!ft)return Fp(t),ft=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!dd(t.type,t.memoizedProps)),e&&(e=Sn)){if(md(t))throw Dv(),Error(re(418));for(;e;)Iv(t,e),e=lr(e.nextSibling)}if(Fp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(re(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Sn=lr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Sn=null}}else Sn=yn?lr(t.stateNode.nextSibling):null;return!0}function Dv(){for(var t=Sn;t;)t=lr(t.nextSibling)}function Ds(){Sn=yn=null,ft=!1}function Jf(t){Xn===null?Xn=[t]:Xn.push(t)}var zS=Ui.ReactCurrentBatchConfig;function sa(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(re(309));var i=n.stateNode}if(!i)throw Error(re(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(re(284));if(!n._owner)throw Error(re(290,t))}return t}function Co(t,e){throw t=Object.prototype.toString.call(e),Error(re(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Op(t){var e=t._init;return e(t._payload)}function Uv(t){function e(d,_){if(t){var S=d.deletions;S===null?(d.deletions=[_],d.flags|=16):S.push(_)}}function n(d,_){if(!t)return null;for(;_!==null;)e(d,_),_=_.sibling;return null}function i(d,_){for(d=new Map;_!==null;)_.key!==null?d.set(_.key,_):d.set(_.index,_),_=_.sibling;return d}function r(d,_){return d=fr(d,_),d.index=0,d.sibling=null,d}function s(d,_,S){return d.index=S,t?(S=d.alternate,S!==null?(S=S.index,S<_?(d.flags|=2,_):S):(d.flags|=2,_)):(d.flags|=1048576,_)}function a(d){return t&&d.alternate===null&&(d.flags|=2),d}function o(d,_,S,M){return _===null||_.tag!==6?(_=ou(S,d.mode,M),_.return=d,_):(_=r(_,S),_.return=d,_)}function l(d,_,S,M){var R=S.type;return R===ds?f(d,_,S.props.children,M,S.key):_!==null&&(_.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===$i&&Op(R)===_.type)?(M=r(_,S.props),M.ref=sa(d,_,S),M.return=d,M):(M=vl(S.type,S.key,S.props,null,d.mode,M),M.ref=sa(d,_,S),M.return=d,M)}function c(d,_,S,M){return _===null||_.tag!==4||_.stateNode.containerInfo!==S.containerInfo||_.stateNode.implementation!==S.implementation?(_=lu(S,d.mode,M),_.return=d,_):(_=r(_,S.children||[]),_.return=d,_)}function f(d,_,S,M,R){return _===null||_.tag!==7?(_=Dr(S,d.mode,M,R),_.return=d,_):(_=r(_,S),_.return=d,_)}function p(d,_,S){if(typeof _=="string"&&_!==""||typeof _=="number")return _=ou(""+_,d.mode,S),_.return=d,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case vo:return S=vl(_.type,_.key,_.props,null,d.mode,S),S.ref=sa(d,null,_),S.return=d,S;case us:return _=lu(_,d.mode,S),_.return=d,_;case $i:var M=_._init;return p(d,M(_._payload),S)}if(ga(_)||ea(_))return _=Dr(_,d.mode,S,null),_.return=d,_;Co(d,_)}return null}function h(d,_,S,M){var R=_!==null?_.key:null;if(typeof S=="string"&&S!==""||typeof S=="number")return R!==null?null:o(d,_,""+S,M);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case vo:return S.key===R?l(d,_,S,M):null;case us:return S.key===R?c(d,_,S,M):null;case $i:return R=S._init,h(d,_,R(S._payload),M)}if(ga(S)||ea(S))return R!==null?null:f(d,_,S,M,null);Co(d,S)}return null}function m(d,_,S,M,R){if(typeof M=="string"&&M!==""||typeof M=="number")return d=d.get(S)||null,o(_,d,""+M,R);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case vo:return d=d.get(M.key===null?S:M.key)||null,l(_,d,M,R);case us:return d=d.get(M.key===null?S:M.key)||null,c(_,d,M,R);case $i:var A=M._init;return m(d,_,S,A(M._payload),R)}if(ga(M)||ea(M))return d=d.get(S)||null,f(_,d,M,R,null);Co(_,M)}return null}function g(d,_,S,M){for(var R=null,A=null,x=_,w=_=0,I=null;x!==null&&w<S.length;w++){x.index>w?(I=x,x=null):I=x.sibling;var C=h(d,x,S[w],M);if(C===null){x===null&&(x=I);break}t&&x&&C.alternate===null&&e(d,x),_=s(C,_,w),A===null?R=C:A.sibling=C,A=C,x=I}if(w===S.length)return n(d,x),ft&&Rr(d,w),R;if(x===null){for(;w<S.length;w++)x=p(d,S[w],M),x!==null&&(_=s(x,_,w),A===null?R=x:A.sibling=x,A=x);return ft&&Rr(d,w),R}for(x=i(d,x);w<S.length;w++)I=m(x,d,w,S[w],M),I!==null&&(t&&I.alternate!==null&&x.delete(I.key===null?w:I.key),_=s(I,_,w),A===null?R=I:A.sibling=I,A=I);return t&&x.forEach(function(P){return e(d,P)}),ft&&Rr(d,w),R}function y(d,_,S,M){var R=ea(S);if(typeof R!="function")throw Error(re(150));if(S=R.call(S),S==null)throw Error(re(151));for(var A=R=null,x=_,w=_=0,I=null,C=S.next();x!==null&&!C.done;w++,C=S.next()){x.index>w?(I=x,x=null):I=x.sibling;var P=h(d,x,C.value,M);if(P===null){x===null&&(x=I);break}t&&x&&P.alternate===null&&e(d,x),_=s(P,_,w),A===null?R=P:A.sibling=P,A=P,x=I}if(C.done)return n(d,x),ft&&Rr(d,w),R;if(x===null){for(;!C.done;w++,C=S.next())C=p(d,C.value,M),C!==null&&(_=s(C,_,w),A===null?R=C:A.sibling=C,A=C);return ft&&Rr(d,w),R}for(x=i(d,x);!C.done;w++,C=S.next())C=m(x,d,w,C.value,M),C!==null&&(t&&C.alternate!==null&&x.delete(C.key===null?w:C.key),_=s(C,_,w),A===null?R=C:A.sibling=C,A=C);return t&&x.forEach(function(O){return e(d,O)}),ft&&Rr(d,w),R}function v(d,_,S,M){if(typeof S=="object"&&S!==null&&S.type===ds&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case vo:e:{for(var R=S.key,A=_;A!==null;){if(A.key===R){if(R=S.type,R===ds){if(A.tag===7){n(d,A.sibling),_=r(A,S.props.children),_.return=d,d=_;break e}}else if(A.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===$i&&Op(R)===A.type){n(d,A.sibling),_=r(A,S.props),_.ref=sa(d,A,S),_.return=d,d=_;break e}n(d,A);break}else e(d,A);A=A.sibling}S.type===ds?(_=Dr(S.props.children,d.mode,M,S.key),_.return=d,d=_):(M=vl(S.type,S.key,S.props,null,d.mode,M),M.ref=sa(d,_,S),M.return=d,d=M)}return a(d);case us:e:{for(A=S.key;_!==null;){if(_.key===A)if(_.tag===4&&_.stateNode.containerInfo===S.containerInfo&&_.stateNode.implementation===S.implementation){n(d,_.sibling),_=r(_,S.children||[]),_.return=d,d=_;break e}else{n(d,_);break}else e(d,_);_=_.sibling}_=lu(S,d.mode,M),_.return=d,d=_}return a(d);case $i:return A=S._init,v(d,_,A(S._payload),M)}if(ga(S))return g(d,_,S,M);if(ea(S))return y(d,_,S,M);Co(d,S)}return typeof S=="string"&&S!==""||typeof S=="number"?(S=""+S,_!==null&&_.tag===6?(n(d,_.sibling),_=r(_,S),_.return=d,d=_):(n(d,_),_=ou(S,d.mode,M),_.return=d,d=_),a(d)):n(d,_)}return v}var Us=Uv(!0),Fv=Uv(!1),Bl=_r(null),kl=null,xs=null,Qf=null;function eh(){Qf=xs=kl=null}function th(t){var e=Bl.current;ct(Bl),t._currentValue=e}function vd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Rs(t,e){kl=t,Qf=xs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(dn=!0),t.firstContext=null)}function On(t){var e=t._currentValue;if(Qf!==t)if(t={context:t,memoizedValue:e,next:null},xs===null){if(kl===null)throw Error(re(308));xs=t,kl.dependencies={lanes:0,firstContext:t}}else xs=xs.next=t;return e}var Nr=null;function nh(t){Nr===null?Nr=[t]:Nr.push(t)}function Ov(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,nh(e)):(n.next=r.next,r.next=n),e.interleaved=n,Li(t,i)}function Li(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Yi=!1;function ih(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Bv(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ri(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function cr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Ye&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Li(t,n)}return r=i.interleaved,r===null?(e.next=e,nh(i)):(e.next=r.next,r.next=e),i.interleaved=e,Li(t,n)}function dl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Hf(t,n)}}function Bp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function zl(t,e,n,i){var r=t.updateQueue;Yi=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?s=c:a.next=c,a=l;var f=t.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==a&&(o===null?f.firstBaseUpdate=c:o.next=c,f.lastBaseUpdate=l))}if(s!==null){var p=r.baseState;a=0,f=c=l=null,o=s;do{var h=o.lane,m=o.eventTime;if((i&h)===h){f!==null&&(f=f.next={eventTime:m,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var g=t,y=o;switch(h=e,m=n,y.tag){case 1:if(g=y.payload,typeof g=="function"){p=g.call(m,p,h);break e}p=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=y.payload,h=typeof g=="function"?g.call(m,p,h):g,h==null)break e;p=xt({},p,h);break e;case 2:Yi=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[o]:h.push(o))}else m={eventTime:m,lane:h,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(c=f=m,l=p):f=f.next=m,a|=h;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;h=o,o=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(f===null&&(l=p),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);kr|=a,t.lanes=a,t.memoizedState=p}}function kp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(re(191,r));r.call(i)}}}var so={},ui=_r(so),Wa=_r(so),ja=_r(so);function Pr(t){if(t===so)throw Error(re(174));return t}function rh(t,e){switch(at(ja,e),at(Wa,t),at(ui,so),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Zu(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Zu(e,t)}ct(ui),at(ui,e)}function Fs(){ct(ui),ct(Wa),ct(ja)}function kv(t){Pr(ja.current);var e=Pr(ui.current),n=Zu(e,t.type);e!==n&&(at(Wa,t),at(ui,n))}function sh(t){Wa.current===t&&(ct(ui),ct(Wa))}var mt=_r(0);function Gl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var tu=[];function ah(){for(var t=0;t<tu.length;t++)tu[t]._workInProgressVersionPrimary=null;tu.length=0}var fl=Ui.ReactCurrentDispatcher,nu=Ui.ReactCurrentBatchConfig,Br=0,gt=null,bt=null,Ot=null,Hl=!1,Ca=!1,Xa=0,GS=0;function $t(){throw Error(re(321))}function oh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Jn(t[n],e[n]))return!1;return!0}function lh(t,e,n,i,r,s){if(Br=s,gt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,fl.current=t===null||t.memoizedState===null?jS:XS,t=n(i,r),Ca){s=0;do{if(Ca=!1,Xa=0,25<=s)throw Error(re(301));s+=1,Ot=bt=null,e.updateQueue=null,fl.current=$S,t=n(i,r)}while(Ca)}if(fl.current=Vl,e=bt!==null&&bt.next!==null,Br=0,Ot=bt=gt=null,Hl=!1,e)throw Error(re(300));return t}function ch(){var t=Xa!==0;return Xa=0,t}function ri(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ot===null?gt.memoizedState=Ot=t:Ot=Ot.next=t,Ot}function Bn(){if(bt===null){var t=gt.alternate;t=t!==null?t.memoizedState:null}else t=bt.next;var e=Ot===null?gt.memoizedState:Ot.next;if(e!==null)Ot=e,bt=t;else{if(t===null)throw Error(re(310));bt=t,t={memoizedState:bt.memoizedState,baseState:bt.baseState,baseQueue:bt.baseQueue,queue:bt.queue,next:null},Ot===null?gt.memoizedState=Ot=t:Ot=Ot.next=t}return Ot}function $a(t,e){return typeof e=="function"?e(t):e}function iu(t){var e=Bn(),n=e.queue;if(n===null)throw Error(re(311));n.lastRenderedReducer=t;var i=bt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,c=s;do{var f=c.lane;if((Br&f)===f)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var p={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=p,a=i):l=l.next=p,gt.lanes|=f,kr|=f}c=c.next}while(c!==null&&c!==s);l===null?a=i:l.next=o,Jn(i,e.memoizedState)||(dn=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,gt.lanes|=s,kr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function ru(t){var e=Bn(),n=e.queue;if(n===null)throw Error(re(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);Jn(s,e.memoizedState)||(dn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function zv(){}function Gv(t,e){var n=gt,i=Bn(),r=e(),s=!Jn(i.memoizedState,r);if(s&&(i.memoizedState=r,dn=!0),i=i.queue,uh(Wv.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Ot!==null&&Ot.memoizedState.tag&1){if(n.flags|=2048,Ya(9,Vv.bind(null,n,i,r,e),void 0,null),Bt===null)throw Error(re(349));Br&30||Hv(n,e,r)}return r}function Hv(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=gt.updateQueue,e===null?(e={lastEffect:null,stores:null},gt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Vv(t,e,n,i){e.value=n,e.getSnapshot=i,jv(e)&&Xv(t)}function Wv(t,e,n){return n(function(){jv(e)&&Xv(t)})}function jv(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Jn(t,n)}catch{return!0}}function Xv(t){var e=Li(t,1);e!==null&&Zn(e,t,1,-1)}function zp(t){var e=ri();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:$a,lastRenderedState:t},e.queue=t,t=t.dispatch=WS.bind(null,gt,t),[e.memoizedState,t]}function Ya(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=gt.updateQueue,e===null?(e={lastEffect:null,stores:null},gt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function $v(){return Bn().memoizedState}function hl(t,e,n,i){var r=ri();gt.flags|=t,r.memoizedState=Ya(1|e,n,void 0,i===void 0?null:i)}function vc(t,e,n,i){var r=Bn();i=i===void 0?null:i;var s=void 0;if(bt!==null){var a=bt.memoizedState;if(s=a.destroy,i!==null&&oh(i,a.deps)){r.memoizedState=Ya(e,n,s,i);return}}gt.flags|=t,r.memoizedState=Ya(1|e,n,s,i)}function Gp(t,e){return hl(8390656,8,t,e)}function uh(t,e){return vc(2048,8,t,e)}function Yv(t,e){return vc(4,2,t,e)}function qv(t,e){return vc(4,4,t,e)}function Kv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Zv(t,e,n){return n=n!=null?n.concat([t]):null,vc(4,4,Kv.bind(null,e,t),n)}function dh(){}function Jv(t,e){var n=Bn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&oh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Qv(t,e){var n=Bn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&oh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function e0(t,e,n){return Br&21?(Jn(n,e)||(n=sv(),gt.lanes|=n,kr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,dn=!0),t.memoizedState=n)}function HS(t,e){var n=nt;nt=n!==0&&4>n?n:4,t(!0);var i=nu.transition;nu.transition={};try{t(!1),e()}finally{nt=n,nu.transition=i}}function t0(){return Bn().memoizedState}function VS(t,e,n){var i=dr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},n0(t))i0(e,n);else if(n=Ov(t,e,n,i),n!==null){var r=rn();Zn(n,t,i,r),r0(n,e,i)}}function WS(t,e,n){var i=dr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(n0(t))i0(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,Jn(o,a)){var l=e.interleaved;l===null?(r.next=r,nh(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Ov(t,e,r,i),n!==null&&(r=rn(),Zn(n,t,i,r),r0(n,e,i))}}function n0(t){var e=t.alternate;return t===gt||e!==null&&e===gt}function i0(t,e){Ca=Hl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function r0(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Hf(t,n)}}var Vl={readContext:On,useCallback:$t,useContext:$t,useEffect:$t,useImperativeHandle:$t,useInsertionEffect:$t,useLayoutEffect:$t,useMemo:$t,useReducer:$t,useRef:$t,useState:$t,useDebugValue:$t,useDeferredValue:$t,useTransition:$t,useMutableSource:$t,useSyncExternalStore:$t,useId:$t,unstable_isNewReconciler:!1},jS={readContext:On,useCallback:function(t,e){return ri().memoizedState=[t,e===void 0?null:e],t},useContext:On,useEffect:Gp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,hl(4194308,4,Kv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return hl(4194308,4,t,e)},useInsertionEffect:function(t,e){return hl(4,2,t,e)},useMemo:function(t,e){var n=ri();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=ri();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=VS.bind(null,gt,t),[i.memoizedState,t]},useRef:function(t){var e=ri();return t={current:t},e.memoizedState=t},useState:zp,useDebugValue:dh,useDeferredValue:function(t){return ri().memoizedState=t},useTransition:function(){var t=zp(!1),e=t[0];return t=HS.bind(null,t[1]),ri().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=gt,r=ri();if(ft){if(n===void 0)throw Error(re(407));n=n()}else{if(n=e(),Bt===null)throw Error(re(349));Br&30||Hv(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Gp(Wv.bind(null,i,s,t),[t]),i.flags|=2048,Ya(9,Vv.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=ri(),e=Bt.identifierPrefix;if(ft){var n=wi,i=Ti;n=(i&~(1<<32-Kn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Xa++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=GS++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},XS={readContext:On,useCallback:Jv,useContext:On,useEffect:uh,useImperativeHandle:Zv,useInsertionEffect:Yv,useLayoutEffect:qv,useMemo:Qv,useReducer:iu,useRef:$v,useState:function(){return iu($a)},useDebugValue:dh,useDeferredValue:function(t){var e=Bn();return e0(e,bt.memoizedState,t)},useTransition:function(){var t=iu($a)[0],e=Bn().memoizedState;return[t,e]},useMutableSource:zv,useSyncExternalStore:Gv,useId:t0,unstable_isNewReconciler:!1},$S={readContext:On,useCallback:Jv,useContext:On,useEffect:uh,useImperativeHandle:Zv,useInsertionEffect:Yv,useLayoutEffect:qv,useMemo:Qv,useReducer:ru,useRef:$v,useState:function(){return ru($a)},useDebugValue:dh,useDeferredValue:function(t){var e=Bn();return bt===null?e.memoizedState=t:e0(e,bt.memoizedState,t)},useTransition:function(){var t=ru($a)[0],e=Bn().memoizedState;return[t,e]},useMutableSource:zv,useSyncExternalStore:Gv,useId:t0,unstable_isNewReconciler:!1};function Wn(t,e){if(t&&t.defaultProps){e=xt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function _d(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:xt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var _c={isMounted:function(t){return(t=t._reactInternals)?$r(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=rn(),r=dr(t),s=Ri(i,r);s.payload=e,n!=null&&(s.callback=n),e=cr(t,s,r),e!==null&&(Zn(e,t,r,i),dl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=rn(),r=dr(t),s=Ri(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=cr(t,s,r),e!==null&&(Zn(e,t,r,i),dl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=rn(),i=dr(t),r=Ri(n,i);r.tag=2,e!=null&&(r.callback=e),e=cr(t,r,i),e!==null&&(Zn(e,t,i,n),dl(e,t,i))}};function Hp(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!za(n,i)||!za(r,s):!0}function s0(t,e,n){var i=!1,r=mr,s=e.contextType;return typeof s=="object"&&s!==null?s=On(s):(r=pn(e)?Fr:Jt.current,i=e.contextTypes,s=(i=i!=null)?Is(t,r):mr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=_c,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Vp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&_c.enqueueReplaceState(e,e.state,null)}function xd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},ih(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=On(s):(s=pn(e)?Fr:Jt.current,r.context=Is(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(_d(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&_c.enqueueReplaceState(r,r.state,null),zl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Os(t,e){try{var n="",i=e;do n+=yx(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function su(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Sd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var YS=typeof WeakMap=="function"?WeakMap:Map;function a0(t,e,n){n=Ri(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){jl||(jl=!0,Nd=i),Sd(t,e)},n}function o0(t,e,n){n=Ri(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Sd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Sd(t,e),typeof i!="function"&&(ur===null?ur=new Set([this]):ur.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function Wp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new YS;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=ly.bind(null,t,e,n),e.then(t,t))}function jp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Xp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ri(-1,1),e.tag=2,cr(n,e,1))),n.lanes|=1),t)}var qS=Ui.ReactCurrentOwner,dn=!1;function nn(t,e,n,i){e.child=t===null?Fv(e,null,n,i):Us(e,t.child,n,i)}function $p(t,e,n,i,r){n=n.render;var s=e.ref;return Rs(e,r),i=lh(t,e,n,i,s,r),n=ch(),t!==null&&!dn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ii(t,e,r)):(ft&&n&&Kf(e),e.flags|=1,nn(t,e,i,r),e.child)}function Yp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!xh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,l0(t,e,s,i,r)):(t=vl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:za,n(a,i)&&t.ref===e.ref)return Ii(t,e,r)}return e.flags|=1,t=fr(s,i),t.ref=e.ref,t.return=e,e.child=t}function l0(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(za(s,i)&&t.ref===e.ref)if(dn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(dn=!0);else return e.lanes=t.lanes,Ii(t,e,r)}return yd(t,e,n,i,r)}function c0(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},at(ys,xn),xn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,at(ys,xn),xn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,at(ys,xn),xn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,at(ys,xn),xn|=i;return nn(t,e,r,n),e.child}function u0(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function yd(t,e,n,i,r){var s=pn(n)?Fr:Jt.current;return s=Is(e,s),Rs(e,r),n=lh(t,e,n,i,s,r),i=ch(),t!==null&&!dn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ii(t,e,r)):(ft&&i&&Kf(e),e.flags|=1,nn(t,e,n,r),e.child)}function qp(t,e,n,i,r){if(pn(n)){var s=!0;Ul(e)}else s=!1;if(Rs(e,r),e.stateNode===null)pl(t,e),s0(e,n,i),xd(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=On(c):(c=pn(n)?Fr:Jt.current,c=Is(e,c));var f=n.getDerivedStateFromProps,p=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";p||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==c)&&Vp(e,a,i,c),Yi=!1;var h=e.memoizedState;a.state=h,zl(e,i,a,r),l=e.memoizedState,o!==i||h!==l||hn.current||Yi?(typeof f=="function"&&(_d(e,n,f,i),l=e.memoizedState),(o=Yi||Hp(e,n,o,i,h,l,c))?(p||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=c,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,Bv(t,e),o=e.memoizedProps,c=e.type===e.elementType?o:Wn(e.type,o),a.props=c,p=e.pendingProps,h=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=On(l):(l=pn(n)?Fr:Jt.current,l=Is(e,l));var m=n.getDerivedStateFromProps;(f=typeof m=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==p||h!==l)&&Vp(e,a,i,l),Yi=!1,h=e.memoizedState,a.state=h,zl(e,i,a,r);var g=e.memoizedState;o!==p||h!==g||hn.current||Yi?(typeof m=="function"&&(_d(e,n,m,i),g=e.memoizedState),(c=Yi||Hp(e,n,c,i,h,g,l)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,g,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,g,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=g),a.props=i,a.state=g,a.context=l,i=c):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return Md(t,e,n,i,s,r)}function Md(t,e,n,i,r,s){u0(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&Dp(e,n,!1),Ii(t,e,s);i=e.stateNode,qS.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=Us(e,t.child,null,s),e.child=Us(e,null,o,s)):nn(t,e,o,s),e.memoizedState=i.state,r&&Dp(e,n,!0),e.child}function d0(t){var e=t.stateNode;e.pendingContext?Ip(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Ip(t,e.context,!1),rh(t,e.containerInfo)}function Kp(t,e,n,i,r){return Ds(),Jf(r),e.flags|=256,nn(t,e,n,i),e.child}var Ed={dehydrated:null,treeContext:null,retryLane:0};function Td(t){return{baseLanes:t,cachePool:null,transitions:null}}function f0(t,e,n){var i=e.pendingProps,r=mt.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),at(mt,r&1),t===null)return gd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=yc(a,i,0,null),t=Dr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Td(n),e.memoizedState=Ed,t):fh(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return KS(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=fr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=fr(o,s):(s=Dr(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?Td(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=Ed,i}return s=t.child,t=s.sibling,i=fr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function fh(t,e){return e=yc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function bo(t,e,n,i){return i!==null&&Jf(i),Us(e,t.child,null,n),t=fh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function KS(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=su(Error(re(422))),bo(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=yc({mode:"visible",children:i.children},r,0,null),s=Dr(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Us(e,t.child,null,a),e.child.memoizedState=Td(a),e.memoizedState=Ed,s);if(!(e.mode&1))return bo(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(re(419)),i=su(s,i,void 0),bo(t,e,a,i)}if(o=(a&t.childLanes)!==0,dn||o){if(i=Bt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Li(t,r),Zn(i,t,r,-1))}return _h(),i=su(Error(re(421))),bo(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=cy.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Sn=lr(r.nextSibling),yn=e,ft=!0,Xn=null,t!==null&&(Ln[In++]=Ti,Ln[In++]=wi,Ln[In++]=Or,Ti=t.id,wi=t.overflow,Or=e),e=fh(e,i.children),e.flags|=4096,e)}function Zp(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),vd(t.return,e,n)}function au(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function h0(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(nn(t,e,i.children,n),i=mt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Zp(t,n,e);else if(t.tag===19)Zp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(at(mt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Gl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),au(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Gl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}au(e,!0,n,null,s);break;case"together":au(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function pl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ii(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),kr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(re(153));if(e.child!==null){for(t=e.child,n=fr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=fr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function ZS(t,e,n){switch(e.tag){case 3:d0(e),Ds();break;case 5:kv(e);break;case 1:pn(e.type)&&Ul(e);break;case 4:rh(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;at(Bl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(at(mt,mt.current&1),e.flags|=128,null):n&e.child.childLanes?f0(t,e,n):(at(mt,mt.current&1),t=Ii(t,e,n),t!==null?t.sibling:null);at(mt,mt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return h0(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),at(mt,mt.current),i)break;return null;case 22:case 23:return e.lanes=0,c0(t,e,n)}return Ii(t,e,n)}var p0,wd,m0,g0;p0=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};wd=function(){};m0=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Pr(ui.current);var s=null;switch(n){case"input":r=$u(t,r),i=$u(t,i),s=[];break;case"select":r=xt({},r,{value:void 0}),i=xt({},i,{value:void 0}),s=[];break;case"textarea":r=Ku(t,r),i=Ku(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Il)}Ju(n,i);var a;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var o=r[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ia.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(o=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ia.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&lt("scroll",t),s||o===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};g0=function(t,e,n,i){n!==i&&(e.flags|=4)};function aa(t,e){if(!ft)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Yt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function JS(t,e,n){var i=e.pendingProps;switch(Zf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Yt(e),null;case 1:return pn(e.type)&&Dl(),Yt(e),null;case 3:return i=e.stateNode,Fs(),ct(hn),ct(Jt),ah(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Ro(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Xn!==null&&(Id(Xn),Xn=null))),wd(t,e),Yt(e),null;case 5:sh(e);var r=Pr(ja.current);if(n=e.type,t!==null&&e.stateNode!=null)m0(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(re(166));return Yt(e),null}if(t=Pr(ui.current),Ro(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[ai]=e,i[Va]=s,t=(e.mode&1)!==0,n){case"dialog":lt("cancel",i),lt("close",i);break;case"iframe":case"object":case"embed":lt("load",i);break;case"video":case"audio":for(r=0;r<_a.length;r++)lt(_a[r],i);break;case"source":lt("error",i);break;case"img":case"image":case"link":lt("error",i),lt("load",i);break;case"details":lt("toggle",i);break;case"input":ap(i,s),lt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},lt("invalid",i);break;case"textarea":lp(i,s),lt("invalid",i)}Ju(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&Ao(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&Ao(i.textContent,o,t),r=["children",""+o]):Ia.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&lt("scroll",i)}switch(n){case"input":_o(i),op(i,s,!0);break;case"textarea":_o(i),cp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Il)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Wg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[ai]=e,t[Va]=i,p0(t,e,!1,!1),e.stateNode=t;e:{switch(a=Qu(n,i),n){case"dialog":lt("cancel",t),lt("close",t),r=i;break;case"iframe":case"object":case"embed":lt("load",t),r=i;break;case"video":case"audio":for(r=0;r<_a.length;r++)lt(_a[r],t);r=i;break;case"source":lt("error",t),r=i;break;case"img":case"image":case"link":lt("error",t),lt("load",t),r=i;break;case"details":lt("toggle",t),r=i;break;case"input":ap(t,i),r=$u(t,i),lt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=xt({},i,{value:void 0}),lt("invalid",t);break;case"textarea":lp(t,i),r=Ku(t,i),lt("invalid",t);break;default:r=i}Ju(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?$g(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&jg(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Da(t,l):typeof l=="number"&&Da(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ia.hasOwnProperty(s)?l!=null&&s==="onScroll"&&lt("scroll",t):l!=null&&Ff(t,s,l,a))}switch(n){case"input":_o(t),op(t,i,!1);break;case"textarea":_o(t),cp(t);break;case"option":i.value!=null&&t.setAttribute("value",""+pr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Es(t,!!i.multiple,s,!1):i.defaultValue!=null&&Es(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Il)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Yt(e),null;case 6:if(t&&e.stateNode!=null)g0(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(re(166));if(n=Pr(ja.current),Pr(ui.current),Ro(e)){if(i=e.stateNode,n=e.memoizedProps,i[ai]=e,(s=i.nodeValue!==n)&&(t=yn,t!==null))switch(t.tag){case 3:Ao(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Ao(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[ai]=e,e.stateNode=i}return Yt(e),null;case 13:if(ct(mt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ft&&Sn!==null&&e.mode&1&&!(e.flags&128))Dv(),Ds(),e.flags|=98560,s=!1;else if(s=Ro(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(re(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(re(317));s[ai]=e}else Ds(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Yt(e),s=!1}else Xn!==null&&(Id(Xn),Xn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||mt.current&1?Nt===0&&(Nt=3):_h())),e.updateQueue!==null&&(e.flags|=4),Yt(e),null);case 4:return Fs(),wd(t,e),t===null&&Ga(e.stateNode.containerInfo),Yt(e),null;case 10:return th(e.type._context),Yt(e),null;case 17:return pn(e.type)&&Dl(),Yt(e),null;case 19:if(ct(mt),s=e.memoizedState,s===null)return Yt(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)aa(s,!1);else{if(Nt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=Gl(t),a!==null){for(e.flags|=128,aa(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return at(mt,mt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Mt()>Bs&&(e.flags|=128,i=!0,aa(s,!1),e.lanes=4194304)}else{if(!i)if(t=Gl(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),aa(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!ft)return Yt(e),null}else 2*Mt()-s.renderingStartTime>Bs&&n!==1073741824&&(e.flags|=128,i=!0,aa(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Mt(),e.sibling=null,n=mt.current,at(mt,i?n&1|2:n&1),e):(Yt(e),null);case 22:case 23:return vh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?xn&1073741824&&(Yt(e),e.subtreeFlags&6&&(e.flags|=8192)):Yt(e),null;case 24:return null;case 25:return null}throw Error(re(156,e.tag))}function QS(t,e){switch(Zf(e),e.tag){case 1:return pn(e.type)&&Dl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Fs(),ct(hn),ct(Jt),ah(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return sh(e),null;case 13:if(ct(mt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(re(340));Ds()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ct(mt),null;case 4:return Fs(),null;case 10:return th(e.type._context),null;case 22:case 23:return vh(),null;case 24:return null;default:return null}}var No=!1,Zt=!1,ey=typeof WeakSet=="function"?WeakSet:Set,Me=null;function Ss(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){St(t,e,i)}else n.current=null}function Ad(t,e,n){try{n()}catch(i){St(t,e,i)}}var Jp=!1;function ty(t,e){if(cd=Nl,t=yv(),qf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,f=0,p=t,h=null;t:for(;;){for(var m;p!==n||r!==0&&p.nodeType!==3||(o=a+r),p!==s||i!==0&&p.nodeType!==3||(l=a+i),p.nodeType===3&&(a+=p.nodeValue.length),(m=p.firstChild)!==null;)h=p,p=m;for(;;){if(p===t)break t;if(h===n&&++c===r&&(o=a),h===s&&++f===i&&(l=a),(m=p.nextSibling)!==null)break;p=h,h=p.parentNode}p=m}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(ud={focusedElem:t,selectionRange:n},Nl=!1,Me=e;Me!==null;)if(e=Me,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Me=t;else for(;Me!==null;){e=Me;try{var g=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var y=g.memoizedProps,v=g.memoizedState,d=e.stateNode,_=d.getSnapshotBeforeUpdate(e.elementType===e.type?y:Wn(e.type,y),v);d.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var S=e.stateNode.containerInfo;S.nodeType===1?S.textContent="":S.nodeType===9&&S.documentElement&&S.removeChild(S.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(re(163))}}catch(M){St(e,e.return,M)}if(t=e.sibling,t!==null){t.return=e.return,Me=t;break}Me=e.return}return g=Jp,Jp=!1,g}function ba(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Ad(e,n,s)}r=r.next}while(r!==i)}}function xc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Rd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function v0(t){var e=t.alternate;e!==null&&(t.alternate=null,v0(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[ai],delete e[Va],delete e[hd],delete e[OS],delete e[BS])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function _0(t){return t.tag===5||t.tag===3||t.tag===4}function Qp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||_0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Cd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Il));else if(i!==4&&(t=t.child,t!==null))for(Cd(t,e,n),t=t.sibling;t!==null;)Cd(t,e,n),t=t.sibling}function bd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(bd(t,e,n),t=t.sibling;t!==null;)bd(t,e,n),t=t.sibling}var Gt=null,jn=!1;function zi(t,e,n){for(n=n.child;n!==null;)x0(t,e,n),n=n.sibling}function x0(t,e,n){if(ci&&typeof ci.onCommitFiberUnmount=="function")try{ci.onCommitFiberUnmount(dc,n)}catch{}switch(n.tag){case 5:Zt||Ss(n,e);case 6:var i=Gt,r=jn;Gt=null,zi(t,e,n),Gt=i,jn=r,Gt!==null&&(jn?(t=Gt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Gt.removeChild(n.stateNode));break;case 18:Gt!==null&&(jn?(t=Gt,n=n.stateNode,t.nodeType===8?Qc(t.parentNode,n):t.nodeType===1&&Qc(t,n),Ba(t)):Qc(Gt,n.stateNode));break;case 4:i=Gt,r=jn,Gt=n.stateNode.containerInfo,jn=!0,zi(t,e,n),Gt=i,jn=r;break;case 0:case 11:case 14:case 15:if(!Zt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Ad(n,e,a),r=r.next}while(r!==i)}zi(t,e,n);break;case 1:if(!Zt&&(Ss(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){St(n,e,o)}zi(t,e,n);break;case 21:zi(t,e,n);break;case 22:n.mode&1?(Zt=(i=Zt)||n.memoizedState!==null,zi(t,e,n),Zt=i):zi(t,e,n);break;default:zi(t,e,n)}}function em(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new ey),e.forEach(function(i){var r=uy.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function zn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:Gt=o.stateNode,jn=!1;break e;case 3:Gt=o.stateNode.containerInfo,jn=!0;break e;case 4:Gt=o.stateNode.containerInfo,jn=!0;break e}o=o.return}if(Gt===null)throw Error(re(160));x0(s,a,r),Gt=null,jn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){St(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)S0(e,t),e=e.sibling}function S0(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(zn(e,t),ti(t),i&4){try{ba(3,t,t.return),xc(3,t)}catch(y){St(t,t.return,y)}try{ba(5,t,t.return)}catch(y){St(t,t.return,y)}}break;case 1:zn(e,t),ti(t),i&512&&n!==null&&Ss(n,n.return);break;case 5:if(zn(e,t),ti(t),i&512&&n!==null&&Ss(n,n.return),t.flags&32){var r=t.stateNode;try{Da(r,"")}catch(y){St(t,t.return,y)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Hg(r,s),Qu(o,a);var c=Qu(o,s);for(a=0;a<l.length;a+=2){var f=l[a],p=l[a+1];f==="style"?$g(r,p):f==="dangerouslySetInnerHTML"?jg(r,p):f==="children"?Da(r,p):Ff(r,f,p,c)}switch(o){case"input":Yu(r,s);break;case"textarea":Vg(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var m=s.value;m!=null?Es(r,!!s.multiple,m,!1):h!==!!s.multiple&&(s.defaultValue!=null?Es(r,!!s.multiple,s.defaultValue,!0):Es(r,!!s.multiple,s.multiple?[]:"",!1))}r[Va]=s}catch(y){St(t,t.return,y)}}break;case 6:if(zn(e,t),ti(t),i&4){if(t.stateNode===null)throw Error(re(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(y){St(t,t.return,y)}}break;case 3:if(zn(e,t),ti(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Ba(e.containerInfo)}catch(y){St(t,t.return,y)}break;case 4:zn(e,t),ti(t);break;case 13:zn(e,t),ti(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(mh=Mt())),i&4&&em(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(Zt=(c=Zt)||f,zn(e,t),Zt=c):zn(e,t),ti(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for(Me=t,f=t.child;f!==null;){for(p=Me=f;Me!==null;){switch(h=Me,m=h.child,h.tag){case 0:case 11:case 14:case 15:ba(4,h,h.return);break;case 1:Ss(h,h.return);var g=h.stateNode;if(typeof g.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(y){St(i,n,y)}}break;case 5:Ss(h,h.return);break;case 22:if(h.memoizedState!==null){nm(p);continue}}m!==null?(m.return=h,Me=m):nm(p)}f=f.sibling}e:for(f=null,p=t;;){if(p.tag===5){if(f===null){f=p;try{r=p.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=p.stateNode,l=p.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=Xg("display",a))}catch(y){St(t,t.return,y)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=c?"":p.memoizedProps}catch(y){St(t,t.return,y)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:zn(e,t),ti(t),i&4&&em(t);break;case 21:break;default:zn(e,t),ti(t)}}function ti(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(_0(n)){var i=n;break e}n=n.return}throw Error(re(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Da(r,""),i.flags&=-33);var s=Qp(t);bd(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=Qp(t);Cd(t,o,a);break;default:throw Error(re(161))}}catch(l){St(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function ny(t,e,n){Me=t,y0(t)}function y0(t,e,n){for(var i=(t.mode&1)!==0;Me!==null;){var r=Me,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||No;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||Zt;o=No;var c=Zt;if(No=a,(Zt=l)&&!c)for(Me=r;Me!==null;)a=Me,l=a.child,a.tag===22&&a.memoizedState!==null?im(r):l!==null?(l.return=a,Me=l):im(r);for(;s!==null;)Me=s,y0(s),s=s.sibling;Me=r,No=o,Zt=c}tm(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Me=s):tm(t)}}function tm(t){for(;Me!==null;){var e=Me;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Zt||xc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Zt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Wn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&kp(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}kp(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&Ba(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(re(163))}Zt||e.flags&512&&Rd(e)}catch(h){St(e,e.return,h)}}if(e===t){Me=null;break}if(n=e.sibling,n!==null){n.return=e.return,Me=n;break}Me=e.return}}function nm(t){for(;Me!==null;){var e=Me;if(e===t){Me=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Me=n;break}Me=e.return}}function im(t){for(;Me!==null;){var e=Me;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{xc(4,e)}catch(l){St(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){St(e,r,l)}}var s=e.return;try{Rd(e)}catch(l){St(e,s,l)}break;case 5:var a=e.return;try{Rd(e)}catch(l){St(e,a,l)}}}catch(l){St(e,e.return,l)}if(e===t){Me=null;break}var o=e.sibling;if(o!==null){o.return=e.return,Me=o;break}Me=e.return}}var iy=Math.ceil,Wl=Ui.ReactCurrentDispatcher,hh=Ui.ReactCurrentOwner,Fn=Ui.ReactCurrentBatchConfig,Ye=0,Bt=null,At=null,Vt=0,xn=0,ys=_r(0),Nt=0,qa=null,kr=0,Sc=0,ph=0,Na=null,un=null,mh=0,Bs=1/0,yi=null,jl=!1,Nd=null,ur=null,Po=!1,er=null,Xl=0,Pa=0,Pd=null,ml=-1,gl=0;function rn(){return Ye&6?Mt():ml!==-1?ml:ml=Mt()}function dr(t){return t.mode&1?Ye&2&&Vt!==0?Vt&-Vt:zS.transition!==null?(gl===0&&(gl=sv()),gl):(t=nt,t!==0||(t=window.event,t=t===void 0?16:fv(t.type)),t):1}function Zn(t,e,n,i){if(50<Pa)throw Pa=0,Pd=null,Error(re(185));no(t,n,i),(!(Ye&2)||t!==Bt)&&(t===Bt&&(!(Ye&2)&&(Sc|=n),Nt===4&&Zi(t,Vt)),mn(t,i),n===1&&Ye===0&&!(e.mode&1)&&(Bs=Mt()+500,gc&&xr()))}function mn(t,e){var n=t.callbackNode;zx(t,e);var i=bl(t,t===Bt?Vt:0);if(i===0)n!==null&&fp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&fp(n),e===1)t.tag===0?kS(rm.bind(null,t)):Pv(rm.bind(null,t)),US(function(){!(Ye&6)&&xr()}),n=null;else{switch(av(i)){case 1:n=Gf;break;case 4:n=iv;break;case 16:n=Cl;break;case 536870912:n=rv;break;default:n=Cl}n=b0(n,M0.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function M0(t,e){if(ml=-1,gl=0,Ye&6)throw Error(re(327));var n=t.callbackNode;if(Cs()&&t.callbackNode!==n)return null;var i=bl(t,t===Bt?Vt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=$l(t,i);else{e=i;var r=Ye;Ye|=2;var s=T0();(Bt!==t||Vt!==e)&&(yi=null,Bs=Mt()+500,Ir(t,e));do try{ay();break}catch(o){E0(t,o)}while(!0);eh(),Wl.current=s,Ye=r,At!==null?e=0:(Bt=null,Vt=0,e=Nt)}if(e!==0){if(e===2&&(r=rd(t),r!==0&&(i=r,e=Ld(t,r))),e===1)throw n=qa,Ir(t,0),Zi(t,i),mn(t,Mt()),n;if(e===6)Zi(t,i);else{if(r=t.current.alternate,!(i&30)&&!ry(r)&&(e=$l(t,i),e===2&&(s=rd(t),s!==0&&(i=s,e=Ld(t,s))),e===1))throw n=qa,Ir(t,0),Zi(t,i),mn(t,Mt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(re(345));case 2:Cr(t,un,yi);break;case 3:if(Zi(t,i),(i&130023424)===i&&(e=mh+500-Mt(),10<e)){if(bl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){rn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=fd(Cr.bind(null,t,un,yi),e);break}Cr(t,un,yi);break;case 4:if(Zi(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-Kn(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=Mt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*iy(i/1960))-i,10<i){t.timeoutHandle=fd(Cr.bind(null,t,un,yi),i);break}Cr(t,un,yi);break;case 5:Cr(t,un,yi);break;default:throw Error(re(329))}}}return mn(t,Mt()),t.callbackNode===n?M0.bind(null,t):null}function Ld(t,e){var n=Na;return t.current.memoizedState.isDehydrated&&(Ir(t,e).flags|=256),t=$l(t,e),t!==2&&(e=un,un=n,e!==null&&Id(e)),t}function Id(t){un===null?un=t:un.push.apply(un,t)}function ry(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Jn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Zi(t,e){for(e&=~ph,e&=~Sc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Kn(e),i=1<<n;t[n]=-1,e&=~i}}function rm(t){if(Ye&6)throw Error(re(327));Cs();var e=bl(t,0);if(!(e&1))return mn(t,Mt()),null;var n=$l(t,e);if(t.tag!==0&&n===2){var i=rd(t);i!==0&&(e=i,n=Ld(t,i))}if(n===1)throw n=qa,Ir(t,0),Zi(t,e),mn(t,Mt()),n;if(n===6)throw Error(re(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Cr(t,un,yi),mn(t,Mt()),null}function gh(t,e){var n=Ye;Ye|=1;try{return t(e)}finally{Ye=n,Ye===0&&(Bs=Mt()+500,gc&&xr())}}function zr(t){er!==null&&er.tag===0&&!(Ye&6)&&Cs();var e=Ye;Ye|=1;var n=Fn.transition,i=nt;try{if(Fn.transition=null,nt=1,t)return t()}finally{nt=i,Fn.transition=n,Ye=e,!(Ye&6)&&xr()}}function vh(){xn=ys.current,ct(ys)}function Ir(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,DS(n)),At!==null)for(n=At.return;n!==null;){var i=n;switch(Zf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Dl();break;case 3:Fs(),ct(hn),ct(Jt),ah();break;case 5:sh(i);break;case 4:Fs();break;case 13:ct(mt);break;case 19:ct(mt);break;case 10:th(i.type._context);break;case 22:case 23:vh()}n=n.return}if(Bt=t,At=t=fr(t.current,null),Vt=xn=e,Nt=0,qa=null,ph=Sc=kr=0,un=Na=null,Nr!==null){for(e=0;e<Nr.length;e++)if(n=Nr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}Nr=null}return t}function E0(t,e){do{var n=At;try{if(eh(),fl.current=Vl,Hl){for(var i=gt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Hl=!1}if(Br=0,Ot=bt=gt=null,Ca=!1,Xa=0,hh.current=null,n===null||n.return===null){Nt=1,qa=e,At=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=Vt,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,f=o,p=f.tag;if(!(f.mode&1)&&(p===0||p===11||p===15)){var h=f.alternate;h?(f.updateQueue=h.updateQueue,f.memoizedState=h.memoizedState,f.lanes=h.lanes):(f.updateQueue=null,f.memoizedState=null)}var m=jp(a);if(m!==null){m.flags&=-257,Xp(m,a,o,s,e),m.mode&1&&Wp(s,c,e),e=m,l=c;var g=e.updateQueue;if(g===null){var y=new Set;y.add(l),e.updateQueue=y}else g.add(l);break e}else{if(!(e&1)){Wp(s,c,e),_h();break e}l=Error(re(426))}}else if(ft&&o.mode&1){var v=jp(a);if(v!==null){!(v.flags&65536)&&(v.flags|=256),Xp(v,a,o,s,e),Jf(Os(l,o));break e}}s=l=Os(l,o),Nt!==4&&(Nt=2),Na===null?Na=[s]:Na.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=a0(s,l,e);Bp(s,d);break e;case 1:o=l;var _=s.type,S=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||S!==null&&typeof S.componentDidCatch=="function"&&(ur===null||!ur.has(S)))){s.flags|=65536,e&=-e,s.lanes|=e;var M=o0(s,o,e);Bp(s,M);break e}}s=s.return}while(s!==null)}A0(n)}catch(R){e=R,At===n&&n!==null&&(At=n=n.return);continue}break}while(!0)}function T0(){var t=Wl.current;return Wl.current=Vl,t===null?Vl:t}function _h(){(Nt===0||Nt===3||Nt===2)&&(Nt=4),Bt===null||!(kr&268435455)&&!(Sc&268435455)||Zi(Bt,Vt)}function $l(t,e){var n=Ye;Ye|=2;var i=T0();(Bt!==t||Vt!==e)&&(yi=null,Ir(t,e));do try{sy();break}catch(r){E0(t,r)}while(!0);if(eh(),Ye=n,Wl.current=i,At!==null)throw Error(re(261));return Bt=null,Vt=0,Nt}function sy(){for(;At!==null;)w0(At)}function ay(){for(;At!==null&&!Px();)w0(At)}function w0(t){var e=C0(t.alternate,t,xn);t.memoizedProps=t.pendingProps,e===null?A0(t):At=e,hh.current=null}function A0(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=QS(n,e),n!==null){n.flags&=32767,At=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Nt=6,At=null;return}}else if(n=JS(n,e,xn),n!==null){At=n;return}if(e=e.sibling,e!==null){At=e;return}At=e=t}while(e!==null);Nt===0&&(Nt=5)}function Cr(t,e,n){var i=nt,r=Fn.transition;try{Fn.transition=null,nt=1,oy(t,e,n,i)}finally{Fn.transition=r,nt=i}return null}function oy(t,e,n,i){do Cs();while(er!==null);if(Ye&6)throw Error(re(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(re(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Gx(t,s),t===Bt&&(At=Bt=null,Vt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Po||(Po=!0,b0(Cl,function(){return Cs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Fn.transition,Fn.transition=null;var a=nt;nt=1;var o=Ye;Ye|=4,hh.current=null,ty(t,n),S0(n,t),RS(ud),Nl=!!cd,ud=cd=null,t.current=n,ny(n),Lx(),Ye=o,nt=a,Fn.transition=s}else t.current=n;if(Po&&(Po=!1,er=t,Xl=r),s=t.pendingLanes,s===0&&(ur=null),Ux(n.stateNode),mn(t,Mt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(jl)throw jl=!1,t=Nd,Nd=null,t;return Xl&1&&t.tag!==0&&Cs(),s=t.pendingLanes,s&1?t===Pd?Pa++:(Pa=0,Pd=t):Pa=0,xr(),null}function Cs(){if(er!==null){var t=av(Xl),e=Fn.transition,n=nt;try{if(Fn.transition=null,nt=16>t?16:t,er===null)var i=!1;else{if(t=er,er=null,Xl=0,Ye&6)throw Error(re(331));var r=Ye;for(Ye|=4,Me=t.current;Me!==null;){var s=Me,a=s.child;if(Me.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(Me=c;Me!==null;){var f=Me;switch(f.tag){case 0:case 11:case 15:ba(8,f,s)}var p=f.child;if(p!==null)p.return=f,Me=p;else for(;Me!==null;){f=Me;var h=f.sibling,m=f.return;if(v0(f),f===c){Me=null;break}if(h!==null){h.return=m,Me=h;break}Me=m}}}var g=s.alternate;if(g!==null){var y=g.child;if(y!==null){g.child=null;do{var v=y.sibling;y.sibling=null,y=v}while(y!==null)}}Me=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,Me=a;else e:for(;Me!==null;){if(s=Me,s.flags&2048)switch(s.tag){case 0:case 11:case 15:ba(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,Me=d;break e}Me=s.return}}var _=t.current;for(Me=_;Me!==null;){a=Me;var S=a.child;if(a.subtreeFlags&2064&&S!==null)S.return=a,Me=S;else e:for(a=_;Me!==null;){if(o=Me,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:xc(9,o)}}catch(R){St(o,o.return,R)}if(o===a){Me=null;break e}var M=o.sibling;if(M!==null){M.return=o.return,Me=M;break e}Me=o.return}}if(Ye=r,xr(),ci&&typeof ci.onPostCommitFiberRoot=="function")try{ci.onPostCommitFiberRoot(dc,t)}catch{}i=!0}return i}finally{nt=n,Fn.transition=e}}return!1}function sm(t,e,n){e=Os(n,e),e=a0(t,e,1),t=cr(t,e,1),e=rn(),t!==null&&(no(t,1,e),mn(t,e))}function St(t,e,n){if(t.tag===3)sm(t,t,n);else for(;e!==null;){if(e.tag===3){sm(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ur===null||!ur.has(i))){t=Os(n,t),t=o0(e,t,1),e=cr(e,t,1),t=rn(),e!==null&&(no(e,1,t),mn(e,t));break}}e=e.return}}function ly(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=rn(),t.pingedLanes|=t.suspendedLanes&n,Bt===t&&(Vt&n)===n&&(Nt===4||Nt===3&&(Vt&130023424)===Vt&&500>Mt()-mh?Ir(t,0):ph|=n),mn(t,e)}function R0(t,e){e===0&&(t.mode&1?(e=yo,yo<<=1,!(yo&130023424)&&(yo=4194304)):e=1);var n=rn();t=Li(t,e),t!==null&&(no(t,e,n),mn(t,n))}function cy(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),R0(t,n)}function uy(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(re(314))}i!==null&&i.delete(e),R0(t,n)}var C0;C0=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||hn.current)dn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return dn=!1,ZS(t,e,n);dn=!!(t.flags&131072)}else dn=!1,ft&&e.flags&1048576&&Lv(e,Ol,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;pl(t,e),t=e.pendingProps;var r=Is(e,Jt.current);Rs(e,n),r=lh(null,e,i,t,r,n);var s=ch();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,pn(i)?(s=!0,Ul(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,ih(e),r.updater=_c,e.stateNode=r,r._reactInternals=e,xd(e,i,t,n),e=Md(null,e,i,!0,s,n)):(e.tag=0,ft&&s&&Kf(e),nn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(pl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=fy(i),t=Wn(i,t),r){case 0:e=yd(null,e,i,t,n);break e;case 1:e=qp(null,e,i,t,n);break e;case 11:e=$p(null,e,i,t,n);break e;case 14:e=Yp(null,e,i,Wn(i.type,t),n);break e}throw Error(re(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),yd(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),qp(t,e,i,r,n);case 3:e:{if(d0(e),t===null)throw Error(re(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Bv(t,e),zl(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Os(Error(re(423)),e),e=Kp(t,e,i,n,r);break e}else if(i!==r){r=Os(Error(re(424)),e),e=Kp(t,e,i,n,r);break e}else for(Sn=lr(e.stateNode.containerInfo.firstChild),yn=e,ft=!0,Xn=null,n=Fv(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ds(),i===r){e=Ii(t,e,n);break e}nn(t,e,i,n)}e=e.child}return e;case 5:return kv(e),t===null&&gd(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,dd(i,r)?a=null:s!==null&&dd(i,s)&&(e.flags|=32),u0(t,e),nn(t,e,a,n),e.child;case 6:return t===null&&gd(e),null;case 13:return f0(t,e,n);case 4:return rh(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Us(e,null,i,n):nn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),$p(t,e,i,r,n);case 7:return nn(t,e,e.pendingProps,n),e.child;case 8:return nn(t,e,e.pendingProps.children,n),e.child;case 12:return nn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,at(Bl,i._currentValue),i._currentValue=a,s!==null)if(Jn(s.value,a)){if(s.children===r.children&&!hn.current){e=Ii(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Ri(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?l.next=l:(l.next=f.next,f.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),vd(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(re(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),vd(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}nn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Rs(e,n),r=On(r),i=i(r),e.flags|=1,nn(t,e,i,n),e.child;case 14:return i=e.type,r=Wn(i,e.pendingProps),r=Wn(i.type,r),Yp(t,e,i,r,n);case 15:return l0(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),pl(t,e),e.tag=1,pn(i)?(t=!0,Ul(e)):t=!1,Rs(e,n),s0(e,i,r),xd(e,i,r,n),Md(null,e,i,!0,t,n);case 19:return h0(t,e,n);case 22:return c0(t,e,n)}throw Error(re(156,e.tag))};function b0(t,e){return nv(t,e)}function dy(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Un(t,e,n,i){return new dy(t,e,n,i)}function xh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function fy(t){if(typeof t=="function")return xh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Bf)return 11;if(t===kf)return 14}return 2}function fr(t,e){var n=t.alternate;return n===null?(n=Un(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function vl(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")xh(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case ds:return Dr(n.children,r,s,e);case Of:a=8,r|=8;break;case Vu:return t=Un(12,n,e,r|2),t.elementType=Vu,t.lanes=s,t;case Wu:return t=Un(13,n,e,r),t.elementType=Wu,t.lanes=s,t;case ju:return t=Un(19,n,e,r),t.elementType=ju,t.lanes=s,t;case kg:return yc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Og:a=10;break e;case Bg:a=9;break e;case Bf:a=11;break e;case kf:a=14;break e;case $i:a=16,i=null;break e}throw Error(re(130,t==null?t:typeof t,""))}return e=Un(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Dr(t,e,n,i){return t=Un(7,t,i,e),t.lanes=n,t}function yc(t,e,n,i){return t=Un(22,t,i,e),t.elementType=kg,t.lanes=n,t.stateNode={isHidden:!1},t}function ou(t,e,n){return t=Un(6,t,null,e),t.lanes=n,t}function lu(t,e,n){return e=Un(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function hy(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Hc(0),this.expirationTimes=Hc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Hc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Sh(t,e,n,i,r,s,a,o,l){return t=new hy(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Un(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},ih(s),t}function py(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:us,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function N0(t){if(!t)return mr;t=t._reactInternals;e:{if($r(t)!==t||t.tag!==1)throw Error(re(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(pn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(re(171))}if(t.tag===1){var n=t.type;if(pn(n))return Nv(t,n,e)}return e}function P0(t,e,n,i,r,s,a,o,l){return t=Sh(n,i,!0,t,r,s,a,o,l),t.context=N0(null),n=t.current,i=rn(),r=dr(n),s=Ri(i,r),s.callback=e??null,cr(n,s,r),t.current.lanes=r,no(t,r,i),mn(t,i),t}function Mc(t,e,n,i){var r=e.current,s=rn(),a=dr(r);return n=N0(n),e.context===null?e.context=n:e.pendingContext=n,e=Ri(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=cr(r,e,a),t!==null&&(Zn(t,r,a,s),dl(t,r,a)),a}function Yl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function am(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function yh(t,e){am(t,e),(t=t.alternate)&&am(t,e)}function my(){return null}var L0=typeof reportError=="function"?reportError:function(t){console.error(t)};function Mh(t){this._internalRoot=t}Ec.prototype.render=Mh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(re(409));Mc(t,e,null,null)};Ec.prototype.unmount=Mh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;zr(function(){Mc(null,t,null,null)}),e[Pi]=null}};function Ec(t){this._internalRoot=t}Ec.prototype.unstable_scheduleHydration=function(t){if(t){var e=cv();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Ki.length&&e!==0&&e<Ki[n].priority;n++);Ki.splice(n,0,t),n===0&&dv(t)}};function Eh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Tc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function om(){}function gy(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Yl(a);s.call(c)}}var a=P0(e,i,t,0,null,!1,!1,"",om);return t._reactRootContainer=a,t[Pi]=a.current,Ga(t.nodeType===8?t.parentNode:t),zr(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var c=Yl(l);o.call(c)}}var l=Sh(t,0,!1,null,null,!1,!1,"",om);return t._reactRootContainer=l,t[Pi]=l.current,Ga(t.nodeType===8?t.parentNode:t),zr(function(){Mc(e,l,n,i)}),l}function wc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=Yl(a);o.call(l)}}Mc(e,a,t,r)}else a=gy(n,e,t,r,i);return Yl(a)}ov=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=va(e.pendingLanes);n!==0&&(Hf(e,n|1),mn(e,Mt()),!(Ye&6)&&(Bs=Mt()+500,xr()))}break;case 13:zr(function(){var i=Li(t,1);if(i!==null){var r=rn();Zn(i,t,1,r)}}),yh(t,1)}};Vf=function(t){if(t.tag===13){var e=Li(t,134217728);if(e!==null){var n=rn();Zn(e,t,134217728,n)}yh(t,134217728)}};lv=function(t){if(t.tag===13){var e=dr(t),n=Li(t,e);if(n!==null){var i=rn();Zn(n,t,e,i)}yh(t,e)}};cv=function(){return nt};uv=function(t,e){var n=nt;try{return nt=t,e()}finally{nt=n}};td=function(t,e,n){switch(e){case"input":if(Yu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=mc(i);if(!r)throw Error(re(90));Gg(i),Yu(i,r)}}}break;case"textarea":Vg(t,n);break;case"select":e=n.value,e!=null&&Es(t,!!n.multiple,e,!1)}};Kg=gh;Zg=zr;var vy={usingClientEntryPoint:!1,Events:[ro,ms,mc,Yg,qg,gh]},oa={findFiberByHostInstance:br,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},_y={bundleType:oa.bundleType,version:oa.version,rendererPackageName:oa.rendererPackageName,rendererConfig:oa.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ui.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=ev(t),t===null?null:t.stateNode},findFiberByHostInstance:oa.findFiberByHostInstance||my,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Lo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Lo.isDisabled&&Lo.supportsFiber)try{dc=Lo.inject(_y),ci=Lo}catch{}}Tn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vy;Tn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Eh(e))throw Error(re(200));return py(t,e,null,n)};Tn.createRoot=function(t,e){if(!Eh(t))throw Error(re(299));var n=!1,i="",r=L0;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Sh(t,1,!1,null,null,n,!1,i,r),t[Pi]=e.current,Ga(t.nodeType===8?t.parentNode:t),new Mh(e)};Tn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(re(188)):(t=Object.keys(t).join(","),Error(re(268,t)));return t=ev(e),t=t===null?null:t.stateNode,t};Tn.flushSync=function(t){return zr(t)};Tn.hydrate=function(t,e,n){if(!Tc(e))throw Error(re(200));return wc(null,t,e,!0,n)};Tn.hydrateRoot=function(t,e,n){if(!Eh(t))throw Error(re(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=L0;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=P0(e,null,t,1,n??null,r,!1,s,a),t[Pi]=e.current,Ga(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Ec(e)};Tn.render=function(t,e,n){if(!Tc(e))throw Error(re(200));return wc(null,t,e,!1,n)};Tn.unmountComponentAtNode=function(t){if(!Tc(t))throw Error(re(40));return t._reactRootContainer?(zr(function(){wc(null,null,t,!1,function(){t._reactRootContainer=null,t[Pi]=null})}),!0):!1};Tn.unstable_batchedUpdates=gh;Tn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Tc(n))throw Error(re(200));if(t==null||t._reactInternals===void 0)throw Error(re(38));return wc(t,e,n,!1,i)};Tn.version="18.3.1-next-f1338f8080-20240426";function I0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(I0)}catch(t){console.error(t)}}I0(),Ig.exports=Tn;var xy=Ig.exports,lm=xy;Gu.createRoot=lm.createRoot,Gu.hydrateRoot=lm.hydrateRoot;/**
 * @remix-run/router v1.23.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ka(){return Ka=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)({}).hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},Ka.apply(null,arguments)}var tr;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(tr||(tr={}));const cm="popstate";function Sy(t){t===void 0&&(t={});function e(i,r){let{pathname:s,search:a,hash:o}=i.location;return Dd("",{pathname:s,search:a,hash:o},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(i,r){return typeof r=="string"?r:ql(r)}return My(e,n,null,t)}function vt(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function D0(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function yy(){return Math.random().toString(36).substr(2,8)}function um(t,e){return{usr:t.state,key:t.key,idx:e}}function Dd(t,e,n,i){return n===void 0&&(n=null),Ka({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?$s(e):e,{state:n,key:e&&e.key||i||yy()})}function ql(t){let{pathname:e="/",search:n="",hash:i=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),i&&i!=="#"&&(e+=i.charAt(0)==="#"?i:"#"+i),e}function $s(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let i=t.indexOf("?");i>=0&&(e.search=t.substr(i),t=t.substr(0,i)),t&&(e.pathname=t)}return e}function My(t,e,n,i){i===void 0&&(i={});let{window:r=document.defaultView,v5Compat:s=!1}=i,a=r.history,o=tr.Pop,l=null,c=f();c==null&&(c=0,a.replaceState(Ka({},a.state,{idx:c}),""));function f(){return(a.state||{idx:null}).idx}function p(){o=tr.Pop;let v=f(),d=v==null?null:v-c;c=v,l&&l({action:o,location:y.location,delta:d})}function h(v,d){o=tr.Push;let _=Dd(y.location,v,d);c=f()+1;let S=um(_,c),M=y.createHref(_);try{a.pushState(S,"",M)}catch(R){if(R instanceof DOMException&&R.name==="DataCloneError")throw R;r.location.assign(M)}s&&l&&l({action:o,location:y.location,delta:1})}function m(v,d){o=tr.Replace;let _=Dd(y.location,v,d);c=f();let S=um(_,c),M=y.createHref(_);a.replaceState(S,"",M),s&&l&&l({action:o,location:y.location,delta:0})}function g(v){let d=r.location.origin!=="null"?r.location.origin:r.location.href,_=typeof v=="string"?v:ql(v);return _=_.replace(/ $/,"%20"),vt(d,"No window.location.(origin|href) available to create URL for href: "+_),new URL(_,d)}let y={get action(){return o},get location(){return t(r,a)},listen(v){if(l)throw new Error("A history only accepts one active listener");return r.addEventListener(cm,p),l=v,()=>{r.removeEventListener(cm,p),l=null}},createHref(v){return e(r,v)},createURL:g,encodeLocation(v){let d=g(v);return{pathname:d.pathname,search:d.search,hash:d.hash}},push:h,replace:m,go(v){return a.go(v)}};return y}var dm;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(dm||(dm={}));function Ey(t,e,n){return n===void 0&&(n="/"),Ty(t,e,n)}function Ty(t,e,n,i){let r=typeof e=="string"?$s(e):e,s=ks(r.pathname||"/",n);if(s==null)return null;let a=U0(t);wy(a);let o=null,l=Fy(s);for(let c=0;o==null&&c<a.length;++c)o=Dy(a[c],l);return o}function U0(t,e,n,i){e===void 0&&(e=[]),n===void 0&&(n=[]),i===void 0&&(i="");let r=(s,a,o)=>{let l={relativePath:o===void 0?s.path||"":o,caseSensitive:s.caseSensitive===!0,childrenIndex:a,route:s};l.relativePath.startsWith("/")&&(vt(l.relativePath.startsWith(i),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+i+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(i.length));let c=hr([i,l.relativePath]),f=n.concat(l);s.children&&s.children.length>0&&(vt(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),U0(s.children,e,f,c)),!(s.path==null&&!s.index)&&e.push({path:c,score:Ly(c,s.index),routesMeta:f})};return t.forEach((s,a)=>{var o;if(s.path===""||!((o=s.path)!=null&&o.includes("?")))r(s,a);else for(let l of F0(s.path))r(s,a,l)}),e}function F0(t){let e=t.split("/");if(e.length===0)return[];let[n,...i]=e,r=n.endsWith("?"),s=n.replace(/\?$/,"");if(i.length===0)return r?[s,""]:[s];let a=F0(i.join("/")),o=[];return o.push(...a.map(l=>l===""?s:[s,l].join("/"))),r&&o.push(...a),o.map(l=>t.startsWith("/")&&l===""?"/":l)}function wy(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:Iy(e.routesMeta.map(i=>i.childrenIndex),n.routesMeta.map(i=>i.childrenIndex)))}const Ay=/^:[\w-]+$/,Ry=3,Cy=2,by=1,Ny=10,Py=-2,fm=t=>t==="*";function Ly(t,e){let n=t.split("/"),i=n.length;return n.some(fm)&&(i+=Py),e&&(i+=Cy),n.filter(r=>!fm(r)).reduce((r,s)=>r+(Ay.test(s)?Ry:s===""?by:Ny),i)}function Iy(t,e){return t.length===e.length&&t.slice(0,-1).every((i,r)=>i===e[r])?t[t.length-1]-e[e.length-1]:0}function Dy(t,e,n){let{routesMeta:i}=t,r={},s="/",a=[];for(let o=0;o<i.length;++o){let l=i[o],c=o===i.length-1,f=s==="/"?e:e.slice(s.length)||"/",p=Ud({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},f),h=l.route;if(!p)return null;Object.assign(r,p.params),a.push({params:r,pathname:hr([s,p.pathname]),pathnameBase:ky(hr([s,p.pathnameBase])),route:h}),p.pathnameBase!=="/"&&(s=hr([s,p.pathnameBase]))}return a}function Ud(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,i]=Uy(t.path,t.caseSensitive,t.end),r=e.match(n);if(!r)return null;let s=r[0],a=s.replace(/(.)\/+$/,"$1"),o=r.slice(1);return{params:i.reduce((c,f,p)=>{let{paramName:h,isOptional:m}=f;if(h==="*"){let y=o[p]||"";a=s.slice(0,s.length-y.length).replace(/(.)\/+$/,"$1")}const g=o[p];return m&&!g?c[h]=void 0:c[h]=(g||"").replace(/%2F/g,"/"),c},{}),pathname:s,pathnameBase:a,pattern:t}}function Uy(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),D0(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let i=[],r="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,o,l)=>(i.push({paramName:o,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(i.push({paramName:"*"}),r+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":t!==""&&t!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,e?void 0:"i"),i]}function Fy(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return D0(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function ks(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,i=t.charAt(n);return i&&i!=="/"?null:t.slice(n)||"/"}function Oy(t,e){e===void 0&&(e="/");let{pathname:n,search:i="",hash:r=""}=typeof t=="string"?$s(t):t,s;return n?(n=O0(n),n.startsWith("/")?s=hm(n.substring(1),"/"):s=hm(n,e)):s=e,{pathname:s,search:zy(i),hash:Gy(r)}}function hm(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function cu(t,e,n,i){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(i)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function By(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function Th(t,e){let n=By(t);return e?n.map((i,r)=>r===n.length-1?i.pathname:i.pathnameBase):n.map(i=>i.pathnameBase)}function wh(t,e,n,i){i===void 0&&(i=!1);let r;typeof t=="string"?r=$s(t):(r=Ka({},t),vt(!r.pathname||!r.pathname.includes("?"),cu("?","pathname","search",r)),vt(!r.pathname||!r.pathname.includes("#"),cu("#","pathname","hash",r)),vt(!r.search||!r.search.includes("#"),cu("#","search","hash",r)));let s=t===""||r.pathname==="",a=s?"/":r.pathname,o;if(a==null)o=n;else{let p=e.length-1;if(!i&&a.startsWith("..")){let h=a.split("/");for(;h[0]==="..";)h.shift(),p-=1;r.pathname=h.join("/")}o=p>=0?e[p]:"/"}let l=Oy(r,o),c=a&&a!=="/"&&a.endsWith("/"),f=(s||a===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||f)&&(l.pathname+="/"),l}const O0=t=>t.replace(/\/\/+/g,"/"),hr=t=>O0(t.join("/")),ky=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),zy=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,Gy=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function Hy(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const B0=["post","put","patch","delete"];new Set(B0);const Vy=["get",...B0];new Set(Vy);/**
 * React Router v6.30.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Za(){return Za=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)({}).hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},Za.apply(null,arguments)}const Ac=Y.createContext(null),k0=Y.createContext(null),Fi=Y.createContext(null),Rc=Y.createContext(null),pi=Y.createContext({outlet:null,matches:[],isDataRoute:!1}),z0=Y.createContext(null);function Wy(t,e){let{relative:n}=e===void 0?{}:e;Ys()||vt(!1);let{basename:i,navigator:r}=Y.useContext(Fi),{hash:s,pathname:a,search:o}=bc(t,{relative:n}),l=a;return i!=="/"&&(l=a==="/"?i:hr([i,a])),r.createHref({pathname:l,search:o,hash:s})}function Ys(){return Y.useContext(Rc)!=null}function Oi(){return Ys()||vt(!1),Y.useContext(Rc).location}function G0(t){Y.useContext(Fi).static||Y.useLayoutEffect(t)}function qs(){let{isDataRoute:t}=Y.useContext(pi);return t?sM():jy()}function jy(){Ys()||vt(!1);let t=Y.useContext(Ac),{basename:e,future:n,navigator:i}=Y.useContext(Fi),{matches:r}=Y.useContext(pi),{pathname:s}=Oi(),a=JSON.stringify(Th(r,n.v7_relativeSplatPath)),o=Y.useRef(!1);return G0(()=>{o.current=!0}),Y.useCallback(function(c,f){if(f===void 0&&(f={}),!o.current)return;if(typeof c=="number"){i.go(c);return}let p=wh(c,JSON.parse(a),s,f.relative==="path");t==null&&e!=="/"&&(p.pathname=p.pathname==="/"?e:hr([e,p.pathname])),(f.replace?i.replace:i.push)(p,f.state,f)},[e,i,a,s,t])}const Xy=Y.createContext(null);function $y(t){let e=Y.useContext(pi).outlet;return e&&Y.createElement(Xy.Provider,{value:t},e)}function Cc(){let{matches:t}=Y.useContext(pi),e=t[t.length-1];return e?e.params:{}}function bc(t,e){let{relative:n}=e===void 0?{}:e,{future:i}=Y.useContext(Fi),{matches:r}=Y.useContext(pi),{pathname:s}=Oi(),a=JSON.stringify(Th(r,i.v7_relativeSplatPath));return Y.useMemo(()=>wh(t,JSON.parse(a),s,n==="path"),[t,a,s,n])}function Yy(t,e){return qy(t,e)}function qy(t,e,n,i){Ys()||vt(!1);let{navigator:r}=Y.useContext(Fi),{matches:s}=Y.useContext(pi),a=s[s.length-1],o=a?a.params:{};a&&a.pathname;let l=a?a.pathnameBase:"/";a&&a.route;let c=Oi(),f;if(e){var p;let v=typeof e=="string"?$s(e):e;l==="/"||(p=v.pathname)!=null&&p.startsWith(l)||vt(!1),f=v}else f=c;let h=f.pathname||"/",m=h;if(l!=="/"){let v=l.replace(/^\//,"").split("/");m="/"+h.replace(/^\//,"").split("/").slice(v.length).join("/")}let g=Ey(t,{pathname:m}),y=eM(g&&g.map(v=>Object.assign({},v,{params:Object.assign({},o,v.params),pathname:hr([l,r.encodeLocation?r.encodeLocation(v.pathname).pathname:v.pathname]),pathnameBase:v.pathnameBase==="/"?l:hr([l,r.encodeLocation?r.encodeLocation(v.pathnameBase).pathname:v.pathnameBase])})),s,n,i);return e&&y?Y.createElement(Rc.Provider,{value:{location:Za({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:tr.Pop}},y):y}function Ky(){let t=rM(),e=Hy(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,r={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return Y.createElement(Y.Fragment,null,Y.createElement("h2",null,"Unexpected Application Error!"),Y.createElement("h3",{style:{fontStyle:"italic"}},e),n?Y.createElement("pre",{style:r},n):null,null)}const Zy=Y.createElement(Ky,null);class Jy extends Y.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?Y.createElement(pi.Provider,{value:this.props.routeContext},Y.createElement(z0.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Qy(t){let{routeContext:e,match:n,children:i}=t,r=Y.useContext(Ac);return r&&r.static&&r.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=n.route.id),Y.createElement(pi.Provider,{value:e},i)}function eM(t,e,n,i){var r;if(e===void 0&&(e=[]),n===void 0&&(n=null),i===void 0&&(i=null),t==null){var s;if(!n)return null;if(n.errors)t=n.matches;else if((s=i)!=null&&s.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let a=t,o=(r=n)==null?void 0:r.errors;if(o!=null){let f=a.findIndex(p=>p.route.id&&(o==null?void 0:o[p.route.id])!==void 0);f>=0||vt(!1),a=a.slice(0,Math.min(a.length,f+1))}let l=!1,c=-1;if(n&&i&&i.v7_partialHydration)for(let f=0;f<a.length;f++){let p=a[f];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(c=f),p.route.id){let{loaderData:h,errors:m}=n,g=p.route.loader&&h[p.route.id]===void 0&&(!m||m[p.route.id]===void 0);if(p.route.lazy||g){l=!0,c>=0?a=a.slice(0,c+1):a=[a[0]];break}}}return a.reduceRight((f,p,h)=>{let m,g=!1,y=null,v=null;n&&(m=o&&p.route.id?o[p.route.id]:void 0,y=p.route.errorElement||Zy,l&&(c<0&&h===0?(aM("route-fallback"),g=!0,v=null):c===h&&(g=!0,v=p.route.hydrateFallbackElement||null)));let d=e.concat(a.slice(0,h+1)),_=()=>{let S;return m?S=y:g?S=v:p.route.Component?S=Y.createElement(p.route.Component,null):p.route.element?S=p.route.element:S=f,Y.createElement(Qy,{match:p,routeContext:{outlet:f,matches:d,isDataRoute:n!=null},children:S})};return n&&(p.route.ErrorBoundary||p.route.errorElement||h===0)?Y.createElement(Jy,{location:n.location,revalidation:n.revalidation,component:y,error:m,children:_(),routeContext:{outlet:null,matches:d,isDataRoute:!0}}):_()},null)}var H0=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(H0||{}),V0=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(V0||{});function tM(t){let e=Y.useContext(Ac);return e||vt(!1),e}function nM(t){let e=Y.useContext(k0);return e||vt(!1),e}function iM(t){let e=Y.useContext(pi);return e||vt(!1),e}function W0(t){let e=iM(),n=e.matches[e.matches.length-1];return n.route.id||vt(!1),n.route.id}function rM(){var t;let e=Y.useContext(z0),n=nM(),i=W0();return e!==void 0?e:(t=n.errors)==null?void 0:t[i]}function sM(){let{router:t}=tM(H0.UseNavigateStable),e=W0(V0.UseNavigateStable),n=Y.useRef(!1);return G0(()=>{n.current=!0}),Y.useCallback(function(r,s){s===void 0&&(s={}),n.current&&(typeof r=="number"?t.navigate(r):t.navigate(r,Za({fromRouteId:e},s)))},[t,e])}const pm={};function aM(t,e,n){pm[t]||(pm[t]=!0)}function oM(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function Kl(t){let{to:e,replace:n,state:i,relative:r}=t;Ys()||vt(!1);let{future:s,static:a}=Y.useContext(Fi),{matches:o}=Y.useContext(pi),{pathname:l}=Oi(),c=qs(),f=wh(e,Th(o,s.v7_relativeSplatPath),l,r==="path"),p=JSON.stringify(f);return Y.useEffect(()=>c(JSON.parse(p),{replace:n,state:i,relative:r}),[c,p,r,n,i]),null}function lM(t){return $y(t.context)}function en(t){vt(!1)}function cM(t){let{basename:e="/",children:n=null,location:i,navigationType:r=tr.Pop,navigator:s,static:a=!1,future:o}=t;Ys()&&vt(!1);let l=e.replace(/^\/*/,"/"),c=Y.useMemo(()=>({basename:l,navigator:s,static:a,future:Za({v7_relativeSplatPath:!1},o)}),[l,o,s,a]);typeof i=="string"&&(i=$s(i));let{pathname:f="/",search:p="",hash:h="",state:m=null,key:g="default"}=i,y=Y.useMemo(()=>{let v=ks(f,l);return v==null?null:{location:{pathname:v,search:p,hash:h,state:m,key:g},navigationType:r}},[l,f,p,h,m,g,r]);return y==null?null:Y.createElement(Fi.Provider,{value:c},Y.createElement(Rc.Provider,{children:n,value:y}))}function uM(t){let{children:e,location:n}=t;return Yy(Fd(e),n)}new Promise(()=>{});function Fd(t,e){e===void 0&&(e=[]);let n=[];return Y.Children.forEach(t,(i,r)=>{if(!Y.isValidElement(i))return;let s=[...e,r];if(i.type===Y.Fragment){n.push.apply(n,Fd(i.props.children,s));return}i.type!==en&&vt(!1),!i.props.index||!i.props.children||vt(!1);let a={id:i.props.id||s.join("-"),caseSensitive:i.props.caseSensitive,element:i.props.element,Component:i.props.Component,index:i.props.index,path:i.props.path,loader:i.props.loader,action:i.props.action,errorElement:i.props.errorElement,ErrorBoundary:i.props.ErrorBoundary,hasErrorBoundary:i.props.ErrorBoundary!=null||i.props.errorElement!=null,shouldRevalidate:i.props.shouldRevalidate,handle:i.props.handle,lazy:i.props.lazy};i.props.children&&(a.children=Fd(i.props.children,s)),n.push(a)}),n}/**
 * React Router DOM v6.30.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Zl(){return Zl=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)({}).hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},Zl.apply(null,arguments)}function j0(t,e){if(t==null)return{};var n={};for(var i in t)if({}.hasOwnProperty.call(t,i)){if(e.indexOf(i)!==-1)continue;n[i]=t[i]}return n}function dM(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function fM(t,e){return t.button===0&&(!e||e==="_self")&&!dM(t)}function Od(t){return t===void 0&&(t=""),new URLSearchParams(typeof t=="string"||Array.isArray(t)||t instanceof URLSearchParams?t:Object.keys(t).reduce((e,n)=>{let i=t[n];return e.concat(Array.isArray(i)?i.map(r=>[n,r]):[[n,i]])},[]))}function hM(t,e){let n=Od(t);return e&&e.forEach((i,r)=>{n.has(r)||e.getAll(r).forEach(s=>{n.append(r,s)})}),n}const pM=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],mM=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],gM="6";try{window.__reactRouterVersion=gM}catch{}const vM=Y.createContext({isTransitioning:!1}),_M="startTransition",mm=lx[_M];function xM(t){let{basename:e,children:n,future:i,window:r}=t,s=Y.useRef();s.current==null&&(s.current=Sy({window:r,v5Compat:!0}));let a=s.current,[o,l]=Y.useState({action:a.action,location:a.location}),{v7_startTransition:c}=i||{},f=Y.useCallback(p=>{c&&mm?mm(()=>l(p)):l(p)},[l,c]);return Y.useLayoutEffect(()=>a.listen(f),[a,f]),Y.useEffect(()=>oM(i),[i]),Y.createElement(cM,{basename:e,children:n,location:o.location,navigationType:o.action,navigator:a,future:i})}const SM=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",yM=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,ot=Y.forwardRef(function(e,n){let{onClick:i,relative:r,reloadDocument:s,replace:a,state:o,target:l,to:c,preventScrollReset:f,viewTransition:p}=e,h=j0(e,pM),{basename:m}=Y.useContext(Fi),g,y=!1;if(typeof c=="string"&&yM.test(c)&&(g=c,SM))try{let S=new URL(window.location.href),M=c.startsWith("//")?new URL(S.protocol+c):new URL(c),R=ks(M.pathname,m);M.origin===S.origin&&R!=null?c=R+M.search+M.hash:y=!0}catch{}let v=Wy(c,{relative:r}),d=TM(c,{replace:a,state:o,target:l,preventScrollReset:f,relative:r,viewTransition:p});function _(S){i&&i(S),S.defaultPrevented||d(S)}return Y.createElement("a",Zl({},h,{href:g||v,onClick:y||s?i:_,ref:n,target:l}))}),MM=Y.forwardRef(function(e,n){let{"aria-current":i="page",caseSensitive:r=!1,className:s="",end:a=!1,style:o,to:l,viewTransition:c,children:f}=e,p=j0(e,mM),h=bc(l,{relative:p.relative}),m=Oi(),g=Y.useContext(k0),{navigator:y,basename:v}=Y.useContext(Fi),d=g!=null&&wM(h)&&c===!0,_=y.encodeLocation?y.encodeLocation(h).pathname:h.pathname,S=m.pathname,M=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;r||(S=S.toLowerCase(),M=M?M.toLowerCase():null,_=_.toLowerCase()),M&&v&&(M=ks(M,v)||M);const R=_!=="/"&&_.endsWith("/")?_.length-1:_.length;let A=S===_||!a&&S.startsWith(_)&&S.charAt(R)==="/",x=M!=null&&(M===_||!a&&M.startsWith(_)&&M.charAt(_.length)==="/"),w={isActive:A,isPending:x,isTransitioning:d},I=A?i:void 0,C;typeof s=="function"?C=s(w):C=[s,A?"active":null,x?"pending":null,d?"transitioning":null].filter(Boolean).join(" ");let P=typeof o=="function"?o(w):o;return Y.createElement(ot,Zl({},p,{"aria-current":I,className:C,ref:n,style:P,to:l,viewTransition:c}),typeof f=="function"?f(w):f)});var Bd;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(Bd||(Bd={}));var gm;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(gm||(gm={}));function EM(t){let e=Y.useContext(Ac);return e||vt(!1),e}function TM(t,e){let{target:n,replace:i,state:r,preventScrollReset:s,relative:a,viewTransition:o}=e===void 0?{}:e,l=qs(),c=Oi(),f=bc(t,{relative:a});return Y.useCallback(p=>{if(fM(p,n)){p.preventDefault();let h=i!==void 0?i:ql(c)===ql(f);l(t,{replace:h,state:r,preventScrollReset:s,relative:a,viewTransition:o})}},[c,l,f,i,r,n,t,s,a,o])}function X0(t){let e=Y.useRef(Od(t)),n=Y.useRef(!1),i=Oi(),r=Y.useMemo(()=>hM(i.search,n.current?null:e.current),[i.search]),s=qs(),a=Y.useCallback((o,l)=>{const c=Od(typeof o=="function"?o(r):o);n.current=!0,s("?"+c,l)},[s,r]);return[r,a]}function wM(t,e){e===void 0&&(e={});let n=Y.useContext(vM);n==null&&vt(!1);let{basename:i}=EM(Bd.useViewTransitionState),r=bc(t,{relative:e.relative});if(!n.isTransitioning)return!1;let s=ks(n.currentLocation.pathname,i)||n.currentLocation.pathname,a=ks(n.nextLocation.pathname,i)||n.nextLocation.pathname;return Ud(r.pathname,a)!=null||Ud(r.pathname,s)!=null}const nr={maxMark:100,scale:[{grade:"A",min:75,points:1,gpa:5},{grade:"B",min:65,points:2,gpa:4},{grade:"C",min:45,points:3,gpa:3},{grade:"D",min:30,points:4,gpa:2},{grade:"F",min:0,points:5,gpa:1}],bestSubjects:7,divisions:[{name:"I",maxPoints:17},{name:"II",maxPoints:21},{name:"III",maxPoints:25},{name:"IV",maxPoints:33},{name:"0",maxPoints:1/0}],passDivisions:["I","II","III","IV"]};function Jl(t){return typeof t!="number"?null:nr.scale.find(e=>t>=e.min)||null}function AM(t){const e=String(t??"").trim();if(e==="")return{ok:!0,value:null};if(!/^\d+(\.\d+)?$/.test(e))return{ok:!1,value:null,error:"Enter numbers only"};const n=Number(e);return n>nr.maxMark?{ok:!1,value:null,error:`Maximum is ${nr.maxMark}`}:{ok:!0,value:n}}function RM(t){const e=t.filter(c=>typeof c.mark=="number").map(c=>({...c,...Jl(c.mark)})),n=e.reduce((c,f)=>c+f.mark,0),i=e.length?n/e.length:0,r=[...e].sort((c,f)=>c.points-f.points||f.mark-c.mark).slice(0,nr.bestSubjects),s=r.length>=nr.bestSubjects,a=r.reduce((c,f)=>c+f.points,0),o=r.length?r.reduce((c,f)=>c+f.gpa,0)/r.length:0;let l="INC";return s&&(l=nr.divisions.find(c=>a<=c.maxPoints).name),{subjects:t.map(c=>{var f;return{...c,grade:((f=Jl(c.mark))==null?void 0:f.grade)??(c.mark==="ABS"?"ABS":"–")}}),total:n,average:Math.round(i*10)/10,points:a,gpa:Math.round(o*100)/100,division:l,pass:nr.passDivisions.includes(l)}}const CM=["Kigoma Ujiji MC","Kigoma DC","Kasulu TC","Kasulu DC","Kibondo DC","Buhigwe DC","Kakonko DC","Uvinza DC"],bs=[{code:"CIV",name:"Civics",compulsory:!0},{code:"HIS",name:"History",compulsory:!0},{code:"GEO",name:"Geography",compulsory:!0},{code:"KIS",name:"Kiswahili",compulsory:!0},{code:"ENG",name:"English",compulsory:!0},{code:"BIO",name:"Biology",compulsory:!0},{code:"PHY",name:"Physics",compulsory:!1},{code:"CHE",name:"Chemistry",compulsory:!1},{code:"MAT",name:"Mathematics",compulsory:!0}],Ah=["Form 1","Form 2","Form 3","Form 4","Form 5","Form 6"],bM=["PCM","PCB","CBG","HGL","HGK","EGM","HKL"],kd={id:"mock-2026",name:"Form Four Mock 2026"},Di=[{id:1,code:"S0101",name:"Lakeview Secondary",council:"Kigoma Ujiji MC",ownership:"Government"},{id:2,code:"S0102",name:"Ujiji Hill Secondary",council:"Kigoma Ujiji MC",ownership:"Private"},{id:3,code:"S0201",name:"Mwandiga Secondary",council:"Kigoma DC",ownership:"Government"},{id:4,code:"S0301",name:"Kasulu Town Secondary",council:"Kasulu TC",ownership:"Government"},{id:5,code:"S0302",name:"Heri Girls Secondary",council:"Kasulu TC",ownership:"Private"},{id:6,code:"S0501",name:"Kibondo Central Secondary",council:"Kibondo DC",ownership:"Government"},{id:7,code:"S0801",name:"Uvinza Valley Secondary",council:"Uvinza DC",ownership:"Government"},{id:8,code:"S0601",name:"Buhigwe Ridge Secondary",council:"Buhigwe DC",ownership:"Government"}],NM=[{username:"region",password:"demo1234",name:"Neema Kagoma",role:"regional_admin"},{username:"kasulu",password:"demo1234",name:"Hamisi Ntibuka",role:"council_admin",council:"Kasulu TC"},{username:"lakeview",password:"demo1234",name:"Mwajuma Bakari",role:"school_admin",schoolId:1},{username:"teacher",password:"demo1234",name:"Elias Mrisho",role:"teacher",schoolId:1,subjects:["BIO","CHE"]}];function PM(t){return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const xa=PM(2026),LM=["Asha","Neema","Rehema","Zawadi","Mwajuma","Upendo","Furaha","Tumaini","Esther","Joyce","Grace","Amina"],IM=["Juma","Baraka","Elias","Hamisi","Emmanuel","Daudi","Salum","Peter","Yusuph","Samson","Ibrahim","Jackson"],DM=["Ntibuka","Kagoma","Bakari","Mrisho","Rugemalila","Sebastian","Mwita","Nsabi","Kabura","Hakizimana","Ndayisenga","Masanja"],vm=t=>t[Math.floor(xa()*t.length)],ao=[];Di.forEach(t=>{const e=t.name.includes("Girls");for(let n=1;n<=14;n++){const i=e||xa()<.5?"F":"M",r=28+xa()*55+(t.ownership==="Private"?6:0),s={};bs.forEach(a=>{const o=xa();o<.015?s[a.code]="ABS":o<.03?s[a.code]=null:s[a.code]=Math.max(4,Math.min(98,Math.round(r+(xa()-.5)*30)))}),ao.push({id:t.id*100+n,regNo:`${t.code}/${String(n).padStart(4,"0")}`,name:`${vm(i==="F"?LM:IM)} ${vm(DM)}`,gender:i,form:"Form 4",schoolId:t.id,combination:null,marks:s})}});function UM(t){const e=bs.map(n=>({code:n.code,name:n.name,mark:t.marks[n.code]??null}));return{student:t,...RM(e)}}const Nc=ao.map(UM),$0={CIV:"CIV",HIS:"HIST",GEO:"GEO",KIS:"KISW",ENG:"ENGL",BIO:"BIO",PHY:"PHYS",CHE:"CHEM",MAT:"B/MATH"},Ms=["I","II","III","IV","0"],uu=t=>t.subjects.every(e=>e.mark==="ABS");function FM(t){return t.subjects.map(e=>{const n=e.mark==="ABS"?"X":typeof e.mark=="number"?e.grade:"*";return`${$0[e.code]||e.code} - '${n}'`}).join("  ")}function OM(){return Di.map(t=>({code:t.code,name:t.name,council:t.council,ownership:t.ownership}))}function BM(t){const e=Di.find(m=>m.code.toUpperCase()===String(t).toUpperCase());if(!e)return null;const n=Nc.filter(m=>m.student.schoolId===e.id).sort((m,g)=>m.student.regNo.localeCompare(g.student.regNo)),i=n.map(m=>{const g=uu(m);return{cno:m.student.regNo,sex:m.student.gender,aggt:g||m.division==="INC"?"-":m.points,div:g?"ABS":m.division,detail:g?"":FM(m)}}),r=n.filter(m=>!uu(m)),s=(m,g)=>m.filter(y=>y.division===g&&!uu(y)).length,a=["F","M","T"].map(m=>{const g=m==="T"?n:n.filter(y=>y.student.gender===m);return{sex:m,...Object.fromEntries(Ms.map(y=>[y,s(g,y)])),INC:s(g,"INC")}}),o=n.length,l=o-r.length,c={registered:o,absent:l,sat:r.length,withheld:0,noCa:0,clean:r.length,...Object.fromEntries(Ms.map(m=>[m,s(n,m)])),INC:s(n,"INC")},f=r.filter(m=>m.division!=="INC"),p=f.length?f.reduce((m,g)=>m+g.gpa,0)/f.length:0,h=bs.map(m=>{const g=n.map(d=>d.student.marks[m.code]??null),y={A:0,B:0,C:0,D:0,F:0};g.forEach(d=>{typeof d=="number"&&y[Jl(d).grade]++});const v=g.filter(d=>typeof d=="number").length;return{code:$0[m.code]||m.code,name:m.name.toUpperCase(),reg:g.length,sat:v,noCa:0,withheld:0,clean:v,pass:v-y.F,grades:y}});return{school:e,candidates:i,divisionSummary:a,summary:c,subjects:h,gpa:Math.round(p*100)/100}}const oo=t=>new Promise(e=>setTimeout(e,t));async function kM(t,e){await oo(400);const n=NM.find(s=>s.username===t.trim()&&s.password===e);if(!n)throw new Error("Wrong username or password. Check both and try again.");const{password:i,...r}=n;return r}async function zM({schoolId:t,form:e,subject:n,exam:i,rows:r}){return await oo(600),{saved:r.length}}async function GM(t){await oo(500);const e=t.trim().toUpperCase(),n=ao.find(i=>i.regNo.toUpperCase()===e);return n?Nc.find(i=>i.student.id===n.id):null}async function HM(){return await oo(250),OM()}async function VM(t){return await oo(350),BM(t)}const Y0=Y.createContext(null);function WM({children:t}){const[e,n]=Y.useState(()=>{try{return JSON.parse(sessionStorage.getItem("kigoma_user"))}catch{return null}}),i=Y.useMemo(()=>({user:e,async signIn(r,s){const a=await kM(r,s);return sessionStorage.setItem("kigoma_user",JSON.stringify(a)),n(a),a},signOut(){sessionStorage.removeItem("kigoma_user"),n(null)}}),[e]);return u.jsx(Y0.Provider,{value:i,children:t})}const Yr=()=>Y.useContext(Y0);function Io({children:t,roles:e}){const{user:n}=Yr(),i=Oi();return n?e&&!e.includes(n.role)?u.jsx(Kl,{to:"/dashboard",replace:!0}):t:u.jsx(Kl,{to:"/login",state:{from:i},replace:!0})}function Pc(t,e){return t.role==="regional_admin"?e:t.role==="council_admin"?e.filter(n=>n.council===t.council):e.filter(n=>n.id===t.schoolId)}const _m={regional_admin:"Regional admin",council_admin:"Council admin",school_admin:"School admin",teacher:"Teacher"},jM={grid:"M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",school:"M3 10l9-6 9 6v10H3zM9 20v-6h6v6",users:"M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 3-5 6-5s6 2 6 5M17 11a2.5 2.5 0 1 0 0-5M17 15c3 0 4 2 4 5",edit:"M4 20h4L19 9l-4-4L4 16zM14 6l4 4",search:"M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM20 20l-4-4",out:"M9 4H5v16h4M16 8l4 4-4 4M20 12H9",menu:"M4 6h16M4 12h16M4 18h16",print:"M7 9V4h10v5M7 17H4v-6h16v6h-3M7 14h10v6H7z",upload:"M12 16V5M7 9l5-5 5 5M5 20h14",plus:"M12 5v14M5 12h14",close:"M6 6l12 12M18 6L6 18"};function Lr({name:t,size:e=20}){return u.jsx("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:u.jsx("path",{d:jM[t]})})}const XM=["regional_admin","council_admin","school_admin","teacher"],$M=[{to:"/dashboard",label:"Dashboard",icon:"grid",roles:XM,end:!0},{to:"/schools",label:"Schools",icon:"school",roles:["regional_admin","council_admin"]},{to:"/students",label:"Students",icon:"users",roles:["regional_admin","council_admin","school_admin"]},{to:"/marks",label:"Marks entry",icon:"edit",roles:["school_admin","teacher"]}];function YM(){const{user:t,signOut:e}=Yr(),n=qs(),[i,r]=Y.useState(!1),s=t.role==="council_admin"?t.council:t.role==="regional_admin"?"Kigoma Region":null;return u.jsxs("div",{className:"shell",children:[u.jsxs("aside",{className:`sidebar ${i?"is-open":""}`,children:[u.jsxs("div",{className:"brand",children:[u.jsx("span",{className:"brand-mark","aria-hidden":"true"}),u.jsx("span",{children:"Kigoma Results"})]}),u.jsxs("nav",{"aria-label":"Main",children:[$M.filter(a=>a.roles.includes(t.role)).map(a=>u.jsxs(MM,{to:a.to,end:a.end,className:"nav-link",onClick:()=>r(!1),children:[u.jsx(Lr,{name:a.icon}),a.label]},a.to)),u.jsxs("a",{className:"nav-link",href:"/results",target:"_blank",rel:"noreferrer",children:[u.jsx(Lr,{name:"search"}),"Public results page"]})]}),u.jsxs("div",{className:"sidebar-foot",children:[u.jsxs("div",{className:"who",children:[u.jsx("strong",{children:t.name}),u.jsx("span",{children:_m[t.role]}),s&&u.jsx("span",{children:s})]}),u.jsxs("button",{className:"nav-link nav-button",onClick:()=>{e(),n("/login")},children:[u.jsx(Lr,{name:"out"}),"Sign out"]})]})]}),u.jsxs("div",{className:"main",children:[u.jsxs("header",{className:"topbar",children:[u.jsx("button",{className:"icon-btn menu-btn",onClick:()=>r(a=>!a),"aria-label":"Open menu",children:u.jsx(Lr,{name:"menu"})}),u.jsx("span",{className:"topbar-title",children:_m[t.role]})]}),u.jsx("main",{className:"content",children:u.jsx(lM,{})})]}),i&&u.jsx("div",{className:"scrim",onClick:()=>r(!1)})]})}const qM=[{label:"Regional admin",username:"region"},{label:"Council admin",username:"kasulu"},{label:"School admin",username:"lakeview"},{label:"Teacher",username:"teacher"}];function KM(){const{user:t,signIn:e}=Yr(),n=qs(),i=Oi(),[r,s]=Y.useState(""),[a,o]=Y.useState(""),[l,c]=Y.useState(""),[f,p]=Y.useState(!1);if(t)return u.jsx(Kl,{to:"/dashboard",replace:!0});async function h(m){var g,y;if(m.preventDefault(),c(""),!r.trim()||!a){c("Enter your username and password.");return}p(!0);try{await e(r,a),n(((y=(g=i.state)==null?void 0:g.from)==null?void 0:y.pathname)||"/dashboard",{replace:!0})}catch(v){c(v.message)}finally{p(!1)}}return u.jsxs("div",{className:"login",children:[u.jsxs("section",{className:"login-hero",children:[u.jsxs("div",{children:[u.jsx("p",{className:"login-kicker",children:"Kigoma Region"}),u.jsx("h1",{children:"Results, from marks entry to published slip."}),u.jsx("p",{className:"login-sub",children:"Teachers enter marks, schools check them, councils and the region see how every school is doing."})]}),u.jsxs("svg",{className:"waves",viewBox:"0 0 600 160",preserveAspectRatio:"none","aria-hidden":"true",children:[u.jsx("path",{d:"M0 60 C 100 30, 200 90, 300 60 S 500 30, 600 60 V160 H0Z"}),u.jsx("path",{d:"M0 90 C 120 60, 220 120, 330 90 S 520 70, 600 95 V160 H0Z"}),u.jsx("path",{d:"M0 120 C 100 100, 220 140, 330 118 S 500 110, 600 125 V160 H0Z"})]})]}),u.jsxs("section",{className:"login-panel",children:[u.jsxs("form",{onSubmit:h,className:"login-form",noValidate:!0,children:[u.jsx("h2",{children:"Sign in"}),u.jsxs("label",{className:"field",children:[u.jsx("span",{children:"Username"}),u.jsx("input",{value:r,onChange:m=>s(m.target.value),autoComplete:"username",autoFocus:!0})]}),u.jsxs("label",{className:"field",children:[u.jsx("span",{children:"Password"}),u.jsx("input",{type:"password",value:a,onChange:m=>o(m.target.value),autoComplete:"current-password"})]}),l&&u.jsx("p",{className:"form-error",role:"alert",children:l}),u.jsx("button",{className:"btn btn-primary",disabled:f,children:f?"Signing in…":"Sign in"}),u.jsxs("p",{className:"login-link",children:["Looking for a student’s results? ",u.jsx(ot,{to:"/results",children:"Check results"})]})]}),u.jsxs("div",{className:"demo-box",children:[u.jsxs("p",{children:[u.jsx("strong",{children:"Demo accounts"})," (password ",u.jsx("code",{children:"demo1234"}),"). Pick one to fill the form:"]}),u.jsx("div",{className:"demo-list",children:qM.map(m=>u.jsx("button",{type:"button",className:"chip",onClick:()=>{s(m.username),o("demo1234")},children:m.label},m.username))})]})]})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Rh="187",ZM=0,xm=1,JM=2,_l=1,QM=2,Sa=3,Gr=0,gn=1,Ei=2,Ns=0,La=1,Sm=2,ym=3,Mm=4,eE=5,cs=100,tE=101,nE=102,iE=103,rE=104,sE=200,aE=201,oE=202,lE=203,q0=204,K0=205,cE=206,uE=207,dE=208,fE=209,hE=210,pE=211,mE=212,gE=213,vE=214,zd=0,Gd=1,Hd=2,Ja=3,Vd=4,Wd=5,jd=6,Xd=7,Z0=0,_E=1,xE=2,Ci=0,J0=1,Q0=2,e_=3,t_=4,n_=5,i_=6,r_=7,s_=300,zs=301,Qa=302,du=303,fu=304,$d=1e3,Ai=1001,Yd=1002,Ht=1003,SE=1004,Do=1005,fn=1006,hu=1007,ir=1008,Dn=1009,a_=1010,o_=1011,eo=1012,Ch=1013,fi=1014,oi=1015,hi=1016,bh=1017,Nh=1018,Gs=1020,l_=35902,c_=35899,u_=1021,d_=1022,li=1023,gr=1026,rr=1027,f_=1028,Ph=1029,Hr=1030,Lh=1031,Ih=1033,xl=33776,Sl=33777,yl=33778,Ml=33779,qd=35840,Kd=35841,Zd=35842,Jd=35843,Qd=36196,ef=37492,tf=37496,nf=37488,rf=37489,Ql=37490,sf=37491,af=37808,of=37809,lf=37810,cf=37811,uf=37812,df=37813,ff=37814,hf=37815,pf=37816,mf=37817,gf=37818,vf=37819,_f=37820,xf=37821,Sf=36492,yf=36494,Mf=36495,Ef=36283,Tf=36284,ec=36285,wf=36286,yE=3200,Em=0,ME=1,Ji="",Pn="srgb",tc="srgb-linear",nc="linear",tt="srgb",pu=7680,EE=519,TE=512,wE=513,AE=514,h_=515,RE=516,CE=517,p_=518,m_=519,bE=35044,Tm="300 es",qn=2e3,ic=2001;function NE(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function rc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function PE(){const t=rc("canvas");return t.style.display="block",t}const wm={};function Am(...t){const e="THREE."+t.shift();console.log(e,...t)}function g_(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Ie(...t){t=g_(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function Ze(...t){t=g_(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function El(...t){const e=t.join(" ");e in wm||(wm[e]=!0,Ie(...t))}function LE(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const IE={[zd]:zd,[Hd]:jd,[Vd]:Vd,[Ja]:Wd,[Gd]:Gd,[jd]:Hd,[Xd]:Xd,[Wd]:Ja};class qr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],mu=Math.PI/180,Af=180/Math.PI;function lo(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(qt[t&255]+qt[t>>8&255]+qt[t>>16&255]+qt[t>>24&255]+"-"+qt[e&255]+qt[e>>8&255]+"-"+qt[e>>16&15|64]+qt[e>>24&255]+"-"+qt[n&63|128]+qt[n>>8&255]+"-"+qt[n>>16&255]+qt[n>>24&255]+qt[i&255]+qt[i>>8&255]+qt[i>>16&255]+qt[i>>24&255]).toLowerCase()}function Xe(t,e,n){return Math.max(e,Math.min(n,t))}function DE(t,e){return(t%e+e)%e}function gu(t,e,n){return(1-n)*t+n*e}function UE(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function Dh(t){switch(t.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function FE(t,e){if(e.constructor===Float32Array)return t;const n=Dh(e);if(n===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(t/n,-1)}function OE(t,e){if(e.constructor===Float32Array)return t;const n=Dh(e);if(n===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(t*n)}const kh=class kh{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Xe(this.x,e.x,n.x),this.y=Xe(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Xe(this.x,e,n),this.y=Xe(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};kh.prototype.isVector2=!0;let Je=kh;class Ks{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],c=i[r+1],f=i[r+2],p=i[r+3],h=s[a+0],m=s[a+1],g=s[a+2],y=s[a+3];if(p!==y||l!==h||c!==m||f!==g){let v=l*h+c*m+f*g+p*y;v<0&&(h=-h,m=-m,g=-g,y=-y,v=-v);let d=1-o;if(v<.9995){const _=Math.acos(v),S=Math.sin(_);d=Math.sin(d*_)/S,o=Math.sin(o*_)/S,l=l*d+h*o,c=c*d+m*o,f=f*d+g*o,p=p*d+y*o}else{l=l*d+h*o,c=c*d+m*o,f=f*d+g*o,p=p*d+y*o;const _=1/Math.sqrt(l*l+c*c+f*f+p*p);l*=_,c*=_,f*=_,p*=_}}e[n]=l,e[n+1]=c,e[n+2]=f,e[n+3]=p}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],f=i[r+3],p=s[a],h=s[a+1],m=s[a+2],g=s[a+3];return e[n]=o*g+f*p+l*m-c*h,e[n+1]=l*g+f*h+c*p-o*m,e[n+2]=c*g+f*m+o*h-l*p,e[n+3]=f*g-o*p-l*h-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(r/2),p=o(s/2),h=l(i/2),m=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=h*f*p+c*m*g,this._y=c*m*p-h*f*g,this._z=c*f*g+h*m*p,this._w=c*f*p-h*m*g;break;case"YXZ":this._x=h*f*p+c*m*g,this._y=c*m*p-h*f*g,this._z=c*f*g-h*m*p,this._w=c*f*p+h*m*g;break;case"ZXY":this._x=h*f*p-c*m*g,this._y=c*m*p+h*f*g,this._z=c*f*g+h*m*p,this._w=c*f*p-h*m*g;break;case"ZYX":this._x=h*f*p-c*m*g,this._y=c*m*p+h*f*g,this._z=c*f*g-h*m*p,this._w=c*f*p+h*m*g;break;case"YZX":this._x=h*f*p+c*m*g,this._y=c*m*p+h*f*g,this._z=c*f*g-h*m*p,this._w=c*f*p-h*m*g;break;case"XZY":this._x=h*f*p-c*m*g,this._y=c*m*p-h*f*g,this._z=c*f*g+h*m*p,this._w=c*f*p+h*m*g;break;default:Ie("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],c=n[2],f=n[6],p=n[10],h=i+o+p;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(f-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(i>o&&i>p){const m=2*Math.sqrt(1+i-o-p);this._w=(f-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>p){const m=2*Math.sqrt(1+o-i-p);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+f)/m}else{const m=2*Math.sqrt(1+p-i-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+a*o+r*c-s*l,this._y=r*f+a*l+s*o-i*c,this._z=s*f+a*c+i*l-r*o,this._w=a*f-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),f=Math.sin(c);l=Math.sin(l*c)/f,n=Math.sin(n*c)/f,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const zh=class zh{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Rm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Rm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),f=2*(o*n-s*r),p=2*(s*i-a*n);return this.x=n+l*c+a*p-o*f,this.y=i+l*f+o*c-s*p,this.z=r+l*p+s*f-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Xe(this.x,e.x,n.x),this.y=Xe(this.y,e.y,n.y),this.z=Xe(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Xe(this.x,e,n),this.y=Xe(this.y,e,n),this.z=Xe(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return vu.copy(this).projectOnVector(e),this.sub(vu)}reflect(e){return this.sub(vu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};zh.prototype.isVector3=!0;let W=zh;const vu=new W,Rm=new Ks,Gh=class Gh{constructor(e,n,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c)}set(e,n,i,r,s,a,o,l,c){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=a,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],f=i[4],p=i[7],h=i[2],m=i[5],g=i[8],y=r[0],v=r[3],d=r[6],_=r[1],S=r[4],M=r[7],R=r[2],A=r[5],x=r[8];return s[0]=a*y+o*_+l*R,s[3]=a*v+o*S+l*A,s[6]=a*d+o*M+l*x,s[1]=c*y+f*_+p*R,s[4]=c*v+f*S+p*A,s[7]=c*d+f*M+p*x,s[2]=h*y+m*_+g*R,s[5]=h*v+m*S+g*A,s[8]=h*d+m*M+g*x,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8];return n*a*f-n*o*c-i*s*f+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],p=f*a-o*c,h=o*l-f*s,m=c*s-a*l,g=n*p+i*h+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=p*y,e[1]=(r*c-f*i)*y,e[2]=(o*i-r*a)*y,e[3]=h*y,e[4]=(f*n-r*l)*y,e[5]=(r*s-o*n)*y,e[6]=m*y,e[7]=(i*l-c*n)*y,e[8]=(a*n-i*s)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+n,0,0,1),this}scale(e,n){return El("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(_u.makeScale(e,n)),this}rotate(e){return El("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(_u.makeRotation(-e)),this}translate(e,n){return El("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(_u.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Gh.prototype.isMatrix3=!0;let Ue=Gh;const _u=new Ue,Cm=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bm=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function BE(){const t={enabled:!0,workingColorSpace:tc,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===tt&&(r.r=bi(r.r),r.g=bi(r.g),r.b=bi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===tt&&(r.r=Ps(r.r),r.g=Ps(r.g),r.b=Ps(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ji?nc:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[a].fromXYZ).multiply(this.spaces[s].toXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[tc]:{primaries:e,whitePoint:i,transfer:nc,toXYZ:Cm,fromXYZ:bm,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Pn},outputColorSpaceConfig:{drawingBufferColorSpace:Pn}},[Pn]:{primaries:e,whitePoint:i,transfer:tt,toXYZ:Cm,fromXYZ:bm,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Pn}}}),t}const je=BE();function bi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Ps(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Zr;class kE{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Zr===void 0&&(Zr=rc("canvas")),Zr.width=e.width,Zr.height=e.height;const r=Zr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Zr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=rc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=bi(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(bi(n[i]/255)*255):n[i]=bi(n[i]);return{data:n,width:e.width,height:e.height}}else return Ie("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let zE=0;class Uh{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:zE++}),this.uuid=lo(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width||0,n.height||0,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(xu(r[a].image)):s.push(xu(r[a]))}else s=xu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function xu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?kE.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Ie("Texture: Unable to serialize Texture."),{})}let GE=0;const Su=new W;class sn extends qr{constructor(e=sn.DEFAULT_IMAGE,n=sn.DEFAULT_MAPPING,i=Ai,r=Ai,s=fn,a=ir,o=li,l=Dn,c=sn.DEFAULT_ANISOTROPY,f=Ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:GE++}),this.uuid=lo(),this.name="",this.source=new Uh(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Je(0,0),this.repeat=new Je(1,1),this.center=new Je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Su).x}get height(){return this.source.getSize(Su).y}get depth(){return this.source.getSize(Su).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Ie(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ie(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==s_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $d:e.x=e.x-Math.floor(e.x);break;case Ai:e.x=e.x<0?0:1;break;case Yd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $d:e.y=e.y-Math.floor(e.y);break;case Ai:e.y=e.y<0?0:1;break;case Yd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=s_;sn.DEFAULT_ANISOTROPY=1;const Hh=class Hh{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],f=l[4],p=l[8],h=l[1],m=l[5],g=l[9],y=l[2],v=l[6],d=l[10];if(Math.abs(f-h)<.01&&Math.abs(p-y)<.01&&Math.abs(g-v)<.01){if(Math.abs(f+h)<.1&&Math.abs(p+y)<.1&&Math.abs(g+v)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const S=(c+1)/2,M=(m+1)/2,R=(d+1)/2,A=(f+h)/4,x=(p+y)/4,w=(g+v)/4;return S>M&&S>R?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=A/i,s=x/i):M>R?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=A/r,s=w/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=x/s,r=w/s),this.set(i,r,s,n),this}let _=Math.sqrt((v-g)*(v-g)+(p-y)*(p-y)+(h-f)*(h-f));return Math.abs(_)<.001&&(_=1),this.x=(v-g)/_,this.y=(p-y)/_,this.z=(h-f)/_,this.w=Math.acos((c+m+d-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Xe(this.x,e.x,n.x),this.y=Xe(this.y,e.y,n.y),this.z=Xe(this.z,e.z,n.z),this.w=Xe(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Xe(this.x,e,n),this.y=Xe(this.y,e,n),this.z=Xe(this.z,e,n),this.w=Xe(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Hh.prototype.isVector4=!0;let yt=Hh;class HE extends qr{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new yt(0,0,e,n),this.scissorTest=!1,this.viewport=new yt(0,0,e,n),this.textures=[];const r=i.count;for(let s=0;s<r;s++)this.textures[s]=new sn({width:e,height:n,depth:i.depth}),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:fn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(n.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new Uh(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const n=e.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class di extends HE{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class v_ extends sn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class VE extends sn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const cc=class cc{constructor(e,n,i,r,s,a,o,l,c,f,p,h,m,g,y,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c,f,p,h,m,g,y,v)}set(e,n,i,r,s,a,o,l,c,f,p,h,m,g,y,v){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=f,d[10]=p,d[14]=h,d[3]=m,d[7]=g,d[11]=y,d[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new cc().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,r=1/Jr.setFromMatrixColumn(e,0).length(),s=1/Jr.setFromMatrixColumn(e,1).length(),a=1/Jr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){const h=a*f,m=a*p,g=o*f,y=o*p;n[0]=l*f,n[4]=-l*p,n[8]=c,n[1]=m+g*c,n[5]=h-y*c,n[9]=-o*l,n[2]=y-h*c,n[6]=g+m*c,n[10]=a*l}else if(e.order==="YXZ"){const h=l*f,m=l*p,g=c*f,y=c*p;n[0]=h+y*o,n[4]=g*o-m,n[8]=a*c,n[1]=a*p,n[5]=a*f,n[9]=-o,n[2]=m*o-g,n[6]=y+h*o,n[10]=a*l}else if(e.order==="ZXY"){const h=l*f,m=l*p,g=c*f,y=c*p;n[0]=h-y*o,n[4]=-a*p,n[8]=g+m*o,n[1]=m+g*o,n[5]=a*f,n[9]=y-h*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const h=a*f,m=a*p,g=o*f,y=o*p;n[0]=l*f,n[4]=g*c-m,n[8]=h*c+y,n[1]=l*p,n[5]=y*c+h,n[9]=m*c-g,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const h=a*l,m=a*c,g=o*l,y=o*c;n[0]=l*f,n[4]=y-h*p,n[8]=g*p+m,n[1]=p,n[5]=a*f,n[9]=-o*f,n[2]=-c*f,n[6]=m*p+g,n[10]=h-y*p}else if(e.order==="XZY"){const h=a*l,m=a*c,g=o*l,y=o*c;n[0]=l*f,n[4]=-p,n[8]=c*f,n[1]=h*p+y,n[5]=a*f,n[9]=m*p-g,n[2]=g*p-m,n[6]=o*f,n[10]=y*p+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(WE,e,jE)}lookAt(e,n,i){const r=this.elements;return vn.subVectors(e,n),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Gi.crossVectors(i,vn),Gi.lengthSq()===0&&(Math.abs(i.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Gi.crossVectors(i,vn)),Gi.normalize(),Uo.crossVectors(vn,Gi),r[0]=Gi.x,r[4]=Uo.x,r[8]=vn.x,r[1]=Gi.y,r[5]=Uo.y,r[9]=vn.y,r[2]=Gi.z,r[6]=Uo.z,r[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],f=i[1],p=i[5],h=i[9],m=i[13],g=i[2],y=i[6],v=i[10],d=i[14],_=i[3],S=i[7],M=i[11],R=i[15],A=r[0],x=r[4],w=r[8],I=r[12],C=r[1],P=r[5],O=r[9],X=r[13],D=r[2],$=r[6],Q=r[10],G=r[14],B=r[3],F=r[7],V=r[11],K=r[15];return s[0]=a*A+o*C+l*D+c*B,s[4]=a*x+o*P+l*$+c*F,s[8]=a*w+o*O+l*Q+c*V,s[12]=a*I+o*X+l*G+c*K,s[1]=f*A+p*C+h*D+m*B,s[5]=f*x+p*P+h*$+m*F,s[9]=f*w+p*O+h*Q+m*V,s[13]=f*I+p*X+h*G+m*K,s[2]=g*A+y*C+v*D+d*B,s[6]=g*x+y*P+v*$+d*F,s[10]=g*w+y*O+v*Q+d*V,s[14]=g*I+y*X+v*G+d*K,s[3]=_*A+S*C+M*D+R*B,s[7]=_*x+S*P+M*$+R*F,s[11]=_*w+S*O+M*Q+R*V,s[15]=_*I+S*X+M*G+R*K,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],f=e[2],p=e[6],h=e[10],m=e[14],g=e[3],y=e[7],v=e[11],d=e[15],_=l*m-c*h,S=o*m-c*p,M=o*h-l*p,R=a*m-c*f,A=a*h-l*f,x=a*p-o*f;return n*(y*_-v*S+d*M)-i*(g*_-v*R+d*A)+r*(g*S-y*R+d*x)-s*(g*M-y*A+v*x)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],f=e[10];return n*(a*f-o*c)-i*(s*f-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],p=e[9],h=e[10],m=e[11],g=e[12],y=e[13],v=e[14],d=e[15],_=n*o-i*a,S=n*l-r*a,M=n*c-s*a,R=i*l-r*o,A=i*c-s*o,x=r*c-s*l,w=f*y-p*g,I=f*v-h*g,C=f*d-m*g,P=p*v-h*y,O=p*d-m*y,X=h*d-m*v,D=_*X-S*O+M*P+R*C-A*I+x*w;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const $=1/D;return e[0]=(o*X-l*O+c*P)*$,e[1]=(r*O-i*X-s*P)*$,e[2]=(y*x-v*A+d*R)*$,e[3]=(h*A-p*x-m*R)*$,e[4]=(l*C-a*X-c*I)*$,e[5]=(n*X-r*C+s*I)*$,e[6]=(v*M-g*x-d*S)*$,e[7]=(f*x-h*M+m*S)*$,e[8]=(a*O-o*C+c*w)*$,e[9]=(i*C-n*O-s*w)*$,e[10]=(g*A-y*M+d*_)*$,e[11]=(p*M-f*A-m*_)*$,e[12]=(o*I-a*P-l*w)*$,e[13]=(n*P-i*I+r*w)*$,e[14]=(y*S-g*R-v*_)*$,e[15]=(f*R-p*S+h*_)*$,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,f=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,f*o+i,f*l-r*a,0,c*l-r*o,f*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,c=s+s,f=a+a,p=o+o,h=s*c,m=s*f,g=s*p,y=a*f,v=a*p,d=o*p,_=l*c,S=l*f,M=l*p,R=i.x,A=i.y,x=i.z;return r[0]=(1-(y+d))*R,r[1]=(m+M)*R,r[2]=(g-S)*R,r[3]=0,r[4]=(m-M)*A,r[5]=(1-(h+d))*A,r[6]=(v+_)*A,r[7]=0,r[8]=(g+S)*x,r[9]=(v-_)*x,r[10]=(1-(h+y))*x,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let a=Jr.set(r[0],r[1],r[2]).length();const o=Jr.set(r[4],r[5],r[6]).length(),l=Jr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Gn.copy(this);const c=1/a,f=1/o,p=1/l;return Gn.elements[0]*=c,Gn.elements[1]*=c,Gn.elements[2]*=c,Gn.elements[4]*=f,Gn.elements[5]*=f,Gn.elements[6]*=f,Gn.elements[8]*=p,Gn.elements[9]*=p,Gn.elements[10]*=p,n.setFromRotationMatrix(Gn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,n,i,r,s,a,o=qn,l=!1){const c=this.elements,f=2*s/(n-e),p=2*s/(i-r),h=(n+e)/(n-e),m=(i+r)/(i-r);let g,y;if(l)g=s/(a-s),y=a*s/(a-s);else if(o===qn)g=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===ic)g=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=p,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=qn,l=!1){const c=this.elements,f=2/(n-e),p=2/(i-r),h=-(n+e)/(n-e),m=-(i+r)/(i-r);let g,y;if(l)g=1/(a-s),y=a/(a-s);else if(o===qn)g=-2/(a-s),y=-(a+s)/(a-s);else if(o===ic)g=-1/(a-s),y=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=p,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};cc.prototype.isMatrix4=!0;let _t=cc;const Jr=new W,Gn=new _t,WE=new W(0,0,0),jE=new W(1,1,1),Gi=new W,Uo=new W,vn=new W,Nm=new _t,Pm=new Ks;class Vr{constructor(e=0,n=0,i=0,r=Vr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],f=r[9],p=r[2],h=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Xe(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,m),this._y=0);break;default:Ie("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Nm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Pm.setFromEuler(this),this.setFromQuaternion(Pm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vr.DEFAULT_ORDER="XYZ";class __{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let XE=0;const Lm=new W,Qr=new Ks,gi=new _t,Fo=new W,la=new W,$E=new W,YE=new Ks,Im=new W(1,0,0),Dm=new W(0,1,0),Um=new W(0,0,1),Fm={type:"added"},qE={type:"removed"},es={type:"childadded",child:null},yu={type:"childremoved",child:null};class an extends qr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:XE++}),this.uuid=lo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=an.DEFAULT_UP.clone();const e=new W,n=new Vr,i=new Ks,r=new W(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new _t},normalMatrix:{value:new Ue}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=an.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new __,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Qr.setFromAxisAngle(e,n),this.quaternion.multiply(Qr),this}rotateOnWorldAxis(e,n){return Qr.setFromAxisAngle(e,n),this.quaternion.premultiply(Qr),this}rotateX(e){return this.rotateOnAxis(Im,e)}rotateY(e){return this.rotateOnAxis(Dm,e)}rotateZ(e){return this.rotateOnAxis(Um,e)}translateOnAxis(e,n){return Lm.copy(e).applyQuaternion(this.quaternion),this.position.add(Lm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Im,e)}translateY(e){return this.translateOnAxis(Dm,e)}translateZ(e){return this.translateOnAxis(Um,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Fo.copy(e):Fo.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),la.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(la,Fo,this.up):gi.lookAt(Fo,la,this.up),this.quaternion.setFromRotationMatrix(gi),r&&(gi.extractRotation(r.matrixWorld),Qr.setFromRotationMatrix(gi),this.quaternion.premultiply(Qr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(Ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fm),es.child=e,this.dispatchEvent(es),es.child=null):Ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(qE),yu.child=e,this.dispatchEvent(yu),yu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gi.multiply(e.parent.matrixWorld)),e.applyMatrix4(gi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fm),es.child=e,this.dispatchEvent(es),es.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(la,e,$E),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(la,YE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const p=l[c];s(e.shapes,p)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),f=a(e.images),p=a(e.shapes),h=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),p.length>0&&(i.shapes=p),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const l=[];for(const c in o){const f=o[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}an.DEFAULT_UP=new W(0,1,0);an.DEFAULT_MATRIX_AUTO_UPDATE=!0;an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ya extends an{constructor(){super(),this.isGroup=!0,this.type="Group"}}const KE={type:"move"};class Mu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ya,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ya,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ya,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const y of e.hand.values()){const v=n.getJointPose(y,i),d=this._getHandJoint(c,y);v!==null&&(d.matrix.fromArray(v.transform.matrix),d.matrix.decompose(d.position,d.quaternion,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=v.radius),d.visible=v!==null}const f=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],h=f.position.distanceTo(p.position),m=.02,g=.005;c.inputState.pinching&&h>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(KE)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new ya;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const x_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},Oo={h:0,s:0,l:0};function Eu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class qe{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=je.workingColorSpace){return this.r=e,this.g=n,this.b=i,je.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=je.workingColorSpace){if(e=DE(e,1),n=Xe(n,0,1),i=Xe(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=Eu(a,s,e+1/3),this.g=Eu(a,s,e),this.b=Eu(a,s,e-1/3)}return je.colorSpaceToWorking(this,r),this}setStyle(e,n=Pn){function i(s){s!==void 0&&parseFloat(s)<1&&Ie("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseFloat(s[1]))/100,Math.min(100,parseFloat(s[2]))/100,Math.min(100,parseFloat(s[3]))/100,n);break;case"hsl":case"hsla":if(s=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Ie("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);Ie("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Pn){const i=x_[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Ie("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bi(e.r),this.g=bi(e.g),this.b=bi(e.b),this}copyLinearToSRGB(e){return this.r=Ps(e.r),this.g=Ps(e.g),this.b=Ps(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pn){return je.workingToColorSpace(Kt.copy(this),e),Math.round(Xe(Kt.r*255,0,255))*65536+Math.round(Xe(Kt.g*255,0,255))*256+Math.round(Xe(Kt.b*255,0,255))}getHexString(e=Pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=je.workingColorSpace){je.workingToColorSpace(Kt.copy(this),n);const i=Kt.r,r=Kt.g,s=Kt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const f=(o+a)/2;if(o===a)l=0,c=0;else{const p=a-o;switch(c=f<=.5?p/(a+o):p/(2-a-o),a){case i:l=(r-s)/p+(r<s?6:0);break;case r:l=(s-i)/p+2;break;case s:l=(i-r)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,n=je.workingColorSpace){return je.workingToColorSpace(Kt.copy(this),n),e.r=Kt.r,e.g=Kt.g,e.b=Kt.b,e}getStyle(e=Pn){je.workingToColorSpace(Kt.copy(this),e);const n=Kt.r,i=Kt.g,r=Kt.b;return e!==Pn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Hi),this.setHSL(Hi.h+e,Hi.s+n,Hi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Hi),e.getHSL(Oo);const i=gu(Hi.h,Oo.h,n),r=gu(Hi.s,Oo.s,n),s=gu(Hi.l,Oo.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Kt=new qe;qe.NAMES=x_;class ZE extends an{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vr,this.environmentIntensity=1,this.environmentRotation=new Vr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Hn=new W,vi=new W,Tu=new W,_i=new W,ts=new W,ns=new W,Om=new W,wu=new W,Au=new W,Ru=new W,Cu=new yt,bu=new yt,Nu=new yt;class Yn{constructor(e=new W,n=new W,i=new W){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Hn.subVectors(e,n),r.cross(Hn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Hn.subVectors(r,n),vi.subVectors(i,n),Tu.subVectors(e,n);const a=Hn.dot(Hn),o=Hn.dot(vi),l=Hn.dot(Tu),c=vi.dot(vi),f=vi.dot(Tu),p=a*c-o*o;if(p===0)return s.set(0,0,0),null;const h=1/p,m=(c*l-o*f)*h,g=(a*f-o*l)*h;return s.set(1-m-g,g,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,_i)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,_i.x),l.addScaledVector(a,_i.y),l.addScaledVector(o,_i.z),l)}static getInterpolatedAttribute(e,n,i,r,s,a){return Cu.setScalar(0),bu.setScalar(0),Nu.setScalar(0),Cu.fromBufferAttribute(e,n),bu.fromBufferAttribute(e,i),Nu.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Cu,s.x),a.addScaledVector(bu,s.y),a.addScaledVector(Nu,s.z),a}static isFrontFacing(e,n,i,r){return Hn.subVectors(i,n),vi.subVectors(e,n),Hn.cross(vi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Hn.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),Hn.cross(vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Yn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Yn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;ts.subVectors(r,i),ns.subVectors(s,i),wu.subVectors(e,i);const l=ts.dot(wu),c=ns.dot(wu);if(l<=0&&c<=0)return n.copy(i);Au.subVectors(e,r);const f=ts.dot(Au),p=ns.dot(Au);if(f>=0&&p<=f)return n.copy(r);const h=l*p-f*c;if(h<=0&&l>=0&&f<=0&&l-f>0)return a=l/(l-f),n.copy(i).addScaledVector(ts,a);Ru.subVectors(e,s);const m=ts.dot(Ru),g=ns.dot(Ru);if(g>=0&&m<=g)return n.copy(s);const y=m*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(ns,o);const v=f*g-m*p;if(v<=0&&p-f>=0&&m-g>=0)return Om.subVectors(s,r),o=(p-f)/(p-f+(m-g)),n.copy(r).addScaledVector(Om,o);const d=1/(v+y+h);return a=y*d,o=h*d,n.copy(i).addScaledVector(ts,a).addScaledVector(ns,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class co{constructor(e=new W(1/0,1/0,1/0),n=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Vn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Vn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Vn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Vn):Vn.fromBufferAttribute(s,a),Vn.applyMatrix4(e.matrixWorld),this.expandByPoint(Vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Bo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Bo.copy(i.boundingBox)),Bo.applyMatrix4(e.matrixWorld),this.union(Bo)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vn),Vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ca),ko.subVectors(this.max,ca),is.subVectors(e.a,ca),rs.subVectors(e.b,ca),ss.subVectors(e.c,ca),Vi.subVectors(rs,is),Wi.subVectors(ss,rs),Er.subVectors(is,ss);let n=[0,-Vi.z,Vi.y,0,-Wi.z,Wi.y,0,-Er.z,Er.y,Vi.z,0,-Vi.x,Wi.z,0,-Wi.x,Er.z,0,-Er.x,-Vi.y,Vi.x,0,-Wi.y,Wi.x,0,-Er.y,Er.x,0];return!Pu(n,is,rs,ss,ko)||(n=[1,0,0,0,1,0,0,0,1],!Pu(n,is,rs,ss,ko))?!1:(zo.crossVectors(Vi,Wi),n=[zo.x,zo.y,zo.z],Pu(n,is,rs,ss,ko))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const xi=[new W,new W,new W,new W,new W,new W,new W,new W],Vn=new W,Bo=new co,is=new W,rs=new W,ss=new W,Vi=new W,Wi=new W,Er=new W,ca=new W,ko=new W,zo=new W,Tr=new W;function Pu(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){Tr.fromArray(t,s);const o=r.x*Math.abs(Tr.x)+r.y*Math.abs(Tr.y)+r.z*Math.abs(Tr.z),l=e.dot(Tr),c=n.dot(Tr),f=i.dot(Tr);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}const wt=new W,Go=new Je;let JE=0;class Ur extends qr{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:JE++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=bE,this.updateRanges=[],this.gpuType=oi,this.version=0,this._normalizationScale=e!==void 0?Dh(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Go.fromBufferAttribute(this,n),Go.applyMatrix3(e),this.setXY(n,Go.x,Go.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.applyMatrix3(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.applyMatrix4(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.applyNormalMatrix(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.transformDirection(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,n,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=this._denormalize(n)),n}setX(e,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=this._denormalize(n)),n}setY(e,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=this._denormalize(n)),n}setZ(e,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=this._denormalize(n)),n}setW(e,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=this._normalize(n),i=this._normalize(i)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=this._normalize(n),i=this._normalize(i),r=this._normalize(r),s=this._normalize(s)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const n=this._normalizationScale;return n!==void 0?Math.max(e/n,-1):FE(e,this.array)}_normalize(e){const n=this._normalizationScale;return n!==void 0?Math.round(e*n):OE(e,this.array)}}class S_ extends Ur{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class y_ extends Ur{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Mn extends Ur{constructor(e,n,i){super(new Float32Array(e),n,i)}}const QE=new co,ua=new W,Lu=new W;class uo{constructor(e=new W,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):QE.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ua.subVectors(e,this.center);const n=ua.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(ua,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Lu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ua.copy(e.center).add(Lu)),this.expandByPoint(ua.copy(e.center).sub(Lu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let eT=0;const Nn=new _t,Iu=new an,as=new W,_n=new co,da=new co,Ft=new W;class Qn extends qr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:eT++}),this.uuid=lo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(NE(e)?y_:S_)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ue().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Nn.makeRotationFromQuaternion(e),this.applyMatrix4(Nn),this}rotateX(e){return Nn.makeRotationX(e),this.applyMatrix4(Nn),this}rotateY(e){return Nn.makeRotationY(e),this.applyMatrix4(Nn),this}rotateZ(e){return Nn.makeRotationZ(e),this.applyMatrix4(Nn),this}translate(e,n,i){return Nn.makeTranslation(e,n,i),this.applyMatrix4(Nn),this}scale(e,n,i){return Nn.makeScale(e,n,i),this.applyMatrix4(Nn),this}lookAt(e){return Iu.lookAt(e),Iu.updateMatrix(),this.applyMatrix4(Iu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(as).negate(),this.translate(as.x,as.y,as.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Mn(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&Ie("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new co);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];_n.setFromBufferAttribute(s),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new uo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const i=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];da.setFromBufferAttribute(o),this.morphTargetsRelative?(Ft.addVectors(_n.min,da.min),_n.expandByPoint(Ft),Ft.addVectors(_n.max,da.max),_n.expandByPoint(Ft)):(_n.expandByPoint(da.min),_n.expandByPoint(da.max))}_n.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ft.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ft));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)Ft.fromBufferAttribute(o,c),l&&(as.fromBufferAttribute(e,c),Ft.add(as)),r=Math.max(r,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ur(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[],c=new Uint8Array(i.count);for(let I=0;I<i.count;I++)o[I]=new W,l[I]=new W;const f=new W,p=new W,h=new W,m=new Je,g=new Je,y=new Je,v=new W,d=new W;function _(I,C,P){c[I]=c[C]=c[P]=1,f.fromBufferAttribute(i,I),p.fromBufferAttribute(i,C),h.fromBufferAttribute(i,P),m.fromBufferAttribute(s,I),g.fromBufferAttribute(s,C),y.fromBufferAttribute(s,P),p.sub(f),h.sub(f),g.sub(m),y.sub(m);const O=1/(g.x*y.y-y.x*g.y);isFinite(O)&&(v.copy(p).multiplyScalar(y.y).addScaledVector(h,-g.y).multiplyScalar(O),d.copy(h).multiplyScalar(g.x).addScaledVector(p,-y.x).multiplyScalar(O),o[I].add(v),o[C].add(v),o[P].add(v),l[I].add(d),l[C].add(d),l[P].add(d))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let I=0,C=S.length;I<C;++I){const P=S[I],O=P.start,X=P.count;for(let D=O,$=O+X;D<$;D+=3)_(e.getX(D+0),e.getX(D+1),e.getX(D+2))}const M=new W,R=new W,A=new W,x=new W;function w(I){A.fromBufferAttribute(r,I),x.copy(A);const C=o[I];M.copy(C),M.sub(A.multiplyScalar(A.dot(C))).normalize(),R.crossVectors(x,C);const O=R.dot(l[I])<0?-1:1;a.setXYZW(I,M.x,M.y,M.z,O)}for(let I=0,C=i.count;I<C;++I)c[I]&&w(I);this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Ur(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new W,s=new W,a=new W,o=new W,l=new W,c=new W,f=new W,p=new W;if(e)for(let h=0,m=e.count;h<m;h+=3){const g=e.getX(h+0),y=e.getX(h+1),v=e.getX(h+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,y),a.fromBufferAttribute(n,v),f.subVectors(a,s),p.subVectors(r,s),f.cross(p),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,v),o.add(f),l.add(f),c.add(f),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(v,c.x,c.y,c.z)}else for(let h=0,m=n.count;h<m;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),a.fromBufferAttribute(n,h+2),f.subVectors(a,s),p.subVectors(r,s),f.cross(p),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ft.fromBufferAttribute(e,n),Ft.normalize(),e.setXYZ(n,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(o,l){const c=o.array,f=o.itemSize,p=o.normalized,h=new c.constructor(l.length*f);let m=0,g=0;for(let y=0,v=l.length;y<v;y++){o.isInterleavedBufferAttribute?m=l[y]*o.data.stride+o.offset:m=l[y]*f;for(let d=0;d<f;d++)h[g++]=c[m++]}return new Ur(h,f,p)}if(this.index===null)return Ie("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Qn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let f=0,p=c.length;f<p;f++){const h=c[f],m=e(h,i);l.push(m)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let p=0,h=c.length;p<h;p++){const m=c[p];f.push(m.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(n))}const s=e.morphAttributes;for(const c in s){const f=[],p=s[c];for(let h=0,m=p.length;h<m;h++)f.push(p[h].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,f=a.length;c<f;c++){const p=a[c];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Du=new W,tT=new W,nT=new Ue;class qi{constructor(e=new W(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Du.subVectors(i,n).cross(tT.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(Du),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:n.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||nT.getNormalMatrix(e),r=this.coplanarPoint(Du).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let iT=0;class Zs extends qr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:iT++}),this.uuid=lo(),this.name="",this.type="Material",this.blending=La,this.side=Gr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=q0,this.blendDst=K0,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Ja,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=EE,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pu,this.stencilZFail=pu,this.stencilZPass=pu,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Ie(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ie(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new qi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Je().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Je().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=n[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Si=new W,Uu=new W,Ho=new W,Vo=new W;class Fh{constructor(e=new W,n=new W(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Si)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Si.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Si.copy(this.origin).addScaledVector(this.direction,n),Si.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Uu.copy(e).add(n).multiplyScalar(.5),Ho.copy(n).sub(e).normalize(),Vo.copy(this.origin).sub(Uu);const s=e.distanceTo(n)*.5,a=-this.direction.dot(Ho),o=Vo.dot(this.direction),l=-Vo.dot(Ho),c=Vo.lengthSq(),f=Math.abs(1-a*a);let p,h,m,g;if(f>0)if(p=a*l-o,h=a*o-l,g=s*f,p>=0)if(h>=-g)if(h<=g){const y=1/f;p*=y,h*=y,m=p*(p+a*h+2*o)+h*(a*p+h+2*l)+c}else h=s,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*l)+c;else h=-s,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*l)+c;else h<=-g?(p=Math.max(0,-(-a*s+o)),h=p>0?-s:Math.min(Math.max(-s,-l),s),m=-p*p+h*(h+2*l)+c):h<=g?(p=0,h=Math.min(Math.max(-s,-l),s),m=h*(h+2*l)+c):(p=Math.max(0,-(a*s+o)),h=p>0?s:Math.min(Math.max(-s,-l),s),m=-p*p+h*(h+2*l)+c);else h=a>0?-s:s,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Uu).addScaledVector(Ho,h),m}intersectSphere(e,n){if(e.radius<0)return null;Si.subVectors(e.center,this.origin);const i=Si.dot(this.direction),r=Si.dot(Si)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const c=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),f>=0?(s=(e.min.y-h.y)*f,a=(e.max.y-h.y)*f):(s=(e.max.y-h.y)*f,a=(e.min.y-h.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-h.z)*p,l=(e.max.z-h.z)*p):(o=(e.max.z-h.z)*p,l=(e.min.z-h.z)*p),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Si)!==null}intersectTriangle(e,n,i,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,f=o.z,p=e.x-a.x,h=e.y-a.y,m=e.z-a.z,g=n.x-a.x,y=n.y-a.y,v=n.z-a.z,d=i.x-a.x,_=i.y-a.y,S=i.z-a.z,M=Math.abs(l),R=Math.abs(c),A=Math.abs(f);let x,w,I,C,P,O,X,D,$,Q,G,B;if(M>=R&&M>=A?(I=l,O=p,$=g,B=d,l>=0?(x=c,w=f,C=h,P=m,X=y,D=v,Q=_,G=S):(x=f,w=c,C=m,P=h,X=v,D=y,Q=S,G=_)):R>=A?(I=c,O=h,$=y,B=_,c>=0?(x=f,w=l,C=m,P=p,X=v,D=g,Q=S,G=d):(x=l,w=f,C=p,P=m,X=g,D=v,Q=d,G=S)):(I=f,O=m,$=v,B=S,f>=0?(x=l,w=c,C=p,P=h,X=g,D=y,Q=d,G=_):(x=c,w=l,C=h,P=p,X=y,D=g,Q=_,G=d)),I===0)return null;const F=x/I,V=w/I,K=1/I,de=C-F*O,be=P-V*O,Z=X-F*$,me=D-V*$,ye=Q-F*B,Ce=G-V*B,xe=ye*me-Ce*Z,Oe=de*Ce-be*ye,Et=Z*be-me*de;if(r){if(xe<0||Oe<0||Et<0)return null}else if((xe<0||Oe<0||Et<0)&&(xe>0||Oe>0||Et>0))return null;const Le=xe+Oe+Et;if(Le===0)return null;const Qe=K*(xe*O+Oe*$+Et*B);return(Le>0?Qe<0:Qe>0)?null:this.at(Qe/Le,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rT extends Zs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vr,this.combine=Z0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Bm=new _t,wr=new Fh,Wo=new uo,km=new W,jo=new W,Xo=new W,$o=new W,Fu=new W,Yo=new W,zm=new W,qo=new W;class Wr extends an{constructor(e=new Qn,n=new rT){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Yo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=o[l],p=s[l];f!==0&&(Fu.fromBufferAttribute(p,e),a?Yo.addScaledVector(Fu,f):Yo.addScaledVector(Fu.sub(n),f))}n.add(Yo)}return n}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Wo.copy(i.boundingSphere),Wo.applyMatrix4(s),wr.copy(e.ray).recast(e.near),!(Wo.containsPoint(wr.origin)===!1&&(wr.intersectSphere(Wo,km)===null||wr.origin.distanceToSquared(km)>(e.far-e.near)**2))&&(Bm.copy(s).invert(),wr.copy(e.ray).applyMatrix4(Bm),!(i.boundingBox!==null&&wr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,wr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,p=s.attributes.normal,h=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=h.length;g<y;g++){const v=h[g],d=a[v.materialIndex],_=Math.max(v.start,m.start),S=Math.min(o.count,Math.min(v.start+v.count,m.start+m.count));for(let M=_,R=S;M<R;M+=3){const A=o.getX(M),x=o.getX(M+1),w=o.getX(M+2);r=Ko(this,d,e,i,c,f,p,A,x,w),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=v.materialIndex,n.push(r))}}else{const g=Math.max(0,m.start),y=Math.min(o.count,m.start+m.count);for(let v=g,d=y;v<d;v+=3){const _=o.getX(v),S=o.getX(v+1),M=o.getX(v+2);r=Ko(this,a,e,i,c,f,p,_,S,M),r&&(r.faceIndex=Math.floor(v/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=h.length;g<y;g++){const v=h[g],d=a[v.materialIndex],_=Math.max(v.start,m.start),S=Math.min(l.count,Math.min(v.start+v.count,m.start+m.count));for(let M=_,R=S;M<R;M+=3){const A=M,x=M+1,w=M+2;r=Ko(this,d,e,i,c,f,p,A,x,w),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=v.materialIndex,n.push(r))}}else{const g=Math.max(0,m.start),y=Math.min(l.count,m.start+m.count);for(let v=g,d=y;v<d;v+=3){const _=v,S=v+1,M=v+2;r=Ko(this,a,e,i,c,f,p,_,S,M),r&&(r.faceIndex=Math.floor(v/3),n.push(r))}}}}function sT(t,e,n,i,r,s,a,o){let l;if(e.side===gn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Gr,o),l===null)return null;qo.copy(o),qo.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(qo);return c<n.near||c>n.far?null:{distance:c,point:qo.clone(),object:t}}function Ko(t,e,n,i,r,s,a,o,l,c){t.getVertexPosition(o,jo),t.getVertexPosition(l,Xo),t.getVertexPosition(c,$o);const f=sT(t,e,n,i,jo,Xo,$o,zm);if(f){const p=new W;Yn.getBarycoord(zm,jo,Xo,$o,p),r&&(f.uv=Yn.getInterpolatedAttribute(r,o,l,c,p,new Je)),s&&(f.uv1=Yn.getInterpolatedAttribute(s,o,l,c,p,new Je)),a&&(f.normal=Yn.getInterpolatedAttribute(a,o,l,c,p,new W),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new W,materialIndex:0};Yn.getNormal(jo,Xo,$o,h.normal),f.face=h,f.barycoord=p}return f}class aT extends sn{constructor(e=null,n=1,i=1,r,s,a,o,l,c=Ht,f=Ht,p,h){super(null,a,o,l,c,f,r,s,p,h),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ar=new uo,oT=new Je(.5,.5),Zo=new W;class sc{constructor(e=new qi,n=new qi,i=new qi,r=new qi,s=new qi,a=new qi){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=qn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],f=s[4],p=s[5],h=s[6],m=s[7],g=s[8],y=s[9],v=s[10],d=s[11],_=s[12],S=s[13],M=s[14],R=s[15];if(r[0].setComponents(c-a,m-f,d-g,R-_).normalize(),r[1].setComponents(c+a,m+f,d+g,R+_).normalize(),r[2].setComponents(c+o,m+p,d+y,R+S).normalize(),r[3].setComponents(c-o,m-p,d-y,R-S).normalize(),i)r[4].setComponents(l,h,v,M).normalize(),r[5].setComponents(c-l,m-h,d-v,R-M).normalize();else if(r[4].setComponents(c-l,m-h,d-v,R-M).normalize(),n===qn)r[5].setComponents(c+l,m+h,d+v,R+M).normalize();else if(n===ic)r[5].setComponents(l,h,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ar.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ar)}intersectsSprite(e){Ar.center.set(0,0,0);const n=oT.distanceTo(e.center);return Ar.radius=.7071067811865476+n,Ar.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ar)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Zo.x=r.normal.x>0?e.max.x:e.min.x,Zo.y=r.normal.y>0?e.max.y:e.min.y,Zo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Zo)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Gm=new _t;class Oh{constructor(){this.coordinateSystem=qn,this._frustums=[],this._count=0}setFromArrayCamera(e){const n=e.cameras,i=this._frustums;for(let r=0;r<n.length;r++){const s=n[r];Gm.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),i[r]===void 0&&(i[r]=new sc),i[r].setFromProjectionMatrix(Gm,s.coordinateSystem,s.reversedDepth)}return this._count=n.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const n=this._frustums;for(let i=0;i<this._count;i++)if(n[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){const n=this._frustums;for(let i=0;i<this._count;i++)if(n[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const n=this._frustums;for(let i=0;i<this._count;i++)if(n[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){const n=this._frustums;for(let i=0;i<this._count;i++)if(n[i].intersectsBox(e))return!0;return!1}containsPoint(e){const n=this._frustums;for(let i=0;i<this._count;i++)if(n[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const n=this._frustums,i=e._frustums;for(let r=0;r<e._count;r++)n[r]===void 0&&(n[r]=new sc),n[r].copy(i[r]);return this._count=e._count,this}clone(){return new Oh().copy(this)}}class M_ extends Zs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ac=new W,oc=new W,Hm=new _t,fa=new Fh,Jo=new uo,Ou=new W,Vm=new W;class lT extends an{constructor(e=new Qn,n=new M_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)ac.fromBufferAttribute(n,r-1),oc.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=ac.distanceTo(oc);e.setAttribute("lineDistance",new Mn(i,1))}else Ie("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Jo.copy(i.boundingSphere),Jo.applyMatrix4(r),Jo.radius+=s,e.ray.intersectsSphere(Jo)===!1)return;Hm.copy(r).invert(),fa.copy(e.ray).applyMatrix4(Hm);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,f=i.index,h=i.attributes.position;if(f!==null){const m=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let y=m,v=g-1;y<v;y+=c){const d=f.getX(y),_=f.getX(y+1),S=Qo(this,e,fa,l,d,_,y);S&&n.push(S)}if(this.isLineLoop){const y=f.getX(g-1),v=f.getX(m),d=Qo(this,e,fa,l,y,v,g-1);d&&n.push(d)}}else{const m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let y=m,v=g-1;y<v;y+=c){const d=Qo(this,e,fa,l,y,y+1,y);d&&n.push(d)}if(this.isLineLoop){const y=Qo(this,e,fa,l,g-1,m,g-1);y&&n.push(y)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Qo(t,e,n,i,r,s,a){const o=t.geometry.attributes.position;if(ac.fromBufferAttribute(o,r),oc.fromBufferAttribute(o,s),n.distanceSqToSegment(ac,oc,Ou,Vm)>i)return;Ou.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(Ou);if(!(c<e.near||c>e.far))return{distance:c,point:Vm.clone().applyMatrix4(t.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:t}}const Wm=new W,jm=new W;class cT extends lT{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)Wm.fromBufferAttribute(n,r),jm.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Wm.distanceTo(jm);e.setAttribute("lineDistance",new Mn(i,1))}else Ie("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class E_ extends Zs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Xm=new _t,Rf=new Fh,el=new uo,tl=new W;class uT extends an{constructor(e=new Qn,n=new E_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),el.copy(i.boundingSphere),el.applyMatrix4(r),el.radius+=s,e.ray.intersectsSphere(el)===!1)return;Xm.copy(r).invert(),Rf.copy(e.ray).applyMatrix4(Xm);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,p=i.attributes.position;if(c!==null){const h=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let g=h,y=m;g<y;g++){const v=c.getX(g);tl.fromBufferAttribute(p,v),$m(tl,v,l,r,e,n,this)}}else{const h=Math.max(0,a.start),m=Math.min(p.count,a.start+a.count);for(let g=h,y=m;g<y;g++)tl.fromBufferAttribute(p,g),$m(tl,g,l,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function $m(t,e,n,i,r,s,a){const o=Rf.distanceSqToPoint(t);if(o<n){const l=new W;Rf.closestPointToPoint(t,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class T_ extends sn{constructor(e=[],n=zs,i,r,s,a,o,l,c,f){super(e,n,i,r,s,a,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Hs extends sn{constructor(e,n,i=fi,r,s,a,o=Ht,l=Ht,c,f=gr,p=1){if(f!==gr&&f!==rr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:n,depth:p};super(h,r,s,a,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Uh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return n.compareFunction=this.compareFunction,n}}class w_ extends Hs{constructor(e,n=fi,i=zs,r,s,a=Ht,o=Ht,l,c=gr){const f={width:e,height:e,depth:1},p=[f,f,f,f,f,f];super(e,e,n,i,r,s,a,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class A_ extends sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class fo extends Qn{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],f=[],p=[];let h=0,m=0;g("z","y","x",-1,-1,i,n,e,a,s,0),g("z","y","x",1,-1,i,n,-e,a,s,1),g("x","z","y",1,1,e,i,n,r,a,2),g("x","z","y",1,-1,e,i,-n,r,a,3),g("x","y","z",1,-1,e,n,i,r,s,4),g("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Mn(c,3)),this.setAttribute("normal",new Mn(f,3)),this.setAttribute("uv",new Mn(p,2));function g(y,v,d,_,S,M,R,A,x,w,I){const C=M/x,P=R/w,O=M/2,X=R/2,D=A/2,$=x+1,Q=w+1;let G=0,B=0;const F=new W;for(let V=0;V<Q;V++){const K=V*P-X;for(let de=0;de<$;de++){const be=de*C-O;F[y]=be*_,F[v]=K*S,F[d]=D,c.push(F.x,F.y,F.z),F[y]=0,F[v]=0,F[d]=A>0?1:-1,f.push(F.x,F.y,F.z),p.push(de/x),p.push(1-V/w),G+=1}}for(let V=0;V<w;V++)for(let K=0;K<x;K++){const de=h+K+$*V,be=h+K+$*(V+1),Z=h+(K+1)+$*(V+1),me=h+(K+1)+$*V;l.push(de,be,me),l.push(be,Z,me),B+=6}o.addGroup(m,B,I),m+=B,h+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Lc extends Qn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),c=o+1,f=l+1,p=e/o,h=n/l,m=[],g=[],y=[],v=[];for(let d=0;d<f;d++){const _=d*h-a;for(let S=0;S<c;S++){const M=S*p-s;g.push(M,-_,0),y.push(0,0,1),v.push(S/o),v.push(1-d/l)}}for(let d=0;d<l;d++)for(let _=0;_<o;_++){const S=_+c*d,M=_+c*(d+1),R=_+1+c*(d+1),A=_+1+c*d;m.push(S,M,A),m.push(M,R,A)}this.setIndex(m),this.setAttribute("position",new Mn(g,3)),this.setAttribute("normal",new Mn(y,3)),this.setAttribute("uv",new Mn(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lc(e.width,e.height,e.widthSegments,e.heightSegments)}}function Vs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(Ym(r))r.isRenderTargetTexture?(Ie("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(Ym(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function tn(t){const e={};for(let n=0;n<t.length;n++){const i=Vs(t[n]);for(const r in i)e[r]=i[r]}return e}function Ym(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function dT(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function R_(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const fT={clone:Vs,merge:tn};var hT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,pT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class jr extends Zs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hT,this.fragmentShader=pT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vs(e.uniforms),this.uniformsGroups=dT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=n[r.value]||null;break;case"c":this.uniforms[i].value=new qe().setHex(r.value);break;case"v2":this.uniforms[i].value=new Je().fromArray(r.value);break;case"v3":this.uniforms[i].value=new W().fromArray(r.value);break;case"v4":this.uniforms[i].value=new yt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ue().fromArray(r.value);break;case"m4":this.uniforms[i].value=new _t().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class mT extends jr{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class gT extends Zs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vT extends Zs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const nl=new W,il=new Ks,ni=new W;class C_ extends an{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(nl,il,ni),ni.x===1&&ni.y===1&&ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(nl,il,ni.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(nl,il,ni),ni.x===1&&ni.y===1&&ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(nl,il,ni.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ji=new W,qm=new Je,Km=new Je;class $n extends C_{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Af*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(mu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Af*2*Math.atan(Math.tan(mu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ji.x,ji.y).multiplyScalar(-e/ji.z),ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ji.x,ji.y).multiplyScalar(-e/ji.z)}getViewSize(e,n){return this.getViewBounds(e,qm,Km),n.subVectors(Km,qm)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(mu*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class _T extends C_{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const os=-90,ls=1;class Cf extends an{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new $n(os,ls,e,n);r.layers=this.layers,this.add(r);const s=new $n(os,ls,e,n);s.layers=this.layers,this.add(s);const a=new $n(os,ls,e,n);a.layers=this.layers,this.add(a);const o=new $n(os,ls,e,n);o.layers=this.layers,this.add(o);const l=new $n(os,ls,e,n);l.layers=this.layers,this.add(l);const c=new $n(os,ls,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const c of n)this.remove(c);if(e===qn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ic)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,f]=this.children,p=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let v=!1;e.isWebGLRenderer===!0?v=e.state.buffers.depth.getReversed():v=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,2,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.mipmapsAutoUpdate=y,e.setRenderTarget(i,5,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,f),e.setRenderTarget(p,h,m),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class xT extends $n{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}function Zm(t,e,n,i){const r=ST(i);switch(n){case u_:return t*e;case f_:return t*e/r.components*r.byteLength;case Ph:return t*e/r.components*r.byteLength;case Hr:return t*e*2/r.components*r.byteLength;case Lh:return t*e*2/r.components*r.byteLength;case d_:return t*e*3/r.components*r.byteLength;case li:return t*e*4/r.components*r.byteLength;case Ih:return t*e*4/r.components*r.byteLength;case xl:case Sl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case yl:case Ml:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Kd:case Jd:return Math.max(t,16)*Math.max(e,8)/4;case qd:case Zd:return Math.max(t,8)*Math.max(e,8)/2;case Qd:case ef:case nf:case rf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case tf:case Ql:case sf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case af:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case of:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case lf:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case cf:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case uf:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case df:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case ff:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case hf:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case pf:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case mf:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case gf:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case vf:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case _f:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case xf:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Sf:case yf:case Mf:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Ef:case Tf:return Math.ceil(t/4)*Math.ceil(e/4)*8;case ec:case wf:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function ST(t){switch(t){case Dn:case a_:return{byteLength:1,components:1};case eo:case o_:case hi:return{byteLength:2,components:1};case bh:case Nh:return{byteLength:2,components:4};case fi:case Ch:case oi:return{byteLength:4,components:1};case l_:case c_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Rh}}));typeof window<"u"&&(window.__THREE__?Ie("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Rh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function b_(){let t=null,e=!1,n=null,i=null;function r(s,a){i=t.requestAnimationFrame(r),n(s,a)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function yT(t){const e=new WeakMap;function n(o,l){const c=o.array,f=o.usage,p=c.byteLength,h=t.createBuffer();t.bindBuffer(l,h),t.bufferData(l,c,f),o.onUploadCallback();let m;if(c instanceof Float32Array)m=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=t.HALF_FLOAT:m=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=t.SHORT;else if(c instanceof Uint32Array)m=t.UNSIGNED_INT;else if(c instanceof Int32Array)m=t.INT;else if(c instanceof Int8Array)m=t.BYTE;else if(c instanceof Uint8Array)m=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,l,c){const f=l.array,p=l.updateRanges;if(t.bindBuffer(c,o),p.length===0)t.bufferSubData(c,0,f);else{p.sort((m,g)=>m.start-g.start);let h=0;for(let m=1;m<p.length;m++){const g=p[h],y=p[m];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++h,p[h]=y)}p.length=h+1;for(let m=0,g=p.length;m<g;m++){const y=p[m];t.bufferSubData(c,y.start*f.BYTES_PER_ELEMENT,f,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var MT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ET=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,TT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,AT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,RT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,CT=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,bT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,NT=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,PT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,LT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,IT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,DT=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,UT=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,FT=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,OT=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,BT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,kT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,GT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,HT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,VT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,WT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,jT=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,XT=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,$T=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,YT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,KT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ZT="gl_FragColor = linearToOutputTexel( gl_FragColor );",JT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,QT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ew=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,tw=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,nw=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,iw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sw=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,aw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ow=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lw=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,uw=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dw=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fw=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,hw=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,pw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mw=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vw=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_w=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,xw=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Sw=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,yw=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Mw=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ew=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Tw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ww=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Aw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Nw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Pw=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Iw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Uw=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ow=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Bw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ww=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$w=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Zw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,eA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,iA=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,rA=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,sA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,aA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,oA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,cA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,dA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,mA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,gA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_A=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,SA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const yA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,MA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,EA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,TA=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,AA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,RA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,CA=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,bA=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,NA=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,PA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,LA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,IA=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,DA=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,UA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,FA=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,OA=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,BA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,zA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,HA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,VA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,WA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,XA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$A=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,YA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qA=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,KA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ZA=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,JA=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,QA=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,e1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ze={alphahash_fragment:MT,alphahash_pars_fragment:ET,alphamap_fragment:TT,alphamap_pars_fragment:wT,alphatest_fragment:AT,alphatest_pars_fragment:RT,aomap_fragment:CT,aomap_pars_fragment:bT,batching_pars_vertex:NT,batching_vertex:PT,begin_vertex:LT,beginnormal_vertex:IT,bsdfs:DT,iridescence_fragment:UT,bumpmap_pars_fragment:FT,clipping_planes_fragment:OT,clipping_planes_pars_fragment:BT,clipping_planes_pars_vertex:kT,clipping_planes_vertex:zT,color_fragment:GT,color_pars_fragment:HT,color_pars_vertex:VT,color_vertex:WT,common:jT,defaultnormal_vertex:XT,displacementmap_pars_vertex:$T,displacementmap_vertex:YT,emissivemap_fragment:qT,emissivemap_pars_fragment:KT,colorspace_fragment:ZT,colorspace_pars_fragment:JT,envmap_fragment:QT,envmap_common_pars_fragment:ew,envmap_pars_fragment:tw,envmap_pars_vertex:nw,envmap_physical_pars_fragment:hw,envmap_vertex:iw,fog_vertex:rw,fog_pars_vertex:sw,fog_fragment:aw,fog_pars_fragment:ow,gradientmap_pars_fragment:lw,lightmap_pars_fragment:cw,lights_lambert_fragment:uw,lights_lambert_pars_fragment:dw,lights_pars_begin:fw,lights_toon_fragment:pw,lights_toon_pars_fragment:mw,lights_phong_fragment:gw,lights_phong_pars_fragment:vw,lights_physical_fragment:_w,lights_physical_pars_fragment:xw,lights_fragment_begin:Sw,lights_fragment_maps:yw,lights_fragment_end:Mw,lightprobes_pars_fragment:Ew,logdepthbuf_fragment:Tw,logdepthbuf_pars_fragment:ww,logdepthbuf_pars_vertex:Aw,logdepthbuf_vertex:Rw,map_fragment:Cw,map_pars_fragment:bw,map_particle_fragment:Nw,map_particle_pars_fragment:Pw,metalnessmap_fragment:Lw,metalnessmap_pars_fragment:Iw,morphinstance_vertex:Dw,morphcolor_vertex:Uw,morphnormal_vertex:Fw,morphtarget_pars_vertex:Ow,morphtarget_vertex:Bw,normal_fragment_begin:kw,normal_fragment_maps:zw,normal_pars_fragment:Gw,normal_pars_vertex:Hw,normal_vertex:Vw,normalmap_pars_fragment:Ww,clearcoat_normal_fragment_begin:jw,clearcoat_normal_fragment_maps:Xw,clearcoat_pars_fragment:$w,iridescence_pars_fragment:Yw,opaque_fragment:qw,packing:Kw,premultiplied_alpha_fragment:Zw,project_vertex:Jw,dithering_fragment:Qw,dithering_pars_fragment:eA,roughnessmap_fragment:tA,roughnessmap_pars_fragment:nA,shadowmap_pars_fragment:iA,shadowmap_pars_vertex:rA,shadowmap_vertex:sA,shadowmask_pars_fragment:aA,skinbase_vertex:oA,skinning_pars_vertex:lA,skinning_vertex:cA,skinnormal_vertex:uA,specularmap_fragment:dA,specularmap_pars_fragment:fA,tonemapping_fragment:hA,tonemapping_pars_fragment:pA,transmission_fragment:mA,transmission_pars_fragment:gA,uv_pars_fragment:vA,uv_pars_vertex:_A,uv_vertex:xA,worldpos_vertex:SA,background_vert:yA,background_frag:MA,backgroundCube_vert:EA,backgroundCube_frag:TA,cube_vert:wA,cube_frag:AA,depth_vert:RA,depth_frag:CA,distance_vert:bA,distance_frag:NA,equirect_vert:PA,equirect_frag:LA,linedashed_vert:IA,linedashed_frag:DA,meshbasic_vert:UA,meshbasic_frag:FA,meshlambert_vert:OA,meshlambert_frag:BA,meshmatcap_vert:kA,meshmatcap_frag:zA,meshnormal_vert:GA,meshnormal_frag:HA,meshphong_vert:VA,meshphong_frag:WA,meshphysical_vert:jA,meshphysical_frag:XA,meshtoon_vert:$A,meshtoon_frag:YA,points_vert:qA,points_frag:KA,shadow_vert:ZA,shadow_frag:JA,sprite_vert:QA,sprite_frag:e1},_e={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new Je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new Je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},si={basic:{uniforms:tn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:tn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new qe(0)},envMapIntensity:{value:1}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:tn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:tn([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:tn([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new qe(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:tn([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:tn([_e.points,_e.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:tn([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:tn([_e.common,_e.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:tn([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:tn([_e.sprite,_e.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distance:{uniforms:tn([_e.common,_e.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distance_vert,fragmentShader:ze.distance_frag},shadow:{uniforms:tn([_e.lights,_e.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};si.physical={uniforms:tn([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new Je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ue},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new Je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new Je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const rl={r:0,b:0,g:0},t1=new _t,N_=new Ue;N_.set(-1,0,0,0,1,0,0,0,1);function n1(t,e,n,i,r,s){const a=new qe(0);let o=r===!0?0:1,l,c,f=null,p=0,h=null;function m(_){let S=_.isScene===!0?_.background:null;if(S&&S.isTexture){const M=_.backgroundBlurriness>0;S=e.get(S,M)}return S}function g(_){let S=!1;const M=m(_);M===null?v(a,o):M&&M.isColor&&(v(M,1),S=!0);const R=t.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,s):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function y(_,S){const M=m(S);M&&M.isCubeTexture?(c===void 0&&(c=new Wr(new fo(1,1,1),new jr({name:"BackgroundCubeMaterial",uniforms:Vs(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,A,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(t1.makeRotationFromEuler(S.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(N_),c.material.toneMapped=je.getTransfer(M.colorSpace)!==tt,(f!==M||p!==M.version||h!==t.toneMapping)&&(c.material.needsUpdate=!0,f=M,p=M.version,h=t.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Wr(new Lc(2,2),new jr({name:"BackgroundMaterial",uniforms:Vs(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:Gr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=je.getTransfer(M.colorSpace)!==tt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(f!==M||p!==M.version||h!==t.toneMapping)&&(l.material.needsUpdate=!0,f=M,p=M.version,h=t.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function v(_,S){_.getRGB(rl,R_(t)),n.buffers.color.setClear(rl.r,rl.g,rl.b,S,s)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,S=1){a.set(_),o=S,v(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,v(a,o)},render:g,addToRenderList:y,dispose:d}}function i1(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(P,O,X,D,$){let Q=!1;const G=p(P,D,X,O);s!==G&&(s=G,c(s.object)),Q=m(P,D,X,$),Q&&g(P,D,X,$),$!==null&&e.update($,t.ELEMENT_ARRAY_BUFFER),(Q||a)&&(a=!1,M(P,O,X,D),$!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return t.createVertexArray()}function c(P){return t.bindVertexArray(P)}function f(P){return t.deleteVertexArray(P)}function p(P,O,X,D){const $=D.wireframe===!0;let Q=i[O.id];Q===void 0&&(Q={},i[O.id]=Q);const G=P.isInstancedMesh===!0?P.id:0;let B=Q[G];B===void 0&&(B={},Q[G]=B);let F=B[X.id];F===void 0&&(F={},B[X.id]=F);let V=F[$];return V===void 0&&(V=h(l()),F[$]=V),V}function h(P){const O=[],X=[],D=[];for(let $=0;$<n;$++)O[$]=0,X[$]=0,D[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:X,attributeDivisors:D,object:P,attributes:{},index:null}}function m(P,O,X,D){const $=s.attributes,Q=O.attributes;let G=0;const B=X.getAttributes();for(const F in B)if(B[F].location>=0){const K=$[F];let de=Q[F];if(de===void 0&&(F==="instanceMatrix"&&P.instanceMatrix&&(de=P.instanceMatrix),F==="instanceColor"&&P.instanceColor&&(de=P.instanceColor)),K===void 0||K.attribute!==de||de&&K.data!==de.data)return!0;G++}return s.attributesNum!==G||s.index!==D}function g(P,O,X,D){const $={},Q=O.attributes;let G=0;const B=X.getAttributes();for(const F in B)if(B[F].location>=0){let K=Q[F];K===void 0&&(F==="instanceMatrix"&&P.instanceMatrix&&(K=P.instanceMatrix),F==="instanceColor"&&P.instanceColor&&(K=P.instanceColor));const de={};de.attribute=K,K&&K.data&&(de.data=K.data),$[F]=de,G++}s.attributes=$,s.attributesNum=G,s.index=D}function y(){const P=s.newAttributes;for(let O=0,X=P.length;O<X;O++)P[O]=0}function v(P){d(P,0)}function d(P,O){const X=s.newAttributes,D=s.enabledAttributes,$=s.attributeDivisors;X[P]=1,D[P]===0&&(t.enableVertexAttribArray(P),D[P]=1),$[P]!==O&&(t.vertexAttribDivisor(P,O),$[P]=O)}function _(){const P=s.newAttributes,O=s.enabledAttributes;for(let X=0,D=O.length;X<D;X++)O[X]!==P[X]&&(t.disableVertexAttribArray(X),O[X]=0)}function S(P,O,X,D,$,Q,G){G===!0?t.vertexAttribIPointer(P,O,X,$,Q):t.vertexAttribPointer(P,O,X,D,$,Q)}function M(P,O,X,D){y();const $=D.attributes,Q=X.getAttributes(),G=O.defaultAttributeValues;for(const B in Q){const F=Q[B];if(F.location>=0){let V=$[B];if(V===void 0&&(B==="instanceMatrix"&&P.instanceMatrix&&(V=P.instanceMatrix),B==="instanceColor"&&P.instanceColor&&(V=P.instanceColor)),V!==void 0){const K=V.normalized,de=V.itemSize,be=e.get(V);if(be===void 0)continue;const Z=be.buffer,me=be.type,ye=be.bytesPerElement,Ce=me===t.INT||me===t.UNSIGNED_INT||V.gpuType===Ch;if(V.isInterleavedBufferAttribute){const xe=V.data,Oe=xe.isInterleavedBuffer===!0?xe.stride:xe.itemSize,Et=V.offset;if(xe.isInstancedInterleavedBuffer||xe.isInstancedBufferAttribute){for(let Le=0;Le<F.locationSize;Le++)d(F.location+Le,xe.meshPerAttribute);P.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let Le=0;Le<F.locationSize;Le++)v(F.location+Le);t.bindBuffer(t.ARRAY_BUFFER,Z);for(let Le=0;Le<F.locationSize;Le++)S(F.location+Le,de/F.locationSize,me,K,Oe*ye,(Et+de/F.locationSize*Le)*ye,Ce)}else{if(V.isInstancedBufferAttribute){for(let xe=0;xe<F.locationSize;xe++)d(F.location+xe,V.meshPerAttribute);P.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let xe=0;xe<F.locationSize;xe++)v(F.location+xe);t.bindBuffer(t.ARRAY_BUFFER,Z);for(let xe=0;xe<F.locationSize;xe++)S(F.location+xe,de/F.locationSize,me,K,de*ye,de/F.locationSize*xe*ye,Ce)}}else if(G!==void 0){const K=G[B];if(K!==void 0)switch(K.length){case 2:t.vertexAttrib2fv(F.location,K);break;case 3:t.vertexAttrib3fv(F.location,K);break;case 4:t.vertexAttrib4fv(F.location,K);break;default:t.vertexAttrib1fv(F.location,K)}}}}_()}function R(){I();for(const P in i){const O=i[P];for(const X in O){const D=O[X];for(const $ in D){const Q=D[$];for(const G in Q)f(Q[G].object),delete Q[G];delete D[$]}}delete i[P]}}function A(P){if(i[P.id]===void 0)return;const O=i[P.id];for(const X in O){const D=O[X];for(const $ in D){const Q=D[$];for(const G in Q)f(Q[G].object),delete Q[G];delete D[$]}}delete i[P.id]}function x(P){for(const O in i){const X=i[O];for(const D in X){const $=X[D];if($[P.id]===void 0)continue;const Q=$[P.id];for(const G in Q)f(Q[G].object),delete Q[G];delete $[P.id]}}}function w(P){for(const O in i){const X=i[O],D=P.isInstancedMesh===!0?P.id:0,$=X[D];if($!==void 0){for(const Q in $){const G=$[Q];for(const B in G)f(G[B].object),delete G[B];delete $[Q]}delete X[D],Object.keys(X).length===0&&delete i[O]}}}function I(){C(),a=!0,s!==r&&(s=r,c(s.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:C,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfObject:w,releaseStatesOfProgram:x,initAttributes:y,enableAttribute:v,disableUnusedAttributes:_}}function r1(t,e,n){let i;function r(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function a(l,c,f){f!==0&&(t.drawArraysInstanced(i,l,c,f),n.update(c,i,f))}function o(l,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,f);let h=0;for(let m=0;m<f;m++)h+=c[m];n.update(h,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function s1(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const x=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(x){return!(x!==li&&i.convert(x)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){const w=x===hi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(x!==Dn&&x!==oi&&!w&&i.convert(x)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const f=l(c);f!==c&&(Ie("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const p=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.logarithmicDepthBuffer===!0&&p===!1;n.reversedDepthBuffer===!0&&p===!1&&Ie("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),n.logarithmicDepthBuffer===!0&&p===!0&&Ie("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const m=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=t.getParameter(t.MAX_TEXTURE_SIZE),v=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),d=t.getParameter(t.MAX_VERTEX_ATTRIBS),_=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),S=t.getParameter(t.MAX_VARYING_VECTORS),M=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),R=t.getParameter(t.MAX_SAMPLES),A=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:p,maxTextures:m,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:v,maxAttributes:d,maxVertexUniforms:_,maxVaryings:S,maxFragmentUniforms:M,maxSamples:R,samples:A}}function a1(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new qi,o=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,h){const m=p.length!==0||h||i!==0||r;return r=h,i=p.length,m},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,h){n=f(p,h,0)},this.setState=function(p,h,m){const g=p.clippingPlanes,y=p.clipIntersection,v=p.clipShadows,d=t.get(p);if(!r||g===null||g.length===0||s&&!v)s?f(null):c();else{const _=s?0:i,S=_*4;let M=d.clippingState||null;l.value=M,M=f(g,h,S,m);for(let R=0;R!==S;++R)M[R]=n[R];d.clippingState=M,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(p,h,m,g){const y=p!==null?p.length:0;let v=null;if(y!==0){if(v=l.value,g!==!0||v===null){const d=m+y*4,_=h.matrixWorldInverse;o.getNormalMatrix(_),(v===null||v.length<d)&&(v=new Float32Array(d));for(let S=0,M=m;S!==y;++S,M+=4)a.copy(p[S]).applyMatrix4(_,o),a.normal.toArray(v,M),v[M+3]=a.constant}l.value=v,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,v}}class Bh extends di{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new T_(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new fo(5,5,5),s=new jr({name:"CubemapFromEquirect",uniforms:Vs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:gn,blending:Ns});s.uniforms.tEquirect.value=n;const a=new Wr(r,s),o=n.minFilter;return n.minFilter===ir&&(n.minFilter=fn),new Cf(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}const Jm=256,o1=3,l1=20,P_=256,L_=16,c1=3,u1=new W,d1=new qe;class lc{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Cf(1,10,null),this._boxMesh=new Wr(new fo(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:a=256,position:o=u1}=s,l=this._renderer;this._setSize(a);const c=this._allocateTarget(),f=this._getSourceTarget(!0);n>0&&(f.texture.mipmapsAutoUpdate=!1);const p=l.autoClear,h=l.autoClearColor,m=l.autoClearDepth,g=l.autoClearStencil,y=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,y===null&&(e.background=l.getClearColor(d1));const v=new Cf(i,r,f);return v.position.copy(o),v.update(l,e),l.autoClear=p,l.autoClearColor=h,l.autoClearDepth=m,l.autoClearStencil=g,e.background=y,n>0&&(f.texture.mipmapsAutoUpdate=!0,this._blur(c,n)),this._applyPMREM(c),c}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=eg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,n){return n>0?1-Math.sqrt(1-e/n):0}_setSize(e){this._cubeSize=Math.max(Jm,UE(e))}_fromTexture(e,n){e.mapping===zs||e.mapping===Qa?this._setSize(e.image.length===0?Jm:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const i=n||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){const e=this._cubeSize,n=Qm(e,!1,!1),i=Math.log2(e)-o1;for(let r=0;r<=i;r++)n.texture.mipmaps.push({width:e>>r,height:e>>r});return n.texture.name="PMREM",n.texture.isPMREMTexture=!0,n}_getSourceTarget(e=!1){const n=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==n||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Qm(n,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,n,i){const r=this._boxMesh,s=this._cubeCamera;r.material=i,s.renderTarget=e,s.activeMipmapLevel=n;const a=e.width>>n;e.viewport.set(0,0,a,a),s.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let n;e.mapping===zs||e.mapping===Qa?(this._cubemapMaterial===null&&(this._cubemapMaterial=tg()),n=this._cubemapMaterial,n.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=eg()),n=this._equirectMaterial),n.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,n)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=f1(),this._integrationMaterial=h1());const n=this._cubeSize,i=e.texture.mipmaps.length-1,r=this._ggxMaterial.uniforms;r.envMap.value=this._sourceTarget.texture;const s=this._integrationMaterial.uniforms;s.envMap.value=this._sourceTarget.texture,s.sourceLod.value=Math.log2(n/L_);for(let a=0;a<=i;a++){const o=lc.lodToRoughness(a,i);if(a>i-c1)s.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const l=o>0?Math.log2(n)+.5*Math.log2(6/(P_*Math.pow(o,4)))+.5:0;r.roughness.value=o,r.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,n){this._blurMaterial===null&&(this._blurMaterial=p1());const i=this._blurMaterial,r=i.uniforms,s=this._sourceTarget;r.sigma.value=Math.min(n,Math.PI)/Math.SQRT2,r.envMap.value=s.texture,this._renderCube(e,0,i),r.envMap.value=e.texture,this._renderCube(s,0,i)}}function Qm(t,e,n){return new Bh(t,{minFilter:ir,generateMipmaps:e,type:hi,colorSpace:tc,depthBuffer:n})}function ho(t,e,n){return new jr({name:t,uniforms:e,vertexShader:ze.cube_vert,fragmentShader:n,side:gn,blending:Ns,depthTest:!1,depthWrite:!1})}function f1(){return ho("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${P_}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function h1(){return ho("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:L_}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function p1(){return ho("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${l1}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function eg(){return ho("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function tg(){return ho("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function m1(t){let e=new WeakMap,n=new WeakMap,i=null;function r(h,m=!1){return h==null?null:m?a(h):s(h)}function s(h){if(h&&h.isTexture){const m=h.mapping;if(m===du||m===fu)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const y=new Bh(g.height);return y.fromEquirectangularTexture(t,h),e.set(h,y),h.addEventListener("dispose",c),o(y.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture&&h.isPMREMTexture!==!0){const m=h.mapping,g=m===du||m===fu,y=m===zs||m===Qa;if(g||y){let v=n.get(h);const d=v!==void 0?v.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==d)return i===null&&(i=new lc(t)),v=g?i.fromEquirectangular(h,v):i.fromCubemap(h,v),v.texture.pmremVersion=h.pmremVersion,n.set(h,v),v.texture;if(v!==void 0)return v.texture;{const _=h.image;return g&&_&&_.height>0||y&&_&&l(_)?(i===null&&(i=new lc(t)),v=g?i.fromEquirectangular(h):i.fromCubemap(h),v.texture.pmremVersion=h.pmremVersion,n.set(h,v),h.addEventListener("dispose",f),v.texture):null}}}return h}function o(h,m){return m===du?h.mapping=zs:m===fu&&(h.mapping=Qa),h}function l(h){let m=0;const g=6;for(let y=0;y<g;y++)h[y]!==void 0&&m++;return m===g}function c(h){const m=h.target;m.removeEventListener("dispose",c);const g=e.get(m);g!==void 0&&(e.delete(m),g.dispose())}function f(h){const m=h.target;m.removeEventListener("dispose",f);const g=n.get(m);g!==void 0&&(n.delete(m),g.dispose())}function p(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:p}}function g1(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&El("WebGLRenderer: "+i+" extension not supported."),r}}}function v1(t,e,n,i){const r={},s=new WeakMap,a=new FinalizationRegistry(g=>delete r[g]);function o(g){l(g.target)}function l(g){g.index!==null&&e.remove(g.index);for(const v in g.attributes)e.remove(g.attributes[v]);g.removeEventListener("dispose",o),delete r[g.id],a.unregister(g);const y=s.get(g);y&&(e.remove(y),s.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,n.memory.geometries--}function c(g,y){return r[y.id]!==void 0||(y.addEventListener("dispose",o),r[y.id]=new WeakRef(y),a.register(y,y.id,y),n.memory.geometries++),y}function f(g){const y=g.attributes;for(const v in y)e.update(y[v],t.ARRAY_BUFFER)}function p(g){const y=g.index,v=g.attributes.position;let d=0;if(v===void 0)return;const _=y!==null?y.array.length:v.array.length/3-1,S=v.count>=65535?y_:S_,M=new S(Math.ceil(_/3)*6,1),R=M.array;if(y!==null){const x=y.array;d=y.version;for(let w=0,I=0;w<_;w+=3){const C=x[w+0],P=x[w+1],O=x[w+2];R[I++]=C,R[I++]=P,R[I++]=P,R[I++]=O,R[I++]=O,R[I++]=C}}else{d=v.version;for(let x=0,w=0;x<_;x+=3){const I=x+0,C=x+1,P=x+2;R[w++]=I,R[w++]=C,R[w++]=C,R[w++]=P,R[w++]=P,R[w++]=I}}M.version=d;const A=s.get(g);A&&e.remove(A),s.set(g,M)}function h(g){const y=s.get(g);if(y){const v=g.index;v!==null&&y.version<v.version&&p(g)}else p(g);return s.get(g)}function m(){for(const g in r){const y=r[g].deref();y!==void 0&&l(y)}}return{get:c,update:f,getWireframeAttribute:h,dispose:m}}function _1(t,e,n){let i;function r(p){i=p}let s,a;function o(p){s=p.type,a=p.bytesPerElement}function l(p,h){t.drawElements(i,h,s,p*a),n.update(h,i,1)}function c(p,h,m){m!==0&&(t.drawElementsInstanced(i,h,s,p*a,m),n.update(h,i,m))}function f(p,h,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,p,0,m);let y=0;for(let v=0;v<m;v++)y+=h[v];n.update(y,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f}function x1(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:Ze("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function S1(t,e,n){const i=new WeakMap,r=new yt;function s(a,o,l){const c=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=f!==void 0?f.length:0;let h=i.get(o);if(h===void 0||h.count!==p){let C=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",C)};var m=C;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),y===!0&&(M=2),v===!0&&(M=3);let R=o.attributes.position.count*M,A=1;R>e.maxTextureSize&&(A=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const x=new Float32Array(R*A*4*p),w=new v_(x,R,A,p);w.type=oi,w.needsUpdate=!0;const I=M*4;for(let P=0;P<p;P++){const O=d[P],X=_[P],D=S[P],$=R*A*4*P;for(let Q=0;Q<O.count;Q++){const G=Q*I;g===!0&&(r.fromBufferAttribute(O,Q),x[$+G+0]=r.x,x[$+G+1]=r.y,x[$+G+2]=r.z,x[$+G+3]=0),y===!0&&(r.fromBufferAttribute(X,Q),x[$+G+4]=r.x,x[$+G+5]=r.y,x[$+G+6]=r.z,x[$+G+7]=0),v===!0&&(r.fromBufferAttribute(D,Q),x[$+G+8]=r.x,x[$+G+9]=r.y,x[$+G+10]=r.z,x[$+G+11]=D.itemSize===4?r.w:1)}}h={count:p,texture:w,size:new Je(R,A)},i.set(o,h),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let g=0;for(let v=0;v<c.length;v++)g+=c[v];const y=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(t,"morphTargetBaseInfluence",y),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",h.size)}return{update:s}}function y1(t,e,n,i,r){let s=new WeakMap;function a(c){const f=r.render.frame,p=c.geometry,h=e.get(c,p);if(s.get(h)!==f&&(e.update(h),s.set(h,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==f&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,f))),c.isSkinnedMesh){const m=c.skeleton;s.get(m)!==f&&(m.update(),s.set(m,f))}return h}function o(){s=new WeakMap}function l(c){const f=c.target;f.removeEventListener("dispose",l),i.releaseStatesOfObject(f),n.remove(f.instanceMatrix),f.instanceColor!==null&&n.remove(f.instanceColor)}return{update:a,dispose:o}}const M1={[J0]:"LINEAR_TONE_MAPPING",[Q0]:"REINHARD_TONE_MAPPING",[e_]:"CINEON_TONE_MAPPING",[t_]:"ACES_FILMIC_TONE_MAPPING",[i_]:"AGX_TONE_MAPPING",[r_]:"NEUTRAL_TONE_MAPPING",[n_]:"CUSTOM_TONE_MAPPING"};function E1(t,e,n,i,r,s){const a=new di(e,n,{type:t,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null,c=null;const f=new Qn;f.setAttribute("position",new Mn([-1,3,0,-1,-1,0,3,-1,0],3)),f.setAttribute("uv",new Mn([0,2,0,0,2,0],2));const p=new mT({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new Wr(f,p),m=new _T(-1,1,1,-1,0,1);let g=null,y=null,v=!1,d,_=null,S=[],M=!1;this.setSize=function(R,A){a.setSize(R,A),o!==null&&o.setSize(R,A),l!==null&&l.setSize(R,A);for(let x=0;x<S.length;x++){const w=S[x];w.setSize&&w.setSize(R,A)}},this.setEffects=function(R){S=R,M=S.length>0&&S[0].isRenderPass===!0;const A=a.width,x=a.height;S.length>0&&o===null&&(o=new di(A,x,{type:hi,depthBuffer:!1,stencilBuffer:!1}),l=new di(A,x,{type:hi,depthBuffer:!1,stencilBuffer:!1}));const w=r===!0&&S.some(I=>I.needsDepthTexture===!0);w!==(a.depthTexture!==null)&&(w===!0&&c===null&&(c=new Hs(A,x),s===!0&&(c.format=rr,c.type=Gs)),a.dispose(),a.depthTexture=w?c:null,a.resolveDepthBuffer=w,a.storeMultisampledDepthBuffer=w);for(let I=0;I<S.length;I++){const C=S[I];C.setSize&&C.setSize(A,x),w&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(c)}},this.begin=function(R,A){if(v||R.toneMapping===Ci&&S.length===0)return!1;if(_=A,A!==null){const x=A.width,w=A.height;(a.width!==x||a.height!==w)&&this.setSize(x,w)}return M===!1&&R.setRenderTarget(a),d=R.toneMapping,R.toneMapping=Ci,!0},this.hasRenderPass=function(){return M},this.end=function(R,A){R.toneMapping=d,v=!0;let x=a,w=o;for(let I=0;I<S.length;I++){const C=S[I];C.enabled!==!1&&(C.render(R,w,x,A),C.needsSwap!==!1&&(x=w,w=w===o?l:o))}if(g!==R.outputColorSpace||y!==R.toneMapping){g=R.outputColorSpace,y=R.toneMapping,p.defines={},je.getTransfer(g)===tt&&(p.defines.SRGB_TRANSFER="");const I=M1[y];I&&(p.defines[I]=""),p.needsUpdate=!0}p.uniforms.tDiffuse.value=x.texture,R.setRenderTarget(_),R.render(h,m),_=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),f.dispose(),p.dispose()}}const I_=new sn,D_=new Hs(1,1),U_=new w_(1),F_=new v_,O_=new VE,B_=new T_,ng=[],ig=[],rg=new Float32Array(16),sg=new Float32Array(9),ag=new Float32Array(4);function Js(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=ng[r];if(s===void 0&&(s=new Float32Array(r),ng[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function Pt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Lt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Ic(t,e){let n=ig[e];n===void 0&&(n=new Int32Array(e),ig[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function T1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function w1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Pt(n,e))return;t.uniform2fv(this.addr,e),Lt(n,e)}}function A1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Pt(n,e))return;t.uniform3fv(this.addr,e),Lt(n,e)}}function R1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Pt(n,e))return;t.uniform4fv(this.addr,e),Lt(n,e)}}function C1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Pt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Lt(n,e)}else{if(Pt(n,i))return;ag.set(i),t.uniformMatrix2fv(this.addr,!1,ag),Lt(n,i)}}function b1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Pt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Lt(n,e)}else{if(Pt(n,i))return;sg.set(i),t.uniformMatrix3fv(this.addr,!1,sg),Lt(n,i)}}function N1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Pt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Lt(n,e)}else{if(Pt(n,i))return;rg.set(i),t.uniformMatrix4fv(this.addr,!1,rg),Lt(n,i)}}function P1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function L1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Pt(n,e))return;t.uniform2iv(this.addr,e),Lt(n,e)}}function I1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Pt(n,e))return;t.uniform3iv(this.addr,e),Lt(n,e)}}function D1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Pt(n,e))return;t.uniform4iv(this.addr,e),Lt(n,e)}}function U1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function F1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Pt(n,e))return;t.uniform2uiv(this.addr,e),Lt(n,e)}}function O1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Pt(n,e))return;t.uniform3uiv(this.addr,e),Lt(n,e)}}function B1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Pt(n,e))return;t.uniform4uiv(this.addr,e),Lt(n,e)}}function Dc(t){return t.version===0&&(t.compareFunction=m_,t.needsUpdate=!0),t}function k1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?s=Dc(D_):s=I_,n.setTexture2D(e||s,r)}function z1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||O_,r)}function G1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_CUBE_SHADOW?s=Dc(U_):s=B_,n.setTextureCube(e||s,r)}function H1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||F_,r)}function V1(t){switch(t){case 5126:return T1;case 35664:return w1;case 35665:return A1;case 35666:return R1;case 35674:return C1;case 35675:return b1;case 35676:return N1;case 5124:case 35670:return P1;case 35667:case 35671:return L1;case 35668:case 35672:return I1;case 35669:case 35673:return D1;case 5125:return U1;case 36294:return F1;case 36295:return O1;case 36296:return B1;case 35678:case 36198:case 36298:case 36306:case 35682:return k1;case 35679:case 36299:case 36307:return z1;case 35680:case 36300:case 36308:case 36293:return G1;case 36289:case 36303:case 36311:case 36292:return H1}}function W1(t,e){t.uniform1fv(this.addr,e)}function j1(t,e){const n=Js(e,this.size,2);t.uniform2fv(this.addr,n)}function X1(t,e){const n=Js(e,this.size,3);t.uniform3fv(this.addr,n)}function $1(t,e){const n=Js(e,this.size,4);t.uniform4fv(this.addr,n)}function Y1(t,e){const n=Js(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function q1(t,e){const n=Js(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function K1(t,e){const n=Js(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function Z1(t,e){t.uniform1iv(this.addr,e)}function J1(t,e){t.uniform2iv(this.addr,e)}function Q1(t,e){t.uniform3iv(this.addr,e)}function eR(t,e){t.uniform4iv(this.addr,e)}function tR(t,e){t.uniform1uiv(this.addr,e)}function nR(t,e){t.uniform2uiv(this.addr,e)}function iR(t,e){t.uniform3uiv(this.addr,e)}function rR(t,e){t.uniform4uiv(this.addr,e)}function sR(t,e,n){const i=this.cache,r=e.length,s=Ic(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));let a;this.type===t.SAMPLER_2D_SHADOW?a=Dc(D_):a=I_;for(let o=0;o!==r;++o)n.setTexture2D(e[o]||a,s[o])}function aR(t,e,n){const i=this.cache,r=e.length,s=Ic(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||O_,s[a])}function oR(t,e,n){const i=this.cache,r=e.length,s=Ic(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));let a;this.type===t.SAMPLER_CUBE_SHADOW?a=Dc(U_):a=B_;for(let o=0;o!==r;++o)n.setTextureCube(e[o]||a,s[o])}function lR(t,e,n){const i=this.cache,r=e.length,s=Ic(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||F_,s[a])}function cR(t){switch(t){case 5126:return W1;case 35664:return j1;case 35665:return X1;case 35666:return $1;case 35674:return Y1;case 35675:return q1;case 35676:return K1;case 5124:case 35670:return Z1;case 35667:case 35671:return J1;case 35668:case 35672:return Q1;case 35669:case 35673:return eR;case 5125:return tR;case 36294:return nR;case 36295:return iR;case 36296:return rR;case 35678:case 36198:case 36298:case 36306:case 35682:return sR;case 35679:case 36299:case 36307:return aR;case 35680:case 36300:case 36308:case 36293:return oR;case 36289:case 36303:case 36311:case 36292:return lR}}class uR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=V1(n.type)}}class dR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=cR(n.type)}}class fR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const Bu=/(\w+)(\])?(\[|\.)?/g;function og(t,e){t.seq.push(e),t.map[e.id]=e}function hR(t,e,n){const i=t.name,r=i.length;for(Bu.lastIndex=0;;){const s=Bu.exec(i),a=Bu.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){og(n,c===void 0?new uR(o,t,e):new dR(o,t,e));break}else{let p=n.map[o];p===void 0&&(p=new fR(o),og(n,p)),n=p}}}class Tl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(n,a),l=e.getUniformLocation(n,o.name);hR(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function lg(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const pR=37297;let mR=0;function gR(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const cg=new Ue;function vR(t){je._getMatrix(cg,je.workingColorSpace,t);const e=`mat3( ${cg.elements.map(n=>n.toFixed(4))} )`;switch(je.getTransfer(t)){case nc:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return Ie("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function ug(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+gR(t.getShaderSource(e),o)}else return s}function _R(t,e){const n=vR(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const xR={[J0]:"Linear",[Q0]:"Reinhard",[e_]:"Cineon",[t_]:"ACESFilmic",[i_]:"AgX",[r_]:"Neutral",[n_]:"Custom"};function SR(t,e){const n=xR[e];return n===void 0?(Ie("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const sl=new W;function yR(){je.getLuminanceCoefficients(sl);const t=sl.x.toFixed(4),e=sl.y.toFixed(4),n=sl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function MR(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ma).join(`
`)}function ER(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function TR(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function Ma(t){return t!==""}function dg(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function fg(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const wR=/^[ \t]*#include +<([\w\d./]+)>/gm;function bf(t){return t.replace(wR,AR)}function AR(t,e){const n=ze[e];if(n===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return bf(n)}const RR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hg(t){return t.replace(RR,CR)}function CR(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function pg(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const bR={[_l]:"SHADOWMAP_TYPE_PCF",[Sa]:"SHADOWMAP_TYPE_VSM"};function NR(t){return bR[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const PR={[Qa]:"ENVMAP_MODE_REFRACTION"};function LR(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":PR[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const IR={[Z0]:"ENVMAP_BLENDING_MULTIPLY",[_E]:"ENVMAP_BLENDING_MIX",[xE]:"ENVMAP_BLENDING_ADD"};function DR(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":IR[t.combine]||"ENVMAP_BLENDING_NONE"}function UR(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=NR(n),c=n.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",f=LR(n),p=DR(n),h=MR(n),m=ER(s),g=r.createProgram();let y,v,d=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(Ma).join(`
`),y.length>0&&(y+=`
`),v=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(Ma).join(`
`),v.length>0&&(v+=`
`)):(y=[pg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+n.diffuseRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ma).join(`
`),v=[pg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+p:"",n.envMapPMREM?"#define ENVMAP_MAX_LOD "+n.envMapMaxLod+".0":"",n.envMapPMREM?"#define ENVMAP_SIZE "+n.envMapSize+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",n.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ci?"#define TONE_MAPPING":"",n.toneMapping!==Ci?ze.tonemapping_pars_fragment:"",n.toneMapping!==Ci?SR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,_R("linearToOutputTexel",n.outputColorSpace),yR(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ma).join(`
`)),a=bf(a),a=dg(a,n),a=fg(a,n),o=bf(o),o=dg(o,n),o=fg(o,n),a=hg(a),o=hg(o),n.isRawShaderMaterial!==!0&&(d=`#version 300 es
`,y=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,v=["#define varying in",n.glslVersion===Tm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Tm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const _=d+y+a,S=d+v+o,M=lg(r,r.VERTEX_SHADER,_),R=lg(r,r.FRAGMENT_SHADER,S);r.attachShader(g,M),r.attachShader(g,R),n.index0AttributeName!==void 0?r.bindAttribLocation(g,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function A(C){if(t.debug.checkShaderErrors){const P=r.getProgramInfoLog(g)||"",O=r.getShaderInfoLog(M)||"",X=r.getShaderInfoLog(R)||"",D=P.trim(),$=O.trim(),Q=X.trim();let G=!0,B=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(G=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,g,M,R);else{const F=ug(r,M,"vertex"),V=ug(r,R,"fragment");Ze("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+D+`
`+F+`
`+V)}else D!==""?Ie("WebGLProgram: Program Info Log:",D):($===""||Q==="")&&(B=!1);B&&(C.diagnostics={runnable:G,programLog:D,vertexShader:{log:$,prefix:y},fragmentShader:{log:Q,prefix:v}})}r.deleteShader(M),r.deleteShader(R),x=new Tl(r,g),w=TR(r,g)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let I=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=r.getProgramParameter(g,pR)),I},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=mR++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=M,this.fragmentShader=R,this}let FR=0;class OR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new BR(e),n.set(e,i)),i}}class BR{constructor(e){this.id=FR++,this.code=e,this.usedTimes=0}}function kR(t){return t===Hr||t===Ql||t===ec}function zR(t,e,n,i,r,s){const a=new __,o=new OR,l=new Set,c=[],f=new Map,p=i.logarithmicDepthBuffer,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return l.add(x),x===0?"uv":`uv${x}`}function g(x,w,I,C,P,O){const X=C.fog,D=P.geometry,$=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?C.environment:null,Q=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,G=e.get(x.envMap||$,Q),B=h[x.type];let F=i.precision;x.precision!==null&&(F=i.getMaxPrecision(x.precision),F!==x.precision&&Ie("WebGLProgram.getParameters:",x.precision,"not supported, using",F,"instead."));const V=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,K=V!==void 0?V.length:0;let de=0;D.morphAttributes.position!==void 0&&(de=1),D.morphAttributes.normal!==void 0&&(de=2),D.morphAttributes.color!==void 0&&(de=3);let be,Z,me,ye;if(B){const ve=si[B];be=ve.vertexShader,Z=ve.fragmentShader}else{be=x.vertexShader,Z=x.fragmentShader;const ve=o.getVertexShaderStage(x),et=o.getFragmentShaderStage(x);o.update(x,ve,et),me=ve.id,ye=et.id}const Ce=t.getRenderTarget(),xe=t.state.buffers.depth.getReversed(),Oe=P.isInstancedMesh===!0,Et=P.isBatchedMesh===!0,Le=!!x.map,Qe=!!x.matcap,it=!!G,He=it&&G.isPMREMTexture===!0,kt=!!x.aoMap,Rt=!!x.lightMap,cn=!!x.bumpMap&&x.wireframe===!1,ht=!!x.normalMap,ei=!!x.displacementMap,It=!!x.emissiveMap,An=!!x.metalnessMap,Rn=!!x.roughnessMap,Cn=x.anisotropy>0,U=x.clearcoat>0,bn=x.diffuseRoughness>0,ut=x.dispersion>0,dt=x.retroreflectivity>0,ge=x.iridescence>0,Ct=x.sheen>0,Pe=x.transmission>0,De=Cn&&!!x.anisotropyMap,b=U&&!!x.clearcoatMap,E=U&&!!x.clearcoatNormalMap,z=U&&!!x.clearcoatRoughnessMap,ie=bn&&!!x.diffuseRoughnessMap,ne=ge&&!!x.iridescenceMap,oe=ge&&!!x.iridescenceThicknessMap,he=Ct&&!!x.sheenColorMap,J=Ct&&!!x.sheenRoughnessMap,ee=!!x.specularMap,ce=!!x.specularColorMap,N=!!x.specularIntensityMap,te=Pe&&!!x.transmissionMap,q=Pe&&!!x.thicknessMap,ue=!!x.gradientMap,ae=!!x.alphaMap,le=x.alphaTest>0,Re=!!x.alphaHash,ke=!!x.extensions;let se=Ci;x.toneMapped&&(Ce===null||Ce.isXRRenderTarget===!0)&&(se=t.toneMapping);const Ne=He?G.isCompressedCubeTexture?G.image[0].mipmaps:G.mipmaps:null,Be={shaderID:B,shaderType:x.type,shaderName:x.name,vertexShader:be,fragmentShader:Z,defines:x.defines,customVertexShaderID:me,customFragmentShaderID:ye,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:F,batching:Et,batchingColor:Et&&P._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&P.instanceColor!==null,instancingMorph:Oe&&P.morphTexture!==null,outputColorSpace:Ce===null?t.outputColorSpace:Ce.isXRRenderTarget===!0?Ce.texture.colorSpace:je.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Le,matcap:Qe,envMap:it,envMapMode:it&&G.mapping,envMapPMREM:He,envMapMaxLod:He?Ne.length-1:null,envMapSize:He?Ne[0].width:null,aoMap:kt,lightMap:Rt,bumpMap:cn,normalMap:ht,displacementMap:ei,emissiveMap:It,normalMapObjectSpace:ht&&x.normalMapType===ME,normalMapTangentSpace:ht&&x.normalMapType===Em,packedNormalMap:ht&&x.normalMapType===Em&&kR(x.normalMap.format),metalnessMap:An,roughnessMap:Rn,anisotropy:Cn,anisotropyMap:De,clearcoat:U,clearcoatMap:b,clearcoatNormalMap:E,clearcoatRoughnessMap:z,diffuseRoughness:bn,diffuseRoughnessMap:ie,dispersion:ut,retroreflection:dt,iridescence:ge,iridescenceMap:ne,iridescenceThicknessMap:oe,sheen:Ct,sheenColorMap:he,sheenRoughnessMap:J,specularMap:ee,specularColorMap:ce,specularIntensityMap:N,transmission:Pe,transmissionMap:te,thicknessMap:q,gradientMap:ue,opaque:x.transparent===!1&&x.blending===La&&x.alphaToCoverage===!1,alphaMap:ae,alphaTest:le,alphaHash:Re,combine:x.combine,mapUv:Le&&m(x.map.channel),aoMapUv:kt&&m(x.aoMap.channel),lightMapUv:Rt&&m(x.lightMap.channel),bumpMapUv:cn&&m(x.bumpMap.channel),normalMapUv:ht&&m(x.normalMap.channel),displacementMapUv:ei&&m(x.displacementMap.channel),emissiveMapUv:It&&m(x.emissiveMap.channel),metalnessMapUv:An&&m(x.metalnessMap.channel),roughnessMapUv:Rn&&m(x.roughnessMap.channel),anisotropyMapUv:De&&m(x.anisotropyMap.channel),clearcoatMapUv:b&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:E&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&m(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ie&&m(x.diffuseRoughnessMap.channel),iridescenceMapUv:ne&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:he&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:J&&m(x.sheenRoughnessMap.channel),specularMapUv:ee&&m(x.specularMap.channel),specularColorMapUv:ce&&m(x.specularColorMap.channel),specularIntensityMapUv:N&&m(x.specularIntensityMap.channel),transmissionMapUv:te&&m(x.transmissionMap.channel),thicknessMapUv:q&&m(x.thicknessMap.channel),alphaMapUv:ae&&m(x.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(ht||Cn),vertexNormals:!!D.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!D.attributes.uv&&(Le||ae),fog:!!X,useFog:x.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||D.attributes.normal===void 0&&ht===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:xe,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:de,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:O.filter(ve=>ve.texture!==null).length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:t.shadowMap.enabled&&I.length>0,shadowMapType:t.shadowMap.type,toneMapping:se,decodeVideoTexture:Le&&x.map.isVideoTexture===!0&&je.getTransfer(x.map.colorSpace)===tt,decodeVideoTextureEmissive:It&&x.emissiveMap.isVideoTexture===!0&&je.getTransfer(x.emissiveMap.colorSpace)===tt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ei,flipSided:x.side===gn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ke&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ke&&x.extensions.multiDraw===!0||Et)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Be.vertexUv1s=l.has(1),Be.vertexUv2s=l.has(2),Be.vertexUv3s=l.has(3),l.clear(),Be}function y(x){const w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(const I in x.defines)w.push(I),w.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(v(w,x),d(w,x),w.push(t.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function v(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapPMREM),x.push(w.envMapMaxLod),x.push(w.envMapSize),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.diffuseRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.numSunLights),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numSunLightShadows),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.numLightProbeGrids),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function d(x,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.diffuseRoughness&&a.enable(25),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function _(x){const w=h[x.type];let I;if(w){const C=si[w];I=fT.clone(C.uniforms)}else I=x.uniforms;return I}function S(x,w){let I=f.get(w);return I!==void 0?++I.usedTimes:(I=new UR(t,w,x,r),c.push(I),f.set(w,I)),I}function M(x){if(--x.usedTimes===0){const w=c.indexOf(x);c[w]=c[c.length-1],c.pop(),f.delete(x.cacheKey),x.destroy()}}function R(x){o.remove(x)}function A(){o.dispose()}return{getParameters:g,getProgramCacheKey:y,getUniforms:_,acquireProgram:S,releaseProgram:M,releaseShaderCache:R,programs:c,dispose:A}}function GR(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,l){t.get(a)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function HR(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function mg(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function gg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function o(h,m,g,y,v,d){let _=t[e];return _===void 0?(_={id:h.id,object:h,geometry:m,material:g,materialVariant:a(h),groupOrder:y,renderOrder:h.renderOrder,z:v,group:d},t[e]=_):(_.id=h.id,_.object=h,_.geometry=m,_.material=g,_.materialVariant=a(h),_.groupOrder=y,_.renderOrder=h.renderOrder,_.z=v,_.group=d),e++,_}function l(h,m,g,y,v,d,_){_.reversedDepth===!0&&(v=-v);const S=o(h,m,g,y,v,d);g.transmission>0?i.push(S):g.transparent===!0?r.push(S):n.push(S)}function c(h,m,g,y,v,d){const _=o(h,m,g,y,v,d);g.transmission>0?i.unshift(_):g.transparent===!0?r.unshift(_):n.unshift(_)}function f(h,m){n.length>1&&n.sort(h||HR),i.length>1&&i.sort(m||mg),r.length>1&&r.sort(m||mg)}function p(){for(let h=e,m=t.length;h<m;h++){const g=t[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:p,sort:f}}function VR(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new gg,t.set(i,[a])):r>=s.length?(a=new gg,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function WR(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={direction:new W,color:new qe};break;case"SpotLight":n={position:new W,direction:new W,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new W,color:new qe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new W,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":n={color:new qe,position:new W,halfWidth:new W,halfHeight:new W};break}return t[e.id]=n,n}}}function jR(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let XR=0;function $R(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function YR(t){const e=new WR,n=jR(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new W);const r=new W,s=new _t,a=new _t;function o(c){let f=0,p=0,h=0;for(let O=0;O<9;O++)i.probe[O].set(0,0,0);let m=0,g=0,y=0,v=0,d=0,_=0,S=0,M=0,R=0,A=0,x=0,w=0,I=0,C=0;c.sort($R);for(let O=0,X=c.length;O<X;O++){const D=c[O],$=D.color,Q=D.intensity,G=D.distance;let B=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Hr?B=D.shadow.map.texture:B=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)f+=$.r*Q,p+=$.g*Q,h+=$.b*Q;else if(D.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(D.sh.coefficients[F],Q);C++}else if(D.isSunLight){const F=e.get(D);if(F.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const V=D.shadow,K=n.get(D);K.shadowIntensity=V.intensity,K.shadowBias=V.bias,K.shadowNormalBias=V.normalBias,K.shadowRadius=V.radius,K.shadowMapSize.copy(V.mapSize).multiply(V.getFrameExtents()),i.sunShadow[g]=K,i.sunShadowMap[g]=B;const de=V.getViewportCount();for(let be=0;be<de;be++)i.sunShadowMatrix[y+be]=V.getMatrix(be),i.sunShadowCascade[y+be]=V._cascadeData[be];y+=de,g++}i.sun[m]=F,m++}else if(D.isDirectionalLight){const F=e.get(D);if(F.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const V=D.shadow,K=n.get(D);K.shadowIntensity=V.intensity,K.shadowBias=V.bias,K.shadowNormalBias=V.normalBias,K.shadowRadius=V.radius,K.shadowMapSize=V.mapSize,i.directionalShadow[v]=K,i.directionalShadowMap[v]=B,i.directionalShadowMatrix[v]=D.shadow.matrix,R++}i.directional[v]=F,v++}else if(D.isSpotLight){const F=e.get(D);F.position.setFromMatrixPosition(D.matrixWorld),F.color.copy($).multiplyScalar(Q),F.distance=G,F.coneCos=Math.cos(D.angle),F.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),F.decay=D.decay,i.spot[_]=F;const V=D.shadow;if(D.map&&(i.spotLightMap[w]=D.map,w++,V.updateMatrices(D),D.castShadow&&I++),i.spotLightMatrix[_]=V.matrix,D.castShadow){const K=n.get(D);K.shadowIntensity=V.intensity,K.shadowBias=V.bias,K.shadowNormalBias=V.normalBias,K.shadowRadius=V.radius,K.shadowMapSize=V.mapSize,i.spotShadow[_]=K,i.spotShadowMap[_]=B,x++}_++}else if(D.isRectAreaLight){const F=e.get(D);F.color.copy($).multiplyScalar(Q),F.halfWidth.set(D.width*.5,0,0),F.halfHeight.set(0,D.height*.5,0),i.rectArea[S]=F,S++}else if(D.isPointLight){const F=e.get(D);if(F.color.copy(D.color).multiplyScalar(D.intensity),F.distance=D.distance,F.decay=D.decay,D.castShadow){const V=D.shadow,K=n.get(D);K.shadowIntensity=V.intensity,K.shadowBias=V.bias,K.shadowNormalBias=V.normalBias,K.shadowRadius=V.radius,K.shadowMapSize=V.mapSize,K.shadowCameraNear=V.camera.near,K.shadowCameraFar=V.camera.far,i.pointShadow[d]=K,i.pointShadowMap[d]=B,i.pointShadowMatrix[d]=D.shadow.matrix,A++}i.point[d]=F,d++}else if(D.isHemisphereLight){const F=e.get(D);F.skyColor.copy(D.color).multiplyScalar(Q),F.groundColor.copy(D.groundColor).multiplyScalar(Q),i.hemi[M]=F,M++}}S>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=p,i.ambient[2]=h;const P=i.hash;(P.sunLength!==m||P.directionalLength!==v||P.pointLength!==d||P.spotLength!==_||P.rectAreaLength!==S||P.hemiLength!==M||P.numSunShadows!==g||P.numDirectionalShadows!==R||P.numPointShadows!==A||P.numSpotShadows!==x||P.numSpotMaps!==w||P.numLightProbes!==C)&&(i.sun.length=m,i.directional.length=v,i.spot.length=_,i.rectArea.length=S,i.point.length=d,i.hemi.length=M,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=y,i.sunShadowCascade.length=y,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.directionalShadowMatrix.length=R,i.pointShadow.length=A,i.pointShadowMap.length=A,i.pointShadowMatrix.length=A,i.spotShadow.length=x,i.spotShadowMap.length=x,i.spotLightMatrix.length=x+w-I,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=C,P.sunLength=m,P.directionalLength=v,P.pointLength=d,P.spotLength=_,P.rectAreaLength=S,P.hemiLength=M,P.numSunShadows=g,P.numDirectionalShadows=R,P.numPointShadows=A,P.numSpotShadows=x,P.numSpotMaps=w,P.numLightProbes=C,i.version=XR++)}function l(c,f){let p=0,h=0,m=0,g=0,y=0,v=0;const d=f.matrixWorldInverse;for(let _=0,S=c.length;_<S;_++){const M=c[_];if(M.isSunLight){const R=i.sun[p];R.direction.setFromMatrixPosition(M.matrixWorld),R.direction.transformDirection(d),p++}else if(M.isDirectionalLight){const R=i.directional[h];R.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(d),h++}else if(M.isSpotLight){const R=i.spot[g];R.position.setFromMatrixPosition(M.matrixWorld),R.position.applyMatrix4(d),R.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(d),g++}else if(M.isRectAreaLight){const R=i.rectArea[y];R.position.setFromMatrixPosition(M.matrixWorld),R.position.applyMatrix4(d),a.identity(),s.copy(M.matrixWorld),s.premultiply(d),a.extractRotation(s),R.halfWidth.set(M.width*.5,0,0),R.halfHeight.set(0,M.height*.5,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),y++}else if(M.isPointLight){const R=i.point[m];R.position.setFromMatrixPosition(M.matrixWorld),R.position.applyMatrix4(d),m++}else if(M.isHemisphereLight){const R=i.hemi[v];R.direction.setFromMatrixPosition(M.matrixWorld),R.direction.transformDirection(d),v++}}}return{setup:o,setupView:l,state:i}}function vg(t){const e=new YR(t),n=[],i=[],r=[];function s(p){f.camera=p,n.length=0,i.length=0,r.length=0}function a(p){p.isLightProbeGrid?r.push(p):n.push(p)}function o(p){i.push(p)}function l(){e.setup(n),r.sort((p,h)=>p.priority-h.priority||p.id-h.id)}function c(p){e.setupView(n,p)}const f={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function qR(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new vg(t),e.set(r,[o])):s>=a.length?(o=new vg(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const KR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ZR=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,JR=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],QR=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],_g=new _t,ha=new W,ku=new W;function eC(t,e,n){let i=new sc;const r=new Je,s=new Je,a=new yt,o=new gT,l=new vT,c={},f=n.maxTextureSize,p={[Gr]:gn,[gn]:Gr,[Ei]:Ei},h=new jr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Je},radius:{value:4}},vertexShader:KR,fragmentShader:ZR}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const g=new Qn;g.setAttribute("position",new Ur(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Wr(g,h),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_l;let d=this.type;this.render=function(A,x,w){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||A.length===0)return;this.type===QM&&(Ie("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=_l);const I=t.getRenderTarget(),C=t.getActiveCubeFace(),P=t.getActiveMipmapLevel(),O=t.state;O.setBlending(Ns),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const X=d!==this.type;X&&x.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach($=>$.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,$=A.length;D<$;D++){const Q=A[D],G=Q.shadow;if(G===void 0){Ie("WebGLShadowMap:",Q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const B=G.getFrameExtents();r.multiply(B),s.copy(G.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/B.x),r.x=s.x*B.x,G.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/B.y),r.y=s.y*B.y,G.mapSize.y=s.y));const F=t.state.buffers.depth.getReversed();if(G.camera._reversedDepth=F,G.map===null||X===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Sa){if(Q.isPointLight){Ie("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new di(r.x,r.y,{format:Hr,type:hi,minFilter:fn,magFilter:fn,generateMipmaps:!1}),G.map.texture.name=Q.name+".shadowMap",G.map.depthTexture=new Hs(r.x,r.y,oi),G.map.depthTexture.name=Q.name+".shadowMapDepth",G.map.depthTexture.format=gr,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Ht,G.map.depthTexture.magFilter=Ht}else Q.isPointLight?(G.map=new Bh(r.x),G.map.depthTexture=new w_(r.x,fi)):(G.map=new di(r.x,r.y),G.map.depthTexture=new Hs(r.x,r.y,fi)),G.map.depthTexture.name=Q.name+".shadowMap",G.map.depthTexture.format=gr,this.type===_l?(G.map.depthTexture.compareFunction=F?p_:h_,G.map.depthTexture.minFilter=fn,G.map.depthTexture.magFilter=fn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Ht,G.map.depthTexture.magFilter=Ht);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==r.x||G.map.height!==r.y)&&G.map.setSize(r.x,r.y);const V=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();Q.isPointLight!==!0&&G.updateMatrices(Q,w);const K=G.camera.layers.mask&4294967294?G.camera.layers:w.layers;for(let de=0;de<V;de++){const be=G.getCamera(de);if(Q.isPointLight){const Z=G.camera,me=G.matrix,ye=Q.distance||Z.far;ye!==Z.far&&(Z.far=ye,Z.updateProjectionMatrix()),ha.setFromMatrixPosition(Q.matrixWorld),Z.position.copy(ha),ku.copy(Z.position),ku.add(JR[de]),Z.up.copy(QR[de]),Z.lookAt(ku),Z.updateMatrixWorld(),me.makeTranslation(-ha.x,-ha.y,-ha.z),_g.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),G._frustum.setFromProjectionMatrix(_g,Z.coordinateSystem,Z.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)t.setRenderTarget(G.map,de),t.clear();else{de===0&&(t.setRenderTarget(G.map),t.clear());const Z=G.getViewport(de);a.set(s.x*Z.x,s.y*Z.y,s.x*Z.z,s.y*Z.w),O.viewport(a)}i=G.getFrustum(de),M(x,w,be,Q,K,this.type)}G.isPointLightShadow!==!0&&this.type===Sa&&_(G,w),G.needsUpdate=!1}d=this.type,v.needsUpdate=!1,t.setRenderTarget(I,C,P)};function _(A,x){const w=e.update(y);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null?A.mapPass=new di(r.x,r.y,{format:Hr,type:hi}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),h.uniforms.shadow_pass.value=A.map.depthTexture,h.uniforms.resolution.value.set(A.map.width,A.map.height),h.uniforms.radius.value=A.radius,t.setRenderTarget(A.mapPass),t.clear(),t.renderBufferDirect(x,null,w,h,y,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value.set(A.map.width,A.map.height),m.uniforms.radius.value=A.radius,t.setRenderTarget(A.map),t.clear(),t.renderBufferDirect(x,null,w,m,y,null)}function S(A,x,w,I){let C=null;const P=w.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)C=P;else if(C=w.isPointLight===!0?l:o,t.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){const O=C.uuid,X=x.uuid;let D=c[O];D===void 0&&(D={},c[O]=D);let $=D[X];$===void 0&&($=C.clone(),D[X]=$,x.addEventListener("dispose",R)),C=$}if(C.visible=x.visible,C.wireframe=x.wireframe,I===Sa?C.side=x.shadowSide!==null?x.shadowSide:x.side:C.side=x.shadowSide!==null?x.shadowSide:p[x.side],C.alphaMap=x.alphaMap,C.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,C.map=x.map,C.clipShadows=x.clipShadows,C.clippingPlanes=x.clippingPlanes,C.clipIntersection=x.clipIntersection,C.displacementMap=x.displacementMap,C.displacementScale=x.displacementScale,C.displacementBias=x.displacementBias,C.wireframeLinewidth=x.wireframeLinewidth,C.linewidth=x.linewidth,w.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const O=t.properties.get(C);O.light=w}return C}function M(A,x,w,I,C,P){if(A.visible===!1)return;if(A.layers.test(C)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&P===Sa)&&(!A.frustumCulled||A.intersectsFrustum(i))){A.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,A.matrixWorld);const D=e.update(A),$=A.material;if(Array.isArray($)){const Q=D.groups;for(let G=0,B=Q.length;G<B;G++){const F=Q[G],V=$[F.materialIndex];if(V&&V.visible){const K=S(A,V,I,P);A.onBeforeShadow(t,A,x,w,D,K,F),t.renderBufferDirect(w,null,D,K,A,F),A.onAfterShadow(t,A,x,w,D,K,F)}}}else if($.visible){const Q=S(A,$,I,P);A.onBeforeShadow(t,A,x,w,D,Q,null),t.renderBufferDirect(w,null,D,Q,A,null),A.onAfterShadow(t,A,x,w,D,Q,null)}}const X=A.children;for(let D=0,$=X.length;D<$;D++)M(X[D],x,w,I,C,P)}function R(A){A.target.removeEventListener("dispose",R);for(const w in c){const I=c[w],C=A.target.uuid;C in I&&(I[C].dispose(),delete I[C])}}}function tC(t,e){function n(){let N=!1;const te=new yt;let q=null;const ue=new yt(0,0,0,0);return{setMask:function(ae){q!==ae&&!N&&(t.colorMask(ae,ae,ae,ae),q=ae)},setLocked:function(ae){N=ae},setClear:function(ae,le,Re,ke,se){se===!0&&(ae*=ke,le*=ke,Re*=ke),te.set(ae,le,Re,ke),ue.equals(te)===!1&&(t.clearColor(ae,le,Re,ke),ue.copy(te))},reset:function(){N=!1,q=null,ue.set(-1,0,0,0)}}}function i(){let N=!1,te=!1,q=null,ue=null,ae=null;return{setReversed:function(le){if(te!==le){const Re=e.get("EXT_clip_control");le?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),te=le;const ke=ae;ae=null,this.setClear(ke)}},getReversed:function(){return te},setTest:function(le){le?xe(t.DEPTH_TEST):Oe(t.DEPTH_TEST)},setMask:function(le){q!==le&&!N&&(t.depthMask(le),q=le)},setFunc:function(le){if(te&&(le=IE[le]),ue!==le){switch(le){case zd:t.depthFunc(t.NEVER);break;case Gd:t.depthFunc(t.ALWAYS);break;case Hd:t.depthFunc(t.LESS);break;case Ja:t.depthFunc(t.LEQUAL);break;case Vd:t.depthFunc(t.EQUAL);break;case Wd:t.depthFunc(t.GEQUAL);break;case jd:t.depthFunc(t.GREATER);break;case Xd:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ue=le}},setLocked:function(le){N=le},setClear:function(le){ae!==le&&(ae=le,te&&(le=1-le),t.clearDepth(le))},reset:function(){N=!1,q=null,ue=null,ae=null,te=!1}}}function r(){let N=!1,te=null,q=null,ue=null,ae=null,le=null,Re=null,ke=null,se=null;return{setTest:function(Ne){N||(Ne?xe(t.STENCIL_TEST):Oe(t.STENCIL_TEST))},setMask:function(Ne){te!==Ne&&!N&&(t.stencilMask(Ne),te=Ne)},setFunc:function(Ne,Be,ve){(q!==Ne||ue!==Be||ae!==ve)&&(t.stencilFunc(Ne,Be,ve),q=Ne,ue=Be,ae=ve)},setOp:function(Ne,Be,ve){(le!==Ne||Re!==Be||ke!==ve)&&(t.stencilOp(Ne,Be,ve),le=Ne,Re=Be,ke=ve)},setLocked:function(Ne){N=Ne},setClear:function(Ne){se!==Ne&&(t.clearStencil(Ne),se=Ne)},reset:function(){N=!1,te=null,q=null,ue=null,ae=null,le=null,Re=null,ke=null,se=null}}}const s=new n,a=new i,o=new r;let l={};const c=new WeakMap;let f={},p={},h={},m=new WeakMap,g=[],y=null,v=!1,d=null,_=null,S=null,M=null,R=null,A=null,x=null,w=new qe(0,0,0),I=0,C=!1,P=null,O=null,X=null,D=null,$=null;const Q=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,B=0;const F=t.getParameter(t.VERSION);F.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(F)[1]),G=B>=1):F.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),G=B>=2);let V=null,K={};const de=t.getParameter(t.SCISSOR_BOX),be=t.getParameter(t.VIEWPORT),Z=new yt().fromArray(de),me=new yt().fromArray(be);function ye(N,te,q,ue){const ae=new Uint8Array(4),le=t.createTexture();t.bindTexture(N,le),t.texParameteri(N,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(N,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Re=0;Re<q;Re++)N===t.TEXTURE_3D||N===t.TEXTURE_2D_ARRAY?t.texImage3D(te,0,t.RGBA,1,1,ue,0,t.RGBA,t.UNSIGNED_BYTE,ae):t.texImage2D(te+Re,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ae);return le}const Ce={};Ce[t.TEXTURE_2D]=ye(t.TEXTURE_2D,t.TEXTURE_2D,1),Ce[t.TEXTURE_CUBE_MAP]=ye(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ce[t.TEXTURE_2D_ARRAY]=ye(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Ce[t.TEXTURE_3D]=ye(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),xe(t.DEPTH_TEST),a.setFunc(Ja),cn(!1),ht(xm),xe(t.CULL_FACE),kt(Ns);function xe(N){f[N]!==!0&&(t.enable(N),f[N]=!0)}function Oe(N){f[N]!==!1&&(t.disable(N),f[N]=!1)}function Et(N,te){return h[N]!==te?(t.bindFramebuffer(N,te),h[N]=te,N===t.DRAW_FRAMEBUFFER&&(h[t.FRAMEBUFFER]=te),N===t.FRAMEBUFFER&&(h[t.DRAW_FRAMEBUFFER]=te),!0):!1}function Le(N,te){let q=g,ue=!1;if(N){q=m.get(te),q===void 0&&(q=[],m.set(te,q));const ae=N.textures;if(q.length!==ae.length||q[0]!==t.COLOR_ATTACHMENT0){for(let le=0,Re=ae.length;le<Re;le++)q[le]=t.COLOR_ATTACHMENT0+le;q.length=ae.length,ue=!0}}else q[0]!==t.BACK&&(q[0]=t.BACK,ue=!0);ue&&t.drawBuffers(q)}function Qe(N){return y!==N?(t.useProgram(N),y=N,!0):!1}const it={[cs]:t.FUNC_ADD,[tE]:t.FUNC_SUBTRACT,[nE]:t.FUNC_REVERSE_SUBTRACT};it[iE]=t.MIN,it[rE]=t.MAX;const He={[sE]:t.ZERO,[aE]:t.ONE,[oE]:t.SRC_COLOR,[q0]:t.SRC_ALPHA,[hE]:t.SRC_ALPHA_SATURATE,[dE]:t.DST_COLOR,[cE]:t.DST_ALPHA,[lE]:t.ONE_MINUS_SRC_COLOR,[K0]:t.ONE_MINUS_SRC_ALPHA,[fE]:t.ONE_MINUS_DST_COLOR,[uE]:t.ONE_MINUS_DST_ALPHA,[pE]:t.CONSTANT_COLOR,[mE]:t.ONE_MINUS_CONSTANT_COLOR,[gE]:t.CONSTANT_ALPHA,[vE]:t.ONE_MINUS_CONSTANT_ALPHA};function kt(N,te,q,ue,ae,le,Re,ke,se,Ne){if(N===Ns){v===!0&&(Oe(t.BLEND),v=!1);return}if(v===!1&&(xe(t.BLEND),v=!0),N!==eE){if(N!==d||Ne!==C){if((_!==cs||R!==cs)&&(t.blendEquation(t.FUNC_ADD),_=cs,R=cs),Ne)switch(N){case La:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Sm:t.blendFunc(t.ONE,t.ONE);break;case ym:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Mm:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:Ze("WebGLState: Invalid blending: ",N);break}else switch(N){case La:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Sm:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case ym:Ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Mm:Ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ze("WebGLState: Invalid blending: ",N);break}S=null,M=null,A=null,x=null,w.set(0,0,0),I=0,d=N,C=Ne}return}ae=ae||te,le=le||q,Re=Re||ue,(te!==_||ae!==R)&&(t.blendEquationSeparate(it[te],it[ae]),_=te,R=ae),(q!==S||ue!==M||le!==A||Re!==x)&&(t.blendFuncSeparate(He[q],He[ue],He[le],He[Re]),S=q,M=ue,A=le,x=Re),(ke.equals(w)===!1||se!==I)&&(t.blendColor(ke.r,ke.g,ke.b,se),w.copy(ke),I=se),d=N,C=!1}function Rt(N,te){N.side===Ei?Oe(t.CULL_FACE):xe(t.CULL_FACE);let q=N.side===gn;te&&(q=!q),cn(q),N.blending===La&&N.transparent===!1?kt(Ns):kt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const ue=N.stencilWrite;o.setTest(ue),ue&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),It(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?xe(t.SAMPLE_ALPHA_TO_COVERAGE):Oe(t.SAMPLE_ALPHA_TO_COVERAGE)}function cn(N){P!==N&&(N?t.frontFace(t.CW):t.frontFace(t.CCW),P=N)}function ht(N){N!==ZM?(xe(t.CULL_FACE),N!==O&&(N===xm?t.cullFace(t.BACK):N===JM?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Oe(t.CULL_FACE),O=N}function ei(N){N!==X&&(G&&t.lineWidth(N),X=N)}function It(N,te,q){N?(xe(t.POLYGON_OFFSET_FILL),(D!==te||$!==q)&&(D=te,$=q,a.getReversed()&&(te=-te,q=-q),t.polygonOffset(te,q))):Oe(t.POLYGON_OFFSET_FILL)}function An(N){N?xe(t.SCISSOR_TEST):Oe(t.SCISSOR_TEST)}function Rn(N){N===void 0&&(N=t.TEXTURE0+Q-1),V!==N&&(t.activeTexture(N),V=N)}function Cn(N,te,q){q===void 0&&(V===null?q=t.TEXTURE0+Q-1:q=V);let ue=K[q];ue===void 0&&(ue={type:void 0,texture:void 0},K[q]=ue),(ue.type!==N||ue.texture!==te)&&(V!==q&&(t.activeTexture(q),V=q),t.bindTexture(N,te||Ce[N]),ue.type=N,ue.texture=te)}function U(){const N=K[V];N!==void 0&&N.type!==void 0&&(t.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function bn(){try{t.compressedTexImage2D(...arguments)}catch(N){Ze("WebGLState:",N)}}function ut(){try{t.compressedTexImage3D(...arguments)}catch(N){Ze("WebGLState:",N)}}function dt(){try{t.texSubImage2D(...arguments)}catch(N){Ze("WebGLState:",N)}}function ge(){try{t.texSubImage3D(...arguments)}catch(N){Ze("WebGLState:",N)}}function Ct(){try{t.compressedTexSubImage2D(...arguments)}catch(N){Ze("WebGLState:",N)}}function Pe(){try{t.compressedTexSubImage3D(...arguments)}catch(N){Ze("WebGLState:",N)}}function De(){try{t.texStorage2D(...arguments)}catch(N){Ze("WebGLState:",N)}}function b(){try{t.texStorage3D(...arguments)}catch(N){Ze("WebGLState:",N)}}function E(){try{t.texImage2D(...arguments)}catch(N){Ze("WebGLState:",N)}}function z(){try{t.texImage3D(...arguments)}catch(N){Ze("WebGLState:",N)}}function ie(N){return p[N]!==void 0?p[N]:t.getParameter(N)}function ne(N,te){p[N]!==te&&(t.pixelStorei(N,te),p[N]=te)}function oe(N){Z.equals(N)===!1&&(t.scissor(N.x,N.y,N.z,N.w),Z.copy(N))}function he(N){me.equals(N)===!1&&(t.viewport(N.x,N.y,N.z,N.w),me.copy(N))}function J(N,te){let q=c.get(te);q===void 0&&(q=new WeakMap,c.set(te,q));let ue=q.get(N);ue===void 0&&(ue=t.getUniformBlockIndex(te,N.name),t.uniformBlockBinding(te,ue,ue),q.set(N,ue))}function ee(N,te,q){const ae=c.get(te).get(N);l[ae]!==q&&(t.bindBufferBase(t.UNIFORM_BUFFER,ae,q),l[ae]=q)}function ce(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),f={},p={},V=null,K={},h={},l={},m=new WeakMap,g=[],y=null,v=!1,d=null,_=null,S=null,M=null,R=null,A=null,x=null,w=new qe(0,0,0),I=0,C=!1,P=null,O=null,X=null,D=null,$=null,Z.set(0,0,t.canvas.width,t.canvas.height),me.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:xe,disable:Oe,bindFramebuffer:Et,drawBuffers:Le,useProgram:Qe,setBlending:kt,setMaterial:Rt,setFlipSided:cn,setCullFace:ht,setLineWidth:ei,setPolygonOffset:It,setScissorTest:An,activeTexture:Rn,bindTexture:Cn,unbindTexture:U,compressedTexImage2D:bn,compressedTexImage3D:ut,texImage2D:E,texImage3D:z,pixelStorei:ne,getParameter:ie,updateUBOMapping:J,uniformBlockBinding:ee,texStorage2D:De,texStorage3D:b,texSubImage2D:dt,texSubImage3D:ge,compressedTexSubImage2D:Ct,compressedTexSubImage3D:Pe,scissor:oe,viewport:he,reset:ce}}function nC(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Je,f=new WeakMap,p=new Set;let h;const m=new WeakMap,g=new Set,y=new FinalizationRegistry(b=>g.delete(b));let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function d(b,E){return v?new OffscreenCanvas(b,E):rc("canvas")}function _(b,E,z){let ie=1;const ne=De(b);if((ne.width>z||ne.height>z)&&(ie=z/Math.max(ne.width,ne.height)),ie<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const oe=Math.floor(ie*ne.width),he=Math.floor(ie*ne.height);h===void 0&&(h=d(oe,he));const J=E?d(oe,he):h;return J.width=oe,J.height=he,J.getContext("2d").drawImage(b,0,0,oe,he),Ie("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+oe+"x"+he+")."),J}else return"data"in b&&Ie("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),b;return b}function S(b){return b.generateMipmaps}function M(b){t.generateMipmap(b)}function R(b){return b.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?t.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function A(b,E,z,ie,ne,oe=!1){if(b!==null){if(t[b]!==void 0)return t[b];Ie("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let he;ie&&(he=e.get("EXT_texture_norm16"),he||Ie("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=E;if(E===t.RED&&(z===t.FLOAT&&(J=t.R32F),z===t.HALF_FLOAT&&(J=t.R16F),z===t.UNSIGNED_BYTE&&(J=t.R8),z===t.UNSIGNED_SHORT&&he&&(J=he.R16_EXT),z===t.SHORT&&he&&(J=he.R16_SNORM_EXT)),E===t.RED_INTEGER&&(z===t.UNSIGNED_BYTE&&(J=t.R8UI),z===t.UNSIGNED_SHORT&&(J=t.R16UI),z===t.UNSIGNED_INT&&(J=t.R32UI),z===t.BYTE&&(J=t.R8I),z===t.SHORT&&(J=t.R16I),z===t.INT&&(J=t.R32I)),E===t.RG&&(z===t.FLOAT&&(J=t.RG32F),z===t.HALF_FLOAT&&(J=t.RG16F),z===t.UNSIGNED_BYTE&&(J=t.RG8),z===t.UNSIGNED_SHORT&&he&&(J=he.RG16_EXT),z===t.SHORT&&he&&(J=he.RG16_SNORM_EXT)),E===t.RG_INTEGER&&(z===t.UNSIGNED_BYTE&&(J=t.RG8UI),z===t.UNSIGNED_SHORT&&(J=t.RG16UI),z===t.UNSIGNED_INT&&(J=t.RG32UI),z===t.BYTE&&(J=t.RG8I),z===t.SHORT&&(J=t.RG16I),z===t.INT&&(J=t.RG32I)),E===t.RGB_INTEGER&&(z===t.UNSIGNED_BYTE&&(J=t.RGB8UI),z===t.UNSIGNED_SHORT&&(J=t.RGB16UI),z===t.UNSIGNED_INT&&(J=t.RGB32UI),z===t.BYTE&&(J=t.RGB8I),z===t.SHORT&&(J=t.RGB16I),z===t.INT&&(J=t.RGB32I)),E===t.RGBA_INTEGER&&(z===t.UNSIGNED_BYTE&&(J=t.RGBA8UI),z===t.UNSIGNED_SHORT&&(J=t.RGBA16UI),z===t.UNSIGNED_INT&&(J=t.RGBA32UI),z===t.BYTE&&(J=t.RGBA8I),z===t.SHORT&&(J=t.RGBA16I),z===t.INT&&(J=t.RGBA32I)),E===t.RGB&&(z===t.UNSIGNED_SHORT&&he&&(J=he.RGB16_EXT),z===t.SHORT&&he&&(J=he.RGB16_SNORM_EXT),z===t.UNSIGNED_INT_5_9_9_9_REV&&(J=t.RGB9_E5),z===t.UNSIGNED_INT_10F_11F_11F_REV&&(J=t.R11F_G11F_B10F)),E===t.RGBA){const ee=oe?nc:je.getTransfer(ne);z===t.FLOAT&&(J=t.RGBA32F),z===t.HALF_FLOAT&&(J=t.RGBA16F),z===t.UNSIGNED_BYTE&&(J=ee===tt?t.SRGB8_ALPHA8:t.RGBA8),z===t.UNSIGNED_SHORT&&he&&(J=he.RGBA16_EXT),z===t.SHORT&&he&&(J=he.RGBA16_SNORM_EXT),z===t.UNSIGNED_SHORT_4_4_4_4&&(J=t.RGBA4),z===t.UNSIGNED_SHORT_5_5_5_1&&(J=t.RGB5_A1)}return(J===t.R16F||J===t.R32F||J===t.RG16F||J===t.RG32F||J===t.RGBA16F||J===t.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function x(b,E){let z;return b?E===null||E===fi||E===Gs?z=t.DEPTH24_STENCIL8:E===oi?z=t.DEPTH32F_STENCIL8:E===eo&&(z=t.DEPTH24_STENCIL8,Ie("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===fi||E===Gs?z=t.DEPTH_COMPONENT24:E===oi?z=t.DEPTH_COMPONENT32F:E===eo&&(z=t.DEPTH_COMPONENT16),z}function w(b,E){return S(b)===!0||b.isFramebufferTexture&&b.minFilter!==Ht&&b.minFilter!==fn?Math.log2(Math.max(E.width,E.height))+1:b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?E.mipmaps.length:1}function I(b){const E=new WeakRef(b);i.get(b).__ref=E,g.add(E),y.register(b,E,E)}function C(b){const E=i.get(b).__ref;E!==void 0&&(g.delete(E),y.unregister(E))}function P(b){X(b.target)}function O(b){D(b.target)}function X(b){b.removeEventListener("dispose",P),C(b),Q(b),b.isVideoTexture&&f.delete(b),b.isHTMLTexture&&p.delete(b)}function D(b){b.removeEventListener("dispose",O),C(b),B(b)}function $(){for(const b of g){const E=b.deref();E!==void 0&&(E.isRenderTarget===!0?D(E):X(E))}g.clear(),p.clear()}function Q(b){const E=i.get(b);if(E.__webglInit===void 0)return;const z=b.source,ie=m.get(z);if(ie){const ne=ie[E.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&G(b),Object.keys(ie).length===0&&m.delete(z)}i.remove(b)}function G(b){const E=i.get(b);t.deleteTexture(E.__webglTexture);const z=b.source,ie=m.get(z);delete ie[E.__cacheKey],a.memory.textures--}function B(b){const E=i.get(b);E.__depthDisposeCallback&&E.__depthDisposeCallback();const z=b.depthTexture;if(z&&z.renderTarget===b&&X(z),b.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(E.__webglFramebuffer[ne]))for(let oe=0;oe<E.__webglFramebuffer[ne].length;oe++)t.deleteFramebuffer(E.__webglFramebuffer[ne][oe]);else t.deleteFramebuffer(E.__webglFramebuffer[ne]);E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer[ne])}else{if(Array.isArray(E.__webglFramebuffer))for(let ne=0;ne<E.__webglFramebuffer.length;ne++)t.deleteFramebuffer(E.__webglFramebuffer[ne]);else t.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&t.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ne=0;ne<E.__webglColorRenderbuffer.length;ne++)E.__webglColorRenderbuffer[ne]&&t.deleteRenderbuffer(E.__webglColorRenderbuffer[ne]);E.__webglDepthRenderbuffer&&t.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const ie=b.textures;for(let ne=0,oe=ie.length;ne<oe;ne++){const he=i.get(ie[ne]);he.__webglTexture&&(t.deleteTexture(he.__webglTexture),a.memory.textures--),i.remove(ie[ne])}i.remove(b)}let F=0;function V(){F=0}function K(){return F}function de(b){F=b}function be(){const b=F;return b>=r.maxTextures&&Ie("WebGLTextures: Trying to use "+(b+1)+" texture units while this GPU supports only "+r.maxTextures),F+=1,b}function Z(b){const E=[];return E.push(b.wrapS),E.push(b.wrapT),E.push(b.wrapR||0),E.push(b.magFilter),E.push(b.minFilter),E.push(b.anisotropy),E.push(b.internalFormat),E.push(b.format),E.push(b.type),E.push(b.generateMipmaps),E.push(b.mipmapsAutoUpdate),E.push(b.premultiplyAlpha),E.push(b.flipY),E.push(b.unpackAlignment),E.push(b.colorSpace),E.join()}function me(b,E){const z=i.get(b);if(b.isVideoTexture&&Ct(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&z.__version!==b.version){const ie=b.image;if(ie===null)Ie("WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)Ie("WebGLRenderer: Texture marked for update but image is incomplete");else{Rt(z,b,E);return}}else b.isExternalTexture&&(z.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,z.__webglTexture,t.TEXTURE0+E)}function ye(b,E){const z=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&z.__version!==b.version){Rt(z,b,E);return}else b.isExternalTexture&&(z.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,z.__webglTexture,t.TEXTURE0+E)}function Ce(b,E){const z=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&z.__version!==b.version){Rt(z,b,E);return}n.bindTexture(t.TEXTURE_3D,z.__webglTexture,t.TEXTURE0+E)}function xe(b,E){const z=i.get(b);if(b.version>0&&z.__version!==b.version){cn(z,b,E);return}n.bindTexture(t.TEXTURE_CUBE_MAP,z.__webglTexture,t.TEXTURE0+E)}const Oe={[$d]:t.REPEAT,[Ai]:t.CLAMP_TO_EDGE,[Yd]:t.MIRRORED_REPEAT},Et={[Ht]:t.NEAREST,[SE]:t.NEAREST_MIPMAP_NEAREST,[Do]:t.NEAREST_MIPMAP_LINEAR,[fn]:t.LINEAR,[hu]:t.LINEAR_MIPMAP_NEAREST,[ir]:t.LINEAR_MIPMAP_LINEAR},Le={[TE]:t.NEVER,[m_]:t.ALWAYS,[wE]:t.LESS,[h_]:t.LEQUAL,[AE]:t.EQUAL,[p_]:t.GEQUAL,[RE]:t.GREATER,[CE]:t.NOTEQUAL};function Qe(b,E){if(E.type===oi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===fn||E.magFilter===hu||E.magFilter===Do||E.magFilter===ir||E.minFilter===fn||E.minFilter===hu||E.minFilter===Do||E.minFilter===ir)&&Ie("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(b,t.TEXTURE_WRAP_S,Oe[E.wrapS]),t.texParameteri(b,t.TEXTURE_WRAP_T,Oe[E.wrapT]),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,Oe[E.wrapR]),t.texParameteri(b,t.TEXTURE_MAG_FILTER,Et[E.magFilter]),t.texParameteri(b,t.TEXTURE_MIN_FILTER,Et[E.minFilter]),E.compareFunction&&(t.texParameteri(b,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(b,t.TEXTURE_COMPARE_FUNC,Le[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Ht||E.minFilter!==Do&&E.minFilter!==ir||E.type===oi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");t.texParameterf(b,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function it(b,E){let z=!1;b.__webglInit===void 0&&(b.__webglInit=!0,E.addEventListener("dispose",P),I(E));const ie=E.source;let ne=m.get(ie);ne===void 0&&(ne={},m.set(ie,ne));const oe=Z(E);if(oe!==b.__cacheKey){ne[oe]===void 0&&(ne[oe]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,z=!0),ne[oe].usedTimes++;const he=ne[b.__cacheKey];he!==void 0&&(ne[b.__cacheKey].usedTimes--,he.usedTimes===0&&G(E)),b.__cacheKey=oe,b.__webglTexture=ne[oe].texture}return z}function He(b,E,z){return Math.floor(Math.floor(b/z)/E)}function kt(b,E,z,ie){const oe=b.updateRanges;if(oe.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,E.width,E.height,z,ie,E.data);else{oe.sort((N,te)=>N.start-te.start);let he=0;for(let N=1;N<oe.length;N++){const te=oe[he],q=oe[N],ue=te.start+te.count,ae=He(q.start,E.width,4),le=He(te.start,E.width,4);q.start<=ue+1&&ae===le&&He(q.start+q.count-1,E.width,4)===ae?te.count=Math.max(te.count,q.start+q.count-te.start):(++he,oe[he]=q)}oe.length=he+1;const J=n.getParameter(t.UNPACK_ROW_LENGTH),ee=n.getParameter(t.UNPACK_SKIP_PIXELS),ce=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,E.width);for(let N=0,te=oe.length;N<te;N++){const q=oe[N],ue=Math.floor(q.start/4),ae=Math.ceil(q.count/4),le=ue%E.width,Re=Math.floor(ue/E.width),ke=ae,se=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,le),n.pixelStorei(t.UNPACK_SKIP_ROWS,Re),n.texSubImage2D(t.TEXTURE_2D,0,le,Re,ke,se,z,ie,E.data)}b.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,J),n.pixelStorei(t.UNPACK_SKIP_PIXELS,ee),n.pixelStorei(t.UNPACK_SKIP_ROWS,ce)}}function Rt(b,E,z){let ie=t.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ie=t.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ie=t.TEXTURE_3D);const ne=it(b,E),oe=E.source;n.bindTexture(ie,b.__webglTexture,t.TEXTURE0+z);const he=i.get(oe);if(oe.version!==he.__version||ne===!0){if(n.activeTexture(t.TEXTURE0+z),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const se=je.getPrimaries(je.workingColorSpace),Ne=E.colorSpace===Ji?null:je.getPrimaries(E.colorSpace),Be=E.colorSpace===Ji||se===Ne?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be)}n.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment);let ee=_(E.image,!1,r.maxTextureSize);ee=Pe(E,ee);const ce=s.convert(E.format,E.colorSpace),N=s.convert(E.type);let te=A(E.internalFormat,ce,N,E.normalized,E.colorSpace,E.isVideoTexture);Qe(ie,E);let q;const ue=E.mipmaps,ae=E.isVideoTexture!==!0,le=he.__version===void 0||ne===!0,Re=oe.dataReady,ke=w(E,ee);if(E.isDepthTexture)te=x(E.format===rr,E.type),le&&(ae?n.texStorage2D(t.TEXTURE_2D,1,te,ee.width,ee.height):n.texImage2D(t.TEXTURE_2D,0,te,ee.width,ee.height,0,ce,N,null));else if(E.isDataTexture)if(ue.length>0){ae&&le&&n.texStorage2D(t.TEXTURE_2D,ke,te,ue[0].width,ue[0].height);for(let se=0,Ne=ue.length;se<Ne;se++)q=ue[se],ae?Re&&n.texSubImage2D(t.TEXTURE_2D,se,0,0,q.width,q.height,ce,N,q.data):n.texImage2D(t.TEXTURE_2D,se,te,q.width,q.height,0,ce,N,q.data);E.generateMipmaps=!1}else ae?(le&&n.texStorage2D(t.TEXTURE_2D,ke,te,ee.width,ee.height),Re&&kt(E,ee,ce,N)):n.texImage2D(t.TEXTURE_2D,0,te,ee.width,ee.height,0,ce,N,ee.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){ae&&le&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ke,te,ue[0].width,ue[0].height,ee.depth);for(let se=0,Ne=ue.length;se<Ne;se++)if(q=ue[se],E.format!==li)if(ce!==null)if(ae){if(Re)if(E.layerUpdates.size>0){const Be=Zm(q.width,q.height,E.format,E.type);for(const ve of E.layerUpdates){const et=q.data.subarray(ve*Be/q.data.BYTES_PER_ELEMENT,(ve+1)*Be/q.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,se,0,0,ve,q.width,q.height,1,ce,et)}}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,se,0,0,0,q.width,q.height,ee.depth,ce,q.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,se,te,q.width,q.height,ee.depth,0,q.data,0,0);else Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ae?Re&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,se,0,0,0,q.width,q.height,ee.depth,ce,N,q.data):n.texImage3D(t.TEXTURE_2D_ARRAY,se,te,q.width,q.height,ee.depth,0,ce,N,q.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{ae&&le&&n.texStorage2D(t.TEXTURE_2D,ke,te,ue[0].width,ue[0].height);for(let se=0,Ne=ue.length;se<Ne;se++)q=ue[se],E.format!==li?ce!==null?ae?Re&&n.compressedTexSubImage2D(t.TEXTURE_2D,se,0,0,q.width,q.height,ce,q.data):n.compressedTexImage2D(t.TEXTURE_2D,se,te,q.width,q.height,0,q.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?Re&&n.texSubImage2D(t.TEXTURE_2D,se,0,0,q.width,q.height,ce,N,q.data):n.texImage2D(t.TEXTURE_2D,se,te,q.width,q.height,0,ce,N,q.data)}else if(E.isDataArrayTexture)if(ae){if(le&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ke,te,ee.width,ee.height,ee.depth),Re)if(E.layerUpdates.size>0){const se=Zm(ee.width,ee.height,E.format,E.type);for(const Ne of E.layerUpdates){const Be=ee.data.subarray(Ne*se/ee.data.BYTES_PER_ELEMENT,(Ne+1)*se/ee.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Ne,ee.width,ee.height,1,ce,N,Be)}E.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,ce,N,ee.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,te,ee.width,ee.height,ee.depth,0,ce,N,ee.data);else if(E.isData3DTexture)ae?(le&&n.texStorage3D(t.TEXTURE_3D,ke,te,ee.width,ee.height,ee.depth),Re&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,ce,N,ee.data)):n.texImage3D(t.TEXTURE_3D,0,te,ee.width,ee.height,ee.depth,0,ce,N,ee.data);else if(E.isFramebufferTexture){if(le)if(ae)n.texStorage2D(t.TEXTURE_2D,ke,te,ee.width,ee.height);else{let se=ee.width,Ne=ee.height;for(let Be=0;Be<ke;Be++)n.texImage2D(t.TEXTURE_2D,Be,te,se,Ne,0,ce,N,null),se>>=1,Ne>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in t){const se=t.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),ee.parentNode!==se){se.appendChild(ee),p.add(E),se.onpaint=Ne=>{const Be=Ne.changedElements;for(const ve of p)Be.includes(ve.image)&&(ve.needsUpdate=!0)},se.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,ee);else{const Be=t.RGBA,ve=t.RGBA,et=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,Be,ve,et,ee)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(ue.length>0){if(ae&&le){const se=De(ue[0]);n.texStorage2D(t.TEXTURE_2D,ke,te,se.width,se.height)}for(let se=0,Ne=ue.length;se<Ne;se++)q=ue[se],ae?Re&&n.texSubImage2D(t.TEXTURE_2D,se,0,0,ce,N,q):n.texImage2D(t.TEXTURE_2D,se,te,ce,N,q);E.generateMipmaps=!1}else if(ae){if(le){const se=De(ee);n.texStorage2D(t.TEXTURE_2D,ke,te,se.width,se.height)}Re&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ce,N,ee)}else n.texImage2D(t.TEXTURE_2D,0,te,ce,N,ee);S(E)&&E.mipmapsAutoUpdate===!0&&M(ie),he.__version=oe.version,E.onUpdate&&E.onUpdate(E)}b.__version=E.version}function cn(b,E,z){if(E.image.length!==6)return;const ie=it(b,E),ne=E.source;n.bindTexture(t.TEXTURE_CUBE_MAP,b.__webglTexture,t.TEXTURE0+z);const oe=i.get(ne);if(ne.version!==oe.__version||ie===!0){n.activeTexture(t.TEXTURE0+z);const he=je.getPrimaries(je.workingColorSpace),J=E.colorSpace===Ji?null:je.getPrimaries(E.colorSpace),ee=E.colorSpace===Ji||he===J?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);const ce=E.isCompressedTexture||E.image[0].isCompressedTexture,N=E.image[0]&&E.image[0].isDataTexture,te=[];for(let ve=0;ve<6;ve++)!ce&&!N?te[ve]=_(E.image[ve],!0,r.maxCubemapSize):te[ve]=N?E.image[ve].image:E.image[ve],te[ve]=Pe(E,te[ve]);const q=te[0],ue=s.convert(E.format,E.colorSpace),ae=s.convert(E.type);let le=A(E.internalFormat,ue,ae,E.normalized,E.colorSpace);const Re=E.isVideoTexture!==!0,ke=oe.__version===void 0||ie===!0,se=ne.dataReady;let Ne=w(E,q);Qe(t.TEXTURE_CUBE_MAP,E);let Be;if(E.isDepthTexture){if(le=x(E.format===rr,E.type),ke)if(Re)n.texStorage2D(t.TEXTURE_CUBE_MAP,1,le,q.width,q.height);else for(let ve=0;ve<6;ve++)n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,le,q.width,q.height,0,ue,ae,null)}else if(ce){Re&&ke&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Ne,le,q.width,q.height);for(let ve=0;ve<6;ve++){Be=te[ve].mipmaps;for(let et=0;et<Be.length;et++){const Dt=Be[et];E.format!==li?ue!==null?Re?se&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,et,0,0,Dt.width,Dt.height,ue,Dt.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,et,le,Dt.width,Dt.height,0,Dt.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Re?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,et,0,0,Dt.width,Dt.height,ue,ae,Dt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,et,le,Dt.width,Dt.height,0,ue,ae,Dt.data)}}}else{if(Be=E.mipmaps,Re&&ke){Be.length>0&&Ne++;const ve=De(te[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Ne,le,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(N){Re?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,te[ve].width,te[ve].height,ue,ae,te[ve].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,le,te[ve].width,te[ve].height,0,ue,ae,te[ve].data);for(let et=0;et<Be.length;et++){const Bi=Be[et].image[ve].image;Re?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,et+1,0,0,Bi.width,Bi.height,ue,ae,Bi.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,et+1,le,Bi.width,Bi.height,0,ue,ae,Bi.data)}}else{Re?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,ue,ae,te[ve]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,le,ue,ae,te[ve]);for(let et=0;et<Be.length;et++){const Dt=Be[et];Re?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,et+1,0,0,ue,ae,Dt.image[ve]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,et+1,le,ue,ae,Dt.image[ve])}}}S(E)&&E.mipmapsAutoUpdate===!0&&M(t.TEXTURE_CUBE_MAP),oe.__version=ne.version,E.onUpdate&&E.onUpdate(E)}b.__version=E.version}function ht(b,E,z,ie,ne,oe){const he=s.convert(z.format,z.colorSpace),J=s.convert(z.type),ee=A(z.internalFormat,he,J,z.normalized,z.colorSpace),ce=i.get(E),N=i.get(z);if(N.__renderTarget=E,!ce.__hasExternalTextures){const te=Math.max(1,E.width>>oe),q=Math.max(1,E.height>>oe);ne===t.TEXTURE_3D||ne===t.TEXTURE_2D_ARRAY?n.texImage3D(ne,oe,ee,te,q,E.depth,0,he,J,null):n.texImage2D(ne,oe,ee,te,q,0,he,J,null)}n.bindFramebuffer(t.FRAMEBUFFER,b),ge(E)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ie,ne,N.__webglTexture,0,dt(E)):(ne===t.TEXTURE_2D||ne>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,ie,ne,N.__webglTexture,oe),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ei(b,E,z){if(t.bindRenderbuffer(t.RENDERBUFFER,b),E.depthBuffer){const ie=E.depthTexture,ne=ie&&ie.isDepthTexture?ie.type:null,oe=x(E.stencilBuffer,ne),he=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;ge(E)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,dt(E),oe,E.width,E.height):z?t.renderbufferStorageMultisample(t.RENDERBUFFER,dt(E),oe,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,oe,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,he,t.RENDERBUFFER,b)}else{const ie=E.textures;for(let ne=0;ne<ie.length;ne++){const oe=ie[ne],he=s.convert(oe.format,oe.colorSpace),J=s.convert(oe.type),ee=A(oe.internalFormat,he,J,oe.normalized,oe.colorSpace);ge(E)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,dt(E),ee,E.width,E.height):z?t.renderbufferStorageMultisample(t.RENDERBUFFER,dt(E),ee,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,ee,E.width,E.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function It(b,E,z){const ie=E.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,b),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ne=i.get(E.depthTexture);ne.__renderTarget=E;const oe=ie?E.depthTexture.image[0]:E.depthTexture.image;(!ne.__webglTexture||oe.width!==E.width||oe.height!==E.height)&&(oe.width=E.width,oe.height=E.height,E.depthTexture.needsUpdate=!0),ie?xe(E.depthTexture,0):me(E.depthTexture,0);const he=ne.__webglTexture,J=dt(E),ee=ie?t.TEXTURE_CUBE_MAP_POSITIVE_X+z:t.TEXTURE_2D,ce=E.depthTexture.format===rr?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(E.depthTexture.format===gr)ge(E)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ce,ee,he,0,J):t.framebufferTexture2D(t.FRAMEBUFFER,ce,ee,he,0);else if(E.depthTexture.format===rr)ge(E)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ce,ee,he,0,J):t.framebufferTexture2D(t.FRAMEBUFFER,ce,ee,he,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function An(b){const E=i.get(b),z=b.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==b.depthTexture){const ie=b.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ie){const ne=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ie.removeEventListener("dispose",ne)};ie.addEventListener("dispose",ne),E.__depthDisposeCallback=ne}E.__boundDepthTexture=ie}if(b.depthTexture&&!E.__autoAllocateDepthBuffer)if(z)for(let ie=0;ie<6;ie++)It(E.__webglFramebuffer[ie],b,ie);else b.texture.mipmaps.length>0?It(E.__webglFramebuffer[0],b,0):It(E.__webglFramebuffer,b,0);else if(z){E.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)if(n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer[ie]),E.__webglDepthbuffer[ie]===void 0)E.__webglDepthbuffer[ie]=t.createRenderbuffer(),ei(E.__webglDepthbuffer[ie],b,!1);else{const ne=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,oe=E.__webglDepthbuffer[ie];t.bindRenderbuffer(t.RENDERBUFFER,oe),t.framebufferRenderbuffer(t.FRAMEBUFFER,ne,t.RENDERBUFFER,oe)}}else if(b.texture.mipmaps.length>0?n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=t.createRenderbuffer(),ei(E.__webglDepthbuffer,b,!1);else{const ne=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,oe=E.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,oe),t.framebufferRenderbuffer(t.FRAMEBUFFER,ne,t.RENDERBUFFER,oe)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Rn(b,E,z){const ie=i.get(b);E!==void 0&&ht(ie.__webglFramebuffer,b,b.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),z!==void 0&&An(b)}function Cn(b){const E=b.texture,z=i.get(b),ie=i.get(E);b.addEventListener("dispose",O),I(b);const ne=b.textures,oe=b.isWebGLCubeRenderTarget===!0,he=ne.length>1;if(he||(ie.__webglTexture===void 0&&(ie.__webglTexture=t.createTexture()),ie.__version=E.version,a.memory.textures++),oe){z.__webglFramebuffer=[];for(let J=0;J<6;J++)if(E.mipmaps.length>0){z.__webglFramebuffer[J]=[];for(let ee=0;ee<E.mipmaps.length;ee++)z.__webglFramebuffer[J][ee]=t.createFramebuffer()}else z.__webglFramebuffer[J]=t.createFramebuffer()}else{if(E.mipmaps.length>0){z.__webglFramebuffer=[];for(let J=0;J<E.mipmaps.length;J++)z.__webglFramebuffer[J]=t.createFramebuffer()}else z.__webglFramebuffer=t.createFramebuffer();if(he)for(let J=0,ee=ne.length;J<ee;J++){const ce=i.get(ne[J]);ce.__webglTexture===void 0&&(ce.__webglTexture=t.createTexture(),a.memory.textures++)}if(b.samples>0&&ge(b)===!1){z.__webglMultisampledFramebuffer=t.createFramebuffer(),z.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let J=0;J<ne.length;J++){const ee=ne[J];z.__webglColorRenderbuffer[J]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,z.__webglColorRenderbuffer[J]);const ce=s.convert(ee.format,ee.colorSpace),N=s.convert(ee.type),te=A(ee.internalFormat,ce,N,ee.normalized,ee.colorSpace,b.isXRRenderTarget===!0),q=dt(b);t.renderbufferStorageMultisample(t.RENDERBUFFER,q,te,b.width,b.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+J,t.RENDERBUFFER,z.__webglColorRenderbuffer[J])}t.bindRenderbuffer(t.RENDERBUFFER,null),b.depthBuffer&&(z.__webglDepthRenderbuffer=t.createRenderbuffer(),ei(z.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(oe){n.bindTexture(t.TEXTURE_CUBE_MAP,ie.__webglTexture),Qe(t.TEXTURE_CUBE_MAP,E);for(let J=0;J<6;J++)if(E.mipmaps.length>0)for(let ee=0;ee<E.mipmaps.length;ee++)ht(z.__webglFramebuffer[J][ee],b,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ee);else ht(z.__webglFramebuffer[J],b,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);S(E)?M(t.TEXTURE_CUBE_MAP):E.mipmaps.length>0&&t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),n.unbindTexture()}else if(he){for(let J=0,ee=ne.length;J<ee;J++){const ce=ne[J],N=i.get(ce);let te=t.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(te=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(te,N.__webglTexture),Qe(te,ce),ht(z.__webglFramebuffer,b,ce,t.COLOR_ATTACHMENT0+J,te,0),S(ce)&&M(te)}n.unbindTexture()}else{let J=t.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(J=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(J,ie.__webglTexture),Qe(J,E),E.mipmaps.length>0)for(let ee=0;ee<E.mipmaps.length;ee++)ht(z.__webglFramebuffer[ee],b,E,t.COLOR_ATTACHMENT0,J,ee);else ht(z.__webglFramebuffer,b,E,t.COLOR_ATTACHMENT0,J,0);S(E)?M(J):E.mipmaps.length>0&&t.texParameteri(J,t.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),n.unbindTexture()}b.depthBuffer&&An(b)}function U(b){const E=b.textures;for(let z=0,ie=E.length;z<ie;z++){const ne=E[z];if(S(ne)&&ne.mipmapsAutoUpdate===!0){const oe=R(b),he=i.get(ne).__webglTexture;n.bindTexture(oe,he),M(oe),n.unbindTexture()}}}const bn=[];function ut(b){if(b.samples>0){if(ge(b)===!1){const E=b.textures,z=b.width,ie=b.height;let ne=t.COLOR_BUFFER_BIT;const oe=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,he=i.get(b),J=E.length>1;if(J)for(let ce=0;ce<E.length;ce++)n.bindFramebuffer(t.FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ce,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,he.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ce,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer),b.texture.mipmaps.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,he.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let ce=0;ce<E.length;ce++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(ne|=t.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(ne|=t.STENCIL_BUFFER_BIT)),J){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,he.__webglColorRenderbuffer[ce]);const N=i.get(E[ce]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,N,0)}t.blitFramebuffer(0,0,z,ie,0,0,z,ie,ne,t.NEAREST),l===!0&&(bn.length=0,bn.push(t.COLOR_ATTACHMENT0+ce),b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&bn.push(oe),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,bn))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),J)for(let ce=0;ce<E.length;ce++){n.bindFramebuffer(t.FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ce,t.RENDERBUFFER,he.__webglColorRenderbuffer[ce]);const N=i.get(E[ce]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,he.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ce,t.TEXTURE_2D,N,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&l){const E=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[E])}}}function dt(b){return Math.min(r.maxSamples,b.samples)}function ge(b){const E=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ct(b){const E=a.render.frame;f.get(b)!==E&&(f.set(b,E),b.update())}function Pe(b,E){const z=b.colorSpace,ie=b.format,ne=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||z!==tc&&z!==Ji&&(je.getTransfer(z)===tt?(ie!==li||ne!==Dn)&&Ie("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ze("WebGLTextures: Unsupported texture color space:",z)),E}function De(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=be,this.resetTextureUnits=V,this.getTextureUnits=K,this.setTextureUnits=de,this.setTexture2D=me,this.setTexture2DArray=ye,this.setTexture3D=Ce,this.setTextureCube=xe,this.rebindTextures=Rn,this.setupRenderTarget=Cn,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=ut,this.setupDepthRenderbuffer=An,this.setupFrameBufferTexture=ht,this.useMultisampledRTT=ge,this.dispose=$}function iC(t,e){function n(i,r=Ji){let s;const a=je.getTransfer(r);if(i===Dn)return t.UNSIGNED_BYTE;if(i===bh)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Nh)return t.UNSIGNED_SHORT_5_5_5_1;if(i===l_)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===c_)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===a_)return t.BYTE;if(i===o_)return t.SHORT;if(i===eo)return t.UNSIGNED_SHORT;if(i===Ch)return t.INT;if(i===fi)return t.UNSIGNED_INT;if(i===oi)return t.FLOAT;if(i===hi)return t.HALF_FLOAT;if(i===u_)return t.ALPHA;if(i===d_)return t.RGB;if(i===li)return t.RGBA;if(i===gr)return t.DEPTH_COMPONENT;if(i===rr)return t.DEPTH_STENCIL;if(i===f_)return t.RED;if(i===Ph)return t.RED_INTEGER;if(i===Hr)return t.RG;if(i===Lh)return t.RG_INTEGER;if(i===Ih)return t.RGBA_INTEGER;if(i===xl||i===Sl||i===yl||i===Ml)if(a===tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===xl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===yl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ml)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===xl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Sl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===yl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ml)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===qd||i===Kd||i===Zd||i===Jd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===qd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Kd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Zd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Jd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Qd||i===ef||i===tf||i===nf||i===rf||i===Ql||i===sf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Qd||i===ef)return a===tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===tf)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===nf)return s.COMPRESSED_R11_EAC;if(i===rf)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Ql)return s.COMPRESSED_RG11_EAC;if(i===sf)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===af||i===of||i===lf||i===cf||i===uf||i===df||i===ff||i===hf||i===pf||i===mf||i===gf||i===vf||i===_f||i===xf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===af)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===of)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===lf)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===cf)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===uf)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===df)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ff)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===hf)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===pf)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===mf)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===gf)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===vf)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===_f)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===xf)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Sf||i===yf||i===Mf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Sf)return a===tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===yf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Mf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ef||i===Tf||i===ec||i===wf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ef)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Tf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ec)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===wf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Gs?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const rC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class aC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new A_(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new jr({vertexShader:rC,fragmentShader:sC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Wr(new Lc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class oC extends qr{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,f=null,p=null,h=null,m=null,g=null;const y=typeof XRWebGLBinding<"u",v=new aC,d={},_=n.getContextAttributes();let S=null,M=null;const R=[],A=[],x=new Je;let w=null,I=null;const C=new $n;C.viewport=new yt;const P=new $n;P.viewport=new yt;const O=[C,P],X=new xT;let D=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let me=R[Z];return me===void 0&&(me=new Mu,R[Z]=me),me.getTargetRaySpace()},this.getControllerGrip=function(Z){let me=R[Z];return me===void 0&&(me=new Mu,R[Z]=me),me.getGripSpace()},this.getHand=function(Z){let me=R[Z];return me===void 0&&(me=new Mu,R[Z]=me),me.getHandSpace()};function Q(Z){const me=A.indexOf(Z.inputSource);if(me===-1)return;const ye=R[me];ye!==void 0&&(ye.update(Z.inputSource,Z.frame,c||a),ye.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){r.removeEventListener("select",Q),r.removeEventListener("selectstart",Q),r.removeEventListener("selectend",Q),r.removeEventListener("squeeze",Q),r.removeEventListener("squeezestart",Q),r.removeEventListener("squeezeend",Q),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",B);for(let Z=0;Z<R.length;Z++){const me=A[Z];me!==null&&(A[Z]=null,R[Z].disconnect(me))}D=null,$=null,v.reset();for(const Z in d)delete d[Z];if(e.setRenderTarget(S),m=null,h=null,p=null,r=null,M=null,be.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(x.width,x.height,!1),I!==null){const Z=I.camera;Z.fov=I.fov,Z.zoom=I.zoom,Z.updateProjectionMatrix(),I=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,i.isPresenting===!0&&Ie("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&Ie("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return p===null&&y&&(p=new XRWebGLBinding(r,n)),p},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",Q),r.addEventListener("selectstart",Q),r.addEventListener("selectend",Q),r.addEventListener("squeeze",Q),r.addEventListener("squeezestart",Q),r.addEventListener("squeezeend",Q),r.addEventListener("end",G),r.addEventListener("inputsourceschange",B),_.xrCompatible!==!0&&await n.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(x),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,Ce=null,xe=null;_.depth&&(xe=_.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ye=_.stencil?rr:gr,Ce=_.stencil?Gs:fi);const Oe={colorFormat:n.RGBA8,depthFormat:xe,scaleFactor:s};p=this.getBinding(),h=p.createProjectionLayer(Oe),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new di(h.textureWidth,h.textureHeight,{format:li,type:Dn,depthTexture:new Hs(h.textureWidth,h.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const ye={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,ye),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),M=new di(m.framebufferWidth,m.framebufferHeight,{format:li,type:Dn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),be.setContext(r),be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function B(Z){for(let me=0;me<Z.removed.length;me++){const ye=Z.removed[me],Ce=A.indexOf(ye);Ce>=0&&(A[Ce]=null,R[Ce].disconnect(ye))}for(let me=0;me<Z.added.length;me++){const ye=Z.added[me];let Ce=A.indexOf(ye);if(Ce===-1){for(let Oe=0;Oe<R.length;Oe++)if(Oe>=A.length){A.push(ye),Ce=Oe;break}else if(A[Oe]===null){A[Oe]=ye,Ce=Oe;break}if(Ce===-1)break}const xe=R[Ce];xe&&xe.connect(ye)}}function F(Z,me){me===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(me.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;let me=Z.near,ye=Z.far;v.texture!==null&&(v.depthNear>0&&(me=v.depthNear),v.depthFar>0&&(ye=v.depthFar)),X.near=P.near=C.near=me,X.far=P.far=C.far=ye,(D!==X.near||$!==X.far)&&(r.updateRenderState({depthNear:X.near,depthFar:X.far}),D=X.near,$=X.far),X.layers.mask=Z.layers.mask|6,C.layers.mask=X.layers.mask&-5,P.layers.mask=X.layers.mask&-3;const Ce=Z.parent,xe=X.cameras;F(X,Ce);for(let Oe=0;Oe<xe.length;Oe++)F(xe[Oe],Ce);X.projectionMatrix.copy(C.projectionMatrix),X.projectionMatrixInverse.copy(C.projectionMatrixInverse),I===null&&Z.isPerspectiveCamera&&(I={camera:Z,fov:Z.fov,zoom:Z.zoom}),V(Z,X,Ce)};function V(Z,me,ye){ye===null?Z.matrix.copy(me.matrixWorld):(Z.matrix.copy(ye.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(me.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(me.projectionMatrix),Z.projectionMatrixInverse.copy(me.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Af*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(Z){l=Z,h!==null&&(h.fixedFoveation=Z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Z)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(X)},this.getCameraTexture=function(Z){return d[Z]};let K=null;function de(Z,me){if(f=me.getViewerPose(c||a),g=me,f!==null){const ye=f.views;m!==null&&(e.setRenderTargetFramebuffer(M,m.framebuffer),e.setRenderTarget(M));let Ce=!1;ye.length!==X.cameras.length&&(X.cameras.length=0,Ce=!0);for(let Le=0;Le<ye.length;Le++){const Qe=ye[Le];let it=null;if(m!==null)it=m.getViewport(Qe);else{const kt=p.getViewSubImage(h,Qe);it=kt.viewport,Le===0&&(e.setRenderTargetTextures(M,kt.colorTexture,kt.depthStencilTexture),e.setRenderTarget(M))}let He=O[Le];He===void 0&&(He=new $n,He.layers.enable(Le),He.viewport=new yt,O[Le]=He),He.matrix.fromArray(Qe.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(Qe.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(it.x,it.y,it.width,it.height),Le===0&&(X.matrix.copy(He.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),Ce===!0&&X.cameras.push(He)}const xe=r.enabledFeatures;if(xe&&xe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){p=i.getBinding();const Le=p.getDepthInformation(ye[0]);Le&&Le.isValid&&Le.texture&&v.init(Le,r.renderState)}if(xe&&xe.includes("camera-access")&&y){e.state.unbindTexture(),p=i.getBinding();for(let Le=0;Le<ye.length;Le++){const Qe=ye[Le].camera;if(Qe){let it=d[Qe];it||(it=new A_,d[Qe]=it);const He=p.getCameraImage(Qe);it.sourceTexture=He}}}}for(let ye=0;ye<R.length;ye++){const Ce=A[ye],xe=R[ye];Ce!==null&&xe!==void 0&&xe.update(Ce,me,c||a)}K&&K(Z,me),me.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:me}),g=null}const be=new b_;be.setAnimationLoop(de),this.setAnimationLoop=function(Z){K=Z},this.dispose=function(){}}}const lC=new _t,k_=new Ue;k_.set(-1,0,0,0,1,0,0,0,1);function cC(t,e){function n(v,d){v.matrixAutoUpdate===!0&&v.updateMatrix(),d.value.copy(v.matrix)}function i(v,d){d.color.getRGB(v.fogColor.value,R_(t)),d.isFog?(v.fogNear.value=d.near,v.fogFar.value=d.far):d.isFogExp2&&(v.fogDensity.value=d.density)}function r(v,d,_,S,M){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?s(v,d):d.isMeshLambertMaterial?(s(v,d),d.envMap&&(v.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(s(v,d),p(v,d)):d.isMeshPhongMaterial?(s(v,d),f(v,d),d.envMap&&(v.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(s(v,d),h(v,d),d.isMeshPhysicalMaterial&&m(v,d,M)):d.isMeshMatcapMaterial?(s(v,d),g(v,d)):d.isMeshDepthMaterial?s(v,d):d.isMeshDistanceMaterial?(s(v,d),y(v,d)):d.isMeshNormalMaterial?s(v,d):d.isLineBasicMaterial?(a(v,d),d.isLineDashedMaterial&&o(v,d)):d.isPointsMaterial?l(v,d,_,S):d.isSpriteMaterial?c(v,d):d.isShadowMaterial?(v.color.value.copy(d.color),v.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(v,d){v.opacity.value=d.opacity,d.color&&v.diffuse.value.copy(d.color),d.emissive&&v.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(v.map.value=d.map,n(d.map,v.mapTransform)),d.alphaMap&&(v.alphaMap.value=d.alphaMap,n(d.alphaMap,v.alphaMapTransform)),d.bumpMap&&(v.bumpMap.value=d.bumpMap,n(d.bumpMap,v.bumpMapTransform),v.bumpScale.value=d.bumpScale,d.side===gn&&(v.bumpScale.value*=-1)),d.normalMap&&(v.normalMap.value=d.normalMap,n(d.normalMap,v.normalMapTransform),v.normalScale.value.copy(d.normalScale),d.side===gn&&v.normalScale.value.negate()),d.displacementMap&&(v.displacementMap.value=d.displacementMap,n(d.displacementMap,v.displacementMapTransform),v.displacementScale.value=d.displacementScale,v.displacementBias.value=d.displacementBias),d.emissiveMap&&(v.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,v.emissiveMapTransform)),d.specularMap&&(v.specularMap.value=d.specularMap,n(d.specularMap,v.specularMapTransform)),d.alphaTest>0&&(v.alphaTest.value=d.alphaTest);const _=e.get(d),S=_.envMap,M=_.envMapRotation;S&&(v.envMap.value=S,v.envMapRotation.value.setFromMatrix4(lC.makeRotationFromEuler(M)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&v.envMapRotation.value.premultiply(k_),v.reflectivity.value=d.reflectivity,v.ior.value=d.ior,v.refractionRatio.value=d.refractionRatio),d.lightMap&&(v.lightMap.value=d.lightMap,v.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,v.lightMapTransform)),d.aoMap&&(v.aoMap.value=d.aoMap,v.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,v.aoMapTransform))}function a(v,d){v.diffuse.value.copy(d.color),v.opacity.value=d.opacity,d.map&&(v.map.value=d.map,n(d.map,v.mapTransform))}function o(v,d){v.dashSize.value=d.dashSize,v.totalSize.value=d.dashSize+d.gapSize,v.scale.value=d.scale}function l(v,d,_,S){v.diffuse.value.copy(d.color),v.opacity.value=d.opacity,v.size.value=d.size*_,v.scale.value=S*.5,d.map&&(v.map.value=d.map,n(d.map,v.uvTransform)),d.alphaMap&&(v.alphaMap.value=d.alphaMap,n(d.alphaMap,v.alphaMapTransform)),d.alphaTest>0&&(v.alphaTest.value=d.alphaTest)}function c(v,d){v.diffuse.value.copy(d.color),v.opacity.value=d.opacity,v.rotation.value=d.rotation,d.map&&(v.map.value=d.map,n(d.map,v.mapTransform)),d.alphaMap&&(v.alphaMap.value=d.alphaMap,n(d.alphaMap,v.alphaMapTransform)),d.alphaTest>0&&(v.alphaTest.value=d.alphaTest)}function f(v,d){v.specular.value.copy(d.specular),v.shininess.value=Math.max(d.shininess,1e-4)}function p(v,d){d.gradientMap&&(v.gradientMap.value=d.gradientMap)}function h(v,d){v.metalness.value=d.metalness,d.metalnessMap&&(v.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,v.metalnessMapTransform)),v.roughness.value=d.roughness,d.roughnessMap&&(v.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,v.roughnessMapTransform)),d.envMap&&(v.envMapIntensity.value=d.envMapIntensity)}function m(v,d,_){v.ior.value=d.ior,d.diffuseRoughness>0&&(v.diffuseRoughness.value=d.diffuseRoughness,d.diffuseRoughnessMap&&(v.diffuseRoughnessMap.value=d.diffuseRoughnessMap,n(d.diffuseRoughnessMap,v.diffuseRoughnessMapTransform))),d.sheen>0&&(v.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),v.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(v.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,v.sheenColorMapTransform)),d.sheenRoughnessMap&&(v.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,v.sheenRoughnessMapTransform))),d.clearcoat>0&&(v.clearcoat.value=d.clearcoat,v.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(v.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,v.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(v.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===gn&&v.clearcoatNormalScale.value.negate())),d.dispersion>0&&(v.dispersion.value=d.dispersion),d.retroreflectivity>0&&(v.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(v.iridescence.value=d.iridescence,v.iridescenceIOR.value=d.iridescenceIOR,v.iridescenceThicknessMinimum.value=d.iridescenceThicknessMinimum,v.iridescenceThicknessMaximum.value=d.iridescenceThicknessMaximum,d.iridescenceMap&&(v.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,v.iridescenceMapTransform)),d.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),d.transmission>0&&(v.transmission.value=d.transmission,v.transmissionSamplerMap.value=_.texture,v.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(v.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,v.transmissionMapTransform)),v.thickness.value=d.thickness,d.thicknessMap&&(v.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=d.attenuationDistance,v.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(v.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(v.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=d.specularIntensity,v.specularColor.value.copy(d.specularColor),d.specularColorMap&&(v.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,v.specularColorMapTransform)),d.specularIntensityMap&&(v.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,v.specularIntensityMapTransform))}function g(v,d){d.matcap&&(v.matcap.value=d.matcap)}function y(v,d){const _=e.get(d).light;v.referencePosition.value.setFromMatrixPosition(_.matrixWorld),v.nearDistance.value=_.shadow.camera.near,v.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function uC(t,e,n,i){let r={},s={};function a(_,S){const M=S.program;i.uniformBlockBinding(_,M,r[_.id])}function o(_,S){let M=r[_.id];M===void 0&&(g(_),M=l(_),r[_.id]=M,_.addEventListener("dispose",v));const R=S.program;i.updateUBOMapping(_,R);const A=e.render.frame;s[_.id]!==A&&(c(_),s[_.id]=A)}function l(_){const S=t.createBuffer(),M=_.__size,R=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,S),t.bufferData(t.UNIFORM_BUFFER,M,R),t.bindBuffer(t.UNIFORM_BUFFER,null),S}function c(_){const S=r[_.id],M=_.uniforms,R=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,S);for(let A=0,x=M.length;A<x;A++){const w=M[A];if(Array.isArray(w))for(let I=0,C=w.length;I<C;I++)f(w[I],A,I,R);else f(w,A,0,R)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function f(_,S,M,R){if(h(_,S,M,R)===!0){const A=_.__offset,x=_.value;if(Array.isArray(x)){let w=0;for(let I=0;I<x.length;I++){const C=x[I],P=y(C,!0);p(C,_.__data,w),w+=P.storage/Float32Array.BYTES_PER_ELEMENT}}else p(x,_.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,A,_.__data)}}function p(_,S,M){typeof _=="number"||typeof _=="boolean"?S[M]=_:_.isMatrix3?(S[M]=_.elements[0],S[M+1]=_.elements[1],S[M+2]=_.elements[2],S[M+3]=0,S[M+4]=_.elements[3],S[M+5]=_.elements[4],S[M+6]=_.elements[5],S[M+7]=0,S[M+8]=_.elements[6],S[M+9]=_.elements[7],S[M+10]=_.elements[8],S[M+11]=0):ArrayBuffer.isView(_)?S.set(_.subarray(0,S.length-M),M):_.toArray(S,M)}function h(_,S,M,R){const A=_.value,x=S+"_"+M;if(Array.isArray(A)){R[x]===void 0&&(R[x]=[]);const w=R[x];let I=!1;for(let C=0;C<A.length;C++)m(A[C],w,C)===!0&&(I=!0);return I}return m(A,R,x)}function m(_,S,M){if(S[M]===void 0)return typeof _=="number"||typeof _=="boolean"?S[M]=_:ArrayBuffer.isView(_)?S[M]=_.slice():S[M]=_.clone(),!0;{const R=S[M];if(typeof _=="number"||typeof _=="boolean"){if(R!==_)return S[M]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(R.equals(_)===!1)return R.copy(_),!0}}return!1}function g(_){const S=_.uniforms;let M=0;const R=16;for(let x=0,w=S.length;x<w;x++){const I=Array.isArray(S[x])?S[x]:[S[x]];for(let C=0,P=I.length;C<P;C++){const O=I[C],X=Array.isArray(O.value)?O.value:[O.value],D=Array.isArray(S[x])||Array.isArray(O.value);let $=M;for(let G=0,B=X.length;G<B;G++){const F=X[G],V=y(F,D),K=M%R,de=K%V.boundary,be=K+de;M+=de,be!==0&&R-be<V.storage&&(M+=R-be),G===0&&($=M),M+=V.storage}const Q=O.type==="int"?Int32Array:O.type==="uint"?Uint32Array:Float32Array;O.__data=new Q((M-$)/Float32Array.BYTES_PER_ELEMENT),O.__offset=$}}const A=M%R;return A>0&&(M+=R-A),_.__size=M,_.__cache={},this}function y(_,S){const M={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(M.boundary=4,M.storage=4):_.isVector2?(M.boundary=8,M.storage=8):_.isVector3||_.isColor?(M.boundary=16,M.storage=12):_.isVector4?(M.boundary=16,M.storage=16):_.isMatrix3?(M.boundary=16,M.storage=48):_.isMatrix4?(M.boundary=16,M.storage=64):_.isTexture?Ie("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(M.boundary=16,M.storage=_.byteLength):Ie("WebGLRenderer: Unsupported uniform value type.",_),S===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function v(_){const S=_.target;S.removeEventListener("dispose",v),t.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function d(){for(const _ in r)t.deleteBuffer(r[_]);r={},s={}}return{bind:a,update:o,dispose:d}}const dC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ii=null;function fC(){return ii===null&&(ii=new aT(dC,16,16,Hr,hi),ii.name="DFG_LUT",ii.minFilter=fn,ii.magFilter=fn,ii.wrapS=Ai,ii.wrapT=Ai,ii.generateMipmaps=!1,ii.needsUpdate=!0),ii}class hC{constructor(e={}){const{canvas:n=PE(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:m=Dn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const y=m,v=new Set([Ih,Lh,Ph]),d=new Set([Dn,fi,eo,Gs,bh,Nh]),_=new Uint32Array(4),S=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]};let R=null,A=null;const x=[],w=[];let I=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ci,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let P=!1,O=null,X=null,D=null,$=null;this._outputColorSpace=Pn;let Q=0,G=0,B=null,F=-1,V=null;const K=new yt,de=new yt;let be=null;const Z=new qe(0);let me=0,ye=n.width,Ce=n.height,xe=1,Oe=null,Et=null;const Le=new yt(0,0,ye,Ce),Qe=new yt(0,0,ye,Ce);let it=!1;const He=new sc,kt=new Oh;let Rt=!1,cn=!1;const ht=new _t,ei=new W,It=new yt,An={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Rn=!1;function Cn(){return B===null?xe:1}let U=i;function bn(T,L){return n.getContext(T,L)}let ut,dt,ge,Ct,Pe,De,b,E,z,ie,ne,oe,he,J,ee,ce,N,te,q,ue,ae,le,Re;try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Rh}`),n.addEventListener("webglcontextlost",Ne,!1),n.addEventListener("webglcontextrestored",Be,!1),n.addEventListener("webglcontextcreationerror",ve,!1),U===null){const L="webgl2";if(U=bn(L,T),U===null)throw bn(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ke()}catch(T){throw n.removeEventListener("webglcontextlost",Ne,!1),n.removeEventListener("webglcontextrestored",Be,!1),n.removeEventListener("webglcontextcreationerror",ve,!1),Ze("WebGLRenderer: "+T.message),T}function ke(){ut=new g1(U),ut.init(),ae=new iC(U,ut),dt=new s1(U,ut,e,ae),ge=new tC(U,ut),dt.reversedDepthBuffer&&h&&ge.buffers.depth.setReversed(!0),X=U.createFramebuffer(),D=U.createFramebuffer(),$=U.createFramebuffer(),Ct=new x1(U),Pe=new GR,De=new nC(U,ut,ge,Pe,dt,ae,Ct),b=new m1(C),E=new yT(U),le=new i1(U,E),z=new v1(U,E,Ct,le),ie=new y1(U,z,E,le,Ct),te=new S1(U,dt,De),ee=new a1(Pe),ne=new zR(C,b,ut,dt,le,ee),oe=new cC(C,Pe),he=new VR,J=new qR(ut),N=new n1(C,b,ge,ie,g,l),ce=new eC(C,ie,dt),Re=new uC(U,Ct,dt,ge),q=new r1(U,ut,Ct),ue=new _1(U,ut,Ct),Ct.programs=ne.programs,C.capabilities=dt,C.extensions=ut,C.properties=Pe,C.renderLists=he,C.shadowMap=ce,C.state=ge,C.info=Ct}y!==Dn&&(I=new E1(y,n.width,n.height,o,r,s));const se=new oC(C,U);this.xr=se,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const T=ut.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ut.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return xe},this.setPixelRatio=function(T){T!==void 0&&(xe=T,this.setSize(ye,Ce,!1))},this.getSize=function(T){return T.set(ye,Ce)},this.setSize=function(T,L,j=!0){if(se.isPresenting){Ie("WebGLRenderer: Can't change size while VR device is presenting.");return}ye=T,Ce=L,n.width=Math.floor(T*xe),n.height=Math.floor(L*xe),j===!0&&(n.style.width=T+"px",n.style.height=L+"px"),I!==null&&I.setSize(n.width,n.height),this.setViewport(0,0,T,L)},this.getDrawingBufferSize=function(T){return T.set(ye*xe,Ce*xe).floor()},this.setDrawingBufferSize=function(T,L,j){ye=T,Ce=L,xe=j,n.width=Math.floor(T*j),n.height=Math.floor(L*j),this.setViewport(0,0,T,L)},this.setEffects=function(T){if(y===Dn){Ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let L=0;L<T.length;L++)if(T[L].isOutputPass===!0){Ie("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(K)},this.getViewport=function(T){return T.copy(Le)},this.setViewport=function(T,L,j,k){T.isVector4?Le.set(T.x,T.y,T.z,T.w):Le.set(T,L,j,k),ge.viewport(K.copy(Le).multiplyScalar(Cn()).round())},this.getScissor=function(T){return T.copy(Qe)},this.setScissor=function(T,L,j,k){T.isVector4?Qe.set(T.x,T.y,T.z,T.w):Qe.set(T,L,j,k),ge.scissor(de.copy(Qe).multiplyScalar(Cn()).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(T){ge.setScissorTest(it=T)},this.setOpaqueSort=function(T){Oe=T},this.setTransparentSort=function(T){Et=T},this.getClearColor=function(T){return T.copy(N.getClearColor())},this.setClearColor=function(){N.setClearColor(...arguments)},this.getClearAlpha=function(){return N.getClearAlpha()},this.setClearAlpha=function(){N.setClearAlpha(...arguments)},this.clear=function(T=!0,L=!0,j=!0){let k=0;if(T){let H=!1;if(B!==null){const pe=B.texture.format;H=v.has(pe)}if(H){const pe=B.texture.type,Ee=d.has(pe),fe=N.getClearColor(),Se=N.getClearAlpha(),Ae=fe.r,Fe=fe.g,Ve=fe.b;Ee?(_[0]=Ae,_[1]=Fe,_[2]=Ve,_[3]=Se,U.clearBufferuiv(U.COLOR,0,_)):(S[0]=Ae,S[1]=Fe,S[2]=Ve,S[3]=Se,U.clearBufferiv(U.COLOR,0,S))}else k|=U.COLOR_BUFFER_BIT}L&&(k|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(k|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&U.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),O=T},this.dispose=function(){n.removeEventListener("webglcontextlost",Ne,!1),n.removeEventListener("webglcontextrestored",Be,!1),n.removeEventListener("webglcontextcreationerror",ve,!1),N.dispose(),he.dispose(),J.dispose(),De.dispose(),Pe.dispose(),b.dispose(),ie.dispose(),z.dispose(),le.dispose(),Re.dispose(),ne.dispose(),se.dispose(),se.removeEventListener("sessionstart",Wh),se.removeEventListener("sessionend",jh),Sr.stop()};function Ne(T){T.preventDefault(),Am("WebGLRenderer: Context Lost."),P=!0}function Be(){Am("WebGLRenderer: Context Restored."),P=!1;const T=Ct.autoReset,L=ce.enabled,j=ce.autoUpdate,k=ce.needsUpdate,H=ce.type;ke(),Ct.autoReset=T,ce.enabled=L,ce.autoUpdate=j,ce.needsUpdate=k,ce.type=H}function ve(T){Ze("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function et(T){const L=T.target;L.removeEventListener("dispose",et),Dt(L)}function Dt(T){Bi(T),Pe.remove(T)}function Bi(T){const L=Pe.get(T).programs;L!==void 0&&(L.forEach(function(j){ne.releaseProgram(j)}),T.isShaderMaterial&&ne.releaseShaderCache(T))}this.renderBufferDirect=function(T,L,j,k,H,pe){L===null&&(L=An);const Ee=H.isMesh&&H.matrixWorld.determinantAffine()<0,fe=H_(T,L,j,k,H);ge.setMaterial(k,Ee);let Se=j.index,Ae=1;if(k.wireframe===!0){if(Se=z.getWireframeAttribute(j),Se===void 0)return;Ae=2}const Fe=j.drawRange,Ve=j.attributes.position;let Te=Fe.start*Ae,We=(Fe.start+Fe.count)*Ae;pe!==null&&(Te=Math.max(Te,pe.start*Ae),We=Math.min(We,(pe.start+pe.count)*Ae)),Se!==null?(Te=Math.max(Te,0),We=Math.min(We,Se.count)):Ve!=null&&(Te=Math.max(Te,0),We=Math.min(We,Ve.count));const Tt=We-Te;if(Tt<0||Tt===1/0)return;le.setup(H,k,fe,j,Se);let st,rt=q;if(Se!==null&&(st=E.get(Se),rt=ue,rt.setIndex(st)),H.isMesh)k.wireframe===!0?(ge.setLineWidth(k.wireframeLinewidth*Cn()),rt.setMode(U.LINES)):rt.setMode(U.TRIANGLES);else if(H.isLine){let jt=k.linewidth;jt===void 0&&(jt=1),ge.setLineWidth(jt*Cn()),H.isLineSegments?rt.setMode(U.LINES):H.isLineLoop?rt.setMode(U.LINE_LOOP):rt.setMode(U.LINE_STRIP)}else H.isPoints?rt.setMode(U.POINTS):H.isSprite&&rt.setMode(U.TRIANGLES);if(H.isBatchedMesh)if(ut.get("WEBGL_multi_draw"))rt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const jt=H._multiDrawStarts,we=H._multiDrawCounts,Qt=H._multiDrawCount,Ke=Se?E.get(Se).bytesPerElement:1,yr=Pe.get(k).currentProgram.getUniforms();for(let Xt=0;Xt<Qt;Xt++)yr.setValue(U,"_gl_DrawID",Xt),rt.render(jt[Xt]/Ke,we[Xt])}else if(H.isInstancedMesh)rt.renderInstances(Te,Tt,H.count);else if(j.isInstancedBufferGeometry){const jt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,we=Math.min(j.instanceCount,jt);rt.renderInstances(Te,Tt,we)}else rt.render(Te,Tt)};function Vh(T,L,j,k){O!==null&&T.isNodeMaterial&&O.setObject(k,T),Rt===!0&&ee.setState(T,j,!1),T.transparent===!0&&T.side===Ei&&T.forceSinglePass===!1?(T.side=gn,T.needsUpdate=!0,Qs(T,L,k),T.side=Gr,T.needsUpdate=!0,Qs(T,L,k),T.side=Ei):Qs(T,L,k)}this.compile=function(T,L,j=null){j===null&&(j=T),O!==null&&O.renderStart(T,L,j),A=J.get(j),A.init(L),w.push(A),j.traverseVisible(function(H){H.isLight&&H.layers.test(L.layers)&&(A.pushLight(H),H.castShadow&&A.pushShadow(H))}),T!==j&&T.traverseVisible(function(H){H.isLight&&H.layers.test(L.layers)&&(A.pushLight(H),H.castShadow&&A.pushShadow(H))}),A.setupLights(),O!==null&&O.updateLights(A.state.lightsArray),cn=this.localClippingEnabled,Rt=ee.init(this.clippingPlanes,cn),Rt===!0&&ee.setGlobalState(this.clippingPlanes,L),O!==null&&ce.render(A.state.shadowsArray,j,L);const k=new Set;return T.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const pe=H.material;if(pe)if(Array.isArray(pe))for(let Ee=0;Ee<pe.length;Ee++){const fe=pe[Ee];Vh(fe,j,L,H),k.add(fe)}else Vh(pe,j,L,H),k.add(pe)}),A=w.pop(),O!==null&&O.renderEnd(),k},this.compileAsync=function(T,L,j=null){const k=this.compile(T,L,j);return new Promise(H=>{function pe(){if(k.forEach(function(Ee){const Se=Pe.get(Ee).currentProgram;(Se===void 0||Se.isReady())&&k.delete(Ee)}),k.size===0){H(T);return}setTimeout(pe,10)}ut.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Uc=null;function z_(T){Uc&&Uc(T)}function Wh(){Sr.stop()}function jh(){Sr.start()}const Sr=new b_;Sr.setAnimationLoop(z_),typeof self<"u"&&Sr.setContext(self),this.setAnimationLoop=function(T){Uc=T,se.setAnimationLoop(T),T===null?Sr.stop():Sr.start()},se.addEventListener("sessionstart",Wh),se.addEventListener("sessionend",jh),this.render=function(T,L){if(L!==void 0&&L.isCamera!==!0){Ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;O!==null&&O.renderStart(T,L);const j=se.enabled===!0&&se.isPresenting===!0,k=I!==null&&(B===null||j)&&I.begin(C,B);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(se.cameraAutoUpdate===!0&&se.updateCamera(L),L=se.getCamera()),T.isScene===!0&&T.onBeforeRender(C,T,L,B),A=J.get(T,w.length),A.init(L),A.state.textureUnits=De.getTextureUnits(),w.push(A),ht.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),L.isArrayCamera?kt.setFromArrayCamera(L):He.setFromProjectionMatrix(ht,qn,L.reversedDepth),cn=this.localClippingEnabled,Rt=ee.init(this.clippingPlanes,cn),R=he.get(T,x.length),R.init(),x.push(R),this.info.render.frame++,se.enabled===!0&&se.isPresenting===!0){const Ee=C.xr.getDepthSensingMesh();Ee!==null&&Fc(Ee,L,-1/0,C.sortObjects)}Fc(T,L,0,C.sortObjects),R.finish(),O!==null&&O.updateLights(A.state.lightsArray),C.sortObjects===!0&&R.sort(Oe,Et),Rn=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Rn&&N.addToRenderList(R,T),this.info.autoReset===!0&&this.info.reset(),Rt===!0&&ee.beginShadows();const H=A.state.shadowsArray;if(ce.render(H,T,L),Rt===!0&&ee.endShadows(),(k&&I.hasRenderPass())===!1){const Ee=R.opaque,fe=R.transmissive;if(A.setupLights(),L.isArrayCamera){const Se=L.cameras;if(fe.length>0)for(let Ae=0,Fe=Se.length;Ae<Fe;Ae++){const Ve=Se[Ae];$h(Ee,fe,T,Ve)}Rn&&N.render(T);for(let Ae=0,Fe=Se.length;Ae<Fe;Ae++){const Ve=Se[Ae];Xh(R,T,Ve,Ve.viewport)}}else fe.length>0&&$h(Ee,fe,T,L),Rn&&N.render(T),Xh(R,T,L)}B!==null&&G===0&&(De.updateMultisampleRenderTarget(B),De.updateRenderTargetMipmap(B)),k&&I.end(C),T.isScene===!0&&T.onAfterRender(C,T,L),le.resetDefaultState(),F=-1,V=null,w.pop(),w.length>0?(A=w[w.length-1],De.setTextureUnits(A.state.textureUnits),Rt===!0&&ee.setGlobalState(C.clippingPlanes,A.state.camera)):A=null,x.pop(),x.length>0?R=x[x.length-1]:R=null,O!==null&&O.renderEnd()};function Fc(T,L,j,k){if(T.visible===!1)return;if(T.layers.test(L.layers)){if(T.isGroup)j=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(L);else if(T.isLight)A.pushLight(T),T.castShadow&&A.pushShadow(T);else if(T.isSprite){const Ee=L.isArrayCamera?kt:He;if(!T.frustumCulled||T.intersectsFrustum(Ee)){k&&It.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ht);const fe=ie.update(T),Se=T.material;Se.visible&&R.push(T,fe,Se,j,It.z,null,L)}}else if(T.isMesh||T.isLine||T.isPoints){const Ee=L.isArrayCamera?kt:He;if(!T.frustumCulled||T.intersectsFrustum(Ee)){const fe=ie.update(T),Se=T.material;if(k&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),It.copy(T.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),It.copy(fe.boundingSphere.center)),It.applyMatrix4(T.matrixWorld).applyMatrix4(ht)),Array.isArray(Se)){const Ae=fe.groups;for(let Fe=0,Ve=Ae.length;Fe<Ve;Fe++){const Te=Ae[Fe],We=Se[Te.materialIndex];We&&We.visible&&R.push(T,fe,We,j,It.z,Te,L)}}else Se.visible&&R.push(T,fe,Se,j,It.z,null,L)}}}const pe=T.children;for(let Ee=0,fe=pe.length;Ee<fe;Ee++)Fc(pe[Ee],L,j,k)}function Xh(T,L,j,k){const{opaque:H,transmissive:pe,transparent:Ee}=T;A.setupLightsView(j),Rt===!0&&ee.setGlobalState(C.clippingPlanes,j),k&&ge.viewport(K.copy(k)),H.length>0&&po(H,L,j),pe.length>0&&po(pe,L,j),Ee.length>0&&po(Ee,L,j),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function $h(T,L,j,k){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[k.id]===void 0){const Te=ut.has("EXT_color_buffer_half_float")||ut.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[k.id]=new di(1,1,{generateMipmaps:!0,type:Te?hi:Dn,minFilter:ir,samples:Math.max(4,dt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:je.workingColorSpace})}const pe=A.state.transmissionRenderTarget[k.id],Ee=k.viewport||K;pe.setSize(Ee.z*C.transmissionResolutionScale,Ee.w*C.transmissionResolutionScale);const fe=C.getRenderTarget(),Se=C.getActiveCubeFace(),Ae=C.getActiveMipmapLevel();C.setRenderTarget(pe),C.getClearColor(Z),me=C.getClearAlpha(),me<1&&C.setClearColor(16777215,.5),C.clear(),Rn&&N.render(j);const Fe=C.toneMapping;C.toneMapping=Ci;const Ve=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),A.setupLightsView(k),Rt===!0&&ee.setGlobalState(C.clippingPlanes,k),po(T,j,k),De.updateMultisampleRenderTarget(pe),De.updateRenderTargetMipmap(pe),ut.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let We=0,Tt=L.length;We<Tt;We++){const st=L[We],{object:rt,geometry:jt,material:we,group:Qt}=st;if(we.side===Ei&&rt.layers.test(k.layers)){const Ke=we.side;we.side=gn,we.needsUpdate=!0,Yh(rt,j,k,jt,we,Qt),we.side=Ke,we.needsUpdate=!0,Te=!0}}Te===!0&&(De.updateMultisampleRenderTarget(pe),De.updateRenderTargetMipmap(pe))}C.setRenderTarget(fe,Se,Ae),C.setClearColor(Z,me),Ve!==void 0&&(k.viewport=Ve),C.toneMapping=Fe}function po(T,L,j){const k=L.isScene===!0?L.overrideMaterial:null;for(let H=0,pe=T.length;H<pe;H++){const Ee=T[H],{object:fe,geometry:Se,group:Ae}=Ee;let Fe=Ee.material;Fe.allowOverride===!0&&k!==null&&(Fe=k),fe.layers.test(j.layers)&&Yh(fe,L,j,Se,Fe,Ae)}}function Yh(T,L,j,k,H,pe){O!==null&&H.isNodeMaterial&&O.setObject(T,H),T.onBeforeRender(C,L,j,k,H,pe),T.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),H.onBeforeRender(C,L,j,k,T,pe),H.transparent===!0&&H.side===Ei&&H.forceSinglePass===!1?(H.side=gn,H.needsUpdate=!0,C.renderBufferDirect(j,L,k,H,T,pe),H.side=Gr,H.needsUpdate=!0,C.renderBufferDirect(j,L,k,H,T,pe),H.side=Ei):C.renderBufferDirect(j,L,k,H,T,pe),T.onAfterRender(C,L,j,k,H,pe)}function qh(T){let L=0;for(const j of T)j.texture!==null&&L++;return L}function Qs(T,L,j){L.isScene!==!0&&(L=An);const k=Pe.get(T),H=A.state.lights,pe=A.state.shadowsArray,Ee=H.state.version,fe=ne.getParameters(T,H.state,pe,L,j,A.state.lightProbeGridArray),Se=ne.getProgramCacheKey(fe);let Ae=k.programs;k.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?L.environment:null,k.fog=L.fog;const Fe=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;k.envMap=b.get(T.envMap||k.environment,Fe),k.envMapRotation=k.environment!==null&&T.envMap===null?L.environmentRotation:T.envMapRotation,Ae===void 0&&(T.addEventListener("dispose",et),Ae=new Map,k.programs=Ae,k.programVariants=new Map);let Ve=Ae.get(Se);if(Ve!==void 0){if(k.currentProgram===Ve&&k.lightsStateVersion===Ee)return Zh(T,fe),Ve}else fe.uniforms=ne.getUniforms(T),O!==null&&T.isNodeMaterial&&O.build(T,j,fe),T.onBeforeCompile(fe,C),Ve=ne.acquireProgram(fe,Se),Ae.set(Se,Ve),k.uniforms=fe.uniforms;const Te=k.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Te.clippingPlanes=ee.uniform),Zh(T,fe),k.needsLights=W_(T),k.lightsStateVersion=Ee,k.needsLights&&(Te.ambientLightColor.value=H.state.ambient,Te.lightProbe.value=H.state.probe,Te.sunLights.value=H.state.sun,Te.sunLightShadows.value=H.state.sunShadow,Te.directionalLights.value=H.state.directional,Te.directionalLightShadows.value=H.state.directionalShadow,Te.spotLights.value=H.state.spot,Te.spotLightShadows.value=H.state.spotShadow,Te.rectAreaLights.value=H.state.rectArea,Te.ltc_1.value=H.state.rectAreaLTC1,Te.ltc_2.value=H.state.rectAreaLTC2,Te.pointLights.value=H.state.point,Te.pointLightShadows.value=H.state.pointShadow,Te.hemisphereLights.value=H.state.hemi,Te.sunShadowMatrix.value=H.state.sunShadowMatrix,Te.sunShadowCascade.value=H.state.sunShadowCascade,Te.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Te.spotLightMatrix.value=H.state.spotLightMatrix,Te.spotLightMap.value=H.state.spotLightMap,Te.pointShadowMatrix.value=H.state.pointShadowMatrix),k.numLightProbeGrids=qh(A.state.lightProbeGridArray),k.currentProgram=Ve,k.uniformsList=null,Ve}function G_(T,L,j,k,H){const pe=Pe.get(T),Ee=pe.currentProgram.id+","+k+","+H;let fe=pe.programVariants.get(Ee);return fe===void 0?(fe=Qs(T,L,j),pe.programVariants.set(Ee,fe)):(pe.currentProgram=fe,pe.uniformsList=null,pe.outputColorSpace=k,pe.toneMapping=H),fe}function Kh(T){if(T.uniformsList===null){const L=T.currentProgram.getUniforms();T.uniformsList=Tl.seqWithValue(L.seq,T.uniforms)}return T.uniformsList}function Zh(T,L){const j=Pe.get(T);j.outputColorSpace=L.outputColorSpace,j.batching=L.batching,j.batchingColor=L.batchingColor,j.instancing=L.instancing,j.instancingColor=L.instancingColor,j.instancingMorph=L.instancingMorph,j.skinning=L.skinning,j.morphTargets=L.morphTargets,j.morphNormals=L.morphNormals,j.morphColors=L.morphColors,j.morphTargetsCount=L.morphTargetsCount,j.numClippingPlanes=L.numClippingPlanes,j.numIntersection=L.numClipIntersection,j.vertexAlphas=L.vertexAlphas,j.vertexTangents=L.vertexTangents,j.toneMapping=L.toneMapping}function H_(T,L,j,k,H){L.isScene!==!0&&(L=An),De.resetTextureUnits();const pe=L.fog,Ee=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?L.environment:null,fe=B===null?C.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:je.workingColorSpace,Se=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Ae=b.get(k.envMap||Ee,Se),Fe=k.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ve=!!j.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Te=!!j.morphAttributes.position,We=!!j.morphAttributes.normal,Tt=!!j.morphAttributes.color;let st=Ci;k.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(st=C.toneMapping);const rt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,jt=rt!==void 0?rt.length:0,we=Pe.get(k),Qt=A.state.lights;if(Rt===!0&&(cn===!0||T!==V)){const pt=T===V&&k.id===F;ee.setState(k,T,pt)}let Ke=!1,yr=!1;k.version===we.__version?we.needsLights&&we.lightsStateVersion!==Qt.state.version||H.isBatchedMesh&&we.batching===!1||!H.isBatchedMesh&&we.batching===!0||H.isBatchedMesh&&we.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&we.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&we.instancing===!1||!H.isInstancedMesh&&we.instancing===!0||H.isSkinnedMesh&&we.skinning===!1||!H.isSkinnedMesh&&we.skinning===!0||H.isInstancedMesh&&we.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&we.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&we.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&we.instancingMorph===!1&&H.morphTexture!==null||we.envMap!==Ae||k.fog===!0&&we.fog!==pe||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==ee.numPlanes||we.numIntersection!==ee.numIntersection)||we.vertexAlphas!==Fe||we.vertexTangents!==Ve||we.morphTargets!==Te||we.morphNormals!==We||we.morphColors!==Tt||we.morphTargetsCount!==jt||we.numLightProbeGrids!==qh(A.state.lightProbeGridArray)?Ke=!0:(we.outputColorSpace!==fe||we.toneMapping!==st)&&(yr=!0):(Ke=!0,we.__version=k.version);let Xt=we.currentProgram;(Ke===!0||yr===!0)&&(Xt=yr===!0?G_(k,L,H,fe,st):Qs(k,L,H),O&&k.isNodeMaterial&&O.onUpdateProgram(k,Xt,we));let mo=!1,ki=!1,Mr=!1;const $e=Xt.getUniforms(),zt=we.uniforms;if(ge.useProgram(Xt.program)&&(mo=!0,ki=!0,Mr=!0),k.id!==F&&(F=k.id,ki=!0),mo||V!==T){ge.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),$e.setValue(U,"projectionMatrix",T.projectionMatrix),$e.setValue(U,"viewMatrix",T.matrixWorldInverse);const Ut=$e.map.cameraPosition;Ut!==void 0&&Ut.setValue(U,ei.setFromMatrixPosition(T.matrixWorld)),dt.logarithmicDepthBuffer&&$e.setValue(U,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&$e.setValue(U,"isOrthographic",T.isOrthographicCamera===!0),V!==T&&(V=T,ki=!0,Mr=!0)}if(we.needsLights&&(Qt.state.sunShadowMap.length>0&&$e.setValue(U,"sunShadowMap",Qt.state.sunShadowMap,De),Qt.state.directionalShadowMap.length>0&&$e.setValue(U,"directionalShadowMap",Qt.state.directionalShadowMap,De),Qt.state.spotShadowMap.length>0&&$e.setValue(U,"spotShadowMap",Qt.state.spotShadowMap,De),Qt.state.pointShadowMap.length>0&&$e.setValue(U,"pointShadowMap",Qt.state.pointShadowMap,De)),H.isSkinnedMesh){$e.setOptional(U,H,"bindMatrix"),$e.setOptional(U,H,"bindMatrixInverse");const pt=H.skeleton;pt&&(pt.boneTexture===null&&pt.computeBoneTexture(),$e.setValue(U,"boneTexture",pt.boneTexture,De))}H.isBatchedMesh&&($e.setOptional(U,H,"batchingTexture"),$e.setValue(U,"batchingTexture",H._matricesTexture,De),$e.setOptional(U,H,"batchingIdTexture"),$e.setValue(U,"batchingIdTexture",H._indirectTexture,De),$e.setOptional(U,H,"batchingColorTexture"),H._colorsTexture!==null&&$e.setValue(U,"batchingColorTexture",H._colorsTexture,De));const kn=j.morphAttributes;if((kn.position!==void 0||kn.normal!==void 0||kn.color!==void 0)&&te.update(H,j,Xt),(ki||we.receiveShadow!==H.receiveShadow)&&(we.receiveShadow=H.receiveShadow,$e.setValue(U,"receiveShadow",H.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&L.environment!==null&&(zt.envMapIntensity.value=L.environmentIntensity),zt.dfgLUT!==void 0&&(zt.dfgLUT.value=fC()),ki){if($e.setValue(U,"toneMappingExposure",C.toneMappingExposure),we.needsLights&&V_(zt,Mr),pe&&k.fog===!0&&oe.refreshFogUniforms(zt,pe),oe.refreshMaterialUniforms(zt,k,xe,Ce,A.state.transmissionRenderTarget[T.id]),we.needsLights&&we.numLightProbeGrids>0){const pt=M;let Ut=0;for(const mi of A.state.lightProbeGridArray)mi.texture!==null&&(pt.textures[Ut]=mi.texture,pt.min[Ut]=mi.boundingBox.min,pt.max[Ut]=mi.boundingBox.max,pt.resolution[Ut]=mi.resolution,Ut++);for(const mi in pt)pt[mi].length=Ut;zt.probesSH.value=pt.textures,zt.probesMin.value=pt.min,zt.probesMax.value=pt.max,zt.probesResolution.value=pt.resolution}Tl.upload(U,Kh(we),zt,De)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Tl.upload(U,Kh(we),zt,De),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&$e.setValue(U,"center",H.center),$e.setValue(U,"modelViewMatrix",H.modelViewMatrix),$e.setValue(U,"normalMatrix",H.normalMatrix),$e.setValue(U,"modelMatrix",H.matrixWorld),k.uniformsGroups!==void 0){const pt=k.uniformsGroups;for(let Ut=0,mi=pt.length;Ut<mi;Ut++){const Qh=pt[Ut];Re.update(Qh,Xt),Re.bind(Qh,Xt)}}return Xt}function V_(T,L){T.ambientLightColor.needsUpdate=L,T.lightProbe.needsUpdate=L,T.sunLights.needsUpdate=L,T.sunLightShadows.needsUpdate=L,T.directionalLights.needsUpdate=L,T.directionalLightShadows.needsUpdate=L,T.pointLights.needsUpdate=L,T.pointLightShadows.needsUpdate=L,T.spotLights.needsUpdate=L,T.spotLightShadows.needsUpdate=L,T.rectAreaLights.needsUpdate=L,T.hemisphereLights.needsUpdate=L}function W_(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return Q},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(T,L,j){const k=Pe.get(T);k.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),Pe.get(T.texture).__webglTexture=L,Pe.get(T.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:j,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,L){const j=Pe.get(T);j.__webglFramebuffer=L,j.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(T,L=0,j=0){B=T,Q=L,G=j;let k=null,H=!1,pe=!1;if(T){const fe=Pe.get(T);if(fe.__useDefaultFramebuffer!==void 0){ge.bindFramebuffer(U.FRAMEBUFFER,fe.__webglFramebuffer),K.copy(T.viewport),de.copy(T.scissor),be=T.scissorTest,ge.viewport(K),ge.scissor(de),ge.setScissorTest(be),F=-1;return}else if(fe.__webglFramebuffer===void 0)De.setupRenderTarget(T);else if(fe.__hasExternalTextures)De.rebindTextures(T,Pe.get(T.texture).__webglTexture,Pe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Fe=T.depthTexture;if(fe.__boundDepthTexture!==Fe){if(Fe!==null&&Pe.has(Fe)&&(T.width!==Fe.image.width||T.height!==Fe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");De.setupDepthRenderbuffer(T)}}const Se=T.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(pe=!0);const Ae=Pe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ae[L])?k=Ae[L][j]:k=Ae[L],H=!0):T.samples>0&&De.useMultisampledRTT(T)===!1?k=Pe.get(T).__webglMultisampledFramebuffer:Array.isArray(Ae)?k=Ae[j]:k=Ae,K.copy(T.viewport),de.copy(T.scissor),be=T.scissorTest}else K.copy(Le).multiplyScalar(xe).floor(),de.copy(Qe).multiplyScalar(xe).floor(),be=it;if(j!==0&&(k=X),ge.bindFramebuffer(U.FRAMEBUFFER,k)&&ge.drawBuffers(T,k),ge.viewport(K),ge.scissor(de),ge.setScissorTest(be),H){const fe=Pe.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+L,fe.__webglTexture,j)}else if(pe){const fe=L;for(let Se=0;Se<T.textures.length;Se++){const Ae=Pe.get(T.textures[Se]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Se,Ae.__webglTexture,j,fe)}}else if(T!==null&&j!==0){const fe=Pe.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,fe.__webglTexture,j)}F=-1};function Jh(T){const L=Pe.get(T);return(L.__readFormat!==T.format||L.__readType!==T.type)&&(L.__readFormat=T.format,L.__readType=T.type,L.__formatReadable=dt.textureFormatReadable(T.format),L.__typeReadable=dt.textureTypeReadable(T.type)),L}this.readRenderTargetPixels=function(T,L,j,k,H,pe,Ee,fe=0){if(!(T&&T.isWebGLRenderTarget)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Pe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ee!==void 0&&(Se=Se[Ee],Array.isArray(Se)&&(Se=Se[0])),Se){ge.bindFramebuffer(U.FRAMEBUFFER,Se);try{const Ae=T.textures[fe],Fe=Ae.format,Ve=Ae.type;T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+fe);const Te=Jh(Ae);if(Te.__formatReadable===!1){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Te.__typeReadable===!1){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=T.width-k&&j>=0&&j<=T.height-H&&U.readPixels(L,j,k,H,ae.convert(Fe),ae.convert(Ve),pe)}finally{const Ae=B!==null?Pe.get(B).__webglFramebuffer:null;ge.bindFramebuffer(U.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(T,L,j,k,H,pe,Ee,fe=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=Pe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ee!==void 0&&(Se=Se[Ee],Array.isArray(Se)&&(Se=Se[0])),Se)if(L>=0&&L<=T.width-k&&j>=0&&j<=T.height-H){ge.bindFramebuffer(U.FRAMEBUFFER,Se);const Ae=T.textures[fe],Fe=Ae.format,Ve=Ae.type;T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+fe);const Te=Jh(Ae);if(Te.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Te.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const We=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,We),U.bufferData(U.PIXEL_PACK_BUFFER,pe.byteLength,U.STREAM_READ),U.readPixels(L,j,k,H,ae.convert(Fe),ae.convert(Ve),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);const Tt=B!==null?Pe.get(B).__webglFramebuffer:null;ge.bindFramebuffer(U.FRAMEBUFFER,Tt);const st=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await LE(U,st,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,We),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,pe),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(We),U.deleteSync(st),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,L=null,j=0){const k=Math.pow(2,-j),H=Math.floor(T.image.width*k),pe=Math.floor(T.image.height*k),Ee=L!==null?L.x:0,fe=L!==null?L.y:0;De.setTexture2D(T,0),U.copyTexSubImage2D(U.TEXTURE_2D,j,0,0,Ee,fe,H,pe),ge.unbindTexture()},this.copyTextureToTexture=function(T,L,j=null,k=null,H=0,pe=0){let Ee,fe,Se,Ae,Fe,Ve,Te,We,Tt;const st=T.isCompressedTexture?T.mipmaps[pe]:T.image;if(j!==null)Ee=j.max.x-j.min.x,fe=j.max.y-j.min.y,Se=j.isBox3?j.max.z-j.min.z:1,Ae=j.min.x,Fe=j.min.y,Ve=j.isBox3?j.min.z:0;else{const $e=Math.pow(2,-H);Ee=Math.floor(st.width*$e),fe=Math.floor(st.height*$e),T.isDataArrayTexture?Se=st.depth:T.isData3DTexture?Se=Math.floor(st.depth*$e):Se=1,Ae=0,Fe=0,Ve=0}k!==null?(Te=k.x,We=k.y,Tt=k.z):(Te=0,We=0,Tt=0);const rt=ae.convert(L.format),jt=ae.convert(L.type);let we;L.isData3DTexture?(De.setTexture3D(L,0),we=U.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(De.setTexture2DArray(L,0),we=U.TEXTURE_2D_ARRAY):(De.setTexture2D(L,0),we=U.TEXTURE_2D),ge.activeTexture(U.TEXTURE0),ge.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,L.flipY),ge.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),ge.pixelStorei(U.UNPACK_ALIGNMENT,L.unpackAlignment);const Qt=ge.getParameter(U.UNPACK_ROW_LENGTH),Ke=ge.getParameter(U.UNPACK_IMAGE_HEIGHT),yr=ge.getParameter(U.UNPACK_SKIP_PIXELS),Xt=ge.getParameter(U.UNPACK_SKIP_ROWS),mo=ge.getParameter(U.UNPACK_SKIP_IMAGES);ge.pixelStorei(U.UNPACK_ROW_LENGTH,st.width),ge.pixelStorei(U.UNPACK_IMAGE_HEIGHT,st.height),ge.pixelStorei(U.UNPACK_SKIP_PIXELS,Ae),ge.pixelStorei(U.UNPACK_SKIP_ROWS,Fe),ge.pixelStorei(U.UNPACK_SKIP_IMAGES,Ve);const ki=T.isDataArrayTexture||T.isData3DTexture,Mr=L.isDataArrayTexture||L.isData3DTexture;if(T.isDepthTexture){const $e=Pe.get(T),zt=Pe.get(L),kn=Pe.get($e.__renderTarget),pt=Pe.get(zt.__renderTarget);ge.bindFramebuffer(U.READ_FRAMEBUFFER,kn.__webglFramebuffer),ge.bindFramebuffer(U.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let Ut=0;Ut<Se;Ut++)ki&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pe.get(T).__webglTexture,H,Ve+Ut),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pe.get(L).__webglTexture,pe,Tt+Ut)),U.blitFramebuffer(Ae,Fe,Ae+Ee,Fe+fe,Te,We,Te+Ee,We+fe,U.DEPTH_BUFFER_BIT,U.NEAREST);ge.bindFramebuffer(U.READ_FRAMEBUFFER,null),ge.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(H!==0||T.isRenderTargetTexture||Pe.has(T)){const $e=Pe.get(T),zt=Pe.get(L);ge.bindFramebuffer(U.READ_FRAMEBUFFER,D),ge.bindFramebuffer(U.DRAW_FRAMEBUFFER,$);for(let kn=0;kn<Se;kn++)ki?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,$e.__webglTexture,H,Ve+kn):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,$e.__webglTexture,H),Mr?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,zt.__webglTexture,pe,Tt+kn):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,zt.__webglTexture,pe),H!==0?U.blitFramebuffer(Ae,Fe,Ae+Ee,Fe+fe,Te,We,Te+Ee,We+fe,U.COLOR_BUFFER_BIT,U.NEAREST):Mr?U.copyTexSubImage3D(we,pe,Te,We,Tt+kn,Ae,Fe,Ee,fe):U.copyTexSubImage2D(we,pe,Te,We,Ae,Fe,Ee,fe);ge.bindFramebuffer(U.READ_FRAMEBUFFER,null),ge.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Mr?T.isDataTexture||T.isData3DTexture?U.texSubImage3D(we,pe,Te,We,Tt,Ee,fe,Se,rt,jt,st.data):L.isCompressedArrayTexture?U.compressedTexSubImage3D(we,pe,Te,We,Tt,Ee,fe,Se,rt,st.data):U.texSubImage3D(we,pe,Te,We,Tt,Ee,fe,Se,rt,jt,st):T.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,pe,Te,We,Ee,fe,rt,jt,st.data):T.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,pe,Te,We,st.width,st.height,rt,st.data):U.texSubImage2D(U.TEXTURE_2D,pe,Te,We,Ee,fe,rt,jt,st);ge.pixelStorei(U.UNPACK_ROW_LENGTH,Qt),ge.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ke),ge.pixelStorei(U.UNPACK_SKIP_PIXELS,yr),ge.pixelStorei(U.UNPACK_SKIP_ROWS,Xt),ge.pixelStorei(U.UNPACK_SKIP_IMAGES,mo),pe===0&&L.generateMipmaps===!0&&L.mipmapsAutoUpdate===!0&&U.generateMipmap(we),ge.unbindTexture()},this.initRenderTarget=function(T){Pe.get(T).__webglFramebuffer===void 0&&De.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?De.setTextureCube(T,0):T.isData3DTexture?De.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?De.setTexture2DArray(T,0):De.setTexture2D(T,0),ge.unbindTexture()},this.resetState=function(){Q=0,G=0,B=null,ge.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),n.unpackColorSpace=je._getUnpackColorSpace()}}function pC(){const t=Y.useRef(null);return Y.useEffect(()=>{const e=t.current;if(!e)return;const n=new ZE,i=new $n(35,1,.1,100);i.position.z=7;const r=new hC({alpha:!0,antialias:!0});r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.setClearColor(0,0),e.appendChild(r.domElement);const s=new ya;n.add(s);const a=[],o=[],l=M=>{const R=Math.sin(M*12.9898)*43758.5453;return R-Math.floor(R)};for(let M=0;M<34;M+=1){const R=M/34*Math.PI*2,A=1.1+l(M+2)*1.25,x=new W(Math.cos(R)*A,Math.sin(R)*A*.62,(l(M+8)-.5)*1.2);a.push(x),o.push(x.x,x.y,x.z)}const c=new Qn;c.setAttribute("position",new Mn(o,3));const f=new uT(c,new E_({color:1490229,size:.065,transparent:!0,opacity:.9}));s.add(f);const p=[];a.forEach((M,R)=>{a.slice(R+1).forEach(A=>{M.distanceTo(A)<1.25&&p.push(M.x,M.y,M.z,A.x,A.y,A.z)})});const h=new Qn;h.setAttribute("position",new Mn(p,3));const m=new cT(h,new M_({color:4369151,transparent:!0,opacity:.18}));s.add(m);const g=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let y=0;const v={x:0,y:0},d=()=>{const M=e.clientWidth||1,R=e.clientHeight||1;i.aspect=M/R,i.updateProjectionMatrix(),r.setSize(M,R,!1)},_=M=>{v.x=(M.clientX/window.innerWidth-.5)*.15,v.y=(M.clientY/window.innerHeight-.5)*.1},S=()=>{y=requestAnimationFrame(S),g||(s.rotation.y+=(v.x-s.rotation.y)*.015,s.rotation.x+=(-v.y-s.rotation.x)*.015,s.rotation.z+=7e-4),r.render(n,i)};return d(),window.addEventListener("resize",d),window.addEventListener("pointermove",_,{passive:!0}),S(),()=>{cancelAnimationFrame(y),window.removeEventListener("resize",d),window.removeEventListener("pointermove",_),c.dispose(),h.dispose(),f.material.dispose(),m.material.dispose(),r.dispose(),r.domElement.remove()}},[]),u.jsx("div",{ref:t,className:"landing-scene","aria-hidden":"true"})}function mC(){const[t,e]=Y.useState(!1);function n(i){i.preventDefault(),e(!0)}return u.jsxs("div",{className:"landing-page",children:[u.jsxs("header",{className:"landing-header",children:[u.jsxs(ot,{className:"landing-brand",to:"/",children:[u.jsx("span",{className:"landing-mark",children:"K"}),u.jsxs("span",{children:[u.jsx("strong",{children:"KIGOMA REGION"}),u.jsx("small",{children:"EXAMINATION RESULTS PORTAL"})]})]}),u.jsx("nav",{children:u.jsx(ot,{to:"/results",children:"Results"})})]}),u.jsxs("main",{className:"landing-main",children:[u.jsx(pC,{}),u.jsxs("section",{className:"landing-hero",children:[u.jsxs("div",{className:"landing-copy",children:[u.jsx("p",{className:"landing-eyebrow",children:"KIGOMA REGIONAL EDUCATION OFFICE"}),u.jsxs("h1",{children:["Examination results, ",u.jsx("em",{children:"made clear."})]}),u.jsx("p",{className:"landing-lead",children:"Access examination results for schools and candidates across Kigoma Region from one simple, trusted portal."}),u.jsx("div",{className:"landing-actions",children:u.jsxs(ot,{className:"landing-primary",to:"/results",children:["View examination results ",u.jsx("span",{"aria-hidden":"true",children:"→"})]})}),u.jsxs("div",{className:"landing-trust",children:[u.jsx("span",{className:"trust-dot"}),u.jsx("span",{children:"Official regional results portal"}),u.jsx("i",{}),u.jsx("span",{children:"Available for CSEE and ACSEE"})]})]}),u.jsxs("div",{className:"landing-information",children:[u.jsxs("div",{className:"information-heading",children:[u.jsx("span",{children:"PUBLIC PORTAL"}),u.jsx("strong",{children:"Find examination results"})]}),u.jsxs("div",{className:"information-row",children:[u.jsx("b",{children:"01"}),u.jsx("span",{children:"Choose CSEE or ACSEE"})]}),u.jsxs("div",{className:"information-row",children:[u.jsx("b",{children:"02"}),u.jsx("span",{children:"Select the examination year"})]}),u.jsxs("div",{className:"information-row",children:[u.jsx("b",{children:"03"}),u.jsx("span",{children:"Search by centre or index number"})]}),u.jsxs(ot,{to:"/results",className:"information-link",children:["Start here ",u.jsx("span",{"aria-hidden":"true",children:"→"})]})]})]}),u.jsxs("section",{className:"landing-contact","aria-labelledby":"contact-title",children:[u.jsxs("div",{className:"contact-copy",children:[u.jsx("p",{className:"landing-eyebrow",children:"SUPPORT & ENQUIRIES"}),u.jsx("h2",{id:"contact-title",children:"Need help with results?"}),u.jsx("p",{children:"Send a message to the Kigoma Regional Education Office and include your candidate or centre number where relevant."}),u.jsxs("div",{className:"contact-details",children:[u.jsxs("div",{children:[u.jsx("span",{children:"Office"}),u.jsx("strong",{children:"Kigoma Regional Education Office"})]}),u.jsxs("div",{children:[u.jsx("span",{children:"Enquiry type"}),u.jsx("strong",{children:"Examination results and centre information"})]}),u.jsxs("div",{children:[u.jsx("span",{children:"Response"}),u.jsx("strong",{children:"Messages are reviewed during office hours"})]})]})]}),u.jsx("form",{className:"contact-form",onSubmit:n,children:t?u.jsxs("div",{className:"contact-success",children:[u.jsx("span",{children:"✓"}),u.jsx("strong",{children:"Message received"}),u.jsx("p",{children:"Thank you. Your enquiry has been recorded."}),u.jsx("button",{type:"button",onClick:()=>e(!1),children:"Send another message"})]}):u.jsxs(u.Fragment,{children:[u.jsxs("label",{children:[u.jsx("span",{children:"Your name"}),u.jsx("input",{name:"name",required:!0,placeholder:"Enter your name"})]}),u.jsxs("label",{children:[u.jsx("span",{children:"Email address"}),u.jsx("input",{name:"email",type:"email",required:!0,placeholder:"you@example.com"})]}),u.jsxs("label",{children:[u.jsx("span",{children:"Message"}),u.jsx("textarea",{name:"message",required:!0,rows:"4",placeholder:"How can we help?"})]}),u.jsxs("button",{type:"submit",children:["Send enquiry ",u.jsx("b",{"aria-hidden":"true",children:"→"})]})]})})]})]}),u.jsxs("footer",{className:"landing-footer",children:[u.jsx("span",{children:"© Kigoma Regional Examination Results"}),u.jsx("span",{children:"Public access portal"})]})]})}function xg({items:t,max:e,format:n=r=>r,tone:i="lake"}){const r=e??Math.max(1,...t.map(s=>s.value));return u.jsx("ul",{className:"bars",children:t.map(s=>u.jsxs("li",{children:[u.jsx("span",{className:"bars-label",children:s.label}),u.jsx("span",{className:"bars-track",children:u.jsx("span",{className:`bars-fill tone-${s.tone||i}`,style:{width:`${s.value/r*100}%`}})}),u.jsx("span",{className:"bars-value",children:n(s.value)})]},s.label))})}const gC=["I","II","III","IV","0","INC"],vC=(t,e)=>e?Math.round(t/e*1e3)/10:0,_C=t=>t.length?Math.round(t.reduce((e,n)=>e+n,0)/t.length*100)/100:0;function pa(t){const e=t.filter(n=>n.division!=="INC");return{count:t.length,passRate:vC(e.filter(n=>n.pass).length,e.length),gpa:_C(e.map(n=>n.gpa))}}function xC(){const{user:t}=Yr(),e=Y.useMemo(()=>{const s=Pc(t,Di),a=new Set(s.map(y=>y.id)),o=Nc.filter(y=>a.has(y.student.schoolId)),l=pa(o),c=gC.map(y=>({label:y==="INC"?"Incomplete":y==="0"?"Division 0":`Division ${y}`,value:o.filter(v=>v.division===y).length,tone:y==="0"?"bad":y==="INC"?"warn":"lake"})),f=pa(o.filter(y=>y.student.gender==="F")),p=pa(o.filter(y=>y.student.gender==="M")),h=s.map(y=>({school:y,...pa(o.filter(v=>v.student.schoolId===y.id))})).sort((y,v)=>y.gpa<v.gpa?1:-1),m=[...new Set(s.map(y=>y.council))].map(y=>{const v=new Set(s.filter(d=>d.council===y).map(d=>d.id));return{label:y,value:pa(o.filter(d=>v.has(d.student.schoolId))).gpa}}).sort((y,v)=>v.value-y.value),g=o.filter(y=>y.division==="INC").length;return{schools:s,overall:l,divisionCounts:c,girls:f,boys:p,bySchool:h,byCouncil:m,missing:g}},[t]),{overall:n,schools:i}=e,r=t.role==="regional_admin";return u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"page-head",children:u.jsxs("div",{children:[u.jsx("h1",{children:"Dashboard"}),u.jsx("p",{className:"muted",children:kd.name})]})}),e.missing>0&&u.jsxs("div",{className:"notice notice-warn",role:"status",children:[e.missing," students have incomplete results because marks are missing. Ask teachers to finish marks entry."]}),u.jsxs("div",{className:"stats",children:[u.jsxs("div",{className:"stat",children:[u.jsx("span",{className:"stat-value",children:n.count}),u.jsx("span",{className:"stat-label",children:"Students"})]}),u.jsxs("div",{className:"stat",children:[u.jsx("span",{className:"stat-value",children:i.length}),u.jsx("span",{className:"stat-label",children:"Schools"})]}),u.jsxs("div",{className:"stat",children:[u.jsxs("span",{className:"stat-value",children:[n.passRate,"%"]}),u.jsx("span",{className:"stat-label",children:"Pass rate"})]}),u.jsxs("div",{className:"stat",children:[u.jsx("span",{className:"stat-value",children:n.gpa.toFixed(2)}),u.jsx("span",{className:"stat-label",children:"Average GPA (out of 5)"})]})]}),u.jsxs("div",{className:"grid-2",children:[u.jsxs("section",{className:"card",children:[u.jsx("h2",{children:"Students by division"}),u.jsx(xg,{items:e.divisionCounts})]}),u.jsxs("section",{className:"card",children:[u.jsx("h2",{children:r?"Average GPA by council":"Average GPA by school"}),u.jsx(xg,{items:r?e.byCouncil:e.bySchool.map(s=>({label:s.school.name,value:s.gpa})),max:5,format:s=>s.toFixed(2)})]}),u.jsxs("section",{className:"card",children:[u.jsx("h2",{children:"Girls and boys"}),u.jsxs("table",{className:"table compact",children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Group"}),u.jsx("th",{className:"num",children:"Students"}),u.jsx("th",{className:"num",children:"Pass rate"}),u.jsx("th",{className:"num",children:"Avg GPA"})]})}),u.jsxs("tbody",{children:[u.jsxs("tr",{children:[u.jsx("td",{children:"Girls"}),u.jsx("td",{className:"num",children:e.girls.count}),u.jsxs("td",{className:"num",children:[e.girls.passRate,"%"]}),u.jsx("td",{className:"num",children:e.girls.gpa.toFixed(2)})]}),u.jsxs("tr",{children:[u.jsx("td",{children:"Boys"}),u.jsx("td",{className:"num",children:e.boys.count}),u.jsxs("td",{className:"num",children:[e.boys.passRate,"%"]}),u.jsx("td",{className:"num",children:e.boys.gpa.toFixed(2)})]})]})]})]}),u.jsxs("section",{className:"card",children:[u.jsx("h2",{children:"School ranking"}),u.jsx("div",{className:"table-wrap",children:u.jsxs("table",{className:"table compact",children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{className:"num",children:"#"}),u.jsx("th",{children:"School"}),u.jsx("th",{className:"num",children:"Pass rate"}),u.jsx("th",{className:"num",children:"Avg GPA"})]})}),u.jsx("tbody",{children:e.bySchool.map((s,a)=>u.jsxs("tr",{children:[u.jsx("td",{className:"num",children:a+1}),u.jsx("td",{children:s.school.name}),u.jsxs("td",{className:"num",children:[s.passRate,"%"]}),u.jsx("td",{className:"num",children:s.gpa.toFixed(2)})]},s.school.id))})]})})]})]})]})}function SC(){const{user:t}=Yr(),[e,n]=Y.useState(""),[i,r]=Y.useState(""),[s,a]=Y.useState(""),o=Y.useMemo(()=>{const c=e.trim().toLowerCase();return Pc(t,Di).filter(f=>!i||f.council===i).filter(f=>!s||f.ownership===s).filter(f=>!c||f.name.toLowerCase().includes(c)||f.code.toLowerCase().includes(c)).map(f=>({...f,students:Nc.filter(p=>p.student.schoolId===f.id).length}))},[t,e,i,s]),l=t.role==="council_admin"?[t.council]:CM;return u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"page-head",children:u.jsxs("div",{children:[u.jsx("h1",{children:"Schools"}),u.jsxs("p",{className:"muted",children:[o.length," schools"]})]})}),u.jsxs("div",{className:"toolbar",children:[u.jsx("input",{className:"input grow",placeholder:"Search by school name or code",value:e,onChange:c=>n(c.target.value),"aria-label":"Search schools"}),u.jsxs("select",{className:"input",value:i,onChange:c=>r(c.target.value),"aria-label":"Council",children:[u.jsx("option",{value:"",children:"All councils"}),l.map(c=>u.jsx("option",{children:c},c))]}),u.jsxs("select",{className:"input",value:s,onChange:c=>a(c.target.value),"aria-label":"Ownership",children:[u.jsx("option",{value:"",children:"Government and private"}),u.jsx("option",{children:"Government"}),u.jsx("option",{children:"Private"})]})]}),u.jsx("div",{className:"card flush table-wrap",children:u.jsxs("table",{className:"table",children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Code"}),u.jsx("th",{children:"School"}),u.jsx("th",{children:"Council"}),u.jsx("th",{children:"Ownership"}),u.jsx("th",{className:"num",children:"Students"})]})}),u.jsxs("tbody",{children:[o.map(c=>u.jsxs("tr",{children:[u.jsx("td",{children:c.code}),u.jsx("td",{children:c.name}),u.jsx("td",{children:c.council}),u.jsx("td",{children:u.jsx("span",{className:`badge ${c.ownership==="Government"?"badge-lake":"badge-sun"}`,children:c.ownership})}),u.jsx("td",{className:"num",children:c.students})]},c.id)),o.length===0&&u.jsx("tr",{children:u.jsx("td",{colSpan:"5",className:"empty",children:"No schools match. Clear the search or filters to see all schools."})})]})]})})]})}function yC({title:t,onClose:e,children:n}){return Y.useEffect(()=>{const i=r=>r.key==="Escape"&&e();return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[e]),u.jsx("div",{className:"modal-backdrop",onMouseDown:i=>i.target===i.currentTarget&&e(),children:u.jsxs("div",{className:"modal",role:"dialog","aria-modal":"true","aria-label":t,children:[u.jsxs("div",{className:"modal-head",children:[u.jsx("h2",{children:t}),u.jsx("button",{className:"icon-btn",onClick:e,"aria-label":"Close",children:u.jsx(Lr,{name:"close"})})]}),n]})})}const zu=10;function MC(){const{user:t}=Yr(),e=Pc(t,Di),n=I=>{var C;return((C=Di.find(P=>P.id===I))==null?void 0:C.name)??""},[i,r]=Y.useState(ao),[s,a]=Y.useState(""),[o,l]=Y.useState(""),[c,f]=Y.useState(""),[p,h]=Y.useState(""),[m,g]=Y.useState(1),[y,v]=Y.useState(!1),[d,_]=Y.useState(""),S=Y.useMemo(()=>{const I=new Set(e.map(P=>P.id)),C=s.trim().toLowerCase();return i.filter(P=>I.has(P.schoolId)).filter(P=>!o||P.schoolId===Number(o)).filter(P=>!c||P.form===c).filter(P=>!p||P.gender===p).filter(P=>!C||P.name.toLowerCase().includes(C)||P.regNo.toLowerCase().includes(C))},[i,s,o,c,p,t]),M=Math.max(1,Math.ceil(S.length/zu)),R=Math.min(m,M),A=S.slice((R-1)*zu,R*zu),x=I=>C=>{I(C.target.value),g(1)};function w(I){r(C=>[{...I,id:Date.now(),marks:{}},...C]),v(!1),_(`${I.name} was registered with number ${I.regNo}.`)}return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"page-head",children:[u.jsxs("div",{children:[u.jsx("h1",{children:"Students"}),u.jsxs("p",{className:"muted",children:[S.length," students"]})]}),u.jsxs("button",{className:"btn btn-primary",onClick:()=>{_(""),v(!0)},children:[u.jsx(Lr,{name:"plus",size:18})," Register student"]})]}),d&&u.jsx("div",{className:"notice notice-ok",role:"status",children:d}),u.jsxs("div",{className:"toolbar",children:[u.jsx("input",{className:"input grow",placeholder:"Search by name or registration number",value:s,onChange:x(a),"aria-label":"Search students"}),e.length>1&&u.jsxs("select",{className:"input",value:o,onChange:x(l),"aria-label":"School",children:[u.jsx("option",{value:"",children:"All schools"}),e.map(I=>u.jsx("option",{value:I.id,children:I.name},I.id))]}),u.jsxs("select",{className:"input",value:c,onChange:x(f),"aria-label":"Class",children:[u.jsx("option",{value:"",children:"All classes"}),Ah.map(I=>u.jsx("option",{children:I},I))]}),u.jsxs("select",{className:"input",value:p,onChange:x(h),"aria-label":"Gender",children:[u.jsx("option",{value:"",children:"Girls and boys"}),u.jsx("option",{value:"F",children:"Girls"}),u.jsx("option",{value:"M",children:"Boys"})]})]}),u.jsx("div",{className:"card flush table-wrap",children:u.jsxs("table",{className:"table",children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Reg. number"}),u.jsx("th",{children:"Name"}),u.jsx("th",{children:"Gender"}),u.jsx("th",{children:"Class"}),u.jsx("th",{children:"School"})]})}),u.jsxs("tbody",{children:[A.map(I=>u.jsxs("tr",{children:[u.jsx("td",{children:I.regNo}),u.jsx("td",{children:I.name}),u.jsx("td",{children:I.gender==="F"?"Girl":"Boy"}),u.jsxs("td",{children:[I.form,I.combination?` (${I.combination})`:""]}),u.jsx("td",{children:n(I.schoolId)})]},I.id)),A.length===0&&u.jsx("tr",{children:u.jsx("td",{colSpan:"5",className:"empty",children:"No students match. Clear the search or filters, or register a new student."})})]})]})}),u.jsxs("div",{className:"pager",children:[u.jsxs("span",{className:"muted",children:["Page ",R," of ",M]}),u.jsxs("div",{children:[u.jsx("button",{className:"btn",disabled:R<=1,onClick:()=>g(R-1),children:"Previous"}),u.jsx("button",{className:"btn",disabled:R>=M,onClick:()=>g(R+1),children:"Next"})]})]}),y&&u.jsx(EC,{schools:e,existing:i,onSave:w,onClose:()=>v(!1)})]})}function EC({schools:t,existing:e,onSave:n,onClose:i}){var R;const[r,s]=Y.useState(""),[a,o]=Y.useState(""),[l,c]=Y.useState("Form 1"),[f,p]=Y.useState(String(((R=t[0])==null?void 0:R.id)??"")),[h,m]=Y.useState(""),[g,y]=Y.useState({}),v=Di.find(A=>A.id===Number(f)),d=l==="Form 5"||l==="Form 6",_=e.filter(A=>A.schoolId===Number(f)).length+1,S=v?`${v.code}/${String(_).padStart(4,"0")}`:"";function M(A){A.preventDefault();const x={};r.trim().split(/\s+/).length<2&&(x.name="Enter at least two names, for example “Asha Bakari”."),a||(x.gender="Choose girl or boy."),d&&!h&&(x.combination="Choose a subject combination for A-level students."),y(x),!Object.keys(x).length&&n({name:r.trim(),gender:a,form:l,schoolId:Number(f),combination:d?h:null,regNo:S})}return u.jsx(yC,{title:"Register student",onClose:i,children:u.jsxs("form",{onSubmit:M,noValidate:!0,className:"form-grid",children:[u.jsxs("label",{className:"field span-2",children:[u.jsx("span",{children:"Full name"}),u.jsx("input",{value:r,onChange:A=>s(A.target.value),autoFocus:!0}),g.name&&u.jsx("em",{className:"field-error",children:g.name})]}),u.jsxs("label",{className:"field",children:[u.jsx("span",{children:"Gender"}),u.jsxs("select",{value:a,onChange:A=>o(A.target.value),children:[u.jsx("option",{value:"",children:"Choose…"}),u.jsx("option",{value:"F",children:"Girl"}),u.jsx("option",{value:"M",children:"Boy"})]}),g.gender&&u.jsx("em",{className:"field-error",children:g.gender})]}),u.jsxs("label",{className:"field",children:[u.jsx("span",{children:"Class"}),u.jsx("select",{value:l,onChange:A=>c(A.target.value),children:Ah.map(A=>u.jsx("option",{children:A},A))})]}),t.length>1&&u.jsxs("label",{className:"field span-2",children:[u.jsx("span",{children:"School"}),u.jsx("select",{value:f,onChange:A=>p(A.target.value),children:t.map(A=>u.jsx("option",{value:A.id,children:A.name},A.id))})]}),d&&u.jsxs("label",{className:"field span-2",children:[u.jsx("span",{children:"Subject combination"}),u.jsxs("select",{value:h,onChange:A=>m(A.target.value),children:[u.jsx("option",{value:"",children:"Choose…"}),bM.map(A=>u.jsx("option",{children:A},A))]}),g.combination&&u.jsx("em",{className:"field-error",children:g.combination})]}),u.jsxs("p",{className:"span-2 muted",children:["Registration number will be ",u.jsx("strong",{children:S})]}),u.jsxs("div",{className:"span-2 modal-actions",children:[u.jsx("button",{type:"button",className:"btn",onClick:i,children:"Cancel"}),u.jsx("button",{className:"btn btn-primary",children:"Register student"})]})]})})}const Xi="ABS";function TC(){const{user:t}=Yr(),e=Pc(t,Di),n=t.role==="teacher"?bs.filter(C=>t.subjects.includes(C.code)):bs,[i,r]=Y.useState(e[0].id),[s,a]=Y.useState("Form 4"),[o,l]=Y.useState(n[0].code),[c,f]=Y.useState({}),[p,h]=Y.useState(!1),[m,g]=Y.useState(null),y=Y.useRef(null),v=Y.useMemo(()=>ao.filter(C=>C.schoolId===Number(i)&&C.form===s),[i,s]),d=C=>`${C.id}|${o}`,_=C=>{const P=d(C);if(P in c)return c[P];const O=C.marks[o];return O===Xi?Xi:O==null?"":String(O)},S=(C,P)=>{g(null),f(O=>({...O,[d(C)]:P}))},M=v.map(C=>{const P=_(C),O=P===Xi,X=O?{ok:!0,value:null}:AM(P);return{s:C,v:P,absent:O,...X}}),R={entered:M.filter(C=>C.ok&&C.value!==null).length,absent:M.filter(C=>C.absent).length,missing:M.filter(C=>C.ok&&!C.absent&&C.value===null).length,invalid:M.filter(C=>!C.ok).length};function A(C){var P;(P=document.querySelector(`[data-row="${C}"]`))==null||P.focus()}function x(C,P){C.key==="Enter"&&(C.preventDefault(),A(P+1))}async function w(){h(!0);try{const C=M.map(X=>({studentId:X.s.id,mark:X.absent?Xi:X.value})),P=await zM({schoolId:i,form:s,subject:o,exam:kd.id,rows:C}),O=bs.find(X=>X.code===o).name;g({tone:"ok",text:`Saved ${P.saved} entries for ${O}, ${s}.`})}catch(C){g({tone:"bad",text:C.message})}finally{h(!1)}}function I(C){var X;const P=(X=C.target.files)==null?void 0:X[0];if(!P)return;const O=new FileReader;O.onload=()=>{const D=String(O.result).split(/\r?\n/).map(B=>B.trim()).filter(Boolean),$={},Q=[];let G=0;D.forEach((B,F)=>{const[V,K]=B.split(",").map(be=>be==null?void 0:be.trim());if(F===0&&Number.isNaN(Number(K))&&(K==null?void 0:K.toUpperCase())!==Xi)return;const de=v.find(be=>be.regNo.toUpperCase()===(V||"").toUpperCase());if(!de){Q.push(V);return}$[d(de)]=(K==null?void 0:K.toUpperCase())===Xi?Xi:K??"",G++}),f(B=>({...B,...$})),g({tone:Q.length?"warn":"ok",text:`Imported ${G} marks. Review them below, then save.`+(Q.length?` ${Q.length} rows did not match a student in this class: ${Q.slice(0,4).join(", ")}${Q.length>4?"…":""}`:"")})},O.readAsText(P),C.target.value=""}return u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"page-head",children:u.jsxs("div",{children:[u.jsx("h1",{children:"Marks entry"}),u.jsx("p",{className:"muted",children:kd.name})]})}),u.jsxs("div",{className:"toolbar",children:[e.length>1&&u.jsx("select",{className:"input",value:i,onChange:C=>r(C.target.value),"aria-label":"School",children:e.map(C=>u.jsx("option",{value:C.id,children:C.name},C.id))}),u.jsx("select",{className:"input",value:s,onChange:C=>a(C.target.value),"aria-label":"Class",children:Ah.map(C=>u.jsx("option",{children:C},C))}),u.jsx("select",{className:"input",value:o,onChange:C=>l(C.target.value),"aria-label":"Subject",children:n.map(C=>u.jsx("option",{value:C.code,children:C.name},C.code))}),u.jsx("span",{className:"grow"}),u.jsx("input",{ref:y,type:"file",accept:".csv,text/csv",hidden:!0,onChange:I}),u.jsxs("button",{className:"btn",onClick:()=>y.current.click(),children:[u.jsx(Lr,{name:"upload",size:18})," Import CSV"]})]}),u.jsxs("p",{className:"hint",children:["Maximum mark is ",nr.maxMark,". Press Enter to move to the next student. CSV format: registration number, mark (use ABS for absent)."]}),m&&u.jsx("div",{className:`notice notice-${m.tone}`,role:"status",children:m.text}),u.jsxs("div",{className:"summary",children:[u.jsxs("span",{children:[u.jsx("strong",{children:R.entered})," entered"]}),u.jsxs("span",{children:[u.jsx("strong",{children:R.missing})," missing"]}),u.jsxs("span",{children:[u.jsx("strong",{children:R.absent})," absent"]}),u.jsxs("span",{className:R.invalid?"text-bad":"",children:[u.jsx("strong",{children:R.invalid})," with errors"]})]}),u.jsx("div",{className:"card flush table-wrap",children:u.jsxs("table",{className:"table",children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Reg. number"}),u.jsx("th",{children:"Name"}),u.jsx("th",{className:"num",children:"Mark"}),u.jsx("th",{children:"Grade"}),u.jsx("th",{children:"Absent"})]})}),u.jsxs("tbody",{children:[M.map((C,P)=>{var X;const O=C.absent?"ABS":((X=Jl(C.value))==null?void 0:X.grade)??"–";return u.jsxs("tr",{className:C.ok?"":"row-bad",children:[u.jsx("td",{children:C.s.regNo}),u.jsx("td",{children:C.s.name}),u.jsxs("td",{className:"num",children:[u.jsx("input",{className:`mark-input ${C.ok?"":"is-invalid"}`,"data-row":P,inputMode:"decimal",value:C.absent?"":C.v,disabled:C.absent,onChange:D=>S(C.s,D.target.value),onKeyDown:D=>x(D,P),"aria-label":`Mark for ${C.s.name}`,"aria-invalid":!C.ok}),!C.ok&&u.jsx("em",{className:"field-error",children:C.error})]}),u.jsx("td",{children:u.jsx("span",{className:`grade grade-${O}`,children:O})}),u.jsx("td",{children:u.jsx("input",{type:"checkbox",checked:C.absent,onChange:D=>S(C.s,D.target.checked?Xi:""),"aria-label":`${C.s.name} was absent`})})]},C.s.id)}),M.length===0&&u.jsx("tr",{children:u.jsxs("td",{colSpan:"5",className:"empty",children:["There are no students in ",s," at this school. Register students first."]})})]})]})}),u.jsxs("div",{className:"save-bar",children:[u.jsx("span",{className:"muted",children:R.invalid?"Fix the marks with errors before saving.":"Nothing is final until the head of school approves the results."}),u.jsx("button",{className:"btn btn-primary",disabled:p||R.invalid>0||M.length===0,onClick:w,children:p?"Saving…":"Save marks"})]})]})}const wC=[{id:"csee",title:"CSEE",name:"Certificate of Secondary Education Examination",note:"Ordinary level examination"},{id:"acsee",title:"ACSEE",name:"Advanced Certificate of Secondary Education Examination",note:"Advanced level examination"}];function AC(){return u.jsxs("div",{className:"exam-picker",children:[u.jsx("header",{className:"picker-header",children:u.jsxs("div",{className:"picker-header-inner",children:[u.jsxs(ot,{className:"picker-title",to:"/results",children:[u.jsx("span",{className:"picker-mark",children:"K"}),u.jsxs("span",{children:["KIGOMA REGION ",u.jsx("small",{children:"RESULTS PORTAL"})]})]}),u.jsxs("nav",{children:[u.jsx(ot,{to:"/",children:"Home"}),u.jsx("span",{children:"/"}),u.jsx(ot,{to:"/results",children:"Results"})]})]})}),u.jsxs("main",{className:"picker-main",children:[u.jsxs("div",{className:"picker-steps",children:[u.jsx("span",{className:"is-active",children:"1"}),u.jsx("b",{children:"Examination type"}),u.jsx("i",{}),u.jsx("span",{children:"2"}),u.jsx("b",{children:"Year"}),u.jsx("i",{}),u.jsx("span",{children:"3"}),u.jsx("b",{children:"Centre"})]}),u.jsxs("div",{className:"picker-intro",children:[u.jsx("p",{children:"Kigoma Regional Examination Results"}),u.jsx("h1",{children:"Choose examination type"}),u.jsx("span",{children:"Select the examination you want to view results for"})]}),u.jsx("section",{className:"exam-cards exam-type-cards","aria-label":"Examination types",children:wC.map(t=>u.jsxs(ot,{className:"exam-card",to:`/results/type/${t.id}`,children:[u.jsx("div",{className:"exam-icon","aria-hidden":"true",children:u.jsxs("span",{className:"document-icon",children:[u.jsx("i",{}),u.jsx("i",{}),u.jsx("i",{})]})}),u.jsxs("div",{className:"exam-card-copy",children:[u.jsx("span",{className:"exam-eyebrow",children:"EXAMINATION"}),u.jsx("h2",{children:t.title}),u.jsx("p",{className:"exam-name",children:t.name}),u.jsx("p",{className:"exam-note",children:t.note})]}),u.jsxs("span",{className:"exam-link",children:["View results ",u.jsx("b",{"aria-hidden":"true",children:"→"})]})]},t.id))})]}),u.jsxs("footer",{className:"picker-footer",children:["National Examinations Council of Tanzania ",u.jsx("span",{children:"·"})," Public results portal"]})]})}const RC="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");function Sg(){const{type:t="csee",year:e}=Cc(),n=qs(),[i,r]=Y.useState(null),[s,a]=Y.useState(""),[o,l]=Y.useState(""),[c,f]=Y.useState(!1),[p,h]=Y.useState(""),[m,g]=Y.useState("");Y.useEffect(()=>{HM().then(r)},[]);const y=Y.useMemo(()=>[...new Set((i||[]).map(S=>S.council))].sort(),[i]),v=Y.useMemo(()=>{const S=s.trim().toLowerCase();return(i||[]).filter(R=>!o||R.council===o).filter(R=>!S||`${R.name} ${R.code}`.toLowerCase().includes(S)).sort((R,A)=>R.name.localeCompare(A.name)).reduce((R,A)=>{var x;return(R[x=A.name[0].toUpperCase()]||(R[x]=[])).push(A),R},{})},[i,s,o]),d=Object.values(v).flat();function _(S){S.preventDefault();const M=p.trim().toUpperCase();if(!/^S\d{4}\/\d{4}$/.test(M)){g("Enter the index number in this format: S0101/0001");return}g(""),n(`/results/type/${t}/year/${e}/candidate?cno=${encodeURIComponent(M)}`)}return u.jsxs("div",{className:"regional-results",children:[u.jsx("header",{className:"regional-header",children:u.jsxs("div",{className:"regional-header-inner",children:[u.jsxs(ot,{className:"regional-brand",to:"/results",children:[u.jsx("span",{className:"regional-logo",children:"K"}),u.jsxs("span",{children:[u.jsx("strong",{children:"KIGOMA REGION"}),u.jsx("small",{children:"EXAMINATION RESULTS PORTAL"})]})]}),u.jsxs("nav",{children:[u.jsx(ot,{to:"/",children:"Home"}),u.jsx("span",{children:"/"}),u.jsx(ot,{to:"/results",children:"Results"}),u.jsx("span",{children:"/"}),u.jsxs("b",{children:[t.toUpperCase()," ",e]})]})]})}),u.jsxs("main",{className:"regional-main",children:[u.jsxs("div",{className:"regional-hero",children:[u.jsxs("div",{children:[u.jsxs("p",{className:"regional-eyebrow",children:["KIGOMA REGIONAL EXAMINATIONS · ",t.toUpperCase()," ",e]}),u.jsx("h1",{children:"Examination results"}),u.jsx("p",{children:"Choose an examination centre or find one candidate’s result directly."})]}),u.jsx("div",{className:"regional-actions",children:u.jsx("button",{type:"button",onClick:()=>f(S=>!S),children:c?"Close search":"Search by index number"})})]}),c&&u.jsxs("form",{className:"index-search-panel",onSubmit:_,noValidate:!0,children:[u.jsxs("div",{children:[u.jsx("strong",{children:"Find a candidate result"}),u.jsx("span",{children:"Enter the candidate’s index number to view an individual result slip."})]}),u.jsxs("div",{className:"index-search-fields",children:[u.jsxs("label",{htmlFor:"index-number",children:["Index number",u.jsx("input",{id:"index-number",value:p,onChange:S=>h(S.target.value),placeholder:"S0101/0001",autoFocus:!0})]}),u.jsxs("button",{type:"submit",children:["View result ",u.jsx("b",{"aria-hidden":"true",children:"→"})]})]}),m&&u.jsx("p",{role:"alert",children:m})]}),u.jsxs("section",{className:"centre-directory",children:[u.jsxs("div",{className:"directory-heading",children:[u.jsxs("div",{children:[u.jsx("p",{className:"regional-eyebrow",children:"CENTRE DIRECTORY"}),u.jsx("h2",{children:"Select examination centre"})]}),u.jsxs("span",{className:"directory-count",children:[d.length," centres"]})]}),u.jsxs("div",{className:"directory-toolbar",children:[u.jsxs("label",{className:"directory-search",children:[u.jsx("span",{children:"Search by centre name or number"}),u.jsx("input",{value:s,onChange:S=>a(S.target.value),placeholder:"e.g. Lakeview Secondary or S0101"})]}),u.jsxs("label",{className:"directory-council",children:[u.jsx("span",{children:"Council"}),u.jsxs("select",{value:o,onChange:S=>l(S.target.value),children:[u.jsx("option",{value:"",children:"All councils"}),y.map(S=>u.jsx("option",{children:S},S))]})]})]}),u.jsx("nav",{className:"regional-letters","aria-label":"Centres A to Z",children:RC.map(S=>v[S]?u.jsx("a",{href:`#letter-${S}`,children:S},S):u.jsx("span",{children:S},S))}),!i&&u.jsx("div",{className:"directory-empty",children:"Loading examination centres…"}),i&&!d.length&&u.jsx("div",{className:"directory-empty",children:"No centre matches your search. Try a different name or council."}),u.jsx("div",{className:"centre-grid",children:Object.keys(v).sort().map(S=>u.jsxs("div",{id:`letter-${S}`,className:"centre-letter-group",children:[u.jsx("h3",{children:S}),v[S].map(M=>u.jsxs(ot,{className:"centre-card",to:`/results/${M.code}?year=${e}&type=${t}`,children:[u.jsx("span",{className:"centre-code",children:M.code}),u.jsx("strong",{children:M.name}),u.jsxs("small",{children:[M.council," ",u.jsx("span",{children:"·"})," ",M.ownership]}),u.jsxs("span",{className:"centre-view",children:["View results ",u.jsx("b",{children:"→"})]})]},M.code))]},S))})]})]})]})}const CC=["2025","2024","2023"];function bC(){const{type:t}=Cc(),e=t.toUpperCase();return u.jsxs("div",{className:"exam-picker",children:[u.jsx("header",{className:"picker-header",children:u.jsxs("div",{className:"picker-header-inner",children:[u.jsxs(ot,{className:"picker-title",to:"/results",children:[u.jsx("span",{className:"picker-mark",children:"K"}),u.jsxs("span",{children:["KIGOMA REGION ",u.jsx("small",{children:"RESULTS PORTAL"})]})]}),u.jsxs("nav",{children:[u.jsx(ot,{to:"/",children:"Home"}),u.jsx("span",{children:"/"}),u.jsx(ot,{to:"/results",children:"Results"}),u.jsx("span",{children:"/"}),u.jsx("span",{children:e})]})]})}),u.jsxs("main",{className:"picker-main",children:[u.jsxs("div",{className:"picker-steps",children:[u.jsx("span",{className:"is-done",children:"✓"}),u.jsx("b",{children:"Examination type"}),u.jsx("i",{}),u.jsx("span",{className:"is-active",children:"2"}),u.jsx("b",{children:"Year"}),u.jsx("i",{}),u.jsx("span",{children:"3"}),u.jsx("b",{children:"Centre"})]}),u.jsxs("div",{className:"picker-intro",children:[u.jsxs("p",{children:["KIGOMA REGIONAL RESULTS · ",e]}),u.jsx("h1",{children:"Choose examination year"}),u.jsx("span",{children:"Select a year to continue to examination centres"})]}),u.jsx("section",{className:"exam-cards year-cards","aria-label":`${e} examination years`,children:CC.map(n=>u.jsxs(ot,{className:"exam-card",to:`/results/type/${t}/year/${n}`,children:[u.jsx("div",{className:"exam-icon","aria-hidden":"true",children:u.jsxs("span",{className:"document-icon",children:[u.jsx("i",{}),u.jsx("i",{}),u.jsx("i",{})]})}),u.jsxs("div",{className:"exam-card-copy",children:[u.jsxs("span",{className:"exam-eyebrow",children:[e," RESULTS"]}),u.jsx("h2",{children:n}),u.jsx("p",{className:"exam-name",children:"Examination results"})]}),u.jsxs("span",{className:"exam-link",children:["View results ",u.jsx("b",{"aria-hidden":"true",children:"→"})]})]},n))}),u.jsx("p",{className:"picker-back",children:u.jsx(ot,{to:"/results",children:"← Choose another examination type"})})]})]})}function NC(){const{code:t}=Cc(),[e]=X0(),n=e.get("year")||"2025",i=e.get("type")||"csee",r=(e.get("cno")||"").toUpperCase(),[s,a]=Y.useState(void 0);if(Y.useEffect(()=>{a(void 0),VM(t).then(a)},[t]),Y.useEffect(()=>{var g;!s||!r||(g=document.getElementById(`c-${r.replace("/","-")}`))==null||g.scrollIntoView({block:"center"})},[s,r]),s===void 0)return u.jsx("div",{className:"necta",children:u.jsx("main",{className:"necta-page",children:u.jsx("p",{className:"necta-note",children:"Loading results…"})})});if(s===null)return u.jsx("div",{className:"necta",children:u.jsxs("main",{className:"necta-page",children:[u.jsx("h1",{className:"necta-title",children:"CENTRE NOT FOUND"}),u.jsxs("p",{className:"necta-note",children:["There is no school with centre number ",t.toUpperCase(),". ",u.jsx(ot,{to:"/results",children:"Go back to the list of schools"}),"."]})]})});const{school:o,candidates:l,divisionSummary:c,summary:f,subjects:p,gpa:h}=s,m=r&&l.some(g=>g.cno===r);return u.jsxs("div",{className:"result-page",children:[u.jsxs("div",{className:"necta-banner no-print",children:[u.jsxs(ot,{className:"necta-brand",to:"/results",children:[u.jsx("span",{className:"regional-mark",children:"K"}),u.jsx("span",{children:"KIGOMA REGIONAL EXAMINATIONS RESULTS"})]}),u.jsxs("span",{className:"necta-banner-actions",children:[u.jsx("span",{children:"Kigoma Region"}),u.jsx(ot,{to:`/results/type/${i}/year/${n}`,children:"All centres"}),u.jsx("button",{type:"button",className:"necta-linkbtn",onClick:()=>window.print(),children:"Print page"})]})]}),u.jsxs("main",{className:"necta-page",children:[u.jsxs("div",{className:"necta-page-intro centre-intro",children:[u.jsxs("h1",{className:"necta-title",children:[i.toUpperCase()," ",n," EXAMINATION RESULTS"]}),u.jsxs("h2",{className:"necta-centre",children:[o.code," ",o.name.toUpperCase()]})]}),r&&!m&&u.jsxs("p",{className:"necta-error",role:"alert",children:["Candidate ",r," was not found at this centre. Check the number and try again."]}),u.jsx("h3",{className:"table-title",children:"DIVISION PERFORMANCE SUMMARY"}),u.jsx("div",{className:"necta-scroll narrow-scroll division-scroll",children:u.jsxs("table",{className:"necta-table narrow",children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"SEX"}),Ms.map(g=>u.jsx("th",{children:g},g)),u.jsx("th",{children:"INC"})]})}),u.jsx("tbody",{children:c.map(g=>u.jsxs("tr",{children:[u.jsx("td",{children:g.sex}),Ms.map(y=>u.jsx("td",{children:g[y]},y)),u.jsx("td",{children:g.INC})]},g.sex))})]})}),u.jsx("h3",{className:"table-title",children:"CANDIDATES’ RESULTS"}),u.jsx("div",{className:"necta-scroll",children:u.jsxs("table",{className:"necta-table",children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"CNO"}),u.jsx("th",{children:"SEX"}),u.jsx("th",{children:"AGGT"}),u.jsx("th",{children:"DIV"}),u.jsx("th",{className:"left",children:"DETAILED SUBJECTS"})]})}),u.jsx("tbody",{children:l.map(g=>u.jsxs("tr",{id:`c-${g.cno.replace("/","-")}`,className:g.cno===r?"is-found":"",children:[u.jsx("td",{className:"nowrap",children:g.cno}),u.jsx("td",{children:g.sex}),u.jsx("td",{children:g.aggt}),u.jsx("td",{children:g.div}),u.jsx("td",{className:"left detail",children:g.detail})]},g.cno))})]})}),u.jsx("h3",{className:"table-title",children:"EXAMINATION CENTRE SUMMARY"}),u.jsx("div",{className:"necta-scroll narrow-scroll summary-scroll",children:u.jsxs("table",{className:"necta-table narrow",children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"REGIST"}),u.jsx("th",{children:"ABSENT"}),u.jsx("th",{children:"SAT"}),u.jsx("th",{children:"WITHHELD"}),u.jsx("th",{children:"NO-CA"}),u.jsx("th",{children:"CLEAN"}),Ms.map(g=>u.jsxs("th",{children:["DIV ",g]},g)),u.jsx("th",{children:"INC"})]})}),u.jsx("tbody",{children:u.jsxs("tr",{children:[u.jsx("td",{children:f.registered}),u.jsx("td",{children:f.absent}),u.jsx("td",{children:f.sat}),u.jsx("td",{children:f.withheld}),u.jsx("td",{children:f.noCa}),u.jsx("td",{children:f.clean}),Ms.map(g=>u.jsx("td",{children:f[g]},g)),u.jsx("td",{children:f.INC})]})})]})}),u.jsx("h3",{className:"table-title",children:"EXAMINATION CENTRE SUBJECTS PERFORMANCE"}),u.jsx("div",{className:"necta-scroll",children:u.jsxs("table",{className:"necta-table",children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"CODE"}),u.jsx("th",{className:"left",children:"SUBJECT NAME"}),u.jsx("th",{children:"REG"}),u.jsx("th",{children:"SAT"}),u.jsx("th",{children:"NO-CA"}),u.jsx("th",{children:"W/HD"}),u.jsx("th",{children:"CLEAN"}),u.jsx("th",{children:"PASS"}),u.jsx("th",{children:"A"}),u.jsx("th",{children:"B"}),u.jsx("th",{children:"C"}),u.jsx("th",{children:"D"}),u.jsx("th",{children:"F"})]})}),u.jsx("tbody",{children:p.map(g=>u.jsxs("tr",{children:[u.jsx("td",{children:g.code}),u.jsx("td",{className:"left",children:g.name}),u.jsx("td",{children:g.reg}),u.jsx("td",{children:g.sat}),u.jsx("td",{children:g.noCa}),u.jsx("td",{children:g.withheld}),u.jsx("td",{children:g.clean}),u.jsx("td",{children:g.pass}),["A","B","C","D","F"].map(y=>u.jsx("td",{children:g.grades[y]},y))]},g.code))})]})})]})]})}function PC(){const{type:t="csee",year:e}=Cc(),[n]=X0(),i=(n.get("cno")||"").toUpperCase(),[r,s]=Y.useState(void 0);return Y.useEffect(()=>{s(void 0),GM(i).then(s)},[i]),u.jsxs("div",{className:"candidate-page",children:[u.jsx("header",{className:"regional-header",children:u.jsxs("div",{className:"regional-header-inner",children:[u.jsxs(ot,{className:"regional-brand",to:"/results",children:[u.jsx("span",{className:"regional-logo",children:"K"}),u.jsxs("span",{children:[u.jsx("strong",{children:"KIGOMA REGION"}),u.jsx("small",{children:"EXAMINATION RESULTS PORTAL"})]})]}),u.jsx("nav",{children:u.jsx(ot,{to:`/results/type/${t}/year/${e}`,children:"All centres"})})]})}),u.jsxs("main",{className:"candidate-main",children:[u.jsxs("div",{className:"candidate-top",children:[u.jsxs("div",{children:[u.jsxs("p",{className:"regional-eyebrow",children:["KIGOMA REGIONAL EXAMINATIONS · ",t.toUpperCase()," ",e]}),u.jsx("h1",{children:"Candidate result"}),u.jsx("p",{children:"Individual examination result slip"})]}),u.jsx(ot,{className:"candidate-back",to:`/results/type/${t}/year/${e}`,children:"← All centres"})]}),r===void 0&&u.jsxs("div",{className:"candidate-state",children:["Searching for ",u.jsx("strong",{children:i}),"…"]}),r===null&&u.jsxs("div",{className:"candidate-state candidate-error",children:[u.jsx("strong",{children:"Result not found"}),u.jsxs("span",{children:["No result was found for index number ",i,". Check the number and try again."]}),u.jsx(ot,{to:`/results/type/${t}/year/${e}`,children:"Return to centre directory"})]}),r&&u.jsx(LC,{result:r,cno:i})]})]})}function LC({result:t,cno:e}){const{student:n}=t;return u.jsxs("section",{className:"candidate-slip",children:[u.jsxs("div",{className:"slip-heading",children:[u.jsxs("div",{children:[u.jsx("p",{className:"regional-eyebrow",children:"OFFICIAL RESULT SLIP"}),u.jsx("h2",{children:n.name}),u.jsxs("span",{children:[e," · ",n.form]})]}),u.jsxs("div",{className:`slip-division ${t.pass?"is-pass":"is-fail"}`,children:[u.jsx("small",{children:"DIVISION"}),u.jsx("strong",{children:t.division})]})]}),u.jsxs("div",{className:"candidate-summary",children:[u.jsxs("div",{children:[u.jsx("span",{children:"Sex"}),u.jsx("strong",{children:n.gender==="F"?"Female":"Male"})]}),u.jsxs("div",{children:[u.jsx("span",{children:"Points"}),u.jsx("strong",{children:t.points||"—"})]}),u.jsxs("div",{children:[u.jsx("span",{children:"GPA"}),u.jsx("strong",{children:t.gpa.toFixed(2)})]}),u.jsxs("div",{children:[u.jsx("span",{children:"Status"}),u.jsx("strong",{children:t.pass?"Passed":"Incomplete"})]})]}),u.jsx("h3",{children:"Subject results"}),u.jsx("div",{className:"candidate-table-wrap",children:u.jsxs("table",{className:"candidate-table",children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Subject"}),u.jsx("th",{children:"Mark"}),u.jsx("th",{children:"Grade"})]})}),u.jsx("tbody",{children:t.subjects.map(i=>u.jsxs("tr",{children:[u.jsx("td",{children:i.name}),u.jsx("td",{children:typeof i.mark=="number"?i.mark:i.mark||"—"}),u.jsx("td",{children:i.grade})]},i.code))})]})}),u.jsx("button",{className:"print-result",type:"button",onClick:()=>window.print(),children:"Print result"})]})}function IC(){return u.jsxs(uM,{children:[u.jsx(en,{path:"/login",element:u.jsx(KM,{})}),u.jsx(en,{path:"/",element:u.jsx(mC,{})}),u.jsx(en,{path:"/results",element:u.jsx(AC,{})}),u.jsx(en,{path:"/results/type/:type",element:u.jsx(bC,{})}),u.jsx(en,{path:"/results/type/:type/year/:year",element:u.jsx(Sg,{})}),u.jsx(en,{path:"/results/type/:type/year/:year/candidate",element:u.jsx(PC,{})}),u.jsx(en,{path:"/results/year/:year",element:u.jsx(Sg,{})}),u.jsx(en,{path:"/results/:code",element:u.jsx(NC,{})}),u.jsxs(en,{element:u.jsx(Io,{children:u.jsx(YM,{})}),children:[u.jsx(en,{path:"dashboard",element:u.jsx(xC,{})}),u.jsx(en,{path:"schools",element:u.jsx(Io,{roles:["regional_admin","council_admin"],children:u.jsx(SC,{})})}),u.jsx(en,{path:"students",element:u.jsx(Io,{roles:["regional_admin","council_admin","school_admin"],children:u.jsx(MC,{})})}),u.jsx(en,{path:"marks",element:u.jsx(Io,{roles:["school_admin","teacher"],children:u.jsx(TC,{})})})]}),u.jsx(en,{path:"*",element:u.jsx(Kl,{to:"/",replace:!0})})]})}Gu.createRoot(document.getElementById("root")).render(u.jsx(Pg.StrictMode,{children:u.jsx(xM,{children:u.jsx(WM,{children:u.jsx(IC,{})})})}));
