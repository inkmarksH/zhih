import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '../components/page/index'
import xiangq from '../components/page/xiangq'
import dianp from '../components/page/dianp'
import shouc from '../components/page/shouc'
export default new Router({
  routes: [
    {
      path: '/index',
      component: index,
    },
    {
      path: '/xiangq',
      component: xiangq,
    },
    {
      path: '/dianp',
      component: dianp,
    },
    {
      path: '/shouc',
      component: shouc,
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
