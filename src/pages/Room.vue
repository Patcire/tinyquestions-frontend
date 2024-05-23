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
      fullRoom: false
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
      this.roomID = useSessionStore().user.lastCreatedRoomID || useSessionStore().user.lastJoinedRoomID
      useSessionStore().user.socketInUse = this.socket.id

      this.socket.emit('joinRoom', this.roomID)
    })

    this.socket.on('fullRoom',(res) =>{
      if (res) this.fullRoom = true
    })

    this.socket.on('disconnect', () => {

      useSessionStore().user.lastCreatedRoomID = null
      useSessionStore().user.lastJoinedRoomID = null
      useSessionStore().user.socketInUse = null

    })

    this.socket.on('userJoinedRoom', (res)=>{
      console.log(res)
      if (res.hasJoined) this.isConnected = true
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
    <user-banner></user-banner>
  </article>

  <h3 v-if="roomID && isConnected && !fullRoom">room: {{this.roomID}}</h3>

  <button class="primary-button primary-button--modal-mod" @click="router().push('/games')">games</button>
  </section>

  <p v-if="fullRoom">Room field is completed!</p>
</template>
