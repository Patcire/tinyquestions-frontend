<script>
import Header from '@/components/Header.vue'

export default {
  name: 'RootLayout',
  components: { Header }
}
</script>

<template>
  <Header></Header>
  <article class="under">
    <h1>Under development...:)</h1>
    <img src="../../public/birdbird.svg" alt="bird doodle">
  </article>

  <router-view></router-view>
</template>

<style scoped>

</style>