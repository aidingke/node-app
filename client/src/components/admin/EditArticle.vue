<template>
  <div class="IdeasAdd ">
    <div class="fillcontain" id="content">
      <div class="crumbs">
        当前位置：<span id="current_pos"></span>
      </div>
          
      <form method="post" @submit.prevent="submit">
        <div class="headBox" style="padding:15px 0">
          <div class="head-title" style="display: inline;">分类：</div>
          <div class="block">
            <el-radio-group v-for="(itec,ii) in SubjectsList" :key="ii" v-model="subjradio" style="margin-right:8px;overflow: hidden;display:inline-block;">
              <el-radio :label="itec._id">{{itec.subjectName}}</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div>
          <template v-if="this.showFileData.length>0">
            <Upload @addImgs="addImgs" @showUps="showUps" :objNum="this.objNum" :showFileDatas="this.showFileData"></Upload> 
          </template>
          
          <div v-if="tempm">
            <Upload2 @getImgs="getImgs" :objNum="this.objNum" ></Upload2> 
          </div>
        </div>

        <div class="form-group">
          <el-input v-model="resData.title" type="text" :class="{'is-invalid': error.title}" name="title" placeholder="标题"></el-input>
          <div v-if="error.title" class="invalid-feedback">
            {{error.title}}
          </div>
        </div>
        <div class="form-group">
          <!-- {{error}} -->
          
          <label for="description">内容简介</label>
          <div>
            <el-input type="textarea" :rows="2" 
              :class="{'is-invalid': error.description}"
              placeholder="请输入内容"
              v-model="resData.description">
            </el-input>
          </div>
          <div v-if="error.description" class="invalid-feedback">
            {{error.description}}
          </div>
        </div>
        <div class="form-group">
          <label for="details">详情</label>
          <template v-if="this.defaultMsg">
            <UE :defaultMsg="defaultMsg" :config="config2" ref="ue2" :id="ue2"></UE>
          </template>
          <div v-if="error.details" class="invalid-feedback">
            {{error.details}}
          </div>
        </div>
        <a class="el-button el-button--default" @click="goback()">返回</a>
        <button class="el-button el-button--primary">编辑</button>
        <el-switch @change="checkFun()"
          v-model="resData.checkT"
          active-text="共享"
          inactive-text="私有">
        </el-switch>
        
      </form>
    </div>
  </div>  
</template>

<script>
import Upload from "../../components/common/UploadEdit.vue";
import Upload2 from "../../components/common/Upload.vue";

import UE from '../../components/common/ue.vue';
export default {
  name: "IdeasEdit",
  components: {
    UE,Upload,Upload2
  },
  data() {
    return {
      temps:'',
      tempm:'',//回传做判断
      newA:[],
      newB:[],
      resData:"",
      oks:true,
      error: "",
      subjradio:'',
      SubjectsList:[],
      defaultDes: '',
      defaultMsg: '',
      imgs: [],
      objNum:1,//定义传过去组件限制上传的数量
      showFileData:[],//回传存放图片的url的数组
      ue2: "ue2",
      config2: {
        initialFrameWidth: null,
        initialFrameHeight: 400,
        //让编辑器的编辑框部分可以随着编辑内容的增加而自动长高
        autoHeightEnabled:false,
        //启用编辑器工具栏浮动
        autoFloatEnabled: true,
        maximumWords:70000, //允许的最大字符数 
        //定义工具栏
        toolbars:[["Bold","Underline","JustifyLeft","JustifyCenter","JustifyRight","ForeColor","Undo","Redo","FontFamily","FontSize","InsertImage","Emotion","InsertVideo","Link","Map",'inserttable','FullScreen']],
        //关闭左下角path路径提示
        elementPathEnabled : false
      }
    };
  },
  methods: {
    goback(){
      this.$router.go(-1)
    },
    checkFun(){
      this.oks = !this.oks
    },
    //**********上传图片开始
    getImgs(imgs) {
      console.log(imgs)
      //重新赋值，不然会把之前的也加进去
      this.imgs=[]
      // 获取base64
      imgs.forEach(file => {
        this.uploadFile(file);
      });
    },
    uploadFile(file) {
      let reader = new FileReader();
      const _this = this;
      reader.onload = function(e) {
        // _this.timg = e.target.result
        // console.log(e.target.result);
        _this.imgs.unshift(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    //删光的时候出现第二个组件
    showUps(x){ 
      if(x){
        this.tempm = true
      }
    },
    getInfo(x){
      this.$axios("/api/admin/artedit/"+x)
        .then(res=>{
          // console.log(res.data)
          if(res.data.imgs.length>0){
            this.showFileData =  res.data.imgs   
          }else if(res.data.imgs.length==0){
            this.tempm = true
          }
          if(res.data.code==400){
            alert(res.data.msg)
            return false
          }
          this.resData = res.data
          if(this.resData.subjectId){
            this.subjradio = this.resData.subjectId
          }
          // this.defaultDes=this.repImgInfos(this.resData.description)
          this.defaultDes=this.resData.description
          // this.defaultMsg=this.repImgInfos(this.resData.details)
          this.defaultMsg=this.resData.details
          this.oks = this.resData.checkT
          // console.log(this.defaultMsg)
        })
    },
    //**********上传图片结束

    submit(x,y) {
      const newPost = {
        title: this.resData.title,
        subjectId:this.subjradio,
        // description:this.addDesc(this.$refs.ue1.getContent()),
        description:this.resData.description,
        imgs:this.imgs.join('|'),
        details:this.$refs.ue2.getContent(),
        checkT:this.oks
      };

      this.$axios.post("/api/admin/editArticle/"+this.getUrl('id'), newPost)
        .then(res => {
          if(res.data.code==1000){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          }else if(res.data.code==400){
            this.dialog(res.data.msg)
            return false
          }
          this.$router.push({
              path:'/artlist'
          })
        })
        .catch(error => {
          this.error = error.response.data;
          console.log(this.error)
        })
    },
    async getSubjectMenuList(){
      const res = await this.$axioss.getSubjectMenuList()    
      if(res.data.code===1000){
        let resData
        resData = res.data.data
        resData.forEach((v,i)=>{
          if(v.status==1){
            this.subjradio = v._id
          }
        })
        this.SubjectsList = resData
      }
    }
  },
  mounted(){
    this.getSubjectMenuList()
    this.getInfo(this.getUrl('id'))
    $('.rightContainer').css({background:'#fff'})
    // $('body').css({background:'#fff'})
    
  }
};
</script>
<style scoped>
.IdeasAdd{
  background: #fff;
  width:70%;
  padding-left:10px;
}
.IdeasAdd .oks,.IdeasAdd .oks:hover{
  color:red;
}
.invalid-feedback{
  display: block;
}
.form-group{
  width:70%;
}
.btn-primary{

}
</style>















