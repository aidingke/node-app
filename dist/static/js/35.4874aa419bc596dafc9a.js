webpackJsonp([35],{ZyCh:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"Questions"},[s("div",{staticClass:"subMenu ",staticStyle:{"border-bottom":"1px solid #ebebeb"}},[s("div",{staticClass:"subBox container"},[s("ul",[s("li",{staticStyle:{"margin-left":"5px","padding-left":"0"}},[t._v("前端题库集合：")]),t._v(" "),s("li",[s("router-link",{attrs:{to:"/testPaper"}},[t._v("    \n                        客观题考核 >\n                    ")])],1),t._v(" "),s("li",[s("router-link",{attrs:{to:"/addTestPaper"}},[t._v("    \n                        新增试卷 >\n                    ")])],1),t._v(" "),s("li",[s("router-link",{attrs:{to:"/testPaperList"}},[t._v("    \n                        试卷列表 >\n                    ")])],1),t._v(" "),s("li",{directives:[{name:"show",rawName:"v-show",value:t.isLogin,expression:"isLogin"}]},[s("router-link",{attrs:{to:"/answerList"}},[t._v("    \n                        我的答题列表 >\n                    ")])],1),t._v(" "),s("li",{directives:[{name:"show",rawName:"v-show",value:t.isLogin,expression:"isLogin"}]},[s("router-link",{attrs:{to:"/stuTestPaperList"}},[t._v("    \n                        试卷列表(考试) >\n                    ")])],1)])])]),t._v(" "),s("router-view")],1)},staticRenderFns:[]};var n=s("VU/8")({name:"Questions",data:function(){return{}},computed:{isLogin:function(){return this.$store.getters.isAutnenticated}}},i,!1,function(t){s("fOBI")},"data-v-0a247bc5",null);e.default=n.exports},fOBI:function(t,e){}});