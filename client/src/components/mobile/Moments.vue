<template>
  <div class="moments">
    <div class="container">  
        <!-- <listArticles :resData="resData"/>  -->
        <Scroll ref="refresh" @pulldown = "loadData" @pullup="loadMore">
            <div class="content_wrapper">
                <listArticles :resData="resData"/>
            </div>
        </Scroll>
    </div>
  </div>
</template>
<script>

import Scroll from '../../components/common/Scroll'
import listArticles from '../../components/common/listArticles'
export default {
    name: 'moments',
    components: {
        Scroll,
        listArticles
    },
    data() {
        return {
        resData: [],
        page: 1, // 加载更多从page2开始
        size: 5, // 每次请求3条数据
        loading: false
        };
    },
    computed: {

    },
    methods: {
        getList(){
            this.$axios(`/api/ideas/listsAll/${this.page}/${this.size}`)
                .then(res=>{
                var _this = this 
                res.data.forEach((v,i)=>{
                    v.description = this.repImgInfos(v.description)
                }) 
                // this.resData = res.data
                this.resData = [...res.data]
                //注册事件，解决重置问题,子组件  this.$on('refresh',this.reset
                this.$refs.refresh.$emit('refresh')
            })
        },
        loadData() {
            this.page = 1;
            this.getList();
        },
        loadMore() {
            if (this.loading) return;
            this.loading = true;
            if(this.page==1){
                this.page=2;
            }    

            this.$axios(`/api/ideas/listsAll/${this.page}/${this.size}`).then(res => {
                this.loading = false;
                // console.log(res.data);
                const result = [...res.data];
                // 遍历数组
                if (result.length > 0) {
                    result.forEach(item => {
                        this.resData.push(item);
                    });
                    // 自增page
                    this.page++;
                } else {
                    // 数组为空, 没有更多数据, 不在page自增
                    this.$refs.refresh.$emit('loadedDone');
                }
            });
        }
    },
    created() {
        this.getList();
        // this.dialog('222')
    },
    mounted(){
       
    }
};
</script>
<style scoped>
.moments{
    width: 100%;
    height: 100%;
    /* height: calc(100% - 50px); */
    padding-top: 50px;
    box-sizing: border-box;
    /* overflow: auto; */
}
.container {
  width: 100%;
  height:100%;
  padding: 10px 5px 5px 5px;
  overflow: auto;
}
</style>