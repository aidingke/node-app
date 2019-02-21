webpackJsonp([6],{hZ9T:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("Xxa5"),s=n.n(i),r=n("exGp"),a=n.n(r),o={data:function(){return{}},props:{handle:String},methods:{}},l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"btn-group mb-4",attrs:{role:"group"}},[e("router-link",{staticClass:"btn btn-light",attrs:{to:"/editProfile/"+this.handle}},[e("i",{staticClass:"fas_a3 text-info mr-1"}),this._v(" \n        编辑个人信息\n    ")]),this._v(" "),e("router-link",{staticClass:"btn btn-light",attrs:{to:"/add-experience"}},[e("i",{staticClass:"fas_a1 text-info mr-1"}),this._v("\n        添加个人经历\n    ")]),this._v(" "),e("router-link",{staticClass:"btn btn-light",attrs:{to:"/add-education"}},[e("i",{staticClass:"fas_a2 text-info mr-1"}),this._v("\n        添加教育经历\n    ")])],1)},staticRenderFns:[]};var c=n("VU/8")(o,l,!1,function(t){n("sftl")},"data-v-5a298f02",null).exports,d=n("mvHQ"),u=n.n(d),f={data:function(){return{}},props:{experience:Array,id:String},methods:{deleteClick:function(t){this.$emit("deleteExperience",t)},editClick:function(t,e,n){var i=this.experience[t];i.profilesId=n,i.index=t;var s=u()(i);sessionStorage.getItem("objExperience")&&sessionStorage.removeItem("objExperience"),sessionStorage.objExperience=s,this.$router.push({path:"/EditExperience"})}}},v={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h4",{staticClass:"mb-2"},[t._v("个人履历")]),t._v(" "),n("table",{staticClass:"table"},[t._m(0),t._v(" "),n("tbody",t._l(t.experience,function(e,i){return n("tr",{key:i},[n("td",[t._v(t._s(e.company))]),t._v(" "),n("td",[t._v(t._s(e.title))]),t._v(" "),n("td",[t._v("\n                "+t._s(e.from)+" ~ "+t._s(e.to?e.to:"至今")+"\n                ")]),t._v(" "),n("td",[n("button",{staticClass:"btn btn-info",on:{click:function(n){t.editClick(i,e._id,t.id)}}},[t._v("\n                    编辑\n                ")]),t._v(" "),n("button",{staticClass:"btn btn-danger",on:{click:function(n){t.deleteClick(e._id)}}},[t._v("\n                    删除\n                ")])])])}))])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("公司")]),this._v(" "),e("th",[this._v("标签")]),this._v(" "),e("th",[this._v("年份")]),this._v(" "),e("th")])])}]},_=n("VU/8")(f,v,!1,null,null,null).exports,h={data:function(){return{}},props:{education:Array,id:String},methods:{deleteClick:function(t){this.$emit("deleteEducation",t)},editClick:function(t,e,n){var i=this.education[t];i.profilesId=n,i.index=t;var s=u()(i);sessionStorage.getItem("objEducation")&&sessionStorage.removeItem("objEducation"),sessionStorage.objEducation=s,this.$router.push({path:"/EditEducation"})}}},p={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h4",{staticClass:"mb-2"},[t._v("教育经历")]),t._v(" "),n("table",{staticClass:"table"},[t._m(0),t._v(" "),n("tbody",t._l(t.education,function(e,i){return n("tr",{key:i},[n("td",[t._v(t._s(e.school))]),t._v(" "),n("td",[t._v(t._s(e.degree))]),t._v(" "),n("td",[t._v("\n                "+t._s(e.from)+" ~ "+t._s(e.to?e.to:"至今")+"\n                ")]),t._v(" "),n("td",[n("button",{staticClass:"btn btn-info",on:{click:function(n){t.editClick(i,e._id,t.id)}}},[t._v("\n                    编辑\n                ")]),t._v(" "),n("button",{staticClass:"btn btn-danger",on:{click:function(n){t.deleteClick(e._id)}}},[t._v("\n                    删除\n                ")])])])}))])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("学校")]),this._v(" "),e("th",[this._v("学历")]),this._v(" "),e("th",[this._v("年份")]),this._v(" "),e("th")])])}]},b={name:"dashboard",data:function(){return{profile:null}},components:{ProfileActived:c,Experience:_,Education:n("VU/8")(h,p,!1,null,null,null).exports},computed:{user:function(){return this.$store.getters.user}},created:function(){this.getUrl("avatar")&&(sessionStorage.setItem("avatar",this.getUrl("avatar")),this.$store.dispatch("setUserAvatar",this.getUrl("avatar")))},beforeRouteEnter:function(t,e,n){n(function(t){t.getProfileData(),document.title="简历中心"})},methods:{getProfileData:function(){var t=this;return a()(s.a.mark(function e(){var n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axioss.profile();case 2:return 1e3==(n=e.sent).data.code?(t.profile=n.data.profile,t.$store.dispatch("setProfile",n.data)):400==n.data.code&&(t.profile=null,t.$store.dispatch("setProfile",null)),e.abrupt("return",!1);case 5:case"end":return e.stop()}},e,t)}))()},deleteClick:function(){var t=this;this.$axios.delete("/api/profile").then(function(e){t.profile=null,t.$store.dispatch("clearCurrentState"),t.$router.push("/login")}).catch(function(t){alert(t.response.data)})},deleteExperience:function(t){var e=this;this.$axios.delete("/api/profile/experience/"+t).then(function(t){console.log(t.data),e.profile=t.data}).catch(function(t){})},deleteEducation:function(t){var e=this;this.$axios.delete("/api/profile/education/"+t).then(function(t){console.log(t.data),e.profile=t.data}).catch(function(t){})}}},m={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dashboard"},[n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-12"},[n("h1",{staticClass:"display-4"},[t._v("我的简历")]),t._v(" "),null!=t.user?n("p",{staticClass:"lead text-muted"},[t._v("\n            Welcome \n            "),null==t.profile?n("a",[t._v(t._s(t.user.name))]):n("router-link",{attrs:{to:{name:"profile",params:{handle:t.profile._id}}}},[t._v("\n            "+t._s(t.profile.handle))])],1):t._e(),t._v(" "),null!==t.profile?n("div",[n("ProfileActived",{attrs:{handle:t.profile._id}}),t._v(" "),n("Experience",{attrs:{experience:t.profile.experience,id:t.profile._id},on:{deleteExperience:t.deleteExperience}}),t._v(" "),n("Education",{attrs:{education:t.profile.education,id:t.profile._id},on:{deleteEducation:t.deleteEducation}}),t._v(" "),n("div",{staticStyle:{"margin-bottom":"60px"}},[n("button",{staticClass:"btn btn-danger",on:{click:t.deleteClick}},[t._v("\n                删除当前账户\n              ")])])],1):n("div",[n("p",[t._v("没有任何任何相关的个人信息，请添加一些您的个人信息")]),t._v(" "),n("router-link",{staticClass:"btn btn-lg btn-info",attrs:{to:"/create-profile"}},[t._v("添加个人信息")])],1)])])])])},staticRenderFns:[]};var x=n("VU/8")(b,m,!1,function(t){n("iGxj")},null,null);e.default=x.exports},iGxj:function(t,e){},mvHQ:function(t,e,n){t.exports={default:n("qkKv"),__esModule:!0}},qkKv:function(t,e,n){var i=n("FeBl"),s=i.JSON||(i.JSON={stringify:JSON.stringify});t.exports=function(t){return s.stringify.apply(s,arguments)}},sftl:function(t,e){}});