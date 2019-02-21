<!-- 
* name: 考试答题
* author: fjd
* time: 2018-7-31
-->
<template>
    <div class="answerDetail container">
		<!-- 导航 --> 
		<div class="headBox">
			<div class="headBox" style="border-bottom:1px solid #eee;">
				<h3>试卷：{{resData.title}}</h3>
				<p style="font-size:14px;">
					描述：{{resData.description}}
				</p>
			</div>

			<div class="score mt">
				<p>
					<span class="comCol comWeight mr">{{every0*sinData.length+every1*mulData.length}}分</span>
				    <span class="comCol comWeight">{{totalNum}}题</span>
				</p>	
				<p><span class="mr">卷面分数</span> <span>题目总数</span></p>
			</div>	
			<!-- <p>{{tempTT}}</p> -->
		</div>

		<div class="selectBox Single" v-if="sinData.length>0">
			<h3 class="line">{{allQuesNum[0]}}、单选题（每题{{every0}}分，合计{{every0*sinData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in sinData" :key="index">
					<div class="timu" >
						<!-- {{item._id}} -->
						<h4>
							{{index+1}}、{{item.questDesc}}
						</h4>
						<el-radio-group v-for="(itec,ii) in item.itemList" :key="ii" v-model="item.questAnswer">
							<el-radio disabled :label="ii.toString()" :checked="item.answers">{{itec.item}}、{{itec.itemDesc}}</el-radio>
						</el-radio-group>
					</div>
				</div>	
			</div>
		</div>
		<div class="selectBox" v-if="mulData.length>0">
			<h3 class="line">{{allQuesNum[1]}}、多选题下列题目中至少有2个及以上的正确答案，多选少选均不得分（每题{{every1}}分，合计{{every1*mulData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in mulData" :key="index">
					<div class="timu" >
						<!-- {{item._id}} -->
						<h4>
							{{index+1}}、{{item.questDesc}}
						</h4>
						<el-checkbox-group v-for="(itecM,ii) in item.itemList" :key="ii" v-model="itecM.answersl">
							<el-checkbox disabled :label="itecM._id">{{itecM.item}}、{{itecM.itemDesc}} </el-checkbox>
						</el-checkbox-group>
					</div>
				</div>	
			</div>
		</div>

		<div class="selectBox" v-if="comData.length>0">
			<h3 class="line">{{allQuesNum[3]}}、填空题（每题{{every3}}分，合计{{every3*comData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in comData" :key="index">
					<div class="timu line">
						<h4>{{index+1}}.{{item.questDesc}}</h4>
						<div class="continputBox">
							<p v-for="(itec,index) in item.itemList" :key="index" style="color:#67c23a;font-size:14px;"> 
								<span>( {{index+1}} )</span> 
								<span> {{itec.answersl}} </span>
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
		<div class="selectBox" v-if="DisData.length>0">
			<h3 class="line">{{allQuesNum[4]}}、论述题（每题{{every4}}分，合计{{every4*DisData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in DisData" :key=index>
					<div class="timu ">
						<h4>{{index+1}}.{{item.questDesc}}</h4>
						
						<div class="continputBox">
							<div>
								<!-- <span  v-for="(v,i) in item.imgArr" :key="i" style="vertical-align: top;display: inline-block;margin-right:0.5%">
									<img :src="img_api+v" style="width:100px" @click="showImages" />
								</span> -->
							</div>
							<p  style="color:#67c23a;font-size:14px;">
								{{item.questAnswer}}
							</p>
						</div>
					</div>
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
    name:'answerDetail',
    data(){
        return {
			resData:				{
				title:'',
			},
			score:					'',
			totalNum:				'',
			qbId:					'',
			questType:				'',
			// img_api: 				baseUrl.img_api,//路径
			endLastTime:				'',
			usedTime:				0,//做题用的时间 秒数 ， 考试，考核，比赛时，必填
			answerList:				[],
			qcList:					[],
			sinData:				[],//单选数据
			mulData:				[],//多选数据
			JudData:				[],//判断数据
			comData:				[],//填空数据
			DisData:				[],//论述数据
			every0:					2,//每个单选分
			every1:					3,//每个多选分
			every2:					3,//每个判断分
			every3:					3,//每个填选分
			every4:					3,//每个论选分	
			subjectName:			'',	
			sublevel:				'',
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
		async getList(){//获取单选题列表
			const res = await this.$axioss.getTestPaperDetail({id:this.$route.params.id})
			if(res.data.code ===1000){
				let a = res.data.datas.bigList
				this.resData.title = res.data.datas.title
				this.resData.description = res.data.datas.description
				a.forEach(v=>{
					if(v.questKind==0){}
					v.questKind==0?this.sinData.push(v):v.questKind==1?this.mulData.push(v):v.questKind==2?this.comData.push(v):v.questKind==3?this.DisData.push(v):'无解'
				})

				let answers=[]
				this.mulData.forEach((v,i)=>{
					answers = v.questAnswer.split('ψ')
					v.itemList.forEach((vv,ii)=>{
						if(answers[ii].length>0){
							answers[ii]=='true'?vv.answersl=true:vv.answersl=false
						}
					})
				})

				answers=[]
				this.comData.forEach((v,i)=>{
					answers = v.questAnswer.split('ψ')
					v.itemList.forEach((vv,ii)=>{
						vv.answersl=answers[ii]
					})
				})
				
				console.log(this.DisData)
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
			return false
			this.qbId=this.$route.query.qbId

			
			// const res = await this.$axios.getTestPaperDetail(params)
			if(res.code===1100){
				this.dialog(res.message)
			}
			if(res.code ===1000){
				let itemListArr = res.data.qcOptionList
				this.titile= res.data.titile
				this.qbDesc= res.data.qbDesc
				this.startTime= res.data.startTime
				this.endLastTime = res.data.endTime
				
				//考核 和 比赛 2.4
				if(this.questType==2||this.questType==4){
					this.endTime= this.dayjs(res.data.endTime).format('HH:mm')
				}else{
					this.endTime= res.data.endTime
				}
				
				this.subjectName = res.data.subjectName?res.data.subjectName:''
				this.sublevel =res.data.level?res.data.level:''
				this.score= res.data.score
				this.totalNum= res.data.totalNum

				this.qcList = res.data.qcList

				
				// console.log(this.qcList)
				this.qcList.forEach(function(item,index){
					let itemobj = {}
					itemobj.qcId =item.qcId
					itemobj.qcDesc = item.qcDesc
					itemobj.orderNum = item.orderNum
					itemobj.type = item.type
					itemobj.qcPic = item.qcPic
					itemobj.qcScore = item.qcScore
					itemobj.arr=[]
					itemListArr.forEach(function(v,i){
						let vobj = {}
						vobj.itemDesc = v.optionName
						vobj.item = v.optionValue			
						vobj.qcId = v.qcId			
						if(v.qcId==item.qcId){
							itemobj.arr.push(vobj)
						}
					})
					newList.push(itemobj)
				})
				// console.log(newList)
				//给单选多选填空等赋值
				let aa1,aa2,aa3,aa4,aa5
				newList.forEach(function(v,i){
					if(v.type==0){
						sinData.push(v)
						aa1=v.qcScore
					}else if(v.type==1){
						mulData.push(v)
						aa2=v.qcScore
					}else if(v.type==2){
						JudData.push(v)
						aa3=v.qcScore
					}else if(v.type==3){
						comData.push(v)
						aa4=v.qcScore
					}else if(v.type==4){
						DisData.push(v)
						aa5=v.qcScore
					}
					// v.type==0?sinData.push(v):v.type==1?mulData.push(v):v.type==2?JudData.push(v):v.type==3?comData.push(v):v.type==4?DisData.push(v):'无解'
				})
				this.every0 = aa1,this.every1 = aa2,this.every2 = aa3,this.every3 = aa4,this.every4 = aa5
				this.sinData=sinData
				this.mulData=mulData
				this.JudData=JudData
				this.comData=comData
				this.DisData=DisData

				/***************论述题拆分图片*****************/
				let ansData=[]
				this.DisData.forEach(function(vv,ii){
					if(vv.qcPic){
						ansData=vv.qcPic.split("ψ")
						let newAns=[]
						for(let i=0;i<ansData.length;i++){
							if(ansData[i].length>0){
								newAns[i] = ansData[i]
								// console.log(ansData[i])
							}
						}
						vv.imgArr = newAns
					}
				})
				// console.log(this.DisData)
				/*******************论述题end********************/

				let nn=0	
				if(this.sinData.length>0){
					nn++
					this.allQuesNum[0]=nn
				}
				if(this.mulData.length>0){
					nn++
					this.allQuesNum[1]=nn
				}
				if(this.JudData.length>0){
					nn++
					this.allQuesNum[2]=nn
				}
				if(this.comData.length>0){
					nn++
					this.allQuesNum[3]=nn
				}
				if(this.DisData.length>0){
					nn++
					this.allQuesNum[4]=nn
				}

				//计算出时间差
				// console.log(this.countTime(new Date(this.startTime),new Date(this.endLastTime)))
				//考核 和 比赛 2、4
				if(this.questType==2||this.questType==4){
					//执行计时器
					this.countFun(this.countTime(res.data.serverTime,this.endLastTime))
				}

				// console.log(mulData)
				// console.log(JudData)
				// console.log(comData)
				// console.log(DisData)	
			}
		}
	},
	mounted() {
		this.getList()
		$('footer').hide();
	}
}
</script>


<style lang="stylus">
.answerDetail
	.headBox
		background :#fff
		padding 15px 15px 0px 3px
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
			border-bottom 1px solid #ddd
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
					font-size 16px;
					color #303133;
				.el-checkbox
					margin-right :6px;
					margin-top:15px;      
					.el-checkbox__inner
						width :20px;
						height :20px;
						border: 1px solid #ddd;
				.el-checkbox__inner:after
					// border: 1px solid #fff;
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
				border: 1px solid #eee;				
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
</style>
<style>
	.answerDetail .el-radio__input.is-disabled.is-checked .el-radio__inner{
		background: #67C23A;
	}
	.answerDetail .el-radio__input.is-disabled.is-checked .el-radio__inner::after{
		background: #f5f7fa;
	}
	.answerDetail .el-radio__input.is-checked+span.el-radio__label{
		color: #67C23A;
	}

	.answerDetail .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
		border-color: #67C23A;
	}
	.answerDetail .el-checkbox__input.is-checked+span.el-checkbox__label{
		color: #67C23A;
	}
</style>
