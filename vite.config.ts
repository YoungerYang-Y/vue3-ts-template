import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: 'src/components.d.ts',
    }),
    AutoImport({
      imports: [
        'vue',
      ],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true, // 允许在 <template> 直接使用自动导入的 API
    }),
  ],
})
