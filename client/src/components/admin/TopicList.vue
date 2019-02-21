<template>
    <div class="fillcontain TopicList" id="content">
      <div class="artlist">
        <div class="colauto mr8">
          <div class="crumbs">
            当前位置：<span id="current_pos"></span>
          </div>
          <div class="colAdmin">
            <div class="content margin_tag" style="position:relative; overflow:hidden">
              <div class="right_info">
                	<ul class="el-row shoCont">
                    <li v-for="(item,index) in resData" :key="index">
                        <!-- <router-link :to="{path:'/topicShow',query: {id: item._id}}"> -->
                        <div class="addTop">
                          <router-link :to='"/topicShow?id="+item._id'>  
                            <div class="kejianBox">
                              <span v-for="(v,i) in item.imgs" :key="i">   
                                <img alt="" :src="v" style="width:100%;"/>
                              </span>
                            </div>
                          </router-link> 
                          <p class="bk6"></p>
                          <el-tooltip class="item" content="点击编辑" placement="right" effect="light">
                            <p @click="openTop(index)">
                              <span>{{item.topicName}}</span> 
                              <i>{{item.date.split(" ")[0]}}</i>
                            </p>
                          </el-tooltip>
                        </div>
                    </li>
                    <li>
                      <div class="addTop" @click="addTop">
                        <p style="height:95px;line-height:60px;">
                          <span>添加专题+</span>
                        </p>
                      </div>
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

    <el-dialog title="添加专题" :visible.sync="dialogFormVisible" style="width:900px;">
      <el-form>
        <el-form-item>
          <el-radio-group v-for="(itec,ii) in StatusList" :key="ii" v-model="topicStatus" style="margin-right:8px;overflow: hidden;display:inline-block;">
            <el-radio :label="itec.status" @change="changeFun">{{itec.statusName}}</el-radio>
          </el-radio-group> 
        </el-form-item>

        <el-form-item label="">
          <p>专题图片</p>
          <div>
            <Upload @addImgs="addImgs"
              :objNum="this.objNum" 
              :showFileData="this.showFileData">
            </Upload> 
          </div>
        </el-form-item>
        <el-form-item label="专题名称">
          <el-input v-model="topicName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="okFresh">取 消</el-button>
        <el-button type="primary" @click="submitTopic">确 定</el-button>
      </div>
    </el-dialog>

  </div>  
</template>

<script>
import Upload from "../../components/common/UploadEdit.vue";
export default {
  name: "artlist",
  components: {
    Upload
  },
  data() {
    return {
      topicId:'', //专题ID
      edit:false,//编辑默认不开启，点击编辑才开启
      objNum:1,
      showFileData:[],//回传存放图片的url的数组
      resData:[],
      errors: "",
      dialogFormVisible: false,
      imgs: [],
      topicName:'',
      total:0,
      num:1,
      pageNum:13,
      topicStatus:'0',
      StatusList:[
        {
					status:'0',
					statusName:'所有权限'
        },
        {
					status:'1',
					statusName:'可浏览不能复制'
        },
        {
					status:'2',
					statusName:'可部分浏览'
        }
			],
    }
  },
  mounted() {
    this.goPage(this.num)
  },
  methods: {
    changeFun(){

    },
    okFresh(){
      this.dialogFormVisible=false
      this.goPage(1)
    },
    submitTopic(){
      let params={topicName:this.topicName,imgs:this.imgs,topicStatus:this.topicStatus}
      if(this.edit){
        //走编辑,带专题ID
        params.topicId = this.topicId
        this.$axios.post("/api/admin/editTopic",params)
        .then(res=>{
          if(res.data.code==1000){
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.goPage(1)
            this.dialogFormVisible=false
          }
          if(res.data.code==400){
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
      }else{
        this.$axios.post("/api/admin/addTopic",params)
        .then(res=>{
          if(res.data.code==1000){
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.goPage(1)
            this.dialogFormVisible=false
          }
        })
      }
    },
    addTop(){
      this.edit = false
      this.dialogFormVisible=true
    },
    openTop(x){
      // console.log(this.resData[x])
      this.dialogFormVisible=true
      this.topicName = this.resData[x].topicName
      this.topicStatus = this.resData[x].topicStatus
      this.topicId = this.resData[x]._id
      this.edit = true
      if(this.resData[x].imgs){
        this.showFileData=''
        this.imgs=''
        setTimeout(()=>{
          this.showFileData =  this.resData[x].imgs
          this.imgs=this.resData[x].imgs
        },100)
      }
    },
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
    },
    deleteBtn(x){
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
    },
    //**********接收子组件数据开始
    addImgs(x){
      // console.log(x)
      // X是所有图片了
      this.imgs = ''
      setTimeout(()=>{
        this.imgs = x
      },200)
    },
    //**********接收子组件数据结束
  }
};
</script>
<style scoped>
.fillcontain {
  width: 70%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.colAdmin{
  width: 955px;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
.addTop{
  padding: 14px;text-align:center;
}
.shoCont{
  display: flex;
  width: 970px;
  flex-wrap: wrap;
}
.shoCont li{
  flex-basis:150px;
  padding: 0 10px 20px;
}
.shoCont li:hover{
  text-decoration:none;
  font-weight :600;
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
<style>
.TopicList .el-dialog__body{
  padding-top: 0
}
</style>
