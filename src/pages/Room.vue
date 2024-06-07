<script>

import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
import UserBanner from '@/components/UserBanner.vue'
import Quiz from '@/components/Quiz.vue'
import { callAPI } from '@/helpers/callAPI.js'
import Loading from '@/components/Loading.vue'
import Podium from '@/components/Podium.vue'
import { io } from 'socket.io-client'
import { apiDirection } from '@/helpers/others.js'

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
      infoForPodium: null,
      maxPlayers: null
    }

  },
  computed: {
    mode() {
      if (this.questions.length) {
        return {
          title: 'Multimatch',
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
      this.questions = await callAPI(`${apiDirection}/api/ques/rand/5`)
    },

    saveResponses(response) {
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

    handlePlayerFinishTheQuiz(infoServer) {
      this.socket.emit('playerFinish', {
        username: useSessionStore().user.username,
        finalScore: infoServer.points,
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
    //  this.mode.questionsForMultiplayerMatch = await callAPI('${apiDirection}/api/ques/rand/5')
    //  this.startGame()
    //}
    copySeed(){
      navigator.clipboard.writeText(this.roomID)
    },

    handleSocket(){

      this.socket = io.connect('http://localhost:', {
        transports: ['websocket'],
        forceNew: true})

      this.socket.on('maxPlayers', (res) => this.maxPlayers = res)

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
        if (res && !this.playersOnMatch.includes(useSessionStore().user.username)) this.fullRoom = true
      })

      this.socket.on('userJoinedSuccesfullyToRoom', (res) => {
        console.log('user joined ', res.players )
        if (res.success === true) this.isConnected = true
        this.playersOnMatch = res.players

      })

      this.socket.on('gameStarted', (res) => {
        this.questions = [...res.questions]
        this.gameStarted = true
      })

      this.socket.on('playerAnsweredQuestion', () => true)

      this.socket.on('showResultsOfQuestion', () => {
        this.activeAnswerResults = true
        setTimeout(() => {
          this.activeAnswerResults = false
          this.hideQuiz = false
        }, 1500)
      })

      this.socket.on('allPlayersHaveFinished', (res) => {
        this.allPlayersFinishedTheQuiz = true
        this.infoForPodium = res
      })

      this.socket.on('userExitTheRoom', (res) => {
        console.log('an user leaves the room ', res)
        this.playersOnMatch = res
      })


    }

  },

  created() {
    this.isAdmin && this.getRandomQuestions()
    this.handleSocket()

  },

  beforeRouteLeave() {
    console.log('exit')
    if (this.playersOnMatch.length === 1) this.socket.emit('deleteRoom', this.roomID)
    else{
      this.socket && this.socket.emit('turnoff', {
        roomID: this.roomID,
        username: useSessionStore().user.username
      })
    }

    this.socket.disconnect()
    useSessionStore().user.createdRoomID = null
    useSessionStore().user.joinedRoomID = null
    useSessionStore().user.socketInUse = null
    useSessionStore().user.roomAdmin = false
  }

}
</script>

<template>

  <!-- waiting room state (pre-match)-->
  <section v-if="!gameStarted && !this.fullRoom" class="room">

    <div class="room__title">
      <h1>Multiplayer</h1>
      <h1 class="room__title--mod">room</h1>
    </div>

    <article class="room__players">
      <div class="room__cont--row">
        <user-banner v-for="(player, index) in playersOnMatch" :player="player.username" :admin="index"></user-banner>
      </div>

    </article>

    <img class="room__ornament" alt="ornaments" src="/public/ornament.svg">

    <article class="room__info">

      <p>Players: {{playersOnMatch.length}}/{{this.maxPlayers}}</p>
      <img src="/public/pointpoint.svg" alt="point">
      <p class="room__info-content" v-if="roomID && isConnected && !fullRoom">Room seed: <button @click="copySeed(e)"  popovertarget="popover" class="room__id">{{this.roomID}}</button></p>


        <div id="popover" class="room__popover" popover>
          <p class="room__pop-message">Copied</p>
        </div>


    </article>

    <article class="room__cont">
      <button @click="startGame" v-if="useSessionStore().user.roomAdmin" class="primary-button room__pb--mod">Start</button>
    </article>

  </section>

  <!--if room is complete-->
  <section v-if="fullRoom" class="room__complete">
    <p>Room field is completed :(</p>
    <button class="primary-button" @click="router().push('/games')">Go back</button>
  </section>

  <!--quiz of the multiplayer match-->
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

  <!--loader-->
  <loading v-if="gameStarted && this.hideQuiz && !this.activeAnswerResults"
           key-word="waiting"
           imgSrc="../../public/clock.svg"
  ></loading>

  <!--response info-->
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

  <!--podium afer match-->
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

    <button class="primary-button" @click="router().push('/games')">Go back</button>
    <!--
   <button class="primary-button"
     v-if="useSessionStore().user.roomAdmin" @click="startNewGame">Again</button>
    -->
  </article>

</template>
