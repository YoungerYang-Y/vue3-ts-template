# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Project Structure

```
vue3-ts-template
├── node_modules
├── public
│   └── vite.svg
├── src
│   ├── assets          # 静态资源
│   ├── components      # 组件
│   ├── layouts         # 布局
│   ├── locales         # i18n
│   ├── pages           # 页面
│   ├── types           # 类型声明
│   ├── App.vue
│   └── main.ts
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Core Dependencies

- [vue](https://cn.vuejs.org/): 渐进式Javascript框架
- [vue-i18n](https://vue-i18n.intlify.dev/): Vue多语言插件
- [vue-router](https://router.vuejs.org/zh/): Vue路由

## Development Dependencies

- [@antfu/eslint-config](https://github.com/antfu/eslint-config): eslint配置集
- [@commitlint/cli](): git提交检查
- [@commitlint/config-conventional](): git提交检查
- [typescript](https://www.typescriptlang.org/): 强类型Javascript
- [eslint](https://eslint.org/): 静态代码检查
- [eslint-plugin-format](https://eslint.org/): 静态代码检查
- [husky](https://github.com/typicode/husky): 提交代码时触发检查
- [lint-staged](https://github.com/okonet/lint-staged): 提交代码时触发检查
- [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import): 按需自动导入 API，减少重复代码
- [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components): 按需自动导入 Vue 组件
- [unplugin-vue-router](https://github.com/posva/unplugin-vue-router): 基于文件的自动路由
- [vite](https://vitejs.dev/): 前端构建工具，快速搭建Vue项目
- [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts): Vue布局插件
- [vue-tsc](https://github.com/johnsoncodehk/vue-tsc): 静态类型检查

## Project Setup

```sh
# install dependencies
pnpm install

# serve with hot reload at localhost:3000
pnpm run dev

# build for production with minification
pnpm run build

```

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
