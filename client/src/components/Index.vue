<template>
  <div class="index">
    <NavBar></NavBar> 
    <subMenu></subMenu>
    <router-view></router-view>
    <Footer v-if="this.isMobile()==false"></Footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import subMenu from '@/components/common/subMenu'
import Footer from "@/components/Footer"

export default {
  name: "index",
  components: {
    NavBar,subMenu,Footer
  },
  data(){
    return {
      user: {
        email: "",
        password: ""
      }
    }
  },
  created() {
    // const res = await this.$axioss.login(this.user)
    // console.log(this.$store.getters.isAutnenticated)
    
  },
};
</script>

<style >
@import '../../static/css/bootstrap.min.css';
@import '../../static/css/main.css';


/* html, body, #app {
  width: 100%;
  height: 100%;
} */
</style>

