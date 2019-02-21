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
                    <span >用户名</span>
                    <span >邮箱</span>
                    <span class="big_tit">权限</span>
                    <span class="title_detail">注册时间</span>
                    <span >审核</span>
                  </div>

                  <div class="bf">					
                    <ul class="list_box_detail" @click="addClas" v-for="(v,i) in resData" :key='i' :class="{'even':i%2==0}">
                      <li>[{{i+1}}]
                        <!-- <el-switch @change="checkFun(v._id)"
                          v-model="v.checkT"
                          active-text="上线"
                          inactive-text="下线">
                        </el-switch> -->
                      </li>
                      <li style="text-align:left;padding-left:3px;"><img width="35" class="brau" :src='"http://139.199.168.180:5000/static/avatar/"+v.avatar'>
                        {{v.name}} 
                      </li>
                      <li>{{v.email}} </li>
                      <li class="big_tit">
                        <template v-if="user.status == '0'||user.status == '1'">
                          <el-radio-group v-for="(itec,ii) in StatusList" :key="ii" v-model="v.status" style="margin-right:8px;overflow: hidden;display:inline-block;">
                            <el-radio :label="itec.status" :disabled="itec.Bled" @change="changeFun(itec.status,v._id)">{{itec.statusName}}</el-radio>
                          </el-radio-group>  
                        </template>
                        <template v-else>
                          <el-radio-group v-for="(itec,ii) in StatusList" :key="ii" v-model="v.status" style="margin-right:8px;overflow: hidden;display:inline-block;">
                            <el-radio :label="itec.status" disabled @change="changeFun(itec.status,v._id)">{{itec.statusName}}</el-radio>
                          </el-radio-group> 
                        </template>
                      </li>
                      <li class="title_detail" style="text-align:left;padding-left: 15px;"> 
                        {{v.date}}
                      </li>
                      <li class="no_border">
                        <i @click="openChangeFun(v.name,v.email,v._id)" class="el-icon-edit-outline f14" style="margin-right:15px;">改资料</i>
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

    <el-dialog title="修改资料" :visible.sync="dialogFormVisible"  width="40%">
      <el-form :model="form">
        <input type="hidden" v-model="form._id" />
        <el-form-item label="改名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="改邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="改密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitInfo">确 定</el-button>
      </div>
    </el-dialog>
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
      dialogFormVisible: false,
      formLabelWidth:'70px',
      form: {
        _id:'',
        name: '',
        email: '',
        password:''
      },
      StatusList:[
        {
					status:'0',
          Bled:true,
					statusName:'超管'
        },
        {
					status:'1',
          Bled:false,
					statusName:'编辑'
        },
        {
					status:'2',
          Bled:false,
					statusName:'临客'
        },
        {
					status:'3',
          Bled:false,
					statusName:'会员'
				},
        {
					status:'4',
          Bled:false,
					statusName:'黑名单'
				}
			],
    }
  },
  mounted() {
    // this.getList();
    this.goPage(this.num)
    
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    openChangeFun(x,y,z){
      //x name y email z _id
      this.dialogFormVisible = true
      this.form ={
        _id: z,
        name: x,
        email: y
      }
    },
    submitInfo(){
      this.$axios.post("/api/admin/changeUser",this.form)
        .then(res=>{
          if(res.data.code==1000){
            this.$message({
              message: '修信息成功!',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.goPage(1)
          }else if(res.data.code==400){
            this.dialog(res.data.msg)
          }
        })
    },
    changeFun(x,y){ //x status,y userid
      // console.log(x,y)
      // return false 
      this.$axios.post("/api/admin/UserStatus",{status:x,_id:y})
        .then(res=>{
          if(res.data.code==1000){
            this.$message({
              message: '修改权限成功!',
              type: 'success'
            });
          }else if(res.data.code==400){
            this.dialog(res.data.msg)
          }
        })
    },
    addClas(event){
      if(event.target.parentNode.classList.contains('actives')){
        event.target.parentNode.classList.remove("actives")
      }else{
        event.target.parentNode.classList.add("actives")
      }
    },
    goPage(x){
      // 0,3  /3,3
      let params={}
      params.num = Number((x-1)*this.pageNum)
      params.pageNum =this.pageNum
      this.$axios.post("/api/admin/listUsers",params)
        .then(res=>{
          if(res.data.code==1000){
            if(Object.keys(res.data.data).length==0){
              this.resData = []
              return false
            }
            this.resData  = res.data.data
            this.total = res.data.total
          }
        })
        $('.bf ul').removeClass('actives')
    },
    deleteBtn(x){
      // alert(x)
      this.$axios.delete(`/api/admin/deleteUser/${x}`)
        .then(res=>{
          if(res.data.code==1000){
            this.$message({
              showClose: true,
              message: res.data.msg,
              duration:1500,
              type: 'success'
            })
            this.goPage(1)
          }else if(res.data.code==400){
            this.dialog(res.data.msg)
          }
        })
        .catch(error =>{
          this.error = error.response.data.msg;
          console.log(this.error)
          this.$message.error('错了哦，请再试一次');
        })
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
.el-radio__label{
  font-size: 12px;
}
</style>