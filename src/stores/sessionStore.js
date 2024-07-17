import { defineStore } from 'pinia'
import { postAPI, updateAPI } from '@/helpers/callAPI.js'
import { apiDirection } from '@/helpers/others.js'

export const useSessionStore = defineStore('user',{

  state: () => ({
    user:{
      userID: 0,
      isConnected: false,
      username: "",
      points: 0,
      quizzes_resolved: 0,
      likedStorage: [],
      myQuizzesStorage: [],
      lastCustomQuizSelected: 0,
      createdRoomID: null,
      joinedRoomID: null,
      socketInUse: null,
      roomAdmin: false,
      token: '',
    },

  }),
  actions: {

    isLogged(){

      return this.user.isConnected
    },

    setUserConnected(username, points, quizzesResolved, userID, token){
      this.user.isConnected = true
      this.user.username = username
      this.user.points = points
      this.user.quizzes_resolved = quizzesResolved
      this.user.userID= userID
      this.user.likedStorage= []
      this.user.myQuizzesStorage= []
      this.lastCustomQuizSelected =  0
      this.roomAdmin = false
      this.createdRoomID =  null
      this.joinedRoomID = null
      this.socketInUse =  null
      this.user.token = token
    },


    async checkUserCredentials(username, password) {
      const response = await postAPI(`${apiDirection}/api/user/login`, {
        "username": username,
        "password": password
      })

      if (!response.ok) return false
      if (response.ok){
        const checkedUser = await response.json()
        if (checkedUser.user){
          this.setUserConnected(username,
            checkedUser.user.points,
            checkedUser.user.quizzes_resolved,
            checkedUser.user.id_user,
            checkedUser.token
          )
          return this.user.isConnected
        }
      }
      return false
    },

    async register(email, username, password){
      const response = await postAPI(`${apiDirection}/api/user/create`, {
        "username": username,
        "email": email,
        "password": password
      })
      if (response.ok){
        const created = await response.json()
        if (created.user.id_user)  this.setUserConnected(username, 0, 0, created.user.id_user, created.token)
        return this.user.isConnected
      }
      else if (response.status === 409) {
        return 'exist'
      }
      return false
    },

    async updateStats(){
      const response = await updateAPI(`${apiDirection}/api/user/userstat/${this.user.username}`, {
        "points": this.user.points,
        "quizzes_resolved": this.user.quizzes_resolved
      })
     }

  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,

      }
    ]
  }
})