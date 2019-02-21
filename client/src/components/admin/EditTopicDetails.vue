<template>
  <div class="EditTopicDetails ">
    <div class="fillcontain" id="content">
      <div class="crumbs">
        当前位置：<span id="current_pos"></span>
      </div>
          
      <form method="post" @submit.prevent="submit">
        <div class="headBox" style="padding:15px 0">
          <h3 class="head-title" style="display: inline;">
            分类：<b>{{topicName}}</b>
          </h3>

          <div style="margin-top: 15px;">
            <el-select v-model="selectCata" slot="prepend" placeholder="请选择">
              <el-option label="" value=""></el-option>
              <el-option v-for="(v,i) in CataTopicList" :label="v.cataName" :value="v._id" :key="i"></el-option>
            </el-select>
          </div>

        </div>

        <div class="form-group">
          <el-input v-model="resCont.title" type="text" :class="{'is-invalid': error.title}" name="title" placeholder="标题"></el-input>
          <div v-if="error.title" class="invalid-feedback">
            {{error.title}}
          </div>
        </div>

        <div class="form-group">
          <h3 class="details">详情</h3>
          <template v-if="defaultMsg">
            <UE :defaultMsg="defaultMsg" :config="config2" ref="ue2" :id="ue2"></UE>
          </template>

          <div v-if="error.details" class="invalid-feedback">
            {{error.details}}
          </div>
        </div>
        <button class="el-button el-button--primary">提交</button>
        <button class="el-button el-button--default">
          <a href="javascript:history.go(-1)">返回</a>
        </button>
      </form>
    </div>
  </div>  
</template>

<script>
import UE from '../../components/common/ue.vue';
export default {
  name: "EditTopicDetails",
  components: {
    UE
  },
  data() {
    return {
      // temps:[],
      topicName:'',
      CataTopicList:'',
      selectCata:'',
      title: "",
      resCont:"",
      defaultMsg: '',
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
        toolbars:[["Bold","Underline","JustifyLeft","JustifyCenter","JustifyRight","ForeColor","Undo","Redo","FontFamily","FontSize","InsertImage","Emotion","InsertVideo","Link","Map",'Preview','inserttable','FullScreen']],
        //关闭左下角path路径提示
        elementPathEnabled : false
      },
      details:"",
      error: ""
    };
  },
  methods: {
    submit() {
      const newPost = {
        id:this.getUrl('id'),
        title: this.resCont.title,
        details:this.$refs.ue2.getContent(),
        topicCataId:this.selectCata,
        topicId:this.getUrl('topicId')
      };
      
      this.$axios
        .post("/api/admin/editTopicDetails", newPost)
        .then(res => {
          if(res.data.code==1000){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            setTimeout(()=>{
              this.$router.go(-1);
            },1500)
          }else if(res.data.code==400){
            this.dialog(res.datas.msg)
            return false
          }
        })
    },
    //获取内容
    getContent(){
      this.$axios.post("/api/admin/getTopicContent",{id:this.getUrl('id')})
      .then(res=>{
          if(res.data.code==1000){
              this.defaultMsg = res.data.data.details
              this.resCont = res.data.data
              this.selectCata = res.data.data.topicCataId
              // console.log(this.resCont.title)
          }else if(res.data.code==400){
              this.dialog(res.data.msg)
          }
      })
    },
    getCataTopicList(){
      this.$axios.post("/api/admin/getCataTopicList",{topicId:this.getUrl('topicId')})
      .then(res=>{
        if(res.data.code==1000){
          this.CataTopicList = res.data.data
          this.topicName = res.data.topicName
        }else if(res.data.code==400){
            this.dialog(res.data.msg)
        }
      })
    }
  },
  mounted(){
    this.getCataTopicList()
    this.getContent()
    $('.rightContainer').css({background:'#fff'})
    // $('body').css({background:'#fff'})
    
  }
};
</script>
<style scoped>
.EditTopicDetails{
  width:75%;
  padding-left:10px;
}
.EditTopicDetails .oks,.EditTopicDetails .oks:hover{
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















