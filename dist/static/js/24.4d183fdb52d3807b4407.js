webpackJsonp([24],{"7lcU":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),r=a.n(n),s=a("fZjL"),u=a.n(s),i=a("exGp"),o=a.n(i),c={name:"Vuejs",components:{listArticles:a("3SHp").a},data:function(){return{resData:[],total:0,msgInfo:{num:0,pageNum:12,subjectId:0}}},methods:{getList:function(t){var e=this;return o()(r.a.mark(function a(){var n,s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return(n={subjectId:t}).num=e.msgInfo.num,n.pageNum=e.msgInfo.pageNum,a.next=5,e.$axioss.getMenuList(n);case 5:if(404!==(s=a.sent).status){a.next=11;break}return e.dialog("查询出错了"),a.abrupt("return",!1);case 11:if(1e3!==s.data.code){a.next=19;break}if(0!=u()(s.data).length){a.next=17;break}return e.resData=[],a.abrupt("return",!1);case 17:e.resData=s.data.data,e.total=s.data.total;case 19:case"end":return a.stop()}},a,e)}))()},goPage:function(t){var e=this;return o()(r.a.mark(function a(){var n,s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return(n={}).subjectId=e.msgInfo.subjectId,n.num=Number((t-1)*e.msgInfo.pageNum),n.pageNum=e.msgInfo.pageNum,a.next=6,e.$axioss.getMenuList(n);case 6:if(404!==(s=a.sent).status){a.next=12;break}return e.dialog("查询出错了"),a.abrupt("return",!1);case 12:if(1e3!==s.data.code){a.next=18;break}if(0!=u()(s.data.data).length){a.next=16;break}return e.resData=[],a.abrupt("return",!1);case 16:e.resData=s.data.data,e.total=s.data.total;case 18:case"end":return a.stop()}},a,e)}))()}},mounted:function(){this.msgInfo.subjectId=this.$route.params.id,this.getList(this.$route.params.id)}},d={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"MenuList"},[e("div",{staticClass:"container"},[e("listArticles",{attrs:{resData:this.resData,total:this.total},on:{goPage:this.goPage}})],1)])},staticRenderFns:[]};var f=a("VU/8")(c,d,!1,function(t){a("Toqp")},"data-v-772b2376",null);e.default=f.exports},Toqp:function(t,e){}});