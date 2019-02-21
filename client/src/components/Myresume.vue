<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12" >
            <h1 class="display-4">我的简历</h1>
            <!-- {{user}} -->
            <p class="lead text-muted" v-if="user != null">
              Welcome 
              <a v-if="profile == null" >{{user.name}}</a>
              <router-link v-else 
              :to="{name: 'profile', params:{handle: profile._id}}">
              {{profile.handle}}</router-link>
              </p>
            <div v-if='profile !== null'>
              <!-- 路由按钮 -->
              <ProfileActived :handle="profile._id"></ProfileActived>
              
              <!-- 个人履历 -->
              <Experience 
                :experience="profile.experience" :id="profile._id"
                @deleteExperience= "deleteExperience"
              ></Experience>

              <!-- 教育经历 -->
              <Education
                :education="profile.education" :id="profile._id"
                @deleteEducation="deleteEducation"
              ></Education>

              <!-- 删除账户按钮 -->
              <div style="margin-bottom: 60px;">
                <button class="btn btn-danger" @click="deleteClick">
                  删除当前账户
                </button>
              </div>
            </div>

            <div v-else>
              <p>没有任何任何相关的个人信息，请添加一些您的个人信息</p>
              <router-link to='/create-profile' class="btn btn-lg btn-info">添加个人信息</router-link>
            </div>
            
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import ProfileActived from "./common/ProfileActived";
import Experience from "./common/Experience";
import Education from "./common/Education";

export default {
  name: "dashboard",
  data() {
    return {
      profile: null // 存储用户个人信息
    };
  },
  components: {
    ProfileActived,
    Experience,
    Education
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    // this.getProfileData();
    // console.log(this.getUrl('avatar'))
    // if(this.getUrl('avatar')){
    //   //分发改变vueX值
    //   this.$store.dispatch('setUserAvatar',this.getUrl('avatar'))
    //   console.log(this.$store.getters.user)
    // }
    if(this.getUrl('avatar')){
      //分发改变vueX值
      sessionStorage.setItem("avatar",this.getUrl('avatar'))
      this.$store.dispatch('setUserAvatar',this.getUrl('avatar'))
    }
   
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getProfileData();
      document.title="简历中心"
    });
  },
  methods: {
    async getProfileData() {
      const res = await this.$axioss.profile()
      if(res.data.code==1000){
        this.profile = res.data.profile;
        // 更新store
        this.$store.dispatch("setProfile", res.data);
      }else if(res.data.code==400){
        this.profile = null;
        // alert(res.data.msg)
        // 更新store
        this.$store.dispatch("setProfile", null);
      }else{
        
      }
      return false

      // // 请求数据
      // this.$axios("/api/profile")
      //   .then(res => {
      //     console.log(res.data);
      //     this.profile = res.data;

      //     // 更新store
      //     this.$store.dispatch("setProfile", res.data);
      //   })
      //   .catch(error => {
      //     this.profile = null;
      //     // 更新store
      //     this.$store.dispatch("setProfile", null);
      //   });
    },
    deleteClick() {
      this.$axios
        .delete("/api/profile")
        .then(res => {
          this.profile = null;
          // 更新store
          this.$store.dispatch("clearCurrentState");
          this.$router.push("/login");
        })
        .catch(error => {
          alert(error.response.data);
        });
    },
    deleteExperience(id) {
      this.$axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => {
          console.log(res.data);
          this.profile = res.data;
        })
        .catch(error => {});
    },
    deleteEducation(id) {
      this.$axios
        .delete(`/api/profile/education/${id}`)
        .then(res => {
          console.log(res.data);
          this.profile = res.data;
        })
        .catch(error => {});
    }
  }
};
</script>

<style>
</style>
