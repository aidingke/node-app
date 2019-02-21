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

        <div><Upload @getImgs="getImgs" :objNum="this.objNum"></Upload></div>

        <div class="form-group">
          <!-- <label for="title">标题</label> -->
          <el-input v-model="title" type="text" :class="{'is-invalid': error.title}" name="title" placeholder="标题"></el-input>
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
              v-model="description">
            </el-input>
          </div>
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
        <!-- <el-button type="submit" >提交</el-button> -->
        <button class="el-button el-button--primary">提交</button>
        <!-- <el-button type="success" @click='showImgs'>显示图片</el-button> -->
        <el-switch @change="checkFun()"
          v-model="checkT"
          active-text="共享"
          inactive-text="私有">
        </el-switch>

        <!-- <a @click="checkFun()" :class="{'oks':oks}" style="margin-left:3%">
          <template v-if="oks">已开</template> 
          <template v-if="oks!==true">已关</template>
        </a> -->
        
      </form>
    </div>
  </div>  
</template>

<script>
import Upload from "../../components/common/Upload.vue";
import UE from '../../components/common/ue.vue';
export default {
  name: "IdeasAdd",
  components: {
    UE,Upload
  },
  data() {
    return {
      // temps:[],
      checkT:true,
      subjradio:'',
      SubjectsList:[],
      title: "",
      imgs: [],
      defaultDes: '',
      defaultMsg: '',
      ue1: "ue1", // 不同编辑器必须不同的id
      ue2: "ue2",
      objNum:1,//定义传过去组件限制上传的数量
      config2: {
        initialFrameWidth: null,
        initialFrameHeight: 400,
        //让编辑器的编辑框部分可以随着编辑内容的增加而自动长高
        autoHeightEnabled:false,
        //启用编辑器工具栏浮动
        autoFloatEnabled: true,
        maximumWords:70000, //允许的最大字符数 
        //定义工具栏
        toolbars:[["Bold","Underline","JustifyLeft","JustifyCenter","JustifyRight","ForeColor","Undo","Redo","FontFamily","FontSize","InsertImage","Emotion","InsertVideo","Link","Map",'Preview','inserttable','FullScreen']],
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
    showImgs(){
      // console.log(this.repImgInfos(this.$refs.ue2.getContent()))
      // //加端口号
      // this.defaultMsg=this.repImgInfos(this.$refs.ue2.getContent())
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
    //**********上传图片结束

    submit() {
      const user = this.$store.getters.user;
      // this.temps=this.imgs;
      // console.log(this.temps)
      // return false

      const newPost = {
        title: this.title,
        subjectId:this.subjradio,
        // description:this.addImg(this.$refs.ue1.getContent()),
        description:this.description,
        details:this.$refs.ue2.getContent(),
        name: user.name,
        imgs:this.imgs.join('|'),
        checkT:this.oks
        // avater: user.avater
      };
      
      this.$axios
        .post("/api/admin/add", newPost)
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
          this.$router.back(-1)
          // this.$router.push({
          //     path:'/artlist'
          // })
        })
        .catch(error => {
          this.error = error.response.data;
        });
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
    $('.rightContainer').css({background:'#fff'})
    // $('body').css({background:'#fff'})
    
  }
};
</script>
<style scoped>
.IdeasAdd{
  width:75%;
  padding-left:10px;
}
.IdeasAdd .oks,.IdeasAdd .oks:hover{
  color:red;
}
.invalid-feedback{
  display: block;
}
.form-group{
  width:75%;
}
.btn-primary{

}
</style>















