<template>
  <div class="Search">
        <div class="container">
            <ListScroll :resData="resData" :total="total" @goPage="goPage"/>
        </div>
  </div>
</template>

<script>
import ListScroll from '@/components/common/ListScroll'
import common from '@/utils/common'

export default {
    name: "Search",
    components: {
        ListScroll
    },
    data() {
        return {
            flag: true,
            resData:[],
            keyWords:'',
            total:0,
            num: 1 , //页码
            pageNum:13, //记录数
            count_page: '', // 数据总页数
        }
    },
    created() {

    },
    mounted() {
        // var url=encodeURI("/Search?query="+this.GetRequest().query)
        var url=encodeURI("/Search?query="+decodeURI(decodeURI(this.$route.query.query)))
        history.pushState('', '', url)
        // console.log(location.search)
        // location.search = '?query='+this.GetRequest().query
        this.goPage(this.num)
        this.scroll()
    },
    methods:{
        goPage(x){
            // 0,3  /3,3
            let params={}
            params.num = Number((x-1)*this.pageNum)
            params.pageNum =this.pageNum
            params.query = this.GetRequest("?query="+this.$route.query.query).query

            this.$axios.post("/api/ideas/Search",params)
            .then(res=>{
                if(res.data.code==1000){
                    if(Object.keys(res.data.data).length==0){
                        // this.$message({message: '暂无数据!'})
                        this.flag = false
                        return false
                    }

                    let keyWords = document.getElementById('seachModels').value
                    res.data.data.forEach(v=>{
                        let replaceReg = new RegExp(keyWords, 'gi');
                        // 高亮替换v-html值
                        let replaceString = '<span class="searchText">' + keyWords + '</span>';
                        // 开始替换
                        v.title = v.title.replace(replaceReg, replaceString);
                    })
  
                    this.count_page = (res.data.total % this.pageNum) == 0 ? parseInt(res.data.total / this.pageNum) : parseInt(res.data.total / this.pageNum + 1);
                    this.resData = [...this.resData,...res.data.data]
                    this.total = res.data.total
                }else if(res.status===400){
                    this.dialog('查询出错了')
                    return false
                }
            })
        },
        scroll (){
            common.scroll(()=>{
                if(this.flag){
                    if(this.num > this.count_page){
                        return
                    }else{
                        this.num++
                        this.goPage(this.num)
                    }
                }
            });
        }
    }
};
</script>

<style scoped>
    .Search{
        overflow: hidden;
        margin-bottom: 15px;
    }
    
</style>