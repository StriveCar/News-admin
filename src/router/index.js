import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'
import Layout from '@/layout'
import NProgress from 'nprogress'
import getPageTitle from '@/utils/get-page-title'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login'),
    // component: () => import('@/layout'),
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
    redirect: '/news/review',
    meta: { title: '新闻管理', icon: 'news' },
    children: [
      {
        path: 'review',
        name: 'NewsReviewList',
        component: () => import('@/views/news/review'),
        meta: {title: '新闻审核', noCache: true}
      },
      {
        path: 'complaint',
        name: 'NewsComplaint',
        component: () => import('@/views/news/complaint'),
        meta: {title: '新闻举报', noCache: true}
      },
      {
        path: 'application',
        name: 'PulisherApplication',
        component: () => import('@/views/news/application'),
        meta: {title: '新闻编辑申请', noCache: true},
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    children: [
      {
        path: 'index',
        name: 'UserManager',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/section',
    component: Layout,
    redirect: '/section/index',
    children: [
      {
        path: 'index',
        name: 'SectionManager',
        component: () => import('@/views/section/index'),
        meta: { title: '栏目管理', icon: 'section', noCache: true }
      }
    ]
  }, {
    path: '/comment',
    component: Layout,
    redirect: '/comment/index',
    children: [
      {
        path: 'index',
        name: 'CommentManager',
        component: () => import('@/views/comment/index'),
        meta: { title: '评论管理', icon: 'comment', noCache: true }
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
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const userStore = useUserStore()
  const hasGetUserInfo = userStore.state.userInfo

  if (!hasGetUserInfo && whiteList.indexOf(to.path) === -1) {
    next('/login')
    NProgress.done()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
