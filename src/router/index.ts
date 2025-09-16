import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { setupGuards } from './guards'

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
})

// 设置路由守卫
setupGuards(router)

export default router
