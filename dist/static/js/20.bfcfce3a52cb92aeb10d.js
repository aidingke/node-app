webpackJsonp([20],{"4YTb":function(t,i){},VTWo:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=s("fZjL"),e=s.n(a),o={name:"artlist",components:{Upload:s("2fVN").a},data:function(){return{topicId:"",edit:!1,objNum:1,showFileData:[],resData:[],errors:"",dialogFormVisible:!1,imgs:[],topicName:"",total:0,num:1,pageNum:13,topicStatus:"0",StatusList:[{status:"0",statusName:"所有权限"},{status:"1",statusName:"可浏览不能复制"},{status:"2",statusName:"可部分浏览"}]}},mounted:function(){this.goPage(this.num)},methods:{changeFun:function(){},okFresh:function(){this.dialogFormVisible=!1,this.goPage(1)},submitTopic:function(){var t=this,i={topicName:this.topicName,imgs:this.imgs,topicStatus:this.topicStatus};this.edit?(i.topicId=this.topicId,this.$axios.post("/api/admin/editTopic",i).then(function(i){1e3==i.data.code&&(t.$message({message:i.data.msg,type:"success"}),t.goPage(1),t.dialogFormVisible=!1),400==i.data.code&&t.$message({message:i.data.msg,type:"error"})})):this.$axios.post("/api/admin/addTopic",i).then(function(i){1e3==i.data.code&&(t.$message({message:i.data.msg,type:"success"}),t.goPage(1),t.dialogFormVisible=!1)})},addTop:function(){this.edit=!1,this.dialogFormVisible=!0},openTop:function(t){var i=this;this.dialogFormVisible=!0,this.topicName=this.resData[t].topicName,this.topicStatus=this.resData[t].topicStatus,this.topicId=this.resData[t]._id,this.edit=!0,this.resData[t].imgs&&(this.showFileData="",this.imgs="",setTimeout(function(){i.showFileData=i.resData[t].imgs,i.imgs=i.resData[t].imgs},100))},goPage:function(t){var i=this,s={};s.num=Number((t-1)*this.pageNum),s.pageNum=this.pageNum,this.$axios.post("/api/admin/getTopicList",s).then(function(t){if(1e3==t.data.code){if(0==e()(t.data.data).length)return i.resData=[],!1;i.resData=t.data.data,i.total=t.data.total}})},deleteBtn:function(t){var i=this;this.$axios.delete("/api/admin/deleteArticle/"+t).then(function(t){400==t.data.code?i.dialog(t.data.msg):1e3==t.data.code&&(i.$message({showClose:!0,message:t.data.msg,duration:1500,type:"success"}),i.goPage(1))}).catch(function(t){i.error=t.response.data.msg,console.log(i.error),i.$message.error("错了哦，请再试一次")})},addImgs:function(t){var i=this;this.imgs="",setTimeout(function(){i.imgs=t},200)}}},n={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"fillcontain TopicList",attrs:{id:"content"}},[s("div",{staticClass:"artlist"},[s("div",{staticClass:"colauto mr8"},[t._m(0),t._v(" "),s("div",{staticClass:"colAdmin"},[s("div",{staticClass:"content margin_tag",staticStyle:{position:"relative",overflow:"hidden"}},[s("div",{staticClass:"right_info"},[s("ul",{staticClass:"el-row shoCont"},[t._l(t.resData,function(i,a){return s("li",{key:a},[s("div",{staticClass:"addTop"},[s("router-link",{attrs:{to:"/topicShow?id="+i._id}},[s("div",{staticClass:"kejianBox"},t._l(i.imgs,function(t,i){return s("span",{key:i},[s("img",{staticStyle:{width:"100%"},attrs:{alt:"",src:t}})])}))]),t._v(" "),s("p",{staticClass:"bk6"}),t._v(" "),s("el-tooltip",{staticClass:"item",attrs:{content:"点击编辑",placement:"right",effect:"light"}},[s("p",{on:{click:function(i){t.openTop(a)}}},[s("span",[t._v(t._s(i.topicName))]),t._v(" "),s("i",[t._v(t._s(i.date.split(" ")[0]))])])])],1)])}),t._v(" "),s("li",[s("div",{staticClass:"addTop",on:{click:t.addTop}},[t._m(1)])])],2)])])])])]),t._v(" "),s("el-dialog",{staticStyle:{width:"900px"},attrs:{title:"添加专题",visible:t.dialogFormVisible},on:{"update:visible":function(i){t.dialogFormVisible=i}}},[s("el-form",[s("el-form-item",t._l(t.StatusList,function(i,a){return s("el-radio-group",{key:a,staticStyle:{"margin-right":"8px",overflow:"hidden",display:"inline-block"},model:{value:t.topicStatus,callback:function(i){t.topicStatus=i},expression:"topicStatus"}},[s("el-radio",{attrs:{label:i.status},on:{change:t.changeFun}},[t._v(t._s(i.statusName))])],1)})),t._v(" "),s("el-form-item",{attrs:{label:""}},[s("p",[t._v("专题图片")]),t._v(" "),s("div",[s("Upload",{attrs:{objNum:this.objNum,showFileData:this.showFileData},on:{addImgs:t.addImgs}})],1)]),t._v(" "),s("el-form-item",{attrs:{label:"专题名称"}},[s("el-input",{attrs:{autocomplete:"off"},model:{value:t.topicName,callback:function(i){t.topicName=i},expression:"topicName"}})],1)],1),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:t.okFresh}},[t._v("取 消")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.submitTopic}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"crumbs"},[this._v("\n          当前位置："),i("span",{attrs:{id:"current_pos"}})])},function(){var t=this.$createElement,i=this._self._c||t;return i("p",{staticStyle:{height:"95px","line-height":"60px"}},[i("span",[this._v("添加专题+")])])}]};var c=s("VU/8")(o,n,!1,function(t){s("4YTb"),s("jQwm")},"data-v-27808908",null);i.default=c.exports},jQwm:function(t,i){}});