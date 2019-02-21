<template>
    <div class="TopicDetail ">
        <div class="TopicLeftMenu fl" >
            <el-row class="menu_page">
                <el-col class="menuBar">
                    <el-menu
                        mode="vertical"
                        background-color="#F6F6F6"
                        text-color="#555"
                        active-text-color="#409eff" 
                        class="el-menu-vertical">
                        <div class="el-menu-item" style="background: transparent;">
                            <span style="color:#000;font-weight:900">{{topicName}}</span>
                        </div>

                        <div v-for="(v,i) in resData" :key="i" >
                            <el-submenu v-if="v.children" :index="(i+1).toString()">
                                <template slot="title">
                                    <i class="fas_a11"></i><span style="width:210px;overflow: hidden;display: inline-block;">{{v.cataName}}</span>
                                </template>
                                <el-menu-item-group v-for="(vv,ii) in v.children" :key="ii">
                                    <el-menu-item @click="getContent(vv.id)" :index="(i+1).toString()+'-'+(ii+1).toString()"><i class="el-icon-document"></i>{{vv.title}}</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu> 
                            <el-menu-item @click="getContent(v.id)" v-else :index="(i+1).toString()">
                                <span ><i class="el-icon-document"></i>{{v.cataName}}</span>
                            </el-menu-item>
                        </div>
                    </el-menu>
                </el-col>
            </el-row>
        </div>

        <div class="rightContainer fl" >
            <h2 class="bline p15">
                {{resCont.title}} 
                <span class="f12" style="color:#ccc;font-weight:300">{{resCont.date}}</span>
            </h2>
            <div class="defaultMsg" v-html="defaultMsg">
            </div>
        </div>
    </div>
</template>

<script>
// import LeftMenu from '@/components/common/LeftMenu'

export default {
    name: "TopicShow",
    data() {
        return {
            topicStatus:'0', //0所有权限，1可浏览不能复制，2可部分浏览
            topicName:'',
            cataName:'',
            defaultMsg:'',
            resCont:{},
            resData: [
                {
                    cataName: "管理",
                    path: "fud",
                    children: [{id:'1', title: "资金流水" }]
                },
                {
                    name: "管理",
                    path: "in",
                    children: [{id:'2', title: "个人信息" }]
                }
            ]
        };
    },
    methods:{
        getTopicCataAllList(){
            this.$axios.post("/api/admin/getTopicCataAllList",{topicId:this.$route.params.id})
            .then(res=>{
                if(res.data.code==1000){
                    this.topicName = res.data.topicName
                    this.resData = res.data.newList
                    this.getContent(this.resData[0].id)
                    this.topicStatus = res.data.topicStatus
                }
                if(this.topicStatus=='1'||this.topicStatus=='2'){
                    this.$nextTick(() => {
                        // 禁用右键
                        document.oncontextmenu = new Function("event.returnValue=false");
                        // 禁止复制
                        document.oncopy = function(){ return false; };
                        // 禁止剪切
                        document.oncut = function(){ return false; };
                        // 禁止粘贴
                        document.onpaste = function(){ return false; };

                        // // 禁用选择
                        // document.onselectstart = new Function("event.returnValue=false");
                    });
                }

            })
        },
        //获取分类
        getCataTopicList(){
            this.$axios.post("/api/admin/getCataTopicList",{topicId:this.$route.params.id})
            .then(res=>{
                if(res.data.code==1000){
                    if(Object.keys(res.data.data).length==0){
                        this.items = []
                        return false
                    }
                    this.items = res.data.data
                    this.topicName = res.data.topicName
                }else if(res.data.code==400){
                    this.dialog(res.data.msg)
                }
            })
        },
        //获取内容
        getContent(x){
            this.$axios.post("/api/admin/getTopicContent",{id:x})
            .then(res=>{
                if(res.data.code==1000){
                    this.defaultMsg = res.data.data.details
                    this.resCont = res.data.data
                    // console.log(this.resCont.title)
                }else if(res.data.code==400){
                    this.dialog(res.data.msg)
                }
            })
        },
        funOnCopy(){
            document.oncontextmenu = new Function("event.returnValue=true");
            // 禁止复制
            document.oncopy = function(){ return true; };
            // 禁止剪切
            document.oncut = function(){ return true; };
            // 禁止粘贴
            document.onpaste = function(){ return true; };
        }
    },
    mounted(){
        this.getTopicCataAllList()
        $('.TopicDetail').height(document.documentElement.clientHeight-140)
        $('.TopicLeftMenu').height(document.documentElement.clientHeight-140)
        $('.rightContainer').height(document.documentElement.clientHeight-140)
        $('footer').hide()
    },
    destroyed() {
      this.funOnCopy();
    },
};
</script>

<style scoped>

.fl{
    float: left;
}
.TopicDetail{
    width: 90%;
    display: flex;
}
.TopicLeftMenu{
    /* min-height: 800px; */
    flex-grow: 1;
}
.TopicLeftMenu .menuBar{
    /* min-height: 750px; */
    overflow-y: scroll;
    height: 100%;
    width: 102%;
}

.TopicLeftMenu .el-menu-item-group{
    overflow: hidden;
    padding-right: 0;
    margin-right: 0;
}
.TopicShow{
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: hidden;
}
.rightContainer{
    /* position: absolute;
    top: 3px;
    left: 301px; */
    width: 50%;
    flex-grow: 7;
    /* height: calc(100% - 71px); */
    overflow-y: scroll;
    padding: 10px;
    background: #fff;
    /* position: relative;
    top: 0;
    left: 180px;
    width: calc(100% - 180px);
    height: calc(100% - 71px);
    overflow: auto; */
}
.rightContainer .defaultMsg{
    font-size: 14px;
}
.TopicLeftMenu{
    width:280px;height:100%;overflow: hidden;
}
.menu_page {
    /* position: fixed;
    top: 80px;
    left: 150px; */
    min-height: 100%;
    /* background-color: #FAFAFA; */
    z-index: 99;
    /* overflow-y: scroll; */
    height: 99%;
}
.el-menu {
    border: none;
}
.fa-margin {
    margin-right: 5px;
}
.el-menu-vertical:not(.el-menu--collapse) {
    width: 288px;
    /* height: 800px; */
}
/* .el-menu-vertical {
    width: 35px;
} */
.el-submenu .el-menu-item {
    min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
    display: none;
}
.TopicShow .iconFolder{
    width: 18px;
    height: 15px;
    cursor: pointer;
}
.barBox{
    padding: 30px 15px 15px 15px;
    display: inline-block;
}
.rightContainer .page-bar {
    color: #333;
    /* position: fixed; */
    width: 100px;
}
.rightContainer .el-button{
    border: none;
}
.rightContainer .el-button--text{
    color: #409eff;
}
</style>
<style>
.TopicDetail .rightContainer img{
    max-width: 100%;
}
</style>