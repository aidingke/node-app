webpackJsonp([16],{J2xK:function(t,e,s){t.exports=s.p+"static/img/answers.2ef74e7.jpg"},Tc4J:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Xxa5"),n=s.n(a),i=s("exGp"),r=s.n(i),c={name:"AnswerList",data:function(){return{resData:[]}},computed:{isLogin:function(){return this.$store.getters.user}},methods:{getList:function(){var t=this;return r()(n.a.mark(function e(){var s;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axioss.getAnswerList();case 2:1e3==(s=e.sent).data.code&&(t.resData=s.data.data);case 4:case"end":return e.stop()}},e,t)}))()}},created:function(){this.getList()}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"AnswerList container"},[a("div",{staticClass:"bodyBox"},[a("ul",{staticClass:"el-row"},t._l(t.resData,function(e,n){return a("li",{key:n,staticClass:"el-col el-col-6"},[a("router-link",{attrs:{to:"/answerPaper?id="+e._id}},[a("div",{staticClass:"kejianBox"},[a("img",{staticStyle:{width:"100%","margin-top":"15%"},attrs:{src:s("J2xK"),alt:""}})]),t._v(" "),e.title?[a("p",[a("span",[t._v(t._s(e.title))]),t._v(" "),a("i",[t._v(t._s(e.date.split(" ")[0]))])])]:[a("p",[a("span",[t._v(t._s(t.isLogin.name)+" 的随机考试")]),t._v(" "),a("i",[t._v(t._s(e.date.split(" ")[0]))])])]],2)],1)}))])])},staticRenderFns:[]};var u=s("VU/8")(c,o,!1,function(t){s("opSN")},null,null);e.default=u.exports},opSN:function(t,e){}});