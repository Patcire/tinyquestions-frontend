import { defineStore } from 'pinia'
import { postAPI } from '@/helpers/callAPI.js'

export const useSessionStore = defineStore('user',{
  state: () => ({
    user:{
      isConnected: false,
      username: "",
      points:0,
      quizzes_resolved:0
    }
  }),
  actions: {

    isLogged(){
      console.log('is loggued?:'+this.user.isConnected)
      return this.user.isConnected
    },

    async checkUserCredentials(username, password) {
      const response = await postAPI("http://localhost:8000/api/user/login", {
        "username": username,
        "password": password
      })
      console.log(response)
      if (!response.ok) return false
      if (response.ok){
        const checkedUser = await response.json()
        if (checkedUser.user){
          this.user.isConnected = true
          this.user.username = username
          this.user.points = checkedUser.points
          this.user.quizzes_resolved = checkedUser.quizzes_resolved

          return this.user.isConnected
        }
      }

      return false
    },

    async register(email, username, password){

      const response = await postAPI("http://localhost:8000/api/user/create", {
        "username": username,
        "email": email,
        "password": password
      })
      if (response.ok){
        const created = await response.json()
        if (created.id_user)this.user.isConnected = true
        return this.user.isConnected
      }

      if (response.status === 409) {
        return 'exist'
      }
      return false
    }
  },
  persist: {
    enabled:true,
    strategies: [
      {
        key:"user",
        storage: localStorage
      }
    ]
  }
})