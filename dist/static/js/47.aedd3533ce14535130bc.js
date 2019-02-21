webpackJsonp([47],{"+c6a":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("WBwv"),o=r("Nl8x"),s={data:function(){return{msgInfo:{title:"",company:"",location:"",from:"",to:"",current:!1,description:""},errors:""}},components:{TextField:n.a,TextArea:o.a},methods:{submit:function(){var e=this;this.$axios.post("/api/profile/experience",this.msgInfo).then(function(t){e.errors="",e.$router.push("/myresume")}).catch(function(t){e.errors=t.response.data})}}},a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"section add-experience"},[r("div",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-8 m-auto"},[r("a",{staticClass:"btn btn-light",on:{click:function(t){t.preventDefault(),e.$router.go(-1)}}},[e._v("返回")]),e._v(" "),r("h1",{staticClass:"display-4 text-center"},[e._v("添加个人经历")]),e._v(" "),r("p",{staticClass:"lead text-center"},[e._v("有关于工作的任何经验")]),e._v(" "),r("small",{staticClass:"d-block pb-3"},[e._v("* 为必填项")]),e._v(" "),r("form",{on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[r("TextField",{attrs:{type:"text",name:"title",placeholder:"* 工作内容",error:e.errors.title},model:{value:e.msgInfo.title,callback:function(t){e.$set(e.msgInfo,"title",t)},expression:"msgInfo.title"}}),e._v(" "),r("TextField",{attrs:{type:"text",name:"company",placeholder:"* 公司",error:e.errors.company},model:{value:e.msgInfo.company,callback:function(t){e.$set(e.msgInfo,"company",t)},expression:"msgInfo.company"}}),e._v(" "),r("TextField",{attrs:{type:"text",name:"location",placeholder:"地点",error:e.errors.location},model:{value:e.msgInfo.location,callback:function(t){e.$set(e.msgInfo,"location",t)},expression:"msgInfo.location"}}),e._v(" "),r("h6",[e._v("开始时间")]),e._v(" "),r("TextField",{attrs:{type:"date",name:"from",error:e.errors.from},model:{value:e.msgInfo.from,callback:function(t){e.$set(e.msgInfo,"from",t)},expression:"msgInfo.from"}}),e._v(" "),r("h6",[e._v("结束时间")]),e._v(" "),r("TextField",{attrs:{type:"date",name:"to",error:e.errors.to,disabled:e.msgInfo.current},model:{value:e.msgInfo.to,callback:function(t){e.$set(e.msgInfo,"to",t)},expression:"msgInfo.to"}}),e._v(" "),r("div",{staticClass:"form-check mb-4"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.msgInfo.current,expression:"msgInfo.current"}],staticClass:"form-check-input",attrs:{type:"checkbox",name:"current",id:"current"},domProps:{checked:Array.isArray(e.msgInfo.current)?e._i(e.msgInfo.current,null)>-1:e.msgInfo.current},on:{change:function(t){var r=e.msgInfo.current,n=t.target,o=!!n.checked;if(Array.isArray(r)){var s=e._i(r,null);n.checked?s<0&&e.$set(e.msgInfo,"current",r.concat([null])):s>-1&&e.$set(e.msgInfo,"current",r.slice(0,s).concat(r.slice(s+1)))}else e.$set(e.msgInfo,"current",o)}}}),e._v(" "),r("label",{staticClass:"form-check-label",attrs:{for:"current"}},[e._v("\n                            当前在职\n                        ")])]),e._v(" "),r("TextArea",{attrs:{placeholder:"工作描述",name:"description",error:e.errors.description,info:"其他工作职责等"},model:{value:e.msgInfo.description,callback:function(t){e.$set(e.msgInfo,"description",t)},expression:"msgInfo.description"}}),e._v(" "),r("input",{staticClass:"btn btn-info btn-block mt-4",attrs:{type:"submit"}})],1)])])])])},staticRenderFns:[]},c=r("VU/8")(s,a,!1,null,null,null);t.default=c.exports}});