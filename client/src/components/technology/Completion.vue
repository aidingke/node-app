<!-- 
* name: 填空题库
* author: fjd
* time: 2018-7-31
-->
<template>
    <div class="Completion container prel">
		<!-- 导航 -->
        <Header title="填空题库"></Header>
		<div @click="goBackInfo" style="width: 50px;height: 50px;position:relative;margin-top:-50px;">
		<!-- 做组件返回处理 -->
		</div>
		<div class="headBox">
			<h1 class="display-4 text-center line pb15">填空题题库</h1>
			<h3><span class="addTi" @click="openAddInfo">+</span>每道填空题分数为<input disabled style="border-bottom:1px dotted #555;" v-model="scores" v-on:keyup="scoreFun" @keyup=keyUpFun />分</h3>
		</div>
		<div class="headBox">
			<div class="head-title" style="display: inline;">科目：</div>
			<div class="block" style="width:79%;margin-left:1%;display: inline;">
				<el-radio-group v-for="(itec,ii) in SubjectsList" :key="ii" v-model="subjradio1" style="margin-right:8px;display:inline-block;">
					<el-radio :label="itec._id">{{itec.subjectName}}</el-radio>
				</el-radio-group>
			</div>
			<div style="display: inline;">
				<el-button type="primary" style="width:90px;display: inline;" @click="submitSubjesc">查询</el-button>
			</div>
		</div>
		<div class="group-div">
            <el-input placeholder="题目关键字" prefix-icon="el-icon-search"  class="input-with-select" v-model="filterInput">
                <el-button slot="append" @click="onsearchHandle">搜索</el-button>
            </el-input>
		</div>	
		<div class="selectBox">
			<div class="contentBox">
				<h3> 
					<el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选({{checkVal}}/{{allVal}})</el-checkbox>
				</h3>
				<div class="noInfo" v-if="tagTotal<=0">
					<div class="default">
						<img src="static/img/not-add-default.png" alt="" />
						<div class="not-class">
							暂无相关信息
						</div>
					</div>
				</div>

				<div class="timuBox" v-for="(item,index) in filterBy(resData,filterInput)" :key="index">
					<div class="timu" >
						<el-checkbox-group v-model="item.checkedSingles" @change="handleCheckedSingleChange">
							<h4>
								<el-checkbox :checked="item.checkedSingles" style="display: inline-block;">{{index+1}}、{{item.questDesc}}</el-checkbox>
								<span style="float:right;" @click="deleAnswers(index)"><img src="static/images/dele.png" /></span>
								<!-- <span style="float:right;" @click="editAnswers(index)"><img src="static/img/edit.png" /></span> -->
								<span style="float:right;color:#bbb;margin-right:1%">{{scores}}分</span>
							</h4>
						</el-checkbox-group>
						<ul>
							<li v-for="(itec,index) in item.itemList" :key="index"> （{{index+1}}） <span>{{itec.answersl}}</span> </li>
						</ul>
					</div>
				</div>	
			</div>
		</div>

		<div class="selectBox container pabs" style=" bottom: 0px; z-index: 99;padding:15px 0;">
			<el-row>
				<el-button @click="goBackInfo" style="width:47%;display: inline;">返回</el-button>
				<el-button type="primary" @click="submitInfo" style="width:47%;display: inline;">提交</el-button>
			</el-row>	
		</div>

        <el-dialog title="新增填空题" :visible.sync="showAdd" @close="resetForm">
            <el-form :model="form">
				<div class="head-div">
					<div class="head-title">科目</div>
					<div class="block" style="width:79%;margin-left:1%;">
						<el-radio-group v-for="(itec,ii) in SubjectsList" :key="ii" v-model="subjradio" style="margin-right:8px;overflow: hidden;display:inline-block;">
							<el-radio :label="itec._id">{{itec.subjectName}}</el-radio>
						</el-radio-group>
					</div>
				</div>
				<span style="font-size:14px">每题分数：<b style="color:red">{{scores}}</b>分</span>
                <el-form-item label="题目描述">
                    <el-input v-model="form.name" maxlength=500 type="textarea" id="txt1" @change="changeValue" @blur="getTxt1CursorPosition" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入题目描述，最多36个字" >
                    </el-input>
                </el-form-item>
				<div>	
					<p style="font-size:18px;">
						<span style="color:#3DA2FE;float:right" @click="addAnswers()">插入填空</span>
						<span>正确答案</span>
					</p>
					<div v-for="(items,indexTit) in form.resData" :key="indexTit" class="contBoxMain">
						<span>（{{indexTit+1}}）</span>
						<input placeholder="输入答案" v-model="items.content"/>
						<i class="el-dialog__close el-icon el-icon-close closeBtn" @click="closeAnswers(indexTit)"></i>
					</div>
				</div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="AddInfo" style="display: inline;width:45%">确 定</el-button>
				<el-button @click="resetForm" style="display: inline;width:45%">取 消</el-button>
            </div>
        </el-dialog>

		<el-dialog :visible.sync="dialogTableVisible" center :show-close="false">
			<div class="success-dialog">
				<div class="content">
					<img src="static/images/success.png" />
					<div class="name"> 新增填空题成功</div>
					<div class="time" v-if="sendMsgDisabled">{{time+'s回到详情页'}}></div>
				</div>	
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="openAddInfo" style="display: inline;width:45%">再加一个</el-button>
					<el-button @click="dialogTableVisible = false" style="display: inline;width:45%">知道了</el-button>
				</span>
			</div>	
		</el-dialog>

		<div class="scoreAll">
			<p>
				<span class="big">{{checkScore}}</span>
				/<span>100 <!--{{allScores}}--></span>
			</p>
			<p>试卷分值</p>
		</div>
	</div>
