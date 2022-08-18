import { createApp } from 'vue';

import 'element-plus/theme-chalk/display.css';
import App from './App.vue';
const app = createApp(App);

import { VueClipboard } from '@soerenmartius/vue3-clipboard';
app.use(VueClipboard);

// layout components
import layoutComp from './layouts/components/export';
layoutComp(app);

// router
import router from './router/index';
app.use(router);

// vuex
import store from '@/store';
app.use(store);

import iconPark from './plugin/icon-park';
iconPark(app);

import loadI18n from './plugin/i18n';
loadI18n(app);

app.mount('#app');
