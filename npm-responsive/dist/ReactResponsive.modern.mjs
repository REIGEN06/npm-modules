import{useState as e,useEffect as n}from"react";const t=["children"],r=t=>{const[r,o]=e(()=>window.matchMedia(t.query).matches);return n(()=>{const e=()=>{o(()=>window.matchMedia(t.query).matches)},n=window.matchMedia(t.query);return n.addEventListener("change",e),()=>{n.removeEventListener("change",e)}},[t]),r};function o(e){function n(e){return e.replace(/(?<=[a-z])(?=[A-Z])/g,"-").toLowerCase()}return Object.entries(e).map(([e,t],r)=>{switch(e){case"orientation":return`(${e}:${t})`;case"minResolution":case"maxResolution":return"number"==typeof t?`(${n(e)}: ${t}dppx)`:`(${n(e)}: ${t})`;default:return"number"==typeof t?`(${n(e)}: ${t}px)`:`(${n(e)}: ${t})`}}).join("")}const u=e=>{let{children:n}=e,u=function(e,n){if(null==e)return{};var t,r,o={},u=Object.keys(e);for(r=0;r<u.length;r++)n.indexOf(t=u[r])>=0||(o[t]=e[t]);return o}(e,t);const c=r({query:o(u)});return"function"==typeof n?h(Fragment,null,n(c)):c?h(Fragment,null,n):null};export{u as MediaQuery,r as useMediaQuery};
//# sourceMappingURL=ReactResponsive.modern.mjs.map