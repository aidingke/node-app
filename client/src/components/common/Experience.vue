<template>
    <div>
        <h4 class="mb-2">个人履历</h4>
        <table class="table">
            <thead>
                <tr>
                  <th>公司</th>
                  <th>标签</th>
                  <th>年份</th>
                  <th />
                </tr>
            </thead>
            <tbody>
                <!-- {{id}} -->
                <tr v-for="(exp,i) in experience" :key="i">
                    <td>{{exp.company}}</td>
                    <td>{{exp.title}}</td>
                    <td>
                    {{exp.from}} ~ {{exp.to ? exp.to : '至今'}}
                    </td>
                    <td>
                    <button class="btn btn-info" @click="editClick(i,exp._id,id)">
                        编辑
                    </button>
                    <button class="btn btn-danger" @click="deleteClick(exp._id)">
                        删除
                    </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    experience: Array,
    id:String
  },
  methods: {
    deleteClick(id) {
      //   this.$axios
      //     .delete(`/api/profile/experience/${id}`)
      //     .then(res => {
      //       console.log(res.data);
      //       //   this.profile = res.data;
      //     })
      //     .catch(error => {});
      this.$emit("deleteExperience", id);
    },
    editClick(i,y,z){
        //z是经验ID总的
        // console.log(this.experience[i])
        // console.log(z)
        // return false

        var obj = this.experience[i]
        obj.profilesId = z
        obj.index = i
        var str = JSON.stringify(obj)
        if(sessionStorage.getItem('objExperience')){
            sessionStorage.removeItem("objExperience");
        }
        sessionStorage.objExperience = str;
        
        this.$router.push({
            path:'/EditExperience',
            // query:{experience:str}  //第二种写法
        })
    }
  }
};
</script>
