import{useState as i,useEffect as e,useRef as n}from"react";const t=()=>{const[t,s]=i(!document.hidden),[o,r]=i(0),c=()=>{console.log(d),document.hidden?(l("isVisible","hidden"),s(!1),r(i=>i+1)):(l("isVisible","visible"),s(!0))};e(()=>(document.addEventListener("visibilitychange",c),()=>document.removeEventListener("visibilitychange",c)),[]);const d=n({isVisible:[]}),l=(i,e)=>{if(d.current[i])for(let n of d.current[i])n(e)};return{onVisibilityChange:i=>{d.current.isVisible.push(i)},visible:t,count:o}};export{t as useDocumentVisibility};
//# sourceMappingURL=index.modern.mjs.map
