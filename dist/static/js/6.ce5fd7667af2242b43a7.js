webpackJsonp([6],{"25Zw":function(t,e,i){"use strict";var a=i("Gu7T"),s=i.n(a),o={name:"upload",data:function(){return{showFileData:[],allUploadFiles:[]}},props:{objNum:{type:Number},loading:{type:Boolean,default:!1}},methods:{addFile:function(){var t=this,e=[].concat(s()(this.$refs.myFile.files)),i=!1;if(this.showFileData.length+e.length>this.objNum)alert("最多发表"+this.objNum+"张图片");else{if(e.forEach(function(e,a){var s=e.name.lastIndexOf("."),o=e.name.length,n=e.name.substring(s+1,o);if("jpg"!==n.toLowerCase()&&"png"!==n.toLowerCase()&&"jpeg"!==n.toLowerCase()&&"gif"!==n.toLowerCase())return alert("请上传图片文件"),i=!0,!1;if(!(e.size/1024/1024<=1))return alert("上传文件大小不能超过1M"),i=!0,!1;i=!1,t.allUploadFiles.push(e);var l=t.getObjectURL(e);t.showFileData.push(l)}),1==i)return!1;console.log(this.allUploadFiles),this.$emit("getImgs",this.allUploadFiles)}},getObjectURL:function(t){var e=null;return void 0!=window.createObjectURL?e=window.createObjectURL(t):void 0!=window.URL?e=window.URL.createObjectURL(t):void 0!=window.webkitURL&&(e=window.webkitURL.createObjectURL(t)),e},removeImg:function(t){var e=this;this.showFileData.forEach(function(i,a){i==t&&(e.showFileData.splice(a,1),e.allUploadFiles.splice(a,1))})}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"img_wrap"},[t._l(t.showFileData,function(e,a){return t.showFileData.length>0?i("div",{key:a,staticClass:"isImg"},[i("img",{attrs:{src:e,alt:""}}),t._v(" "),i("a",{directives:[{name:"show",rawName:"v-show",value:!t.loading,expression:"!loading"}],staticClass:"remove",on:{click:function(i){t.removeImg(e)}}},[t._v("x")])]):t._e()}),t._v("\n  最多能上传"+t._s(this.objNum)+"张图\n\n  "),t.showFileData.length<this.objNum?i("div",{staticClass:"isImg img_upload"},[i("button",{staticClass:"btn_upload"},[i("input",{ref:"myFile",attrs:{type:"file",multiple:"multiple",accept:"img/*"},on:{change:t.addFile}})])]):t._e()],2)},staticRenderFns:[]};var l=i("VU/8")(o,n,!1,function(t){i("bj54")},"data-v-5e9dc694",null);e.a=l.exports},Krw2:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("//Fk"),s=i.n(a),o=i("Gu7T"),n=i.n(o),l={name:"upload",data:function(){return{k1:"",k2:"",imgs:[],temps:"",editNums:0,showFileData:[],allUploadFiles:[]}},props:{showFileDatas:{type:Array},objNum:{type:Number},loading:{type:Boolean,default:!1}},created:function(){this.showFileDatas?this.showFileData=this.showFileDatas:""!=this.showFileDatas&&null!=this.showFileDatas||(this.showFileData.length=0),this.editNums=this.objNum},methods:{addFile:function(){var t=this,e=[].concat(n()(this.$refs.myFile.files)),i=!1;if(!(this.showFileData.length+e.length>this.editNums)){if(this.allUploadFiles=[],e.forEach(function(e,a){var s=e.name.lastIndexOf("."),o=e.name.length,n=e.name.substring(s+1,o);return"jpg"!==n.toLowerCase()&&"png"!==n.toLowerCase()&&"jpeg"!==n.toLowerCase()&&"gif"!==n.toLowerCase()?(alert("请上传图片文件"),i=!0,!1):e.size/1024/1024<=1?(i=!1,void t.allUploadFiles.push(e)):(alert("上传文件大小不能超过1M"),i=!0,!1)}),1==i)return!1;this.imgs=[];var a=this;return this.allUploadFiles.forEach(function(e){t.uploadFile(e).then(function(t){a.imgs.push(t)})}),this.temps=this.imgs,console.log(this.imgs),setTimeout(function(){a.$axios.post("/api/ideas/fake",this.imgs).then(function(t){console.log(t)})},1e3),!1}alert("最多发表"+this.objNum+"张图片")},uploadFile:function(t){return new s.a(function(e,i){var a=new FileReader;a.readAsDataURL(t),a.onload=function(t){e(this.result)}})},funOpt:function(t){this.$emit("addImgs",t)},getObjectURL:function(t){var e=null;return void 0!=window.createObjectURL?e=window.createObjectURL(t):void 0!=window.URL?e=window.URL.createObjectURL(t):void 0!=window.webkitURL&&(e=window.webkitURL.createObjectURL(t)),e},removeImg:function(t){var e=this;this.allUploadFiles.shift(),this.showFileData.forEach(function(i,a){i==t&&(0==a&&e.$emit("showUps",!0),e.showFileData.splice(a,1))}),this.temps=this.showFileData}}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"img_wrap"},[t._l(t.showFileData,function(e,a){return t.showFileData.length>0?i("div",{key:a,staticClass:"isImg"},[i("img",{attrs:{src:e,alt:""}}),t._v(" "),i("a",{directives:[{name:"show",rawName:"v-show",value:!t.loading,expression:"!loading"}],staticClass:"remove",on:{click:function(i){t.removeImg(e)}}},[t._v("x")])]):t._e()}),t._v(" "),t._v("\n    最多能上传"+t._s(this.objNum)+"张图\n\n    "),t.showFileData.length<this.editNums?i("div",{staticClass:"isImg img_upload"},[i("button",{staticClass:"btn_upload"},[i("input",{ref:"myFile",attrs:{type:"file",multiple:"multiple",accept:"img/*"},on:{change:t.addFile}})])]):t._e()],2)},staticRenderFns:[]};var d=i("VU/8")(l,r,!1,function(t){i("rZdS")},"data-v-731e6f04",null).exports,c=i("25Zw"),u={name:"IdeasEdit",components:{UE:i("VayU").a,Upload:d,Upload2:c.a},data:function(){return{temps:"",tempm:"",newA:[],newB:[],resData:"",oks:!0,error:"",subjradio:"",SubjectsList:[],defaultDes:"",defaultMsg:"",imgs:[],objNum:1,showFileData:[],ue1:"ue1",ue2:"ue2",config1:{initialFrameWidth:null,initialFrameHeight:200,autoHeightEnabled:!1,autoFloatEnabled:!0,maximumWords:150,toolbars:[["Source","Undo","Redo","InsertImage","Emotion"]],elementPathEnabled:!1},config2:{initialFrameWidth:null,initialFrameHeight:400,autoHeightEnabled:!1,autoFloatEnabled:!0,maximumWords:7e4,toolbars:[["Source","Bold","Underline","JustifyLeft","JustifyCenter","JustifyRight","ForeColor","Undo","Redo","FontFamily","FontSize","InsertImage","Emotion","InsertVideo","Link","Map","Preview","inserttable","FullScreen"]],elementPathEnabled:!1}}},created:function(){this.getInfo(this.getUrl("id")),this.SubjectsList=JSON.parse(sessionStorage.getItem("subMenu"))},methods:{checkFun:function(){this.oks=!this.oks},addImgs:function(t){return console.log(t.length),console.log("----------------"),!1},getImgs:function(t){var e=this;this.imgs=[],t.forEach(function(t){e.uploadFile(t)})},uploadFile:function(t){var e=new FileReader,i=this;e.onload=function(t){return i.imgs.unshift(t.target.result)},e.readAsDataURL(t)},showUps:function(t){t&&(this.tempm=!0)},getInfo:function(t){var e=this;this.$axios("/api/ideas/artedit/"+t).then(function(t){if(t.data.imgs.length>0&&(e.showFileData=t.data.imgs),400==t.data.code)return alert(t.data.msg),!1;e.resData=t.data,e.resData.subjectId&&(e.subjradio=e.resData.subjectId),e.defaultDes=e.resData.description,e.defaultMsg=e.resData.details,e.oks=e.resData.checkT})},submit:function(t,e){var i=this,a={title:this.resData.title,subjectId:this.subjradio,description:this.resData.description,imgs:this.imgs.join("|"),details:this.addImg(this.$refs.ue2.getContent()),checkT:this.oks};this.$axios.post("/api/ideas/edit/"+this.getUrl("id"),a).then(function(t){console.log(t),i.$message({message:t.data.success_msg,type:"success"}),i.$router.push({path:"/artlist"})}).catch(function(t){i.error=t.response.data,console.log(i.error)})}}},h={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"card card-body IdeasEdit container"},[i("form",{attrs:{method:"post"},on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[i("div",{staticClass:"headBox",staticStyle:{padding:"15px 0"}},[i("div",{staticClass:"head-title",staticStyle:{display:"inline"}},[t._v("分类：")]),t._v(" "),i("div",{staticClass:"block",staticStyle:{width:"79%","margin-left":"1%",display:"inline"}},t._l(t.SubjectsList,function(e,a){return i("el-radio-group",{key:a,staticStyle:{"margin-right":"8px",overflow:"hidden",display:"inline-block"},model:{value:t.subjradio,callback:function(e){t.subjradio=e},expression:"subjradio"}},[i("el-radio",{attrs:{label:e._id}},[t._v(t._s(e.subjectName))])],1)}))]),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"title"}},[t._v("标题：")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.resData.title,expression:"resData.title"}],staticClass:"form-control title",class:{"is-invalid":t.error.title},staticStyle:{display:"inline-block"},attrs:{type:"text",name:"title"},domProps:{value:t.resData.title},on:{input:function(e){e.target.composing||t.$set(t.resData,"title",e.target.value)}}}),t._v(" "),t.error.title?i("div",{staticClass:"invalid-feedback"},[t._v("\n          "+t._s(t.error.title)+"\n        ")]):t._e()]),t._v(" "),i("div",{staticClass:"form-group"},[this.showFileData.length>0?[i("Upload",{attrs:{objNum:this.objNum,showFileDatas:this.showFileData},on:{addImgs:t.addImgs,showUps:t.showUps}})]:t._e(),t._v(" "),t.tempm?i("div",[i("Upload2",{attrs:{objNum:this.objNum},on:{getImgs:t.getImgs}})],1):t._e(),t._v(" "),i("br"),t._v(" "),i("label",{attrs:{for:"title"}},[t._v("内容简介")]),t._v(" "),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.resData.description,expression:"resData.description"}],staticClass:"form-control",class:{"is-invalid":t.error.description},staticStyle:{height:"100px"},attrs:{name:"description"},domProps:{value:t.resData.description},on:{input:function(e){e.target.composing||t.$set(t.resData,"description",e.target.value)}}}),t._v(" "),t.error.description?i("div",{staticClass:"invalid-feedback"},[t._v("\n          "+t._s(t.error.description)+"\n        ")]):t._e()],2),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"details"}},[t._v("详情")]),t._v(" "),this.defaultMsg?[i("UE",{ref:"ue2",attrs:{defaultMsg:t.defaultMsg,config:t.config2,id:t.ue2}})]:t._e(),t._v(" "),t.error.details?i("div",{staticClass:"invalid-feedback"},[t._v("\n          "+t._s(t.error.details)+"\n        ")]):t._e()],2),t._v(" "),i("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("编辑")]),t._v(" "),i("a",{staticClass:"btn-default btn",staticStyle:{background:"#ddd",color:"#555"},attrs:{href:"javascript:history.go(-1)"}},[t._v("返回")]),t._v(" "),i("a",{class:{oks:t.oks},staticStyle:{"margin-left":"3%"},on:{click:function(e){t.checkFun()}}},[t.oks?[t._v("已开")]:t._e(),t._v(" "),!0!==t.oks?[t._v("已关")]:t._e()],2)])])])},staticRenderFns:[]};var m=i("VU/8")(u,h,!1,function(t){i("i4qw")},"data-v-64792b51",null);e.default=m.exports},bj54:function(t,e){},i4qw:function(t,e){},rZdS:function(t,e){}});