<script>
import { callAPI } from '@/helpers/callAPI.js'
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
import { formatDate } from '../helpers/others.js'

export default {
  name: 'Records',
  data(){
    return{
      historic: [],
      pageNumber: 1
    }
  },
  methods:{
    formatDate,
    router() {
      return router
    },
    useSessionStore

  },

  async created() {
    let response = await callAPI(`http://localhost:8000/api/play/${useSessionStore().user.userID}/?page=${this.pageNumber}`)
    this.historic = [...response.data]
    console.log(this.historic)
  }
}
</script>

<template>
  <section class="records">

  <aside class="records__aside">
      <header class="records__header">

        <article class="records__photo">
          <img alt="doodle face" src="../../public/sigh.svg">
        </article>

        <h1 class="userinfo__username">@{{useSessionStore().user.username}}</h1>
        <article class="userinfo__stats">
          <a><p>Solved quizzes: {{useSessionStore().user.quizzes_resolved}}</p></a>
        </article>

    </header>

    <ul class="records__historic">
      <li v-for="report in historic">

        <article class="records__row">
          <p v-if="report.randomQuiz">{{report.randomQuiz.mode}}</p>
          <p v-if="report.randomQuiz">{{formatDate(report.date)}}</p>
          <p v-if="report.customQuiz">{{report.customQuiz.quiz_name}}</p>
          <p v-if="report.customQuiz">{{formatDate(report.date)}}</p>
        </article>

      </li>
    </ul>

  </aside>

  <section class="records__report">
    <h1>Game report</h1>
  </section>

</section>

</template>

