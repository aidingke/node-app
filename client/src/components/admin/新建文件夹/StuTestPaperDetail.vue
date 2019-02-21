<!-- 
* name: 考试答题
* author: fjd
* time: 2018-7-31
-->
<template>
    <div class="stuTestPaperDetail container">
		<div class="crumbs">
            当前位置：<span id="current_pos"></span>
        </div>
		<div class="colAdmin">
            <div class="bodyBox content">
				<!-- 导航 --> 
				<div class="headBox">
					<div class="" style="border-bottom:1px solid #eee;">
						<h3>试卷：{{resData.title}}</h3>
						<p style="font-size:12px;">
							描述：{{resData.description}}
						</p>
					</div>

					<div class="score mt">
						<p>
							<span class="comCol comWeight mr">{{every0*sinData.length+every1*mulData.length}}分</span>
						<span class="comCol comWeight">{{totalNum}}题</span>
						</p>	
						<p style="font-size:12px"><span class="mr">卷面分数</span> <span>题目总数</span></p>
					</div>	
					<!-- <p>{{tempTT}}</p> -->
				</div>

				<div style="height:10px;background:#eee;" v-if="sinData.length>0"></div>	
				<div class="selectBox Single" v-if="sinData.length>0">
					<h3 class="line">{{allQuesNum[0]}}、单选题（每题{{every0}}分，合计{{every0*sinData.length}}分）</h3>
					<div class="contentBox">
						<div class="timuBox line" v-for="(item,index) in sinData" :key="index">
							<div class="timu" >
								<!-- {{item._id}} -->
								<h4>
									{{index+1}}、{{item.questDesc}}
								</h4>
								<el-radio-group v-for="(itec,ii) in item.itemList" :key="ii" v-model="item.questAnswer">
									<el-radio :label="ii.toString()" :checked="item.answers">{{itec.item}}、{{itec.itemDesc}}</el-radio>
								</el-radio-group>
							</div>
						</div>	
					</div>
				</div>

				<div style="height:10px;background:#eee;" v-if="mulData.length>0"></div>
				<div class="selectBox" v-if="mulData.length>0">
					<h3 class="line">{{allQuesNum[1]}}、多选题下列题目中至少有2个及以上的正确答案，多选少选均不得分（每题{{every1}}分，合计{{every1*mulData.length}}分）</h3>
					<div class="contentBox ">
						<div class="timuBox line" v-for="(item,index) in mulData" :key="index">
							<div class="timu" >
								<!-- {{item._id}} -->
								<h4>
									{{index+1}}、{{item.questDesc}}
								</h4>
								<el-checkbox-group v-for="(itecM,ii) in item.itemList" :key="ii" v-model="itecM.answersl">
									<el-checkbox :label="itecM._id">{{itecM.item}}、{{itecM.itemDesc}} </el-checkbox>
								</el-checkbox-group>
							</div>
						</div>	
					</div>
				</div>

				<div style="height:10px;background:#eee;" v-if="comData.length>0"></div>
				<div class="selectBox" v-if="comData.length>0">
					<h3 class="line">{{allQuesNum[3]}}、填空题（每题{{every2}}分，合计{{every2*comData.length}}分）</h3>
					<div class="contentBox line">
						<div class="timuBox" v-for="(item,index) in comData" :key="index">
							<div class="timu ">
								<h4>{{index+1}}.{{item.questDesc}}</h4>
								<div class="continputBox">
									<p v-for="(itec,index) in item.itemList" :key="index" style="color:#999;font-size:14px;"> 
										<span>( {{index+1}} )</span> 
										<span> <!--{{itec.answersl}} --><input type="text" v-model="itec.answersl" :onpaste="onpaste()" :oncontextmenu="onpaste()" class="inputTox" placeholder="答案"> </span>
									</p>
									<!-- <p v-if="item.arr<=0"> 
										<span>( 1 )</span> 
										<span> <input type="text" class="inputTox" placeholder="答案"> </span>
									</p> -->
								</div>
							</div>
						</div>	
					</div>
				</div>

				<div style="height:10px;background:#eee;" v-if="DisData.length>0"></div>
				<div class="selectBox" v-if="DisData.length>0">
					<h3 class="line">{{allQuesNum[4]}}、论述题（每题{{every3}}分，合计{{every3*DisData.length}}分）</h3>
					<div class="contentBox">
						<div class="timuBox" v-for="(item,index) in DisData" :key=index>
							<div class="timu ">
								<h4>{{index+1}}.{{item.questDesc}}</h4>
								
								<div class="continputBox">
									<p style="font-size:14px"><textarea class="form-control" :onpaste="onpaste()" :oncontextmenu="onpaste()" v-model="item.answersl" name="description" placeholder="答案" /></p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style="height:70px;"></div>
				<div class="selectBox container" style="position: fixed;bottom: 0;z-index:99;">
					<el-row>
						<el-button type="primary" @click="stuSubmitAnswer">提交</el-button>
					</el-row>	
				</div>
			</div>
		</div>

		<el-dialog
			title="查看图片"
			:visible.sync="imgDialogVisible"
			width="80%"
			center>
			<!-- <span>查看图片</span> -->
			<div>
				<img :src="targetImg" style="width:100%"/>	
			</div>
			<span slot="footer" class="dialog-footer">
				<!-- <el-button @click="imgDialogVisible = false" style="">取 消</el-button> -->
				<el-button type="primary" @click="imgDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
