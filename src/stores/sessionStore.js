import {defineStore} from 'pinia'
import router from '@/router/router.js'

export const useSessionStore = defineStore('user',{
  state: () => ({isConnected: false}),
  actions: {

    checkUserCredentials() {
      useSessionStore().isConnected = !useSessionStore().isConnected
      console.log(useSessionStore().isConnected)
    }
  }
})