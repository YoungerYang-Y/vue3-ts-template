import http from '../utils/http.ts'

// API使用示例
export class ApiExample {
  /**
   * 获取用户信息
   */
  static async getUserInfo(userId: string) {
    return http.get(`/user/${userId}`)
  }

  /**
   * 创建用户
   */
  static async createUser(userData: {
    name: string
    email: string
    age: number
  }) {
    return http.post('/user', userData)
  }

  /**
   * 更新用户信息
   */
  static async updateUser(userId: string, userData: Partial<{
    name: string
    email: string
    age: number
  }>) {
    return http.put(`/user/${userId}`, userData)
  }

  /**
   * 删除用户
   */
  static async deleteUser(userId: string) {
    return http.delete(`/user/${userId}`)
  }

  /**
   * 获取用户列表
   */
  static async getUserList(params: {
    page: number
    pageSize: number
    keyword?: string
  }) {
    return http.get('/users', params)
  }

  /**
   * 上传头像
   */
  static async uploadAvatar(file: File, onProgress?: (progress: any) => void) {
    return http.upload('/upload/avatar', file, onProgress)
  }

  /**
   * 下载用户数据
   */
  static async downloadUserData(userId: string) {
    return http.download(`/user/${userId}/export`, `user-${userId}-data.xlsx`)
  }

  /**
   * 批量获取用户信息
   */
  static async batchGetUsers(userIds: string[]) {
    const requests = userIds.map(id => http.get(`/user/${id}`))
    return http.all(requests)
  }
}

// 使用示例（在组件中）
export function useApiExample() {
  const handleGetUser = async () => {
    try {
      const response = await ApiExample.getUserInfo('123')
      console.log('用户信息:', response.data)
    }
    catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }

  const handleCreateUser = async () => {
    try {
      const response = await ApiExample.createUser({
        name: '张三',
        email: 'zhangsan@example.com',
        age: 25,
      })
      console.log('创建用户成功:', response.data)
    }
    catch (error) {
      console.error('创建用户失败:', error)
    }
  }

  const handleUploadFile = async (file: File) => {
    try {
      const response = await ApiExample.uploadAvatar(file, (progress) => {
        console.log('上传进度:', `${progress.loaded / progress.total * 100}%`)
      })
      console.log('上传成功:', response.data)
    }
    catch (error) {
      console.error('上传失败:', error)
    }
  }

  return {
    handleGetUser,
    handleCreateUser,
    handleUploadFile,
  }
}
