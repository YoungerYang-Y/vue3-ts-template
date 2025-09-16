<script setup lang="ts">
import UserMenu from '@/components/UserMenu.vue'
import { useUserStore } from '@/stores/user'
import { getTokenStorageType } from '@/utils/auth'

const userStore = useUserStore()

async function refreshUserInfo() {
  try {
    await userStore.refreshUserInfo()
    console.log('用户信息刷新成功')
  }
  catch (error) {
    console.error(`刷新失败: ${error}`)
  }
}

async function checkTokenValidity() {
  try {
    const isValid = await userStore.checkTokenValidity()
    console.log(`Token验证结果: ${isValid ? '有效' : '无效'}`)
  }
  catch (error) {
    console.error(`Token验证失败: ${error}`)
  }
}

function updateUserInfo() {
  const newInfo = {
    username: `${userStore.userInfo?.username}_updated`,
    email: `updated_${userStore.userInfo?.email}`,
  }

  userStore.updateUserInfo(newInfo)
  console.log('用户信息已更新')
}
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>仪表板</h1>
      <p>欢迎使用Pinia状态管理系统</p>
    </div>

    <div class="dashboard-content">
      <div class="info-cards">
        <div class="info-card">
          <h3>用户状态</h3>
          <p>登录状态: {{ userStore.isAuthenticated ? '已登录' : '未登录' }}</p>
          <p>用户名: {{ userStore.userInfo?.username || '无' }}</p>
          <p>邮箱: {{ userStore.userInfo?.email || '无' }}</p>
          <p>角色: {{ userStore.userInfo?.role || '无' }}</p>
        </div>

        <div class="info-card">
          <h3>权限信息</h3>
          <p>读取权限: {{ userStore.hasPermission('read') ? '有' : '无' }}</p>
          <p>写入权限: {{ userStore.hasPermission('write') ? '有' : '无' }}</p>
          <p>管理员权限: {{ userStore.hasPermission('admin') ? '有' : '无' }}</p>
        </div>

        <div class="info-card">
          <h3>Token信息</h3>
          <p>Token: {{ userStore.token ? '已设置' : '未设置' }}</p>
          <p>存储方式: {{ getTokenStorageType() }}</p>
          <p>加载状态: {{ userStore.loading ? '加载中' : '空闲' }}</p>
        </div>
      </div>

      <div class="actions-section">
        <h3>操作面板</h3>
        <div class="action-buttons">
          <button
            :disabled="userStore.loading"
            class="action-btn primary"
            @click="refreshUserInfo"
          >
            {{ userStore.loading ? '刷新中...' : '刷新用户信息' }}
          </button>

          <button
            :disabled="userStore.loading"
            class="action-btn secondary"
            @click="checkTokenValidity"
          >
            验证Token
          </button>

          <button
            :disabled="userStore.loading"
            class="action-btn tertiary"
            @click="updateUserInfo"
          >
            更新用户信息
          </button>
        </div>
      </div>

      <div class="user-menu-section">
        <h3>用户菜单组件</h3>
        <UserMenu />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 30px;
}

.dashboard-header h1 {
  color: #333;
  margin: 0 0 10px 0;
  font-size: 32px;
}

.dashboard-header p {
  color: #666;
  margin: 0;
  font-size: 16px;
}

.dashboard-content {
  display: grid;
  gap: 30px;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.info-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.info-card h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.info-card p {
  margin: 8px 0;
  color: #666;
  font-size: 14px;
}

.actions-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.actions-section h3 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
}

.action-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn.primary {
  background: #3742fa;
  color: white;
}

.action-btn.primary:hover:not(:disabled) {
  background: #2f3542;
}

.action-btn.secondary {
  background: #2ed573;
  color: white;
}

.action-btn.secondary:hover:not(:disabled) {
  background: #26d065;
}

.action-btn.tertiary {
  background: #ffa502;
  color: white;
}

.action-btn.tertiary:hover:not(:disabled) {
  background: #ff9500;
}

.user-menu-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.user-menu-section h3 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
}
</style>
