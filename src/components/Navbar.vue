<script>
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
export default {
  name: 'Navbar',
  data(){
    return{
      sessionStore: useSessionStore()
    }
  },
  methods: {
    auth(){
      this.sessionStore.checkUserCredentials()
      router.push('/');
    }
  }
}

</script>

<template>

  <section>

    <ul v-if="!this.sessionStore.isConnected" class="navbar">
      <li>
        <router-link to="/"  class="navbar__link">Home</router-link>
      </li>
      <li>
        <router-link to="/play" class="navbar__link">Play</router-link>
      </li>
      <li>
        <router-link to="/about" class="navbar__link">About</router-link>
      </li>
    </ul>


    <ul v-if="this.sessionStore.isConnected" class="navbar">

      <li>
        <router-link to="/games" class="navbar__link">Games</router-link>
      </li>
      <li>
        <router-link to="/create" class="navbar__link" >Create</router-link>
      </li>

      <li class="navbar__submenu">
        <button class="navbar__button">Comunnity</button>
        <ul class="navbar__sublist">
          <li>
            <router-link to="/profile" class="navbar__sublink" >My profile</router-link>
          </li>
          <li>
            <router-link to="/find" class="navbar__sublink" >Find questions</router-link>
          </li>
          <li>
            <router-link to="/ranks" class="navbar__sublink">Ranks</router-link>
          </li>
        </ul>

      </li>
      <li>
        <a @click="auth" class="navbar__link pointer" >Exit</a>
      </li>
    </ul>
  </section>

</template>
