import{f as r,g as i}from"./chunk-KXBQQBPP.js";import"./chunk-MM5QLNJM.js";import{b as s}from"./chunk-H3GX5QFY.js";import{d as a,e as m}from"./chunk-HZ4JHCJO.js";import{g as n}from"./chunk-2R6CW7ES.js";var y=()=>{let e=window;e.addEventListener("statusTap",()=>{a(()=>{let c=e.innerWidth,d=e.innerHeight,o=document.elementFromPoint(c/2,d/2);if(!o)return;let t=r(o);t&&new Promise(p=>s(t,p)).then(()=>{m(()=>n(void 0,null,function*(){t.style.setProperty("--overflow","hidden"),yield i(t,300),t.style.removeProperty("--overflow")}))})})})};export{y as startStatusTap};