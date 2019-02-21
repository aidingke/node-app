<!-- 
* name: 考试答题
* author: fjd
* time: 2018-7-31
-->
<template>
    <div class="AnswerPaper container">
		<div class="headBox">
			<h1 class="display-4 text-center">试卷得分 {{totalNum}}</h1>
			<div id="myChart" :style="{width: '300px', height: '300px'}"></div>
			<h3>标题：{{titile}}</h3>
			<p style="font-size:12px;">描述：{{qbDesc}}</p>

			<p class="comCol mt line" style="font-size:12px;padding-bottom:10px;">考试时间：{{tTime}}</p>
			<div class="score mt">
				<p>
					<span class="comCol comWeight mr">{{allTalNum}}</span>
					<span class="comCol comWeight">{{sinData.length+mulData.length}}</span>
					<span class="comCol comWeight">{{totalNum}}</span>
				</p>	
				<p><span class="mr">卷面分数</span> <span>题目总数</span> <span style="display:inline;">理论得分(不包括填空 和 论述)</span></p>
				<p style="font-size:12px;">备注&nbsp;&nbsp;&nbsp;&nbsp;
					<span style="display:inline;margin-right:10px;"><i style="display: inline-block;width: 15px;height: 15px;background: #67C23A;margin: 0 3px -3px 0;"></i>绿色表示为正确答案</span> 
					<span style="display:inline;"><i style="display: inline-block;width: 15px;height: 15px;background: #F56C6C;margin: 0 3px -3px 0;"></i>红色字体表示你的答案或错误答案</span>
				</p>
			</div>
		</div>

		<div style="height:10px;background:#eee;" v-if="sinData.length>0"></div>
		<div class="selectBox Single" v-if="sinData.length>0">
			<h3 class="line">{{allQuesNum[0]}}、单选题（每题{{every0}}分，合计{{every0*sinData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in sinData" :key="index">
					<div class="timu" v-if="item.answerList">
						<h4>
							<span style="float:right;color:#e7a848;margin-right:1%">{{item.qcScore}}分</span>
							{{index+1}}、{{item.answerList.questDesc}}
						</h4>
						<el-radio-group v-for="(itec,ii) in item.answerList.itemList" :key="ii" v-model="item.answerList.questAnswer">
							<el-radio disabled :label="ii.toString()" :class="{'active':item.stuQuestAnswer==ii}" >{{itec.item}}、{{itec.itemDesc}}</el-radio>
						</el-radio-group>
					</div>
				</div>	
			</div>
		</div>

		<div style="height:10px;background:#eee;" v-if="mulData.length>0"></div>
		<div class="selectBox" v-if="mulData.length>0">
			<h3 class="line">{{allQuesNum[1]}}、多选题下列题目中至少有1个及以上的正确答案，多选少选均不得分（每题{{every1}}分，合计{{every1*mulData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in mulData" :key="index">
					<div class="timu" >
						<h4>
							<span style="float:right;color:#e7a848;margin-right:1%">{{item.qcScore}}分</span>
							{{index+1}}、{{item.answerList.questDesc}}
						</h4>
						<p>你的答案是：{{item.stuQuestAnswer}}</p>
						<el-checkbox-group v-for="(itecM,ii) in item.answerList.itemList" :key="ii" v-model="itecM.qcAnswer">
							<!-- 答案相等给类 -->
							<el-checkbox disabled :label="itecM._id" :class="{'active':currentIndex(itecM.qcAnswer,itecM.qcStAnswer)===true}">{{itecM.item}}、{{itecM.itemDesc}} </el-checkbox>
						</el-checkbox-group>
					</div>
				</div>	
			</div>
		</div>

		<div style="height:10px;background:#eee;" v-if="comData.length>0"></div>
		<div class="selectBox" v-if="comData.length>0">
			<h3 class="line">{{allQuesNum[3]}}、填空题（每题{{every2}}分，合计{{every2*comData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in comData" :key="index">
					<div class="timu line">
						<h4>
							{{index+1}}.{{item.answerList.questDesc}}
						</h4>
						<div class="continputBox">
							<p v-for="(itec,index) in item.answerList.itemList" :key="index"> 
								<template v-if="itec.answersl">
									<span>( {{index+1}} )</span> 
									<span class="trueColor" style="color:#999;font-size:12px;"> 
										<b style="color:#000;font-size:14px;">{{itec.stuAnswer}}</b> 
										<i style="color:#67c23a;font-style:normal">（正确答案：{{itec.answersl}}）</i> 
									</span>
								</template>
							</p>
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
						<h4>{{index+1}}.{{item.answerList.questDesc}}</h4>
						
						<div class="continputBox">
							<p style="font-size:14px"><span style="color:#000">答案：</span>{{item.stuQuestAnswer}}</p>
							<p style="font-size:14px;color:#999">
								<span><i style="color:#67c23a;font-style:normal">（正确答案：{{item.answerList.questAnswer}}）</i></span></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')


export default {
    name:'AnswerPaper',
    data(){
        return {
			titile:					'',
			qbDesc:					'',
			score:					'',
			allTalNum:				'',
			totalNum:				0,//答对的分数
			tTime:					'',
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
			pieArr:{
				name:'',
				arr:[
					{
						score:10
					},
					{
						score:90
					}
				]
			},
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
		//搞局的方法 
		currentIndex(x,y){
			//学生答案为true就为 高亮,x正确，y学生
			// if(x==y){
			// 	return false
			// }else if(x!=y){
			// 	if(y==false){
			// 		return true
			// 	}else if(y==true){
			// 		return true
			// 	}
			// }
			// itecM.qcAnswer==itecM.qcStAnswer==true
			// if(y==true && x==true){
			// 	return false
			// }
			if(y==true){
				return true
			}
		},
		async getList(){//获取单选题列表
		// console.log(this.$route.query.id)
			let params = {id:this.$route.query.id},answers=[],stuAnswers=[]
			const res = await this.$axioss.getAnswerPaper(params)
			if(res.data.code ===1000){
				this.titile = res.data.data[0].title
				this.qbDesc = res.data.data[0].description
				this.tTime =  res.data.data[0].date
				this.sinData=res.data.sinData
				this.mulData=res.data.mulData
				
				this.comData=res.data.comData
				this.DisData=res.data.DisData
				// this.totalNum = this.sinData.length+this.mulData.length

				//赋值分数
				this.sinData.forEach(v=>{
					this.every0 = v.scores
					if(v.stuQuestAnswer==v.answerList.questAnswer){
						v.qcScore = v.scores
						this.totalNum += Number(v.qcScore)
					}else if(v.stuQuestAnswer!==v.answerList.questAnswer){
						v.qcScore=0
					}
				})	

				
				this.mulData.forEach((vv,ii)=>{
					this.every1 = vv.scores
					let tAns = vv.answerList.questAnswer,tList=vv.answerList.itemList,sAns = vv.stuQuestAnswer
					answers=tAns.split("ψ"),stuAnswers=sAns.split("ψ")

					//答案标示
					let tempScore=true
					tList.forEach((v,i)=>{
						if(answers[i].length>0){
							answers[i]=='true'?v.qcAnswer=true:v.qcAnswer=false
						}
						if(stuAnswers[i].length>0){
							stuAnswers[i]=='true'?v.qcStAnswer=true:v.qcStAnswer=false
						}
						if(stuAnswers[i]!==answers[i]){
							tempScore = false
						}
					})
					if(tempScore){
						vv.qcScore = vv.scores
						this.totalNum += Number(vv.qcScore)
					}else{
						vv.qcScore = 0
					}
					//烧烤叉替换
					var reg=new RegExp("ψ",'g'),regt=new RegExp("true",'g'),regf=new RegExp("false",'g')
					vv.stuQuestAnswer=vv.stuQuestAnswer.replace(reg, "，")
					vv.stuQuestAnswer=vv.stuQuestAnswer.replace(regt, "√")
					vv.stuQuestAnswer=vv.stuQuestAnswer.replace(regf, "×")
					
					// vv.stuQuestAnswer.replace(/ψ/g, ",")
					// console.log(vv.stuQuestAnswer)
				})
				this.allTalNum = this.every0*this.sinData.length+this.every1*this.mulData.length
				let ac = parseInt((this.totalNum/this.allTalNum)*100),act='你的考试成绩'
				// console.log(ac)
				// if(ac<40){
				// 	act = '弱爆了'
				// }else if(40<ac<60){
				// 	act = '太菜了'
				// }else if(60<ac<90){
				// 	act = '年薪过万'
				// }else if(90<ac<=100){
				// 	act = '大神'
				// }
				// console.log(act)
				this.pieArr={
					name:act,
					arr:[{score:(100-ac)},{score:ac}]
				}
				// console.log(ac)
				//饼图
				this.drawPie(this.pieArr)

				answers=[],stuAnswers=[]
				this.comData.forEach((vv,ii)=>{
					this.every2 = vv.scores
					//吧答案拆分
					answers=vv.answerList.questAnswer.split("ψ"),stuAnswers=vv.stuQuestAnswer.split("ψ")
					if(answers.length>0){
						answers.forEach(function(v,i){
							if(v.length>0){
								let vobj = {}
								if(stuAnswers.length>0){
									// vv.arrSt=[]
									stuAnswers.forEach(function(vv,ii){
										if(v.length>0){
											if(i==ii){
												vobj.stuAnswer=vv
											}
										}
									})
								}
								vobj.answersl = v
								vv.answerList.itemList.push(vobj)
							}
						})
					}
				})

				this.DisData.forEach((vv,ii)=>{
					this.every3 = vv.scores
				})

				let nn=0	
				if(this.sinData){
					nn++,this.allQuesNum[0]=nn
				}
				if(this.mulData){
					nn++,this.allQuesNum[1]=nn
				}
				if(this.comData){
					nn++,this.allQuesNum[3]=nn
				}
				if(this.DisData){
					nn++,this.allQuesNum[4]=nn
				}
			}
			return false
		},
		drawPie(x) {
			// 基于准备好的dom，初始化echarts实例
			let myChart = echarts.init(document.getElementById('myChart'))
			let option ={
				title: { text: x.name },
				tooltip: {
					trigger: 'item',
        			// formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					bottom: 10,
					left: 'center',
					data: ['错误', '正确']
				},
				series : [
					{
						type: 'pie',
						radius : '65%',
						center: ['50%', '50%'],
						selectedMode: 'single',
						data:[
							{
								value:x.arr[0].score,
								name: '错误',
								itemStyle: {
									color: '#c23531'
								}
							},
							{
								value:x.arr[1].score, 
								name: '正确',
								itemStyle: {
									color: '#91C7AE'
								}
							}
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
			}
			// 绘制图表
			myChart.setOption(option)
		}
	},
	mounted() {
		this.getList()
		// this.drawPie()
		$('footer').hide()
	}
}
</script>


<style lang="stylus">
.AnswerPaper
	// background #eee
	.headBox
		background #fff
		margin-top 20px
		padding 0 15px 25px 15px
		color #909399
		position relative
		.scoresAll
			height 80px
			width 80px
			position absolute
			right 7%
			top 5%
			text-align center
			color #E6A23C
			border-radius 200px
			border 1px solid #E6A23C
			.sc
				font-size 30px
				margin-top 2%
				margin-bottom -5%
				display block
		h3
			color #333
			font-size:18px;
		.comCol
			color #E7A848
			font-size 16px
		.comWeight
			font-weight:900	
		.score
			border-bottom 1px solid #ddd
			padding-bottom 20px
			span 
				width 90px
				display inline-block
	.Single		
		.el-radio-group
			display block
			.active
				color red
				.el-radio__label
					color red
			.is-checked
				.el-radio__inner	
					background-color #67c23a	
				.el-radio__label
					color #67c23a		
		.el-radio__inner
			height 20px
			width 20px
			border 1px solid #dcdfe6
		.el-radio__inner:after 
			width 7px
			height 7px
		.el-radio,.el-checkbox
			display inline-block
			margin-bottom 25px
		.el-radio+.el-radio
			margin-left 0				
	.selectBox
		margin-top 15px
		background #fff
		border-bottom 1px solid #ddd
		padding 0 15px 0 15px
		h3
			line-height 30px
			font-size 18px
			font-weight 900
		.timuBox
			.timu
				margin-bottom 1%
				h4
					line-height 30px;
					font-size 16px;
					color #303133;
				.is-checked
					.el-checkbox__label
						color #67c23a	
				.active
					color red
					.el-checkbox__label
						color red		
				.el-checkbox
					margin-right :7px;
					margin-top:15px
					.is-checked
						.el-checkbox__label
							color #67c23a
						.el-checkbox__inner
							width 20px
							height 20px
							border 1px solid #ddd
							background-color #67c23a
					.el-checkbox__inner
						width 20px
						height 20px
						border 1px solid #ddd
				.el-checkbox__inner:after
					border: 1px solid #fff;
					border-left: 0;
					border-top: 0;
					height: 7px;
					left: 4px;
					top: 3px;
					width: 7px;
				.el-checkbox+.el-checkbox
					margin-left 0px	
	.addScore
		margin: 0px auto
		text-align: center
		background: #fff
		margin-top: 10px
		padding: 2%
	.continputBox
		margin-top 2%
		p
			margin-bottom 15px;
			.inputTox
				height 30px;
				line-height 30px;
				padding-left 25px;
				width: 79%;
				border: 1px solid #eee;				
		textarea
			height: 100px 
			border: 1px solid #ddd
			width: 90%
			margin-top 10px	
	.mt
		margin-top 10px
	.mr
		margin-right 10px
	.pb
		padding-bottom 10px	
	.line
		border-bottom 1px solid #eee 	
	.active
		color red									
</style>