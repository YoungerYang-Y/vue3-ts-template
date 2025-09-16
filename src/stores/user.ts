import type { ApiResponse } from '@/utils/http'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 用户信息接口
export interface UserInfo {
  id: string
  username: string
  email: string
  avatar?: string
  role?: string
  permissions?: string[]
  createdAt?: string
  updatedAt?: string
}

// 登录表单接口
export interface LoginForm {
  username: string
  password: string
  remember: boolean
}

// 用户状态管理
export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string | null>(null)
  const userInfo = ref<UserInfo | null>(null)
  const isLoggedIn = ref(false)
  const loading = ref(false)

  // 计算属性
  const isAuthenticated = computed(() => {
    return isLoggedIn.value && !!token.value
  })

  const hasPermission = computed(() => {
    return (permission: string) => {
      if (!userInfo.value?.permissions)
        return false
      return userInfo.value.permissions.includes(permission)
    }
  })

  const hasRole = computed(() => {
    return (role: string) => {
      return userInfo.value?.role === role
    }
  })

  // 从本地存储初始化状态
  const initAuth = () => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token')
    const storedUserInfo = localStorage.getItem('userInfo')

    if (storedToken) {
      token.value = storedToken
      isLoggedIn.value = true
    }

    if (storedUserInfo) {
      try {
        userInfo.value = JSON.parse(storedUserInfo)
      }
      catch (error) {
        console.error('解析用户信息失败:', error)
        localStorage.removeItem('userInfo')
      }
    }
  }

  // 设置token
  const setToken = (newToken: string, remember: boolean = false) => {
    token.value = newToken

    if (remember) {
      localStorage.setItem('token', newToken)
      sessionStorage.removeItem('token')
    }
    else {
      sessionStorage.setItem('token', newToken)
      localStorage.removeItem('token')
    }
  }

  // 登录
  const login = async (loginForm: LoginForm): Promise<ApiResponse<UserInfo>> => {
    loading.value = true

    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 模拟登录成功响应
      const mockUserInfo: UserInfo = {
        id: '1',
        username: loginForm.username,
        email: `${loginForm.username}@example.com`,
        avatar: 'https://via.placeholder.com/100',
        role: 'user',
        permissions: ['read', 'write'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const mockToken = `mock-token-${Date.now()}`

      // 设置token
      setToken(mockToken, loginForm.remember)

      // 设置用户信息
      userInfo.value = mockUserInfo
      isLoggedIn.value = true

      // 保存用户信息到本地存储
      if (loginForm.remember) {
        localStorage.setItem('userInfo', JSON.stringify(mockUserInfo))
      }
      else {
        sessionStorage.setItem('userInfo', JSON.stringify(mockUserInfo))
      }

      return {
        code: 200,
        message: '登录成功',
        data: mockUserInfo,
        success: true,
      }
    }
    catch (error) {
      console.error('登录失败:', error)
      throw error
    }
    finally {
      loading.value = false
    }
  }

  // 登出
  const logout = () => {
    // 清除状态
    token.value = null
    userInfo.value = null
    isLoggedIn.value = false

    // 清除本地存储
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userInfo')

    console.log('用户已登出')
  }

  // 获取token
  const getToken = () => {
    return token.value || localStorage.getItem('token') || sessionStorage.getItem('token')
  }

  // 更新用户信息
  const updateUserInfo = (newUserInfo: Partial<UserInfo>) => {
    if (userInfo.value) {
      userInfo.value = { ...userInfo.value, ...newUserInfo }

      // 更新本地存储
      const storage = localStorage.getItem('userInfo') ? localStorage : sessionStorage
      storage.setItem('userInfo', JSON.stringify(userInfo.value))
    }
  }

  // 刷新用户信息
  const refreshUserInfo = async (): Promise<void> => {
    if (!isAuthenticated.value)
      return

    loading.value = true

    try {
      // 模拟获取用户信息请求
      await new Promise(resolve => setTimeout(resolve, 500))

      // 这里应该调用真实的API
      // const response = await http.get('/user/profile')
      // userInfo.value = response.data
    }
    catch (error) {
      console.error('刷新用户信息失败:', error)
    }
    finally {
      loading.value = false
    }
  }

  // 检查token有效性
  const checkTokenValidity = async (): Promise<boolean> => {
    if (!token.value)
      return false

    try {
      // 模拟token验证请求
      await new Promise(resolve => setTimeout(resolve, 300))

      // 这里应该调用真实的API验证token
      // const response = await http.get('/auth/verify')
      // return response.success

      return true
    }
    catch (error) {
      console.error('Token验证失败:', error)
      return false
    }
  }

  return {
    // 状态
    token,
    userInfo,
    isLoggedIn,
    loading,

    // 计算属性
    isAuthenticated,
    hasPermission,
    hasRole,

    // 方法
    initAuth,
    login,
    logout,
    setToken,
    getToken,
    updateUserInfo,
    refreshUserInfo,
    checkTokenValidity,
  }
})
