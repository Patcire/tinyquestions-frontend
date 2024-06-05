<script>
import { callAPI } from '@/helpers/callAPI.js'
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
import { formatDate } from '../helpers/others.js'
import UserBanner from '@/components/UserBanner.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Records',
  components: { Pagination, UserBanner },
  data(){
    return{
      historic: [],
      actualPage: 1,
      lastPage: 0,
      selectedMatch: null,
      selectedQuestion: undefined,
      questionsInfo: {}, // all questions info (options, title etc.)
      answersInfo: [], // all user Responses to selected quiz questions (was right, selected etc.)
      rightAnswers: 0
    }
  },
  methods:{

    formatDate,
    router() {
      return router
    },
    useSessionStore,

    async handleSelectedMatch(index, id){
      this.answersInfo && console.log(this.answersInfo)
      console.log('index:' ,index, 'id: ', id)
      this.selectedMatch = index
      this.rightAnswers = 0
      this.answersInfo = []
      this.historic[index].customQuiz ?
        this.questionsInfo = await callAPI(`http://localhost:8000/api/ques/allFrom/${id}`)
          :
        this.questionsInfo = await callAPI(`http://localhost:8000/api/has/${id}`)

      if (this.historic[this.selectedMatch].answers) this.answersInfo = JSON.parse(this.historic[this.selectedMatch].answers)

      await this.historic[this.selectedMatch].answers && JSON.parse(this.historic[this.selectedMatch].answers).forEach((response)=>{
        console.log(response+response.wasRight)
        response.wasRight && this.rightAnswers++
      })
    },

    handleAnswerView(index){
      // if it is the same but user clicks again, answer will hide
      this.selectedQuestion === index? this.selectedQuestion = -1 : this.selectedQuestion = index
    },

    async handleCallAPI(page){
      let response = await callAPI(`http://localhost:8000/api/play/${useSessionStore().user.userID}/3/?page=${page}`)
      this.historic = response.data
      this.lastPage = response.last_page
    },

    handleChangePage(page){
      if (this.actualPage !== page){
        this.actualPage = page
        this.historic = []
        this.selectedMatch = null
        this.handleCallAPI(page)
      }

    }

  },

  async created() {
    await this.handleCallAPI(this.actualPage)
  },

}
</script>

<template>
  <section class="records">

  <aside class="records__aside">
      <header class="records__header">

       <user-banner :hideName="true"></user-banner>
        <article class="records__stats">
          <p class="records__name2">@{{useSessionStore().user.username}}</p>
          <p class="records__solved">Solved quizzes: {{useSessionStore().user.quizzes_resolved}}</p>
        </article>

    </header>

    <!-- Matches List-->
    <article v-if="historic.length" class="records__list-container">
      <pagination :actualPage="this.actualPage" :lastPage="this.lastPage"
        @moveToActualPag="handleChangePage">
        <ul class="records__historic">
          <li v-for="(report, index) in historic"
          class="records__list-item"
          >

            <article
              class="records__row"
              :id="report.randomQuiz ? report.randomQuiz.id_quiz : report.customQuiz.id_quiz"
              key="index"
              :class="{selected: selectedMatch === index}"
              @click="handleSelectedMatch(index,
              report.randomQuiz ? report.randomQuiz.id_quiz : report.customQuiz.id_quiz)"
            >
              <p class="records__title" v-if="report.randomQuiz">{{report.randomQuiz.mode}}</p>
              <p v-if="report.randomQuiz"><strong>{{formatDate(report.date)}}</strong></p>
              <p class="records__title" v-if="report.customQuiz">{{report.customQuiz.quiz_name}}</p>
              <p v-if="report.customQuiz"><strong>{{formatDate(report.date)}}</strong></p>
            </article>

          </li>
        </ul>
      </pagination>
    </article>

  </aside>

  <!--Report-->
  <section class="records__inform">

    <article class="records__report" aria-label="Game report">
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

    <p v-if="this.selectedMatch === null" class="records__note">Choose a quizz to see the report :)</p>

    <section class="records__quiz" v-if="this.selectedMatch !== null && this.questionsInfo.length && this.answersInfo.length">

      <article class="records__summary">
        <p class="records__minititle">
          Quiz name/mode:
          {{ (this.historic[selectedMatch].randomQuiz && this.historic[selectedMatch].randomQuiz.mode)
              ||
            (this.historic[selectedMatch].customQuiz && this.historic[selectedMatch].customQuiz.quiz_name) }}
        </p>
        <p>Total questions: {{ this.historic[selectedMatch].match.quiz.number_questions }}</p>

        <div class="records__container--relative">
          <p>Total correct answers: {{this.rightAnswers}} </p>
          <img class="records__mini-icon" alt="heart doodle" src="/public/like.svg" >
        </div>
        <div class="records__container--relative">
          <p>Total fails: {{ this.historic[selectedMatch].match.quiz.number_questions - this.rightAnswers }}</p>
          <img class="records__mini-icon" alt="dislike doodle" src="/public/fail.svg" >
        </div>
      </article>

      <article class="records__questions">
        <ul>
          <li v-for="(question, index) in questionsInfo" @click="handleAnswerView(index)">

            <div class="records__container--relgap">
              <img v-if="selectedQuestion === index" alt="point" src="/public/pointpoint.svg" height="15px">
              <p class="records__question" :class="{selectedQuestion: selectedQuestion === index}">
                {{index+1}}. {{question.title}}
              </p>
              <img v-if="!answersInfo[index].wasRight" alt="point" src="/public/fail.svg" height="20px">
            </div>

            <article class="records__answers" v-if="selectedQuestion === index">
              <p class="records__yr-answer">Your answer: {{answersInfo[index].selected}}</p>
              <p>Correct answer: <span class="records__co-answer">{{answersInfo[index].correct}}</span></p>
            </article>

          </li>
        </ul>

      </article>

    </section>


  </section>

</section>

</template>

