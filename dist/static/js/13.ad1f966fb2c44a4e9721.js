webpackJsonp([13],{"1hfV":function(t,e){},ZHWZ:function(t,e,s){"use strict";(function(t){var a=s("Xxa5"),i=s.n(a),n=s("exGp"),r=s.n(n);e.a={name:"TestPaper",data:function(){return{headTitle:"",titile:"",qbDesc:"",score:"",totalNum:"",qbId:"",questType:"",stTime:"",edTime:"",startTime:"",endTime:"",endLastTime:"",usedTime:0,answerList:[],qcList:[],sinData:[],mulData:[],JudData:[],comData:[],DisData:[],every0:2,every1:3,every2:3,every3:3,every4:3,subjectName:"",sublevel:"",targetImg:"",allQuesNum:[],countNums:"",dialogTableVisible:!1,countNumsFlg:!0,imgDialogVisible:!1,clock:"",myX:"",tempTT:"",menuData:""}},methods:{goBack:function(){this.$router.back(-1)},showImages:function(){this.targetImg=event.target.getAttribute("src"),this.imgDialogVisible=!0},onpaste:function(){if(1==this.questType||2==this.questType||4==this.questType)return"return false"},oksubmit:function(t){this.myX=t,this.submitInfo(this.myX)},CurentTime:function(){var t=new Date,e=t.getFullYear(),s=t.getMonth()+1,a=t.getDate(),i=t.getHours(),n=t.getMinutes(),r=e+"-";return s<10&&(r+="0"),r+=s+"-",a<10&&(r+="0"),r+=a+" ",i<10&&(r+="0"),r+=i+":",n<10&&(r+="0"),r+=n},getList:function(){var t=this;return r()(i.a.mark(function e(){var s,a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axioss.getTestPaper();case 2:return 1e3===(s=e.sent).data.code&&(t.sinData=s.data.sinData,t.mulData=s.data.mulData,t.comData=s.data.comData,t.DisData=s.data.DisData,t.totalNum=t.sinData.length+t.mulData.length,a=0,t.sinData&&(a++,t.allQuesNum[0]=a),t.mulData&&(a++,t.allQuesNum[1]=a),t.comData&&(a++,t.allQuesNum[3]=a),t.DisData&&(a++,t.allQuesNum[4]=a)),e.abrupt("return",!1);case 8:case"end":return e.stop()}},e,t)}))()},submitInfo:function(t){var e=this;return r()(i.a.mark(function s(){var a,n,r,o;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return a={answerList:""},n=[],r=void 0,e.sinData.forEach(function(t,s){var a={};a.qcId=t._id,a.scores=e.every0.toString(),void 0==t.questAnswer?r=!0:a.stuQuestAnswer=t.questAnswer.toString(),n.push(a)}),e.mulData.forEach(function(t,s){var a={stuQuestAnswer:""};a.qcId=t._id,a.scores=e.every1.toString(),t.itemList.forEach(function(t,e){var s="";""!=(s=t.answersl)&&void 0!=s||(s=!1),a.stuQuestAnswer+=s+"ψ"}),a.stuQuestAnswer=a.stuQuestAnswer.substring(0,a.stuQuestAnswer.length-1),n.push(a)}),a.answerList=n,s.next=7,e.$axioss.submitAnswer(a);case 7:return 1e3==(o=s.sent).data.code&&e.$router.push({path:"/answerPaper",query:{id:o.data.data}}),s.abrupt("return",!1);case 23:o=s.sent,e.myX="",s.next=42;break;case 27:if(0!=t){s.next=32;break}return e.dialogTableVisible=!1,s.abrupt("return",!1);case 32:if(!r){s.next=37;break}return e.dialogTableVisible=!0,s.abrupt("return",!1);case 37:return s.next=39,e.$axios.studentSubmitAnswers(a);case 39:o=s.sent,e.myX="",window.clearInterval(e.clock);case 42:1e3===o.code?0==e.questType||1==e.questType?(e.$router.push({path:"/Questions"}),e.successMsg("练习结束!")):2==e.questType?(e.$router.push({path:"/TeachPass"}),e.successMsg("考核结束!")):3==e.questType?(e.$router.push({path:"/TeachTask"}),e.successMsg("作业结束!")):4==e.questType&&(e.$router.back(-1),e.successMsg("比赛结束!")):1100===o.code&&e.dialog(o.message);case 43:case"end":return s.stop()}},s,e)}))()},countTime:function(t,e){var s=Date.parse(new Date(e.replace(/-/g,"/")))-Date.parse(new Date(t.replace(/-/g,"/"))),a=(Math.floor(s/864e5),s%864e5),i=a%36e5,n=i%6e4,r=3600*Math.floor(a/36e5)+60*Math.floor(i/6e4)+Math.round(n/1e3);return r>10?r-=5:r=r,r},countFun:function(t){var e=this;this.clock=window.setInterval(function(){9==--t&&(e.myX=1,e.submitInfo(e.myX),window.clearInterval(e.clock),e.countNumsFlg=!1),e.tempTT=t;Math.floor(t/86400);var s=t%86400,a=Math.floor(s/3600),i=s%3600,n=Math.floor(i/60),r=i%60,o=Math.round(r);e.usedTime++,e.countNums=a+"时"+n+"分"+o+"秒"},1e3)}},mounted:function(){this.stTime=new Date,this.getList(),this.questType=this.$route.query.questType,0==this.questType?this.headTitle="日常练习":1==this.questType?this.headTitle="技能考证":2==this.questType?this.headTitle="考核":3==this.questType?this.headTitle="作业":4!=this.questType||(this.headTitle="比赛"),t("footer").hide()}}}).call(e,s("7t+N"))},pNol:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("ZHWZ"),i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"testPaper mainCont"},[s("Header",{attrs:{title:t.headTitle},on:{goBack:t.goBack}}),t._v(" "),s("div",{staticClass:"headBox"},[s("h3",[t._v(t._s(t.titile))]),t._v(" "),t.startTime.length>0||t.endTime.length>0?s("p",{staticClass:"comCol mt"},[t._v("考试时间："+t._s(t.startTime)+" - "+t._s(t.endTime))]):t._e(),t._v(" "),s("div",{staticClass:"score mt"},[s("p",[s("span",{staticClass:"comCol comWeight mr"},[t._v(t._s(0==t.score?100:t.score))]),t._v(" "),s("span",{staticClass:"comCol comWeight"},[t._v(t._s(t.totalNum))])]),t._v(" "),t._m(0)])]),t._v(" "),t.sinData?s("div",{staticClass:"selectBox Single"},[s("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[0])+"、单选题（每题"+t._s(t.every0)+"分，合计"+t._s(t.every0*t.sinData.length)+"分）")]),t._v(" "),s("div",{staticClass:"contentBox"},t._l(t.sinData,function(e,a){return s("div",{key:a,staticClass:"timuBox"},[s("div",{staticClass:"timu"},[s("h4",[t._v("\n\t\t\t\t\t\t\t"+t._s(a+1)+"、"+t._s(e.questDesc)+"\n\t\t\t\t\t\t")]),t._v(" "),t._l(e.itemList,function(a,i){return s("el-radio-group",{key:i,model:{value:e.questAnswer,callback:function(s){t.$set(e,"questAnswer",s)},expression:"item.questAnswer"}},[s("el-radio",{attrs:{label:i,checked:e.answers}},[t._v(t._s(a.item)+"、"+t._s(a.itemDesc))])],1)})],2)])}))]):t._e(),t._v(" "),t.mulData?s("div",{staticClass:"selectBox"},[s("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[1])+"、多选题下列题目中至少有2个及以上的正确答案，多选少选均不得分（每题"+t._s(t.every1)+"分，合计"+t._s(t.every1*t.mulData.length)+"分）")]),t._v(" "),s("div",{staticClass:"contentBox"},t._l(t.mulData,function(e,a){return s("div",{key:a,staticClass:"timuBox"},[s("div",{staticClass:"timu"},[s("h4",[t._v("\n\t\t\t\t\t\t\t"+t._s(a+1)+"、"+t._s(e.questDesc)+"\n\t\t\t\t\t\t")]),t._v(" "),t._l(e.itemList,function(e,a){return s("el-checkbox-group",{key:a,model:{value:e.answersl,callback:function(s){t.$set(e,"answersl",s)},expression:"itecM.answersl"}},[s("el-checkbox",{attrs:{label:e._id}},[t._v(t._s(e.item)+"、"+t._s(e.itemDesc)+" ")])],1)})],2)])}))]):t._e(),t._v(" "),t.comData?s("div",{staticClass:"selectBox"},[s("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[3])+"、填空题（每题"+t._s(t.every3)+"分，合计"+t._s(t.every3*t.comData.length)+"分）")]),t._v(" "),s("div",{staticClass:"contentBox"},t._l(t.comData,function(e,a){return s("div",{key:a,staticClass:"timuBox"},[s("div",{staticClass:"timu line"},[s("h4",[t._v(t._s(a+1)+"."+t._s(e.questDesc))]),t._v(" "),s("div",{staticClass:"continputBox"},t._l(e.itemList,function(e,a){return s("p",{key:a},[s("span",[t._v("( "+t._s(a+1)+" )")]),t._v(" "),s("span",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.qcAnswer,expression:"itec.qcAnswer"}],staticClass:"inputTox",attrs:{type:"text",onpaste:t.onpaste(),oncontextmenu:t.onpaste(),placeholder:"答案"},domProps:{value:e.qcAnswer},on:{input:function(s){s.target.composing||t.$set(e,"qcAnswer",s.target.value)}}})])])}))])])}))]):t._e(),t._v(" "),t.DisData?s("div",{staticClass:"selectBox hid"},[s("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[4])+"、论述题（每题"+t._s(t.every4)+"分，合计"+t._s(t.every4*t.DisData.length)+"分）")]),t._v(" "),s("div",{staticClass:"contentBox"},t._l(t.DisData,function(e,a){return s("div",{key:a,staticClass:"timuBox"},[s("div",{staticClass:"timu "},[s("h4",[t._v(t._s(a+1)+"."+t._s(e.questDesc))]),t._v(" "),s("div",{staticClass:"continputBox"},[s("div",t._l(e.imgArr,function(e,a){return s("span",{key:a,staticStyle:{"vertical-align":"top",display:"inline-block","margin-right":"0.5%"}},[s("img",{staticStyle:{width:"100px"},attrs:{src:t.img_api+e},on:{click:t.showImages}})])})),t._v(" "),s("p",{staticStyle:{"font-size":"14px"}},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.qcAnswer,expression:"item.qcAnswer"}],staticClass:"form-control",attrs:{onpaste:t.onpaste(),oncontextmenu:t.onpaste(),name:"description",placeholder:"答案"},domProps:{value:e.qcAnswer},on:{input:function(s){s.target.composing||t.$set(e,"qcAnswer",s.target.value)}}})])])])])}))]):t._e(),t._v(" "),s("el-dialog",{attrs:{visible:t.dialogTableVisible,center:"","show-close":!0},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[s("div",{staticClass:"success-dialog"},[s("div",{staticClass:"content"},[s("img",{attrs:{src:"static/img/waring.png"}}),t._v(" "),s("div",{staticClass:"name"},[t._v(" 你还有题没填，确定要交卷吗? ")])]),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticStyle:{display:"inline",width:"45%"},attrs:{type:"primary"},on:{click:function(e){t.oksubmit(1)}}},[t._v("确定")]),t._v(" "),s("el-button",{staticStyle:{display:"inline",width:"45%",padding:"17px"},on:{click:function(e){t.oksubmit(0)}}},[t._v("取消")])],1)])]),t._v(" "),s("el-dialog",{attrs:{title:"查看图片",visible:t.imgDialogVisible,width:"80%",center:""},on:{"update:visible":function(e){t.imgDialogVisible=e}}},[s("div",[s("img",{staticStyle:{width:"100%"},attrs:{src:t.targetImg}})]),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.imgDialogVisible=!1}}},[t._v("确 定")])],1)]),t._v(" "),s("div",{staticStyle:{height:"70px"}}),t._v(" "),s("div",{staticClass:"selectBox",staticStyle:{position:"fixed",bottom:"0","z-index":"99",width:"1002px"}},[s("el-row",[s("el-button",{attrs:{type:"primary"},on:{click:t.submitInfo}},[t._v("提交")])],1)],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("span",{staticClass:"mr"},[this._v("卷面分数")]),this._v(" "),e("span",[this._v("题目总数")])])}]};var n=function(t){s("1hfV")},r=s("VU/8")(a.a,i,!1,n,null,null);e.default=r.exports}});