webpackJsonp([16],{"+2YR":function(t,e){},Ew6u:function(t,e){},jjB2:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("sFKE"),o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"TopicShow"},[i("div",{staticClass:"TopicLeftMenu fl"},[i("el-row",{staticClass:"menu_page"},[i("el-col",[i("el-menu",{staticClass:"el-menu-vertical",attrs:{mode:"vertical","background-color":"#FAFAFA","text-color":"#555","active-text-color":"#409eff"},on:{open:t.handleOpen}},[i("div",{staticClass:"el-menu-item",staticStyle:{background:"transparent"}},[i("span",{staticStyle:{"text-align":"right",display:"block"}},[i("i",{staticClass:"el-icon-plus el-tooltip item",staticStyle:{"margin-right":"20px"},on:{click:t.addTopDetails}}),t._v(" "),i("i",{staticClass:"el-icon-news",on:{click:t.addTop}})])]),t._v(" "),i("div",{staticClass:"el-menu-item",staticStyle:{background:"transparent"}},[i("span",{staticStyle:{color:"#000","font-weight":"900"}},[t._v(t._s(t.topicName))])]),t._v(" "),t._l(t.resData,function(e,a){return i("div",{key:a},[e.children?i("el-submenu",{attrs:{index:(a+1).toString()}},[i("template",{slot:"title"},[i("span",[t._v(t._s(e.cataName))])]),t._v(" "),t._l(e.children,function(e,o){return i("el-menu-item-group",{key:o},[i("el-menu-item",{attrs:{index:(a+1).toString()+"-"+(o+1).toString()},on:{click:function(i){t.getContent(e.id)}}},[t._v(t._s(e.title))])],1)})],2):i("el-menu-item",{attrs:{index:(a+1).toString()},on:{click:function(i){t.getContent(e.id)}}},[i("span",[t._v(t._s(e.cataName))])])],1)})],2)],1)],1)],1),t._v(" "),i("div",{staticClass:"rightContainer fl"},[i("h3",{staticClass:"f20 bline p15"},[t._v(t._s(t.resCont.title)+" "),i("span",{staticClass:"f12",staticStyle:{color:"#ccc","font-weight":"300"}},[t._v(t._s(t.resCont.date))])]),t._v(" "),i("div",{staticClass:"defaultMsg",domProps:{innerHTML:t._s(t.defaultMsg)}})]),t._v(" "),i("div",{staticClass:"barBox"},[i("div",{staticClass:"page-bar"},[i("ul",[i("li",[i("router-link",{attrs:{to:"/editTopicDetails?id="+t.resCont._id+"&&topicId="+t.topicId}},[i("el-button",{attrs:{type:"button",icon:"el-icon-edit"}})],1)],1),t._v(" "),i("li",[i("el-button",{attrs:{type:"button",icon:"el-icon-delete"},on:{click:function(e){t.deleTopicDetail(t.resCont._id)}}})],1)])])]),t._v(" "),i("el-dialog",{staticStyle:{width:"900px"},attrs:{title:"添加分类",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",[i("el-form-item",{attrs:{label:""}}),t._v(" "),i("el-form-item",{attrs:{label:"分类名称"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:t.cataName,callback:function(e){t.cataName=e},expression:"cataName"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.submitTopic}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var s=function(t){i("+2YR"),i("Ew6u")},n=i("VU/8")(a.a,o,!1,s,"data-v-4987f519",null);e.default=n.exports},sFKE:function(t,e,i){"use strict";(function(t){var a=i("fZjL"),o=i.n(a);e.a={name:"TopicShow",data:function(){return{dialogFormVisible:!1,topicName:"",topicId:"",cataName:"",defaultMsg:"",resCont:{},resData:[{cataName:"资金管理",path:"fund",children:[{id:"1",title:"资金流水"}]},{name:"信息管理",path:"info",children:[{id:"2",title:"个人信息"}]}]}},methods:{handleOpen:function(t,e){},addTopDetails:function(){this.$router.push({path:"/AddTopicDetails",query:{topicId:this.getUrl("id")}})},addTop:function(){this.dialogFormVisible=!0},submitTopic:function(){var t=this,e={cataName:this.cataName,topicId:this.getUrl("id")};this.$axios.post("/api/admin/addCataTopic",e).then(function(e){1e3==e.data.code&&(t.dialogFormVisible=!1,t.getCataTopicList())})},getTopicCataAllList:function(){var t=this;this.$axios.post("/api/admin/getTopicCataAllList",{topicId:this.getUrl("id")}).then(function(e){1e3==e.data.code&&(t.topicName=e.data.topicName,t.resData=e.data.newList,t.getContent(t.resData[0].id))})},getCataTopicList:function(){var t=this;this.$axios.post("/api/admin/getCataTopicList",{topicId:this.getUrl("id")}).then(function(e){if(1e3==e.data.code){if(0==o()(e.data.data).length)return t.items=[],!1;t.items=e.data.data,t.topicName=e.data.topicName}else 400==e.data.code&&t.dialog(e.data.msg)})},getContent:function(t){var e=this;this.$axios.post("/api/admin/getTopicContent",{id:t}).then(function(t){1e3==t.data.code?(e.defaultMsg=t.data.data.details,e.resCont=t.data.data):400==t.data.code&&e.dialog(t.data.msg)})},deleTopicDetail:function(t){var e=this;this.$confirm("确定要删除此数据吗?","提示",{cancelButtonText:"取消",confirmButtonText:"确定"}).then(function(){e.$axios.delete("/api/admin/deleTopicDetail/"+t).then(function(t){1e3==t.data.code?(e.$message({showClose:!0,message:t.data.msg,type:"success"}),e.getTopicCataAllList()):400==t.data.code&&e.dialog(t.data.msg)}).catch(function(t){e.error=t.response.data.msg,console.log(e.error),e.$message.error("错了哦，请再试一次")})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})}},mounted:function(){console.log(this.getUrl("hid")),"hid"==this.getUrl("hid")&&(console.log(222),t(".header").hide())},created:function(){this.topicId=this.getUrl("id"),this.getTopicCataAllList()}}}).call(e,i("7t+N"))}});