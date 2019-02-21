<template>
    <div class="row">
            <div class="col-md-12">
              <div class="card card-body bg-light mb-3">
                <h3 class="text-center text-info">个人介绍</h3>
                <template v-if="profile.bio">
                  <div class="" v-html="profile.bio">
                    <!-- <pre style="white-space: pre-line;padding: 0 15px;">{{profile.bio}}</pre> -->
                  </div>
                </template>
                <template v-else>
                   <p>
                    没有填写介绍信息
                  </p>  
                </template>
               
                <hr />
                <h3 class="text-center text-info">个人技能</h3>
                <div class="row">
                  <div class="d-flex flex-wrap justify-content-center align-items-center">
                    <div class="p-3" 
                      v-for="(skill, index) in profile.skills" 
                      :key="index">
                      <i class="fas_a12"></i> {{skill}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
</template>

<script>
export default {
  name: "profileAbout",
  props: {
    profile: Object
  }
};
</script>
