<template>
<div>
  <div class="card card-body container" v-for="(item, index) in resData" :key="index" style="padding:20px;margin-top:10px;">
    <h3 class="cent Mytitle"><a :href='"/artdetail?id="+item._id' style="text-align:left;" target="_blank"> {{item.title}}</a></h3>
    <div class="conts " v-html="item.description">
    </div> 
    <div class="descImg" style="padding-bottom:8px;">
      <span v-for="(v,i) in item.imgs" :key="i" class="okw">
        <img :src="v.imgs"/>
      </span>
    </div>
    <p class="f12">{{item.date}}</p>
    <p>
      <span style="float:right;">分类：{{item.subjectId.subjectName}}</span>
      <span><img :src="'/static/avatar/'+item.user.avatar" style="width: 2rem;border-radius: 20px;"/>{{item.user.name}} </span>
    </p>
    <div class="moreBtn">
      <!-- <a :href='"/artdetail?id="+item._id' class="btn" target="_blank" style="color: #409eff;background: #ecf5ff;border-color: #b3d8ff;">查看详情</a> -->
      <a :href='"/artedit?id="+item._id' class="btn" target="_blank" style="color: #67c23a;background: #f0f9eb;border-color: #c2e7b0;">编辑</a>
      <button @click="deleteBtn(item._id)" class="btn" style="color: #909399;background: #fff;border-color: #d3d4d6;">删除</button>
      
        <!-- <template v-if="item.checkT">
          <a @click="checkFun(item._id)" style="color:red"> 已开 </a>
        </template>
        <template v-if="!item.checkT">
          <a @click="checkFun(item._id)" style="color:#999"> 已关 </a>
        </template> -->

        <el-switch @change="checkFun(item._id)"
          v-model="item.checkT"
          active-text="共享文章"
          inactive-text="私有文章">
        </el-switch>
    </div>
  </div>
  <div class="container">
    <div class="clb">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="13"
          @current-change="goPage"
          :total="total" v-if="total>0">
      </el-pagination>
    </div>  
    <p class="container"> 
        <!-- <a class="btn-default btn" href="javascript:history.go(-1)">返回</a> -->
        <a href="/artadd" class="btn-primary btn">添加文章</a>
    </p>
  </div>
</div>  
</template>

<script>

export default {
  name: "IdeasList",
  data() {
    return {
      resData:[],
      errors: "",
      total:0,
      num:1,
      pageNum:13,
    };
  },
  mounted(){
    this.goPage(this.num)
  },
  created() {
    // this.getList();
  },
  methods: {
    goPage(x){
      // 0,3  /3,3
      let params={}
      params.num = Number((x-1)*this.pageNum)
      params.pageNum =this.pageNum
      this.$axios.post("/api/ideas/list",params)
        .then(res=>{
          if(res.data.code==1000){
            if(Object.keys(res.data.data).length==0){
              this.resData = []
              return false
            }
            var newData = [];
            res.data.data.forEach((v,i)=>{
                var newObj = v;
                var imgsArr = [];
                v.imgs.forEach((vv,ii)=>{
                  if(vv.length>10){
                    var imgurl = {};
                    imgurl.imgs = vv;
                    
                    var img = new Image();
                    img.src=vv;
                    img.onload = function (argument) {
                      // console.log(this.width +'----------'+this.height)  //这里就是上传图片的宽和高了
                      imgurl.width = this.width
                    } 
                    imgsArr.push(imgurl);
                  }
                })
                newObj.imgs = imgsArr;
                newData.push(newObj);
            })
            this.resData = newData
            this.total = res.data.total
          }
        })
    },
    // getList(){
    //   this.$axios("/api/ideas/list")
    //     .then(res=>{
    //       var _this = this 
    //       res.data.forEach((v,i)=>{
    //         v.description = _this.repImgInfos(v.description)
    //       }) 
          
    //       var newData = [];
    //       res.data.forEach((v,i)=>{
    //           var newObj = v;
    //           var imgsArr = [];
    //           v.imgs.forEach((vv,ii)=>{
    //             if(vv.length>10){
    //               var imgurl = {};
    //               imgurl.imgs = vv;
                  
    //               var img = new Image();
    //               img.src=vv;
    //               img.onload = function (argument) {
    //                 // console.log(this.width +'----------'+this.height)  //这里就是上传图片的宽和高了
    //                 imgurl.width = this.width
    //               } 
    //               imgsArr.push(imgurl);
    //             }
    //           })
    //           newObj.imgs = imgsArr;
    //           newData.push(newObj);
    //       })

    //       this.resData = newData;

    //       console.log(this.resData)
    //     })
    // },
    deleteBtn(x){
      this.$confirm("确定要删除此数据吗?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定"
      })
      .then(() => {
        this.$axios.delete(`/api/ideas/delete/${x}`)
        .then(res=>{
          this.$message({
            showClose: true,
            message: res.data.msg,
            duration:1500,
            type: 'success'
          });
          // this.getList();
          this.goPage(1)
        })
        .catch(error =>{
          this.error = error.response.data.msg;
          console.log(this.error)
          this.$message.error('错了哦，请再试一次');
        })
      })
      .catch(() => {
          this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    checkFun(x){
      this.$axios
        .post(`/api/ideas/checkT/${x}`)
        .then(res => {
          // console.log(res)
          // alert(res.data.success_msg)
          this.$message({
            showClose: true,
            message: res.data.success_msg,
            duration:1500,
            type: 'success'
          });
          // this.getList();
        })
        .catch(error => {
          this.error = error.response.data.msg;
          console.log(this.error)
          this.$message.error('错了哦，请再试一次');
        });
    }
  }
};
</script>
<style scoped>
  .descImg .okw{
    display: inline-block;
    width: 150px;
    height: 150px;
    overflow: hidden;
  }
  .descImg .okw img{
    width: 100%;
  }
  .f12{font-size: 12px;}
  .card{color:#888}
  .Mytitle a{
    text-decoration:none;
    color: #555;
  }
  .Mytitle a:hover {
    color: #FFB600;
  }
</style>


















