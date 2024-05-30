<script>

import { socketIO } from '@/plugins/socket.js'
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
import UserBanner from '@/components/UserBanner.vue'
import Quiz from '@/components/Quiz.vue'
import { callAPI } from '@/helpers/callAPI.js'
import Loading from '@/components/Loading.vue'
import Podium from '@/components/Podium.vue'


export default {
  name: 'Room',
  components: { Podium, Loading, Quiz, UserBanner },
  data() {
    return {
      socket: null,
      sesh: useSessionStore,
      roomID: null,
      isConnected: false,
      playersOnMatch: [],
      fullRoom: false,
      gameStarted: false,
      questions: [],
      isAdmin: useSessionStore().user.roomAdmin,
      hideQuiz: false,
      responseOfUser: [],
      points: 0,
      activeAnswerResults: false,
      allPlayersFinishedTheQuiz: false,
      infoForPodium: null
    }

  },
  computed: {
    mode() {
      if (this.questions.length) {
        return {
          title: 'MultiplayerQuiz',
          class: 'custom__title',
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

  methods: {
    useSessionStore,
    router() {
      return router
    },
    startGame() {
      this.gameStarted = true
      this.socket.emit('gameStarted', {
        roomID: this.roomID,
        questions: this.questions
      })
    },

    async getRandomQuestions() {
      this.questions = await callAPI(`http://localhost:8000/api/ques/rand/5`)
    },

    saveResponses(response) {
      console.log(response)
      this.responseOfUser = response
      this.points = response.wasRight ? this.points + 10 : this.points
    },

    handleHideQuiz() {
      this.hideQuiz = true
      this.socket.emit('playerAnsweredQuestion', {
        succes: true,
        roomID: this.roomID
      })
    },

    handlePlayerFinishTheQuiz(finalScore) {
      this.socket.emit('playerFinish', {
        finalScore: finalScore,
        roomID: this.roomID
      })
    },

    //async startNewGame() {
    //  this.hideQuiz= false
    //  this.responseOfUser= []
    //  this.points= 0
    //  this.activeAnswerResults= false
    //  this.allPlayersFinishedTheQuiz= false
    //  this.infoForPodium= null
    //  this.mode.questionsForMultiplayerMatch = await callAPI('http://localhost:8000/api/ques/rand/5')
    //  this.startGame()
    //}

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
        admin: this.isAdmin
      })
    })

    this.socket.on('fullRoom', (res) => {
      if (res) this.fullRoom = true
    })


    this.socket.on('userJoinedSuccesfullyToRoom', (res) => {

      if (res.success === true) this.isConnected = true
      this.playersOnMatch = res.players

    })

    this.socket.on('gameStarted', (res) => {
      this.questions = [...res.questions]
      this.gameStarted = true
    })

    this.socket.on('playerAnsweredQuestion', () => true)

    this.socket.on('showResultsOfQuestion', () => {
      console.log('deben mostrarse results')
      this.activeAnswerResults = true
      setTimeout(() => {
        this.activeAnswerResults = false
        this.hideQuiz = false
      }, 1500)
    })

    this.socket.on('allPlayersHaveFinished', (res) => {
      console.log(res)
      this.allPlayersFinishedTheQuiz = true
      this.infoForPodium = res
    })

  },

  beforeRouteLeave() {
    useSessionStore().user.createdRoomID = null
    useSessionStore().user.joinedRoomID = null
    useSessionStore().user.socketInUse = null
    useSessionStore().user.roomAdmin = false

    this.socket && this.socket.emit('turnoff', () => true)
  },


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
           :class="{'--hide':this.hideQuiz}"
           v-if="gameStarted && this.questions.length">
    <quiz
          :mode="mode"
          @hideQuiz="handleHideQuiz"
          @responses="this.saveResponses"
          @playerFinishTheQuiz="handlePlayerFinishTheQuiz"
    ></quiz>

  </section>

  <loading v-if="gameStarted && this.hideQuiz && !this.activeAnswerResults"
           key-word="waiting"
           imgSrc="../../public/clock.svg"
  ></loading>

  <section v-if="this.hideQuiz && this.activeAnswerResults" class="room__after-response">

    <article>
      <p>The correct answer was... <strong>{{ this.responseOfUser?.correct }}</strong></p>
      <p>You
        <strong>
          {{
            (responseOfUser?.wasRight) ? 'were right!' : 'failed :('
          }}
        </strong>
      </p>
    </article>

    <p class="room__points">Total: {{ this.points }} points</p>

  </section>

  <article class="room__final-results"
           v-if="allPlayersFinishedTheQuiz && !this.activeAnswerResults && infoForPodium !== null">
   <podium :infoForPodium="this.infoForPodium"></podium>
   <div class="podium__container">
     <img class="podium__sparks"
          alt="color sparks" src="/public/virutas.svg">
   </div>
   <div class="podium__container--mod">
     <img class="podium__doodle" alt="melon doodle" src="/public/Vectorwmelon.svg">
     <img class="podium__doodle" alt="melon doodle" src="/public/cerealscereals.svg">
   </div>

    <!--
   <button class="primary-button"
     v-if="useSessionStore().user.roomAdmin" @click="startNewGame">Again</button>
    -->
  </article>
</template>
