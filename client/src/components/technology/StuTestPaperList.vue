<template>
    <!-- stu问题列表 -->
    <div class="stuTestPaperList container">
        <div class="bodyBox">
            <ul class="el-row">
                <li class="el-col el-col-6" v-for="(item,index) in resData" :key="index">
                    <router-link :to='"/stuTestPaperDetail/"+item._id'>  
                        <div class="kejianBox">
                            <img src="../../../static/images/st.jpg" alt="" style="width: 100%;margin-top: 15%;">
                        </div>
                        <h5>  </h5>
                        <p><span>{{item.title}}</span> <i>{{item.date.split(" ")[0]}}</i></p>
                    </router-link>   
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: "stuTestPaperList",
  data() {
    return {
        resData:[]
    };
  },
  computed: {
        isLogin() {
            return this.$store.getters.user
        }
    },
  methods:{
    async getList(){
        const res = await this.$axioss.getTestPaperList()
        if(res.data.code==1000){
            this.resData=res.data.data
        }
    }
  },
  created() {
    this.getList()
  }
};
</script>

<style lang="stylus">
.stuTestPaperList
    .bodyBox
        clear both
        padding 30px 0 0 0
        overflow hidden
        .el-row
            padding 0       
            li
                padding 0 10px 40px 
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