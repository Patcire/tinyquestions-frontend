<script>
import { callAPI } from '@/helpers/callAPI.js'
import { useSessionStore } from '@/stores/sessionStore.js'

export default {
  name: 'Records',
  data(){
    return{
      historic: [],
      pageNumber: 1
    }
  },
  methods:{

  },

  async created() {
    let response = await callAPI(`http://localhost:8000/api/play/${useSessionStore().user.userID}/?page=${this.pageNumber}`)
    this.historic = [...response.data]
    console.log(this.historic)
  }
}
</script>

<template>
  <section class="historic">
    <h1>Game report</h1>
    <aside class="historic__aside">
    <ul>
      <li v-for="report in historic">
        <p v-if="report.randomQuiz">{{report.randomQuiz.mode}}</p>
        <p v-if="report.customQuiz">{{report.customQuiz.quiz_name}}</p>

      </li>
    </ul>
    </aside>
  </section>

</template>

<style scoped>

.historic{
  background-color: cadetblue;
  &__aside{
    background-color: antiquewhite;
  }


}

</style>