<template>
   <div class="row">
    <div class="col-md-12">
      <div class="card card-body bg-info text-white mb-3">
        <div class="row">
          <div class="text-right prel boxface">
            <img class="rounded-circle pabs" :src="`/static/avatar/${profile.user.avatar}`" alt="" />
          </div>
        </div>
        <div class="text-left connectInfo">
          <h4 class="display-6 text-left"><i class="fas_a3 text-info mr-1"></i> {{profile.handle}}</h4>
          <p v-if='profile.status' ><i class="fas_a6 text-info mr-1"></i>{{profile.status}}</p>
          <p v-if='profile.company' ><i class="fas_a9 text-info mr-1"></i>{{profile.company}}</p>
          <p v-if="profile.location"><i class="fas_a7 text-info mr-1"></i>{{profile.location}}</p>
          <p class="aboutInfo">
            <i class="fas_a8 text-info mr-1"></i>
            <a v-if="profile.website" class="" target="_blank" :href="'http://'+profile.website">
              <!-- <i class="fas fa-globe fa-2x"></i> -->{{profile.website}}
            </a>
            <a v-if="profile.social && profile.social.wechat" class="" >
              <i class="fab fa-weixin fa-2x"></i>{{profile.social.wechat}}
            </a>
            <a v-if='profile.social && profile.social.QQ' class="">
              <i class="fab fa-qq fa-2x"></i>{{profile.social.QQ}}
            </a>
            <a v-if="profile.social && profile.social.tengxunkt &&fa==true" class=" p-2" :href="profile.social.tengxunkt">
              <i class="fab fa-facebook fa-2x"></i>
            </a>
            <a v-if='profile.social && profile.social.wangyikt &&fa==true' class=" p-2" :href="profile.social.wangyikt">
              <i class="fab fa-twitter fa-2x"></i>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profileHader",
  data(){
    return{
      fa:'false'
    }
  },
  props: {
    profile: Object
  }
};
</script>
<style scoped>
.bg-info{
  background: #D9EDF7!important;
  color: #555!important;
}
.boxface{
  width: 100%;
  height: 30px;
}
.rounded-circle{
  margin-top: 30px;
  top: 0;
  right: 5%;
  width:100px;
}
.connectInfo img{
  margin-top: -5px;
  margin-right: 3px;
}
.aboutInfo a{
  color: #555;
}
  /* .myresume{
    background: #fff;
    display: flex;
    flex-direction: column;
  }
  .student-info{
    width: 100%;
    padding: 40px 60px;
    box-sizing: border-box;
    border-bottom: 1px solid #c6cad1;
    display: flex;
    flex-direction: column;
    position: relative;
  }
.student-info .name {
    width: 100%;
    height: 0.5rem;
    font-size: 0.5rem;
    line-height: 0.5rem;
    font-weight: bold;
    color: #303133;
    margin-top: 0.35rem;
    margin-bottom: 0.77rem;
}
.student-info .concat li {
    margin-bottom: 0.33rem;
}
.myresume .item-container {
    padding: 0 0.6rem;
    color: #303133;
    border-bottom: 1px solid #c6cad1;
}
.myresume .item-container nav {
    padding-top: 0.48rem;
    padding-bottom: 0.7rem;
}
.myresume .item-container nav .title {
    font-size: 0.33rem;
    font-weight: bold;
}
  .education{
    padding-bottom:50px;
    display: flex;
    flex-direction: column;
  }
  .education .item {
    height: 0.28rem;
    line-height: 0.28rem;
    font-size: 0.3rem;
    margin-bottom: 0.52rem;
} */
</style>

