<template>
  <div class="login">
    <div class="container">
      <div class="row hid">
        <div class="col-md-8 m-auto">
          <img src="../../static/images/login.png" alt="" style="display:block;width:150px;margin:0 auto">
          <h1 class="display-4 text-center">登录</h1>
          <!-- <p class="lead text-center">使用已有的账户登录</p> -->
          <form @submit.prevent="submit" autocomplete="off" method="post ">
            <TextField 
            type='email'
            name='email'
            placeholder="邮箱地址"
            v-model="user.email"
            :error='errors.email'
           ></TextField>
           
            <TextField 
              type='password'
              name='password'
              placeholder="密码"
              v-model="user.password"
              :error='errors.password'
           ></TextField>
            <input type="submit" class="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>

      <div class="content" id="particles">
        <div class="large-header loginBox" style="height: 874px;">
        </div>
        <div id="large-header" class="loBox" >
          <div class="logo_box">
            <h3>欢迎你回来</h3>
            <form @submit.prevent="submit" autocomplete="off" method="post ">
              <div class="input_outer padBox30">
                <span class="u_user"></span>
                <!-- <input name="logname" class="text" style="color: #FFFFFF !important" type="text" placeholder="请输入账户"> -->
                <TextField type='email' name='email' placeholder="邮箱地址" v-model="user.email" :error='errors.email'>
                </TextField>
              </div>
              <div class="input_outer padBox30">
                <span class="us_uer"></span>
                <TextField type='password' name='password' placeholder="密码" v-model="user.password" :error='errors.password'>
                </TextField>
              </div>
              <!-- <div class="mb2"><a class="act-but submit" href="javascript:;" style="color: #FFFFFF">登录</a></div> -->
              <input type="submit" class="btn  btn-primary btn-block mt-4" style="height:45px" />
            </form>
            <p style="margin-top:30px;text-align:right;"> <router-link to="/resetPassword"> 找回密码</router-link> </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import TextField from "./common/TextFieldGroup";
// import "../../static/particles.min.js";
// import "../../static/particles.config.js";
import particles from 'particles.js'


export default {
  name: "login",
  data() {
    return {
      user: {
        email: "3@qq.cc",
        password: "000000"
      },
      errors: ""
    };
  },
  components: {
    TextField
  },
  mounted(){
    if(this.getUrl('password')=='reset'){
      this.user.email=this.getUrl('email')
      this.user.password=''
    }

    // $('footer').hide()
    particlesJS.load('particles','../../static/particles.config.json');
    this.$nextTick(function () {
      $('.particles-js-canvas-el').css({ position: "absolute", top: "0" });
    })
    // $('.loginBox').height(document.documentElement.clientHeight+110)
  },
  methods: {
    async submit() {
      const res = await this.$axioss.login(this.user)
      // console.log(res)
			if(res.data.code==1000){
        this.errors = ""; // 清空页面错误信息
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // 解析token
        const decode = jwt_decode(token);
        console.log(decode);
        sessionStorage.setItem("userId",decode.id);
        // 更改status状态
        this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
        this.$store.dispatch("setUser", decode);
        // 页面跳转
        this.$router.push("/");
      }else if(res.data.code==400){
        alert(res.data.msg)
      }else{
        alert('登录没成功!再试一次')
      }
      return false
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style scoped>
  /* .login{
    margin:5% auto 20%;
  }
  @media (max-width: 768px) {
  .login{
    margin:15% auto 20%;
  }
}
  footer{
      position: fixed;bottom: 0;width: 100%;
  } */

/* #particles{
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #b61924;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50% 50%;
} */


.container{
  width: 100%;
  max-width: 100%;
  padding: 0;
  overflow: hidden;
}
.loBox{
    position: absolute;
    z-index: 99;
    left: 50%;
    top: 50%;
}
.large-header {
	width: 100%;
	background: #333;
	overflow: hidden;
	background-size: cover;
	background-position: center center;
	z-index: 1;
}

.large-header {
  animation: mymove 20s;
	background-image: url('../../static/images/loginbg.jpg');
}
@keyframes mymove { 
	0% { transform:scale(1.2, 1.2)}
	100% {transform:scale(1, 1)}
}
.logo_box{
	width: 400px;
	height: 500px;
	padding: 35px;
	color: #EEE;
	position: absolute;
	left: 50%;
	top:50%;
	margin-left: -200px;
	margin-top: -150px;
  background: #fff;
}
.logo_box h3{
	text-align: center;
	height: 20px;
	font: 20px "microsoft yahei",Helvetica,Tahoma,Arial,"Microsoft jhengHei",sans-serif;
	height: 20px;
  line-height: 20px;
  color: #555;
	padding:0 0 55px 0; 
}
.forms{
	width: 280px;
	height: 485px;
}
.logon_inof{
	width: 100%;
	min-height: 450px;
	padding-top: 35px;
	position: relative;
}		
.input_outer{
	height: 46px;
	padding: 0 5px;
	margin-bottom: 30px;
	border-radius: 50px;
	position: relative;
	/* border:2px solid #ddd; */
}

.u_user{
	width: 25px;
	height: 25px;
	background: url("../../static/images/loginIco.png");
	background-position:  -10px 0;
	position: absolute;
	margin: 10px 13px;
}
.us_uer{
	width: 25px;
	height: 25px;
	background-image: url("../../static/images/loginIco.png");
	background-position: -10px -34px;
	position: absolute;
	margin: 10px 13px;
}
.l-login{
	position: absolute;
	z-index: 1;
	left: 50px;
	top: 0;
	height: 46px;
	font: 14px "microsoft yahei",Helvetica,Tahoma,Arial,"Microsoft jhengHei";
	line-height: 46px;
}
.text{
	width: 220px;
	height: 46px;
	outline: none;
	display: inline-block;
	font: 14px "microsoft yahei",Helvetica,Tahoma,Arial,"Microsoft jhengHei";
	margin-left: 50px;
	border: none;
  color: #555;
	background: none;
	line-height: 46px;
}
/*///*/
.mb2{
	margin-bottom: 20px
}
.mb2 a{
	text-decoration: none;
	outline: none;
}
.submit {
	padding: 15px;
	margin-top: 20px;
	display: block;
}
.act-but{
	line-height: 20px;
	text-align: center;
	font-size: 20px;
	border-radius: 50px;
	background: #0096e6;
}  
</style>


