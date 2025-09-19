import naive from 'naive-ui'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './locales/i18n'
import router from './router'
import './assets/css/global.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(i18n as any)
app.use(router)
app.use(naive)
app.mount('#app')
