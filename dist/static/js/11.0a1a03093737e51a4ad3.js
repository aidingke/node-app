webpackJsonp([11],{CzDK:function(t,e){},acdc:function(t,e,s){"use strict";(function(t){var a=s("fZjL"),i=s.n(a),n=s("Xxa5"),c=s.n(n),o=s("exGp"),r=s.n(o);e.a={name:"MultipleChoice",props:{objMul:{type:Object}},data:function(){return{numVal:0,questKind:"1",subjradio:"",subjradio1:"",SubjectsList:[],filterInput:"",allVal:"",subjectId:1,bankType:1,pageNo:1,scores:3,checkScore:0,allScores:0,tagTotal:"",editBtn:0,dataVal:"",checkVal:0,checkAll:!1,isIndeterminate:!0,showAdd:!1,dialogTableVisible:!1,time:3,sendMsgDisabled:!1,form:{name:"",token:"",resData:[{title:"",content:"",answers:!1},{title:"",content:"",answers:!1},{title:"",content:"",answers:!1},{title:"",content:"",answers:!1}]},itemList:[],questList:[],ansList:[],resData:[{}]}},methods:{goBackInfo:function(){var t={showPaperShow:!0,addPaperShow:!1};this.$emit("goBackInfo",t)},openAddInfo:function(){this.form.name="",this.form.resData.forEach(function(t,e){t.title="",t.content="",t.answers=!1}),this.editBtn=-1,this.showAdd=!0},filterBy:function(t,e){return 0===e.length?(this.tagTotal=t.length,this.resData):(t=t.filter(function(t){if(t.questDesc.match(e))return t.questDesc.match(e)}),this.tagTotal=t.length,t)},AddInfo:function(){var t=this;return r()(c.a.mark(function e(){var s,a,i,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(s={subjectId:t.subjradio,questKind:t.questKind,questDesc:"",questAnswer:"",itemList:[]},a=void 0,i=void 0,n=0,0,void 0,{},i=t.form.resData,i.length,!(t.form.name.length<5||t.form.name.length>500)){e.next=8;break}return t.dialog("题目描述字数不能少于5个且不能多于500个！"),e.abrupt("return",!1);case 8:if(s.questDesc=t.form.name,i.forEach(function(t,e){if(1==t.answers&&n++,""==t.content)a=1;else{var i,c={};i=0==e?"A":1==e?"B":2==e?"C":3==e?"D":4==e?"E":5==e?"F":"无解",c.item=i,c.itemDesc=t.content,s.itemList.push(c),s.questAnswer+=t.answers+"ψ"}}),1!=a){e.next=13;break}return t.dialog("选项内容必填且还有答案"),e.abrupt("return",!1);case 13:if(!(n<1)){e.next=16;break}return t.dialog("请选择至少1个正确答案"),e.abrupt("return",!1);case 16:if(s.questAnswer=s.questAnswer.substring(0,s.questAnswer.length-1),-1==t.editBtn){e.next=22;break}t.resData.splice(t.editBtn,1,s),console.log(t.resData[t.editBtn]),e.next=26;break;case 22:return e.next=24,t.$axioss.addQuestionItem(s);case 24:1e3==e.sent.data.code?(t.showAdd=!1,t.dialogTableVisible=!0,t.handleCheckedSingleChange(),t.getList()):t.dialog("添加没成功！再试一次");case 26:return e.abrupt("return",!1);case 27:case"end":return e.stop()}},e,t)}))()},editAnswers:function(t){this.showAdd=!0,this.form.name=this.resData[t].name;var e=[];this.resData[t].arr.forEach(function(t,s){var a={};a.title=t.name.substring(0,1),a.content=t.name.substring(2),a.answers=t.answers,e.push(a)}),this.form.resData=e,this.editBtn=t},addAnswers:function(){if(!(this.form.resData.length<6))return this.dialog("不能再添加了！"),!1;this.form.resData.push({title:"",content:"",answers:!1})},deleAnswers:function(t){this.checkVal;this.resData.length,this.resData.splice(t,1),this.handleCheckedSingleChange()},closeAnswers:function(t){if(t<2)return this.dialog("保留前2个选项，不能再删了！"),!1;this.form.resData.splice(t,1)},onsearchHandle:function(){},handleCheckAllChange:function(t){this.checkAll?this.resData.forEach(function(t,e){t.checkedSingles=!0}):this.resData.forEach(function(t,e){t.checkedSingles=!1}),this.scoreFun()},handleCheckedSingleChange:function(t){this.scoreFun()},singleChange:function(){},keyUpFun:function(){},scoreFun:function(){var t=0,e=0,s=0,a=!0,i=Number(this.scores);this.allVal=this.resData.length,this.resData.forEach(function(t,n){return!0===t.checkedSingles?(e+=i,s++):a=!1,a}),t=this.allVal*this.scores,this.checkAll=!!a,this.checkVal=s,this.allScores=t,this.checkScore=e},getList:function(t){var e=this;return r()(c.a.mark(function s(){var a,n,o,r;return c.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return a={questKind:e.questKind.toString(),subject:""},n=[],a.subject=t||e.subjradio1.toString(),s.next=4,e.$axioss.getQuestionItemList(a);case 4:if(404!==(o=s.sent).code){s.next=10;break}return e.dialog("查询出错了"),s.abrupt("return",!1);case 10:if(1e3!==o.data.code){s.next=18;break}if(0!=i()(o.data.newArr.data).length){s.next=14;break}return e.resData=[],s.abrupt("return",!1);case 14:e.resData=o.data.newArr.data,e.resData.forEach(function(t,e){n=t.questAnswer.split("ψ"),t.itemList.forEach(function(t,e){t.answersl="true"===n[e]})}),e.objMul.parentData.length>0&&(r=e.objMul.parentData,e.scores=e.objMul.scores,e.resData.forEach(function(t,e){t.checkedSingles=!1,r.forEach(function(e,s){t._id==e._id&&(t.checkedSingles=!0)})})),e.scoreFun();case 18:case"end":return s.stop()}},s,e)}))()},getSubjectMenuList:function(){var t=this;return r()(c.a.mark(function e(){var s;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axioss.getSubjectMenuList();case 2:if(1e3!=(s=e.sent).data.code){e.next=8;break}return t.SubjectsList=s.data.data,t.subjradio1=s.data.data[0]._id,t.subjradio=s.data.data[0]._id,e.abrupt("return",t.subjradio1);case 8:case"end":return e.stop()}},e,t)}))()},submitSubjesc:function(){var t=this;return r()(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.getList(t.subjradio1),e.abrupt("return",!1);case 2:case"end":return e.stop()}},e,t)}))()},submitInfo:function(){var t=this.resData,e=[],s={};s.tit=this.questKind,t.forEach(function(t,s){!0===t.checkedSingles&&e.push(t)}),s.score=this.checkScore,s.resData=e,this.$emit("getPaperInfo",s)}},mounted:function(){var e=this;this.getSubjectMenuList().then(function(t){""===t&&null===t||e.getList(t)}),t("footer").hide()},watch:{dialogTableVisible:function(t){if(t){var e=this;e.sendMsgDisabled=!0;var s=window.setInterval(function(){e.time--<=1&&(e.time=3,e.sendMsgDisabled=!1,e.dialogTableVisible=!1,window.clearInterval(s))},1e3)}}}}}).call(e,s("7t+N"))},auoD:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("acdc"),i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"MultipleChoice container"},[s("Header",{attrs:{title:"多选题库"}}),t._v(" "),s("div",{staticStyle:{width:"50px",height:"50px",position:"relative","margin-top":"-50px"},on:{click:t.goBackInfo}}),t._v(" "),s("div",{staticClass:"headBox"},[s("h1",{staticClass:"display-4 text-center line pb15"},[t._v("多选题库")]),t._v(" "),s("h3",[s("span",{staticClass:"addTi",on:{click:t.openAddInfo}},[t._v("+")]),t._v("每道多选题分数为"),s("input",{directives:[{name:"model",rawName:"v-model",value:t.scores,expression:"scores"}],staticStyle:{"border-bottom":"1px dotted #555"},attrs:{disabled:"",placeholder:""},domProps:{value:t.scores},on:{keyup:[t.scoreFun,t.keyUpFun],input:function(e){e.target.composing||(t.scores=e.target.value)}}}),t._v("分")])]),t._v(" "),s("div",{staticClass:"headBox"},[s("div",{staticClass:"head-title",staticStyle:{display:"inline"}},[t._v("科目：")]),t._v(" "),s("div",{staticClass:"block",staticStyle:{width:"79%","margin-left":"1%",display:"inline"}},t._l(t.SubjectsList,function(e,a){return s("el-radio-group",{key:a,staticStyle:{"margin-right":"8px",display:"inline-block"},model:{value:t.subjradio1,callback:function(e){t.subjradio1=e},expression:"subjradio1"}},[s("el-radio",{attrs:{label:e._id}},[t._v(t._s(e.subjectName))])],1)})),t._v(" "),s("div",{staticStyle:{display:"inline"}},[s("el-button",{staticStyle:{width:"90px",display:"inline"},attrs:{type:"primary"},on:{click:t.submitSubjesc}},[t._v("查询")])],1)]),t._v(" "),s("div",{staticClass:"group-div"},[s("el-input",{staticClass:"input-with-select",attrs:{placeholder:"题目关键字","prefix-icon":"el-icon-search"},model:{value:t.filterInput,callback:function(e){t.filterInput=e},expression:"filterInput"}},[s("el-button",{attrs:{slot:"append"},on:{click:t.onsearchHandle},slot:"append"},[t._v("搜索")])],1)],1),t._v(" "),s("div",{staticClass:"selectBox"},[s("div",{staticClass:"contentBox"},[s("h3",[s("el-checkbox",{staticStyle:{"font-weight":"900"},on:{change:t.handleCheckAllChange},model:{value:t.checkAll,callback:function(e){t.checkAll=e},expression:"checkAll"}},[t._v("全选("+t._s(t.checkVal)+"/"+t._s(t.allVal)+")")])],1),t._v(" "),t.tagTotal<=0?s("div",{staticClass:"noInfo"},[t._m(0)]):t._e(),t._v(" "),t._l(t.filterBy(t.resData,t.filterInput),function(e,a){return s("div",{key:a,staticClass:"timuBox"},[s("el-checkbox-group",{on:{change:t.handleCheckedSingleChange},model:{value:e.checkedSingles,callback:function(s){t.$set(e,"checkedSingles",s)},expression:"item.checkedSingles"}},[s("div",{staticClass:"timu"},[s("h4",[s("el-checkbox",{staticStyle:{display:"inline-block"},attrs:{checked:e.checkedSingles}},[t._v(t._s(a+1)+"、"+t._s(e.questDesc))]),t._v(" "),s("span",{staticStyle:{float:"right",top:"31px",right:"0px",width:"21px"},on:{click:function(e){t.deleAnswers(a)}}},[s("img",{attrs:{src:"static/images/dele.png"}})]),t._v(" "),s("span",{staticStyle:{float:"right",color:"#bbb",top:"0",right:"0"}},[t._v(t._s(t.scores)+"分")])],1),t._v(" "),t._l(e.itemList,function(e,a){return s("el-checkbox-group",{key:a,model:{value:e.answersl,callback:function(s){t.$set(e,"answersl",s)},expression:"itec.answersl"}},[s("el-checkbox",{attrs:{disabled:"",label:a},on:{change:t.singleChange}},[t._v(t._s(e.item)+"、"+t._s(e.itemDesc)+" ")])],1)})],2)])],1)})],2)]),t._v(" "),s("div",{staticClass:"selectBox container",staticStyle:{position:"fixed",bottom:"0px","z-index":"99",padding:"15px 0"}},[s("el-row",[s("el-button",{staticStyle:{width:"47%",display:"inline"},on:{click:t.goBackInfo}},[t._v("返回")]),t._v(" "),s("el-button",{staticStyle:{width:"47%",display:"inline"},attrs:{type:"primary"},on:{click:t.submitInfo}},[t._v("提交")])],1)],1),t._v(" "),s("el-dialog",{attrs:{title:"新增多选题",visible:t.showAdd},on:{"update:visible":function(e){t.showAdd=e}}},[s("el-form",{attrs:{model:t.form}},[s("div",{staticClass:"head-div"},[s("div",{staticClass:"head-title"},[t._v("科目")]),t._v(" "),s("div",{staticClass:"block",staticStyle:{width:"79%","margin-left":"1%"}},t._l(t.SubjectsList,function(e,a){return s("el-radio-group",{key:a,staticStyle:{"margin-right":"8px",overflow:"hidden",display:"inline-block"},model:{value:t.subjradio,callback:function(e){t.subjradio=e},expression:"subjradio"}},[s("el-radio",{attrs:{label:e._id}},[t._v(t._s(e.subjectName))])],1)}))]),t._v(" "),s("span",{staticStyle:{"font-size":"14px"}},[t._v("每题分数："),s("b",{staticStyle:{color:"red"}},[t._v(t._s(t.scores))]),t._v("分")]),t._v(" "),s("el-form-item",{attrs:{label:"题目描述"}},[s("el-input",{attrs:{maxlength:"500",type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入题目描述，最多36个字"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),s("div",[s("p",{staticStyle:{"font-size":"18px"}},[s("span",{staticStyle:{color:"#3DA2FE",float:"right"},on:{click:function(e){t.addAnswers()}}},[t._v("添加")]),t._v(" "),s("span",[t._v("选项（勾选口默认该选项为正确答案）")])]),t._v(" "),s("el-checkbox-group",t._l(t.form.resData,function(e,a){return s("div",{key:a},[s("el-checkbox-group",{model:{value:e.answers,callback:function(s){t.$set(e,"answers",s)},expression:"items.answers"}},[s("el-checkbox",{attrs:{label:a}},[t._v(t._s(0==a?"A":1==a?"B":2==a?"C":3==a?"D":4==a?"E":5==a?"F":""))]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.content,expression:"items.content"}],attrs:{placeholder:"答案"},domProps:{value:e.content},on:{input:function(s){s.target.composing||t.$set(e,"content",s.target.value)}}}),t._v(" "),s("i",{staticClass:"el-dialog__close el-icon el-icon-close closeBtn",on:{click:function(e){t.closeAnswers(a)}}})],1)],1)}))],1)],1),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticStyle:{display:"inline",width:"43%"},attrs:{type:"primary"},on:{click:t.AddInfo}},[t._v("确 定")]),t._v(" "),s("el-button",{staticStyle:{display:"inline",width:"43%"},on:{click:function(e){t.showAdd=!1}}},[t._v("取 消")])],1)],1),t._v(" "),s("el-dialog",{attrs:{visible:t.dialogTableVisible,center:"","show-close":!1},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[s("div",{staticClass:"success-dialog"},[s("div",{staticClass:"content"},[s("img",{attrs:{src:"static/images/success.png"}}),t._v(" "),s("div",{staticClass:"name"},[t._v(" 新增多选题成功")]),t._v(" "),t.sendMsgDisabled?s("div",{staticClass:"time"},[t._v(t._s(t.time+"s回到详情页")+">")]):t._e()]),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticStyle:{display:"inline",width:"43%"},attrs:{type:"primary"},on:{click:t.openAddInfo}},[t._v("再加一个")]),t._v(" "),s("el-button",{staticStyle:{display:"inline",width:"43%"},on:{click:function(e){t.dialogTableVisible=!1}}},[t._v("知道了")])],1)])]),t._v(" "),s("div",{staticClass:"scoreAll"},[s("p",[s("span",{staticClass:"big"},[t._v(t._s(t.checkScore))]),t._v("\n\t\t\t\t/"),s("span",[t._v("100 ")])]),t._v(" "),s("p",[t._v("试卷分值")])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"default"},[e("img",{attrs:{src:"static/img/not-add-default.png",alt:""}}),this._v(" "),e("div",{staticClass:"not-class"},[this._v("\n\t\t\t\t\t\t\t暂无相关信息\n\t\t\t\t\t\t")])])}]};var n=function(t){s("o1p+"),s("CzDK")},c=s("VU/8")(a.a,i,!1,n,null,null);e.default=c.exports},"o1p+":function(t,e){}});