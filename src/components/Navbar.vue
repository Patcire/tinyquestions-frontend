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
      this.sessionStore.authenticade()
      router.push('/');
      console.log('eeee')
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
      <li class="navbar__submenu">
        <button>Comunnity</button>
        <ul class="submenu__list">
          <li>
            <router-link to="/profile">My profile</router-link>
          </li>
          <li>
            <router-link to="/find">Find questions</router-link>
          </li>
          <li>
            <router-link to="/ranks">Ranks</router-link>
          </li>
        </ul>
      </li>
      <li>
        <a @click="auth" class="exit" >Exit</a>
      </li>
    </ul>
  </section>

</template>
