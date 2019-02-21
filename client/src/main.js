// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './utils/http'
import $axioss from './axios'
import store from './store'
import "./utils/pubFun.js"
import 'jquery'
// import ElementUI from 'element-ui';

// import { Button, Select } from 'element-ui';
import { dialog } from './components/common/dialog'

// 引入百度编辑器
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'


Vue.prototype.$axios = axios
Vue.prototype.$axioss = $axioss;
Vue.prototype.dialog = dialog;//警告或失败提示
Vue.config.productionTip = false

// Vue.use(ElementUI);
// Vue.use(Button)
// Vue.use(Select)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
