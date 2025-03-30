import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueLazyload from 'vue-lazyload';
import { registerSW } from 'virtual:pwa-register';
import router from './router';
import App from './App.vue';
import './index.scss';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(VueLazyload);
app.mount('#app');

registerSW();
