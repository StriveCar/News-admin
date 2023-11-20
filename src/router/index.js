import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store/userStore'
import { ElMessage } from 'element-plus'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const userStore = useUserStore()
  const userInfo = userStore.userInfo
  console.log(userInfo);
  if (Object.prototype.isPrototypeOf(userInfo)) {
    ElMessage.error('未登录,不允许跳转')
    return next('/login')
  }
  next()
})

export default router
