import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap, asyncRouterMap } from '@/config/router.config'

// 去除权限

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  // routes: constantRouterMap 增加权限
  routes: constantRouterMap.concat(asyncRouterMap)
})
