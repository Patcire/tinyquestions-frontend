
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import { createPinia } from 'pinia'
import Vountdown from '@logustra/vountdown'
import piniaPluginPersist from 'pinia-plugin-persist'
import socketPlugin from './plugins/socket';

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersist)

app.component('Vountdown', Vountdown).use(pinia).use(router).use(socketPlugin).mount('#app')