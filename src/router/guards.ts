import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 白名单路由（不需要登录即可访问）
const WHITE_LIST = [
  '/login',
  '/register',
  '/forgot-password',
  '/404',
  '/500',
]

// 检查路由是否在白名单中
function isInWhiteList(path: string): boolean {
  return WHITE_LIST.some(route => path.startsWith(route))
}

// 设置路由守卫
export function setupGuards(router: Router) {
  // 全局前置守卫
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    // 初始化认证状态
    userStore.initAuth()

    console.log('路由守卫:', {
      from: from.path,
      to: to.path,
      authenticated: userStore.isAuthenticated,
    })

    // 如果用户已登录
    if (userStore.isAuthenticated) {
      // 如果访问登录页，重定向到首页
      if (to.path === '/login') {
        next('/')
        return
      }
      // 其他页面正常访问
      next()
      return
    }

    // 如果用户未登录
    if (isInWhiteList(to.path)) {
      // 白名单页面可以访问
      next()
      return
    }

    // 其他页面需要登录，重定向到登录页
    console.log('用户未登录，重定向到登录页')
    next({
      path: '/login',
      query: {
        redirect: to.fullPath, // 保存原始路径，登录后可以跳转回来
      },
    })
  })

  // 全局后置钩子
  router.afterEach((to, from) => {
    console.log('路由跳转完成:', {
      from: from.path,
      to: to.path,
    })

    // 设置页面标题
    if (to.meta?.title) {
      document.title = `${to.meta.title} - Vue3 App`
    }
    else {
      document.title = 'Vue3 App'
    }
  })

  // 全局解析守卫
  router.beforeResolve((to, from, next) => {
    // 可以在这里进行权限检查、数据预加载等
    next()
  })
}
