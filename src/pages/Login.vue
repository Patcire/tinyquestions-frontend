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
  <section class="login">

    <article class="login__header">
      <img alt="point" class="header__decoration" src="../../public/pointpoint.svg">
      <h1>Login</h1>
      <img alt="point" class="header__decoration" src="../../public/pointpoint.svg">
    </article>

    <form class="login__form">
      <input placeholder="Username..."/>
      <input type="password" placeholder="Password..."/>
    </form>

    <button @click="auth" class="primary-button">Enter</button>

    <article class="login__register-anchor">
      <p>Don't have an account? </p>
      <router-link to="/register">Register</router-link>
      <article class="register-anchor__free">
        <router-link to="/register" class="free__link">free</router-link>
        <img  class="login__doodle" alt="hearts decoration" src="../../public/hearts.svg">
      </article>
      </article>


  </section>
</template>

