webpackJsonp([27],{Liqd:function(t,s){},qaEd:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e={name:"IdeasDetail",data:function(){return{resData:{},errors:"",userId:"",u_id:"",uname:""}},created:function(){this.getInfo(this.getUrl("id")),this.userId=sessionStorage.getItem("userId")},mounted:function(){},methods:{getInfo:function(t){var s=this;this.$axios("/api/ideas/details/"+t).then(function(t){s.resData=t.data,document.title=s.resData.title,s.uname=t.data.user.name,s.u_id=t.data.user._id,s.resData.description=s.repImgInfos(s.resData.description)})}}},i={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("div",{staticClass:"card card-body container ideaDetail"},[a("h1",{staticClass:"cent"},[t._v(" "+t._s(t.resData.title))]),t._v(" "),a("div",{staticClass:"article-meta"},[a("span",{staticClass:"item"},[t._v(t._s(t.resData.date))]),t._v(" "),t.resData.subjectId?a("span",{staticClass:"item"},[t._v("分类："+t._s(t.resData.subjectId.subjectName))]):t._e(),t._v(" "),a("span",{staticClass:"item"},[t._v("发布者："+t._s(t.uname))])]),t._v(" "),a("div",{staticClass:"conts hid",domProps:{innerHTML:t._s(t.resData.description)}}),t._v(" "),a("div",{staticClass:"descImg hid"},t._l(t.resData.imgs,function(t,s){return a("span",{key:s,staticClass:"okw"},[a("img",{attrs:{src:t}})])})),t._v(" "),a("div",{staticClass:"conts ",attrs:{id:"details"},domProps:{innerHTML:t._s(t.resData.details)}}),t._v(" "),a("p",[t._v("开发者："+t._s(t.uname))]),t._v(" "),a("p",[t._v(t._s(t.resData.date))]),t._v(" "),a("div",[a("a",{staticClass:"btn-primary btn",attrs:{href:"javascript:history.go(-1)"}},[t._v("返回")]),t._v(" "),t.userId==t.u_id?a("a",{staticClass:"btn btn-success",attrs:{href:"/artedit?id="+t.resData._id}},[t._v("编辑")]):t._e()])])])},staticRenderFns:[]};var r=a("VU/8")(e,i,!1,function(t){a("Liqd")},null,null);s.default=r.exports}});