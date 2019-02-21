<template>
  <div class="IdeasAdd">
    <div class="AddTopicDetails">
      <div class="fillcontain">
        <div class="crumbs">
          当前位置：<span id="current_pos"></span>
        </div>
        <div class="form">
          <div class="headBox" style="padding:15px 0">
            <h3 class="head-title" style="display: inline;">
              分类：<b>{{topicName}}</b>
            </h3>

            <div style="margin-top: 15px;">
              <el-select v-model="selectCata" slot="prepend" placeholder="请选择">
                <el-option v-for="(v,i) in CataTopicList" :label="v.cataName" :value="v._id" :key="i"></el-option>
              </el-select>
            </div>

          </div>

          <div class="form-group">
            <el-input v-model="title" type="text" :class="{'is-invalid': error.title}" name="title" placeholder="标题"></el-input>
            <div v-if="error.title" class="invalid-feedback">
              {{error.title}}
            </div>
          </div>

          <div class="form-group">
            <h3 for="details">详情</h3>
            <UE :defaultMsg="defaultMsg" :config="config2" ref="ue2" :id="ue2"></UE>

            <div v-if="error.details" class="invalid-feedback">
              {{error.details}}
            </div>
          </div>
          <p class="bk6"></p>
          <button @click="submit" class="el-button el-button--primary">提交</button>
          <!-- <button @click="changeWin" class="el-button el-button--default">刷新</button> -->
        </div>
      </div>
      <div class="topicDetails" v-if="linkUrl">
        <iframe :src="linkUrl"  width="90%" height="100%" style="border:none"></iframe>
      </div>
    </div>  
  </div>  
</template>

<script>
import UE from '../../components/common/ue.vue';
export default {
  name: "IdeasAdd",
  components: {
    UE
  },
  data() {
    return {
      // temps:[],
      linkUrl:'',
      topicName:'',
      CataTopicList:'',
      selectCata:'',
      title: "",
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
        title: this.title,
        details:this.$refs.ue2.getContent(),
        topicCataId:this.selectCata,
        topicId:this.getUrl('topicId')
      };
      
      this.$axios
        .post("/api/admin/addTopicDetails", newPost)
        .then(res => {
          if(res.data.code==1000){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.changeWin()
          }else if(res.data.code==400){
            this.dialog(res.data.msg)
            return false
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
    },
    changeWin(){
      this.linkUrl = ''
      setTimeout(()=>{
        this.linkUrl = `/topicShow?hid=hid&&id=`+this.getUrl('topicId')
      },500)
    }
  },
  mounted(){
    this.getCataTopicList()
    this.changeWin()
    // $('.rightContainer').css({background:'#fff'})
    // $('body').css({background:'#fff'})
    
  }
};
</script>
<style scoped>
.AddTopicDetails{
  display:flex;
  background: #fff;
}
.AddTopicDetails .fillcontain{
  /* flex-grow:1; */
  width: 720px;
}
.AddTopicDetails .topicDetails{
  flex-grow:1;
}
.IdeasAdd{
  /* width:50%; */
  padding-left:10px;
}
.IdeasAdd .oks,.IdeasAdd .oks:hover{
  color:red;
}
.invalid-feedback{
  display: block;
}
.form-group{
  width:98%;
}
.btn-primary{

}
</style>















