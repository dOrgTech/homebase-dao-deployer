'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.debounce=void 0;const debounce=(callback,waitFor)=>{let timeout=0;return(...args)=>{let result;clearTimeout(timeout);timeout=setTimeout(()=>{result=callback(...args);},waitFor);return result;};};exports.debounce=debounce;