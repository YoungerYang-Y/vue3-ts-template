# Pinia 状态管理

本项目使用 Pinia 作为状态管理工具，提供了完整的用户状态管理功能。

## 文件结构

```
src/stores/
├── user.ts        # 用户状态管理
└── README.md      # 说明文档
```

## 功能特性

### 用户状态管理 (useUserStore)

- ✅ **用户信息管理**：用户名、邮箱、头像、角色等
- ✅ **认证状态**：登录状态、token管理
- ✅ **权限控制**：角色权限、功能权限检查
- ✅ **持久化存储**：localStorage/sessionStorage
- ✅ **响应式状态**：Vue3 Composition API
- ✅ **类型安全**：完整的TypeScript支持

## 使用方法

### 1. 在组件中使用

```vue
<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

async function handleLogin() {
  await userStore.login({
    username: 'user',
    password: 'password',
    remember: true
  })
}

function handleLogout() {
  userStore.logout()
}
</script>

<template>
  <div>
    <p v-if="userStore.isAuthenticated">
      欢迎，{{ userStore.userInfo?.username }}
    </p>
    <button @click="handleLogin">
      登录
    </button>
    <button @click="handleLogout">
      登出
    </button>
  </div>
</template>
```

### 2. 状态访问

```typescript
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 访问状态
console.log(userStore.isAuthenticated) // 是否已登录
console.log(userStore.userInfo) // 用户信息
console.log(userStore.token) // 用户token
console.log(userStore.loading) // 加载状态

// 计算属性
console.log(userStore.hasPermission('read')) // 权限检查
console.log(userStore.hasRole('admin')) // 角色检查
```

### 3. 方法调用

```typescript
// 登录
await userStore.login({
  username: 'user',
  password: 'password',
  remember: true
})

// 登出
userStore.logout()

// 刷新用户信息
await userStore.refreshUserInfo()

// 更新用户信息
userStore.updateUserInfo({
  username: 'new_username',
  email: 'new_email@example.com'
})

// 验证token
const isValid = await userStore.checkTokenValidity()
```

## API 参考

### 状态 (State)

| 属性         | 类型                    | 说明      |
| ------------ | ----------------------- | --------- |
| `token`      | `Ref<string \| null>`   | 用户token |
| `userInfo`   | `Ref<UserInfo \| null>` | 用户信息  |
| `isLoggedIn` | `Ref<boolean>`          | 登录状态  |
| `loading`    | `Ref<boolean>`          | 加载状态  |

### 计算属性 (Computed)

| 属性              | 类型                                           | 说明         |
| ----------------- | ---------------------------------------------- | ------------ |
| `isAuthenticated` | `ComputedRef<boolean>`                         | 是否已认证   |
| `hasPermission`   | `ComputedRef<(permission: string) => boolean>` | 权限检查函数 |
| `hasRole`         | `ComputedRef<(role: string) => boolean>`       | 角色检查函数 |

### 方法 (Methods)

| 方法                        | 参数                | 返回值                           | 说明            |
| --------------------------- | ------------------- | -------------------------------- | --------------- |
| `initAuth()`                | -                   | `void`                           | 初始化认证状态  |
| `login(form)`               | `LoginForm`         | `Promise<ApiResponse<UserInfo>>` | 用户登录        |
| `logout()`                  | -                   | `void`                           | 用户登出        |
| `setToken(token, remember)` | `string, boolean`   | `void`                           | 设置token       |
| `getToken()`                | -                   | `string \| null`                 | 获取token       |
| `updateUserInfo(info)`      | `Partial<UserInfo>` | `void`                           | 更新用户信息    |
| `refreshUserInfo()`         | -                   | `Promise<void>`                  | 刷新用户信息    |
| `checkTokenValidity()`      | -                   | `Promise<boolean>`               | 验证token有效性 |

## 类型定义

### UserInfo 接口

```typescript
interface UserInfo {
  id: string
  username: string
  email: string
  avatar?: string
  role?: string
  permissions?: string[]
  createdAt?: string
  updatedAt?: string
}
```

### LoginForm 接口

```typescript
interface LoginForm {
  username: string
  password: string
  remember: boolean
}
```

## 持久化存储

### Token 存储策略

- **记住我 (remember: true)**：使用 `localStorage`
- **临时登录 (remember: false)**：使用 `sessionStorage`

### 用户信息存储

- 与token使用相同的存储策略
- 自动序列化/反序列化JSON数据
- 登出时自动清除

## 与路由守卫集成

用户状态与路由守卫完全集成：

```typescript
// src/router/guards.ts
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  userStore.initAuth() // 自动初始化状态

  if (userStore.isAuthenticated) {
    // 已登录用户逻辑
  }
  else {
    // 未登录用户逻辑
  }
})
```

## 与HTTP请求集成

用户状态与HTTP请求拦截器集成：

```typescript
// src/utils/request.ts
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const token = userStore.getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
```

## 最佳实践

### 1. 状态初始化

在应用启动时初始化用户状态：

```typescript
// main.ts
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
userStore.initAuth()
```

### 2. 错误处理

```typescript
try {
  await userStore.login(loginForm)
}
catch (error) {
  // 处理登录错误
  console.error('登录失败:', error)
}
```

### 3. 权限检查

```typescript
// 在组件中检查权限
if (userStore.hasPermission('admin')) {
  // 显示管理员功能
}

// 在路由守卫中检查权限
if (userStore.hasRole('admin')) {
  // 允许访问管理员页面
}
```

### 4. 响应式更新

```typescript
// 监听状态变化
watch(() => userStore.isAuthenticated, (newValue) => {
  if (newValue) {
    // 用户已登录
  }
  else {
    // 用户已登出
  }
})
```

## 扩展功能

可以根据需要扩展以下功能：

- 多用户角色管理
- 权限组管理
- 用户偏好设置
- 会话管理
- 离线状态处理
- 状态同步
- 缓存策略

## 注意事项

1. **状态持久化**：确保在应用重启后正确恢复状态
2. **错误处理**：妥善处理网络错误和状态异常
3. **性能优化**：避免不必要的状态更新
4. **类型安全**：充分利用TypeScript的类型检查
5. **测试**：为状态管理编写单元测试
