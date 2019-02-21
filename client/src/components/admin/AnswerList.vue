<template>
    <div class="AnswerList">
        <div class="crumbs">
            当前位置：<span id="current_pos"></span>
        </div>
        <div class="colAdmin">
            <div class="bodyBox content">
                <ul class="el-row shoCont">
                    <li class="el-col el-col-6" v-for="(item,index) in resData" :key="index">
                        <div @click="goUrl('/AnswerPaper?id='+item._id)">  
                            <div class="kejianBox">
                                <img src="../../../static/images/answers.jpg" alt="" style="width: 100%;margin-top: 15%;">
                            </div>
                            <!-- <h5>  </h5> -->
                            <!-- <p>
                                <span>{{item.title}} </span> 
                                <i> {{item.date.split(" ")[0]}}</i>
                            </p> -->
                            <template v-if="item.title">
                                <p>
                                    <span>{{item.title}}</span> 
                                    <i>{{item.date.split(" ")[0]}}</i>
                                </p>
                            </template>
                            <template v-else>
                                <p>
                                    <span>{{isLogin.name}} 的随机考试</span> 
                                    <i>{{item.date.split(" ")[0]}}</i>
                                </p>
                            </template>
                        </div>   
                    </li>
                </ul>
            </div>
            <div class="answerDetails">
                <iframe  :src="linkUrl"  width="90%" height="100%" style="border:none"></iframe>
            </div>
        </div> 
        <div class="col-md-12 clb">
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="13"
                @current-change="goPage"
                :total="total" v-if="total>0">
            </el-pagination>
      </div>   
    </div>
</template>

<script>
export default {
  name: "AnswerList",
  data() {
    return {
        resData:[],
        linkUrl:'',
        total:0,
        num:1,
        pageNum:13
    };
  },
  computed: {
        isLogin() {
            return this.$store.getters.user
        }
    },
  methods:{
    goUrl(x){
        this.linkUrl = x
    },
    async getList(){
        // const res = await this.$axioss.getAnswerList()
        // if(res.data.code==1000){
        //     this.resData=res.data.data
        // }
    },
    goPage(x){
        // 0,3  /3,3
        let params={}
        params.num = Number((x-1)*this.pageNum)
        params.pageNum =this.pageNum
        this.$axios.post("/api/admin/getAnswerListAll",params)
        .then(res=>{
          if(res.data.code==1000){
            if(Object.keys(res.data.data).length==0){
              this.resData = []
              return false
            }
            this.resData = res.data.data
            this.total = res.data.total
          }
        })
    }
  },
  created() {
    this.goPage()
  }
};
</script>

<style lang="stylus">
.AnswerList
    height 96%
    // width 70%
    .colAdmin
        display flex
        height 96%
        .answerDetails
            flex-grow 1
        .bodyBox
            clear both
            padding 30px 0 0 0
            overflow hidden
            .shoCont
                width 600px
                display flex
                flex-wrap wrap
                li
                    // flex-grow 1
                    flex-basis 150px
            .el-row
                padding 0       
                li
                    padding 0 10px 20px 
                    a:hover
                        text-decoration none
                        font-weight 600
                .kejianBox
                        background #E7F3FC 
                    h5
                        color #666
                        font-size 12px
                        padding 10px 0 10px 0
                        width auto
                        font-weight 300
                        line-height 45px
                    p
                        margin-top 10px
                        clear both
                        text-align left
                        height 45px
                        span
                            color #67C23A
                            font-size 14px
                            font-weight 900
                        i 
                            font-style normal
                            font-size 12px
                            color #999
                            display block
                            // float right 
</style>