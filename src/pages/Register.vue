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
      <img alt="point" class="auth__decoration" src="../../public/pointpoint.svg">
      <h1 class="auth__title">Register</h1>
      <img alt="point" class="auth__decoration" src="../../public/pointpoint.svg">
    </header>
    <AuthForm></AuthForm>
    <img class="auth__cactus" src="../../public/cactus.svg" alt="decoration image of cactus and a boot">
  </section>
</template>

<style scoped>

</style>