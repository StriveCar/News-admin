import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    // component: () => import(/* webpackChunkName: "about" */ '../views/login'),
    component: () => import('@/layout'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard', affix: true, noCache: false }
    }]
  },
  {
    path: '/news',
    component: Layout,
    name: 'News',
    redirect: '/news/index',
    meta: { title: '新闻管理', icon: 'table' },
    children: [
      {
        path: 'index',
        name: 'NewsManager',
        component: () => import('@/views/news/index'),
        meta: { title: '新闻管理', icon: 'notice', noCache: true }
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('../views/404'),
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const userStore = useUserStore()
//   const userInfo = userStore.userInfo
//   console.log(userInfo);
//   if (Object.prototype.isPrototypeOf(userInfo)) {
//     ElMessage.error('未登录,不允许跳转')
//     return next('/login')
//   }
//   next()
// })

export default router
