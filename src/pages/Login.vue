<script>
import { defineComponent} from 'vue'
import AuthForm from '@/components/AuthForm.vue'

export default defineComponent({
  components: { AuthForm },
})
</script>

<template>
  <section class="auth">
    
    <header class="auth__header">
      <img alt="point" class="auth__decoration" src="../../public/pointpoint.svg">
      <h1 class="auth__title">Login</h1>
      <img alt="point" class="auth__decoration" src="../../public/pointpoint.svg">
    </header>
    <img alt="hug doodle" src="../../public/hug.svg" class="auth__hug">

   <AuthForm></AuthForm>

    <img alt="sigh doodle" src="../../public/sigh.svg" class="auth__sigh">

    <article class="auth__suggestion">
      <p class="auth__phrase">Don't have an account? </p>
      <router-link to="/register" class="auth__anchor">Register</router-link>

      <article class="auth__free">
        <router-link to="/register" class="auth__anchor auth__anchor--reforce">free</router-link>
        <img  class="auth__hearts" alt="hearts decoration" src="../../public/hearts.svg">
      </article>

      </article>


  </section>
</template>

