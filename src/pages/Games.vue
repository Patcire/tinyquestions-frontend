<script>

import BigButtonsMenu from '@/components/BigButtonsMenu.vue'
import router from '@/router/router.js'
import { useSessionStore } from '@/stores/sessionStore.js'

export default {
  name: 'Games',
  components: { BigButtonsMenu },
  data(){
    return{
      roomID: null
    }
  },

  methods: {
    router() {
      return router
    },
    generateRoomID(){
      console.log('genereting roomID...')
      useSessionStore().user.createdRoomID = crypto.randomUUID().split('-')[4]
      useSessionStore().user.roomAdmin = true
      this.router().push('/room')
    },

    joinToExistingRoom(){
      useSessionStore().user.joinedRoomID = this.roomID
      this.router().push('/room')
    }
  },
}

</script>

<template>
  <section class="games">
    <div class="games__container">
      <img class="games__hand" src="../../public/Vectorhand.svg" alt="hand doodle">
    </div>
    <BigButtonsMenu></BigButtonsMenu>
    <div class="games__container games__container--mod">
      <img class="games__daydream" src="../../public/Vectordaydream.svg" alt="hand doodle">
    </div>
  </section>
  <section>

    <div>
      <button class="primary-button" @click="generateRoomID">create</button>
    </div>

    <form>
      <label>join to a room</label>
      <input type="text" placeholder="ej: hola" v-model="roomID">
      <button @click.prevent="joinToExistingRoom">send</button>
    </form>

  </section>
</template>
