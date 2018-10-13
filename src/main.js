// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/common.css';
import './assets/style/animate.css';
import 'vue2-animate/dist/vue2-animate.min.css';
import echarts from '../src/utls/echarts';
import VueDND from 'awe-dnd';
import './assets/iconfont/iconfont.css';
import './utls/HZRecorder';
import axios from './utls/http'
Vue.use(VueDND);
Vue.config.productionTip = false
Vue.use(ElementUI);

import VueParticles from 'vue-particles'; 
Vue.use(VueParticles);

// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable,VPagination} from 'vue-easytable'

// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

Vue.prototype.axios = axios;

Vue.use(({prototype}) => {
  prototype.echarts = echarts;
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
