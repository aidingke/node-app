webpackJsonp([31],{CXj8:function(t,a){},OWYa:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=i("RLUD"),e={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"TopicLis container"},[i("div",{staticClass:"bk15"}),t._v(" "),i("div",{staticClass:"artlist"},[i("div",{staticClass:"colauto mr8"},[i("div",{staticClass:"colAdmin"},[i("div",{staticClass:"content margin_tag",staticStyle:{position:"relative",overflow:"hidden"}},[i("div",{staticClass:"right_info"},[i("ul",{staticClass:"el-row shoCont"},t._l(t.resData,function(a,s){return i("li",{key:s},[i("router-link",{attrs:{to:"/topicDetail/"+a._id}},[i("div",{staticClass:"addTop"},[i("div",{staticClass:"kejianBox"},t._l(a.imgs,function(t,a){return i("span",{key:a},[i("img",{staticStyle:{width:"100%"},attrs:{alt:"",src:t}})])})),t._v(" "),i("p",[i("span",[t._v(t._s(a.topicName))]),t._v(" "),i("i",[t._v(t._s(a.date.split(" ")[0]))])])])])],1)}))])])])])])])},staticRenderFns:[]};var n=function(t){i("CXj8")},o=i("VU/8")(s.a,e,!1,n,"data-v-50bd7c41",null);a.default=o.exports},RLUD:function(t,a,i){"use strict";(function(t){var s=i("fZjL"),e=i.n(s);a.a={name:"TopicLis",data:function(){return{resData:[],errors:"",imgs:[],topicName:"",total:0,num:1,pageNum:13}},mounted:function(){this.goPage(this.num),t("footer").show()},methods:{goPage:function(t){var a=this,i={};i.num=Number((t-1)*this.pageNum),i.pageNum=this.pageNum,this.$axios.post("/api/admin/getTopicList",i).then(function(t){if(1e3==t.data.code){if(0==e()(t.data.data).length)return a.resData=[],!1;a.resData=t.data.data,a.total=t.data.total}})}}}}).call(a,i("7t+N"))}});