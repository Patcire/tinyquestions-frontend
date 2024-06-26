<script>
import Navbar from '@/components/Navbar.vue'
import router from '@/router/router.js'
export default {
    name: 'Header',
  methods: {
    router() {
      return router
    }
  },
    components: { Navbar }
}

</script>

<template>
  <header class="main-header">
    <img @click="router().push('/')" class="main-header__logo" alt="logo of tinyquestions" src="/logo.svg">
    <Navbar></Navbar>
  </header>
</template>
