webpackJsonp([31],{HoXz:function(t,a){},tlUA:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("Xxa5"),r=e.n(n),s=e("fZjL"),u=e.n(s),i=e("exGp"),o=e.n(i),c={name:"Frontend",components:{listArticles:e("3SHp").a},data:function(){return{resData:[],total:0,msgInfo:{num:0,pageNum:12,subjectId:0}}},methods:{getList:function(t){var a=this;return o()(r.a.mark(function e(){var n,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(n={subjectId:t}).num=a.msgInfo.num,n.pageNum=a.msgInfo.pageNum,e.next=5,a.$axioss.getlistAlls(n);case 5:if(404!==(s=e.sent).status){e.next=11;break}return a.dialog("查询出错了"),e.abrupt("return",!1);case 11:if(1e3!==s.data.code){e.next=19;break}if(0!=u()(s.data).length){e.next=17;break}return a.resData=[],e.abrupt("return",!1);case 17:a.resData=s.data.data,a.total=s.data.total;case 19:case"end":return e.stop()}},e,a)}))()},goPage:function(t){var a=this;return o()(r.a.mark(function e(){var n,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(n={}).subjectId=a.msgInfo.subjectId,n.num=Number((t-1)*a.msgInfo.pageNum),n.pageNum=a.msgInfo.pageNum,e.next=6,a.$axioss.getlistAlls(n);case 6:if(404!==(s=e.sent).status){e.next=12;break}return a.dialog("查询出错了"),e.abrupt("return",!1);case 12:if(1e3!==s.data.code){e.next=18;break}if(0!=u()(s.data.data).length){e.next=16;break}return a.resData=[],e.abrupt("return",!1);case 16:a.resData=s.data.data,a.total=s.data.total;case 18:case"end":return e.stop()}},e,a)}))()}},mounted:function(){this.msgInfo.subjectId=this.$route.params.id,this.getList(this.$route.params.id)}},d={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"MenuList"},[a("div",{staticClass:"container"},[a("listArticles",{attrs:{resData:this.resData,total:this.total},on:{goPage:this.goPage}})],1)])},staticRenderFns:[]};var f=e("VU/8")(c,d,!1,function(t){e("HoXz")},"data-v-6d1baca4",null);a.default=f.exports}});