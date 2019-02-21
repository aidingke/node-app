<template>
    <div class="post-form mb-3">
        <div class="card card-info">
            <div class="card-header bg-info text-white">
            私信...
            </div>
            <div class="card-body">
            <form @submit.prevent="submit">
              <template v-if="defaultMsg==''">
                <UE :defaultMsg="defaultMsg" :config="config1" ref="ue1" :id="ue1"></UE> 
              </template>   
                <!-- <TextArea
                    name="text"
                    placeholder="随便说点..."
                    v-model="text"
                    :error="errors.text"
                ></TextArea> -->
                <input type="submit" class="btn btn-dark" />
            </form>
            </div>
        </div>
    </div>
</template>

<script>
import TextArea from "../common/TextAreaGroup";
import UE from '../../components/common/ue.vue';

export default {
  name: "postform",
  data() {
    return {
      text: "",
      errors: "",
      defaultMsg: '',
      ue1: "ue1", // 不同编辑器必须不同的id
      config1: {
        initialFrameWidth: null,
        initialFrameHeight: 200,
        //让编辑器的编辑框部分可以随着编辑内容的增加而自动长高
        autoHeightEnabled:false,
        //启用编辑器工具栏浮动
        autoFloatEnabled: true,
        maximumWords:500, //允许的最大字符数 
        //定义工具栏
        toolbars:[["Source","Undo","Redo","Emotion"]],
        //关闭左下角path路径提示
        elementPathEnabled : false
      },
    };
  },
  components: {
    TextArea,UE
  },
  methods: {
    submit() {
      const user = this.$store.getters.user;
      const newPost = {
        // text: this.text,
        text:this.$refs.ue1.getContent(),
        name: user.name,
        avater: user.avater
      };

      // 添加评论
      this.$axios
        .post("/api/posts", newPost)
        .then(res => {
          this.errors = ""; // 清空错误提示
          this.defaultMsg = ""; // 清空文本
          this.$emit("update");
        })
        .catch(error => {
          this.errors = error.response.data;
        });
    }
  }
};
</script>

<style scoped>
  .card-body{
    position: sticky;
  }
</style>