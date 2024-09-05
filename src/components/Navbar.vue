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

  <!--DESKTOP-->
  <!--no connected-->
  <nav>
    <ul v-if="!this.sessionStore.user.isConnected" class="navbar">
      <li>
        <router-link to="/play" class="navbar__link">Play</router-link>
      </li>
      <li>
        <router-link to="/profile" class="navbar__link">Community</router-link>
      </li>
      <li>
        <router-link to="/about" class="navbar__link">About</router-link>
      </li>
    </ul>
    <!--connected-->
    <ul v-if="this.sessionStore.user.isConnected" class="navbar navbar--mod">
      <li>
        <router-link to="/play" class="navbar__link navbar__link--mod">Play</router-link>
      </li>
      <li>
        <router-link to="/create" class="navbar__link navbar__link--mod" >Create</router-link>
      </li>
      <li class="navbar__submenu">
        <router-link to="/profile" class="navbar__link navbar__link--mod" >Comunnity</router-link>
      </li>
      <li>
        <a @click="exit" class="navbar__link pointer navbar__link pointer--mod" >Exit</a>
      </li>
    </ul>
  </nav>

  <!--TABLET/MOBILE-->
  <!--no connected-->
  <nav class= "hambmenu" v-if="!this.sessionStore.isConnected">
      <article class="hambmenu__icon">
          <input aria-label="drop menu on mobiles" type="checkbox" class="hambmenu__check">
            <label for="hambmenu__check">
              <img src="../../public/hambmenu.svg"
                   alt="Menu icon"
                    class="hambmenu__img">
            </label>

          <ul class="hambmenu__submenu" v-if="!sessionStore.user.isConnected">
            <li>
              <router-link to="/play" class="navbar__link">Play</router-link>
            </li>
            <li>
              <router-link to="/profile" class="navbar__link">Community</router-link>
            </li>
            <li>
              <router-link to="/about" class="navbar__link">About</router-link>
            </li>
          </ul>
      </article>
  </nav>

  <!--connected-->
  <nav class= "hambmenu" v-if="this.sessionStore.user.isConnected">
      <article class="hambmenu__icon hambmenu__icon--mod">
         <input aria-label="drop menu on mobiles" type="checkbox" class="hambmenu__check">
        <label for="hambmenu__check">
          <img src="../../public/hambmenu.svg"
               alt="Menu icon"
               class="hambmenu__img">
        </label>
        <ul class="hambmenu__submenu hambmenu__submenu--mod">
          <li>
            <router-link to="/play" class="navbar__link">Play</router-link>
          </li>
          <li>
            <router-link to="/create" class="navbar__link" >Create</router-link>
          </li>
          <li class="navbar__submenu">
            <router-link to="/profile" class="navbar__link">Comunnity</router-link>
          </li>
          <li>
            <a @click="exit" class="navbar__link pointer" >Exit</a>
          </li>
        </ul>
      </article>

  </nav>

</template>
