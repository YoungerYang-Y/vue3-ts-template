// 认证相关工具函数
import { useUserStore } from '@/stores/user'

/**
 * 获取当前用户的token
 */
export function getToken(): string | null {
  const userStore = useUserStore()
  return userStore.getToken()
}

/**
 * 设置用户token
 * @param token 用户token
 * @param remember 是否记住用户（使用localStorage）
 */
export function setToken(token: string, remember: boolean = false): void {
  const userStore = useUserStore()
  userStore.setToken(token, remember)
}

/**
 * 清除用户token
 */
export function clearToken(): void {
  const userStore = useUserStore()
  userStore.logout()
}

/**
 * 检查用户是否已登录
 */
export function isAuthenticated(): boolean {
  const userStore = useUserStore()
  return userStore.isAuthenticated
}

/**
 * 用户登出
 */
export function logout(): void {
  const userStore = useUserStore()
  userStore.logout()
}

/**
 * 获取token存储方式
 * @returns 'localStorage' | 'sessionStorage' | null
 */
export function getTokenStorageType(): 'localStorage' | 'sessionStorage' | null {
  if (localStorage.getItem('token')) {
    return 'localStorage'
  }
  if (sessionStorage.getItem('token')) {
    return 'sessionStorage'
  }
  return null
}