// import baseUrl from '@/apiconfig'
export default {
    name:'stuTestPaperDetail',
    data(){
        return {
			resData:				{
				title:'',
			},
			score:					'',
			totalNum:				'',
			sinData:				[],//单选数据
			mulData:				[],//多选数据
			comData:				[],//填空数据
			DisData:				[],//论述数据
			every0:					0,//每个单选分
			every1:					0,//每个多选分
			every2:					0,//每个填选分
			every3:					0,//每个论选分
			targetImg:				'',	
			allQuesNum:				[],
			imgDialogVisible:		false,
        }
	},
	methods: {
		goBack(){
			this.$router.back(-1)
		},
		showImages(){
			this.targetImg = event.target.getAttribute('src')
			this.imgDialogVisible=true
		},
		onpaste(){
			return 'return false'
		},
		async getList(){//获取单选题列表
			const res = await this.$axioss.getStuPaperDetail({id:this.$route.query.id})
			if(res.data.code ===1000){
				let a = res.data.datas.bigList
				this.resData.title = res.data.datas.title
				this.resData.description = res.data.datas.description
				this.resData.isPublic = res.data.datas.isPublic
				a.forEach(v=>{
					if(v.questKind==0){}
					// v.questKind==0?this.sinData.push(v):v.questKind==1?this.mulData.push(v):v.questKind==2?this.comData.push(v):v.questKind==3?this.DisData.push(v):'无解'
					switch (v.questKind)
					{
						case '0':
							this.sinData.push(v)
							this.every0 = v.scores
							break
						case '1':
							this.mulData.push(v)
							this.every1 = v.scores
							break
						case '2':
							this.comData.push(v)
							this.every2 = v.scores
							break
						case '3':
							this.DisData.push(v)
							this.every3 = v.scores
							break
					}
				})

				this.totalNum = a.length
				let nn=0	
				if(this.sinData){
					nn++
					this.allQuesNum[0]=nn
				}
				if(this.mulData){
					nn++
					this.allQuesNum[1]=nn
				}
				if(this.comData){
					nn++
					this.allQuesNum[3]=nn
				}
				if(this.DisData){
					nn++
					this.allQuesNum[4]=nn
				}
			}
			// console.log(this.sinData)
			return false
		},
		async stuSubmitAnswer(){
			let ywkData ={
				questionItemBankId:this.$route.params.id,
				title:this.resData.title,
				description:this.resData.description,
				isPublic:this.resData.isPublic,
				bigList:[]
			},newList=[]
			let tempSin
			this.sinData.forEach((v,i)=>{
				let itemobj0={}
				itemobj0.answerList={}
				itemobj0.questionItemId = v.questionItemId
				itemobj0.scores = this.every0.toString()
				if(v.questAnswer==undefined){
					tempSin=true
				}else{
					itemobj0.stuQuestAnswer = v.questAnswer.toString()
				}
				itemobj0.answerList.itemList = v.itemList
				itemobj0.answerList.questDesc = v.questDesc
				itemobj0.answerList.questImg = v.questImg
				itemobj0.answerList.questKind = v.questKind
				newList.push(itemobj0)
			})

			this.mulData.forEach((v,i)=>{
				// console.log(v)
				let itemobj1={}
				itemobj1.answerList={}
				itemobj1.stuQuestAnswer=''
				itemobj1.questionItemId = v.questionItemId
				itemobj1.scores = this.every1.toString()
				v.itemList.forEach((val,index)=>{
					let ans=''
					ans = val.answersl
					// console.log(ans)  这里有个坑，一定要定义变量去赋值，不能操作 model
					if(ans==''||ans==undefined){
						ans=false
					}
					itemobj1.stuQuestAnswer+=ans+'ψ'
				})
				itemobj1.stuQuestAnswer=itemobj1.stuQuestAnswer.substring(0,itemobj1.stuQuestAnswer.length-1)
				itemobj1.answerList.itemList = v.itemList
				itemobj1.answerList.questDesc = v.questDesc
				itemobj1.answerList.questImg = v.questImg
				itemobj1.answerList.questKind = v.questKind
				newList.push(itemobj1)
			})

			let tempCom
			this.comData.forEach((v,i)=>{
				// console.log(v)
				let itemobj2={}
				itemobj2.answerList={}
				itemobj2.stuQuestAnswer=''
				itemobj2.questionItemId = v.questionItemId
				itemobj2.scores = this.every2.toString()
				v.itemList.forEach((val,index)=>{
					if(val.answersl){
						itemobj2.stuQuestAnswer+=	val.answersl+'ψ'
					}else{
						tempCom=true
					}
				})
				itemobj2.stuQuestAnswer=itemobj2.stuQuestAnswer.substring(0,itemobj2.stuQuestAnswer.length-1)
				itemobj2.answerList.itemList = v.itemList
				itemobj2.answerList.questDesc = v.questDesc
				itemobj2.answerList.questImg = v.questImg
				itemobj2.answerList.questKind = v.questKind
				newList.push(itemobj2)
			})
			// if(tempCom){
			// 	this.dialog('填空题未填！')
			// 	tempCom=false
			// 	// return false
			// }

			/*****************论述题****************/	
			let tempDis
			this.DisData.forEach((v,i)=>{
				// console.log(v)
				let itemobj3={}
				itemobj3.answerList={}
				itemobj3.stuQuestAnswer=''
				itemobj3.questionItemId =v.questionItemId
				itemobj3.scores = this.every3.toString()
				if(v.answersl){
					itemobj3.stuQuestAnswer =v.answersl	
				}else{
					tempDis=true
				}
				itemobj3.answerList.itemList = v.itemList
				itemobj3.answerList.questDesc = v.questDesc
				itemobj3.answerList.questImg = v.questImg
				itemobj3.answerList.questKind = v.questKind
				newList.push(itemobj3)
			})
			/*
			if(tempDis){
				this.dialog('论述题未填！')
				tempDis=false
				// return false
			}
			*/
			// console.log(this.DisData)			
			/*****************论述题end****************/

			// console.log(newList)
			ywkData.bigList = newList
			// console.log(ywkData)
			// return false

			const res = await this.$axioss.stuSubmitAnswer(ywkData)
			if(res.data.code==1000){
				this.$message({
					message: '你已经交卷',
					type: 'success'
				});
				this.$router.push({path:"/answerPaper",query:{id:res.data.data}});
			}
			return false
		}
	},
	mounted() {
		this.getList()
		$('footer').hide();
	}
}
</script>

