<template>
  <div class="register">
    <div class="container">
      <div class="row hid">
        <div class="col-md-8 m-auto">
          <img src="../../static/images/login.png" alt="" style="display:block;width:150px;margin:0 auto">
          <h1 class="display-4 text-center">注册</h1>
          <p class="lead text-center">创建新的账户</p>
          <form @submit.prevent='submit' autocomplete="off" method="post">
           <TextField 
              type='text'
              name='name'
              placeholder="用户名"
              v-model="newUser.name"
              :error='errors.name'
           ></TextField>
            <TextField 
              type='email'
              name='email'
              placeholder="邮箱地址"
              v-model="newUser.email"
              :error='errors.email'
           ></TextField>
           <TextField 
              type='password'
              name='password'
              placeholder="密码"
              v-model="newUser.password"
              :error='errors.password'
           ></TextField>
           <TextField 
              type='password'
              name='password2'
              placeholder="确认密码"
              v-model="newUser.password2"
              :error='errors.password2'
           ></TextField>
            <input type="submit"  class="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>

      <div class="content" id="particles">
        <div class="large-header" style="height: 874px;">
        </div>
        <div id="large-header" class="loBox" >
          <div class="logo_box">
            <h3>创建新的账户</h3>
            <form @submit.prevent='submit' autocomplete="off" method="post">
              <div class="input_outer padBox30">
                <span class="u_user"></span>
                <TextField 
                  type='text'
                  name='name'
                  placeholder="用户名"
                  v-model="newUser.name"
                  :error='errors.name'>
                </TextField>
              </div>
              <div class="input_outer padBox30">
                <span class="us_uer"></span>
                <TextField 
                  type='email'
                  name='email'
                  placeholder="邮箱地址"
                  v-model="newUser.email"
                  :error='errors.email'>
                </TextField>
              </div>
              <div class="input_outer padBox30">
                <span class="us_uer"></span>
                <TextField 
                  type='password'
                  name='password'
                  placeholder="密码"
                  v-model="newUser.password"
                  :error='errors.password'>
                </TextField>
              </div>
              <div class="input_outer padBox30">
                <span class="us_uer"></span>
                <TextField 
                    type='password'
                    name='password2'
                    placeholder="确认密码"
                    v-model="newUser.password2"
                    :error='errors.password2'
                ></TextField>
                </div>
             <!-- <input type="submit"  class="btn btn-info btn-block mt-4" /> -->
             <input type="submit" class="btn  btn-primary btn-block mt-4" style="height:45px" />
            </form>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script>
import TextField from "./common/TextFieldGroup";
import particles from 'particles.js'

export default {
  name: "register",
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        password: "",
        password2: ""
      },
      errors: ""
    };
  },
  components: {
    TextField
  },
  mounted(){
    particlesJS.load('particles','../../static/particles.config.json');
  },
  methods: {
    async submit() {
        const res = await this.$axioss.register(this.newUser)
        // console.log(res);
	    if(res.data.code===1000){
            this.errors = ""; // 清空页面错误信息
            // alert("注册成功!");
            alert(res.data.msg)
            // this.$store.commit("setUser", res.data);
            this.$store.dispatch("setUser", res.data);
            this.$router.push("/login");
        }else if(res.data.code===400){
            alert(res.data.msg)
        }else{
            alert('注册没成功!再试一次')
        }
        // console.log(this.$store.getters.isAutnenticated);
        return false
    },
    // submit() {
    //   // console.log(this.$store.getters.isAutnenticated);
    //   // return false
    //   this.$axios
    //     .post("/api/users/register", this.newUser)
    //     .then(res => {
    //       console.log(res.data);
    //       this.errors = ""; // 清空页面错误信息
    //       alert("注册成功!");
    //       // this.$store.commit("setUser", res.data);
    //       this.$store.dispatch("setUser", res.data);
    //       this.$router.push("/login");
    //     })
    //     .catch(error => {
    //       if (error.response) {
    //         // 注册成功防止报错
    //         this.errors = error.response.data;
    //       }
    //       // alert(error.response.data);
    //     });
    // }
  }
};
</script>
<style scoped>
/* .register{
  margin:10% auto 20%;
}
@media (max-width: 768px) {
  .register{
    margin:20% auto 20%;
  }
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


