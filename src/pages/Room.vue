<script>

import { socketIO } from '@/plugins/socket.js'
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
import UserBanner from '@/components/UserBanner.vue'
import Quiz from '@/components/Quiz.vue'
import { callAPI } from '@/helpers/callAPI.js'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Room',
  components: { Loading, Quiz, UserBanner },
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
      isAdmin:  useSessionStore().user.roomAdmin,
      stopQuiz: false,
      playersWhoAnsweredQuestion: 0
    }

  },
  computed:{
    mode(){
      if (this.questions.length){
        return {
          title:'MultiplayerQuiz',
          class:'custom__title',
          clock: [false, 10000], // miliseconds
          numberOfQuestions: this.questions.length,
          hasScore: true,
          rerun: false,
          isCustom: true,
          isMultiplayer: 1, // boolean
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
      this.questions = await callAPI(`http://localhost:8000/api/ques/rand/5`)
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

    this.socket.on('playerAnsweredQuestion', ()=>{
      this.playersWhoAnsweredQuestion++
    })


  },

  beforeRouteLeave() {
    useSessionStore().user.createdRoomID = null
    useSessionStore().user.joinedRoomID = null
    useSessionStore().user.socketInUse = null
    useSessionStore().user.roomAdmin = false

    this.socket &&  this.socket.emit('turnoff', () => true)
  },

  watch:{

    stopQuiz(){
      this.socket.emit('playerAnsweredQuestion', {
        succes: true,
        roomID: this.roomID})
      },

    playersWhoAnsweredQuestion(value){
      console.log('contestan')
      console.log(value)
      console.log(this.playersOnMatch.length)
      if (value === this.playersOnMatch.length){
        this.stopQuiz = false
        this.playersWhoAnsweredQuestion = 0

      }
    }
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

  <section class="room__quiz"
           :class="{'--hide':this.stopQuiz}"
           v-if="gameStarted && this.questions.length">
    <quiz
          :mode="mode"
          @stopQuiz="this.stopQuiz=true"
    ></quiz>

  </section>

  <loading v-if="gameStarted && this.stopQuiz"
           key-word="waiting"
           imgSrc="../../public/clock.svg"
  ></loading>


</template>
