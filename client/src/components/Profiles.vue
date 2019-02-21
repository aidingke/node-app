<template>  
    <div class="profiles">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1 class="display-4 text-center">开发者们</h1>
                    <p class="lead text-center">开源！让世界更加丰富多彩！</p>

                    <!-- Profile Item -->
                    <ProfileItem 
                      v-if="profiles.length>0" 
                      v-for="profileItem in profiles"
                      :key="profileItem._id"
                      :profileItem = 'profileItem'
                      ></ProfileItem>
                      
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileItem from "./common/ProfileItem";
export default {
  data() {
    return {
      profiles: []
    };
  },
  components: {
    ProfileItem
  },
  created() {
    this.getProfiles();
  },
  methods: {
    async getProfiles() {
      const res = await this.$axioss.profiles()
      if(res.data.code==1000){
        this.profiles = res.data.profiles;
        this.$store.dispatch("setProfile", res.data);
      }else if(res.data.code==400){
        alert(res.data.msg)
        // 失败数据清空
        this.profiles = [];
        this.$store.dispatch("setProfile", []);
      }else{
        // 失败数据清空
        this.profiles = [];
        this.$store.dispatch("setProfile", []);
      }
      return false

      // this.$axios
      //   .get("api/profile/all")
      //   .then(res => {
      //     // console.log(res.data);
      //     this.profiles = res.data;
      //     this.$store.dispatch("setProfile", res.data);
      //   })
      //   .catch(error => {
      //     // 失败数据清空
      //     this.profiles = [];
      //     this.$store.dispatch("setProfile", []);
      //     // console.log(error.response.data);
      //   });
    }
  }
};
</script>

<style scoped>
  .container{
      margin-bottom: 8%;
  }
</style>
