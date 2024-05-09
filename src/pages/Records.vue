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
      pageNumber: 1,
      selectedIndex: null,
    }
  },
  methods:{

    formatDate,
    router() {
      return router
    },
    useSessionStore,

    handleSelectedItem(index){
      this.selectedIndex = index
    }

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

        <h1 class="records__username">@{{useSessionStore().user.username}}</h1>
        <article class="records__stats">
          <a><p>Solved quizzes: {{useSessionStore().user.quizzes_resolved}}</p></a>
        </article>

    </header>

    <ul class="records__historic">
      <li v-for="(report, index) in historic"
      class="records__list-item"
      >

        <article
          class="records__row"
          id="{{report.randomQuiz.id_quiz || report.customQuiz.id_quiz}}"
          key="index"
          :class="{selected: selectedIndex === index}"
          @click="handleSelectedItem(index)"
        >
          <p class="records__title" v-if="report.randomQuiz">{{report.randomQuiz.mode}}</p>
          <p v-if="report.randomQuiz"><strong>{{formatDate(report.date)}}</strong></p>
          <p class="records__title" v-if="report.customQuiz">{{report.customQuiz.quiz_name}}</p>
          <p v-if="report.customQuiz"><strong>{{formatDate(report.date)}}</strong></p>
        </article>

      </li>
    </ul>

  </aside>

  <section class="records__inform">
    <article class="records__report"
      aria-label="Game report"
    >
      <h1 >Game rep</h1>
      <img class="records__glass"
        src="/public/glassglass.svg" alt="glass">
      <div class="records__letters">
        <h1 class="records__rest">rt</h1>
      </div>
    </article>
  </section>

</section>

</template>

