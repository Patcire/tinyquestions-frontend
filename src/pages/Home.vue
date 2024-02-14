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
  <Under></Under>
</template>

<style scoped>

</style>