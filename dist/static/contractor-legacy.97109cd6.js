!function(){function t(t,e,n,r,u,c,o){try{var a=t[c](o),i=a.value}catch(s){return void n(s)}a.done?e(i):Promise.resolve(i).then(r,u)}function e(e){return function(){var n=this,r=arguments;return new Promise((function(u,c){var o=e.apply(n,r);function a(e){t(o,u,c,a,i,"next",e)}function i(e){t(o,u,c,a,i,"throw",e)}a(void 0)}))}}System.register(["./index-legacy.d701ca17.js"],(function(t){"use strict";var n;return{setters:[function(t){n=t.i}],execute:function(){function r(){return(r=e(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n({url:"/general-settings/contractors",method:"post",data:e});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function u(){return(u=e(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n({url:"/general-settings/contractors/".concat(e),method:"delete"});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function c(){return(c=e(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n({url:"/general-settings/contractors",method:"get"});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}t({c:function(t){return r.apply(this,arguments)},d:function(t){return u.apply(this,arguments)},g:function(){return c.apply(this,arguments)}})}}}))}();