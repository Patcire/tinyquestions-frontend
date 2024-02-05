import {defineStore} from 'pinia'

export const useSessionStore = defineStore('user',{
  state: () => ({isConnected: false}),
  actions: {
    authenticade() {
      this.state.isConnected = true
    }
  }
})