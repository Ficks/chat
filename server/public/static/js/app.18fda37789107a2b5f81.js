webpackJsonp([15],{C4aK:function(t,e){},CC7R:function(t,e){},Havv:function(t,e,n){"use strict";var a=n("rVsN"),r=n.n(a),o=(n("KQ6f"),n("aozt")),i=n.n(o),s=n("d2gY"),u=(n("wtEF"),n("wEua")),c=n("YaEn");u.a.config({position:"top"}),e.a=function(t){return t.method=t.type||"post",t.data=t.data||{},"get"==t.type&&(t.params=t.data),new r.a(function(e,n){var a=i.a.create({timeout:1e4,withCredentials:!0,baseURL:s.a.baseUrl});a.interceptors.request.use(function(t){var e=sessionStorage.token;return console.log(e),e&&(t.headers.Authorization="Bearer "+e),t},function(t){console.log(t),r.a.reject(t)}),a(t).then(function(a){if(1==a.data.status)t.tips&&u.a.success(a.data.msg),e(a.data.data,a);else{if(u.a.error(a.data.msg),1e4==a.data.status)return void c.a.push("/login");n(a.data)}console.log(a.data)}).catch(function(t){u.a.error("服务器开小差了"),n(t)})})}},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("KQ6f"),r=n("4YfN"),o=n.n(r),i=n("R4Sj"),s=n("ZKhn"),u={name:"App",data:function(){return{}},computed:o()({},Object(i.c)(["socket","userInfo","token"])),methods:o()({},Object(i.b)(["onSocket"]),Object(i.d)(["setNewFriendsMsgLen","updateHyStatus"]),{conncet:function(){this.token&&!this.socket&&(this.onSocket(),this.onFriends())},onFriends:function(){var t=this;console.log("onFriends"+this.userInfo.tel),this.socket.on("onFriends"+this.userInfo.tel,function(e){t.getFriendsMsg(),t.updateHyStatus(),0==e.type?t.$toast.error(e.msg):2==e.type?t.$toast.error(e.msg):t.$toast.message(e.msg)})},getFriendsMsg:function(){var t=this;s.a.getFriendsMsg().then(function(e){t.setNewFriendsMsgLen(e.length)})}}),created:function(){this.conncet(),this.getFriendsMsg()}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var l=n("C7Lr")(u,c,!1,function(t){n("bCG3")},null,null).exports,d=n("YaEn"),f=n("xwKP"),h=(n("C4aK"),n("wtEF")),p=n("wEua"),m=n("kbRN");n("CC7R");a.a.use(p.a,{position:"top"}),a.a.use(f.a),a.a.use(m.a),a.a.config.productionTip=!1;var g=sessionStorage.token?sessionStorage.token:"",v=sessionStorage.userInfo?JSON.parse(sessionStorage.userInfo):{};document.title=v.nickName,h.a.commit("setToken",g),h.a.commit("setUserInfo",v),d.a.beforeEach(function(t,e,n){var a=h.a.state.token||a;"/login"==t.path?n():a?n():n("/login"),n()}),new a.a({el:"#app",router:d.a,store:h.a,components:{App:l},template:"<App/>"})},YaEn:function(t,e,n){"use strict";var a=n("KQ6f"),r=n("KGCO"),o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v(t._s(t.msg))]),t._v(" "),n("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),n("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("\n        Core Docs\n      ")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("\n        Forum\n      ")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("\n        Community Chat\n      ")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("\n        Twitter\n      ")])]),t._v(" "),n("br"),t._v(" "),n("li",[n("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("\n        Docs for This Template\n      ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};n("C7Lr")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},o,!1,function(t){n("tGEK")},"data-v-d8ec41bc",null).exports;var i=this;a.a.use(r.a),r.a.prototype.goBack=function(){i.a.isBack=!0,window.history.go(-1)};e.a=new r.a({routes:[{path:"/",name:"app",component:function(t){return n.e(10).then(function(){var e=[n("8hXn")];t.apply(null,e)}.bind(this)).catch(n.oe)},redirect:function(t){return"/index/message"},children:[{path:"/login",name:"login",meta:{title:"登录"},component:function(t){return n.e(1).then(function(){var e=[n("W2Q3")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/register",name:"register",meta:{title:"注册"},component:function(t){return n.e(2).then(function(){var e=[n("NTb/")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/retrievePwd",name:"retrievePwd",meta:{title:"找回密码"},component:function(t){return n.e(3).then(function(){var e=[n("1qXR")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/index",name:"index",meta:{title:"首页"},component:function(t){return Promise.all([n.e(0),n.e(9)]).then(function(){var e=[n("JXTs")];t.apply(null,e)}.bind(this)).catch(n.oe)},children:[{path:"/index/message",name:"message",meta:{title:"聊天记录"},component:function(t){return Promise.all([n.e(0),n.e(13)]).then(function(){var e=[n("K79a")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/index/friends",name:"friends",meta:{title:"通讯录"},component:function(t){return Promise.all([n.e(0),n.e(6)]).then(function(){var e=[n("QOH8")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/index/find",name:"find",meta:{title:"发现"},component:function(t){return n.e(8).then(function(){var e=[n("PiBu")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/index/world",name:"world",meta:{title:"世界"},component:function(t){return n.e(11).then(function(){var e=[n("cLdI")];t.apply(null,e)}.bind(this)).catch(n.oe)}}]},{path:"/addFriends",name:"addFriends",meta:{title:"添加好友"},component:function(t){return n.e(12).then(function(){var e=[n("1XxS")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/friendsInfo",name:"friendsInfo",meta:{title:"好友信息"},component:function(t){return Promise.all([n.e(0),n.e(5)]).then(function(){var e=[n("I/RA")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/notice",name:"notice",meta:{title:"新的朋友"},component:function(t){return Promise.all([n.e(0),n.e(7)]).then(function(){var e=[n("eeEl")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/chat/:tel",name:"chat",meta:{title:"聊天"},component:function(t){return Promise.all([n.e(0),n.e(4)]).then(function(){var e=[n("9tmf")];t.apply(null,e)}.bind(this)).catch(n.oe)}}]}]})},ZKhn:function(t,e,n){"use strict";var a=n("Havv");e.a={getFriendsGourp:function(t){return Object(a.a)({url:"/getFriendsGourp",type:"get",data:t})},addFriends:function(t){return Object(a.a)({url:"/addFriends",tips:!0,data:t})},refuseFriends:function(t){return Object(a.a)({url:"/refuseFriends",tips:!0,data:t})},getAddFriendsList:function(t){return Object(a.a)({url:"/getAddFriendsList",type:"get",data:t})},getFriendsMsg:function(t){return Object(a.a)({url:"/getFriendsMsg",type:"get",data:t})},getFriendsAllMsgRead:function(t){return Object(a.a)({url:"/getFriendsAllMsgRead",type:"post",data:t})},agree:function(t){return Object(a.a)({url:"/agree",data:t,tips:!0})},deleteFriends:function(t){return Object(a.a)({url:"/deleteFriends",data:t,tips:!0})},getFriendsList:function(t){return Object(a.a)({type:"get",url:"/getFriendsList",data:t})}}},bCG3:function(t,e){},d2gY:function(t,e,n){"use strict";e.a={baseUrl:"http://192.168.1.221:3000"}},tGEK:function(t,e){},wtEF:function(t,e,n){"use strict";var a=n("KQ6f"),r=n("R4Sj"),o=n("d2gY");a.a.use(r.a),e.a=new r.a.Store({state:{token:"",userInfo:{},socket:null,newFriendsMsgLen:"0",updateHyStatus:0},getters:{token:function(t){return t.token},userInfo:function(t){return t.userInfo},socket:function(t){return t.socket}},mutations:{setToken:function(t,e){t.token=e},setUserInfo:function(t,e){t.userInfo=e},setSocket:function(t,e){t.socket=e,t.socket.on("connect",function(){console.log("连接上了"),t.socket.emit("login",{id:t.userInfo.tel})})},setNewFriendsMsgLen:function(t,e){t.newFriendsMsgLen=String(e)},updateHyStatus:function(t){t.updateHyStatus++}},actions:{onSocket:function(t){(0,t.commit)("setSocket",io(o.a.baseUrl))}}})}},["NHnr"]);
//# sourceMappingURL=app.18fda37789107a2b5f81.js.map