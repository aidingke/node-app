<!-- 
* name: 多选题库
* author: fjd
* time: 2018-7-31
-->
<template>
    <div class="Completion">

		<!-- 导航 -->
        <Header title="多选题库"></Header>
        
		<div class="headBox">
			<h3><span class="addTi" @click="openAddInfo">+</span>每道选择题分数为<input v-model="scores" placeholder="0" @keyup=keyUpFun />分</h3>
		</div>
		<div class="group-div">
            <el-input placeholder="题目关键字" prefix-icon="el-icon-search"  class="input-with-select" v-model="keyword">
                <el-button slot="append" @click="onsearchHandle">搜索</el-button>
            </el-input>
		</div>	
		<div class="selectBox">
			<div class="contentBox">
				<h3> 
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选({{checkVal}}/{{allVal}})</el-checkbox>
				</h3>
				<div class="timuBox" v-for="(item,index) in resData" :key="index">
					<div class="timu" >
						<el-checkbox-group v-model="item.checkedSingles" @change="handleCheckedSingleChange">
							<h4>
								<el-checkbox :checked="item.checkedSingles">{{index+1}}、{{item.name}}</el-checkbox>
								<span style="float:right;" @click="deleAnswers(index)"><img src="static/img/dele.png" /></span>
								<span style="float:right;" @click="editAnswers(index)"><img src="static/img/edit.png" /></span>
							</h4>
						</el-checkbox-group>
						<ul>
							<li v-for="(itec,index) in item.arr" :key="index"> （{{index+1}}） <span>{{itec.name}}</span> </li>
						</ul>
					</div>
				</div>	
			</div>
		</div>

		<div class="selectBox">
			<el-row>
				<el-button type="primary">提交</el-button>
			</el-row>	
		</div>

        <el-dialog title="新增填空题" :visible.sync="showAdd">
            <el-form :model="form">
                <el-form-item label="题目描述">
                    <el-input v-model="form.name" maxlength=36 type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入题目描述，最多36个字" >
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
                <el-button type="primary" @click="AddInfo">确 定</el-button>
				<el-button @click="showAdd = false">取 消</el-button>
            </div>
        </el-dialog>

		<el-dialog :visible.sync="dialogTableVisible" center :show-close="false">
			<div class="success-dialog">
				<div class="content">
					<img src="static/img/success.png" />
					<div class="name"> 新增多选题成功</div>
					<div class="time" v-if="sendMsgDisabled">{{time+'s回到详情页'}}></div>
				</div>	
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="openAddInfo">再加一个</el-button>
					<el-button @click="dialogTableVisible = false">知道了</el-button>
				</span>
			</div>	
		</el-dialog>

		<div class="scoreAll">
			<p>
				<span class="big">{{checkScore}}</span>
				/<span>{{this.allScores}}</span>
			</p>
			<p>试卷分值</p>
		</div>
	</div>
</template>

