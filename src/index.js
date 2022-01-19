import { createApp, h } from "vue";
import App from "./app.vue";

if (process.env.NODE_ENV === 'development') {
  createApp({
    render: () => h(App)
  }).mount('#root');
}

export default {
  MonorepoVueComponent: App
}