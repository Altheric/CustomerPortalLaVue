import './bootstrap';
import { createApp } from 'vue'
import '../css/app.css'
import App from './App.vue'
import { useRouterInApp } from './services/router';
const app = useRouterInApp(createApp(App))

app.mount("#app");