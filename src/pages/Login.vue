<script>
import { useSessionStore } from '@/stores/sessionStore.js'
export default {
  name: 'Login',
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
  <h1>Login</h1>
  <button @click="auth">Enter</button>
  <router-link to="/register">Register</router-link>
</template>

<style scoped>

</style>