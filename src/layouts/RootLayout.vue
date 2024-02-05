<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'RootLayout',
  components: { Navbar }
}
</script>

<template>
  <h1>PUBLIC</h1>
  <Navbar></Navbar>
  <router-view></router-view>
</template>

<style scoped>

</style>