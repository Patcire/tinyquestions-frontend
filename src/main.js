
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import { createPinia } from 'pinia'
import Vountdown from '@logustra/vountdown'

const app = createApp(App)
const pinia = createPinia()
app.component('Vountdown', Vountdown).use(pinia).use(router).mount('#app')