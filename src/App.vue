<script setup lang="ts">
import { NConfigProvider, NDialogProvider, NMessageProvider, NNotificationProvider } from 'naive-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

// 国际化配置
const { locale } = useI18n()

// 主题配置 - 为后续主题切换做准备
const theme = computed(() => {
  // 这里可以根据用户设置或系统主题来动态切换
  // 目前使用默认主题，后续可以扩展为支持暗色主题
  return null
})

// naive-ui 国际化配置
const naiveLocale = computed(() => {
  // 根据当前语言设置返回对应的naive-ui语言包
  // 目前项目支持中文和英文，可以根据需要扩展
  return locale.value === 'zh-CN' ? undefined : undefined // naive-ui会自动根据浏览器语言选择
})
</script>

<template>
  <NConfigProvider :theme="theme" :locale="naiveLocale">
    <NMessageProvider>
      <NNotificationProvider>
        <NDialogProvider>
          <RouterView />
        </NDialogProvider>
      </NNotificationProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped>
</style>
