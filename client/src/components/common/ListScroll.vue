<template>
  <div class="listArticles container">
      <div class="content-wrap mt10">
          <div class="sidebarL listBox">
                <!-- 内容列表开始 -->
                <div class="row" v-for="(item, index) in resData" :key="index">
                    <div class="col-md-12 textPicR">
                        <h4>
                            <a :title="item.title" target="_blank" :href='"/artdetail?id="+item._id'>
                                <div class="title-info" v-html="item.title"></div>
                            </a>
                        </h4>
                        <div class="col-md-12">
                            <span v-for="(v,i) in item.imgs" :key="i">
                                <a :href='"/artdetail?id="+item._id' target="_blank">    
                                    <img alt="" :src="v" />
                                </a>
                            </span>
                        </div>
                        <p v-html="item.description" class="des">
                            
                        </p>  
                        <p>
                            <span style="float:right;margin-right:5px;"><i class="far fa-clock"></i> {{item.date.split(" ")[0]}}</span>
                            <!-- <img :src="'/static/avatar/'+item.user.avatar" style="width: 2rem;border-radius: 20px;"/> -->
                            <i class="fa fa-user"></i>{{item.user.name}} 
                        </p>  
                    </div>
                </div>
              <!-- 内容列表结束 -->
          </div>

        <div class="sidebarR listBox">
            <div class="mb15 rBox">
                <a href="javascript:;" target="_blank">
                    <img width="720" height="240" src="http://www.daqianduan.com/wp-content/uploads/2018/08/next-1.png"  style="max-width: 100%; height: auto;">
                </a>
            </div>    
            <div class="mb15 rBox">
                <a href="javascript:;" target="_blank">
                    <img width="720" height="240" src="http://www.daqianduan.com/wp-content/uploads/2018/08/next-1.png"  style="max-width: 100%; height: auto;">
                </a>
            </div> 
            <div class="mb15 rBox">
                <a href="javascript:;" target="_blank">
                    <img width="720" height="240" src="http://www.daqianduan.com/wp-content/uploads/2018/08/next-1.png"  style="max-width: 100%; height: auto;">
                </a>
            </div> 
        </div>
      </div>
  </div>
</template>
<script>

export default {
    name: "ListScroll",
    props: {
        resData: Array,
        total:Number
    },
    data() {
        return {
            
        }
    },
    created() {
        
    },
    methods: {

    }
}
</script>

<style scoped>
.listBox{padding: 0 8px 0 5px;background: #fff;border: 1px solid #eaeaea;box-shadow: -1px 1px 2px #eee;border-radius: 5px;}
.sidebarL{width: 69%;float:left;padding: 0;}
.sidebarR{width: 29%;display: inline-block;padding: 0;margin-left: 15px;box-shadow: none;border: none;background: none;}
.rBox{
    background: #fff;padding: 3px;box-shadow: 1px 1px 3px #ccc;
}
@media (max-width: 1000px) {
    .sidebarL{width: 100%;}
    .sidebarR{
        display: none;
    }
}
.imgShows{
    width:150px;display: inline-block;
}
.card a{
    color:#777;
    text-decoration: none;
}
.card a:hover{
    color:#333;
}

.listArticles .row {
    width: 100%;
    margin: 0;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
}
.listArticles .row:hover{
    background: #f9f9f9;
}
.textPicL {
    width: 28%;
    float: left;
    padding: 0;
}
.img-auto {
    display: block;
    overflow: hidden;
}

.img-auto img {
    width: 100%;
    height: auto;
    margin: 0px auto;
    transition: 600ms;
}
.textPicR {
    /* width: 72%; */
    padding: 0 0 0 10px;
}
.textPicR h4 {
    color: #333;
    word-wrap: break-word;
    font-size: 20px;
}
.textPicR p{
    line-height: 1.6;
    color: #888;
    word-wrap: break-word;
    font-size: 0.8em;
}
.textPicR img{
    width: 100px;
}
.textPicR a {
    color: #333;
    text-decoration: none;
}
.textPicR a:hover {
    color: #FFB600;
}


</style>
