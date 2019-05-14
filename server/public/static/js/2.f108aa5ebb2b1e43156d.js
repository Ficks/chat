webpackJsonp([2],{"NTb/":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("eIdC"),a={Name:"a",data:function(){return{telRules:[{validate:function(e){return!!e},message:"必须填写手机号"},{validate:function(e){return/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(e)},message:"手机号格式不正确"}],imgCodeRules:[{validate:function(e){return!!e},message:"必须填写图形验证码"}],smsCodeRules:[{validate:function(e){return!!e},message:"必须填写短信验证码"}],pwdRules:[{validate:function(e){return!!e},message:"必须填写密码"},{validate:function(e){return e.length>=6&&e.length<=16},message:"密码长度大于6小于16"}],qrPwdRules:[{validate:function(e){return!!e},message:"请确认密码"},{validate:function(e,t){return e==t.pwd},message:"密码不一致"}],argeeRules:[{validate:function(e){return!!e},message:"必须同意用户协议"}],validateForm:{tel:"",pwd:"",qrPwd:"",imgCode:"",smsCode:"",isAgree:!1},showPwd:!1,showQrPwd:!1,openFullscreen:!1,imgCode:"",isReg:!1,smsCodeData:{text:"获取验证码",time:60,timer:null}}},methods:{onCloseOpen:function(){this.validateForm.isAgree=!1,this.openFullscreen=!1},getImgCode:function(){var e=this;o.a.getImgCode().then(function(t){e.imgCode=t.imgCode})},getSmsCode:function(){var e=this;this.validateForm.imgCode&&o.a.getSmsCode(this.validateForm.imgCode).then(function(t){e.$toast.success("您的短信验证码是"+t.smsCode),e.smsCodeData.timer=setInterval(function(){e.smsCodeData.time>1?(e.smsCodeData.time--,e.smsCodeData.text=e.smsCodeData.time+"s"):(e.smsCodeData.time=60,e.smsCodeData.text="获取验证码",clearInterval(e.smsCodeData.timer))},1e3)},function(t){e.getImgCode(),e.validateForm.imgCode=""})},submit:function(){var e=this;this.$refs.form.validate().then(function(t){t&&e.submitRegister()})},submitRegister:function(){var e=this;this.isReg=!0,o.a.submitRegister(this.validateForm).then(function(t){e.isReg=!1,e.$router.push("/login")},function(t){e.isReg=!1})}},created:function(){this.getImgCode()}},i={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container_c"},[s("mu-appbar",{staticStyle:{width:"100%"},attrs:{color:"secondary"}},[s("mu-button",{attrs:{slot:"left",icon:""},on:{click:e.$router.goBack},slot:"left"},[s("i",{staticClass:"iconfont icon-back"})]),e._v("\n    注册\n  ")],1),e._v(" "),s("mu-container",{staticClass:"form"},[s("mu-form",{ref:"form",staticClass:"mu-demo-form",attrs:{model:e.validateForm}},[s("mu-form-item",{attrs:{label:"手机号",prop:"tel",rules:e.telRules}},[s("mu-text-field",{attrs:{prop:"tel"},model:{value:e.validateForm.tel,callback:function(t){e.$set(e.validateForm,"tel",t)},expression:"validateForm.tel"}})],1),e._v(" "),s("mu-form-item",{staticClass:"imgcode",attrs:{label:"图形验证码",prop:"imgCode",rules:e.imgCodeRules}},[s("mu-text-field",{attrs:{prop:"imgCode"},model:{value:e.validateForm.imgCode,callback:function(t){e.$set(e.validateForm,"imgCode",t)},expression:"validateForm.imgCode"}}),e._v(" "),s("mu-button",{staticClass:"imgcode_btn",attrs:{flat:""},domProps:{innerHTML:e._s(e.imgCode)},on:{click:e.getImgCode}})],1),e._v(" "),s("mu-form-item",{staticClass:"imgcode",attrs:{label:"短信验证码",prop:"smsCode",rules:e.smsCodeRules}},[s("mu-text-field",{attrs:{prop:"smsCode"},model:{value:e.validateForm.smsCode,callback:function(t){e.$set(e.validateForm,"smsCode",t)},expression:"validateForm.smsCode"}}),e._v(" "),s("mu-button",{attrs:{color:"secondary"},on:{click:e.getSmsCode}},[e._v(e._s(e.smsCodeData.text))])],1),e._v(" "),s("mu-form-item",{attrs:{label:"密码",prop:"pwd",rules:e.pwdRules}},[s("mu-text-field",{attrs:{type:"password",type:e.showPwd?"text":"password","action-icon":e.showPwd?"visibility_off":"visibility","action-click":function(){return e.showPwd=!e.showPwd},prop:"pwd"},model:{value:e.validateForm.pwd,callback:function(t){e.$set(e.validateForm,"pwd",t)},expression:"validateForm.pwd"}})],1),e._v(" "),s("mu-form-item",{attrs:{label:"确认密码",prop:"qrPwd",rules:e.qrPwdRules}},[s("mu-text-field",{attrs:{type:"password",type:e.showQrPwd?"text":"password","action-icon":e.showQrPwd?"visibility_off":"visibility","action-click":function(){return e.showQrPwd=!e.showQrPwd},prop:"qrPwd"},model:{value:e.validateForm.qrPwd,callback:function(t){e.$set(e.validateForm,"qrPwd",t)},expression:"validateForm.qrPwd"}})],1),e._v(" "),s("mu-form-item",{attrs:{prop:"isAgree",rules:e.argeeRules}},[s("mu-checkbox",{attrs:{label:"同意用户协议"},on:{click:function(t){e.openFullscreen=!0}},model:{value:e.validateForm.isAgree,callback:function(t){e.$set(e.validateForm,"isAgree",t)},expression:"validateForm.isAgree"}})],1),e._v(" "),s("div",{staticClass:"submit"},[s("mu-button",{attrs:{large:"","full-width":"",color:"secondary",disabled:e.isReg},on:{click:e.submit}},[e._v("注 册")])],1),e._v(" "),s("div",{staticClass:"center"},[s("mu-button",{attrs:{flat:"",to:"/login"}},[e._v("去登录")])],1)],1)],1),e._v(" "),s("mu-dialog",{attrs:{width:"360",transition:"slide-bottom",fullscreen:"",open:e.openFullscreen},on:{"update:open":function(t){e.openFullscreen=t}}},[s("mu-appbar",{attrs:{color:"primary",title:"用户协议"}},[s("mu-button",{attrs:{slot:"left",icon:""},on:{click:e.onCloseOpen},slot:"left"},[s("mu-icon",{attrs:{value:"close"}})],1)],1),e._v(" "),s("div",{staticStyle:{padding:"24px"}},[e._v("\n      this is a fullscreen dialog\n    ")]),e._v(" "),s("div",{staticClass:"center"},[s("mu-button",{attrs:{color:"primary"},on:{click:function(t){e.openFullscreen=!1}}},[e._v("同意用户协议")]),e._v(" "),s("mu-button",{on:{click:e.onCloseOpen}},[e._v("取消")])],1)],1)],1)},staticRenderFns:[]};var r=s("C7Lr")(a,i,!1,function(e){s("UnnC"),s("OwRy")},"data-v-abc57836",null);t.default=r.exports},OwRy:function(e,t){},UnnC:function(e,t){},eIdC:function(e,t,s){"use strict";var o=s("Havv");t.a={getImgCode:function(){return Object(o.a)({url:"/getImgCode",type:"get"})},getSmsCode:function(e){return Object(o.a)({url:"/getSmsCode",type:"get",data:{smsCode:e}})},submitRegister:function(e){return Object(o.a)({url:"/register",type:"post",tips:!0,data:e})}}}});
//# sourceMappingURL=2.f108aa5ebb2b1e43156d.js.map