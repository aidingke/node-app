webpackJsonp([26],{ZyCh:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Questions"},[n("div",{staticClass:"subMenu ",staticStyle:{"border-bottom":"1px solid #ebebeb"}},[n("div",{staticClass:"subBox container"},[n("ul",[n("li",{staticStyle:{"margin-left":"5px","padding-left":"0"}},[t._v("前端题库集合：")]),t._v(" "),n("li",[n("router-link",{attrs:{to:"/testPaper"}},[t._v("    \n                        前端考核题库 >\n                    ")])],1),t._v(" "),n("li",[n("router-link",{attrs:{to:"/addTestPaper"}},[t._v("    \n                        新增试卷 >\n                    ")])],1),t._v(" "),n("li",[n("router-link",{attrs:{to:"/testPaperList"}},[t._v("    \n                        试卷列表 >\n                    ")])],1),t._v(" "),n("li",{directives:[{name:"show",rawName:"v-show",value:t.isLogin,expression:"isLogin"}]},[n("router-link",{attrs:{to:"/answerList"}},[t._v("    \n                        我的答题列表 >\n                    ")])],1)])])]),t._v(" "),n("router-view")],1)},staticRenderFns:[]};var i=n("VU/8")({name:"Questions",data:function(){return{}},computed:{isLogin:function(){return this.$store.getters.isAutnenticated}}},s,!1,function(t){n("fwBu")},"data-v-6924c7dd",null);e.default=i.exports},fwBu:function(t,e){}});