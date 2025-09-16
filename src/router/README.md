# 路由守卫系统

本项目实现了完整的路由守卫系统，确保用户未登录时只能访问登录页面。

## 文件结构

```
src/router/
├── index.ts      # 路由配置入口
├── guards.ts      # 路由守卫实现
└── README.md     # 说明文档
```

## 功能特性

### 路由守卫功能

- ✅ 全局前置守卫（认证检查）
- ✅ 全局后置钩子（页面标题设置）
- ✅ 全局解析守卫（权限检查）
- ✅ 白名单路由支持
- ✅ 登录重定向功能

### 认证系统

- ✅ Token管理（localStorage/sessionStorage）
- ✅ 自动登录状态检查
- ✅ 登录页面重定向
- ✅ 登出功能

## 白名单路由

以下路由不需要登录即可访问：

- `/login` - 登录页面
- `/register` - 注册页面
- `/forgot-password` - 忘记密码页面
- `/404` - 404错误页面
- `/500` - 500错误页面

## 使用说明

### 1. 路由守卫逻辑

```typescript
// 用户已登录
if (isAuthenticated()) {
  // 访问登录页 -> 重定向到首页
  if (to.path === '/login') {
    next('/')
    return
  }
  // 其他页面正常访问
  next()
  return
}

// 用户未登录
if (isInWhiteList(to.path)) {
  // 白名单页面可以访问
  next()
  return
}

// 其他页面需要登录，重定向到登录页
next({
  path: '/login',
  query: {
    redirect: to.fullPath, // 保存原始路径
  },
})
```

### 2. 认证工具使用

```typescript
import {
  clearToken,
  getToken,
  isAuthenticated,
  logout,
  setToken
} from '@/utils/auth'

// 检查登录状态
const isLoggedIn = isAuthenticated()

// 设置token（记住用户）
setToken('user-token', true) // localStorage
setToken('user-token', false) // sessionStorage

// 获取token
const token = getToken()

// 清除token
clearToken()

// 用户登出
logout()
```

### 3. 登录页面集成

登录页面会自动处理：

- 表单验证
- Token存储
- 重定向到目标页面
- 记住用户选项

### 4. HTTP请求集成

HTTP请求会自动：

- 添加Authorization头
- 处理401错误（自动清除token）
- 统一错误处理

## 配置说明

### 添加新的白名单路由

在 `src/router/guards.ts` 中修改 `WHITE_LIST` 数组：

```typescript
const WHITE_LIST = [
  '/login',
  '/register',
  '/forgot-password',
  '/404',
  '/500',
  '/new-public-page', // 新增公开页面
]
```

### 自定义认证逻辑

可以修改 `src/utils/auth.ts` 中的认证逻辑：

```typescript
// 自定义认证检查
export function isAuthenticated(): boolean {
  const token = getToken()
  // 可以添加token有效性检查
  return !!token && isTokenValid(token)
}
```

## 安全特性

1. **Token管理**：支持localStorage和sessionStorage两种存储方式
2. **自动登出**：401错误时自动清除token
3. **重定向保护**：防止未授权访问
4. **白名单机制**：灵活的公开页面配置

## 注意事项

1. 确保所有需要认证的页面都在路由中正确配置
2. 登录页面应该使用独立的布局或样式
3. 考虑添加token过期时间检查
4. 可以集成更复杂的权限系统（角色、权限等）

## 扩展功能

可以根据需要扩展以下功能：

- 角色权限控制
- 路由缓存
- 页面访问统计
- 多级权限验证
- 动态路由加载
