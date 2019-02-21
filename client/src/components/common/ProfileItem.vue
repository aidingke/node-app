<template>
    <div class="card card-body bg-light mb-3">
        <div class="row">
            <div class="col-lg-2 col-md-2 col-sm-6">
                <img style="width: 100px" class="rounded-circle pabs" :src="`/static/avatar/${profileItem.user.avatar}`" alt="" />    
            </div>
            <div class="col-lg-4 col-md-4 col-8 col-sm-6">
                <h3>{{profileItem.user.name}}</h3>
                <p>{{profileItem.status}}</p>
                <p v-if="profileItem.location">{{profileItem.location}}</p>
                <router-link 
                    :to="{name: 'profile', params:{handle: profileItem._id}}" 
                    class="btn btn-info">更多信息
                </router-link>
            </div>
            <div class="col-md-6 d-lg-block col-sm-12">
                <h4>技能</h4>
                <ul class="list-group">
                    <li class="list-group-item" 
                        v-for="(skill, index) in profileItem.skills"
                        :key="index">
                        <i class="fas_a12"></i>{{skill}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "profileItem",
  props: {
    profileItem: Object
  },
  created(){
    //   console.log('-----')
    //   console.log(this.profileItem)
  }
};
</script>
<style scoped>
.rounded-circle{
  margin-top: 30px;
  top: 0;
  right: 5%;
  width:100px;
}

</style>


