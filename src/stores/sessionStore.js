import {defineStore} from 'pinia'

export const useSessionStore = defineStore('user',{
  state: () => ({isConnected: false}),
  actions: {
    authenticade() {
      this.isConnected = !this.isConnected
      console.log(this.isConnected)
    }
  }
})