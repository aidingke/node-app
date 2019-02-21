<template>
    <div class="subMenu">
        <div class="subBox container">
            <ul>
                <li style="margin-left:5px;padding-left:0">我的关注：</li>

                <li v-for="(v,i) in resData" :key="i">
                    <template v-if="v.subjectName=='web前端'">
                        <router-link @click.native="seachModelFun" :to='"/frontend/"+v._id'>    
                            {{v.subjectName}}
                        </router-link>
                    </template>
                    <template v-if="v.subjectName=='vuejs'">
                        <router-link @click.native="seachModelFun" :to='"/vuejs/"+v._id'>    
                            {{v.subjectName}}
                        </router-link>
                    </template>
                    <template v-if="v.subjectName=='reactjs'">
                        <router-link @click.native="seachModelFun" :to='"/reactjs/"+v._id'>    
                            {{v.subjectName}}
                        </router-link>
                    </template>
                    <template v-if="v.subjectName=='nodejs'">
                        <router-link @click.native="seachModelFun" :to='"/nodejs/"+v._id'>    
                            {{v.subjectName}}
                        </router-link>
                    </template>
                    <template v-if="v.subjectName=='mongodb'">
                        <router-link @click.native="seachModelFun" :to='"/mongodb/"+v._id'>    
                            {{v.subjectName}}
                        </router-link>
                    </template>
                </li>
               <!--  <li v-for="(v,i) in resData" :key="i">
                    <router-link :to='"/frontend/"+v._id' @click="goUrl(v._id)">    
                        {{v.subjectName}}
                    </router-link>
                    <a :href="'/menuList?id='+v._id" :class="{'active':tempID==v._id}">{{v.subjectName}}</a> -->
                    <!-- <span @click="goLink(v._id)" :class="{'active':v.status==1}">{{v.subjectName}}</span> 
                </li>-->
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'subMenu',
    data () {
        return {
            resData:[],
            mpath:  '',
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        seachModelFun(){
            $('#seachModels').val('')
            sessionStorage.setItem("artPage", 1)
            sessionStorage.setItem("froPage", 1)
            sessionStorage.setItem("vuePage", 1)
            sessionStorage.setItem("nodePage", 1)
            // if(this.mpath == this.$route.path){
            //     // console.log('相同')
            //     sessionStorage.setItem("artPage", 1)
            //     sessionStorage.setItem("froPage", 1)
            //     sessionStorage.setItem("vuePage", 1)
            //     sessionStorage.setItem("nodePage", 1)
            //     return
            // }else if(this.mpath !==this.$route.path){
            //     // console.log('不相同')
            //     this.mpath = this.$route.path
            //     $('#seachModels').val('')
            //     sessionStorage.setItem("artPage", 1)
            //     sessionStorage.setItem("froPage", 1)
            //     sessionStorage.setItem("vuePage", 1)
            //     sessionStorage.setItem("nodePage", 1)
            // }
        },
        goLink(x){
            sessionStorage.setItem("menuId",x)
            event.target.parentNode.parentNode.getElementsByClassName('active')[0].classList.remove("active")
            event.target.parentNode.classList.add("active")
        },
        async getList(){
            if(sessionStorage.getItem("subMenu")){
                // this.resData = sessionStorage.getItem("subMenu")
                this.resData = JSON.parse(sessionStorage.getItem("subMenu"))
                // console.log(this.resData)
                return false
            }
            const res = await this.$axioss.getSubjectMenuList()    
            if(res.data.code===1000){
                this.resData = res.data.data
                var obj = this.resData
                var str = JSON.stringify(obj)
                sessionStorage.subMenu = str
			}
        }
    }
}
</script>
<style scoped>

</style>

