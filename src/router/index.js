import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '../utils/auth' // getToken from cookie
import Layout from '@/views/layout/Layout.vue'

Vue.use(Router)
const _import = require('./_import_' + process.env.NODE_ENV)

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/login2', component: _import('login/login2'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/tourists',
    component: Layout,
    alias: '/',
    children: [
      {
        path: '',
        component: _import('tourists/index'),
        name: 'home',
        meta: { title: '首页', icon: 'dashboard' }
      },
      {
        path: 'homePage',
        component: _import('tourists/homePage'),
        name: 'homePage',
        meta: { title: '首页', icon: 'dashboard' }
      },
      {
        path: 'passenger',
        component: _import('tourists/passenger'),
        name: 'passenger',
        meta: { title: '实时客流分析', icon: 'chart' }
      },
      {
        path: 'sourceAnaly',
        component: _import('tourists/sourceAnaly'),
        name: 'sourceAnaly',
        meta: { title: '客流来源分析', icon: 'chart' }
      },
      {
        path: 'attributeAnaly',
        component: _import('tourists/attributeAnaly'),
        name: 'attributeAnaly',
        meta: { title: '客流属性分析', icon: 'chart' }
      },
      {
        path: 'lengthStay',
        component: _import('tourists/lengthStay'),
        name: 'lengthStay',
        meta: { title: '停留时长分析', icon: 'chart' }
      },
      {
        path: 'passengerContrastAnalysis',
        component: _import('tourists/passengerContrastAnalysis'),
        name: 'passengerContrastAnalysis',
        meta: { title: '客流对比分析', icon: 'chart' }
      },
      {
        path: 'queryDataHistorical',
        component: _import('tourists/queryDataHistorical'),
        name: 'queryDataHistorical',
        meta: { title: '历史数据查询', icon: 'chart' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'international'
    },
    children: [
      {
        path: 'menu',
        component: _import('system/menu'),
        name: 'menu',
        meta: { title: '栏目管理' }
      },
      {
        path: 'role',
        component: _import('system/role'),
        name: 'role',
        meta: { title: '角色管理' }
      },
      {
        path: 'user',
        component: _import('system/user'),
        name: 'user',
        meta: { title: '用户管理' }
      },
      {
        path: 'configuration',
        component: _import('system/CustomerConfiguration'),
        name: 'configuration',
        meta: { title: '界面管理' }
      },
      {
        path: 'authVendor',
        component: _import('system/AuthVendor'),
        name: 'authVendor',
        meta: { title: '合作厂商' }
      }
    ]
  }
]

const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 路由拦截器
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/tourists' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.fullPath }}) // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

export default router
