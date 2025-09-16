<script setup lang="ts">
import type { LoginForm } from '@/stores/user'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
  remember: false,
})

async function handleLogin() {
  if (!loginForm.username || !loginForm.password) {
    console.warn('请输入用户名和密码')
    return
  }

  try {
    // 使用pinia store进行登录
    await userStore.login(loginForm)

    console.log('登录成功:', userStore.userInfo)

    // 跳转到目标页面或首页
    const redirect = route.query.redirect as string || '/'
    router.push(redirect)
  }
  catch (error) {
    console.error('登录失败:', error)
    console.error('登录失败，请重试')
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h2>用户登录</h2>
        <p>请输入您的登录凭据</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="loginForm.username"
            type="text"
            placeholder="请输入用户名"
            required
          >
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            required
          >
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input
              v-model="loginForm.remember"
              type="checkbox"
            >
            记住我
          </label>
        </div>

        <button
          type="submit"
          class="login-btn"
          :disabled="userStore.loading"
        >
          {{ userStore.loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <div class="login-footer">
        <p>
          <a href="/register">注册账号</a>
          <span> | </span>
          <a href="/forgot-password">忘记密码？</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-box {
  background: white;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  color: #333;
  margin: 0 0 10px 0;
  font-size: 28px;
}

.login-header p {
  color: #666;
  margin: 0;
  font-size: 14px;
}

.login-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
}

.form-group input[type='text'],
.form-group input[type='password'] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-group input[type='text']:focus,
.form-group input[type='password']:focus {
  outline: none;
  border-color: #667eea;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.checkbox-label input[type='checkbox'] {
  margin-right: 8px;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s;
}

.login-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-footer {
  text-align: center;
}

.login-footer p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.login-footer a {
  color: #667eea;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}
</style>
