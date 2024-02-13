<script>
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'

export default {
  name: 'FormLogin',
  data(){
    return{
      sessionStore: useSessionStore()
    }
  },
  methods: {
   handleLoguin(e) {
     e.preventDefault(); // si no lo pongo se envía el formulario y va mal la app
    this.sessionStore.checkUserCredentials()
     router.push('/games')
     console.log('pasa')
    }
  }
}
</script>

<template>
  <form class="form">
    <input placeholder="Username..." class="form__input"/>
    <input type="password" placeholder="Password..." class="form__input"/>
    <button @click="handleLoguin" class="primary-button">Enter</button>
  </form>
</template>
