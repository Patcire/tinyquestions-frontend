import {defineStore} from 'pinia'
import router from '@/router/router.js'
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
    async checkUserCredentials(username, password) {

      const response = await postAPI("http://localhost:8000/api/user/login", {
        "username": username,
        "password": password
      })

      const checkedUser = await response.json();

      if (checkedUser){
        this.user.isConnected = true
        this.user.username = username
        this.user.points = checkedUser.points
        this.user.quizzes_resolved = checkedUser.quizzes_resolved
        return this.user.isConnected
      }
      return this.user.isConnected
    },
      isLogged(){
        console.log('is loggued?:'+this.user.isConnected)
        return this.user.isConnected
      },
    async register(email, username, password){
      console.log('entramos on register')
      const response = await postAPI("http://localhost:8000/api/user/create", {
        "email": email,
        "username": username,
        "password": password
      })
      await console.log(await response)
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