<script>
export default {
	name:'Completion',
    data(){
        return {
			numVal: 				0,//记录新增选择题数量做判断，全部没选就提示 选有且有一个答案
			keyword:                '',
			scores:					10,//输入框，每道题多少分
			checkScore:				0,//记录选中的分数
			allScores:				0,//记录总分数	
			editBtn:				0,
			dataVal:				'',
			checkVal:				0,//记录选择多少个题
			checkAll: 				false,
			isIndeterminate: 		true,
			showAdd:             	false, 
			dialogTableVisible: 	false,//发布成功弹窗				
            time:               	3,   //默认时间3S
            sendMsgDisabled:    	false,
			form: {
				name: '',
				resData:[
					{
						content:''
					}
				]
			},
			resData: [
				{
					"name": "汽车空调的运行原理以及空调结构解析是什么？",
					"arr":[
						{'name':'A.1压缩机'},
						{'name':'B.冷凝器'},
						{'name':'C.车门'},
						{'name':'D.底盘'}
					],
					"checkedSingles":true
				},
				{
					"name": "汽车空调的运行原理是什么？",
					"arr":[
						{'name':'A.2压缩机'},
						{'name':'B.冷凝器'},
						{'name':'C.车门'},
						{'name':'D.底盘'}
					],
					"checkedSingles":true
				},
				{
					"name": "汽车空调结构解析是什么？",
					"arr":[
						{'name':'A.3压缩机'},
						{'name':'B.冷凝器'},
						{'name':'C.车门'},
						{'name':'D.底盘'}
					],
					"checkedSingles":true
				},
				{
					"name": "空调的运行原理是什么？",
					"arr":[
						{'name':'A.4压缩机'},
						{'name':'B.冷凝器'},
						{'name':'C.车门'},
						{'name':'D.底盘'}
					],
					"checkedSingles":true
				},
				{
					"name": "空调结构解析是什么？",
					"arr":[
						{'name':'A.5压缩机'},
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
		//重新给数据赋值空
		openAddInfo(){
			// console.log(this.form)
			// return false
			let a = this.form.resData
			this.form.name = ''

			a.length===4?a.splice(0,3):a.length===5?a.splice(0,4):a.length===6?a.splice(0,5):'what are you doing'
			// if(a.length===4){
			// 	a.splice(0,3)
			// }if(a.length===5){
			// 	a.splice(0,4)
			// }if(a.length===6){
			// 	a.splice(0,5)
			// }
			a[0].content =''
			this.editBtn = -1 //编辑功能关闭
			this.showAdd = true
		},
		//弹出层 用于添加题目
		AddInfo(){
			// console.log(this.form)
			//  return false;			
			let ywkData ={
				name:'',
				arr:[],
				checkedSingles:true
			},cflg,d
			//cflg判定选择题中内容不能为空，d是让写法短一点
			d = this.form.resData
			if(this.form.name.length<5||this.form.name.length>37)
			{
				this.$message.warning('题目描述字数不能少于5个且不能多于36个！')
				return false
			}
			else{
				ywkData.name= this.form.name
				d.forEach(function(items,index){
					// console.log(flags,numVals)
					if(items.content==''){
						cflg=1  //这里return false不管用，弹窗出不来所以得在外层阻止
					}
					else{
						let array={}
						array.name = items.content
						ywkData.arr.push(array)
					}
				})
				if(cflg==1){
					this.$message.warning('选项内容必填哦')
					return false
				}
				// console.log(ywkData)
				//更新和添加数据接口在此判断
				if(this.editBtn!=-1){	
					this.resData.splice(this.editBtn,1,ywkData);
					console.log(this.resData[this.editBtn])
					// return false
				}else{
					this.resData.push(ywkData)
				}
			}
			this.showAdd = false
			this.dialogTableVisible = true
			this.handleCheckedSingleChange()
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
		addAnswers(){
			let basket ={
				title:'',
				content:'',
				answers:false
			}
			//只能添加2项选择
			if(this.form.resData.length<6){
				this.form.resData.push(basket)	
			}
			else{
				// this.$message.error('亲不能再添加了！')
				this.$message({
					showClose: true,
					message: '亲不能再添加了！',
					duration:2000,
					type: 'warning'
				});
				return false
			}
		},
		//删除多选
		deleAnswers(index){
			let a = this.checkVal
			if(this.resData.length<3){
				this.$message.warning('保留前2个选项，不能再删了亲！')
		        return false
			}else{
				this.resData.splice(index,1)
				this.handleCheckedSingleChange()
			}
			
		},
		closeAnswers(index){
			// console.log(item)
			if(index<1){
				this.$message.warning('有且仅保留第一个答案，不能再删了亲！')
		        return false
			}else{
				this.form.resData.splice(index,1)
			}			
		},
		onsearchHandle() {

		},
		handleCheckAllChange(val) {
			// console.log(this.resData)
			let a
			if(this.checkAll){
				this.resData.forEach(function(items,index,array){
					items.checkedSingles=true;
					// console.log(index)
					a = index+1
				})
			}else{
				this.resData.forEach(function(items,index,array){
					items.checkedSingles=false;
				})
				a = 0
			}
			this.checkVal = a
			//分数
			this.checkScore = this.scores*a
		},
		handleCheckedSingleChange(value) {
			let a =true	,b=0 //(用来定义选中多少个的)
			this.resData.forEach(function(items,index,array){
				//点击后
				if(items.checkedSingles){
					b++
				}else{
					a=false
					return false
				}
			})
			this.allVal = this.resData.length
			this.checkVal = b
			this.checkAll=a?true:false
			//分数
			this.checkScore = this.scores*b
			this.allScores = this.scores*this.resData.length
		},
		keyUpFun(){
			this.checkScore = this.scores*this.checkVal
			this.allScores = this.scores*this.resData.length
		}
	},
	created(){
		// console.log(this.resData)
		this.allVal = this.resData.length

		let a =0 //填充题目
		this.resData.forEach(function(items,index){
			if(items.checkedSingles===true){
				a++
				return a
			}
		})
		this.allScores = this.scores*this.allVal
		this.checkScore = this.allScores
		
		this.checkVal = a
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
				width 20%
				height 65px
				font-size 35px
				text-indent 15px
				margin 0 20px 0 20px
			.addTi
				float right 
				font-size 70px
				color #138be7	
		.headBox
			background :#fff;
			margin-top:40px;
			padding 0 30px 50px 30px;
			color:#909399
			h3
				color #333
				font-size:36px;
			.comCol
				color #E7A848
				font-size 28px
			.comWeight
				font-weight:900	
			.score
				border-bottom 2px solid #ddd
				padding-bottom 40px
				span 
					width 180px
					display inline-block		
		.group-div
			padding 30px
			background #efefef
			input 
				width 100%
				height 90px
				font-size 35px
				text-indent 65px
			button
				width 180px
				height 90px
				font-size 35px
				color #fff
				border-radius 0
				background #138be7
			.el-input__icon
			.el-input__prefix
				font-size 50px
				width 70px 
		.selectBox
			margin-top 30px;
			background #fff;
			border-bottom 4px solid #ddd;
			padding 0 30px 0 30px;
			h3
				border-bottom 1px solid #eee 
				.el-checkbox__label
					line-height 70px;
					font-size 36px;
					font-weight 900;
				.el-checkbox__input.is-checked+.el-checkbox__label
					color #67c23a
				.el-checkbox__input.is-checked .el-checkbox__inner
					background  #67c23a
					border-color #67c23a	 	
				.el-checkbox__input.is-focus .el-checkbox__inner
					border-color #ccc
				.el-checkbox__inner:after
					border: 2px solid #fff;
					border-left: 0;
					border-top: 0;
					height: 25px;
					left: 8px;
					top: 3px;
					width: 15px;
			.timuBox
				border-bottom 1px solid #eee 
				h4
					font-weight 300;
					line-height 60px;
					font-size 32px;
					color #303133;
					img
						width 45px
						height 45px
						margin 20px 40px 0 0
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
					margin-bottom 30px
				.checkBox
					.el-checkbox
						margin-right :15px;
						width:190px;
						margin-top:30px;      
						.el-checkbox__inner
							width :45px;
							height :45px;
							border: 3px solid #ddd;
							
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
					li
						padding 20px 0 20px
						margin-left 4%
						span
							color #67C23A
							font-size 26px
	.el-dialog__wrapper
		.el-dialog
			width 65%
		.el-dialog__header
			text-align center
			padding-top 50px
			.el-dialog__title
				font-size 40px
				font-weight 900
		.el-dialog__body
			padding 30px 60px
			.el-form-item__label
				font-size 32px
				margin-bottom 20px
				display: block
				float: none
				text-align: left
			.el-input__inner
				height 70px
				width 100%		
			.contBoxMain
				margin-bottom 35px
				position relative
				padding-top 1%
				height 60px
				line-height 60px
				input 
					height 60px
					line-height 60px
					width 86%
					margin-left 15px
					color #666
					border 1px solid #ccc
					border-radius 15px 0 0 15px
					padding-left: 15px
				.el-dialog__headerbtn
					position static	
					line-height 60px
					height 60px
					border 1px solid #ccc
				.closeBtn
					position absolute
					font-size 50px
					right 3%
					height 60px
					border-left 1px solid #ccc
					padding-top 5px
					width: 7%
	.el-button--primary,.el-button--default
		width 47%
		height 90px
		display inline-block
		border-radius 10px
		margin 20px 0 30px 0  
		span	
			font-size 32px		
	.scoreAll
		height 120px
		background #E6A23C
		width 180px
		position fixed
		right 0
		bottom 3%
		text-align center
		color #ffffff
		border-radius: 90px 0 0 90px
		padding-top 20px
		p
			font-size 30px
			span
				font-size 20px
			.big
				font-weight 900
				font-size 40px
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