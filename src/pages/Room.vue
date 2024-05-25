<script>

import { socketIO } from '@/plugins/socket.js'
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
import UserBanner from '@/components/UserBanner.vue'

export default {
  name: 'Room',
  components: { UserBanner },
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
    };
  },
  methods:{
    router() {
      return router
    },

  },

  created() {
    this.socket = socketIO

    this.socket.on('connect', () => {

      this.roomID = useSessionStore().user.createdRoomID || useSessionStore().user.joinedRoomID
      useSessionStore().user.socketInUse = this.socket.id

      this.socket.emit('joinRoom', {
        roomID: this.roomID,
        username: useSessionStore().user.username,
        admin:  useSessionStore().user.roomAdmin
      })
    })

    this.socket.on('fullRoom',(res) =>{
      if (res) this.fullRoom = true
    })


    this.socket.on('userJoinedSuccesfullyToRoom', (res)=>{
      console.log(res)
      if (res.success===true) this.isConnected = true
      this.playersOnMatch = res.players
      console.log('onroo '+res.players)
    })


    this.socket.on('disconnect', () => {

      useSessionStore().user.createdRoomID = null
      useSessionStore().user.joinedRoomID = null
      useSessionStore().user.socketInUse = null
      useSessionStore().user.roomAdmin = false

    })

  },

  beforeRouteLeave() {
    this.socket && this.socket.disconnect()
  }

}
</script>

<template>

  <section class="room">

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
      <button class="primary-button">Start</button>
    </article>

  </section>

  <p v-if="fullRoom">Room field is completed!</p>
</template>
