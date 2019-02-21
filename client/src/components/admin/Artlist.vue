<template>
    <div class="fillcontain" id="content">
      <div class="artlist">
        <div class="colauto mr8">
          <div class="crumbs">
            当前位置：<span id="current_pos"></span>
          </div>
          <div class="colAdmin">
            <div class="content margin_tag" style="position:relative; overflow:hidden">
              <div class="right_info">
                <div class="list_box Boxcol2">
                  <div class="list_box_title">
                    <span>排序(审核)</span> 
                    <span >栏目</span>
                    <span class="big_tit">标题</span>
                    <span class="title_detail">添加时间</span>
                    <span >作者</span>
                    <span >审核</span>
                  </div>

                  <div class="bf">					
                    <ul class="list_box_detail" @click="addClas" v-for="(v,i) in resData" :key='i' :class="{'even':i%2==0}">
                      <li>[{{i+1}}]
                        <el-switch @change="checkFun(v._id)"
                          v-model="v.checkT"
                          active-text="共享"
                          inactive-text="私有">
                        </el-switch></li>
                      <li>{{v.subjectName}}</li>
                      <li class="big_tit"><a :href='"/artdetail?id="+v._id' target="_blank">{{v.title}}</a></li>
                      <li class="title_detail" style="text-align:left;line-height:25px;padding-left: 15px;"> 
                        {{v.date}}
                      </li>
                      <li class="">{{v.user}}</li>
                      <li class="no_border">
                        <router-link :to='"/editart?id="+v._id' class="btn btn-success">
                          <i class="el-icon-edit-outline f14" style="margin-right:15px;">编辑</i>
                        </router-link>

                
                        <i @click="deleteBtn(v._id)" class="el-icon-delete f14" style="color:red">删除</i>
                      </li>	
                    </ul>
                  </div> 
                </div>				
              </div>
            </div>
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
  </div>  
</template>

<script>

export default {
  name: "artlist",
  data() {
    return {
      resData:[],
      errors: "",
      total:0,
      num:1,
      pageNum:13,
    }
  },
  mounted() {
    // this.getList();
    this.goPage(this.num)
    
  },
  methods: {
    addClas(event){
      if(event.target.parentNode.classList.contains('actives')){
        event.target.parentNode.classList.remove("actives")
      }else{
        event.target.parentNode.classList.add("actives")
      }
    },
    // getList(){
    //   this.$axios.post("/api/admin/listAlls",{num:this.num,pageNum:this.pageNum})
    //     .then(res=>{
    //       if(res.data.code==1000){
    //         let arr=[],a=[]
    //         arr = res.data.data
    //         arr.forEach(v=>{
    //           let b={}
    //           b.subjectName = v.subjectId.subjectName
    //           b.title = v.title
    //           b.date = v.date
    //           b.user = v.user.name
    //           b.checkT = v.checkT
    //           a.push(b)
    //         })
    //         this.resData=a
    //         this.total = res.data.total
    //       }
    //       // console.log(this.resData)
    //     })
    // },
    goPage(x){
      // 0,3  /3,3
      let params={}
      params.num = Number((x-1)*this.pageNum)
      params.pageNum =this.pageNum
      this.$axios.post("/api/admin/listAlls",params)
        .then(res=>{
          if(res.data.code==1000){
            if(Object.keys(res.data.data).length==0){
              this.resData = []
              return false
            }
            let arr=[],a=[]
            arr = res.data.data
            arr.forEach(v=>{
              let b={}
              b.subjectName = v.subjectId.subjectName
              b.title = v.title
              b.date = v.date
              b.user = v.user.name
              b.checkT = v.checkT
              b._id = v._id              
              a.push(b)
            })
            this.resData = a
            this.total = res.data.total
          }
        })
        $('.bf ul').removeClass('actives')
    },
    deleteBtn(x){
      if (confirm('确定要删除该专栏吗?')==true){ 
        this.$axios.delete(`/api/admin/deleteArticle/${x}`)
        .then(res=>{
          if(res.data.code==400){
            this.dialog(res.data.msg)
          }else if(res.data.code==1000){
             this.$message({
              showClose: true,
              message: res.data.msg,
              duration:1500,
              type: 'success'
            })
            this.goPage(1)
          }
        })
        .catch(error =>{
          this.error = error.response.data.msg;
          console.log(this.error)
          this.$message.error('错了哦，请再试一次');
        })
      }else{ 
        return false
      } 
    },
    checkFun(x){
      this.$axios
        .post(`/api/admin/checkT/${x}`)
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
    },

    //********************************* */
  }
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  /* padding: 16px; */
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>