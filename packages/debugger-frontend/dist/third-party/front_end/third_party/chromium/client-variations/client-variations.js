const t={};function r(r){return t.parseClientVariations(r)}function i(r){return t.formatClientVariations(r)}(function(){var t=this||self;function r(r,i){r=r.split(".");var n,e=t;r[0]in e||void 0===e.execScript||e.execScript("var "+r[0]);for(;r.length&&(n=r.shift());)r.length||void 0===i?e=e[n]&&e[n]!==Object.prototype[n]?e[n]:e[n]={}:e[n]=i}function i(t,r){function i(){}i.prototype=r.prototype,t.m=r.prototype,t.prototype=new i,t.prototype.constructor=t,t.base=function(t,i,n){for(var e=Array(arguments.length-2),a=2;a<arguments.length;a++)e[a-2]=arguments[a];return r.prototype[i].apply(t,e)}}function n(t){if(Error.captureStackTrace)Error.captureStackTrace(this,n);else{const t=Error().stack;t&&(this.stack=t)}t&&(this.message=String(t))}function e(t,r){for(var i="",e=(t=t.split("%s")).length-1,a=0;a<e;a++)i+=t[a]+(a<r.length?r[a]:"%s");n.call(this,i+t[e])}function a(t,r){throw new e("Failure"+(t?": "+t:""),Array.prototype.slice.call(arguments,1))}function o(){this.a=""}function s(){this.l=""}function c(){this.j=""}function f(){this.a=""}i(n,Error),n.prototype.name="CustomError",i(e,n),e.prototype.name="AssertionError",o.prototype.toString=function(){return"SafeScript{"+this.a+"}"},o.prototype.g=function(t){this.a=t},(new o).g(""),s.prototype.toString=function(){return"SafeStyle{"+this.l+"}"},s.prototype.g=function(t){this.l=t},(new s).g(""),c.prototype.toString=function(){return"SafeStyleSheet{"+this.j+"}"},c.prototype.g=function(t){this.j=t},(new c).g(""),f.prototype.toString=function(){return"SafeHtml{"+this.a+"}"},f.prototype.g=function(t){this.a=t},(new f).g("<!DOCTYPE html>"),(new f).g(""),(new f).g("<br>");var h=null;function u(t){var r=t.length,i=3*r/4;i%3?i=Math.floor(i):-1!="=.".indexOf(t[r-1])&&(i=-1!="=.".indexOf(t[r-2])?i-2:i-1);var n=new Uint8Array(i),e=0;return function(t,r){function i(r){for(;n<t.length;){var i=t.charAt(n++),e=h[i];if(null!=e)return e;if(!/^[\s\xa0]*$/.test(i))throw Error("Unknown base64 encoding at char: "+i)}return r}!function(){if(!h){h={};for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),r=["+/=","+/","-_=","-_.","-_"],i=0;5>i;i++)for(var n=t.concat(r[i].split("")),e=0;e<n.length;e++){var a=n[e];void 0===h[a]&&(h[a]=e)}}}();for(var n=0;;){var e=i(-1),a=i(0),o=i(64),s=i(64);if(64===s&&-1===e)break;r(e<<2|a>>4),64!=o&&(r(a<<4&240|o>>2),64!=s&&r(o<<6&192|s))}}(t,(function(t){n[e++]=t})),n.subarray(0,e)}function p(t){this.b=null,this.a=this.h=this.i=0,t&&g(this,t)}var l=[];function g(t,r){t.b=function(t){return t.constructor===Uint8Array?t:t.constructor===ArrayBuffer||"undefined"!=typeof Buffer&&t.constructor===Buffer||t.constructor===Array?new Uint8Array(t):t.constructor===String?u(t):(a("Type not convertible to Uint8Array."),new Uint8Array(0))}(r),t.i=0,t.h=t.b.length,t.a=t.i}function v(t){if(l.length){var r=l.pop();t&&g(r,t),t=r}else t=new p(t);this.a=t,this.h=this.a.a,this.b=this.c=-1,this.f=!1}function y(t){var r=t.a;if(r.a==r.h)return!1;if((r=t.f)||(r=0>(r=t.a).a||r.a>r.h),r)return a("Decoder hit an error"),!1;t.h=t.a.a;var i=t.a.f();return r=i>>>3,0!=(i&=7)&&5!=i&&1!=i&&2!=i&&3!=i&&4!=i?(a("Invalid wire type: %s (at position %s)",i,t.h),t.f=!0,!1):(t.c=r,t.b=i,!0)}function b(t){switch(t.b){case 0:if(0!=t.b)a("Invalid wire type for skipVarintField"),b(t);else{for(t=t.a;128&t.b[t.a];)t.a++;t.a++}break;case 1:1!=t.b?(a("Invalid wire type for skipFixed64Field"),b(t)):(t=t.a).a+=8;break;case 2:if(2!=t.b)a("Invalid wire type for skipDelimitedField"),b(t);else{var r=t.a.f();(t=t.a).a+=r}break;case 5:5!=t.b?(a("Invalid wire type for skipFixed32Field"),b(t)):(t=t.a).a+=4;break;case 3:for(r=t.c;;){if(!y(t)){a("Unmatched start-group tag: stream EOF"),t.f=!0;break}if(4==t.b){t.c!=r&&(a("Unmatched end-group tag"),t.f=!0);break}b(t)}break;default:a("Invalid wire encoding for field.")}}function d(t,r){var i=t.a.f();i=t.a.a+i;for(var n=[];t.a.a<i;)n.push(r.call(t.a));return n}function w(){}p.prototype.reset=function(){this.a=this.i},p.prototype.f=function(){var t=this.b,r=t[this.a],i=127&r;return 128>r?(this.a+=1,i):(i|=(127&(r=t[this.a+1]))<<7,128>r?(this.a+=2,i):(i|=(127&(r=t[this.a+2]))<<14,128>r?(this.a+=3,i):(i|=(127&(r=t[this.a+3]))<<21,128>r?(this.a+=4,i):(i|=(15&(r=t[this.a+4]))<<28,128>r?(this.a+=5,i>>>0):(this.a+=5,128<=t[this.a++]&&128<=t[this.a++]&&128<=t[this.a++]&&128<=t[this.a++]&&this.a++,i)))))},p.prototype.c=p.prototype.f,v.prototype.reset=function(){this.a.reset(),this.b=this.c=-1};var k="function"==typeof Uint8Array,A=Object.freeze?Object.freeze([]):[];function S(t,r){if(r<t.c){r+=t.f;var i=t.a[r];return i===A?t.a[r]=[]:i}if(t.b)return(i=t.b[r])===A?t.b[r]=[]:i}function m(t){var r=t;t=I,r||(r=[]),this.f=-1,this.a=r;t:{if(r=this.a.length){--r;var i=this.a[r];if(!(null===i||"object"!=typeof i||Array.isArray(i)||k&&i instanceof Uint8Array)){this.c=r- -1,this.b=i;break t}}this.c=Number.MAX_VALUE}if(t)for(r=0;r<t.length;r++)if((i=t[r])<this.c)i+=-1,this.a[i]=this.a[i]||A;else{var n=this.c+-1;this.a[n]||(this.b=this.a[n]={}),this.b[i]=this.b[i]||A}}w.prototype.toString=function(){return this.a.toString()},i(m,w);var I=[1,3];function U(t){t=new v(t);for(var r=new m;y(t)&&4!=t.b;)switch(t.c){case 1:for(var i=2==t.b?d(t,t.a.c):[t.a.c()],n=0;n<i.length;n++){var e=i[n];S(r,1).push(e)}break;case 3:for(i=2==t.b?d(t,t.a.c):[t.a.c()],n=0;n<i.length;n++)e=i[n],S(r,3).push(e);break;default:b(t)}return r}r("parseClientVariations",(function(t){var r="";try{r=atob(t)}catch(t){}t=[];for(let i=0;i<r.length;i++)t.push(r.charCodeAt(i));r=null;try{r=U(t)}catch(t){r=U([])}return{variationIds:S(r,1),triggerVariationIds:S(r,3)}})),r("formatClientVariations",(function(t,r="Active client experiment variation IDs.",i="Active client experiment variation IDs that trigger server-side behavior."){const n=t.variationIds;t=t.triggerVariationIds;const e=["message ClientVariations {"];return n.length&&e.push(`  // ${r}`,`  repeated int32 variation_id = [${n.join(", ")}];`),t.length&&e.push(`  // ${i}`,`  repeated int32 trigger_variation_id = [${t.join(", ")}];`),e.push("}"),e.join("\n")}))}).call(t);export{i as formatClientVariations,r as parseClientVariations};
