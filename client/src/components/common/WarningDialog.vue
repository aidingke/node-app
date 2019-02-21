
<!-- 

* time: 2018-8-9
-->
<template>
    <div class="warning-dialog">
        <el-dialog :visible.sync="dialogTableVisible" center :show-close="false" top="35vh">
            <div class="content">
                <img src="static/images/waring.png" />
                <p class="text">{{warningText}}</p>
                <!-- <el-button plain @click="closeWarning()" v-if="!isJs")>知道了</el-button> -->
                <el-button plain @click="removeWarning()" v-if="isJs">知道了</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name:'WarningDialog',
        props:[
            'warningText',
            'dialogTableVisible'
        ],
        data() {
            return {
                isJs: false
            }
        },
        methods:{
            // 这个方法是组件里面调用时的事件
            closeWarning(){
                this.$emit('closeWarning')                   
            },
            // 这个方法是js文件里面调用是的事件
            removeWarning() {
                this.callback()
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el)
            }
        },
    }
</script>
<style>
.warning-dialog .content{
    text-align: center;
}
.warning-dialog .content img{
    width:50px;
    height:50px;
}
.warning-dialog .content .text{
    color: #000;
    font-size: 16px;
    font-weight: bold;
    margin: 20px 0;
}
.warning-dialog .content .el-button{
    padding: 15px 20px;
}
.warning-dialog .el-dialog{
    width: 45%;
}
</style>

