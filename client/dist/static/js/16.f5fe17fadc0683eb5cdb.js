webpackJsonp([16],{PHrC:function(e,s,t){e.exports=t.p+"static/img/login.a1297c4.png"},dIqY:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=t("Xxa5"),r=t.n(a),n=t("exGp"),o=t.n(n),i=t("WBwv"),l=(t("JAHf"),{name:"register",data:function(){return{newUser:{name:"",email:"",password:"",password2:""},errors:""}},components:{TextField:i.a},mounted:function(){particlesJS.load("particles","../../static/particles.config.json")},methods:{submit:function(){var e=this;return o()(r.a.mark(function s(){var t;return r.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.$axioss.register(e.newUser);case 2:return 1e3===(t=s.sent).data.code?(e.errors="",alert(t.data.msg),e.$store.dispatch("setUser",t.data),e.$router.push("/login")):400===t.data.code?alert(t.data.msg):alert("注册没成功!再试一次"),s.abrupt("return",!1);case 5:case"end":return s.stop()}},s,e)}))()}}}),c={render:function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"register"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row hid"},[a("div",{staticClass:"col-md-8 m-auto"},[a("img",{staticStyle:{display:"block",width:"150px",margin:"0 auto"},attrs:{src:t("PHrC"),alt:""}}),e._v(" "),a("h1",{staticClass:"display-4 text-center"},[e._v("注册")]),e._v(" "),a("p",{staticClass:"lead text-center"},[e._v("创建新的账户")]),e._v(" "),a("form",{attrs:{autocomplete:"off",method:"post"},on:{submit:function(s){return s.preventDefault(),e.submit(s)}}},[a("TextField",{attrs:{type:"text",name:"name",placeholder:"用户名",error:e.errors.name},model:{value:e.newUser.name,callback:function(s){e.$set(e.newUser,"name",s)},expression:"newUser.name"}}),e._v(" "),a("TextField",{attrs:{type:"email",name:"email",placeholder:"邮箱地址",error:e.errors.email},model:{value:e.newUser.email,callback:function(s){e.$set(e.newUser,"email",s)},expression:"newUser.email"}}),e._v(" "),a("TextField",{attrs:{type:"password",name:"password",placeholder:"密码",error:e.errors.password},model:{value:e.newUser.password,callback:function(s){e.$set(e.newUser,"password",s)},expression:"newUser.password"}}),e._v(" "),a("TextField",{attrs:{type:"password",name:"password2",placeholder:"确认密码",error:e.errors.password2},model:{value:e.newUser.password2,callback:function(s){e.$set(e.newUser,"password2",s)},expression:"newUser.password2"}}),e._v(" "),a("input",{staticClass:"btn btn-info btn-block mt-4",attrs:{type:"submit"}})],1)])]),e._v(" "),a("div",{staticClass:"content",attrs:{id:"particles"}},[a("div",{staticClass:"large-header",staticStyle:{height:"874px"}}),e._v(" "),a("div",{staticClass:"loBox",attrs:{id:"large-header"}},[a("div",{staticClass:"logo_box"},[a("h3",[e._v("创建新的账户")]),e._v(" "),a("form",{attrs:{autocomplete:"off",method:"post"},on:{submit:function(s){return s.preventDefault(),e.submit(s)}}},[a("div",{staticClass:"input_outer padBox30"},[a("span",{staticClass:"u_user"}),e._v(" "),a("TextField",{attrs:{type:"text",name:"name",placeholder:"用户名",error:e.errors.name},model:{value:e.newUser.name,callback:function(s){e.$set(e.newUser,"name",s)},expression:"newUser.name"}})],1),e._v(" "),a("div",{staticClass:"input_outer padBox30"},[a("span",{staticClass:"us_uer"}),e._v(" "),a("TextField",{attrs:{type:"email",name:"email",placeholder:"邮箱地址",error:e.errors.email},model:{value:e.newUser.email,callback:function(s){e.$set(e.newUser,"email",s)},expression:"newUser.email"}})],1),e._v(" "),a("div",{staticClass:"input_outer padBox30"},[a("span",{staticClass:"us_uer"}),e._v(" "),a("TextField",{attrs:{type:"password",name:"password",placeholder:"密码",error:e.errors.password},model:{value:e.newUser.password,callback:function(s){e.$set(e.newUser,"password",s)},expression:"newUser.password"}})],1),e._v(" "),a("div",{staticClass:"input_outer padBox30"},[a("span",{staticClass:"us_uer"}),e._v(" "),a("TextField",{attrs:{type:"password",name:"password2",placeholder:"确认密码",error:e.errors.password2},model:{value:e.newUser.password2,callback:function(s){e.$set(e.newUser,"password2",s)},expression:"newUser.password2"}})],1),e._v(" "),a("input",{staticClass:"btn  btn-primary btn-block mt-4",staticStyle:{height:"45px"},attrs:{type:"submit"}})])])])])])])},staticRenderFns:[]};var d=t("VU/8")(l,c,!1,function(e){t("jlWn")},"data-v-725100f2",null);s.default=d.exports},jlWn:function(e,s){}});