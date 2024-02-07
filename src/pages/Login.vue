<script>
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
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
      router.push('/games');
    }
  }
}
</script>

<template>
  <section class="temp">
    <h1>Login</h1>
    <button @click="auth">Enter</button>
    <router-link to="/register">Register</router-link>
  </section>
</template>

<style scoped>
  .temp{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>