<script>
import AuthForm from '@/components/AuthForm.vue'

export default {
  name: 'Register',
  components: { AuthForm}
}
</script>

<template>
  <section class="login">
    <header class="login__header">
      <img alt="point" class="login__decoration" src="../../public/pointpoint.svg">
      <h1 class="login__title">Register</h1>
      <img alt="point" class="login__decoration" src="../../public/pointpoint.svg">
    </header>
    <AuthForm></AuthForm>
  </section>
</template>

<style scoped>

</style>