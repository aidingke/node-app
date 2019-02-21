<template>
    <div class="TopicLis container">
      <div class="bk15"></div>
      <div class="artlist">
        <div class="colauto mr8">
          <div class="colAdmin">
            <div class="content margin_tag" style="position:relative; overflow:hidden">
              <div class="right_info">
                	<ul class="el-row shoCont">
                    <li v-for="(item,index) in resData" :key="index">
                        <router-link :to='"/topicDetail/"+item._id'>
                          <div class="addTop">
                            <div class="kejianBox">
                              <span v-for="(v,i) in item.imgs" :key="i">   
                                <img alt="" :src="v" style="width:100%;"/>
                              </span>
                            </div>
                            <p>
                              <span>{{item.topicName}}</span> 
                              <i>{{item.date.split(" ")[0]}}</i>
                            </p>
                          </div>
                        </router-link>  
                    </li>
                </ul>		
              </div>

            </div>
          </div>
      </div>
      <!-- <div class="col-md-12 clb">
          <el-pagination
              background
              layout="prev, pager, next"
              :page-size="13"
              @current-change="goPage"
              :total="total" v-if="total>0">
          </el-pagination>
      </div> -->
    </div>

  </div>  
</template>

<script>
export default {
  name: "TopicLis",
  data() {
    return {
      resData:[],
      errors: "",
      imgs: [],
      topicName:'',
      total:0,
      num:1,
      pageNum:13
    }
  },
  mounted() {
    this.goPage(this.num)
    $('footer').show()
  },
  methods: {
    goPage(x){
      // 0,3  /3,3
      let params={}
      params.num = Number((x-1)*this.pageNum)
      params.pageNum =this.pageNum
      this.$axios.post("/api/admin/getTopicList",params)
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
  }
};
</script>
<style scoped>
.TopicLis{
  min-height: 700px;
}
.TopicLis .pagination {
  text-align: right;
  margin-top: 10px;
}

.shoCont{
  display: flex;
  width: 970px;
  flex-wrap: wrap;
  padding: 0;
}
.shoCont li{
  flex-basis:150px;
  /* text-align: center; */
  padding: 0 10px 20px;
}
.shoCont li a:hover{
  text-decoration:none;
}
.shoCont .kejianBox {
  width: 200px;
  height: 200px;
  overflow: hidden;
  box-shadow: 1px 1px 3px #ccc;
}

.shoCont p span {
    color: #67c23a;
    font-size: 14px;
    font-weight: 900;
}
.shoCont p i {
    font-style: normal;
    font-size: 12px;
    color: #999;
    display: block;
}
</style>