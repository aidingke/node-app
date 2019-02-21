<template>
<div>
  <div class="card card-body IdeasEdit container">
    <!-- <h3>要编辑的内容</h3> -->
    <!-- <div v-for="(v,i) in temps" :key="i" class="">
          <img :src="v" class="imgData" tt="i">
        </div> -->
        <!-- <img :src="temps"> -->
    <!-- {{idea.id}} -->
    
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
        <template v-if="this.showFileData.length>0">
          <Upload @addImgs="addImgs" @showUps="showUps" :objNum="this.objNum" :showFileDatas="this.showFileData"></Upload> 
        </template>
        
        <div v-if="tempm">
          <Upload2 @getImgs="getImgs" :objNum="this.objNum" ></Upload2> 
        </div>
        
        <br/>
        <label for="title">内容简介</label>
        <textarea style="height:100px;" :class="{'is-invalid': error.description}" v-model="resData.description" class="form-control" name="description"></textarea>
        <!-- <UE :defaultMsg="defaultDes" :config="config1" ref="ue1" :id="ue1"></UE> -->
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
      objNum:3,//定义传过去组件限制上传的数量
      showFileData:[],//回传存放图片的url的数组
      ue1: "ue1", // 不同编辑器必须不同的id
      ue2: "ue2",
      config1: {
        initialFrameWidth: null,
        initialFrameHeight: 200,
        //让编辑器的编辑框部分可以随着编辑内容的增加而自动长高
        autoHeightEnabled:false,
        //启用编辑器工具栏浮动
        autoFloatEnabled: true,
        maximumWords:150, //允许的最大字符数 
        //定义工具栏
        toolbars:[["Source","Undo","Redo","InsertImage","Emotion"]],
        //关闭左下角path路径提示
        elementPathEnabled : false
      },
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
    
    // console.log(this.SubjectsList)
    // this.getSubjectMenuList()
    // this.temps=sessionStorage.getItem("base64")
  },
  methods: {
    checkFun(){
      this.oks = !this.oks
    },
    //**********上传图片开始
    addImgs(x){
      console.log(x.length)
      // this.$axios.post("/api/ideas/fake",x)
      // .then(res => {
      //   console.log(res)
      // })
      // console.log(x)
      // this.imgs=[]
      // // 获取base64
      // x.forEach(file => {
      //   this.uploadFile(file);
      // });
      // // console.log(this.imgs)
      // // return false
      // this.submit(1,this.imgs)
      // return false
      // this.$nextTick(() => {
      //   this.temps = x
      //   this.$axios.post("/api/ideas/fake",this.temps)
      //   .then(res => {
      //     console.log(res)
      //   })
      // })
      // console.log()
      // this.imgs.forEach(v=>{
      //   console.log(v)
      // })
      console.log('----------------')
      // console.log(this.showFileData)
      // console.log('-----------------')
      return false
      const user = this.$store.getters.user;
      const newPost = {
        imgs:this.imgs.join('|')
      };

      console.log(newPost.imgs)

      this.$axios
        .post("/api/ideas/edit/"+this.getUrl('id'), newPost)
        .then(res => {
          // console.log(res)
          alert(res.data.success_msg)
          return false
          this.$router.push({
              path:'/artlist'
          })
        })
        .catch(error => {
          this.error = error.response.data;
          console.log(this.error)
        });
    },
    //先用这个方法
    getImgs(imgs) {
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
        // console.log(e.target.result);
        return _this.imgs.unshift(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    //删光的时候出现第二个组件
    showUps(x){ 
      if(x){
        this.tempm = true
      }
    },
    //**********上传图片结束
    getInfo(x){
      this.$axios("/api/ideas/artedit/"+x)
        .then(res=>{
          // console.log(res.data)
          if(res.data.imgs.length>0){
            this.showFileData =  res.data.imgs   
          }
          // console.log(this.showFileData)
          if(res.data.code==400){
            alert(res.data.msg)
            return false
          }
          this.resData = res.data
          if(this.resData.subjectId){
            this.subjradio = this.resData.subjectId
          }
          if(res.data.imgs.length==0){
            this.tempm='1'
          }
          // this.defaultDes=this.repImgInfos(this.resData.description)
          this.defaultDes=this.resData.description
          this.defaultMsg=this.resData.details
          // this.defaultMsg=this.repImgInfos(this.resData.details)
          
          // this.defaultDes=this.resData.description

          this.oks = this.resData.checkT
          // console.log(this.defaultMsg)
        })
    },
    submit(x,y) {
      // if(x){
      //   console.log('开始')
      //   console.log(y)
      //   this.$axios.post("/api/ideas/fake",y)
      //     .then(res => {
      //       console.log(res)
      //     })
      //   return false
      // }
      // const user = this.$store.getters.user;
      // if(this.addDesc(this.$refs.ue1.getContent(),150)==false){
      //   alert('字数不能超过150')
      //   return false
      // }

      // this.temps = [...this.newA,...this.imgs]


      //  console.log(this.subjradio)
      //  return false

      const newPost = {
        title: this.resData.title,
        subjectId:this.subjradio,
        // description:this.addDesc(this.$refs.ue1.getContent()),
        description:this.resData.description,
        imgs:this.imgs.join('|'),
        details:this.addImg(this.$refs.ue2.getContent()),
        checkT:this.oks
      };

      this.$axios
        .post("/api/ideas/edit/"+this.getUrl('id'), newPost)
        .then(res => {
          console.log(res)
          // alert(res.data.success_msg)
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