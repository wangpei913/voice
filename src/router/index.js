import Vue from 'vue'
import Router from 'vue-router'
// import Index from '../page/Index.vue';
import Login from '../page/Login.vue';
import ChildrenRoute from './children.route';
import NotFound from '../page/NotFound';
import NewIndex from '../page/NewIndex'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
        path: '/',
        redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        keepAlive: false
      },
      component: NewIndex,
      children: [
        ...ChildrenRoute
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ],
  linkActiveClass: 'is-active'
})
// import {userArr} from '../utls/data';
// initURL(userArr, 'n')
// export function initURL (arr, N) {
//   let obj = {};
//   for (let i = 0; i < arr.length; i++) {
//     let n = N + i
//     let v = arr[i]
//     obj[n] = v
//   }
//   console.log(obj)
// }
