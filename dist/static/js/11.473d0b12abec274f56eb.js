webpackJsonp([11],{"+G1y":function(t,e){},TU9b:function(t,e,s){"use strict";(function(t){var a=s("Xxa5"),i=s.n(a),n=s("exGp"),r=s.n(n);e.a={name:"stuTestPaperDetail",data:function(){return{resData:{title:""},score:"",totalNum:"",sinData:[],mulData:[],comData:[],DisData:[],every0:0,every1:0,every2:0,every3:0,targetImg:"",allQuesNum:[],imgDialogVisible:!1}},methods:{goBack:function(){this.$router.back(-1)},showImages:function(){this.targetImg=event.target.getAttribute("src"),this.imgDialogVisible=!0},onpaste:function(){return"return false"},getList:function(){var t=this;return r()(i.a.mark(function e(){var s,a,n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axioss.getStuPaperDetail({id:t.$route.params.id});case 2:return 1e3===(s=e.sent).data.code&&(a=s.data.datas.bigList,t.resData.title=s.data.datas.title,t.resData.description=s.data.datas.description,t.resData.isPublic=s.data.datas.isPublic,a.forEach(function(e){switch(e.questKind,e.questKind){case"0":t.sinData.push(e),t.every0=e.scores;break;case"1":t.mulData.push(e),t.every1=e.scores;break;case"2":t.comData.push(e),t.every2=e.scores;break;case"3":t.DisData.push(e),t.every3=e.scores}}),t.totalNum=a.length,n=0,t.sinData&&(n++,t.allQuesNum[0]=n),t.mulData&&(n++,t.allQuesNum[1]=n),t.comData&&(n++,t.allQuesNum[3]=n),t.DisData&&(n++,t.allQuesNum[4]=n)),e.abrupt("return",!1);case 5:case"end":return e.stop()}},e,t)}))()},stuSubmitAnswer:function(){var t=this;return r()(i.a.mark(function e(){var s,a,n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s={questionItemBankId:t.$route.params.id,title:t.resData.title,description:t.resData.description,isPublic:t.resData.isPublic,bigList:[]},a=[],void 0,t.sinData.forEach(function(e,s){var i={answerList:{}};i.questionItemId=e.questionItemId,i.scores=t.every0.toString(),void 0==e.questAnswer?!0:i.stuQuestAnswer=e.questAnswer.toString(),i.answerList.itemList=e.itemList,i.answerList.questDesc=e.questDesc,i.answerList.questImg=e.questImg,i.answerList.questKind=e.questKind,a.push(i)}),t.mulData.forEach(function(e,s){var i={answerList:{},stuQuestAnswer:""};i.questionItemId=e.questionItemId,i.scores=t.every1.toString(),e.itemList.forEach(function(t,e){var s="";""!=(s=t.answersl)&&void 0!=s||(s=!1),i.stuQuestAnswer+=s+"ψ"}),i.stuQuestAnswer=i.stuQuestAnswer.substring(0,i.stuQuestAnswer.length-1),i.answerList.itemList=e.itemList,i.answerList.questDesc=e.questDesc,i.answerList.questImg=e.questImg,i.answerList.questKind=e.questKind,a.push(i)}),void 0,t.comData.forEach(function(e,s){var i={answerList:{},stuQuestAnswer:""};i.questionItemId=e.questionItemId,i.scores=t.every2.toString(),e.itemList.forEach(function(t,e){t.answersl?i.stuQuestAnswer+=t.answersl+"ψ":!0}),i.stuQuestAnswer=i.stuQuestAnswer.substring(0,i.stuQuestAnswer.length-1),i.answerList.itemList=e.itemList,i.answerList.questDesc=e.questDesc,i.answerList.questImg=e.questImg,i.answerList.questKind=e.questKind,a.push(i)}),void 0,t.DisData.forEach(function(e,s){var i={answerList:{},stuQuestAnswer:""};i.questionItemId=e.questionItemId,i.scores=t.every3.toString(),e.answersl?i.stuQuestAnswer=e.answersl:!0,i.answerList.itemList=e.itemList,i.answerList.questDesc=e.questDesc,i.answerList.questImg=e.questImg,i.answerList.questKind=e.questKind,a.push(i)}),s.bigList=a,e.next=11,t.$axioss.stuSubmitAnswer(s);case 11:return 1e3==(n=e.sent).data.code&&(t.$message({message:"你已经交卷",type:"success"}),t.$router.push({path:"/answerPaper",query:{id:n.data.data}})),e.abrupt("return",!1);case 14:case"end":return e.stop()}},e,t)}))()}},mounted:function(){this.getList(),t("footer").hide()}}}).call(e,s("7t+N"))},fAtg:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("TU9b"),i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"stuTestPaperDetail container"},[s("div",{staticClass:"headBox"},[s("div",{staticStyle:{"border-bottom":"1px solid #eee"}},[s("h3",[t._v("试卷："+t._s(t.resData.title))]),t._v(" "),s("p",{staticStyle:{"font-size":"12px"}},[t._v("\n\t\t\t\t\t描述："+t._s(t.resData.description)+"\n\t\t\t\t")])]),t._v(" "),s("div",{staticClass:"score mt"},[s("p",[s("span",{staticClass:"comCol comWeight mr"},[t._v(t._s(t.every0*t.sinData.length+t.every1*t.mulData.length)+"分")]),t._v(" "),s("span",{staticClass:"comCol comWeight"},[t._v(t._s(t.totalNum)+"题")])]),t._v(" "),t._m(0)])]),t._v(" "),t.sinData.length>0?s("div",{staticStyle:{height:"10px",background:"#eee"}}):t._e(),t._v(" "),t.sinData.length>0?s("div",{staticClass:"selectBox Single"},[s("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[0])+"、单选题（每题"+t._s(t.every0)+"分，合计"+t._s(t.every0*t.sinData.length)+"分）")]),t._v(" "),s("div",{staticClass:"contentBox"},t._l(t.sinData,function(e,a){return s("div",{key:a,staticClass:"timuBox line"},[s("div",{staticClass:"timu"},[s("h4",[t._v("\n\t\t\t\t\t\t\t"+t._s(a+1)+"、"+t._s(e.questDesc)+"\n\t\t\t\t\t\t")]),t._v(" "),t._l(e.itemList,function(a,i){return s("el-radio-group",{key:i,model:{value:e.questAnswer,callback:function(s){t.$set(e,"questAnswer",s)},expression:"item.questAnswer"}},[s("el-radio",{attrs:{label:i.toString(),checked:e.answers}},[t._v(t._s(a.item)+"、"+t._s(a.itemDesc))])],1)})],2)])}))]):t._e(),t._v(" "),t.mulData.length>0?s("div",{staticStyle:{height:"10px",background:"#eee"}}):t._e(),t._v(" "),t.mulData.length>0?s("div",{staticClass:"selectBox"},[s("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[1])+"、多选题下列题目中至少有2个及以上的正确答案，多选少选均不得分（每题"+t._s(t.every1)+"分，合计"+t._s(t.every1*t.mulData.length)+"分）")]),t._v(" "),s("div",{staticClass:"contentBox "},t._l(t.mulData,function(e,a){return s("div",{key:a,staticClass:"timuBox line"},[s("div",{staticClass:"timu"},[s("h4",[t._v("\n\t\t\t\t\t\t\t"+t._s(a+1)+"、"+t._s(e.questDesc)+"\n\t\t\t\t\t\t")]),t._v(" "),t._l(e.itemList,function(e,a){return s("el-checkbox-group",{key:a,model:{value:e.answersl,callback:function(s){t.$set(e,"answersl",s)},expression:"itecM.answersl"}},[s("el-checkbox",{attrs:{label:e._id}},[t._v(t._s(e.item)+"、"+t._s(e.itemDesc)+" ")])],1)})],2)])}))]):t._e(),t._v(" "),t.comData.length>0?s("div",{staticStyle:{height:"10px",background:"#eee"}}):t._e(),t._v(" "),t.comData.length>0?s("div",{staticClass:"selectBox"},[s("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[3])+"、填空题（每题"+t._s(t.every2)+"分，合计"+t._s(t.every2*t.comData.length)+"分）")]),t._v(" "),s("div",{staticClass:"contentBox line"},t._l(t.comData,function(e,a){return s("div",{key:a,staticClass:"timuBox"},[s("div",{staticClass:"timu "},[s("h4",[t._v(t._s(a+1)+"."+t._s(e.questDesc))]),t._v(" "),s("div",{staticClass:"continputBox"},t._l(e.itemList,function(e,a){return s("p",{key:a,staticStyle:{color:"#999","font-size":"14px"}},[s("span",[t._v("( "+t._s(a+1)+" )")]),t._v(" "),s("span",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.answersl,expression:"itec.answersl"}],staticClass:"inputTox",attrs:{type:"text",onpaste:t.onpaste(),oncontextmenu:t.onpaste(),placeholder:"答案"},domProps:{value:e.answersl},on:{input:function(s){s.target.composing||t.$set(e,"answersl",s.target.value)}}})])])}))])])}))]):t._e(),t._v(" "),t.DisData.length>0?s("div",{staticStyle:{height:"10px",background:"#eee"}}):t._e(),t._v(" "),t.DisData.length>0?s("div",{staticClass:"selectBox"},[s("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[4])+"、论述题（每题"+t._s(t.every3)+"分，合计"+t._s(t.every3*t.DisData.length)+"分）")]),t._v(" "),s("div",{staticClass:"contentBox"},t._l(t.DisData,function(e,a){return s("div",{key:a,staticClass:"timuBox"},[s("div",{staticClass:"timu "},[s("h4",[t._v(t._s(a+1)+"."+t._s(e.questDesc))]),t._v(" "),s("div",{staticClass:"continputBox"},[s("p",{staticStyle:{"font-size":"14px"}},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.answersl,expression:"item.answersl"}],staticClass:"form-control",attrs:{onpaste:t.onpaste(),oncontextmenu:t.onpaste(),name:"description",placeholder:"答案"},domProps:{value:e.answersl},on:{input:function(s){s.target.composing||t.$set(e,"answersl",s.target.value)}}})])])])])}))]):t._e(),t._v(" "),s("div",{staticStyle:{height:"70px"}}),t._v(" "),s("div",{staticClass:"selectBox container",staticStyle:{position:"fixed",bottom:"0","z-index":"99"}},[s("el-row",[s("el-button",{attrs:{type:"primary"},on:{click:t.stuSubmitAnswer}},[t._v("提交")])],1)],1),t._v(" "),s("el-dialog",{attrs:{title:"查看图片",visible:t.imgDialogVisible,width:"80%",center:""},on:{"update:visible":function(e){t.imgDialogVisible=e}}},[s("div",[s("img",{staticStyle:{width:"100%"},attrs:{src:t.targetImg}})]),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.imgDialogVisible=!1}}},[t._v("确 定")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticStyle:{"font-size":"12px"}},[e("span",{staticClass:"mr"},[this._v("卷面分数")]),this._v(" "),e("span",[this._v("题目总数")])])}]};var n=function(t){s("+G1y"),s("yU/a")},r=s("VU/8")(a.a,i,!1,n,null,null);e.default=r.exports},"yU/a":function(t,e){}});