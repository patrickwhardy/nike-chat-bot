(window.webpackJsonp=window.webpackJsonp||[]).push([["smoothScroll"],{1182:function(o,t,l){"use strict";l.r(t),function(o){function t(o){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o})(o)}l(20),l(8),l(155),function(){function l(){function o(o,t){this.scrollLeft=o,this.scrollTop=t}function l(o){if(null===o||"object"!=t(o)||void 0===o.behavior||"auto"===o.behavior||"instant"===o.behavior)return!0;if("object"==t(o)&&"smooth"===o.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+o.behavior+" is not a valid value for enumeration ScrollBehavior.")}function e(o,t){return"Y"===t?o.clientHeight+u<o.scrollHeight:"X"===t?o.clientWidth+u<o.scrollWidth:void 0}function r(o,t){var l=c.getComputedStyle(o,null)["overflow"+t];return"auto"===l||"scroll"===l}function i(o){var t,l,e,r,s=(h()-o.startTime)/a;r=s=s>1?1:s,t=.5*(1-Math.cos(Math.PI*r)),l=o.startX+(o.x-o.startX)*t,e=o.startY+(o.y-o.startY)*t,o.method.call(o.scrollable,l,e),l===o.x&&e===o.y||c.requestAnimationFrame(i.bind(c,o))}function s(t,l,e){var r,s,f,p,a=h();t===n.body?(r=c,s=c.scrollX||c.pageXOffset,f=c.scrollY||c.pageYOffset,p=d.scroll):(r=t,s=t.scrollLeft,f=t.scrollTop,p=o),i({scrollable:r,method:p,startTime:a,startX:s,startY:f,x:l,y:e})}var c=window,n=document;if(!("scrollBehavior"in n.documentElement.style&&!0!==c.__forceSmoothScrollPolyfill__)){var f,p=c.HTMLElement||c.Element,a=468,d={scroll:c.scroll||c.scrollTo,scrollBy:c.scrollBy,elementScroll:p.prototype.scroll||o,scrollIntoView:p.prototype.scrollIntoView},h=c.performance&&c.performance.now?c.performance.now.bind(c.performance):Date.now,u=(f=c.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(f)?1:0);c.scroll=c.scrollTo=function(){void 0!==arguments[0]&&(!0!==l(arguments[0])?s.call(c,n.body,void 0!==arguments[0].left?~~arguments[0].left:c.scrollX||c.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:c.scrollY||c.pageYOffset):d.scroll.call(c,void 0!==arguments[0].left?arguments[0].left:"object"!=t(arguments[0])?arguments[0]:c.scrollX||c.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:c.scrollY||c.pageYOffset))},c.scrollBy=function(){void 0!==arguments[0]&&(l(arguments[0])?d.scrollBy.call(c,void 0!==arguments[0].left?arguments[0].left:"object"!=t(arguments[0])?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):s.call(c,n.body,~~arguments[0].left+(c.scrollX||c.pageXOffset),~~arguments[0].top+(c.scrollY||c.pageYOffset)))},p.prototype.scroll=p.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==l(arguments[0])){var o=arguments[0].left,e=arguments[0].top;s.call(this,this,void 0===o?this.scrollLeft:~~o,void 0===e?this.scrollTop:~~e)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");d.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=t(arguments[0])?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},p.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==l(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):d.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},p.prototype.scrollIntoView=function(){if(!0!==l(arguments[0])){var o=function(o){for(;o!==n.body&&!1===(l=e(t=o,"Y")&&r(t,"Y"),i=e(t,"X")&&r(t,"X"),l||i);)o=o.parentNode||o.host;var t,l,i;return o}(this),t=o.getBoundingClientRect(),i=this.getBoundingClientRect();o!==n.body?(s.call(this,o,o.scrollLeft+i.left-t.left,o.scrollTop+i.top-t.top),"fixed"!==c.getComputedStyle(o).position&&c.scrollBy({left:t.left,top:t.top,behavior:"smooth"})):c.scrollBy({left:i.left,top:i.top,behavior:"smooth"})}else d.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}}"object"==("undefined"==typeof exports?"undefined":t(exports))&&void 0!==o?o.exports={polyfill:l}:l()}()}.call(this,l(661)(o))}}]);
//# sourceMappingURL=smoothScroll.e4eb67cb.js.map