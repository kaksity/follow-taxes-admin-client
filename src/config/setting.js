/**
 * @description 公共配置文件
 * @author hu-snail 1217437592@qq.com
 * vite相关的配置文件参考 https://cn.vitejs.dev/config/#define
 */

export const setting = {
  base: './',
  publicDir: 'public',
  cacheDir: 'node_modules/.vite',
  outDir: 'dist',
  assetsDir: 'static/',
  sourcemap: false,
  chunkSizeWarningLimit: 2000,
  cssCodeSplit: true,
  brotliSize: false,
  host: '0.0.0.0',
  port: '8089',
  strictPort: false,
  open: true,
  progressBar: true,
  defaultOpeneds: ['/comp', '/errorPage', '/chart'],
  uniqueOpened: false,
  tokenName: 'authorization',
  loginInterception: true,
  tokenTableName: 'vue3-admin-template',
  langKey: 'i18nLang',
  themeKey: 'theme',
  lang: 'en',
  storage: 'localStorage',
  title: 'vue3-admin-template',
  copyright: '© hu-snail-2021 vue3-admin-element-template',
  footerCopyright: true,
  keepAliveMaxNum: 99,
  authentication: 'intelligence',
  recordRoute: true,
  routesWhiteList: ['/login', '/register', '/404', '/401'],
  debounce: [],
  extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  logLevel: 'info',
  clearScreen: false,
  drop_console: true,
  drop_debugger: true,
};
