<script>
import { defineComponent} from 'vue'
import FormLogin from '@/components/AuthForm.vue'
import AuthLogin from '@/components/AuthForm.vue'
import AuthForm from '@/components/AuthForm.vue'

export default defineComponent({
  components: { AuthForm },
})
</script>

<template>
  <section class="login">
    
    <header class="login__header">
      <img alt="point" class="login__decoration" src="../../public/pointpoint.svg">
      <h1 class="login__title">Login</h1>
      <img alt="point" class="login__decoration" src="../../public/pointpoint.svg">
    </header>
    <img alt="hug doodle" src="../../public/hug.svg" class="login__hug">

   <AuthForm></AuthForm>

    <img alt="sigh doodle" src="../../public/sigh.svg" class="login__sigh">

    <article class="login__suggestion">
      <p class="login__phrase">Don't have an account? </p>
      <router-link to="/register" class="login__anchor">Register</router-link>

      <article class="login__free">
        <router-link to="/register" class="login__anchor login__anchor--reforce">free</router-link>
        <img  class="login__hearts" alt="hearts decoration" src="../../public/hearts.svg">
      </article>

      </article>


  </section>
</template>

