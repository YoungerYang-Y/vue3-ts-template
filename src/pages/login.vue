<script setup lang="ts">
import type { LoginForm } from '@/stores/user'
import { NButton, NCard, NCheckbox, NDivider, NForm, NFormItem, NGrid, NGridItem, NInput, NSpace, useMessage } from 'naive-ui'

import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const message = useMessage()

const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
  remember: false,
})

const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['input', 'blur'],
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['input', 'blur'],
  },
}

async function handleLogin() {
  if (!loginForm.username || !loginForm.password) {
    message.warning('请输入用户名和密码')
    return
  }

  try {
    // 使用pinia store进行登录
    await userStore.login(loginForm)

    message.success('登录成功')
    console.log('登录成功:', userStore.userInfo)

    // 跳转到目标页面或首页
    const redirect = route.query.redirect as string || '/'
    router.push(redirect)
  }
  catch (error) {
    console.error('登录失败:', error)
    message.error('登录失败，请重试')
  }
}
</script>

<template>
  <div class="login-container">
    <NGrid :cols="24" :x-gap="0" class="login-grid">
      <!-- 左侧区域 - 品牌展示区 -->
      <NGridItem :span="12" class="login-left">
        <div class="brand-section">
          <div class="brand-content">
            <div class="brand-logo">
              <div class="logo-placeholder">
                <div class="logo-icon">
                  <div class="icon-shape" />
                  <div class="icon-dot" />
                </div>
              </div>
            </div>
            <h1 class="brand-title">
              欢迎回来
            </h1>
            <p class="brand-subtitle">
              请登录您的账户以继续使用我们的服务
            </p>
          </div>
        </div>
      </NGridItem>

      <!-- 右侧区域 - 登录表单 -->
      <NGridItem :span="12" class="login-right">
        <div class="form-section">
          <NCard class="login-card" :bordered="false">
            <div class="login-header">
              <h2 class="login-title">
                用户登录
              </h2>
              <p class="login-subtitle">
                请输入您的登录凭据
              </p>
            </div>

            <NForm
              :model="loginForm"
              :rules="rules"
              class="login-form"
              @submit.prevent="handleLogin"
            >
              <NFormItem path="username" label="用户名">
                <NInput
                  v-model:value="loginForm.username"
                  placeholder="请输入用户名"
                  size="large"
                  :input-props="{ autocomplete: 'username' }"
                />
              </NFormItem>

              <NFormItem path="password" label="密码">
                <NInput
                  v-model:value="loginForm.password"
                  type="password"
                  placeholder="请输入密码"
                  size="large"
                  show-password-on="click"
                  :input-props="{ autocomplete: 'current-password' }"
                />
              </NFormItem>

              <NFormItem>
                <div class="form-options">
                  <NCheckbox v-model:checked="loginForm.remember">
                    记住我
                  </NCheckbox>
                  <a href="/forgot-password" class="forgot-link">忘记密码？</a>
                </div>
              </NFormItem>

              <NFormItem>
                <NButton
                  type="primary"
                  size="large"
                  block
                  :loading="userStore.loading"
                  @click="handleLogin"
                >
                  {{ userStore.loading ? '登录中...' : '登录' }}
                </NButton>
              </NFormItem>
            </NForm>

            <NDivider class="login-divider">
              <span class="divider-text">或</span>
            </NDivider>

            <div class="login-footer">
              <NSpace justify="center">
                <span class="footer-text">还没有账号？</span>
                <a href="/register" class="register-link">立即注册</a>
              </NSpace>
            </div>
          </NCard>
        </div>
      </NGridItem>
    </NGrid>
  </div>
</template>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background: #f5f7fa;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.login-grid {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

/* 左侧品牌区域 */
.login-left {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff4757 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.login-left::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.1;
}

.brand-section {
  text-align: center;
  color: white;
  z-index: 1;
  position: relative;
  padding: 2rem;
}

.brand-content {
  max-width: 400px;
}

.brand-logo {
  margin-bottom: 2rem;
}

.logo-placeholder {
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
}

.logo-icon {
  position: relative;
  width: 60px;
  height: 60px;
}

.icon-shape {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
}

.icon-dot {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.brand-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  background: linear-gradient(45deg, #fff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-subtitle {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
  line-height: 1.6;
}

/* 右侧表单区域 */
.login-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #f5f7fa;
  height: 100vh;
  margin: 0;
}

.form-section {
  width: 100%;
  max-width: 450px;
}

.login-card {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 2.5rem;
  background: white;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
}

.login-subtitle {
  color: #666;
  margin: 0;
  font-size: 0.95rem;
}

.login-form {
  margin-bottom: 1.5rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.forgot-link {
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.forgot-link:hover {
  color: #5a6fd8;
  text-decoration: underline;
}

.login-divider {
  margin: 1.5rem 0;
}

.divider-text {
  color: #999;
  font-size: 0.9rem;
  padding: 0 1rem;
  background: white;
}

.login-footer {
  text-align: center;
}

.footer-text {
  color: #666;
  font-size: 0.9rem;
}

.register-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.register-link:hover {
  color: #5a6fd8;
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-grid {
    display: block;
  }

  .login-left {
    min-height: 40vh;
  }

  .brand-title {
    font-size: 2rem;
  }

  .brand-subtitle {
    font-size: 1rem;
  }

  .logo-placeholder {
    width: 80px;
    height: 80px;
  }

  .logo-text {
    font-size: 1.5rem;
  }

  .login-card {
    padding: 1.5rem;
    margin: 1rem;
  }

  .login-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .login-right {
    padding: 1rem;
  }

  .login-card {
    padding: 1rem;
    margin: 0.5rem;
  }

  .form-options {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}
</style>
