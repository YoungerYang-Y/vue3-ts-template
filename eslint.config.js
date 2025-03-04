// eslint.config.js
import antfu from '@antfu/eslint-config'
import parserTs from '@typescript-eslint/parser' // 需额外安装

export default antfu({
  typescript: true, // 启用 TS 支持
  vue: true, // 启用 Vue 支持
  parserOptions: {
    parser: parserTs, // 指定 TS 解析器（参考内容提到 parser 配置）
  },
})
