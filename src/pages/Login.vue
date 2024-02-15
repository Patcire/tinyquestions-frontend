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
        <div class="auth__title">
          <img alt="point" class="auth__decoration" src="../../public/pointpoint.svg">
          <h1 class="auth__word">Login</h1>
          <img alt="point" class="auth__decoration" src="../../public/pointpoint.svg">
        </div>
        <img alt="hug doodle" src="../../public/hug.svg" class="auth__hug">
      </header>

   <AuthForm></AuthForm>
    <footer class="auth__footer">

      <img alt="sigh doodle" src="../../public/sigh.svg" class="auth__sigh">

      <article class="auth__suggestion">

        <p class="auth__phrase">Don't have an account? </p>
        <router-link to="/register" class="auth__anchor">Register</router-link>

        <article class="auth__free">
          <router-link to="/register" class="auth__anchor auth__anchor--reforce">free</router-link>
          <img  class="auth__hearts" alt="hearts decoration" src="../../public/hearts.svg">
        </article>

      </article>

    </footer>
  </section>
</template>

