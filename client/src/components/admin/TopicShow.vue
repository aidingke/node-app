<template>
    <div class="TopicShow">
        <!-- <LeftMenu></LeftMenu> -->
        <div class="TopicLeftMenu fl" >
            <el-row class="menu_page">
                <el-col>
                    <!-- :default-openeds="open_list" -->
                    <el-menu
                        mode="vertical"
                        background-color="#FAFAFA"
                        text-color="#555"
                        active-text-color="#409eff" 
                        @open="handleOpen"
                        class="el-menu-vertical">
                        <div class="el-menu-item" style="background: transparent;">
                            <span style="text-align:right;display: block;">
                                <i @click="addTopDetails" class="el-icon-plus el-tooltip item" style="margin-right:20px"></i>
                                <i @click="addTop" class="el-icon-news"></i>
                            </span>
                        </div>
                        <div class="el-menu-item" style="background: transparent;">
                            <span style="color:#000;font-weight:900">{{topicName}}</span>
                        </div>

                        <div v-for="(v,i) in resData" :key="i" >
                            <el-submenu v-if="v.children" :index="(i+1).toString()">
                                <template slot="title">
                                    <span >{{v.cataName}}</span>
                                </template>
                                <el-menu-item-group v-for="(vv,ii) in v.children" :key="ii">
                                    <el-menu-item @click="getContent(vv.id)" :index="(i+1).toString()+'-'+(ii+1).toString()">{{vv.title}}</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu> 
                            <el-menu-item @click="getContent(v.id)" v-else :index="(i+1).toString()">
                                <span >{{v.cataName}}</span>
                            </el-menu-item>
                        </div>
                    </el-menu>
                </el-col>
            </el-row>
        </div>

        <div class="rightContainer fl">
            <h3 class="f20 bline p15">{{resCont.title}} <span class="f12" style="color:#ccc;font-weight:300">{{resCont.date}}</span></h3>
            <div class="defaultMsg" v-html="defaultMsg">
            </div>
        </div>
        <div class="barBox">
            <div class="page-bar">
                <ul>
                    <li>
                        <router-link :to="'/editTopicDetails?id='+resCont._id+'&&topicId='+topicId">
                            <el-button type="button" icon="el-icon-edit"></el-button>
                        </router-link>
                    </li>
                    <li><el-button @click="deleTopicDetail(resCont._id)" type="button" icon="el-icon-delete"></el-button></li>
                </ul>
            </div>
        </div>

        <el-dialog title="添加分类" :visible.sync="dialogFormVisible" style="width:900px;">
            <el-form>
                <el-form-item label="">
                    
                </el-form-item>
                <el-form-item label="分类名称">
                <el-input v-model="cataName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitTopic">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
// import LeftMenu from '@/components/common/LeftMenu'

export default {
    name: "TopicShow",
    data() {
        return {
            dialogFormVisible: false,
            // open_list: ["1"],
            topicName:'',
            topicId:'',
            cataName:'',
            defaultMsg:'',
            resCont:{},
            resData: [
                {
                    cataName: "资金管理",
                    path: "fund",
                    children: [{id:'1', title: "资金流水" }]
                },
                {
                    name: "信息管理",
                    path: "info",
                    children: [{id:'2', title: "个人信息" }]
                }
            ]
        };
    },
    methods:{
        handleOpen(key, keyPath) {
        },
        addTopDetails(){
            // <router-link :to="{name:'/pathRouter',query: {path: url}}"></router-link>
            this.$router.push({path:'/AddTopicDetails',query:{topicId:this.getUrl('id')}})
        },
        addTop(){
            this.dialogFormVisible=true
        },
       
        submitTopic(){
            let params={cataName:this.cataName,topicId:this.getUrl('id')}
            this.$axios.post("/api/admin/addCataTopic",params)
                .then(res=>{
                if(res.data.code==1000){
                    // this.goPage(1)
                    this.dialogFormVisible=false
                    this.getTopicCataAllList()
                }
            })
        },
        getTopicCataAllList(){
            this.$axios.post("/api/admin/getTopicCataAllList",{topicId:this.getUrl('id')})
            .then(res=>{
                if(res.data.code==1000){
                    this.topicName = res.data.topicName
                    this.resData = res.data.newList
                    this.getContent(this.resData[0].id)
                }
            })
        },
        //获取分类
        getCataTopicList(){
            this.$axios.post("/api/admin/getCataTopicList",{topicId:this.getUrl('id')})
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
        deleTopicDetail(x) {
            this.$confirm("确定要删除此数据吗?", "提示", {
                cancelButtonText: "取消",
                confirmButtonText: "确定"
            })
            .then(() => {
                this.$axios.delete(`/api/admin/deleTopicDetail/${x}`)
                    .then(res=>{
                        if(res.data.code==1000){
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'success'
                            })
                            this.getTopicCataAllList()
                        }else if(res.data.code==400){
                            this.dialog(res.data.msg)
                        }
                    })
                    .catch(error =>{
                        this.error = error.response.data.msg;
                        console.log(this.error)
                        this.$message.error('错了哦，请再试一次');
                    })
            })
            .catch(() => {
                this.$message({
                type: "info",
                message: "已取消删除"
                });
            });
        }
    },
    mounted() {
        console.log(this.getUrl('hid'))
        if(this.getUrl('hid')=='hid'){
            console.log(222)
            $('.header').hide()
        }
    },
    created(){
        this.topicId = this.getUrl('id')
        this.getTopicCataAllList()
        // this.getCataTopicList()
    }
};
</script>

<style scoped>
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
    height: calc(100% - 71px);
    overflow: auto;
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
    width: 300px;height:100%;overflow: hidden;
}
.menu_page {
    /* position: fixed;
    top: 80px;
    left: 150px; */
    min-height: 100%;
    background-color: #FAFAFA;
    z-index: 99;
    overflow-y: scroll;
    height: 99%;
}
.el-menu-item{

}
.el-menu {
    border: none;
}
.fa-margin {
    margin-right: 5px;
}
.el-menu-vertical:not(.el-menu--collapse) {
    width: 295px;
    min-height: 400px;
}
.el-menu-vertical {
    width: 35px;
}
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
/* .TopicShow .rightContainer{
    background: #fff;
} */
.TopicShow .rightContainer img{
    max-width: 100%;
}
</style>