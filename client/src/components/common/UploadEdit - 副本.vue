<template>
  <div class="img_wrap">
    <div 
      v-if="showFileData.length > 0"
      class="isImg" 
      v-for="(file_img,index) in showFileData"
      :key="index"
      >
      <img :src="file_img" alt="">
      <a v-show="!loading" class="remove" @click="removeImg(file_img)">x</a>
    </div>
    <!-- {{showFileData.length}}  -->
    最多能上传{{this.objNum}}张图

    <div class="isImg img_upload" v-if="showFileData.length < this.editNums">
      <button class="btn_upload">
        <input @change="addFile" type="file" ref="myFile" multiple="multiple" accept="img/*">
      </button>
    </div>

<!-- <img :src="k1">
<img :src="k2"> -->

    <!-- <div v-for="(v,i) in temps" >
      <img :src="v" >
    </div> -->


  </div>
</template>
<script>
// import {compress} from "../../../src/utils/lib"

export default {
  name: 'upload',
  data() {
    return {
      k1:'',
      k2:'',
      imgs:[],
      temps:'',
      editNums:0, //决绝思路是比回传的值多1
      showFileData: [], // 存放图片的url的数组
      allUploadFiles: [] // 文件上传file数组
    };
  },
  props: {
    showFileDatas:{ //编辑传回来的图片素组
      type:Array
    },
    objNum:{
      type:Number
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  created() {
    if(this.showFileDatas){
      this.showFileData = this.showFileDatas
    }else if(this.showFileDatas==''||this.showFileDatas==null){
      this.showFileData.length = 0
    }
    this.editNums = this.objNum
    // console.log(this.showFileData)
  },
  methods: {
    addFile() {
      // console.log(this.$refs.myFile.files);
      let files = [...this.$refs.myFile.files],at=false;
      
      if (this.showFileData.length + files.length > this.editNums) {
        alert('最多发表'+this.objNum+'张图片');
        return;
      }
      this.allUploadFiles=[]
// console.log(files)
// return false
      files.forEach((file,i) => {
        let fileName = file.name.lastIndexOf(".");//取到文件名开始到最后一个点的长度
        let fileNameLength = file.name.length;//取到文件名长度
        let fileFormat = file.name.substring(fileName + 1, fileNameLength);//截

        if(fileFormat.toLowerCase()==='jpg'||fileFormat.toLowerCase()==='png'||fileFormat.toLowerCase()==='jpeg'||fileFormat.toLowerCase()==='gif')
        {
          const isLt = file.size/1024/1024 <=1;
          if (!isLt) {
            // this.$message.error('上传文件大小不能超过 10MB!');
            alert('上传文件大小不能超过1M')
            at=true
            return false
          }
          at=false
          //存图片数组
          this.allUploadFiles.push(file);
          // let objUrl = this.getObjectURL(file);
          // this.showFileData.push(objUrl);

          //执行插入图片操作,入库
          //重新赋值，不然会把之前的也加进去
        }else{
          alert('请上传图片文件');
          at=true
          return false
        }
      });
      if(at==true){
        return false
      }

      // let bb = compress(this.allUploadFiles)
      // this.$emit('addImgs',this.allUploadFiles);
      // return false

      this.imgs=[]
      let newArr=[],_this=this


      //存base64
      this.allUploadFiles.forEach(file => {

        this.uploadFile(file).then(function(result){
          //处理 result
          // console.log(result)
          _this.imgs.push(result)
        })

      
        // let reader = new FileReader();
        // const _this = this;
        // reader.onload = function(e) {
        //   // console.log(e.target.result);
        //   let a={}
        //   a.url = e.target.result
        //   _this.imgs.unshift(a);
        // };
        // reader.readAsDataURL(file);
      });
      this.temps = this.imgs
      console.log(this.imgs)
    setTimeout(function(){
      _this.$axios.post("/api/ideas/fake",this.imgs)
      .then(res => {
        console.log(res)
      })
    },1000)
    
      return false
      // 注册事件 让调用方执行
      this.$emit('addImgs',this.imgs);
    },
    uploadFile(file) {
      
      return new Promise(function(resolve, reject) {
          let reader = new FileReader()
          reader.readAsDataURL(file)
          
          reader.onload = function(e) {
            // console.log(e.target.result);
              resolve(this.result)
          }
      })
    },
    funOpt(x){
      // this.showFileData = [...this.showFileData,...x]
      // console.log( x ) 
      // this.temps = x
      // 注册事件 让调用方执行
      this.$emit('addImgs',x);
    },
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    removeImg(file_img) {
      // console.log(file_img)
      // return false
      // let _this = event.target.parentNode.parentNode
      // console.log(_this.getElementsByClassName('isImg')[0])
      // let thiss = this
      // this.showFileData.forEach((file, index) => {
      //   if (file == file_img) {
      //     if(index==0){
      //       // console.log('222')
      //       this.$emit('showUps',true);
      //       // _this.removeChild(_this.children[index])
      //       // console.log(thiss.showFileDatas)
            
      //       // thiss.editNums = thiss.editNums+1
      //       // return false
      //     }
      //     thiss.showFileData.splice(index, 1);
      //     thiss.allUploadFiles.splice(index, 1);
      //   }
      // })

      this.allUploadFiles.shift()
 
      this.showFileData.forEach((file, index) => {
        if (file == file_img) {
           if(index==0){
            this.$emit('showUps',true);
            // return false
          }
          this.showFileData.splice(index, 1);
        }
      })
      this.temps = this.showFileData
    }
  }
};
</script>
<style scoped>
.isImg {
  box-sizing: border-box;
  width: 100px;
  height: 6rem;
  float: left;
  margin-right: 8px;
  margin-bottom: 8px;
  position: relative;
}
.btn_upload {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background: url(../../asserts/upload.png) no-repeat;
  background-size: 100% 100%;
}
.btn_upload input {
  display: inline-block;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.isImg img {
  width: 100%;
  height: 100%;
}

.isImg .remove {
  position: absolute;
  top: -8px;
  right: -5px;
  border: none;
  outline: none;
  width: 20px;
  height: 20px;
  padding: 0;
  text-align: center;
  color: white;
  background-color: #3baffd;
  line-height: 15px;
  border-radius: 50%;
}
</style>
