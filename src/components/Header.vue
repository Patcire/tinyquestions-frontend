<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'Header',
  components: { Navbar }
}
</script>

<template>
  <header class="main-header">
    <img class="main-header__logo" alt="logo of tinyquestions" src="/logo.svg">
    <Navbar></Navbar>
  </header>
</template>
