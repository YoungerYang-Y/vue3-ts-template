<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const defaultAvatar = ref('https://via.placeholder.com/40x40/cccccc/ffffff?text=U')

function handleAvatarError(event: Event) {
  const img = event.target as HTMLImageElement
  img.src = defaultAvatar.value
}

function handleLogout() {
  // 使用console.log替代confirm，实际项目中可以使用UI组件库的确认对话框
  console.log('确定要退出登录吗？')
  userStore.logout()
  router.push('/login')
}

async function refreshUserInfo() {
  try {
    await userStore.refreshUserInfo()
    console.log('用户信息已刷新')
  }
  catch (error) {
    console.error('刷新用户信息失败:', error)
  }
}
</script>

<template>
  <div class="user-menu">
    <div v-if="userStore.isAuthenticated" class="user-info">
      <div class="user-avatar">
        <img
          :src="userStore.userInfo?.avatar || defaultAvatar"
          :alt="userStore.userInfo?.username"
          @error="handleAvatarError"
        >
      </div>
      <div class="user-details">
        <div class="username">
          {{ userStore.userInfo?.username }}
        </div>
        <div class="user-email">
          {{ userStore.userInfo?.email }}
        </div>
        <div class="user-role">
          {{ userStore.userInfo?.role }}
        </div>
      </div>
    </div>

    <div class="user-actions">
      <button
        v-if="userStore.isAuthenticated"
        class="logout-btn"
        :disabled="userStore.loading"
        @click="handleLogout"
      >
        {{ userStore.loading ? '登出中...' : '退出登录' }}
      </button>

      <button
        v-if="userStore.isAuthenticated"
        class="refresh-btn"
        :disabled="userStore.loading"
        @click="refreshUserInfo"
      >
        刷新信息
      </button>
    </div>

    <div v-if="!userStore.isAuthenticated" class="login-prompt">
      <p>请先登录</p>
      <router-link to="/login" class="login-link">
        去登录
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.user-menu {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  max-width: 300px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.user-avatar {
  margin-right: 15px;
}

.user-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f0f0f0;
}

.user-details {
  flex: 1;
}

.username {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.user-email {
  font-size: 14px;
  color: #666;
  margin-bottom: 2px;
}

.user-role {
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.user-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.logout-btn,
.refresh-btn {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.logout-btn {
  background: #ff4757;
  color: white;
}

.logout-btn:hover:not(:disabled) {
  background: #ff3742;
}

.refresh-btn {
  background: #3742fa;
  color: white;
}

.refresh-btn:hover:not(:disabled) {
  background: #2f3542;
}

.logout-btn:disabled,
.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-prompt {
  text-align: center;
  padding: 20px;
}

.login-prompt p {
  margin: 0 0 15px 0;
  color: #666;
}

.login-link {
  display: inline-block;
  padding: 8px 16px;
  background: #3742fa;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.login-link:hover {
  background: #2f3542;
}
</style>
