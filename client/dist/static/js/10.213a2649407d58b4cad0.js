webpackJsonp([10],{XDXp:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("u0jD"),i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"answerDetail container"},[e("div",{staticClass:"headBox"},[e("div",{staticClass:"headBox",staticStyle:{"border-bottom":"1px solid #eee"}},[e("h3",[t._v("试卷："+t._s(t.resData.title))]),t._v(" "),e("p",{staticStyle:{"font-size":"14px"}},[t._v("\n\t\t\t\t\t描述："+t._s(t.resData.description)+"\n\t\t\t\t")])]),t._v(" "),e("div",{staticClass:"score mt"},[e("p",[e("span",{staticClass:"comCol comWeight mr"},[t._v(t._s(t.every0*t.sinData.length+t.every1*t.mulData.length)+"分")]),t._v(" "),e("span",{staticClass:"comCol comWeight"},[t._v(t._s(t.totalNum)+"题")])]),t._v(" "),t._m(0)])]),t._v(" "),t.sinData.length>0?e("div",{staticClass:"selectBox Single"},[e("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[0])+"、单选题（每题"+t._s(t.every0)+"分，合计"+t._s(t.every0*t.sinData.length)+"分）")]),t._v(" "),e("div",{staticClass:"contentBox"},t._l(t.sinData,function(s,a){return e("div",{key:a,staticClass:"timuBox"},[e("div",{staticClass:"timu"},[e("h4",[t._v("\n\t\t\t\t\t\t\t"+t._s(a+1)+"、"+t._s(s.questDesc)+"\n\t\t\t\t\t\t")]),t._v(" "),t._l(s.itemList,function(a,i){return e("el-radio-group",{key:i,model:{value:s.questAnswer,callback:function(e){t.$set(s,"questAnswer",e)},expression:"item.questAnswer"}},[e("el-radio",{attrs:{disabled:"",label:i.toString(),checked:s.answers}},[t._v(t._s(a.item)+"、"+t._s(a.itemDesc))])],1)})],2)])}))]):t._e(),t._v(" "),t.mulData.length>0?e("div",{staticClass:"selectBox"},[e("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[1])+"、多选题下列题目中至少有2个及以上的正确答案，多选少选均不得分（每题"+t._s(t.every1)+"分，合计"+t._s(t.every1*t.mulData.length)+"分）")]),t._v(" "),e("div",{staticClass:"contentBox"},t._l(t.mulData,function(s,a){return e("div",{key:a,staticClass:"timuBox"},[e("div",{staticClass:"timu"},[e("h4",[t._v("\n\t\t\t\t\t\t\t"+t._s(a+1)+"、"+t._s(s.questDesc)+"\n\t\t\t\t\t\t")]),t._v(" "),t._l(s.itemList,function(s,a){return e("el-checkbox-group",{key:a,model:{value:s.answersl,callback:function(e){t.$set(s,"answersl",e)},expression:"itecM.answersl"}},[e("el-checkbox",{attrs:{disabled:"",label:s._id}},[t._v(t._s(s.item)+"、"+t._s(s.itemDesc)+" ")])],1)})],2)])}))]):t._e(),t._v(" "),t.comData.length>0?e("div",{staticClass:"selectBox"},[e("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[3])+"、填空题（每题"+t._s(t.every3)+"分，合计"+t._s(t.every3*t.comData.length)+"分）")]),t._v(" "),e("div",{staticClass:"contentBox"},t._l(t.comData,function(s,a){return e("div",{key:a,staticClass:"timuBox"},[e("div",{staticClass:"timu line"},[e("h4",[t._v(t._s(a+1)+"."+t._s(s.questDesc))]),t._v(" "),e("div",{staticClass:"continputBox"},t._l(s.itemList,function(s,a){return e("p",{key:a,staticStyle:{color:"#67c23a","font-size":"14px"}},[e("span",[t._v("( "+t._s(a+1)+" )")]),t._v(" "),e("span",[t._v(" "+t._s(s.answersl)+" ")])])}))])])}))]):t._e(),t._v(" "),t.DisData.length>0?e("div",{staticClass:"selectBox"},[e("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[4])+"、论述题（每题"+t._s(t.every4)+"分，合计"+t._s(t.every4*t.DisData.length)+"分）")]),t._v(" "),e("div",{staticClass:"contentBox"},t._l(t.DisData,function(s,a){return e("div",{key:a,staticClass:"timuBox"},[e("div",{staticClass:"timu "},[e("h4",[t._v(t._s(a+1)+"."+t._s(s.questDesc))]),t._v(" "),e("div",{staticClass:"continputBox"},[e("div"),t._v(" "),e("p",{staticStyle:{color:"#67c23a","font-size":"14px"}},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(s.questAnswer)+"\n\t\t\t\t\t\t\t")])])])])}))]):t._e(),t._v(" "),e("el-dialog",{attrs:{title:"查看图片",visible:t.imgDialogVisible,width:"80%",center:""},on:{"update:visible":function(s){t.imgDialogVisible=s}}},[e("div",[e("img",{staticStyle:{width:"100%"},attrs:{src:t.targetImg}})]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:function(s){t.imgDialogVisible=!1}}},[t._v("确 定")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("span",{staticClass:"mr"},[this._v("卷面分数")]),this._v(" "),s("span",[this._v("题目总数")])])}]};var n=function(t){e("j2tZ"),e("yioL")},l=e("VU/8")(a.a,i,!1,n,null,null);s.default=l.exports},j2tZ:function(t,s){},u0jD:function(t,s,e){"use strict";(function(t){var a=e("Xxa5"),i=e.n(a),n=e("exGp"),l=e.n(n);s.a={name:"answerDetail",data:function(){return{resData:{title:""},score:"",totalNum:"",qbId:"",questType:"",endLastTime:"",usedTime:0,answerList:[],qcList:[],sinData:[],mulData:[],JudData:[],comData:[],DisData:[],every0:2,every1:3,every2:3,every3:3,every4:3,subjectName:"",sublevel:"",targetImg:"",allQuesNum:[],imgDialogVisible:!1}},methods:{goBack:function(){this.$router.back(-1)},showImages:function(){this.targetImg=event.target.getAttribute("src"),this.imgDialogVisible=!0},getList:function(){var t=this;return l()(i.a.mark(function s(){var e,a,n,l;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,t.$axioss.getTestPaperDetail({id:t.$route.params.id});case 2:return 1e3===(e=s.sent).data.code&&(a=e.data.datas.bigList,t.resData.title=e.data.datas.title,t.resData.description=e.data.datas.description,a.forEach(function(s){s.questKind,0==s.questKind?t.sinData.push(s):1==s.questKind?t.mulData.push(s):2==s.questKind?t.comData.push(s):3!=s.questKind||t.DisData.push(s)}),n=[],t.mulData.forEach(function(t,s){n=t.questAnswer.split("ψ"),t.itemList.forEach(function(t,s){n[s].length>0&&("true"==n[s]?t.answersl=!0:t.answersl=!1)})}),n=[],t.comData.forEach(function(t,s){n=t.questAnswer.split("ψ"),t.itemList.forEach(function(t,s){t.answersl=n[s]})}),console.log(t.DisData),t.totalNum=a.length,l=0,t.sinData&&(l++,t.allQuesNum[0]=l),t.mulData&&(l++,t.allQuesNum[1]=l),t.comData&&(l++,t.allQuesNum[3]=l),t.DisData&&(l++,t.allQuesNum[4]=l)),s.abrupt("return",!1);case 8:case"end":return s.stop()}},s,t)}))()}},mounted:function(){this.getList(),t("footer").hide()}}}).call(s,e("7t+N"))},yioL:function(t,s){}});