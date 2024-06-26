<script>

import BigButtonsMenu from '@/components/BigButtonsMenu.vue'
import router from '@/router/router.js'
import { useSessionStore } from '@/stores/sessionStore.js'
import { v4 as uuidv4 } from 'uuid';

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
      useSessionStore().user.createdRoomID = uuidv4().split('-')[4]
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

    <article class="games__content">
      <div class="games__container">
        <img class="games__hand" src="/public/Vectorhand.svg" alt="hand doodle">
      </div>
      <BigButtonsMenu></BigButtonsMenu>
      <div class="games__container games__container--mod">
        <img class="games__daydream" src="/public/Vectordaydream.svg" alt="hand doodle">
      </div>
    </article>

    <article class="multi">
      <h3 class="multi__title">Multiplayer</h3>

      <form class="multi__join">
        <input type="text" placeholder="Room seed..."
               v-model="roomID" class="multi__input">
        <button @click.prevent="joinToExistingRoom" class="multi__b-mod primary-button">Enter</button>
      </form>

      <div class="multi__create">
        <h3 class="">Or create new one</h3>
        <button  @click="generateRoomID" class="multi__new">
          <img  class="multi__box" alt="doodle of a box" src="/public/Vectorbox.svg">
        </button>
      </div>

    </article>

  </section>


</template>
