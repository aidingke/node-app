<template>
    <div class="card card-body IdeasAdd container mt10" style="padding:15px;">
      <h3>专栏</h3>
       <!-- <div v-for="(v,i) in temps" :key="i">
          <img :src="v" >
        </div> -->
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
          <label for="title">标题</label>
          <input type="text" class="form-control" :class="{'is-invalid': error.title}" name="title" v-model="title">
          <div v-if="error.title" class="invalid-feedback">
            {{error.title}}
          </div>
        </div>
        <div class="form-group">
          <!-- {{error}} -->
          <Upload @addImgs="addImgs" :objNum="this.objNum" :showFileData="this.showFileData"></Upload> 
        
          <!-- <Upload @getImgs="getImgs" :objNum="this.objNum"></Upload> <br/> -->
          <label for="description">内容简介</label>

          <!-- <UE :defaultMsg="defaultDes" :config="config1" ref="ue1" :id="ue1"></UE> -->
          <textarea style="height:100px;" class="form-control" :class="{'is-invalid': error.description}" v-model="description" name="description"></textarea>
          
          <div v-if="error.description" class="invalid-feedback">
            {{error.description}}
          </div>
        </div>
        <div class="form-group">
          <label for="details">详情</label>
          <!-- <textarea style="height:300px;" class="form-control" :class="{'is-invalid': error.details}" v-model="details" name="details"></textarea> -->
          <UE :defaultMsg="defaultMsg" :config="config2" ref="ue2" :id="ue2"></UE>
          <div v-if="error.details" class="invalid-feedback">
            {{error.details}}
          </div>
        </div>
        
        <button type="submit" class="btn btn-primary">提交</button>
        <a @click="checkFun()" :class="{'oks':oks}" style="margin-left:3%">
          <template v-if="oks">已开</template> 
          <template v-if="oks!==true">已关</template>
        </a>
        
      </form>
    </div>
</template>

<script>
// import Upload from "../../components/common/Upload.vue";
import Upload from "../../components/common/UploadEdit.vue";
import UE from '../../components/common/ue.vue';
export default {
  name: "IdeasAdd",
  components: {
    UE,Upload
  },
  data() {
    return {
      // temps:[],
      subjradio:'',
      SubjectsList:[],
      title: "",
      imgs: [],
      defaultDes: '',
      defaultMsg: '',
      ue1: "ue1", // 不同编辑器必须不同的id
      ue2: "ue2",
      objNum:3,//定义传过去组件限制上传的数量
      showFileData:[],//回传存放图片的url的数组
      config1: {
        initialFrameWidth: null,
        initialFrameHeight: 200,
        //让编辑器的编辑框部分可以随着编辑内容的增加而自动长高
        autoHeightEnabled:false,
        //启用编辑器工具栏浮动
        autoFloatEnabled: true,
        maximumWords:100, //允许的最大字符数 
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
      },
      description:"",
      details:"",
      oks:true,
      error: ""
    };
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
    //**********上传图片结束

    submit() {
      const user = this.$store.getters.user;
      const newPost = {
        title: this.title,
        subjectId:this.subjradio,
        // description:this.addImg(this.$refs.ue1.getContent()),
        description:this.description,
        details:this.addImg(this.$refs.ue2.getContent()),
        name: user.name,
        imgs:this.imgs,
        checkT:this.oks
      };
      
      console.log(newPost.details)
      this.$axios
        .post("/api/ideas/add", newPost)
        .then(res => {
          // console.log(res)
          this.$router.push({
              path:'/artlist'
          })
        })
        .catch(error => {
          this.error = error.response.data;
        });
    }
  },
  mounted(){
    this.SubjectsList = JSON.parse(sessionStorage.getItem("subMenu"))
    this.SubjectsList.forEach((v,i)=>{
      if(v.status==1){
        this.subjradio = v._id
      }
    })
  }
};
</script>
<style scoped>
.IdeasAdd .oks,.IdeasAdd .oks:hover{
  color:red;
}
.invalid-feedback{
  display: block;
}
</style>















