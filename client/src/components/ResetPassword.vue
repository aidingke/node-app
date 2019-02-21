<template>
  <div class="login">
    <div class="container">
        <div class="content" id="particles">
            <div class="large-header loginBox" style="height: 874px;">
            </div>
            <div id="large-header" class="loBox" >
                <div class="logo_box">
                    <h3>发送邮件找回密码</h3>
                    <form @submit.prevent="submit" autocomplete="off" method="post ">
                    <div class="input_outer padBox30">
                        <span class="u_user"></span>
                        <!-- <input name="logname" class="text" style="color: #FFFFFF !important" type="text" placeholder="请输入账户"> -->
                        <TextField type='email' name='email' placeholder="邮箱地址" v-model="user.email" :error='errors.email'>
                        </TextField>
                    </div>
                    <input type="submit" class="btn  btn-primary btn-block mt-4" style="height:45px" />
                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import TextField from "./common/TextFieldGroup";
import particles from 'particles.js'


export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      errors: ""
    };
  },
  components: {
    TextField
  },
  mounted(){
		// console.log(location.host)
    particlesJS.load('particles','../../static/particles.config.json');
    this.$nextTick(function () {
      $('.particles-js-canvas-el').css({ position: "absolute", top: "0" });
    })
  },
  methods: {
        submit() {
            this.$axios.post("/api/users/nodemail",{email:this.user.email,thost:location.host})
            .then(res=>{
                if(res.data.code==1000){
                    this.$message({message:res.data.msg,type:'success'})
                }else if(res.data.code===400){
                    this.dialog(res.data.msg)
                    return false
                }
            })
            return false
        }
    }
};
</script>
<style scoped>
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
	background-image: url('../../static/images/admin_img/login_bg.png');
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
.padBox30{
    padding-bottom: 50px;
}
</style>


