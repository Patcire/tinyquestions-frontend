<script>
import Header from '@/components/Header.vue'

export default {
  name: 'RootLayout',
  components: { Header }
}
</script>

<template>

  <Header></Header>
  <router-view></router-view>

</template>

<style scoped>

</style>