<template>
    <div class="MenuList">
        <div class="container">
            <listArticles :resData="resData" :artPage='artPage' :total="total" @goPage="goPage"/>
        </div>
    </div>
</template>

<script>
import listArticles from '../../components/common/listArticles'
export default {
    name: 'Mongodb',
    components: {
        listArticles
    },
    data() {
        return {
            resData: [],
            artPage:1,
            total:0,
            msgInfo:{
                num:0,
                pageNum:12,
                subjectId:0
            }
        };
    },
    // beforeRouteEnter(to, from, next) {
    //     next(vm => {
    //         vm.getList(to.params.id);
    //     });
    // },
    methods: {
        async goPage(x){
            //存储页码
            sessionStorage.setItem("monPage", x)

            // 0,3  /3,3
            let params={}
            params.subjectId = this.msgInfo.subjectId
            params.num = Number((x-1)*this.msgInfo.pageNum)
            params.pageNum =this.msgInfo.pageNum
            const res = await this.$axioss.getMenuList(params)
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
    mounted() {
        this.msgInfo.subjectId = this.$route.params.id
        // this.getList(this.$route.params.id)
        if(sessionStorage.getItem("monPage")){
            this.artPage = Number(sessionStorage.getItem("monPage"))
            this.goPage(sessionStorage.getItem("monPage"))
        }else{
            this.goPage(1)
        }
        $('footer').show()
    }
};
</script>
<style scoped>

</style>