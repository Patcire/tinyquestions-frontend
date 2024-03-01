<script>
import Header from '@/components/Header.vue'

export default {
  name: 'RootLayout',
  components: { Header }
}
</script>

<template>

  <Header></Header>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>

</style>