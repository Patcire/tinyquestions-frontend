<script>
import { useSessionStore } from '@/stores/sessionStore.js'

import router from '@/router/router.js'
export default {
  name: 'PrivateLayout',
  data(){
    return{
      seshStore: useSessionStore()
    }
  },
  created() {

    !this.seshStore.isConnected && router.push('/')
  }
}
</script>

<template>

  <router-view></router-view>

</template>

<style scoped>

</style>