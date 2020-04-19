import Vue from 'vue';
import Handler from '@mudas/plugin-vue-handler';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Handler);

new Vue({
  render: h => h(App)
}).$mount('#app');
