!function r(o,K,u){function A(t,e){if(!K[t]){if(!o[t]){var E="function"==typeof require&&require;if(!e&&E)return E(t,!0);if(i)return i(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var _=K[t]={exports:{}};o[t][0].call(_.exports,function(e){var E=o[t][1][e];return A(E||e)},_,_.exports,r,o,K,u)}return K[t].exports}for(var i="function"==typeof require&&require,e=0;e<u.length;e++)A(u[e]);return A}({1:[function(e,E,t){"use strict";var n=function(){function n(e,E){for(var t=0;t<E.length;t++){var n=E[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,E,t){return E&&n(e.prototype,E),t&&n(e,t),e}}();Object.defineProperty(t,"__esModule",{value:!0});var _=function(){function e(){!function(e,E){if(!(e instanceof E))throw new TypeError("Cannot call a class as a function")}(this,e)}return n(e,[{key:"interpret",value:function(e,E){var t=0;e.split("\n").forEach(function(e){return E((t++).toString()+" | "+e)})}}]),e}();t.Interpreter=_},{}],2:[function(e,E,t){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),(n=t.keyCodes||(t.keyCodes={}))[n.BACKSPACE=8]="BACKSPACE",n[n.TAB=9]="TAB",n[n.ENTER=13]="ENTER",n[n.SHIFT=16]="SHIFT",n[n.CTRL=17]="CTRL",n[n.ALT=18]="ALT",n[n.PAUSE=19]="PAUSE",n[n.CAPS_LOCK=20]="CAPS_LOCK",n[n.ESCAPE=27]="ESCAPE",n[n.SPACE=32]="SPACE",n[n.PAGE_UP=33]="PAGE_UP",n[n.PAGE_DOWN=34]="PAGE_DOWN",n[n.END=35]="END",n[n.HOME=36]="HOME",n[n.LEFT_ARROW=37]="LEFT_ARROW",n[n.UP_ARROW=38]="UP_ARROW",n[n.RIGHT_ARROW=39]="RIGHT_ARROW",n[n.DOWN_ARROW=40]="DOWN_ARROW",n[n.INSERT=45]="INSERT",n[n.DELETE=46]="DELETE",n[n.KEY_0=48]="KEY_0",n[n.KEY_1=49]="KEY_1",n[n.KEY_2=50]="KEY_2",n[n.KEY_3=51]="KEY_3",n[n.KEY_4=52]="KEY_4",n[n.KEY_5=53]="KEY_5",n[n.KEY_6=54]="KEY_6",n[n.KEY_7=55]="KEY_7",n[n.KEY_8=56]="KEY_8",n[n.KEY_9=57]="KEY_9",n[n.KEY_A=65]="KEY_A",n[n.KEY_B=66]="KEY_B",n[n.KEY_C=67]="KEY_C",n[n.KEY_D=68]="KEY_D",n[n.KEY_E=69]="KEY_E",n[n.KEY_F=70]="KEY_F",n[n.KEY_G=71]="KEY_G",n[n.KEY_H=72]="KEY_H",n[n.KEY_I=73]="KEY_I",n[n.KEY_J=74]="KEY_J",n[n.KEY_K=75]="KEY_K",n[n.KEY_L=76]="KEY_L",n[n.KEY_M=77]="KEY_M",n[n.KEY_N=78]="KEY_N",n[n.KEY_O=79]="KEY_O",n[n.KEY_P=80]="KEY_P",n[n.KEY_Q=81]="KEY_Q",n[n.KEY_R=82]="KEY_R",n[n.KEY_S=83]="KEY_S",n[n.KEY_T=84]="KEY_T",n[n.KEY_U=85]="KEY_U",n[n.KEY_V=86]="KEY_V",n[n.KEY_W=87]="KEY_W",n[n.KEY_X=88]="KEY_X",n[n.KEY_Y=89]="KEY_Y",n[n.KEY_Z=90]="KEY_Z",n[n.LEFT_META=91]="LEFT_META",n[n.RIGHT_META=92]="RIGHT_META",n[n.SELECT=93]="SELECT",n[n.NUMPAD_0=96]="NUMPAD_0",n[n.NUMPAD_1=97]="NUMPAD_1",n[n.NUMPAD_2=98]="NUMPAD_2",n[n.NUMPAD_3=99]="NUMPAD_3",n[n.NUMPAD_4=100]="NUMPAD_4",n[n.NUMPAD_5=101]="NUMPAD_5",n[n.NUMPAD_6=102]="NUMPAD_6",n[n.NUMPAD_7=103]="NUMPAD_7",n[n.NUMPAD_8=104]="NUMPAD_8",n[n.NUMPAD_9=105]="NUMPAD_9",n[n.MULTIPLY=106]="MULTIPLY",n[n.ADD=107]="ADD",n[n.SUBTRACT=109]="SUBTRACT",n[n.DECIMAL=110]="DECIMAL",n[n.DIVIDE=111]="DIVIDE",n[n.F1=112]="F1",n[n.F2=113]="F2",n[n.F3=114]="F3",n[n.F4=115]="F4",n[n.F5=116]="F5",n[n.F6=117]="F6",n[n.F7=118]="F7",n[n.F8=119]="F8",n[n.F9=120]="F9",n[n.F10=121]="F10",n[n.F11=122]="F11",n[n.F12=123]="F12",n[n.NUM_LOCK=144]="NUM_LOCK",n[n.SCROLL_LOCK=145]="SCROLL_LOCK",n[n.SEMICOLON=186]="SEMICOLON",n[n.EQUALS=187]="EQUALS",n[n.COMMA=188]="COMMA",n[n.DASH=189]="DASH",n[n.PERIOD=190]="PERIOD",n[n.FORWARD_SLASH=191]="FORWARD_SLASH",n[n.GRAVE_ACCENT=192]="GRAVE_ACCENT",n[n.OPEN_BRACKET=219]="OPEN_BRACKET",n[n.BACK_SLASH=220]="BACK_SLASH",n[n.CLOSE_BRACKET=221]="CLOSE_BRACKET",n[n.SINGLE_QUOTE=222]="SINGLE_QUOTE"},{}],3:[function(e,E,t){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var o=e("./interpreter"),K=e("./keyCodes"),u=document.getElementById("code"),_=document.getElementById("console"),A=document.getElementById("buttonSave"),i={};function Y(e){var E=i[e];return void 0!==(void 0===E?"undefined":n(E))&&E}function c(e){return e.which||e.keyCode}function f(e,E){return c(e)===E}function l(e){_.value.length?_.value+="\n"+e:_.value=e,_.scrollTop=_.scrollHeight}u.addEventListener("keydown",function(e){if(f(e,K.keyCodes.F5))e.preventDefault(),Y(K.keyCodes.F5)||(_=u.value,r=l,new Promise(function(e,E){l("Interpreting..."),(new o.Interpreter).interpret(_,r)?e():E()}).then(function(){return r("Done!")}).catch(function(){return r("Error!")}));else if(f(e,K.keyCodes.KEY_S))e.ctrlKey&&(e.preventDefault(),Y(K.keyCodes.KEY_S)||A.click());else if(f(e,K.keyCodes.TAB)){e.preventDefault();var E=u.value,t=u.selectionStart,n=u.selectionEnd;u.value=E.substring(0,t)+"    "+E.substring(n,E.length),u.selectionEnd=u.selectionStart=t+"    ".length}var _,r;i[c(e)]=!0}),u.addEventListener("keyup",function(e){f(e,K.keyCodes.F5)&&e.preventDefault(),i[c(e)]=!1}),A.addEventListener("click",function(e){A.setAttribute("href","data:;charset=utf-8,"+encodeURIComponent(u.value))})},{"./interpreter":1,"./keyCodes":2}]},{},[3]);
//# sourceMappingURL=bundle.js.map
