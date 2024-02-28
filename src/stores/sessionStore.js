import { defineStore } from 'pinia'
import { postAPI } from '@/helpers/callAPI.js'

export const useSessionStore = defineStore('user',{

  state: () => ({
    user:{
      userID: 0,
      isConnected: false,
      username: "",
      points: 0,
      quizzes_resolved: 0,
      likedStorage: [],
      myQuizzesStorage: []
    },

  }),
  actions: {

    isLogged(){
      //console.log('is loggued?:'+this.user.isConnected)
      return this.user.isConnected
    },

    setUserConnected(username, points, quizzesResolved, userID){
      this.user.isConnected = true;
      this.user.username = username;
      this.user.points = points;
      this.user.quizzes_resolved = quizzesResolved;
      this.user.userID= userID
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
          this.setUserConnected(username, checkedUser.user.points, checkedUser.user.quizzes_resolved, checkedUser.user.id_user)
          console.log(this.user.userID, this.user.username)
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
        if (created.id_user)  this.setUserConnected(username, 0, 0)
        return this.user.isConnected
      }
      else if (response.status === 409) {
        return 'exist'
      }
      return false
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key:"pepe",
        storage: localStorage
      }
    ]
  }
})