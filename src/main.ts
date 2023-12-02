import { createApp } from 'vue';
import pinia from './stores';
import { router } from './router';
import { routerIntercept } from './router/utils/intercept';
import Element from './App.vue';

// 样式
import 'virtual:uno.css';
import 'nprogress/nprogress.css';
import '@/assets/css/antd.less';
import '@/assets/css/public.less';
import '@/assets/css/scrollbar.less';
import '@/assets/css/theme-color.less';
import 'ant-design-vue/dist/reset.css';

const app = createApp(Element);
app
  .use(pinia)
  .use(router);

router.isReady().then(() => {
  // 路由拦截处理
  routerIntercept(router);
  app.mount('#app');
});
