<script>
import AuthForm from '@/components/AuthForm.vue'

export default {
  name: 'Register',
  components: { AuthForm}
}
</script>

<template>
  <section class="auth">
    <header class="auth__header">
      <article class="auth__title auth__title--register">
      <img alt="point" class="auth__decoration" src="../../public/pointpoint.svg">
      <h1 class="auth__word auth_word">Register</h1>
      <img alt="point" class="auth__decoration" src="../../public/pointpoint.svg">
      <img src="../../public/cactus.svg" class="auth__cactus" alt="doodle of a cactus">
      </article>
    </header>
    <AuthForm></AuthForm>
    <div class="auth__footer">
      <img src="../../public/boot.svg" class="auth__boot" alt="doodle of a boot">
    </div>
  </section>
</template>

<style scoped>

</style>