<style>

	.stuTestPaperDetail .el-radio__input.is-checked+span.el-radio__label{
		color: #409EFF;
	}
	.stuTestPaperDetail .is-checked .el-checkbox__input.is-checked+span.el-checkbox__label{
		color: #409EFF;
	}
</style>


<style lang="stylus">
.stuTestPaperDetail
	width 70%
	.headBox
		background :#fff
		padding 15px 15px 0px 10px
		color:#909399
		h3
			color #333
			font-size:16px
		.comCol
			color #E7A848
			font-size 16px
		.comWeight
			font-weight:900	
		.score
			padding-bottom 20px
			span 
				width 20%
				display inline-block
	.Single		
		.el-radio-group
			display block		
		.el-radio__inner
			height 20px
			width 20px
			border 1px solid #dcdfe6
		.el-radio__inner:after 
			width 10px
			height 10px
		.el-radio,.el-checkbox
			display inline-block
			margin-bottom 25px
		.el-radio+.el-radio
			margin-left 0				
	.selectBox
		// margin-top 15px
		background #fff
		border-bottom 1px solid #ddd
		padding 0 15px 0 15px
		h3
			line-height 35px
			font-size 16px
			font-weight 900
		.timuBox
			.timu
				margin-bottom 1%
				h4
					// font-weight 300;
					line-height 30px;
					font-size 14px;
					color #303133;
				.el-checkbox
					margin-right :6px;
					margin-top:15px;      
					.el-checkbox__inner
						width :20px;
						height :20px;
						border: 1px solid #ddd;
				.el-checkbox__inner:after
					border: 1px solid #fff;
					border-left: 0;
					border-top: 0;
					height: 10px;
					left: 4px;
					top: 2px;
					width: 6px;
				.el-checkbox+.el-checkbox
					margin-left 0px	
	.continputBox
		p
			margin-bottom 15px;
			.inputTox
				height 35px;
				line-height 35px;
				padding-left 25px;
				width: 79%;
				border: 1px dotted #aaa;				
		textarea
			height: 100px 
			border: 1px solid #ddd
			width: 90%
			margin-top 10px
	.el-button--primary
		width 100%
		height 45px
		display block
		margin 10px auto
	.mt
		margin-top 10px
	.mr
		margin-right 20px
	.pb
		padding-bottom 20px	
	.line
		border-bottom 1px solid #eee 
	.CountFun
		height 120px
		background #E6A23C
		width 180px
		position fixed
		right 0
		top 7%
		text-align center
		color #ffffff
		border-radius 90px 0 0 90px
		z-index 999
		padding-top 20px
		p
			font-size 15px
			span
				font-size 10px
			.big
				font-size 16px	
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
					padding 15px 0
					width 40%
					font-size 15px	
	.el-radio__label
		color #999													
</style>