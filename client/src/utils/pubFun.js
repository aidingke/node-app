/****
 * 获取icon图标
 * params1: subjectName (科目名称)  type: string
 */
// function getIcon(subjectName) {
    
//     return obj;
//   }
/****
 * 获取URL
 * params1: ?userId='111',传userId  type: string
 */  
// function getUrl(name){
//   var reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)','i')
//   var r = window.location.search.substr(1).match(reg);
//   if(r!=null){
//     return unescape(r[2])
//   }
//   return null
// } 

// export default {getIcon,getUrl};

//写法2
import Vue from 'vue';
Vue.prototype.getUrl = (name) =>{
  var reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)','i')
  var r = window.location.search.substr(1).match(reg);
  if(r!=null){
    return unescape(r[2])
  }
  return null
}

// 转译中文x是搜索参数 //获取url中"?"符后的字串，使用两次decodeRUI解码 location.search
Vue.prototype.GetRequest = (x) =>{ 
  var url =decodeURI(decodeURI(x)); 
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
      return theRequest;
  }
}


Vue.prototype.repImgInfos = (x) =>{
  //加端口
  var reg=new RegExp("/images/ueditor",'g');
  return x.replace(reg, "http://localhost:5000/images/ueditor")
}

Vue.prototype.repImg = (x) =>{
  console.log(x)
  if(x.indexOf("http://")!=-1||x.indexOf("https://")!=-1){  // !=-1含有 ==-1不含有
    console.log(1111111)
    return x
  }else{
    return x.replace(/src="/ig, 'src="http://localhost:5000')
  }
}

//保存的时候去掉 端口 五千
Vue.prototype.addImg = (x) =>{
  // console.log(x)
  if(x.indexOf("localhost")!=-1){  // !=-1含有 ==-1不含有
    var reg=new RegExp("http://localhost:5000/",'g');
    return x.replace(reg, "/")
  }else{
    return x
  }
}

//保存的时候去掉 html 标签 保留 img，顺带去掉本地端口，顺带判断多少个字符串z
Vue.prototype.addDesc = (x,z) =>{
  let y,dd
  if(x.indexOf("localhost")!=-1){  // !=-1含有 ==-1不含有
    var reg=new RegExp("http://localhost:5000/",'g');
    y = x.replace(reg, "/")
  }else{
    y = x
  }
  dd=y.replace(/<\/?.+?>/g,"");
  if(dd.length>z){
    // alert('字数不能超过'+z)
    return false
  }
  //把标签去掉
  return y.replace(/<(?!img).*?>/g, ""); 
}

Vue.prototype.isMobile = () => { //判断设备
  var flag = false;
  if (window.navigator.userAgent.indexOf("Mobile") > -1) {
    flag = true  
  }else{
    flag = false
  }
  return flag; 
}




// Vue.prototype.scroll = () => { 
//   $(window).scroll(function(){
//     let scrollTop = $(this).scrollTop()
//     let scrollHeight = $(document).height()
//     let windowHeight = $(this).height()
//     if(scrollHeight - (scrollTop+windowHeight) < 120){
//       callBack && callBack()
//     }
//   })
// }

