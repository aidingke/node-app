webpackJsonp([9],{Tc4J:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Xxa5"),n=s.n(a),r=s("exGp"),i=s.n(r),c={name:"AnswerList",data:function(){return{resData:[]}},computed:{isLogin:function(){return this.$store.getters.user}},methods:{getList:function(){var t=this;return i()(n.a.mark(function e(){var s;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axioss.getAnswerList();case 2:1e3==(s=e.sent).data.code&&(t.resData=s.data.data);case 4:case"end":return e.stop()}},e,t)}))()}},created:function(){this.getList()}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"AnswerList mainCont"},[a("div",{staticClass:"bodyBox"},[a("ul",{staticClass:"el-row"},t._l(t.resData,function(e,n){return a("li",{key:n,staticClass:"el-col el-col-6"},[a("router-link",{attrs:{to:"/answerPaper?id="+e._id}},[a("div",{staticClass:"kejianBox"},[a("img",{staticStyle:{width:"100%","margin-top":"15%"},attrs:{src:s("x3Ns"),alt:""}})]),t._v(" "),a("h5"),t._v(" "),a("p",[a("span",[t._v(t._s(t.isLogin.name)+" 的考试")]),t._v(" "),a("i",[t._v(t._s(e.date))])])])],1)}))])])},staticRenderFns:[]};var u=s("VU/8")(c,o,!1,function(t){s("hlwP")},null,null);e.default=u.exports},hlwP:function(t,e){},x3Ns:function(t,e,s){t.exports=s.p+"static/img/st.a0353cc.jpg"}});