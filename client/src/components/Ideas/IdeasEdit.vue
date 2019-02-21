<template>
<div>
  <div class="card card-body IdeasEdit container">
    <form method="post" @submit.prevent="submit">
      <div class="headBox" style="padding:15px 0">
        <div class="head-title" style="display: inline;">分类：</div>
        <div class="block" style="width:79%;margin-left:1%;display: inline;">
          <el-radio-group v-for="(itec,ii) in SubjectsList" :key="ii" v-model="subjradio" style="margin-right:8px;overflow: hidden;display:inline-block;">
            <el-radio :label="itec._id">{{itec.subjectName}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="form-group">
        <label for="title">标题：</label>
        <input type="text" :class="{'is-invalid': error.title}" class="form-control title" name="title" v-model="resData.title" style="display:inline-block;">
        <div v-if="error.title" class="invalid-feedback">
          {{error.title}}
        </div>
      </div>
      <div class="form-group">
        <Upload @addImgs="addImgs" :objNum="this.objNum" :showFileData="this.showFileData"></Upload> 
        
        <br/>
        <label for="title">内容简介</label>
        <textarea style="height:100px;" :class="{'is-invalid': error.description}" v-model="resData.description" class="form-control" name="description"></textarea>
        <div v-if="error.description" class="invalid-feedback">
          {{error.description}}
        </div>
      </div>
      <div class="form-group">
        <label for="details">详情</label>
        <!-- <textarea style="height:300px;" :class="{'is-invalid': error.details}" class="form-control" v-model="resData.details" name="details"></textarea> -->
        <template v-if="this.defaultMsg">
          <UE :defaultMsg="defaultMsg" :config="config2" ref="ue2" :id="ue2"></UE>
        </template>
        <div v-if="error.details" class="invalid-feedback">
          {{error.details}}
        </div>
      </div>

      

      <button type="submit" class="btn btn-primary">编辑</button>
      <a class="btn-default btn" href="javascript:history.go(-1)" style="background:#ddd;color:#555">返回</a>
      <a @click="checkFun()" :class="{'oks':oks}" style="margin-left:3%">
        <template v-if="oks">已开</template> 
        <template v-if="oks!==true">已关</template>
      </a>
    </form>
  </div>
</div>  
</template>

<script>
//编辑用不同的上传组件
import Upload from "../../components/common/UploadEdit.vue";
import Upload2 from "../../components/common/Upload.vue";
// import {compress,foo} from "../../../src/utils/lib";

import UE from '../../components/common/ue.vue';
export default {
  name: "IdeasEdit",
  components: {
    UE,Upload,Upload2
  },
  data() {
    return {
      resData:"",
      oks:true,
      error: "",
      subjradio:'',
      SubjectsList:[],
      defaultDes: '',
      defaultMsg: '',
      imgs: [],
      objNum:3,//定义传过去组件限制上传的数量
      showFileData:[],//回传存放图片的url的数组
      ue2: "ue2",
      config2: {
        initialFrameWidth: null,
        initialFrameHeight: 400,
        //让编辑器的编辑框部分可以随着编辑内容的增加而自动长高
        autoHeightEnabled:false,
        //启用编辑器工具栏浮动
        autoFloatEnabled: true,
        maximumWords:300000, //允许的最大字符数 
        //定义工具栏
        toolbars:[["Source","Bold","Underline","JustifyLeft","JustifyCenter","JustifyRight","ForeColor","Undo","Redo","FontFamily","FontSize","InsertImage","Emotion","InsertVideo","Link","Map",'Preview','inserttable','FullScreen']],
        //关闭左下角path路径提示
        elementPathEnabled : false
      }
    };
  },
  created() {
    this.getInfo(this.getUrl('id'))
    this.SubjectsList = JSON.parse(sessionStorage.getItem("subMenu"))
  },
  methods: {
    checkFun(){
      this.oks = !this.oks
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
    getInfo(x){
      this.$axios("/api/ideas/artedit/"+x)
        .then(res=>{
          if(res.data.imgs.length>0){
            this.showFileData =  res.data.imgs   
          }
          if(res.data.code==400){
            alert(res.data.msg)
            return false
          }
          this.resData = res.data
          if(this.resData.subjectId){
            this.subjradio = this.resData.subjectId
          }
          this.defaultDes=this.resData.description
          this.defaultMsg=this.resData.details
          this.oks = this.resData.checkT
        })
    },
    submit() {
      const newPost = {
        title: this.resData.title,
        subjectId:this.subjradio,
        description:this.resData.description,
        imgs:this.imgs,
        details:this.addImg(this.$refs.ue2.getContent()),
        checkT:this.oks
      };

      if(this.imgs.length==0){
        newPost.imgs = []
      }

      this.$axios
        .post("/api/ideas/edit/"+this.getUrl('id'), newPost)
        .then(res => {
          // console.log(res)
          this.$message({
            message: res.data.success_msg,
            type: 'success'
          });
          this.$router.push({
              path:'/artlist'
          })
        })
        .catch(error => {
          this.error = error.response.data;
          console.log(this.error)
        });
    }
  }
};
</script>
<style scoped>
.IdeasEdit{
  padding: 20px;
}
.IdeasEdit .oks,.IdeasEdit .oks:hover{
  color:red;
}
.invalid-feedback{
  display: block;
}
</style>