</template>

<script>
export default {
	name:'Completion',
	props:{
		objCom:{
			type:Object
		}
	},
    data(){
        return {
			numVal: 				0,//记录新增选择题数量做判断，全部没选就提示 选有且有一个答案
			filterInput:			"",
			allVal:					'',
			questKind:				'2',//3是填空题
			subjradio: 				'',//默认科目0k
			subjradio1:				'',//科目触发事件	
			SubjectsList:			[
				// {
				// 	id:0,
				// 	subjectName:'web前端'
				// }
			],
			scores:					10,//输入框，每道题多少分
			checkScore:				0,//记录选中的分数
			allScores:				0,//记录总分数	
			editBtn:				0,
			tagTotal:				'',
			dataVal:				'',
			checkVal:				0,//记录选择多少个题
			checkAll: 				true,
			isIndeterminate: 		true,
			showAdd:             	false, 
			dialogTableVisible: 	false,//发布成功弹窗				
            time:               	3,   //默认时间3S
            sendMsgDisabled:    	false,
			form: {
				name: '',
				resData:[]
			},
			itemList:[],
			questList:[],
			ansList:[],
			resData: [
				{
					"qcDesc": "2汽车空调的运行原理以及空调结构解析是什么？",
					"arr":[
						{'name':'A.1压缩机'},
						{'name':'B.冷凝器'},
						{'name':'C.车门'},
						{'name':'D.底盘'}
					],
					"checkedSingles":true
				}
			]
        }
	},
	methods: {
		goBackInfo(){
			let c={}
			c.showPaperShow=true,c.addPaperShow=false
			this.$emit("goBackInfo",c)
		},
		resetForm(){
			this.form = {
				name: '',
				resData:[]
			};
			this.showAdd = false;   // 关闭弹窗
		},
		changeValue(){
			console.log(1)
		},
		//重新给数据赋值空
		openAddInfo(){
			// console.log(this.form)
			// return false
			// let a = this.form.resData
			// this.form.name = ''

			// a.length===2?a.splice(0,1):a.length===3?a.splice(0,2):a.length===4?a.splice(0,3):a.length===5?a.splice(0,4):a.length===6?a.splice(0,5):'what are you doing'
			// a[0].content =''
			this.editBtn = -1 //编辑功能关闭
			this.showAdd = true
		},
		filterBy(resData,value){
			if(value.length===0){
				this.tagTotal = resData.length
				return this.resData
			}else{
				resData = resData.filter(function(info){
					if(info.questDesc.match(value)){
						return info.questDesc.match(value);
					}
				})
				this.tagTotal = resData.length
				return resData
			}
		},
		//弹出层 用于添加题目
		async AddInfo(){
			// console.log(this.form)
			//  return false;			
			let ywkData ={
				subjectId:this.subjradio,
				questKind:this.questKind,//定3填空
				questDesc:'',
				questAnswer:'',
				itemList:[]
			},cflg,d
			//cflg判定选择题中内容不能为空，d是让写法短一点
			d = this.form.resData
			if(this.form.name.length<5||this.form.name.length>500)
			{
				this.dialog('题目描述字数不能少于5个且不能多于500个！')
				return false
			}
			else{
				ywkData.questDesc= this.form.name
				// ywkData.score = this.scores
				d.forEach(function(items,index){
					// console.log(flags,numVals)
					if(items.content==''){
						cflg=1  //这里return false不管用，弹窗出不来所以得在外层阻止
					}
					else{
						let itemL={}
						itemL.item = index+','
						ywkData.itemList.push(itemL);
						//只要答案字符串就行了
						ywkData.questAnswer += items.content+'ψ'
					}
				})
				if(cflg==1){
					this.dialog('选项内容必填哦')
					return false
				}

				ywkData.questAnswer=ywkData.questAnswer.substring(0,ywkData.questAnswer.length-1)
				// console.log(ywkData.questAnswer)
				// return false	

				//更新和添加数据接口在此判断
				if(this.editBtn!=-1){	
					this.resData.splice(this.editBtn,1,ywkData);
					console.log(this.resData[this.editBtn])
					// return false
				}else{
					const res = await this.$axioss.addQuestionItem(ywkData);
					this.resetForm();
					if(res.data.code==1000){
						// this.$message.warning('添加多选成功！')	
						this.showAdd = false
						this.dialogTableVisible = true
						this.handleCheckedSingleChange()
						// this.resData.push(ywkData)
						this.getList()
					}else{
						this.dialog('操作失败')	
					}
				}
			}
			return false
		},
		editAnswers(x){
			this.showAdd = true		
			//给内容赋值
			this.form.name = this.resData[x].name
			let editArr = []

			this.resData[x].arr.forEach(function(items,index){
				let array = {}
				array.content=items.name
				editArr.push(array)
			})
			
			this.form.resData = editArr
			//  console.log(this.form)
			this.editBtn = x
		},
		getTxt1CursorPosition(){
			var oTxt1 = document.getElementById("txt1");
			var cursurPosition = -1;
			if(oTxt1.selectionStart){//非IE浏览器
				cursurPosition = oTxt1.selectionStart;
			}else{//IE
				if(oTxt1.value.length>0){
					var range = document.selection.createRange();
					range.moveStart("character",-this.form.name.length);
					cursurPosition = range.text.length;
				}
			}
			return sessionStorage.setItem("cursurPosition",cursurPosition);
		},
		addAnswers(){
			let basket ={
				title:'',
				content:'',
				answers:false,
			}
			//只能添加2项选择
			// let count = 0;
			let index = sessionStorage.getItem("cursurPosition"); // 当前光标的位置
			if(this.form.resData.length<6){
				basket.id = this.form.resData.length-0;
				this.form.resData.push(basket);
				if(index==='-1'){
					this.form.name += '('+(basket.id+1)+')';
				}else if(index < this.form.name.length){
					this.form.name = this.form.name.slice(0,index)+'('+(basket.id+1)+')'+this.form.name.slice(index);
				}else{
					this.form.name = this.form.name.slice(0,index)+'('+(basket.id+1)+')';
				}
				// 插入后排序
				// this.addAnswersSort();
			}
			else{
				this.dialog('不能再添加了！')
				// this.$message({
				// 	showClose: true,
				// 	message: '不能再添加了！',
				// 	duration:2000,
				// 	type: 'warning'
				// });
				return false
			}
		},
		addAnswersSort(){
			let count = 0;
			for(let i = 0, iLen = this.form.name.length; i < iLen; i++){
				if(this.form.name[i].match(/\d/)){ // 是数字
					if(this.form.name[i]==Number(this.form.name.charAt(i))){
						count = count+1;
						this.$set(this.form,"name",this.form.name.replace("("+this.form.name.lastIndexOf(this.form.name.charAt(i))+")","("+count+")"))
					}
				}else{
					
				}
			}
		},
		//删除多选
		deleAnswers(index){
			let a = this.checkVal
			if(this.resData.length<3){
				// this.dialog('保留前2个选项，不能再删了！')
				// return false
				this.resData.splice(index,1)
				this.handleCheckedSingleChange()
			}else{
				this.resData.splice(index,1)
				this.handleCheckedSingleChange()
			}
			
		},
		closeAnswers(index){
			let count = 0;
			this.form.name = this.form.name.replace("("+(index+1)+")","");
			for(let i = 0, iLen = this.form.name.length; i < iLen; i++){
				if(this.form.name[i].match(/\d/)){ // 是数字
					if(index<this.form.name.charAt(i)){
						this.form.name = this.form.name.replace("("+(index+2+count)+")","("+(index+1+count)+")");
						count = count+1;
					}
				}else{
					
				}
			}
			this.form.resData.splice(index,1);
		},
		onsearchHandle() {

		},
		//全选
		handleCheckAllChange(val) {
			if(this.checkAll){
				this.resData.forEach(function(items,index){
					items.checkedSingles=true
				})
			}else{
				this.resData.forEach(function(items,index){
					items.checkedSingles=false
				})
			}
			//分数
			this.scoreFun()
		},
		// 点选
		handleCheckedSingleChange(value) {
			//分数
			this.scoreFun()
		},
		keyUpFun(){
			// this.checkScore = this.scores*this.checkVal
			// this.allScores = this.scores*this.resData.length
		},
		//获取 全选 和 点选分数
		scoreFun(){
			let allScore = 0,checkS=0,a =0,t=true,sc=Number(this.scores) //总分，选中的分数,选中的题数,t是有一个没选中 全选会变成 false
			this.allVal = this.resData.length
			this.resData.forEach(function(v,i){
				allScore +=v.score
				//获取选中的分
				if(v.checkedSingles===true){
					// checkS+=v.score
					checkS+=sc
					a++
				}else{
					//有一个false 全选都是不选中状态
					t=false
				}
				return allScore,checkS,a
			})
			allScore = this.allVal*this.scores
			// allScore = this.objCom.scoresAll
			
			this.checkAll=t?true:false
			this.checkVal = a
			this.allScores=allScore
			this.checkScore=checkS
			// console.log(this.checkScore+'fen')
		},
		async getList(x){//获取列表,x是分类ID
			let params = {questKind:this.questKind},newList=[],answers=[]

			if(x){
				params.subject = x
			}else{
				params.subject = this.subjradio1.toString()
			}
			const res = await this.$axioss.getQuestionItemList(params)
			
			if(res.code===1100){
				this.dialog(res.message)
				return false
			}else if(res.data.code===1000){
				if(Object.keys(res.data.newArr.data).length==0){
					this.resData = []
					return false
				}

				this.resData = res.data.newArr.data	
				

				// this.questList = res.data.questList
				
				this.resData.forEach(function(item,index){
					answers=item.questAnswer.split("ψ");
					item.itemList.forEach(function(vv,ii){
						vv.answersl = answers[ii]
					})
				})

				//从父组件传回来的素组去和现在的匹配，有值为true
				if(this.objCom.parentData.length>0){

					let parentData = this.objCom.parentData
					//给输入框的分数赋值
					this.scores = this.objCom.scores
					this.resData.forEach(function(v,i){
						v.checkedSingles=false
						parentData.forEach(function(val,index){
							if(v.qcDesc===val.qcDesc){
								v.checkedSingles=true
							}
						})
					})
				}
				//获取分数 一个总分 一个选中分数
				this.scoreFun()	
			}					
		},
		//最后提交的时候获取选中的数据
		submitInfo(){
			let a =this.resData,b=[],c={}
			c.tit=this.questKind //传3给父组件
			// c.score = this.checkScore
			a.forEach(function(v,i){
				if(v.checkedSingles===true){
					b.push(v)
				}
			})
			c.score = this.checkScore
			c.resData = b
			//子组件传给父组件值
			this.$emit("getPaperInfo",c);
		},
		async getSubjectMenuList(){
			const res = await this.$axioss.getSubjectMenuList()
			// console.log(res)
			if(res.data.code==1000){
				this.SubjectsList = res.data.data
				this.subjradio1 = res.data.data[0]._id
				this.subjradio = res.data.data[0]._id
				// console.log(this.subjradio)
				return this.subjradio1
			}
		},
		async submitSubjesc(){
			this.getList(this.subjradio1)
			return false
		}
	},
	mounted(){
		$('footer').hide()
		let _this = this
		//获取菜单列表,然后请求列表
		this.getSubjectMenuList().then(function(value){
			if(value!==''||value!==null){
				// console.log(value)
				_this.getList(value)
			}
		});
	},
	computed: {
		name: function(){
			return this.form.arr.push(this.form.name);
		}
	},
	watch:{
		dialogTableVisible(val){
			if(val){
				let me = this;
				me.sendMsgDisabled = true;
				let interval = window.setInterval(function() {
					if ((me.time--) <= 1) {
						me.time = 3
						me.sendMsgDisabled = false
						me.dialogTableVisible=false
						window.clearInterval(interval); //停止
					}
				}, 1000);
			}
		}
	}
}
</script>


