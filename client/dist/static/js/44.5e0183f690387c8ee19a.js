webpackJsonp([44],{KT6r:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("Xxa5"),a=e.n(i),o=e("Gu7T"),c=e.n(o),r=e("exGp"),n=e.n(r),l=e("xx8U"),u=e("auoD"),h=e("/Jwq"),d=e("OULz"),m={name:"AddTestPaper",components:{Single:l.default,MultipleChoice:u.default,Completion:h.default,Discussion:d.default},data:function(){return{questType:0,typeTitle:"",questBankTitle:"",questDesc:"",score:"",checkS:"",checkT:"",checkClass:"",isPublic:1,startTime:"",endTime:"",objSin:{},objMul:{},objJud:{},objCom:{},objDis:{},objParams:{},objQues:{},sinData:[],mulData:[],JudData:[],comData:[],DisData:[],paperNumber:"",classList:[],checkClassId:"",SubjectsList:[],subId:"",levelId:"",subjradio:"",url:window.location.href,checkScore:"",allScores:100,questSingleNum:0,questMultNum:0,questJudgeNum:0,questFillNum:0,questDissNum:0,questList:[],scoreA0:0,scoreA1:0,scoreA2:0,scoreA3:0,scoreA4:0,subjectId:0,level:1,showPaperShow:!0,addPaperShow:!1,startBled:!1,endBled:!1,classBled:!1,targetImg:"",allQuesNum:[],imgDialogVisible:!1}},methods:{goBack:function(t){this.$router.back(-1)},showImages:function(){this.targetImg=event.target.getAttribute("src"),this.imgDialogVisible=!0},changeClass:function(){this.checkClass?(this.classBled=!0,this.checkClassId=0,this.classList.forEach(function(t,s){!0===t.selected&&(t.selected=!1)})):(this.classBled=!1,this.checkClassId="")},changeTimes:function(){this.checkT?(this.startBled=!0,this.endBled=!0,this.startTime="",this.endTime=""):(this.startBled=!1,this.endBled=!1)},singleChange:function(){},countTime:function(t,s){var e=s.getTime()-t.getTime(),i=e%864e5,a=i%36e5,o=a%6e4;return Math.floor(e/864e5)+Math.floor(i/36e5)+Math.floor(a/6e4)+Math.round(o/1e3)},checkTime:function(){if(""==this.startTime);else if(""!=this.startTime&&""!=this.endTime&&this.countTime(this.startTime,this.endTime).toString()<0)return this.dialog("开始时间不能大于结束时间！"),!1},QuesFun:function(){this.showPaperShow=!1,this.addPaperShow=!0,this.paperNumber=5,this.objParams.questType=this.questType},editAnswers:function(t){this.showPaperShow=!1,this.addPaperShow=!0,this.paperNumber=t,this.objSin.subId=this.subId,this.objSin.levelId=this.levelId,this.objSin.scoresAll=this.checkScore,this.objSin.scores=Number(this.scoreA0/this.questSingleNum),this.objSin.parentData=this.sinData,this.objMul.subId=this.subId,this.objMul.levelId=this.levelId,this.objMul.scoresAll=this.checkScore,this.objMul.scores=Number(this.scoreA1/this.questMultNum),this.objMul.parentData=this.mulData,this.objCom.subId=this.subId,this.objCom.levelId=this.levelId,this.objCom.scoresAll=this.checkScore,this.objCom.scores=Number(this.scoreA2/this.questFillNum),this.objCom.parentData=this.comData,this.objDis.subId=this.subId,this.objDis.levelId=this.levelId,this.objDis.scoresAll=this.checkScore,this.objDis.scores=Number(this.scoreA3/this.questDissNum),this.objDis.parentData=this.DisData},goBackInfo:function(t){this.showPaperShow=t.showPaperShow,this.addPaperShow=t.addPaperShow,this.paperNumber=t.paperNumber,this.objParams.qbId=t.qbId},goBackDetail:function(t){this.showPaperShow=t.showPaperShow,this.addPaperShow=t.addPaperShow,this.paperNumber=t.paperNumber,this.objQues.qbId=t.qbId},BigObjInfo:function(t){this.showPaperShow=t.showPaperShow,this.addPaperShow=t.addPaperShow,t.sinData&&(this.objSin.parentData=this.sinData=t.sinData,this.scoreA0=t.scoreA0,this.questSingleNum=t.sinData.length),t.mulData&&(this.objMul.parentData=this.mulData=t.mulData,this.scoreA1=t.scoreA1,this.questMultNum=t.mulData.length),t.JudData&&(this.objJud.parentData=this.JudData=t.JudData,this.scoreA2=t.scoreA2,this.questJudgeNum=t.JudData.length),t.comData&&(this.objCom.parentData=this.comData=t.comData,this.scoreA3=t.scoreA3,this.questFillNum=t.comData.length),t.DisData&&(this.objDis.parentData=this.DisData=t.DisData,this.scoreA4=t.scoreA4,this.questDissNum=t.DisData.length),this.checkScore=this.scoreA0+this.scoreA1+this.scoreA2+this.scoreA3+this.scoreA4;var s=[];this.sinData.forEach(function(t,e){var i={};i.itemId=t.questId,i.itemSort=e+1,i.itemScore=t.qcScore.toString(),s.push(i),t.score}),this.mulData.forEach(function(t,e){var i={};i.itemId=t.questId,i.itemSort=e+1,i.itemScore=t.qcScore.toString(),s.push(i),t.score}),this.JudData.forEach(function(t,e){var i={};i.itemId=t.questId,i.itemSort=e+1,i.itemScore=t.qcScore.toString(),s.push(i),t.score}),this.comData.forEach(function(t,e){var i={};i.itemId=t.questId,i.itemSort=e+1,i.itemScore=t.qcScore.toString(),s.push(i),t.score}),this.DisData.forEach(function(t,e){var i={};i.itemId=t.questId,i.itemSort=e+1,i.itemScore=t.qcScore.toString(),s.push(i),t.score}),this.questList=s},getPaperInfo:function(t){this.showPaperShow=!0,this.addPaperShow=!1,0==t.tit?(this.scoreA0=t.score,this.sinData=t.resData):1==t.tit?(this.scoreA1=t.score,this.mulData=t.resData):2==t.tit?(this.scoreA2=t.score,this.comData=t.resData):3==t.tit&&(this.scoreA3=t.score,this.DisData=t.resData);var s=[],e=Number(this.scoreA0/this.sinData.length),i=Number(this.scoreA1/this.mulData.length),a=(Number(this.scoreA2/this.JudData.length),Number(this.scoreA3/this.comData.length)),o=Number(this.scoreA4/this.DisData.length);this.sinData.forEach(function(t,i){var a={};a.itemId=t.questId,a.itemSort=i+1,a.itemScore=e.toString(),s.push(a),t.score}),this.mulData.forEach(function(t,e){var a={};a.itemId=t.questId,a.itemSort=e+1,a.itemScore=i.toString(),s.push(a),t.score}),this.comData.forEach(function(t,e){var i={};i.itemId=t.questId,i.itemSort=e+1,i.itemScore=a.toString(),s.push(i),t.score}),this.DisData.forEach(function(t,e){var i={};i.itemId=t.questId,i.itemSort=e+1,i.itemScore=o.toString(),s.push(i),t.score}),this.questList=s,this.checkScore=this.scoreA0+this.scoreA1+this.scoreA2+this.scoreA3+this.scoreA4,this.questSingleNum=this.sinData.length,this.questMultNum=this.mulData.length,this.questJudgeNum=this.JudData.length,this.questFillNum=this.comData.length,this.questDissNum=this.DisData.length},submitInfo:function(){var t=this;return n()(a.a.mark(function s(){var e,i,o;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(e={title:t.questBankTitle,description:t.questDesc,isPublic:t.isPublic,bigList:[]},""!=t.questBankTitle){s.next=4;break}return t.dialog("试题标题不能为空！"),s.abrupt("return",!1);case 4:if(""!=t.questDesc){s.next=7;break}return t.dialog("试题描述不能为空！"),s.abrupt("return",!1);case 7:return i=[],t.sinData.forEach(function(s){s.questionItemId=s._id,s.scores=(t.scoreA0/t.questSingleNum).toString()}),t.mulData.forEach(function(s){s.questionItemId=s._id,s.scores=(t.scoreA1/t.questMultNum).toString()}),t.comData.forEach(function(s){s.questionItemId=s._id,s.scores=(t.scoreA2/t.questFillNum).toString()}),t.DisData.forEach(function(s){s.questionItemId=s._id,s.scores=(t.scoreA3/t.questDissNum).toString()}),i=[].concat(c()(t.sinData),c()(t.mulData),c()(t.comData),c()(t.DisData)),e.bigList=i,s.next=16,t.$axioss.addTestPaper(e);case 16:return 1e3===(o=s.sent).data.code?(t.$message({message:o.data.msg,type:"success"}),t.$router.push({path:"/testPaperList"})):1100==o.code&&t.dialog(o.data.msg),s.abrupt("return",!1);case 19:case"end":return s.stop()}},s,t)}))()}},mounted:function(){}},v={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"AddTestPaper"},[t.showPaperShow?e("div",{staticClass:"showPaper container"},[e("Header",{attrs:{title:t.typeTitle},on:{goBack:t.goBack}}),t._v(" "),e("div",{staticClass:"head"},[e("div",{staticClass:"headBox"},[e("div",{staticClass:"head-div"},[t._m(0),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.questBankTitle,expression:"questBankTitle"}],staticStyle:{"padding-left":"1%"},attrs:{placeholder:"请输入试题标题"},domProps:{value:t.questBankTitle},on:{input:function(s){s.target.composing||(t.questBankTitle=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"head-div"},[t._m(1),t._v(" "),e("el-input",{attrs:{maxlength:"36",type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入题目描述"},model:{value:t.questDesc,callback:function(s){t.questDesc=s},expression:"questDesc"}})],1),t._v(" "),e("div",{staticClass:"head-div"},[t._m(2),t._v(" "),e("el-radio-group",{model:{value:t.isPublic,callback:function(s){t.isPublic=s},expression:"isPublic"}},[e("el-radio",{attrs:{label:1}},[t._v("公开")]),t._v(" "),e("el-radio",{attrs:{label:0}},[t._v("不公开")])],1)],1),t._v(" "),e("div",{staticClass:"head-div"},[t._m(3),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.checkScore,expression:"checkScore"}],staticStyle:{width:"30%"},attrs:{disabled:"",placeholder:"0"},domProps:{value:t.checkScore},on:{input:function(s){s.target.composing||(t.checkScore=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"head-div"},[e("div",{staticClass:"head-title"},[t._v("题目总数")]),t._v(" "),e("div",{staticClass:"block"},[e("p",[e("span",[t._v("单选题（"+t._s(t.questSingleNum)+"）")]),t._v(" "),e("span",[t._v("多选题（"+t._s(t.questMultNum)+"）")]),t._v(" "),e("span",[t._v("填空题（"+t._s(t.questFillNum)+"）")]),t._v(" "),e("span",[t._v("论述题（"+t._s(t.questDissNum)+"）")])]),t._v(" "),t._m(4)])])])]),t._v(" "),e("div",{staticClass:"selectBox Single"},[e("h3",{staticClass:"line"},[e("span",{staticClass:"editBtn",staticStyle:{float:"right"},on:{click:function(s){t.editAnswers(0)}}},[e("img",{attrs:{src:"static/images/edit.png"}})]),t._v(" "),e("span",{staticStyle:{float:"right",color:"#bbb","margin-right":"1%"}},[t._v(t._s(t.scoreA0)+"分")]),t._v("\n\t\t\t\t\t1、单选题（每题"+t._s(t.scoreA0/t.questSingleNum?t.scoreA0/t.questSingleNum:0)+"分，合计"+t._s(t.scoreA0)+"分）\n\t\t\t\t")]),t._v(" "),e("div",{staticClass:"contentBox"},t._l(t.sinData,function(s,i){return e("div",{key:i,staticClass:"timuBox"},[e("div",{staticClass:"timu"},[e("h4",[t._v("\n\t\t\t\t\t\t\t\t"+t._s(i+1)+"、"+t._s(s.questDesc)+"\n\t\t\t\t\t\t\t")]),t._v(" "),t._l(s.itemList,function(i,a){return e("el-radio-group",{key:a,model:{value:s.questAnswer,callback:function(e){t.$set(s,"questAnswer",e)},expression:"item.questAnswer"}},[e("el-radio",{attrs:{disabled:"",label:a,checked:s.answers}},[t._v(t._s(i.item)+"、"+t._s(i.itemDesc))])],1)})],2)])}))]),t._v(" "),e("div",{staticStyle:{height:"10px",background:"#eee"}}),t._v(" "),e("div",{staticClass:"selectBox"},[e("h3",{staticClass:"line"},[e("span",{staticClass:"editBtn",staticStyle:{float:"right"},on:{click:function(s){t.editAnswers(1)}}},[e("img",{attrs:{src:"static/images/edit.png"}})]),t._v(" "),e("span",{staticStyle:{float:"right",color:"#bbb","margin-right":"1%"}},[t._v(t._s(t.scoreA1)+"分")]),t._v("\n\t\t\t\t\t2、多选题下列题目中至少有2个以上的正确答案，多选少选均不得分（每题"+t._s(t.scoreA1/t.questMultNum?t.scoreA1/t.questMultNum:0)+"分，合计"+t._s(t.scoreA1)+"分）\n\t\t\t\t")]),t._v(" "),e("div",{staticClass:"contentBox"},t._l(t.mulData,function(s,i){return e("div",{key:i,staticClass:"timuBox"},[e("div",{staticClass:"timu"},[e("h4",[t._v("\n\t\t\t\t\t\t\t\t"+t._s(i+1)+"、"+t._s(s.questDesc)+"\n\t\t\t\t\t\t\t")]),t._v(" "),t._l(s.itemList,function(s,i){return e("el-checkbox-group",{key:i,model:{value:s.answersl,callback:function(e){t.$set(s,"answersl",e)},expression:"itec.answersl"}},[e("el-checkbox",{attrs:{disabled:"",label:i,checked:s.answersl}},[t._v(t._s(s.item)+"、"+t._s(s.itemDesc)+" ")])],1)})],2)])}))]),t._v(" "),e("div",{staticStyle:{height:"10px",background:"#eee"}}),t._v(" "),e("div",{staticClass:"selectBox"},[e("h3",{staticClass:"line"},[e("span",{staticClass:"editBtn",staticStyle:{float:"right"},on:{click:function(s){t.editAnswers(2)}}},[e("img",{attrs:{src:"static/images/edit.png"}})]),t._v(" "),e("span",{staticStyle:{float:"right",color:"#bbb","margin-right":"1%"}},[t._v(t._s(t.scoreA2)+"分")]),t._v("\n\t\t\t\t\t3、填空题（每题"+t._s(t.scoreA2/t.questFillNum?t.scoreA2/t.questFillNum:0)+"分，合计"+t._s(t.scoreA2)+"分）\n\t\t\t\t")]),t._v(" "),e("div",{staticClass:"contentBox"},t._l(t.comData,function(s,i){return e("div",{key:i,staticClass:"timuBox"},[e("div",{staticClass:"timu line"},[e("h4",[t._v(t._s(i+1)+"."+t._s(s.questDesc))]),t._v(" "),e("div",{staticClass:"continputBox"},t._l(s.itemList,function(s,i){return e("p",{key:i},[e("span",[t._v("( "+t._s(i+1)+" )")]),t._v(" "),e("span",{staticClass:"trueColor"},[t._v(" "+t._s(s.answersl)+" ")])])}))])])}))]),t._v(" "),e("div",{staticStyle:{height:"10px",background:"#eee"}}),t._v(" "),e("div",{staticClass:"selectBox"},[e("h3",{staticClass:"line"},[e("span",{staticClass:"editBtn",staticStyle:{float:"right"},on:{click:function(s){t.editAnswers(3)}}},[e("img",{attrs:{src:"static/images/edit.png"}})]),t._v(" "),e("span",{staticStyle:{float:"right",color:"#bbb","margin-right":"1%"}},[t._v(t._s(t.scoreA3)+"分")]),t._v("\n\t\t\t\t\t4、论述题（每题"+t._s(t.scoreA3/t.questDissNum?t.scoreA3/t.questDissNum:0)+"分，合计"+t._s(t.scoreA3)+"分）\n\t\t\t\t")]),t._v(" "),e("div",{staticClass:"contentBox"},t._l(t.DisData,function(s,i){return e("div",{key:i,staticClass:"timuBox"},[e("div",{staticClass:"timu "},[e("h4",[t._v(t._s(i+1)+"."+t._s(s.questDesc))]),t._v(" "),e("div",{staticClass:"continputBox"},[e("div",t._l(s.itemList,function(t,s){return e("span",{key:s,staticStyle:{"vertical-align":"top",display:"inline-block","margin-right":"0.5%"}})})),t._v(" "),e("p",{staticClass:"trueColor",staticStyle:{"font-size":"14px"}},[e("span",{staticStyle:{color:"#000"}},[t._v("答案：")]),t._v(t._s(s.questAnswer))])])])])}))]),t._v(" "),e("div",{staticStyle:{height:"10px",background:"#eee"}}),t._v(" "),e("div",{staticClass:"selectBox container"},[e("el-row",[e("el-button",{attrs:{type:"primary"},on:{click:t.submitInfo}},[t._v("提交")])],1)],1),t._v(" "),e("div",{staticClass:"scoreAll"},[e("p",[e("span",{staticClass:"big"},[t._v(t._s(t.checkScore?t.checkScore:0))]),t._v("\n\t\t\t\t\t/"),e("span",[t._v(t._s(t.allScores))])]),t._v(" "),e("p",[t._v("试卷分值")])])],1):t._e(),t._v(" "),e("el-dialog",{attrs:{title:"查看图片",visible:t.imgDialogVisible,width:"80%",center:""},on:{"update:visible":function(s){t.imgDialogVisible=s}}},[e("div",[e("img",{staticStyle:{width:"100%"},attrs:{src:t.targetImg}})]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:function(s){t.imgDialogVisible=!1}}},[t._v("确 定")])],1)]),t._v(" "),t.addPaperShow?e("div",{staticClass:"addPaper"},[0==t.paperNumber?e("div",[e("Single",{attrs:{objSin:t.objSin},on:{goBackInfo:function(s){t.goBackInfo(s)},getPaperInfo:function(s){t.getPaperInfo(s)}}})],1):t._e(),t._v(" "),1==t.paperNumber?e("div",[e("MultipleChoice",{attrs:{objMul:t.objMul},on:{goBackInfo:function(s){t.goBackInfo(s)},getPaperInfo:function(s){t.getPaperInfo(s)}}})],1):t._e(),t._v(" "),2==t.paperNumber?e("div",[e("Completion",{attrs:{objCom:t.objCom},on:{goBackInfo:function(s){t.goBackInfo(s)},getPaperInfo:function(s){t.getPaperInfo(s)}}})],1):t._e(),t._v(" "),3==t.paperNumber?e("div",[e("Discussion",{attrs:{objDis:t.objDis},on:{goBackInfo:function(s){t.goBackInfo(s)},getPaperInfo:function(s){t.getPaperInfo(s)}}})],1):t._e()]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"head-title"},[this._v("试题标题"),s("i",{staticClass:"tip"},[this._v("*")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"head-title"},[this._v("描述"),s("i",{staticClass:"tip"},[this._v("*")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"head-title"},[this._v("是否公开"),s("i",{staticClass:"tip"},[this._v("*")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"head-title"},[this._v("试卷分值"),s("i",{staticClass:"tip"},[this._v("*")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",{staticClass:"hid",staticStyle:{color:"#bbb","margin-top":"3%"}},[this._v("备注    \n\t\t\t\t\t\t\t\t"),s("span",[s("i",{staticStyle:{display:"inline-block",width:"15px",height:"15px",background:"#67C23A",margin:"0 3px -3px 0"}}),this._v("绿色表示为正确答案")]),this._v(" "),s("span",[s("i",{staticStyle:{display:"inline-block",width:"15px",height:"15px",background:"#F56C6C",margin:"0 3px -3px 0"}}),this._v("红色字体表示选错")])])}]};var p=e("VU/8")(m,v,!1,function(t){e("MPKQ")},null,null);s.default=p.exports},MPKQ:function(t,s){}});