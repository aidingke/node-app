<template>
  <div>
    <div class="floatBtn">
      <a href="javascript:" class="itemBtn scrollTop"><i class="el-icon-arrow-up"></i></a>
    </div>
    
    <footer class="bg-dark text-white p-4 text-center">
        Copyright &copy; 2018 全栈在线
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  mounted() {
    $(".scrollTop").on("click",function(){
      $('html,body').animate({scrollTop: '0px'}, 200);
    });
    $(window).scroll(function() {
      if($(window).scrollTop()>=$(window).height()/2){
        $(".floatBtn .scrollTop").css("display","inline-block");
      }else{
        $(".floatBtn .scrollTop").hide();
      }
    });
  },
};
</script>

<style scoped>
.floatBtn {
  position: fixed;
  right: 2%;
  bottom: 2%;
  font-size: 14px;
  width: 42px;
  color: #000;
  z-index: 500;
}
.floatBtn .scrollTop {
  display: none;
  background: #fff;
  color: #555;
  border: 1px solid #ddd;
  height: 60px;
  line-height: 60px;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  font-size: 50px;
}
.floatBtn .scrollTop:hover i::before{
  color: #45BCF9
}
</style>