<style lang="stylus">
.Completion
	.headBox
		input 
			width 10%
			height 30px
			font-size 16px
			text-indent 5px
			margin 0 10px 0 10px
			border none
		.addTi
			float right 
			font-size 36px
			margin-top -10px
			color #138be7	
	.headBox
		background #fff
		margin-top 0px
		padding 10px
		color #909399
		h3
			color #333
			font-size 16px
		.comCol
			color #E7A848
			font-size 16px
		.comWeight
			font-weight:900	
		.score
			border-bottom 2px solid #ddd
			padding-bottom 20px
			span 
				width 180px
				display inline-block		
	.group-div
		padding 15px
		background #efefef
		input 
			width 100%
			height 45px
			line-height 45px
			font-size 16px
			text-indent 35px
			padding-left 0
		.el-input-group__append
			padding 0	
			button
				width 90px
				height 45px
				font-size 16px
				color #fff
				border-radius 0
				background #138be7
				margin 0
			.el-input__icon
			.el-input__prefix
				font-size 20px
				width 45px  
	.subBox
		position fixed
		bottom 0
		left 0	
		width 100%
		z-index 999			
	.selectBox
		margin-top 0px
		background #fff
		// border-bottom 1px solid #ddd
		padding 0 30px 50px 10px
		.contentBox
			margin-bottom 15%
			h3
				.el-checkbox__label
					font-weight 900
					font-size 16px
			.noInfo
				position relative
				height 900px
				.default
					width 200px
					position absolute
					left 50%
					top 50%
					transform: translate(-50%,-50%)
					img
						max-width 100%
					.not-class
						font-size 20px
						text-align center
						color #9b9b9b
						margin 15px 0 0 0
					.add-text
						font-size 12px
						text-align center
						color #a5a5a5
						margin 15px 0 25px 0
					.el-button
						width 100%
						padding 15px 10px
						font-size 16px
			.el-checkbox__label
				line-height 20px
				font-weight 900
				font-size 16px
			.el-checkbox__input.is-checked+.el-checkbox__label
				color #67c23a
			.el-checkbox__input.is-checked .el-checkbox__inner
				background  #67c23a
				border-color #67c23a	 	
			.el-checkbox__input.is-focus .el-checkbox__inner
				border-color #ccc
		.timuBox
			border-bottom 1px solid #eee 
			h4
				font-weight 300;
				line-height 30px;
				font-size 16px;
				color #303133;
				img
					width 20px
					height 20px
					margin 0px 20px 0 0
				.el-checkbox__input.is-checked .el-checkbox__inner
					background  #666
					border-color #666	
				.el-checkbox__input.is-checked+.el-checkbox__label
					color #666	
			.el-checkbox__input.is-checked+.el-checkbox__label
				color #67c23a
			.el-checkbox__input.is-checked .el-checkbox__inner
				background  #ccc
				border-color #ccc	
			.el-checkbox
				display inline-block
				margin-bottom 5px
			.checkBox
				.el-checkbox
					margin-right :15px;
					width:90px;
					margin-top:15px;      
					.el-checkbox__inner
						width :25px;
						height :25px;
						border: 2px solid #ddd;
						
				.el-checkbox__inner:after
					border: 2px solid #fff;
					border-left: 0;
					border-top: 0;
					height: 25px;
					left: 8px;
					top: 3px;
					width: 15px;
				.el-checkbox+.el-checkbox
					margin-left :0px;	
			.el-radio-group
				display block
			ul
				margin 0
				padding 0
				li
					padding 10px 0 10px
					font-size: 14px;
					margin-left 2%
					span
						color #67C23A
						font-size 14px
	.el-dialog__wrapper
		.el-dialog
			// width 900px
		.el-dialog__header
			text-align center
			padding-top 20px
			.el-dialog__title
				font-size 20px
				font-weight 900
		.el-dialog__body
			padding 15px 30px
			.el-form-item__label
				font-size 16px
				margin-bottom 10px
				display: block
				float: none
				text-align: left
			.el-input__inner
				height 35px
				width 100%		
			.contBoxMain
				margin-bottom 15px
				position relative
				padding-top 1%
				height 30px
				line-height 30px
				input 
					height 30px
					line-height 30px
					width 84.3%
					margin-left 5px
					color #666
					border 1px solid #ccc
					padding-left: 5px
				.el-dialog__headerbtn
					position static	
					line-height 30px
					height 30px
					border 1px solid #ccc
				.closeBtn
					position absolute
					margin-left -27px
					font-size 25px
					margin-top: 0px
					border-left 1px solid #ccc
					padding-top 2px
					height 30px
					width: 3%
	.scoreAll
		height 75px
		background #E6A23C
		width 120px
		position fixed
		right 0
		bottom 9.5%
		text-align center
		color #ffffff
		border-radius: 45px 0 0 45px
		padding-top 10px
		p
			font-size 16px
			margin-bottom 0
			span
				font-size 12px
			.big
				font-weight 900
				font-size 20px
	.success-dialog
		.content
			text-align center
			img
				width 50px
				height 50px
			.name
				color #000
				font-size 16px
				font-weight bold
				margin 10px 0
			.time
				color #909399
				margin 25px 0
			.button-items
				text-align center
				.el-button
					padding 16px 0
					width 40%
					font-size 16px		
</style>