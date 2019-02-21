webpackJsonp([43],{jokq:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o("WBwv"),s=o("Nl8x"),r={name:"EditExperience",data:function(){return{msgInfo:{title:"",company:"",location:"",from:"",to:"",current:!1,description:""},errors:""}},components:{TextField:n.a,TextArea:s.a},created:function(){this.msgInfo=JSON.parse(sessionStorage.getItem("objExperience")),console.log(this.msgInfo)},methods:{submit:function(){var e=this;this.$axios.post("/api/profile/editExperience",this.msgInfo).then(function(t){e.errors="",sessionStorage.removeItem("objExperience"),e.$router.push("/myresume")}).catch(function(t){e.errors=t.response.data})},getProfiles:function(e){var t=this;this.$axios.get("/api/profile/handle/"+e).then(function(e){e.data.skills=e.data.skills?e.data.skills.join(","):"",t.msgInfo=e.data,console.log(t.msgInfo)}).catch(function(e){t.profile=null,console.log(e.response.data)})}}},a={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"section add-experience"},[o("div",{staticClass:"container"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-8 m-auto"},[o("a",{staticClass:"btn btn-light",on:{click:function(t){t.preventDefault(),e.$router.go(-1)}}},[e._v("返回")]),e._v(" "),o("h1",{staticClass:"display-4 text-center"},[e._v("修改个人经历")]),e._v(" "),o("p",{staticClass:"lead text-center"},[e._v("有关于工作的任何经验")]),e._v(" "),o("small",{staticClass:"d-block pb-3"},[e._v("* 为必填项")]),e._v(" "),o("form",{on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[o("TextField",{attrs:{type:"text",name:"title",placeholder:"* 工作内容",error:e.errors.title},model:{value:e.msgInfo.title,callback:function(t){e.$set(e.msgInfo,"title",t)},expression:"msgInfo.title"}}),e._v(" "),o("TextField",{attrs:{type:"text",name:"company",placeholder:"* 公司",error:e.errors.company},model:{value:e.msgInfo.company,callback:function(t){e.$set(e.msgInfo,"company",t)},expression:"msgInfo.company"}}),e._v(" "),o("TextField",{attrs:{type:"text",name:"location",placeholder:"地点",error:e.errors.location},model:{value:e.msgInfo.location,callback:function(t){e.$set(e.msgInfo,"location",t)},expression:"msgInfo.location"}}),e._v(" "),o("h6",[e._v("开始时间")]),e._v(" "),o("TextField",{attrs:{type:"date",name:"from",error:e.errors.from},model:{value:e.msgInfo.from,callback:function(t){e.$set(e.msgInfo,"from",t)},expression:"msgInfo.from"}}),e._v(" "),o("h6",[e._v("结束时间")]),e._v(" "),o("TextField",{attrs:{type:"date",name:"to",error:e.errors.to,disabled:e.msgInfo.current},model:{value:e.msgInfo.to,callback:function(t){e.$set(e.msgInfo,"to",t)},expression:"msgInfo.to"}}),e._v(" "),o("div",{staticClass:"form-check mb-4"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.msgInfo.current,expression:"msgInfo.current"}],staticClass:"form-check-input",attrs:{type:"checkbox",name:"current",id:"current"},domProps:{checked:Array.isArray(e.msgInfo.current)?e._i(e.msgInfo.current,null)>-1:e.msgInfo.current},on:{change:function(t){var o=e.msgInfo.current,n=t.target,s=!!n.checked;if(Array.isArray(o)){var r=e._i(o,null);n.checked?r<0&&e.$set(e.msgInfo,"current",o.concat([null])):r>-1&&e.$set(e.msgInfo,"current",o.slice(0,r).concat(o.slice(r+1)))}else e.$set(e.msgInfo,"current",s)}}}),e._v(" "),o("label",{staticClass:"form-check-label",attrs:{for:"current"}},[e._v("\n                            当前在职\n                        ")])]),e._v(" "),o("TextArea",{attrs:{placeholder:"工作描述",name:"description",error:e.errors.description,info:"其他工作职责等"},model:{value:e.msgInfo.description,callback:function(t){e.$set(e.msgInfo,"description",t)},expression:"msgInfo.description"}}),e._v(" "),o("input",{staticClass:"btn btn-info btn-block mt-4",attrs:{type:"submit"}})],1)])])])])},staticRenderFns:[]},c=o("VU/8")(r,a,!1,null,null,null);t.default=c.exports}});