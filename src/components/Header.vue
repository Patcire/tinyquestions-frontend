<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'Header',
  components: { Navbar }
}
</script>

<template>
  <section class="header">
    <img class="header__logo" alt="logo of tinyquestions" src="/logo.svg">
    <Navbar></Navbar>
  </section>
</template>
