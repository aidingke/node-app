<template>
    <div class="Questions">
        <div class="subMenu " style="border-bottom:none;border-bottom: 1px solid #ebebeb;">
            <div class="subBox container" style="">
                <ul>
                    <li style="margin-left:5px;padding-left:0">前端题库集合：</li>
                    <li>
                        <router-link to="/testPaper">    
                            客观题考核 >
                        </router-link>
                    </li>
                    <!-- <li>
                        <router-link to="/addTestPaper">    
                            新增试卷 >
                        </router-link>
                    </li> -->
                    <!-- <li>
                        <router-link to="/testPaperList">    
                            试卷列表 >
                        </router-link>
                    </li> -->
                    <li v-show="isLogin">
                        <router-link to="/answerList">    
                            我的答题列表 >
                        </router-link>
                    </li>
                    <li v-show="isLogin">
                        <router-link to="/stuTestPaperList">    
                            试卷列表(考试) >
                        </router-link>
                    </li>
                    <!-- <li>
                        <router-link to="/single">    
                            单选题 >
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/MultipleChoice">    
                            多选题 >
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/Completion">    
                            填空题 >
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/Discussion">    
                            论述题 >
                        </router-link>
                    </li> -->
                    
                </ul>
            </div>
        </div>
        <router-view>
      
        </router-view>
    </div>
</template>

<script>
export default {
    name: "Questions",
    data() {
        return {};
    },
    computed: {
        isLogin() {
            return this.$store.getters.isAutnenticated;
        }
    },
};
</script>

<style scoped>
    .Questions{
        margin-top: 15px;
        background: #fff;
    }
</style>