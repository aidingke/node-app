webpackJsonp([13],{"1eWA":function(t,e){},AWCa:function(t,e,s){"use strict";(function(t){e.a={name:"head-nav",data:function(){return{items:[{class:"on",name:"首页",href:!0,path:"admin",children:[{class:"on",name:"首页",path:"admin"}]},{name:"文章管理",href:!0,path:"adminArtlist",children:[{class:"on",name:"文章管理",path:"adminArtlist"},{name:"添加文章",path:"adminAddArticle"}]},{name:"试卷管理",path:"adminAnswerList",children:[{class:"on",name:"成绩列表",path:"adminAnswerList"},{name:"试卷列表(考试用)",path:"adminStuTestPaperList"},{name:"新增试卷",path:"adminAddTestPaper"}]},{name:"用户管理",path:"userList",children:[{name:"用户管理",path:"userList"}]},{name:"专题",path:"topicList",children:[{class:"on",name:"专题列表",path:"topicList"}]}],childItem:[]}},computed:{isLogin:function(){return this.$store.getters.isAutnenticated},user:function(){return this.$store.getters.user}},methods:{goLink:function(t){switch(this.$router.push({path:"/"+t}),t){case"admin":this.childItem=this.items[0].children;break;case"adminArtlist":this.childItem=this.items[1].children;break;case"adminAnswerList":this.childItem=this.items[2].children;break;case"userList":this.childItem=this.items[3].children;break;case"topicList":this.childItem=this.items[4].children}},showInfoList:function(){this.$router.push("/infoshow")},logout:function(){localStorage.removeItem("jwtToken"),this.$store.dispatch("clearCurrentState"),this.$router.push("/loginAdmin")}},mounted:function(){t("#top_menu li").click(function(){t(this).addClass("on").siblings().removeClass("on")}),t("#openClose").click(function(){return 1==t(this).data("clicknum")?(t("html").removeClass("on"),t(".left_menu").removeClass("left_menu_on"),t(this).removeClass("close"),t(this).data("clicknum",0)):(t(".left_menu").addClass("left_menu_on"),t(this).addClass("close"),t("html").addClass("on"),t(this).data("clicknum",1)),!1}),this.goLink(this.$route.name)}}}).call(e,s("7t+N"))},nlGn:function(t,e){},qbhH:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("AWCa"),n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"header"},[t._m(0),t._v(" "),s("div",{staticClass:"rt"},[s("router-link",{attrs:{to:"/home"}},[s("div",{staticClass:"bt_tit tab_style white cut_line"},[t._v("\n            魅云安全文档管理系统\n          ")])]),t._v(" "),s("div",{staticClass:"style_but"})],1),t._v(" "),s("div",{staticClass:"colauto",staticStyle:{overflow:"visible"}},[s("div",{staticClass:"log white cut_line"},[t._v("您好!\n        "+t._s(t.user.name)+"\n        \n        "),"0"==t.user.status?[t._v("\n          (超级管理员)\n        ")]:t._e(),t._v(" "),"1"==t.user.status?[t._v("\n          (编辑)\n        ")]:t._e(),t._v(" "),"2"==t.user.status?[t._v("\n          (临时参观)\n        ")]:t._e(),t._v(" "),s("span",[t._v("|")]),t._v(" "),s("a",{attrs:{href:"javascript:;"},on:{click:t.logout}},[t._v("管理员退出")]),t._v(" "),s("span",[t._v("|")]),t._v(" "),s("a",{attrs:{href:"/",target:"_blank",id:"site_homepage"}},[t._v("站点首页")]),s("span",[t._v("|")])],2),t._v(" "),s("ul",{staticClass:"nav white",attrs:{id:"top_menu"}},t._l(t.items,function(e,i){return s("li",{key:i,class:e.class},[s("a",{on:{click:function(s){t.goLink(e.path)}}},[s("span",[t._v(t._s(e.name))])])])}))])]),t._v(" "),s("div",{staticClass:"cl"}),t._v(" "),s("div",[s("div",{staticClass:"colleft left_menu"},[s("div",{attrs:{id:"leftMain"}},[s("ul",t._l(t.childItem,function(e,i){return s("li",{key:i},[s("router-link",{attrs:{to:e.path}},[s("span",[t._v(t._s(e.name))])])],1)}))]),t._v(" "),t._m(1)])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"logo lf"},[e("a",{attrs:{href:"",target:"_blank"}},[e("span",{staticClass:"invisible"},[this._v("魅云安全文档管理系统")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"open",staticStyle:{height:"500px","outline-style":"none","outline-color":"invert","outline-width":"medium"},attrs:{href:"javascript:;",id:"openClose",hideFocus:"hidefocus",title:"展开与关闭"}},[e("span",{staticClass:"hidden"},[this._v("展开")])])}]};var a=function(t){s("nlGn")},l={name:"index",components:{HeadNav:s("VU/8")(i.a,n,!1,a,"data-v-6518cb62",null).exports}},r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"index adminIndex"},[e("HeadNav"),this._v(" "),e("div",{staticClass:"rightContainer"},[e("router-view")],1)],1)},staticRenderFns:[]};var c=s("VU/8")(l,r,!1,function(t){s("1eWA")},null,null);e.default=c.exports}});