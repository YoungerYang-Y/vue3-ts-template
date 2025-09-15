# HTTP 请求封装

本项目基于 axios 封装了统一的 HTTP 请求工具，提供了全局的请求拦截器和响应拦截器，以及便捷的 HTTP 方法封装。

## 文件结构

```
src/utils/
├── request.ts      # axios 实例配置和拦截器
├── http.ts         # HTTP 方法封装
├── api-example.ts  # 使用示例
└── README.md       # 说明文档
```

## 功能特性

### request.ts

- ✅ 全局请求拦截器
- ✅ 全局响应拦截器
- ✅ 自动添加 token 认证
- ✅ 统一错误处理
- ✅ 请求/响应日志
- ✅ 防缓存处理

### http.ts

- ✅ GET、POST、PUT、DELETE、PATCH、HEAD、OPTIONS 方法
- ✅ 文件上传功能
- ✅ 文件下载功能
- ✅ 并发请求处理
- ✅ TypeScript 类型支持

## 使用方法

### 基础用法

```typescript
import http from '@/utils/http'

// GET 请求
async function getUserInfo(userId: string) {
  return http.get(`/user/${userId}`)
}

// POST 请求
async function createUser(userData: any) {
  return http.post('/user', userData)
}

// PUT 请求
async function updateUser(userId: string, userData: any) {
  return http.put(`/user/${userId}`, userData)
}

// DELETE 请求
async function deleteUser(userId: string) {
  return http.delete(`/user/${userId}`)
}
```

### 文件上传

```typescript
import http from '@/utils/http'

async function uploadFile(file: File) {
  return http.upload('/upload', file, (progress) => {
    console.log('上传进度:', `${progress.loaded / progress.total * 100}%`)
  })
}
```

### 文件下载

```typescript
import http from '@/utils/http'

async function downloadFile(url: string, filename: string) {
  return http.download(url, filename)
}
```

### 并发请求

```typescript
import http from '@/utils/http'

// 并发请求（所有成功才返回）
async function batchGetUsers(userIds: string[]) {
  const requests = userIds.map(id => http.get(`/user/${id}`))
  return http.all(requests)
}

// 并发请求（有一个成功就返回）
async function getFirstUser(userIds: string[]) {
  const requests = userIds.map(id => http.get(`/user/${id}`))
  return http.race(requests)
}
```

## 环境配置

在 `.env` 文件中配置 API 基础地址：

```env
# 开发环境
VITE_API_BASE_URL=http://localhost:3000/api

# 生产环境
VITE_API_BASE_URL=https://api.example.com
```

## 响应数据格式

所有 API 响应都应该遵循以下格式：

```typescript
interface ApiResponse<T = any> {
  code: number // 状态码，200 表示成功
  message: string // 响应消息
  data: T // 响应数据
  success: boolean // 是否成功
}
```

## 错误处理

系统会自动处理以下错误：

- **401**: 未授权，自动清除本地 token
- **403**: 拒绝访问
- **404**: 资源不存在
- **500**: 服务器内部错误
- **502**: 网关错误
- **503**: 服务不可用
- **504**: 网关超时
- **网络错误**: 连接失败
- **超时错误**: 请求超时

## Token 管理

系统会自动从 `localStorage` 或 `sessionStorage` 中读取 token，并在请求头中添加 `Authorization: Bearer ${token}`。

## 注意事项

1. 所有请求都会自动添加时间戳防止缓存（GET 请求）
2. 请求和响应都会在控制台输出日志（开发环境）
3. 错误信息会自动显示（需要集成 UI 组件库）
4. 401 错误会自动清除本地 token（需要配置路由跳转）

## 扩展功能

可以根据项目需求扩展以下功能：

- 请求重试机制
- 请求缓存
- 请求去重
- 请求队列管理
- 离线请求缓存
