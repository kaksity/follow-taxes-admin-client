var t=(t,e,n)=>new Promise(((r,o)=>{var s=t=>{try{l(n.next(t))}catch(e){o(e)}},i=t=>{try{l(n.throw(t))}catch(e){o(e)}},l=t=>t.done?r(t.value):Promise.resolve(t.value).then(s,i);l((n=n.apply(t,e)).next())}));import{i as e}from"./index.d74d9965.js";function n(n){return t(this,null,(function*(){return yield e({url:"/general-settings/contractors",method:"post",data:n})}))}function r(n){return t(this,null,(function*(){return yield e({url:`/general-settings/contractors/${n}`,method:"delete"})}))}function o(){return t(this,null,(function*(){return yield e({url:"/general-settings/contractors",method:"get"})}))}export{n as c,r as d,o as g};
