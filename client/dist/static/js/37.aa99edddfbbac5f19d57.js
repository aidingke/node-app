webpackJsonp([37],{"4jmG":function(t,e){},A4Jy:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("OWrC"),a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"IdeasAdd "},[i("div",{staticClass:"fillcontain",attrs:{id:"content"}},[t._m(0),t._v(" "),i("form",{attrs:{method:"post"},on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[i("div",{staticClass:"headBox",staticStyle:{padding:"15px 0"}},[i("div",{staticClass:"head-title",staticStyle:{display:"inline"}},[t._v("分类：")]),t._v(" "),i("div",{staticClass:"block"},t._l(t.SubjectsList,function(e,s){return i("el-radio-group",{key:s,staticStyle:{"margin-right":"8px",overflow:"hidden",display:"inline-block"},model:{value:t.subjradio,callback:function(e){t.subjradio=e},expression:"subjradio"}},[i("el-radio",{attrs:{label:e._id}},[t._v(t._s(e.subjectName))])],1)}))]),t._v(" "),i("div",[i("Upload",{attrs:{objNum:this.objNum},on:{getImgs:t.getImgs}})],1),t._v(" "),i("div",{staticClass:"form-group"},[i("el-input",{class:{"is-invalid":t.error.title},attrs:{type:"text",name:"title",placeholder:"标题"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),t._v(" "),t.error.title?i("div",{staticClass:"invalid-feedback"},[t._v("\n          "+t._s(t.error.title)+"\n        ")]):t._e()],1),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"description"}},[t._v("内容简介")]),t._v(" "),i("div",[i("el-input",{class:{"is-invalid":t.error.description},attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}})],1),t._v(" "),t.error.description?i("div",{staticClass:"invalid-feedback"},[t._v("\n          "+t._s(t.error.description)+"\n        ")]):t._e()]),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"details"}},[t._v("详情")]),t._v(" "),i("UE",{ref:"ue2",attrs:{defaultMsg:t.defaultMsg,config:t.config2,id:t.ue2}}),t._v(" "),t.error.details?i("div",{staticClass:"invalid-feedback"},[t._v("\n          "+t._s(t.error.details)+"\n        ")]):t._e()],1),t._v(" "),i("button",{staticClass:"el-button el-button--primary"},[t._v("提交")]),t._v(" "),i("el-switch",{attrs:{"active-text":"共享","inactive-text":"私有"},on:{change:function(e){t.checkFun()}},model:{value:t.checkT,callback:function(e){t.checkT=e},expression:"checkT"}})],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"crumbs"},[this._v("\n      当前位置："),e("span",{attrs:{id:"current_pos"}})])}]};var n=function(t){i("4jmG")},r=i("VU/8")(s.a,a,!1,n,"data-v-693817bc",null);e.default=r.exports},OWrC:function(t,e,i){"use strict";(function(t){var s=i("Xxa5"),a=i.n(s),n=i("exGp"),r=i.n(n),o=i("25Zw"),c=i("VayU");e.a={name:"IdeasAdd",components:{UE:c.a,Upload:o.a},data:function(){return{checkT:!0,subjradio:"",SubjectsList:[],title:"",imgs:[],defaultDes:"",defaultMsg:"",ue1:"ue1",ue2:"ue2",objNum:1,config2:{initialFrameWidth:null,initialFrameHeight:400,autoHeightEnabled:!1,autoFloatEnabled:!0,maximumWords:7e4,toolbars:[["Bold","Underline","JustifyLeft","JustifyCenter","JustifyRight","ForeColor","Undo","Redo","FontFamily","FontSize","InsertImage","Emotion","InsertVideo","Link","Map","Preview","inserttable","FullScreen"]],elementPathEnabled:!1},description:"",details:"",oks:!0,error:""}},methods:{showImgs:function(){},checkFun:function(){this.oks=!this.oks},getImgs:function(t){var e=this;console.log(t),this.imgs=[],t.forEach(function(t){e.uploadFile(t)})},uploadFile:function(t){var e=new FileReader,i=this;e.onload=function(t){i.imgs.unshift(t.target.result)},e.readAsDataURL(t)},submit:function(){var t=this,e=this.$store.getters.user,i={title:this.title,subjectId:this.subjradio,description:this.description,details:this.$refs.ue2.getContent(),name:e.name,imgs:this.imgs.join("|"),checkT:this.oks};this.$axios.post("/api/admin/add",i).then(function(e){if(1e3==e.data.code)t.$message({message:"添加成功",type:"success"});else if(400==e.data.code)return t.dialog(e.data.msg),!1;t.$router.back(-1)}).catch(function(e){t.error=e.response.data})},getSubjectMenuList:function(){var t=this;return r()(a.a.mark(function e(){var i,s;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axioss.getSubjectMenuList();case 2:1e3===(i=e.sent).data.code&&(s=void 0,(s=i.data.data).forEach(function(e,i){1==e.status&&(t.subjradio=e._id)}),t.SubjectsList=s);case 4:case"end":return e.stop()}},e,t)}))()}},mounted:function(){this.getSubjectMenuList(),t(".rightContainer").css({background:"#fff"})}}}).call(e,i("7t+N"))}});