<script>

import { socketIO } from '@/plugins/socket.js'
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
import UserBanner from '@/components/UserBanner.vue'
import Quiz from '@/components/Quiz.vue'
import { callAPI } from '@/helpers/callAPI.js'
import { computed } from 'vue'

export default {
  name: 'Room',
  components: { Quiz, UserBanner },
  data() {
    return {
      message: '',
      allMsg: [],
      socket: null,
      sesh: useSessionStore,
      roomID: null,
      isConnected: false,
      playersOnMatch:[],
      fullRoom: false,
      gameStarted: false,
      quizID: 4,
      questions: [],
      isAdmin:  useSessionStore().user.roomAdmin
    }

  },
  computed:{
    mode(){
      if (this.questions.length){
        return {
          title:'Multiplayer Random Quiz',
          class:'custom__title',
          clock: [false, 10000], // miliseconds
          numberOfQuestions: this.questions.length,
          hasScore: true,
          rerun: false,
          isCustom: true,
          idCustomquiz: this.quizID,
          isMultiplayer: 1,
          questionsForMultiplayerMatch: this.questions

        }
      }
     return null
    }

  },

  methods:{
    useSessionStore,
    router() {
      return router
    },
    startGame(){
      this.gameStarted = true
      this.socket.emit('gameStarted', {
        roomID: this.roomID,
        questions: this.questions
      })
    },

    async getRandomQuestions(){
      this.questions = await callAPI(`http://localhost:8000/api/ques/rand/12`)
    }

  },

  created() {

    this.isAdmin && this.getRandomQuestions()

    this.socket = socketIO

    this.socket.on('connect', () => {

      this.roomID = useSessionStore().user.createdRoomID || useSessionStore().user.joinedRoomID
      useSessionStore().user.socketInUse = this.socket.id

      this.socket.emit('joinRoom', {
        roomID: this.roomID,
        username: useSessionStore().user.username,
        admin:  this.isAdmin
      })
    })

    this.socket.on('fullRoom',(res) =>{
      if (res) this.fullRoom = true
    })


    this.socket.on('userJoinedSuccesfullyToRoom', (res)=>{

      if (res.success===true) this.isConnected = true
      this.playersOnMatch = res.players

    })

    this.socket.on('gameStarted', (res)=>{
        this.questions = [...res.questions]
        this.gameStarted = true
    })

    this.socket.on('disconnect', () => {

      useSessionStore().user.createdRoomID = null
      useSessionStore().user.joinedRoomID = null
      useSessionStore().user.socketInUse = null
      useSessionStore().user.roomAdmin = false
      this.playersOnMatch = []
      this.questions = []

    })

  },

  beforeRouteLeave() {
    this.socket && this.socket.disconnect()
  }

}
</script>

<template>

  <section v-if="!gameStarted" class="room">

    <div class="room__title">
      <h1>Multiplayer</h1>
      <h1 class="room__title--mod">room</h1>
    </div>

    <article class="room__players">
      <user-banner v-for="player in playersOnMatch" :player="player"></user-banner>
    </article>

    <img class="room__ornament" alt="ornaments" src="/public/ornament.svg">

    <article class="room__info">
      <p>Players: {{playersOnMatch.length}}/4</p>
      <img src="/public/pointpoint.svg" alt="point">
      <h3 v-if="roomID && isConnected && !fullRoom">Room seed: <span class="room__id">{{this.roomID}}</span></h3>
    </article>

    <article class="room__cont">
      <button @click="startGame" v-if="useSessionStore().user.roomAdmin" class="primary-button">Start</button>
    </article>

  </section>

  <p v-if="fullRoom">Room field is completed!</p>
  <quiz v-if="gameStarted && this.questions.length" :mode="mode"></quiz>

</template>
