webpackJsonp([33],{NzYc:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("Xxa5"),a=s.n(i),n=s("exGp"),r=s.n(n),c={name:"stuTestPaperList",data:function(){return{resData:[],linkUrl:""}},computed:{isLogin:function(){return this.$store.getters.user}},methods:{goUrl:function(t){this.linkUrl=t},getList:function(){var t=this;return r()(a.a.mark(function e(){var s;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axioss.getTestPaperList();case 2:1e3==(s=e.sent).data.code&&(t.resData=s.data.data);case 4:case"end":return e.stop()}},e,t)}))()}},created:function(){this.getList()}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"stuTestPaperList"},[t._m(0),t._v(" "),s("div",{staticClass:"colAdmin"},[s("div",{staticClass:"bodyBox content"},[s("ul",{staticClass:"el-row shoCont"},t._l(t.resData,function(e,i){return s("li",{key:i,staticClass:"el-col el-col-6"},[s("div",{on:{click:function(s){t.goUrl("/StuTestPaperDetail/"+e._id)}}},[t._m(1,!0),t._v(" "),s("h5"),t._v(" "),s("p",[s("span",[t._v(t._s(e.title))]),t._v(" "),s("i",[t._v(t._s(e.date.split(" ")[0]))])])])])}))]),t._v(" "),s("div",{staticClass:"answerDetails"},[s("iframe",{staticStyle:{border:"none"},attrs:{src:t.linkUrl,width:"90%",height:"100%"}})])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"crumbs"},[this._v("\n        当前位置："),e("span",{attrs:{id:"current_pos"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"kejianBox"},[e("img",{staticStyle:{width:"100%","margin-top":"15%"},attrs:{src:s("x3Ns"),alt:""}})])}]};var o=s("VU/8")(c,l,!1,function(t){s("UiIt")},null,null);e.default=o.exports},UiIt:function(t,e){}});