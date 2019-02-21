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
    最多能上传{{this.objNum}}张图

    <div class="isImg img_upload" v-if="showFileData.length < this.objNum">
      <button class="btn_upload">
        <input @change="addFile" type="file" ref="myFile" multiple="multiple" accept="img/*">
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'upload',
  data() {
    return {
      showFileData: [], // 存放图片的url的数组
      allUploadFiles: [] // 文件上传file数组
    };
  },
  props: {
    objNum:{
      type:Number
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addFile() {
      let files = [...this.$refs.myFile.files],at=false;
      if (this.showFileData.length + files.length > this.objNum) {
        alert('最多发表'+this.objNum+'张图片');
        return;
      }
      files.forEach((file,i) => {
        let fileName = file.name.lastIndexOf(".");//取到文件名开始到最后一个点的长度
        let fileNameLength = file.name.length;//取到文件名长度
        let fileFormat = file.name.substring(fileName + 1, fileNameLength);//截

        if(fileFormat.toLowerCase()==='jpg'||fileFormat.toLowerCase()==='png'||fileFormat.toLowerCase()==='jpeg'||fileFormat.toLowerCase()==='gif')
        {
          
          const isLt = file.size/1024/1024 <=1;
          if (!isLt) {
            // this.$message.error('上传文件大小不能超过 10MB!');
            this.dialog('上传文件大小不能超过1M')
            at=true
            return false
          }
          at=false
          this.allUploadFiles.push(file);
          let objUrl = this.getObjectURL(file);
          this.showFileData.push(objUrl);
        }else{
          this.dialog('请上传图片文件');
          at=true
          return false
        }
      });
      if(at==true){
        return false
      }
      // 注册事件 让调用方执行
      this.$emit('getImgs', this.allUploadFiles);
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
      this.showFileData.forEach((file, index) => {
        if (file == file_img) {
          this.showFileData.splice(index, 1);
          this.allUploadFiles.splice(index, 1);
        }
      })
      // console.log(this.allUploadFiles)
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
