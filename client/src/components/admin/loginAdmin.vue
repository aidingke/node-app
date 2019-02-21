<template>
    <div class="login">
      <div class="content" id="particles">
        <div class="large-header" style="height: 974px;">
        </div>
        <div id="large-header" class="loBox" >
          <div class="logo_box">
            <section class="form_container">
              <div class="manage_tip">
                  <span class="title">大前端在线后台管理系统</span>
              </div>
              <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm" label-width="60px">
                  <el-form-item label="邮箱" prop="email">
                      <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                      <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary"  @click="submitForm('loginForm')" class="submit_btn">登  录</el-button>
                  </el-form-item>
                  <!-- <div class="tiparea">
                      <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                  </div> -->
              </el-form>
            </section>
            
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import jwt_decode from "jwt-decode";
// import particles from 'particles.js'

export default {
  name: "login",
  data() {
    return {
      loginUser: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/admin/loginAdmin", this.loginUser).then(res => {
            if(res.data.code==1000){
              const { token } = res.data;
              localStorage.setItem("jwtToken", token);
              // 解析token
              const decode = jwt_decode(token);
              // console.log(decode);
              sessionStorage.setItem("userId",decode.id);
              // 更改status状态
              this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
              this.$store.dispatch("setUser", decode);
              // 页面跳转
              this.$router.push("/admin");
            }else if(res.data.code==400){
              this.dialog(res.data.msg)
            }else{
              alert('登录没成功!再试一次')
            }
            return false
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  },
  created() {
    // particlesJS.load('particles','../../../src/assets/particles.config.json');
    // this.$nextTick(function () {
    //   $('.particles-js-canvas-el').css({ position: "absolute", top: "0" });
    // })
  },
};
</script>

<style scoped>
.login {
  /* position: relative; */
  overflow: hidden;
  width: 100%;
  height: 100%;
  /* background: url(../assets/bg.jpg) no-repeat center center; */
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  /* top: 20%;
  left: 34%; */
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}



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
	background-image: url('../../../static/images/admin_img/login_bg.png');
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
	margin-left: -250px;
	margin-top: -215px;
  /* background: #fff; */
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


</style>


