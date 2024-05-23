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
      if (res) this.isConnected = true
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
    <user-banner></user-banner>
  </article>

  <h3 v-if="roomID && isConnected && !fullRoom">room: {{this.roomID}}</h3>

  <button class="primary-button primary-button--modal-mod" @click="router().push('/games')">games</button>
  </section>

  <p v-if="fullRoom">Room field is completed!</p>
</template>
