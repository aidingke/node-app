webpackJsonp([35],{"8DHw":function(t,e){},vfCK:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("25Zw"),a={name:"IdeasAdd",components:{UE:i("VayU").a,Upload:s.a},data:function(){return{subjradio:"",SubjectsList:[],title:"",imgs:[],defaultDes:"",defaultMsg:"",ue1:"ue1",ue2:"ue2",objNum:1,config1:{initialFrameWidth:null,initialFrameHeight:200,autoHeightEnabled:!1,autoFloatEnabled:!0,maximumWords:100,toolbars:[["Source","Undo","Redo","InsertImage","Emotion"]],elementPathEnabled:!1},config2:{initialFrameWidth:null,initialFrameHeight:400,autoHeightEnabled:!1,autoFloatEnabled:!0,maximumWords:7e4,toolbars:[["Source","Bold","Underline","JustifyLeft","JustifyCenter","JustifyRight","ForeColor","Undo","Redo","FontFamily","FontSize","InsertImage","Emotion","InsertVideo","Link","Map","Preview","inserttable","FullScreen"]],elementPathEnabled:!1},description:"",details:"",oks:!0,error:""}},methods:{checkFun:function(){this.oks=!this.oks},getImgs:function(t){var e=this;console.log(t),this.imgs=[],t.forEach(function(t){e.uploadFile(t)})},uploadFile:function(t){var e=new FileReader,i=this;e.onload=function(t){i.imgs.unshift(t.target.result)},e.readAsDataURL(t)},submit:function(){var t=this,e=this.$store.getters.user,i={title:this.title,subjectId:this.subjradio,description:this.description,details:this.addImg(this.$refs.ue2.getContent()),name:e.name,imgs:this.imgs.join("|"),checkT:this.oks};this.$axios.post("/api/ideas/add",i).then(function(e){t.$router.push({path:"/artlist"})}).catch(function(e){t.error=e.response.data})}},mounted:function(){var t=this;this.SubjectsList=JSON.parse(sessionStorage.getItem("subMenu")),this.SubjectsList.forEach(function(e,i){1==e.status&&(t.subjradio=e._id)})}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"card card-body IdeasAdd container mt10",staticStyle:{padding:"15px"}},[i("h3",[t._v("专栏")]),t._v(" "),i("form",{attrs:{method:"post"},on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[i("div",{staticClass:"headBox",staticStyle:{padding:"15px 0"}},[i("div",{staticClass:"head-title",staticStyle:{display:"inline"}},[t._v("分类：")]),t._v(" "),i("div",{staticClass:"block",staticStyle:{width:"79%","margin-left":"1%",display:"inline"}},t._l(t.SubjectsList,function(e,s){return i("el-radio-group",{key:s,staticStyle:{"margin-right":"8px",overflow:"hidden",display:"inline-block"},model:{value:t.subjradio,callback:function(e){t.subjradio=e},expression:"subjradio"}},[i("el-radio",{attrs:{label:e._id}},[t._v(t._s(e.subjectName))])],1)}))]),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"title"}},[t._v("标题")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"form-control",class:{"is-invalid":t.error.title},attrs:{type:"text",name:"title"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}}),t._v(" "),t.error.title?i("div",{staticClass:"invalid-feedback"},[t._v("\n        "+t._s(t.error.title)+"\n      ")]):t._e()]),t._v(" "),i("div",{staticClass:"form-group"},[i("Upload",{attrs:{objNum:this.objNum},on:{getImgs:t.getImgs}}),t._v(" "),i("br"),t._v(" "),i("label",{attrs:{for:"description"}},[t._v("内容简介")]),t._v(" "),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"form-control",class:{"is-invalid":t.error.description},staticStyle:{height:"100px"},attrs:{name:"description"},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}}),t._v(" "),t.error.description?i("div",{staticClass:"invalid-feedback"},[t._v("\n        "+t._s(t.error.description)+"\n      ")]):t._e()],1),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"details"}},[t._v("详情")]),t._v(" "),i("UE",{ref:"ue2",attrs:{defaultMsg:t.defaultMsg,config:t.config2,id:t.ue2}}),t._v(" "),t.error.details?i("div",{staticClass:"invalid-feedback"},[t._v("\n        "+t._s(t.error.details)+"\n      ")]):t._e()],1),t._v(" "),i("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("提交")]),t._v(" "),i("a",{class:{oks:t.oks},staticStyle:{"margin-left":"3%"},on:{click:function(e){t.checkFun()}}},[t.oks?[t._v("已开")]:t._e(),t._v(" "),!0!==t.oks?[t._v("已关")]:t._e()],2)])])},staticRenderFns:[]};var n=i("VU/8")(a,o,!1,function(t){i("8DHw")},"data-v-52f915f0",null);e.default=n.exports}});