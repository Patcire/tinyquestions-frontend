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
      questionsInfo: {},
      rightAnswers: 0
    }
  },
  methods:{

    formatDate,
    router() {
      return router
    },
    useSessionStore,

    async handleSelectedItem(index, e){
      this.selectedIndex = index
      this.historic[index].customQuiz ?
        this.questionsInfo = await callAPI(`http://localhost:8000/api/ques/allFrom/${e.target.id}`)
          :
        this.questionsInfo = await callAPI(`http://localhost:8000/api/has/${e.target.id}`)

    }

  },

  async created() {
    let response = await callAPI(`http://localhost:8000/api/play/${useSessionStore().user.userID}/?page=${this.pageNumber}`)
    this.historic = [...response.data]
    console.log(this.historic)
  },

  watch:{

    selectedIndex(){
      this.rightAnswers = 0
      JSON.parse(this.historic[this.selectedIndex].answers).forEach((response)=>{
       response.wasRight && this.rightAnswers++
      })
    }

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

    <ul v-if="historic" class="records__historic">
      <li v-for="(report, index) in historic"
      class="records__list-item"
      >

        <article
          class="records__row"
          :id="report.randomQuiz ? report.randomQuiz.id_quiz : report.customQuiz.id_quiz"
          key="index"
          :class="{selected: selectedIndex === index}"
          @click="handleSelectedItem(index, $event)"
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

      <div class="records__container">
        <hr class="records__underline">
      </div>

    </article>



    <article class="records__quiz" v-if="selectedIndex !== null">
      <article class="records__summary">

        <p class="records__minititle">
          Quiz name/mode:
          {{(this.historic[selectedIndex].randomQuiz
            && this.historic[selectedIndex].randomQuiz.mode)
          ||
          (this.historic[selectedIndex].customQuiz
            && this.historic[selectedIndex].customQuiz.quiz_name) }}
        </p>
        <p>Total questions: {{this.historic[selectedIndex].match.quiz.number_questions}}</p>

        <div class="records__container--relative">
          <p>Total correct answers: {{this.rightAnswers}} </p>
          <img class="records__mini-icon" alt="heart doodle" src="/public/like.svg" >
        </div>
        <div class="records__container--relative">
          <p>Total fails:  {{this.historic[selectedIndex].match.quiz.number_questions-this.rightAnswers}}</p>
          <img class="records__mini-icon" alt="dislike doodle" src="/public/fail.svg" >
        </div>

      </article>
    </article>


  </section>

</section>

</template>

