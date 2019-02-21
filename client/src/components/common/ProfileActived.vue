<template>
    <div class="btn-group mb-4" role="group">
        <router-link :to="`/editProfile/${handle}`" class="btn btn-light">
            <i class="fas_a3 text-info mr-1"></i> 
            编辑个人信息
        </router-link>
        <router-link to="/add-experience" class="btn btn-light">
            <i class="fas_a1 text-info mr-1"></i>
            添加个人经历
        </router-link>
        <router-link to="/add-education" class="btn btn-light">
            <i class="fas_a2 text-info mr-1"></i>
            添加教育经历
        </router-link>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props: {
        handle: String
    },
    methods:{

    }
};
</script>
<style scoped>
    .text-info{
        color:#17a2b8;
    }
    
</style>

