webpackJsonp([16],{"1PKO":function(t,s,e){"use strict";(function(t){var a=e("Xxa5"),i=e.n(a),n=e("exGp"),r=e.n(n);s.a={name:"stuTestPaperDetail",data:function(){return{resData:{title:""},score:"",totalNum:"",sinData:[],mulData:[],comData:[],DisData:[],every0:0,every1:0,every2:0,every3:0,targetImg:"",allQuesNum:[],imgDialogVisible:!1}},methods:{goBack:function(){this.$router.back(-1)},showImages:function(){this.targetImg=event.target.getAttribute("src"),this.imgDialogVisible=!0},onpaste:function(){return"return false"},getList:function(){var t=this;return r()(i.a.mark(function s(){var e,a,n;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,t.$axioss.getStuPaperDetail({id:t.$route.query.id});case 2:return 1e3===(e=s.sent).data.code&&(a=e.data.datas.bigList,t.resData.title=e.data.datas.title,t.resData.description=e.data.datas.description,t.resData.isPublic=e.data.datas.isPublic,a.forEach(function(s){switch(s.questKind,s.questKind){case"0":t.sinData.push(s),t.every0=s.scores;break;case"1":t.mulData.push(s),t.every1=s.scores;break;case"2":t.comData.push(s),t.every2=s.scores;break;case"3":t.DisData.push(s),t.every3=s.scores}}),t.totalNum=a.length,n=0,t.sinData&&(n++,t.allQuesNum[0]=n),t.mulData&&(n++,t.allQuesNum[1]=n),t.comData&&(n++,t.allQuesNum[3]=n),t.DisData&&(n++,t.allQuesNum[4]=n)),s.abrupt("return",!1);case 5:case"end":return s.stop()}},s,t)}))()},stuSubmitAnswer:function(){var t=this;return r()(i.a.mark(function s(){var e,a,n;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return e={questionItemBankId:t.$route.params.id,title:t.resData.title,description:t.resData.description,isPublic:t.resData.isPublic,bigList:[]},a=[],void 0,t.sinData.forEach(function(s,e){var i={answerList:{}};i.questionItemId=s.questionItemId,i.scores=t.every0.toString(),void 0==s.questAnswer?!0:i.stuQuestAnswer=s.questAnswer.toString(),i.answerList.itemList=s.itemList,i.answerList.questDesc=s.questDesc,i.answerList.questImg=s.questImg,i.answerList.questKind=s.questKind,a.push(i)}),t.mulData.forEach(function(s,e){var i={answerList:{},stuQuestAnswer:""};i.questionItemId=s.questionItemId,i.scores=t.every1.toString(),s.itemList.forEach(function(t,s){var e="";""!=(e=t.answersl)&&void 0!=e||(e=!1),i.stuQuestAnswer+=e+"ψ"}),i.stuQuestAnswer=i.stuQuestAnswer.substring(0,i.stuQuestAnswer.length-1),i.answerList.itemList=s.itemList,i.answerList.questDesc=s.questDesc,i.answerList.questImg=s.questImg,i.answerList.questKind=s.questKind,a.push(i)}),void 0,t.comData.forEach(function(s,e){var i={answerList:{},stuQuestAnswer:""};i.questionItemId=s.questionItemId,i.scores=t.every2.toString(),s.itemList.forEach(function(t,s){t.answersl?i.stuQuestAnswer+=t.answersl+"ψ":!0}),i.stuQuestAnswer=i.stuQuestAnswer.substring(0,i.stuQuestAnswer.length-1),i.answerList.itemList=s.itemList,i.answerList.questDesc=s.questDesc,i.answerList.questImg=s.questImg,i.answerList.questKind=s.questKind,a.push(i)}),void 0,t.DisData.forEach(function(s,e){var i={answerList:{},stuQuestAnswer:""};i.questionItemId=s.questionItemId,i.scores=t.every3.toString(),s.answersl?i.stuQuestAnswer=s.answersl:!0,i.answerList.itemList=s.itemList,i.answerList.questDesc=s.questDesc,i.answerList.questImg=s.questImg,i.answerList.questKind=s.questKind,a.push(i)}),e.bigList=a,s.next=11,t.$axioss.stuSubmitAnswer(e);case 11:return 1e3==(n=s.sent).data.code&&(t.$message({message:"你已经交卷",type:"success"}),t.$router.push({path:"/answerPaper",query:{id:n.data.data}})),s.abrupt("return",!1);case 14:case"end":return s.stop()}},s,t)}))()}},mounted:function(){this.getList(),t("footer").hide()}}}).call(s,e("7t+N"))},"5nMy":function(t,s){},irOh:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("1PKO"),i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"stuTestPaperDetail container"},[t._m(0),t._v(" "),e("div",{staticClass:"colAdmin"},[e("div",{staticClass:"bodyBox content"},[e("div",{staticClass:"headBox"},[e("div",{staticStyle:{"border-bottom":"1px solid #eee"}},[e("h3",[t._v("试卷："+t._s(t.resData.title))]),t._v(" "),e("p",{staticStyle:{"font-size":"12px"}},[t._v("\n\t\t\t\t\t\t\t描述："+t._s(t.resData.description)+"\n\t\t\t\t\t\t")])]),t._v(" "),e("div",{staticClass:"score mt"},[e("p",[e("span",{staticClass:"comCol comWeight mr"},[t._v(t._s(t.every0*t.sinData.length+t.every1*t.mulData.length)+"分")]),t._v(" "),e("span",{staticClass:"comCol comWeight"},[t._v(t._s(t.totalNum)+"题")])]),t._v(" "),t._m(1)])]),t._v(" "),t.sinData.length>0?e("div",{staticStyle:{height:"10px",background:"#eee"}}):t._e(),t._v(" "),t.sinData.length>0?e("div",{staticClass:"selectBox Single"},[e("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[0])+"、单选题（每题"+t._s(t.every0)+"分，合计"+t._s(t.every0*t.sinData.length)+"分）")]),t._v(" "),e("div",{staticClass:"contentBox"},t._l(t.sinData,function(s,a){return e("div",{key:a,staticClass:"timuBox line"},[e("div",{staticClass:"timu"},[e("h4",[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(a+1)+"、"+t._s(s.questDesc)+"\n\t\t\t\t\t\t\t\t")]),t._v(" "),t._l(s.itemList,function(a,i){return e("el-radio-group",{key:i,model:{value:s.questAnswer,callback:function(e){t.$set(s,"questAnswer",e)},expression:"item.questAnswer"}},[e("el-radio",{attrs:{label:i.toString(),checked:s.answers}},[t._v(t._s(a.item)+"、"+t._s(a.itemDesc))])],1)})],2)])}))]):t._e(),t._v(" "),t.mulData.length>0?e("div",{staticStyle:{height:"10px",background:"#eee"}}):t._e(),t._v(" "),t.mulData.length>0?e("div",{staticClass:"selectBox"},[e("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[1])+"、多选题下列题目中至少有2个及以上的正确答案，多选少选均不得分（每题"+t._s(t.every1)+"分，合计"+t._s(t.every1*t.mulData.length)+"分）")]),t._v(" "),e("div",{staticClass:"contentBox "},t._l(t.mulData,function(s,a){return e("div",{key:a,staticClass:"timuBox line"},[e("div",{staticClass:"timu"},[e("h4",[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(a+1)+"、"+t._s(s.questDesc)+"\n\t\t\t\t\t\t\t\t")]),t._v(" "),t._l(s.itemList,function(s,a){return e("el-checkbox-group",{key:a,model:{value:s.answersl,callback:function(e){t.$set(s,"answersl",e)},expression:"itecM.answersl"}},[e("el-checkbox",{attrs:{label:s._id}},[t._v(t._s(s.item)+"、"+t._s(s.itemDesc)+" ")])],1)})],2)])}))]):t._e(),t._v(" "),t.comData.length>0?e("div",{staticStyle:{height:"10px",background:"#eee"}}):t._e(),t._v(" "),t.comData.length>0?e("div",{staticClass:"selectBox"},[e("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[3])+"、填空题（每题"+t._s(t.every2)+"分，合计"+t._s(t.every2*t.comData.length)+"分）")]),t._v(" "),e("div",{staticClass:"contentBox line"},t._l(t.comData,function(s,a){return e("div",{key:a,staticClass:"timuBox"},[e("div",{staticClass:"timu "},[e("h4",[t._v(t._s(a+1)+"."+t._s(s.questDesc))]),t._v(" "),e("div",{staticClass:"continputBox"},t._l(s.itemList,function(s,a){return e("p",{key:a,staticStyle:{color:"#999","font-size":"14px"}},[e("span",[t._v("( "+t._s(a+1)+" )")]),t._v(" "),e("span",[e("input",{directives:[{name:"model",rawName:"v-model",value:s.answersl,expression:"itec.answersl"}],staticClass:"inputTox",attrs:{type:"text",onpaste:t.onpaste(),oncontextmenu:t.onpaste(),placeholder:"答案"},domProps:{value:s.answersl},on:{input:function(e){e.target.composing||t.$set(s,"answersl",e.target.value)}}})])])}))])])}))]):t._e(),t._v(" "),t.DisData.length>0?e("div",{staticStyle:{height:"10px",background:"#eee"}}):t._e(),t._v(" "),t.DisData.length>0?e("div",{staticClass:"selectBox"},[e("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[4])+"、论述题（每题"+t._s(t.every3)+"分，合计"+t._s(t.every3*t.DisData.length)+"分）")]),t._v(" "),e("div",{staticClass:"contentBox"},t._l(t.DisData,function(s,a){return e("div",{key:a,staticClass:"timuBox"},[e("div",{staticClass:"timu "},[e("h4",[t._v(t._s(a+1)+"."+t._s(s.questDesc))]),t._v(" "),e("div",{staticClass:"continputBox"},[e("p",{staticStyle:{"font-size":"14px"}},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:s.answersl,expression:"item.answersl"}],staticClass:"form-control",attrs:{onpaste:t.onpaste(),oncontextmenu:t.onpaste(),name:"description",placeholder:"答案"},domProps:{value:s.answersl},on:{input:function(e){e.target.composing||t.$set(s,"answersl",e.target.value)}}})])])])])}))]):t._e(),t._v(" "),e("div",{staticStyle:{height:"70px"}}),t._v(" "),e("div",{staticClass:"selectBox container",staticStyle:{position:"fixed",bottom:"0","z-index":"99"}},[e("el-row",[e("el-button",{attrs:{type:"primary"},on:{click:t.stuSubmitAnswer}},[t._v("提交")])],1)],1)])]),t._v(" "),e("el-dialog",{attrs:{title:"查看图片",visible:t.imgDialogVisible,width:"80%",center:""},on:{"update:visible":function(s){t.imgDialogVisible=s}}},[e("div",[e("img",{staticStyle:{width:"100%"},attrs:{src:t.targetImg}})]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:function(s){t.imgDialogVisible=!1}}},[t._v("确 定")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"crumbs"},[this._v("\n            当前位置："),s("span",{attrs:{id:"current_pos"}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",{staticStyle:{"font-size":"12px"}},[s("span",{staticClass:"mr"},[this._v("卷面分数")]),this._v(" "),s("span",[this._v("题目总数")])])}]};var n=function(t){e("5nMy"),e("oxoe")},r=e("VU/8")(a.a,i,!1,n,null,null);s.default=r.exports},oxoe:function(t,s){}});