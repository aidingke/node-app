webpackJsonp([13],{hCFt:function(t,e){},lpjo:function(t,e,n){"use strict";(function(t){var a=n("fZjL"),i=n.n(a);e.a={name:"TopicShow",data:function(){return{topicStatus:"0",topicName:"",cataName:"",defaultMsg:"",resCont:{},resData:[{cataName:"管理",path:"fud",children:[{id:"1",title:"资金流水"}]},{name:"管理",path:"in",children:[{id:"2",title:"个人信息"}]}]}},methods:{getTopicCataAllList:function(){var t=this;this.$axios.post("/api/admin/getTopicCataAllList",{topicId:this.$route.params.id}).then(function(e){1e3==e.data.code&&(t.topicName=e.data.topicName,t.resData=e.data.newList,t.getContent(t.resData[0].id),t.topicStatus=e.data.topicStatus),"1"!=t.topicStatus&&"2"!=t.topicStatus||t.$nextTick(function(){document.oncontextmenu=new Function("event.returnValue=false"),document.oncopy=function(){return!1},document.oncut=function(){return!1},document.onpaste=function(){return!1}})})},getCataTopicList:function(){var t=this;this.$axios.post("/api/admin/getCataTopicList",{topicId:this.$route.params.id}).then(function(e){if(1e3==e.data.code){if(0==i()(e.data.data).length)return t.items=[],!1;t.items=e.data.data,t.topicName=e.data.topicName}else 400==e.data.code&&t.dialog(e.data.msg)})},getContent:function(t){var e=this;this.$axios.post("/api/admin/getTopicContent",{id:t}).then(function(t){1e3==t.data.code?(e.defaultMsg=t.data.data.details,e.resCont=t.data.data):400==t.data.code&&e.dialog(t.data.msg)})},funOnCopy:function(){document.oncontextmenu=new Function("event.returnValue=true"),document.oncopy=function(){return!0},document.oncut=function(){return!0},document.onpaste=function(){return!0}}},mounted:function(){this.getTopicCataAllList(),t(".TopicDetail").height(document.documentElement.clientHeight-140),t(".TopicLeftMenu").height(document.documentElement.clientHeight-140),t(".rightContainer").height(document.documentElement.clientHeight-140),t("footer").hide()},destroyed:function(){this.funOnCopy()}}}).call(e,n("7t+N"))},qS7U:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("lpjo"),i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"TopicDetail "},[n("div",{staticClass:"TopicLeftMenu fl"},[n("el-row",{staticClass:"menu_page"},[n("el-col",{staticClass:"menuBar"},[n("el-menu",{staticClass:"el-menu-vertical",attrs:{mode:"vertical","background-color":"#F6F6F6","text-color":"#555","active-text-color":"#409eff"}},[n("div",{staticClass:"el-menu-item",staticStyle:{background:"transparent"}},[n("span",{staticStyle:{color:"#000","font-weight":"900"}},[t._v(t._s(t.topicName))])]),t._v(" "),t._l(t.resData,function(e,a){return n("div",{key:a},[e.children?n("el-submenu",{attrs:{index:(a+1).toString()}},[n("template",{slot:"title"},[n("i",{staticClass:"fas fa-folder-open"}),n("span",{staticStyle:{width:"210px",overflow:"hidden",display:"inline-block"}},[t._v(t._s(e.cataName))])]),t._v(" "),t._l(e.children,function(e,i){return n("el-menu-item-group",{key:i},[n("el-menu-item",{attrs:{index:(a+1).toString()+"-"+(i+1).toString()},on:{click:function(n){t.getContent(e.id)}}},[t._v(t._s(e.title))])],1)})],2):n("el-menu-item",{attrs:{index:(a+1).toString()},on:{click:function(n){t.getContent(e.id)}}},[n("span",[t._v(t._s(e.cataName))])])],1)})],2)],1)],1)],1),t._v(" "),n("div",{staticClass:"rightContainer fl"},[n("h2",{staticClass:"bline p15"},[t._v("\n            "+t._s(t.resCont.title)+" \n            "),n("span",{staticClass:"f12",staticStyle:{color:"#ccc","font-weight":"300"}},[t._v(t._s(t.resCont.date))])]),t._v(" "),n("div",{staticClass:"defaultMsg",domProps:{innerHTML:t._s(t.defaultMsg)}})])])},staticRenderFns:[]};var o=function(t){n("hCFt"),n("ufp4")},c=n("VU/8")(a.a,i,!1,o,"data-v-6ca7412c",null);e.default=c.exports},ufp4:function(t,e){}});