!function(){function e(e,t,n,r,u,a,i){try{var s=e[a](i),o=s.value}catch(c){return void n(c)}s.done?t(o):Promise.resolve(o).then(r,u)}function t(t){return function(){var n=this,r=arguments;return new Promise((function(u,a){var i=t.apply(n,r);function s(t){e(i,u,a,s,o,"next",t)}function o(t){e(i,u,a,s,o,"throw",t)}s(void 0)}))}}System.register(["./index-legacy.d701ca17.js"],(function(e){"use strict";var n;return{setters:[function(e){n=e.i}],execute:function(){function r(){return(r=t(regeneratorRuntime.mark((function e(){var t,r=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:null,e.next=3,n({url:"/general-settings/lgas",method:"get",params:{state_id:t}});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function u(){return(u=t(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n({url:"/general-settings/lgas",method:"post",data:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function a(){return(a=t(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n({url:"/general-settings/lgas/".concat(t),method:"delete"});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}e({c:function(e){return u.apply(this,arguments)},d:function(e){return a.apply(this,arguments)},g:function(){return r.apply(this,arguments)}})}}}))}();