<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
      <div class="navBox container">
        <!-- <a class="navbar-brand" href="landing.html">掘金在线</a> -->
        <div class="navSubL" >
          <router-link @click.native="clearInput" to='/' class="navbar-brand navbarLink" style="font-weight:900;color:#fff;">
            <!-- <img src="../../static/images/logo.png" class="logo"/> -->
            大前端
          </router-link>
          <template v-if="user">
            <router-link @click.native="clearInput" to='/profiles' class="nav-link navbarLink" v-if="user.status=='0'||user.status=='1'||user.status=='2'">开发者</router-link>
          </template>
          <router-link @click.native="clearInput" to='/testPaper' class="nav-link navbarLink" >前端试题集合</router-link>
          <router-link to="/topicLis" style="color:#fff;">专题(new)</router-link>
          <div class="searchBox" style="margin-left:8px;">
            <el-input placeholder="请输入内容" id="seachModels" @keyup.enter.native="seachModelFun" v-model="seachModel" class="input-with-select">
              <el-button icon="el-icon-search" slot="append" @click.native="seachModelFun"></el-button>
            </el-input>
          </div>
        </div>
        <div class="container navSubR">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse " id="mobile-nav">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <!-- <a class="nav-link" href="profiles.html"> 掘金在线
                </a> -->
                <!-- <router-link to='/profiles' class="nav-link">开发者</router-link> -->
              </li>
            </ul>

            <ul class="navbar-nav ml-auto">
              <template v-if="isLogin">
                
                <li class="nav-item dropdown UserMenu">
                  
                  <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" id="navbarDropdownMenuLink">
                    <!-- 【{{user.name}}】分享的文章 -->
                    <template v-if="isLogin">
                      <span style="position: absolute;right: 63px;top: 12px;width: 120px;">{{user.name}}</span>
                      <span style="position: absolute;right: 15px;top: 0;">
                        <!-- <a style="color:#fff;" :href='"/setavator?userId="+user.id' class="nav-link"> -->
                        <span style="color:#fff;" class="nav-link" v-bind:to="'/setavator?userId='+user.id">
                          <img :src="'/static/avatar/'+user.avatar" style="width: 2rem;border-radius: 20px;"/>
                        </span>
                      </span>
                    </template>
                  </a>
                  <div class="dropdown-menu">
                    <router-link @click.native="clearInput" tag="a" to="/artlist" class="dropdown-item">专栏</router-link>
                    <router-link @click.native="clearInput" tag="a" to="/artadd" class="dropdown-item">添加</router-link>
                    <!-- <router-link tag="a" to='/feed' class="dropdown-item">留言</router-link> -->
                    <router-link @click.native="clearInput" tag="a" to='/myresume' class="dropdown-item">我的简历</router-link>
                    <router-link @click.native="clearInput" v-bind:to="'/setavator?userId='+user.id" class="dropdown-item">修改头像</router-link>
                    <!-- <a href="/artlist" class="dropdown-item">文章</a>
                    <a href="/artadd" class="dropdown-item">添加</a>
                    <a href='/feed' class="dropdown-item">留言</a>
                    <a href='/myresume' class="dropdown-item">myresume</a> -->
                  </div>
                </li>    
              </template>  
              <li class="nav-item" v-show="!isLogin">
                <router-link @click.native="clearInput" to='/register' class="nav-link">注册</router-link>
              </li>
              <li class="nav-item" v-show="!isLogin">
                <router-link @click.native="clearInput" to='/login' class="nav-link">登录</router-link>
                <!-- <a class="nav-link" href="login.html">登录</a> -->
              </li>
              <li v-if="user !== null" class="nav-item" v-show="isLogin">
                <a @click.native="clearInput" class="nav-link" @click.prevent='logout'>
                  <!-- <img  class="rounded-circle headerImg" :src="user.avatar" :alt="user.name"> -->
                  退出</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    <!-- <p style="color:#fff">{{user}}</p> -->
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      userId:         '',
      seachModel:     '',
      mpath:          '',
      // baseImg:              
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isAutnenticated;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    clearInput(){
      if(this.mpath == this.$route.path){
        // console.log('相同')
        return
      }else if(this.mpath !==this.$route.path){
        // console.log('不相同')
        this.mpath = this.$route.path
        this.seachModel=''
        sessionStorage.setItem("artPage", 1)
        sessionStorage.setItem("froPage", 1)
        sessionStorage.setItem("vuePage", 1)
        sessionStorage.setItem("nodePage", 1)
      }
      
    },
    logout() {
      // 删除ls
      localStorage.removeItem("jwtToken");
      // 干掉请求头
      // this.$store.dispatch("setIsAutnenticated", false);
      this.$store.dispatch("clearCurrentState");
      //清空session
      sessionStorage.setItem("userId",'');
      // 跳转登录
      // this.$router.push("/login");
      location.href
    },
    seachModelFun(){
      if(this.seachModel.length==0){
        return false
      }else{
        var url=encodeURI(encodeURI(this.seachModel));
        // this.$store.dispatch("test1", decodeURI(decodeURI(this.$route.query.query)));

        window.location.href ="/Search?query="+url;
        // this.$router.push({path:"/Search",query:{query:url}})
        
      }
    }
  },
  created() {
    // this.userId = this.user.id
    // console.log(this.userId)
    // console.log(this.getUrl('avatar'))
    // this.seachModel = this.getUrl('query')
    // if(this.$route.path=='/Search'){
    //   this.seachModel = this.getUrl('query')
    // }
    // this.seachModel = this.getUrl('query')

    if(this.$route.query.query){
      this.seachModel = decodeURI(decodeURI(this.$route.query.query))
    }
    
    if(sessionStorage.getItem("avatar")){
      //分发改变vueX值
      this.$store.dispatch('setUserAvatar',sessionStorage.getItem("avatar"))
      // console.log(this.$store.getters.user)
    }
  }
};
</script>

<style scoped>
.bg-primary {
  background-color: #45BCF9!important;padding-left: 0;
}
.logo{
  width: 100px;
}
.navBox{
  text-indent: 5px;
  /* width: 1002px;margin: 0 auto; */
} 
.dropdown-menu{
  left: -60px;
}
.searchBox{
  width:40%;display: inline-block;
}
/* .navbar{height: 65px;overflow: hidden;  } */
@media (max-width: 768px) {
  .navbar{
    padding-top: 12px;
  }
  .searchBox{
    display: none;
  }
  .dropdown-menu{
    margin-left: -100%;
    
  }
}
.navSubL{
  width: 67%;display: inline-block;margin-top: 6px;
}
.navSubR{
  width: 30%;text-align: right;float: right;
}
.navbarLink{
  color: #eee;display: inline-block;margin-right: 0;padding:0 3px 0px 3px;font-size: 16px;
}
.UserMenu{
  text-align: right;position: relative;
}
.nav-item{
  text-align: right;margin-right: 15px;
}
.dropdown-toggle::after{
  vertical-align: middle;
}
.headerImg {
  width: 25px;
  margin-right: 5px;
}
.navBox .active{
    font-weight: 900;
    color: #fff;
}
</style>

