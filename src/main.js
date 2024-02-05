/*
import { createApp } from 'vue'

import App from './App.vue'
import router from '@/router/router.js'

createApp(App).use(router).mount('#app')
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import { createPinia } from 'pinia'
import { useSessionStore } from '@/stores/sessionStore.js'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

const seshStore = useSessionStore()
app.provide('seshStore', seshStore)

app.use(router).mount('#app')