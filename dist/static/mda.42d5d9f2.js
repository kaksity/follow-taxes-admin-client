var e=(e,t,n)=>new Promise(((r,s)=>{var i=e=>{try{u(n.next(e))}catch(t){s(t)}},l=e=>{try{u(n.throw(e))}catch(t){s(t)}},u=e=>e.done?r(e.value):Promise.resolve(e.value).then(i,l);u((n=n.apply(e,t)).next())}));import{i as t}from"./index.d74d9965.js";function n(n){return e(this,null,(function*(){return yield t({url:"/general-settings/mdas",method:"post",data:n})}))}function r(n){return e(this,null,(function*(){return yield t({url:`/general-settings/mdas/${n}`,method:"delete"})}))}function s(){return e(this,null,(function*(){return yield t({url:"/general-settings/mdas",method:"get"})}))}export{n as c,r as d,s as g};
