<template>
  <div class="create-profile">
    <div class="container">
        <div class="row">
            <div class="col-md-8 m-auto">
                <a class="btn btn-light" @click.prevent="$router.go(-1)">返回</a>
                <h1 class="display-4 text-center">创建个人资料</h1>
                <p class="lead text-center">填写您的个人资料, 让我们更多的了解你!</p>
                <small class="d-block pb-3">* 表示必填项</small>
               <form @submit.prevent="submit">
                 <TextField 
                  type='text'
                  name='handle'
                  placeholder="* Profile Handle"
                  v-model="msgInfo.handle"
                  :error='errors.handle'
                  info='此处的handle是在后端接口中需要用来查询数据的, 通常是写你email的名字'
                ></TextField>

                <SelectList
                  name='status'
                  :error='errors.status'
                  v-model="msgInfo.status"
                  :options='options'
                  info='请告知我们您目前所从事的岗位'
                ></SelectList>
                
                <TextField 
                  type='text'
                  name='company'
                  placeholder="公司"
                  v-model="msgInfo.company"
                  :error='errors.company'
                  info='可以是你自己的公司或者是你的在职公司'
                ></TextField>

                <TextField 
                  type='text'
                  name='website'
                  placeholder="网址"
                  v-model="msgInfo.website"
                  :error='errors.website'
                  info='你公司网址或者是你在职公司网址'
                ></TextField>

                <TextField 
                  type='text'
                  name='location'
                  placeholder="位置"
                  v-model="msgInfo.location"
                  :error='errors.location'
                  info='你所在的城市及所在区 (例如. 北京市昌平区)'
                ></TextField>

                <TextField 
                  type='text'
                  name='skills'
                  placeholder="编程语言技能"
                  v-model="msgInfo.skills"
                  :error='errors.skills'
                  info='请使用逗号隔开你所掌握的语言 (例如: HTML,CSS,JavaScript,PHP)'
                ></TextField>

                <TextField 
                  type='text'
                  name='githubusername'
                  placeholder="Github 用户名"
                  v-model="msgInfo.githubusername"
                  :error='errors.githubusername'
                  info='如果你希望将你的项目分享给大家, 可以填写你的github用户名'
                ></TextField>

               <!-- <TextArea
                placeholder="自我介绍"
                name='bio'
                v-model="msgInfo.bio"
                :error='errors.bio'
                info='简单介绍一下自己'
               ></TextArea> -->
                <UE :config="config1" ref="ue1" :id="ue1"></UE>
                
              
               <div class="mb-3">
                <button type="button" class="btn btn-light" 
                  @click="displaySocialInputs = !displaySocialInputs">添加社交账号</button>
                <span class="text-muted">选项</span>
               </div>
              
               <div v-show="displaySocialInputs">
                 <InputGroup
                  placeholder="微信公众号"
                  name='wechat'
                  v-model="msgInfo.wechat"
                  :error='errors.wechat'
                  icon='fab fa-weixin'
                 ></InputGroup>

                 <InputGroup
                  placeholder="QQ"
                  name='QQ'
                  v-model="msgInfo.QQ"
                  :error='errors.QQ'
                  icon='fab fa-qq'
                 ></InputGroup>

               </div>

                <input type="submit" class="btn btn-info btn-block mt-4" />
              </form>
            </div>
        </div>
    </div>
  </div>

</template>

<script>
import TextField from "./common/TextFieldGroup";
import TextArea from "./common/TextAreaGroup";
import SelectList from "./common/SelectListGroup";
import InputGroup from "./common/InputGroup";
import UE from '@/components/common/ue.vue';

export default {
  name: "create-profile",
  components: {
    TextField,
    TextArea,
    SelectList,
    InputGroup,
    UE
  },
  data() {
    return {
      ue1: "ue1", // 不同编辑器必须不同的id
      config1: {
        initialFrameWidth: null,
        initialFrameHeight: 500,
        //让编辑器的编辑框部分可以随着编辑内容的增加而自动长高
        autoHeightEnabled:false,
        //启用编辑器工具栏浮动
        autoFloatEnabled: true,
        maximumWords:20000, //允许的最大字符数 
        //定义工具栏
        toolbars:[["Undo","Redo","fontsize","bold","link","forecolor","Emotion"]],
        //关闭左下角path路径提示
        elementPathEnabled : false
      },
      msgInfo: {
        handle: "",
        company: "",
        website: "",
        location: "",
        status: "* 请选择您的职业",
        skills: "",
        githubusername: "",
        bio: "",
        social:{
          wechat: "",
          QQ: "",
        },
        tengxunkt: "",
        wangyikt: ""
      },
      options: [
        { label: "0", value: "* 请选择您的职业" },
        { label: "Junior Developer", value: "前端初级工程师" },
        { label: "Senior Developer", value: "前端中级工程师" },
        { label: "HighDeveloper", value: "前端高级工程师" },
        { label: "Manager", value: "全栈工程师" },
        { label: "backend Developer", value: "后端开发" },
        { label: "Python Developer", value: "Python工程师" },
        { label: "Other", value: "其他" }
      ],
      errors: "",
      displaySocialInputs: false
    };
  },
  created() {},
  methods: {
    submit() {

      if(this.msgInfo.social.wechat||this.msgInfo.social.QQ){
        this.msgInfo.social.wechat.toString();
        this.msgInfo.social.QQ.toString();
      }
      this.msgInfo.bio = this.$refs.ue1.getContent()
      this.$axios
        .post("/api/profile", this.msgInfo)
        .then(res => {
          this.errors = ""; // 清空页面错误信息
          this.$store.dispatch("setProfile", res.data);
          this.$router.push("/myresume");
        })
        .catch(error => {
          if (error.response.data) {
            this.errors = error.response.data;
          }
        });
    }
  }
};
</script>

<style>
</style>
