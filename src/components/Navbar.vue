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
    exit(){
      this.sessionStore.user.isConnected = false
      router.push('/');
    }
  }
}

</script>

<template>

  <nav class="navbar">
    <ul>
      <li>
        <router-link to="/play" class="navbar__link">Play</router-link>
      </li>
      <li>
        <router-link to="/profile" class="navbar__link">Community</router-link>
      </li>
      <li v-if="!this.sessionStore.user.isConnected">
        <router-link to="/about" class="navbar__link">About</router-link>
      </li>
      <li v-if="this.sessionStore.user.isConnected">
        <router-link to="/create" class="navbar__link" >Create</router-link>
      </li>
      <li v-if="this.sessionStore.user.isConnected">
        <a @click="exit" class="navbar__link pointer" >Exit</a>
      </li>
    </ul>
  </nav>

  <!--TABLET/MOBILE-->
  <!--no connected-->
  <nav class= "hambmenu">
      <article class="hambmenu__icon">
          <input aria-label="drop menu on mobiles" type="checkbox" class="hambmenu__check">
            <label for="hambmenu__check">
              <img src="../../public/hambmenu.svg"
                   alt="Menu icon"
                    class="hambmenu__img">
            </label>

          <ul class="hambmenu__submenu">
            <li>
              <router-link to="/play" class="navbar__link">Play</router-link>
            </li>
            <li>
              <router-link to="/profile" class="navbar__link">Community</router-link>
            </li>
            <li v-if="!this.sessionStore.user.isConnected">
              <router-link to="/about" class="navbar__link">About</router-link>
            </li>
            <li v-if="this.sessionStore.user.isConnected">
              <router-link to="/create" class="navbar__link" >Create</router-link>
            </li>
            <li v-if="this.sessionStore.user.isConnected">
              <a @click="exit" class="navbar__link pointer" >Exit</a>
            </li>
          </ul>
      </article>
  </nav>

</template>

