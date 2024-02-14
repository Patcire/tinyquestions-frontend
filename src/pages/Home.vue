<script>
import Under from '@/components/Under.vue'
import { useSessionStore } from '@/stores/sessionStore.js'
export default {
  name: 'Home',
  components: { Under },
  data(){
    return{
      sesh: useSessionStore()
    }
  },
}
</script>

<template>
  <h1>Home</h1>
  <Under></Under>
</template>

<style scoped>

</style>