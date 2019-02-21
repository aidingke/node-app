webpackJsonp([53],{"5BMS":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("WBwv"),o=r("Nl8x"),n={data:function(){return{msgInfo:{school:"",degree:"",fieldofstudy:"",from:"",to:"",current:!1,description:""},errors:""}},components:{TextField:s.a,TextArea:o.a},methods:{submit:function(){var e=this;this.$axios.post("/api/profile/education",this.msgInfo).then(function(t){e.errors="",e.$router.push("/myresume")}).catch(function(t){e.errors=t.response.data})}}},a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"section add-education"},[r("div",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-8 m-auto"},[r("a",{staticClass:"btn btn-light",on:{click:function(t){t.preventDefault(),e.$router.go(-1)}}},[e._v("返回")]),e._v(" "),r("h1",{staticClass:"display-4 text-center"},[e._v("添加教育经历")]),e._v(" "),r("p",{staticClass:"lead text-center"},[e._v("你所毕业的学校, 参加的培训等")]),e._v(" "),r("small",{staticClass:"d-block pb-3"},[e._v("* 为必填项")]),e._v(" "),r("form",{on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[r("TextField",{attrs:{type:"text",name:"school",placeholder:"* 学校或培训",error:e.errors.school},model:{value:e.msgInfo.school,callback:function(t){e.$set(e.msgInfo,"school",t)},expression:"msgInfo.school"}}),e._v(" "),r("TextField",{attrs:{type:"text",name:"degree",placeholder:"* 学历",error:e.errors.degree},model:{value:e.msgInfo.degree,callback:function(t){e.$set(e.msgInfo,"degree",t)},expression:"msgInfo.degree"}}),e._v(" "),r("TextField",{attrs:{type:"text",name:"fieldofstudy",placeholder:"专业",error:e.errors.fieldofstudy},model:{value:e.msgInfo.fieldofstudy,callback:function(t){e.$set(e.msgInfo,"fieldofstudy",t)},expression:"msgInfo.fieldofstudy"}}),e._v(" "),r("h6",[e._v("开始时间")]),e._v(" "),r("TextField",{attrs:{type:"date",name:"from",error:e.errors.from},model:{value:e.msgInfo.from,callback:function(t){e.$set(e.msgInfo,"from",t)},expression:"msgInfo.from"}}),e._v(" "),r("h6",[e._v("结束时间")]),e._v(" "),r("TextField",{attrs:{type:"date",name:"to",error:e.errors.to,disabled:e.msgInfo.current},model:{value:e.msgInfo.to,callback:function(t){e.$set(e.msgInfo,"to",t)},expression:"msgInfo.to"}}),e._v(" "),r("div",{staticClass:"form-check mb-4"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.msgInfo.current,expression:"msgInfo.current"}],staticClass:"form-check-input",attrs:{type:"checkbox",name:"current",id:"current"},domProps:{checked:Array.isArray(e.msgInfo.current)?e._i(e.msgInfo.current,null)>-1:e.msgInfo.current},on:{change:function(t){var r=e.msgInfo.current,s=t.target,o=!!s.checked;if(Array.isArray(r)){var n=e._i(r,null);s.checked?n<0&&e.$set(e.msgInfo,"current",r.concat([null])):n>-1&&e.$set(e.msgInfo,"current",r.slice(0,n).concat(r.slice(n+1)))}else e.$set(e.msgInfo,"current",o)}}}),e._v(" "),r("label",{staticClass:"form-check-label",attrs:{for:"current"}},[e._v("\n                            当前在校\n                        ")])]),e._v(" "),r("TextArea",{attrs:{placeholder:"在校表现",name:"description",error:e.errors.description,info:"说说你在学习过程的经历"},model:{value:e.msgInfo.description,callback:function(t){e.$set(e.msgInfo,"description",t)},expression:"msgInfo.description"}}),e._v(" "),r("input",{staticClass:"btn btn-info btn-block mt-4",attrs:{type:"submit"}})],1)])])])])},staticRenderFns:[]},c=r("VU/8")(n,a,!1,null,null,null);t.default=c.exports}});