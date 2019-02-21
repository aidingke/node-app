<!-- 
* name: 单选题库
* author: fjd
* time: 2018-7-31
-->
<template >
    <div class="Single container">
		<!-- 导航 --> 
		<Header title='单选题库'></Header> 
		<div @click="goBackInfo" style="width: 50px;height: 50px;position:relative;margin-top:-50px;">
		<!-- 做组件返回处理 -->
		</div>	
		<div class="headBox">
			<h1 class="display-4 text-center line pb15">单选题库</h1>
			<h3><span class="addTi" @click="openAddInfo" >+</span>每道单选题分数为<input v-model="scores" v-on:keyup="scoreFun" disabled style="border-bottom:1px dotted #555;" placeholder="" />分</h3>
		</div>
		<div class="headBox">
			<div class="head-title" style="display: inline;">科目：</div>
			<div class="block" style="width:79%;margin-left:1%;display: inline;">
				<el-radio-group v-for="(itec,ii) in SubjectsList" :key="ii" v-model="subjradio1" style="margin-right:8px;overflow: hidden;display:inline-block;">
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
					<el-checkbox-group v-model="item.checkedSingles" @change="handleCheckedSingleChange">
						<div class="timu" >
							<h4>
								<el-checkbox :checked="item.checkedSingles" style="display: inline-block;">{{index+1}}、{{item.questDesc}}</el-checkbox>
								<span class="pabs" style="float: right;top: 31px;right: 0px;width: 21px;" @click="deleAnswers(index)"><img src="static/images/dele.png" /></span>
								<!-- <span style="float:right;" @click="editAnswers(index)"><img src="static/img/edit.png" /></span> -->
								<span class="pabs" style="float:right;color:#bbb;top:0;right:0">{{scores}}分</span>
							</h4>
							
							<el-radio-group v-for="(itec,ii) in item.itemList" :key="ii" v-model="item.questAnswer">
								
								<el-radio :label="ii" disabled >{{itec.item}}、{{itec.itemDesc}}</el-radio>
							</el-radio-group>
						</div>
					</el-checkbox-group>
				</div>	
			</div>
		</div>
		

		<div class="selectBox container" style="position: fixed; bottom: 0px; z-index: 99;padding:15px 0;">
			<el-row>
				<el-button @click="goBackInfo" style="width:47%;display: inline;">返回</el-button>
				<el-button type="primary" @click="submitInfo" style="width:47%;display: inline;">提交</el-button>
			</el-row>	
		</div>

        <el-dialog title="新增单选题" :visible.sync="showAdd">
            <el-form :model="form">
				<!-- <span style="font-size:14px">每题分数：<b style="color:red">{{scores}}</b>分</span> -->
				<div class="head-div">
					<div class="head-title">科目</div>
					<div class="block" style="width:79%;margin-left:1%;">
						<el-radio-group v-for="(itec,ii) in SubjectsList" :key="ii" v-model="subjradio" style="margin-right:8px;overflow: hidden;display:inline-block;">
							<el-radio :label="itec._id">{{itec.subjectName}}</el-radio>
						</el-radio-group>
					</div>
				</div>
                <el-form-item label="题目描述">
                    <el-input v-model="form.name" maxlength=20 type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入题目描述，最多36个字" >
                    </el-input>
                </el-form-item>
				<div>	
					<p style="font-size:18px;">
						<span style="color:#3DA2FE;float:right" @click="addAnswers()">添加</span>
						<span>选项（勾选<b style="font-size:30px;">o</b>默认该选项为正确答案）</span>
					</p>
					<el-radio-group v-model="form.radio">
						<div v-for="(items,indexTit) in form.answers" :key="indexTit">
							<el-radio :label="indexTit">{{indexTit==0?'A':indexTit==1?'B':indexTit==2?'C':indexTit==3?'D':indexTit==4?'E':indexTit==5?'F':''}}</el-radio>
							<input placeholder="答案" v-model="items.content"/>
							<i class="el-dialog__close el-icon el-icon-close closeBtn" @click="closeAnswers(indexTit)"></i>
						</div>
					</el-radio-group>
				</div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="AddInfo" style="width:47%;display:inline">确 定</el-button>
				<el-button @click="showAdd = false" style="width:47%;display: inline;">取 消</el-button>
            </div>
        </el-dialog>
		<el-dialog :visible.sync="dialogTableVisible" center :show-close="false">
			<div class="success-dialog">
				<div class="content">
					<img src="static/images/success.png" />
					<div class="name"> 新增单选题成功</div>
					<div class="time" v-if="sendMsgDisabled">{{time+'s回到详情页'}}></div>
				</div>	
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="openAddInfo" style="width:47%;display:inline">再加一个</el-button>
					<el-button @click="dialogTableVisible = false" style="width:47%;display:inline">知道了</el-button>
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
// import TempHeader from '@/components/technology/TempHeader'
export default {
	name:'Single',
	// components:{
	// 	"TempHeader":TempHeader
	// },
	props:{
		objSin:{
			type:Object
		}
		// ,
		// subId:{
		// 	type:String
		// },
		// levelId:{
		// 	type:String
		// },
		// parentData:{
		// 	type:Array,
		// 	default:[]
		// }
	},
    data(){
        return {
			filterInput:            '',
			allVal:					'',
			scores:					'3',//输入框，每道题多少分
			checkScore:				0,//记录选中的分数
			allScores:				0,//记录总分数	
			editBtn:				0,
			dataVal:				'',
			keyNums:				4,
			checkVal:				0,//记录选择多少个题
			checkAll: 				false,
			questKind:				0,	
			isIndeterminate: 		true,
			showAdd:             	false, 
			dialogTableVisible: 	false,//发布成功弹窗				
			time:               	3,   //默认时间3S
			tagTotal:				'',
			subjradio: 				'',//默认科目0k
			subjradio1:				'',//科目触发事件	
			SubjectsList:			[
				// {
				// 	id:0,
				// 	subjectName:'web前端'
				// }
			],
            sendMsgDisabled:    	false,
			form: {
				token:'',
				subjectId:2,//先写定科目ID 
				radio: '',
				name: '',
				answers:[
					{
						title:'0',
						content:''
					},
					{
						title:'1',
						content:''
					},
					{
						title:'2',
						content:''
					},
					{
						title:'3',
						content:''
					}
				]
			},			
			resData: [
				{
					// "qcDesc": "2汽车空调的运行原理以及空调结构解析是什么？",
					// "arr":[
					// 	{'item':'A','itemDesc':'电风扇','answersl':true},
					// 	{'item':'B','itemDesc':'电时机','answersl':false},
					// 	{'item':'C','itemDesc':'车门','answersl':true},
					// 	{'item':'D','itemDesc':'底盘','answersl':true}
					// ],
					// "answers":1,
					// "checkedSingles":true
				}
			],
			showPaperShow:true
        }
	},
	methods: {
		goBackInfo(){
			let c={}
			c.showPaperShow=true,c.addPaperShow=false
			this.$emit("goBackInfo",c)
		},
		// goBack(){
		// 	this.$emit("goBack",this.showPaperShow)
		// },
		//重新给数据赋值空
		openAddInfo(){
			this.form.name = ''
			this.form.radio = ''
			this.form.answers.forEach(function(v,i){
				v.title=i
				v.content=""
			})
			// console.log(this.form)
			this.editBtn = -1 //编辑功能关闭
			this.showAdd = true
		},
		filterBy(resData,value){
			// console.log(resData)
			// return false
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
			let ywkData ={
				subjectId:this.subjradio,
				questKind:this.questKind,//定0单选
				questDesc:'',
				questAnswer:'',
				itemList:[]
			},cflag,b=[]
			//定义 cflag 单选内容框判断标识，b[] 用于存循环里的数组，赋值出来给 表单数组

			if(this.form.name.length<5||this.form.name.length>37)
			{
				this.dialog('题目描述字数不能少于5个且不能多于36个！')
				return false
			}else if(this.form.radio===''){
				this.dialog('请选个正确答案')
				return false
			}
			else{
				ywkData.questDesc= this.form.name
				this.form.answers.forEach(function(items,index,array){
					if(items.content==''){
						cflag=1 //这里return false不管用，所以得在外层阻止
					}else{
						let e=index,f,itemL={}
						f = (e==0?'A':e==1?'B':e==2?'C':e==3?'D':e==4?'E':e==5?'F':'无解')
						itemL.item = f,itemL.itemDesc = items.content
						b.push(itemL);
					}					
				})
				if(cflag==1){
					this.dialog('选项内容必填')
					return false
				}

				ywkData.itemList=b
				ywkData.questAnswer= this.form.radio //正确答案
				//更新和添加数据接口在此判断
				if(this.editBtn!=-1){	
					this.resData.splice(this.editBtn,1,ywkData);
				}else{
					const res = await this.$axioss.addQuestionItem(ywkData);
					// console.log(res)
					if(res.data.code==1000){
						// this.$message.warning('添加单选成功！')	
						this.showAdd = false
						this.dialogTableVisible = true
						this.handleCheckedSingleChange()
						this.getList()
					}else{
						this.dialog('添加没成功！再试一次')
					}
				}
			}
			return false
		},
		editAnswers(x){
			this.showAdd = true		
			//给内容赋值
			this.form.name = this.resData[x].name
			this.form.radio = this.resData[x].answers
			let editArr = []
			// console.log(this.form)
			this.resData[x].arr.forEach(function(items,index){
				let array = {}
				array.title=index
				array.content=items.substring(2)
				editArr.push(array)
			})
			this.form.answers = editArr
			this.editBtn = x
		},
		addAnswers(){
			let basket ={
				title:'',
				content:''
			},a
			a = this.keyNums
			// basket.title=(a==4?'E':a==5?'F':'')
			basket.title = a
			this.keyNums++
			//只能添加2项选择
			if(this.form.answers.length<6){
				this.form.answers.push(basket)	
			}
			else{
				this.dialog('不能再添加了！')
				return false
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
		//删除单选题
		closeAnswers(index){
			// console.log(this.form)
			if(index<2){
				this.dialog('保留前2个选项，不能再删了！')
		        return false
			}else{
				this.form.radio=''
				// console.log()
				this.form.answers.splice(index,1)
				console.log(this.form)
				// this.form = this.form
			}			
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
			// let a =true	,b=0 //(用来定义选中多少个的)
			// this.resData.forEach(function(items,index,array){
			// 	//点击后
			// 	if(items.checkedSingles){
			// 		b++
			// 	}else{
			// 		a=false
			// 		return false
			// 	}
			// })
			// this.allVal = this.resData.length
			// this.checkVal = b
			// this.checkAll=a?true:false
			//分数
			this.scoreFun()
		},
		//获取 全选 和 点选分数
		scoreFun(){
			let checkS=0,a =0,t=true,sc=Number(this.scores) //总分，选中的分数,选中的题数,t是有一个没选中 全选会变成 false
			// console.log(this.resData)
			this.allVal = this.resData.length
			this.resData.forEach(function(v,i){
				// allScore +=v.score
				//获取选中的分
				if(v.checkedSingles===true){
					checkS+=sc
					a++
				}else{
					//有一个false 全选都是不选中状态
					t=false
				}
				return checkS,a
			})
			// console.log(checkS)
			
			this.allScores = this.allVal*this.scores
			// this.allScores = this.objSin.scoresAll
			this.checkAll=t?true:false
			this.checkVal = a
			this.checkScore=checkS
		},
		async submitSubjesc(){
			let params = {questKind:this.questKind,subject:this.subjradio1}
			// console.log(params)
			const res = await this.$axioss.getQuestionItemList(params)
			if(res.status===404){
				this.dialog('查询出错了')
				return false
			}else if(res.data.code===1000){
				if(Object.keys(res.data).length==0){
					this.resData = []
					return false
				}else{
					this.resData = res.data.newArr.data
					this.resData.forEach((v,i)=>{
						v.questAnswer = Number(v.questAnswer)
					})
					// console.log(this.resData)
				}
			}
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
		async getList(x){//获取单选题列表
			let params = {questKind:this.questKind.toString(),subject:""}
			if(x){
				params.subject = x
			}else{
				params.subject = this.subjradio1.toString()
			}
			// console.log(x+'OK')
			const res = await this.$axioss.getQuestionItemList(params)
			if(res.status===404){
				this.dialog('查询出错了')
				return false
			}else if(res.data.code===1000){
				// if(Object.keys(res.data.data).length==0){
				// 	this.resData = []
				// 	return false
				// }
				
				this.resData = res.data.newArr.data
				this.resData.forEach((v,i)=>{
					v.questAnswer = Number(v.questAnswer)
				})
				if(this.objSin.parentData.length>0){
					let parentData = this.objSin.parentData
					//给输入框的分数赋值
					this.scores = this.objSin.scores
					
					this.resData.forEach(function(v,i){
						v.checkedSingles=false
						parentData.forEach(function(val,index){
							if(v._id==val._id){
								v.checkedSingles=true
							}
						})
					})
					
					// this.allScores = this.objSin.scoresAll
					//返回来的值x不参与累加
				}

				//获取分数 一个总分 一个选中分数
				this.scoreFun()
			}
		},
		//最后提交的时候获取选中的数据
		submitInfo(){
			let a =this.resData,b=[],c={}
			c.tit=this.questKind //传0单选给父组件
			a.forEach(function(v,i){
				// let newobj = {}
				if(v.checkedSingles===true){
					b.push(v)
				}
			})
			c.score = this.checkScore
			c.resData = b
			
			// console.log(this.checkScore+'fen')
			// return false
			// // console.log(b)
			// console.log(c)
			// return false
			//子组件传给父组件值
			this.$emit("getPaperInfo",c);
		}
	},
	mounted(){
		// let _this = this
		//获取菜单列表,然后请求列表
		this.getSubjectMenuList().then((value)=>{
			if(value!==''||value!==null){
				// console.log('go')
				this.getList(value)
			}
		});
		
		$('footer').hide()
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
.Single
	// padding-top 50px
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
		padding 10px
		color:#909399
		h3
			color #333
			font-size:16px;
		.comCol
			color #E7A848
			font-size 16px
		.comWeight
			font-weight:900	
		.score
			border-bottom 2px solid #ddd
			padding-bottom 20px
			span 
				width 100px
				display inline-block		
	.group-div
		padding 10px
		background #efefef
		input 
			width 100%
			height 50px
			font-size 16px
			text-indent 30px
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
				font-size 25px
				width 30px 
	.subBox
		position fixed
		bottom 0
		left 0	
		width 100%
		z-index 999	
	.selectBox
		margin-top 0px
		background #fff
		border-bottom none
		padding 0 10px 0 10px
		.contentBox
			margin-bottom 15%
			overflow: hidden
			.noInfo
				position relative
				height 900px
				.default
					width 200px
					position absolute
					left 50%
					top 25%
					transform: translate(-50%,-50%)
					img
						max-width 100%
					.not-class
						font-size 20px
						text-align center
						color #9b9b9b
						margin 10px 0 0 0
					.add-text
						font-size 16px
						text-align center
						color #a5a5a5
						margin 15px 0 25px 0
					.el-button
						width 100%
						padding 15px 10px
						font-size 16px
			.el-checkbox__inner
				width 23px;
				height 23px;			
			h3
				border-bottom 1px solid #eee 
			.el-checkbox__label
				line-height 25px;
				font-size 16px;
				font-weight 900;
			.el-checkbox__input.is-checked+.el-checkbox__label
				color #67c23a
			.el-checkbox__input.is-checked .el-checkbox__inner
				background  #67c23a
				border-color #67c23a	 	
			.el-checkbox__input.is-focus .el-checkbox__inner
				border-color #ccc
			.el-checkbox__inner:after
				border: 1px solid #fff;
				border-left: 0;
				border-top: 0;
				height: 13px;
				left: 7px;
				top: 2px;
				width: 5px;
		.timuBox
			border-bottom 1px solid #eee 
			h4
				// font-weight 300;
				line-height 30px;
				font-size 16px;
				color #303133
				position relative
				.el-checkbox__label
					font-size 16px
					// font-weight 300
				img
					width 20px
					height 20px
					margin -5px 20px 0 0
			.el-checkbox__input.is-checked+.el-checkbox__label
				color #666
			.el-checkbox__input.is-checked .el-checkbox__inner
				background  #666
				border-color #666	
				width 23px
				height 23px
			.el-radio__inner
				height 20px
				width 20px
				border 1px solid #dcdfe6
			.el-radio__input.is-checked .el-radio__inner
				background 	#eee
			.el-radio__input.is-checked+.el-radio__label
				color #67C23A
			.el-radio__inner:after 
				width 8px
				height 8px
				background #aaa
			.el-checkbox__input
				vertical-align: top;	
			.el-radio,.el-checkbox
				display inline-block
				margin-bottom 25px
				word-wrap break-word
				width 93%
			.el-radio+.el-radio
				margin-left 0
			.checkBox
				.el-checkbox
					margin-right :5px;
					width:100px;
					margin-top:15px;      
					.el-checkbox__inner
						width :35px;
						height :35px;
						border: 1px solid #ddd;
						
				.el-checkbox__inner:after
					border: 1px solid #fff;
					border-left: 0;
					border-top: 0;
					height: 15px;
					left: 4px;
					top: 2px;
					width: 10px;
				.el-checkbox+.el-checkbox
					margin-left :0px;	
			.el-radio-group
				display block			
	.continputBox
		p
			margin-bottom 30px;
			.inputTox
				height 70px;
				line-height 70px;
				padding-left 50px;
				width: 79%;
				border: 2px solid #eee;				
		textarea
			height: 200px 
			border: 1px solid #ddd
			width: 90%
			margin-top 20px
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
			padding 15px 20px
			.el-form-item__label
				font-size 16px
				margin-bottom 20px
				display: block
				float: none
				text-align: left
			.el-input__inner
				height 70px
				width 100%	
			.el-radio__inner
				height 20px
				width 20px
				border 1px solid #dcdfe6
			.el-radio__inner:after 
				width 10px
				height 10px
			.el-radio,.el-checkbox
				display inline
				margin-bottom 50px
			.el-radio+.el-radio
				margin-left 0		
			.el-radio-group
				display block
				div
					margin-bottom 35px
					position relative
					padding-top 1%
					height 30px
					line-height 30px
					input 
						height 30px
						line-height 30px
						width 75%
						margin-left 15px
						font-size 16px
						color #666
						border 1px solid #ccc
						padding-left: 15px
					.el-dialog__headerbtn
						position static	
						line-height 30px
						height 30px
						border 1px solid #ccc
					.closeBtn
						position absolute
						margin-left -27px
						font-size 25px
						margin-top 1px
						border-left 1px solid #ccc
						padding-top 5px
						height 30px
						width: 3%	
	.scoreAll
		height 70px
		background #E6A23C
		width 90px
		position fixed
		right 0
		bottom 10%
		text-align center
		color #ffffff
		border-radius: 90px 0 0 90px
		padding-top 10px
		p
			font-size 16px
			margin-bottom 0
			span
				font-size 10px
			.big
				font-weight 900
				font-size 20px
	.success-dialog
		.content
			text-align center
			img
				width 100px
				height 100px
			.name
				color #000
				font-size 36px
				font-weight bold
				margin 20px 0
			.time
				color #909399
				margin 50px 0
			.button-items
				text-align center
				.el-button
					padding 30px 0
					width 40%
					font-size 30px		
</style>