<template>
    <div>
        <h4 class="mb-2">教育经历</h4>
        <table class="table">
            <thead>
                <tr>
                  <th>学校</th>
                  <th>学历</th>
                  <th>年份</th>
                  <th />
                </tr>
            </thead>
            <tbody>
                <tr v-for="(exp,i) in education" :key="i">
                    <td>{{exp.school}}</td>
                    <td>{{exp.degree}}</td>
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
    education: Array,
    id:String
  },
  methods: {
    deleteClick(id) {
      this.$emit("deleteEducation", id);
    },
    editClick(i,y,z){
        //z是经验ID总的
        // console.log(this.experience[i])
        // console.log(z)
        // return false

        var obj = this.education[i]
        obj.profilesId = z
        obj.index = i
        var str = JSON.stringify(obj)
        if(sessionStorage.getItem('objEducation')){
            sessionStorage.removeItem("objEducation");
        }
        sessionStorage.objEducation = str;
        
        this.$router.push({
            path:'/EditEducation',
            // query:{experience:str}  //第二种写法
        })
    }
  }
};
</script>
