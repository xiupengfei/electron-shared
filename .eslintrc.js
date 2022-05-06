/*
 * @Descripttion: ESlint配置
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-12-19 15:00:39
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2022-01-03 13:48:07
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/no-setup-props-destructure': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'spaced-comment': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'linebreak-style': ['error', 'unix'],
  },
})
