// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './components/assets/iconfont/iconfont.css'

// 弹窗
import swal from 'sweetalert'
Vue.prototype.$swal=swal;

// UI库
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
Vue.use(Mint);

//动画
import 'animate.css'

//axios
import axios from 'axios'
Vue.prototype.$api=axios;

// 公共组件
import commonCom from './components/common'
for(var i in commonCom){Vue.component(i,commonCom[i])};

// 全局过滤器
import Filter from './filter'
for(var i in Filter){Vue.filter(i,Filter[i])};

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
