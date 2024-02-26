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

    isLogged(){
      console.log('is loggued?:'+this.user.isConnected)
      return this.user.isConnected
    },

    async checkUserCredentials(username, password) {

      const response = await postAPI("http://localhost:8000/api/user/login", {
        "username": username,
        "password": password
      })

      const checkedUser = await response.json()
      console.log('cu', checkedUser)

      if (checkedUser.user){
        this.user.isConnected = true
        this.user.username = username
        this.user.points = checkedUser.points
        this.user.quizzes_resolved = checkedUser.quizzes_resolved
        return this.user.isConnected
      }
      return this.user.isConnected
    },

    async register(email, username, password){

      const response = await postAPI("http://localhost:8000/api/user/create", {
        "username": username,
        "email": email,
        "password": password
      })
      //const created = await response.json()
      //return created
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