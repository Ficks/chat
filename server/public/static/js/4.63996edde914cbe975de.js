webpackJsonp([4],{"9tmf":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("4YfN"),n=s.n(i),o=s("R4Sj"),c={computed:n()({},Object(o.c)(["userInfo","socket"])),data:function(){return{judgeDeviceType:{},toUser:{tel:"",headImg:"../../assets/logo.jpg"},chatVal:"",chatList:[],searchData:{page:1,size:20}}},methods:{getHistory:function(){var t=this;this.socket.on("chatHistory"+this.userInfo.tel,function(e){console.log("历史消息"),console.log(e),t.chatList=e.concat(t.chatList)})},sendMsg:function(){this.socket.emit("sendMsg",{toUserTel:this.toUser.tel,userTel:this.userInfo.tel,msg:this.chatVal,msgType:"1"}),this.chatList.push({toUserTel:this.toUser.tel,userTel:this.userInfo.tel,msg:this.chatVal,msgType:"1"}),this.chatVal=""},getMsg:function(){var t=this;this.socket.on("chat"+this.userInfo.tel,function(e){console.error("您有新的消息"),console.log(e),console.log(t.chatList),t.chatList.push(e)})},chatInt:function(){this.toUser.tel=this.$route.params.tel,this.getHistory(),this.getMsg(),this.socket.emit("chatHistory",{userTel:this.userInfo.tel,toUserTel:this.toUser.tel,searchData:this.searchData})},chatOut:function(){this.socket.on("disconnect",function(){})},listenKeybord:function(t){if(this.judgeDeviceType.isIOS&&(t.addEventListener("focus",function(){},!1),t.addEventListener("blur",function(){var t=window.navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);if(t){var e=t[1],s=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);+e.replace(/\./g,"")>=674&&+s[1]>=12&&window.scrollTo(0,Math.max(document.body.clientHeight,document.documentElement.clientHeight))}})),this.judgeDeviceType.isAndroid){document.documentElement.clientHeight||document.body.clientHeight;window.addEventListener("resize",function(){var t=document.documentElement.clientHeight||document.body.clientHeight;t},!1)}},getXt:function(){var t;this.judgeDeviceType=(t=window.navigator.userAgent.toLocaleLowerCase(),{isIOS:/iphone|ipad|ipod/.test(t),isAndroid:/android/.test(t)}),this.listenKeybord(this.$refs.chatInput)}},created:function(){this.chatInt(),this.chatOut()},mounted:function(){this.getXt()}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container_c"},[s("mu-appbar",{staticStyle:{width:"100%"},attrs:{color:"primary"}},[s("mu-button",{attrs:{slot:"left",icon:""},on:{click:t.$router.goBack},slot:"left"},[s("i",{staticClass:"iconfont icon-back"})]),t._v("\n    Ficks\n    "),s("mu-button",{attrs:{slot:"right",icon:""},on:{click:t.$router.goBack},slot:"right"},[s("i",{staticClass:"iconfont icon-gengduo"})])],1),t._v(" "),s("div",{staticClass:"chatRecord"},t._l(t.chatList,function(e,i){return s("div",{key:i,staticClass:"list",class:{my:t.userInfo.tel==e.userTel}},[t._m(0,!0),t._v(" "),s("div",{staticClass:"mbox"},[s("div",{staticClass:"text"},[t._v(t._s(e.msg))])])])}),0),t._v(" "),s("div",{staticClass:"chat_bom"},[s("div",{staticClass:"chat_box"},[t._m(1),t._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.chatVal,expression:"chatVal"}],ref:"chatInput",domProps:{value:t.chatVal},on:{input:function(e){e.target.composing||(t.chatVal=e.target.value)}}}),t._v(" "),t.chatVal?s("div",{staticClass:"send_btn",on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.sendMsg(e)}}},[s("mu-button",{attrs:{color:"info"},on:{click:t.sendMsg}},[t._v("发送")])],1):s("div",{staticClass:"btns w78"},[s("span",{staticClass:"iconfont icon-smile"}),t._v(" "),s("span",{staticClass:"iconfont icon-jiahao"})])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"headImg"},[e("img",{attrs:{src:s("XWbq"),alt:""}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"btns"},[e("span",{staticClass:"iconfont icon-smile"})])}]};var r=s("C7Lr")(c,a,!1,function(t){s("gBP3"),s("leND")},"data-v-4af99a87",null);e.default=r.exports},gBP3:function(t,e){},leND:function(t,e){}});
//# sourceMappingURL=4.63996edde914cbe975de.js.map