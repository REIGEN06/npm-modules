!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("react")):"function"==typeof define&&define.amd?define(["exports","react"],n):n((e||self).reactResponsive={},e.react)}(this,function(e,n){var t=["children"],r=function(e){var t=n.useState(function(){return window.matchMedia(e.query).matches}),r=t[0],u=t[1];return n.useEffect(function(){var n=function(){u(function(){return window.matchMedia(e.query).matches})},t=window.matchMedia(e.query);return t.addEventListener("change",n),function(){t.removeEventListener("change",n)}},[e]),r};function u(e){function n(e){return e.replace(/(?<=[a-z])(?=[A-Z])/g,"-").toLowerCase()}return Object.entries(e).map(function(e,t){var r=e[0],u=e[1];switch(r){case"orientation":return"("+r+":"+u+")";case"minResolution":case"maxResolution":return"number"==typeof u?"("+n(r)+": "+u+"dppx)":"("+n(r)+": "+u+")";default:return"number"==typeof u?"("+n(r)+": "+u+"px)":"("+n(r)+": "+u+")"}}).join("")}e.MediaQuery=function(e){var n=e.children,i=function(e,n){if(null==e)return{};var t,r,u={},i=Object.keys(e);for(r=0;r<i.length;r++)n.indexOf(t=i[r])>=0||(u[t]=e[t]);return u}(e,t),o=r({query:u(i)});return"function"==typeof n?h(Fragment,null,n(o)):o?h(Fragment,null,n):null},e.useMediaQuery=r});
//# sourceMappingURL=ReactResponsive.umd.js.map