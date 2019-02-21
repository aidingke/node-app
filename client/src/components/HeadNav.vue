<template>
  <div>
  <div class="header">
      <div class="logo lf"><a href="" target="_blank"><span class="invisible">魅云安全文档管理系统</span></a></div>
        <div class="rt">
          <router-link to="/home">
            <div class="bt_tit tab_style white cut_line">
              魅云安全文档管理系统
            </div>
          </router-link>  
          <div class="style_but"></div>
        </div>
        <div class="colauto" style="overflow: visible">
          <div class="log white cut_line">您好!
          {{user.name}}
          
          <template v-if="user.status=='0'">
            (超级管理员)
          </template>
          <template v-if="user.status=='1'">
            (编辑)
          </template>
          <template v-if="user.status=='2'">
            (临时参观)
          </template>

          <span>|</span>			
          <a href="javascript:;" @click="logout">管理员退出</a>			
          <span>|</span>
          <a href="/" target="_blank" id="site_homepage">站点首页</a><span>|</span>
            <!-- 最后登录时间：2012-07-02 08:50:10 -->
          </div>		
          <ul id="top_menu" class="nav white">
            <li v-for="(item,index) in items" :key="index" :class="item.class">
              <a @click="goLink(item.path)"> <span>{{item.name}}</span> </a> 
              <!-- <template v-if="item.href">
                <a href="/artlist"> {{item.name}} </a> 
              </template>
              <template v-else>
                <router-link :to="item.path"> {{item.name}} </router-link> 
              </template> -->
            </li>
          </ul>		
        </div>
      </div>  
      <div class="cl"></div>
      <div>
        <div class="colleft left_menu">
          <div id="leftMain">
            <ul>
              <li v-for="(v,i) in childItem" :key='i'>
                <router-link :to="v.path"><span>{{v.name}}</span></router-link>
              </li>
            </ul>
          </div>
          <a href="javascript:;" id="openClose" style="height:500px;outline-style: none; outline-color: invert; outline-width: medium;" hideFocus="hidefocus" class="open" title="展开与关闭"><span class="hidden">展开</span></a>
        </div>
      </div>   
    </div>
</template>
<script>
export default {
  name: "head-nav",
  data(){
    return{
      items: [
        {
          class:'on',
          name: "首页",
          href:true,
          path: "admin",
          children:[
            {class:'on',name:'首页',path:'admin'},
          ]
        },
        {
          name: "文章管理",
          href:true,
          path: "adminArtlist",
          children:[
            {class:'on',name:'文章管理',path:'adminArtlist'},
            {name:'添加文章',path:'adminAddArticle'},
          ]
        },
        {
          name: "试卷管理",
          path: "adminAnswerList",
          children:[
            {class:'on',name:'成绩列表',path:'adminAnswerList'},
            {name:'试卷列表(考试用)',path:'adminStuTestPaperList'},
            {name:'新增试卷',path:'adminAddTestPaper'}
          ]
        },
        {
          name: "用户管理",
          path: "userList",
          children:[
            {name:'用户管理',path:'userList'},
          ]
        },
        {
          name: "专题",
          path: "topicList",
          children:[
            {class:'on',name:'专题列表',path:'topicList'},
            // {name:'添加专题',path:'addTopic'},
            // {name:'专题详情',path:'topicShow'},
          ]
        }
      ],
      childItem:[]
    }
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
    goLink(x){
      // console.log(x)
      // this.$store.dispatch("setpathInfo", {'path':x})
      this.$router.push({path:'/'+x})
      switch(x){
        case "admin":
          this.childItem = this.items[0].children
          break;
        case "adminArtlist":
          this.childItem = this.items[1].children
          break;
        case "adminAnswerList":
          this.childItem = this.items[2].children
          break; 
        case "userList":
          this.childItem = this.items[3].children
          break;  
        case "topicList":
          this.childItem = this.items[4].children
          break;   
      }
    },
    showInfoList() {
      // 个人信息
      this.$router.push("/infoshow");
    },
    logout() {
      // 清除token
      localStorage.removeItem("jwtToken");
      this.$store.dispatch("clearCurrentState");

      // 页面跳转
      this.$router.push("/loginAdmin");
    }
  },
  mounted(){
    $('#top_menu li').click(function(){
      $(this).addClass('on').siblings().removeClass('on')
    })
    //左侧开关
		$("#openClose").click(function(){
			if($(this).data('clicknum')==1) {
				$("html").removeClass("on");
				$(".left_menu").removeClass("left_menu_on");
				$(this).removeClass("close");
				$(this).data('clicknum', 0);
			} else {
				$(".left_menu").addClass("left_menu_on");
				$(this).addClass("close");
				$("html").addClass("on");
				$(this).data('clicknum', 1);
			}
			return false;
		});
    
    this.goLink(this.$route.name)
  }
};
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
/* .logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
} */
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>
