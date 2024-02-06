<script>
import { useSessionStore } from '@/stores/sessionStore.js'
export default {
  name: 'Navbar',
  data(){
    return{
      sessionStore: useSessionStore()
    }
  },
  methods: {
    auth(){
      this.sessionStore.authenticade()
    }
  }
}

</script>

<template>

  <section>

    <ul v-if="!this.sessionStore.isConnected" class="navbar">
      <li>
        <router-link to="/" >Home</router-link>
      </li>
      <li>
        <router-link to="/play">Play</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </ul>


    <ul v-if="this.sessionStore.isConnected" class="navbar">

      <li>
        <router-link to="/games">Games</router-link>
      </li>
      <li>
        <router-link to="/create">Create</router-link>
      </li>
      <li>
        <a @click="auth" >Exit</a>
      </li>
    </ul>
  </section>

</template>

<style scoped>

</style>