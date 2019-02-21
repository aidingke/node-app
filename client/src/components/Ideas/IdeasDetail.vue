<template>
<div>
  <div class="card card-body container ideaDetail">
    <h1 class="cent"> {{resData.title}}</h1>
    <div class="article-meta">
      <span class="item">{{resData.date}}</span>
      <span class="item" v-if="resData.subjectId">分类：{{resData.subjectId.subjectName}}</span>
      <span class="item">发布者：{{uname}}</span>
    </div>
    <div class="conts hid" v-html="resData.description">
      <!-- {{resData.description}} -->
    </div> 
    <!-- {{resData}} -->
    <div class="descImg hid">
      <span v-for="(v,i) in resData.imgs" :key="i" class="okw">
        <img :src="v"/>
      </span>
    </div>
    <!-- <p style="height:50px;background:#eee;text-align:center;line-height:50px;"> -------------------------------详情开始------------------------------- </p> -->
    <div class="conts " id="details" v-html="resData.details">
      <!-- 详情：{{resData.details}} -->
    </div> 
    <p>{{uname}}</p>
    <p>{{resData.date}}</p>
    <div> 
      <a class="btn-primary btn" style="color:#fff;" @click="goBack">返回</a>
      <router-link :to='"/artedit?id="+resData._id' class="btn btn-success" v-if="userId==u_id">编辑</router-link>
    </div>
  </div>
  
</div>  
</template>

<script>

export default {
  name: "IdeasDetail",
  data() {
    return {
      resData:{},
      errors: "",
      userId:'',
      u_id:'',
      uname:''
    };
  },

  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.getProfileData();
      
  //   });
  // },
  created() {
    this.getInfo(this.getUrl('id'))
    this.userId = sessionStorage.getItem("userId")
  },
  mounted(){
    $('footer').show()
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    getInfo(x){
      this.$axios("/api/ideas/details/"+x)
        .then(res=>{
          // console.log(res.data)
          this.resData = res.data
          document.title=this.resData.title
          this.uname = res.data.user.name
          this.u_id = res.data.user._id
          this.resData.description = this.repImgInfos(this.resData.description)
          // this.resData.details = this.resData.details
          // console.log(this.resData.details)
          // this.resData.details = this.repImgInfos(this.resData.details)
          // this.resData.description = this.resData.description
          
        })
    }
  }
};
</script>
<style>
.ideaDetail .btn-primary{
  background: #3DA2FE;
  border: none;
}
.ideaDetail .btn-primary:hover{
  background: #007bff;
}
.ideaDetail{
  padding: 25px;
  box-shadow: 0px 0px 4px #ccc;
  margin-top:15px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
}
  .cent{
    font-size: 26px;
    text-align: center;
    font-weight: 900;
    padding: 15px 5px;
  }
  @media (max-width: 768px) {
    .cent{
      font-size: 18px;
      padding: 15px 5px 8px;
    }   
  }
  .conts{
    font-size: 16px;
  }
  .conts img{
    width: auto;
  }
  .descImg .okw{
    display: inline-block;
    width: 150px;
    height: 150px;
    overflow: hidden;
  }
  .descImg .okw img{
    width: 100%;
  }
  .article-meta {
    font-size: 12px;
    color: #999;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    margin-bottom: 30px;
  }
  .article-meta .item {
    margin-right: 20px;
  }

</style>


















