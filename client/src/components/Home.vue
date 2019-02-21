<template>
  <div class="home">
    <div class="landing-inner text-light">
      <div class="container">
        <listArticles :resData="resData" :artPage='artPage' :total="total" @goPage="goPage"/>
      </div>
    </div>
  </div>
</template>

<script>
import listArticles from '../components/common/listArticles'
export default {
    name: "home",
    components: {
        listArticles
    },
  data() {
    return {
      resData:[],
      artPage:1,
      total:0,
      msgInfo:{
        num:0,
        pageNum:12
      }
    };
  },
  mounted() {
    $('footer').show()
    //用做登录验证,触发passport
    this.$axios.get("/api/users/flg")
    .then(res=>{
      if(res.data.code==1000){

      }
    })
  },
  computed: {
    isLogin() {
      if (this.$store.getters.isAutnenticated) return true;
      else return false;
    }
  },
  methods:{
    // async getList(){
    //   const res = await this.$axioss.getlistAlls(this.msgInfo)
		// 	if(res.status===404){
		// 		this.dialog('查询出错了')
		// 		return false
		// 	}else if(res.data.code===1000){
		// 		if(Object.keys(res.data.data).length==0){
		// 			this.resData = []
		// 			return false
		// 		}
    //     this.resData = res.data.data
    //     this.total = res.data.total
		// 	}
    // },
    async goPage(x){
      // 0,3  /3,3

      //存储页码
      sessionStorage.setItem("artPage", x)

      let params={}
      params.num = Number((x-1)*this.msgInfo.pageNum)
      params.pageNum =this.msgInfo.pageNum
      const res = await this.$axioss.getlistAlls(params)
			if(res.status===404){
				this.dialog('查询出错了')
				return false
			}else if(res.data.code===1000){
				if(Object.keys(res.data.data).length==0){
					this.resData = []
					return false
				}
        this.resData = res.data.data
        this.total = res.data.total
			}
    }
  },
  created() {
    if(sessionStorage.getItem("artPage")){
      this.artPage = Number(sessionStorage.getItem("artPage"))
      this.goPage(sessionStorage.getItem("artPage"))
    }else{
      this.goPage(1)
    }
    // this.getList();
  }
};
</script>

<style scoped>
img {
  width: 100%;
}

.landing {
  position: relative;
  background: url("../asserts/showcase.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  /* height: 100vh; */
  /* margin-top: -24px;
  margin-bottom: -50px; */
}

/* .landing-inner {
  padding-top: 30px;
}

.card-form {
  opacity: 0.9;
}

.latest-profiles-img {
  width: 40px;
  height: 40px;
}

.form-control::placeholder {
  color: #bbb !important;
}
.card a:hover{
  text-decoration: none;
} */

/* 下拉刷新 */

/* .scroll-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.fl {
  display: inline-block;
}
.fl img {
  vertical-align: middle;
  margin-right: 0.2rem;
} */
/* 下拉刷新 */
/* .pulldown,
.pullup {
  width: 100%;
  height: 50px;
  position: relative;
  color: #888;
}
.clear {
  padding: 10px 0px;
  font-size: 0.28rem;
  position: absolute;
  left: 50%;
  top: 5px;
  transform: translate(-50%, 0);
}

.list-donetip {
  text-align: center;
  line-height: 50px;
  font-size: 0.28rem;
} */
</style>

