<script>
import { callAPI } from '@/helpers/callAPI.js'
import { useSessionStore } from '@/stores/sessionStore.js'

export default {
  name: 'Records',
  data(){
    return{
      historic: []
    }
  },
  methods:{

  },

  async created() {
    let response = await callAPI(`http://localhost:8000/api/user/allmat/${useSessionStore().user.userID}`)
    this.historic = [...response.data]
    console.log(this.historic)
  }
}
</script>

<template>
  <h1>Game report</h1>
  <ul>
    <li v-for="match in historic">{{match.id_match}}</li>
  </ul>
</template>

<style scoped>

</style>