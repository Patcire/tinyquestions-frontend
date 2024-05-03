<script>
import { callAPI } from '@/helpers/callAPI.js'
import router from '@/router/router.js'
import Loading from '@/components/Loading.vue'
import { useSessionStore } from '@/stores/sessionStore.js'

export default {
  name: 'Quiz',
  computed: {
  },
  components: { Loading },
  data(){
    return{
      isCorrectAnimationTrigger: null,
      points:0,
      questions: [],
      counter: 0,
      timerAutoStart: true,
      isLoading: false
    }
  },

  props:{
    mode:{
      type: Object,
      required: true
      /*
      |--Mode template Sheet--|
        -title: title of the play mode **String**
        -class: CSS class to the title of the play mode **String**
        -clock: Array with two values [**Boolean**, miliseconds (**Number**)]
        -numberOfQuestions: **Number**
        -hasScore: **Boolean**
        -rerun: **Boolean**
        -mod: to mod some of the functions of the quiz **String**
        -isCustom: we need to know if questions can't be random **Boolean**
        -idCustomQuiz: if is custom we need the quiz id **Number**
      */
    }
  },

  methods: {
    router() {
      return router
    },

    // to get questions from API

    async getQuestionsFromAPIForNewQuiz(){
      this.questions = await callAPI(`http://localhost:8000/api/ques/rand/${this.mode.numberOfQuestions}`)
      //this.counter=0
    },
    async getMoreQuestionsForZenMode(){
      this.questions = [...this.questions, ...await callAPI(`http://localhost:8000/api/ques/rand/${this.mode.numberOfQuestions}`)]
    },
    async getQuestionsOfCustomQuiz(){
      let quizInfo = await callAPI(`http://localhost:8000/api/cust/${useSessionStore().user.lastCustomQuizSelected}`)
      // now we need to set some values on the mode parameters
      // to made that quiz logic works
      this.questions = quizInfo.questions
      this.mode.numberOfQuestions = this.questions.length
      this.mode.title = quizInfo.quiz_name
    },

    // to handle the logic of the questions

    async nextQuestion() {
      this.counter++
      // evaluation for infinite mode
      (!this.mode.rerun && this.counter === this.questions.length - 6) && await this.getMoreQuestionsForZenMode()
      document.querySelectorAll('input[type="radio"]')
        .forEach(radio => radio.checked = false);
    },

    addScore(){
      this.points += 10
    },

    correctOption(optionSelected) {
      this.isCorrectAnimationTrigger = this.questions[this.counter].correct_option === optionSelected
      this.isCorrectAnimationTrigger && this.addScore()
    },

    handleOptionSelected(optionSelected) {
      this.correctOption(optionSelected)
      setTimeout(()=>{
        this.nextQuestion()
      }, 300)
      setTimeout(()=>{
        this.isCorrectAnimationTrigger = null
      }, 460)

    },

    //to handle the quiz logic

    async handleNewQuiz(){
      this.questions = [] // to activate the loading animation
      await this.getQuestionsFromAPIForNewQuiz()
      this.counter =0
      this.points = 0
      this.timerAutoStart = true
    },

    handleTimesOut(){
      this.timerAutoStart = false
    },

  },

  async created() {

    this.mode.isCustom ?
    await this.getQuestionsOfCustomQuiz()
      :
    await this.getQuestionsFromAPIForNewQuiz()
  }

}
</script>

<template>

  <Loading v-if="!questions.length"></Loading>

  <section class="quiz quiz--home"
           v-if="questions.length > 0
                 && questions[counter]
                 && timerAutoStart"
  >

    <header class="quiz__header" v-if="mode.title">
      <h1 :class=mode.class  aria-label="title of the game mode">{{mode.title}}</h1>

      <Vountdown
        v-if="this.mode.clock[0]"
        :auto="this.timerAutoStart"
        class="quiz__timer"
        :time="this.mode.clock[1]"
        @done="handleTimesOut"
        v-slot="{seconds}"
      >
        <em>0:{{ seconds }} s</em>
      </Vountdown>

    </header>

    <form class="quiz__form" v-if="questions">
      
      <legend class="quiz__title">
       {{questions[counter].title}}
      </legend>

      <fieldset class="quiz__answers">

        <label class="quiz__answer">
          <input type="radio" name="option" @click="handleOptionSelected(questions[counter].option_a)" class="quiz__opt">
          <span aria-hidden="true" class="quiz__letter">a)</span>
          <span class="quiz__response">{{questions[counter].option_a}}</span>
        </label>

        <label class="quiz__answer">
          <input type="radio" name="option" @click="handleOptionSelected(questions[counter].option_b)" class="quiz__opt">
          <span aria-hidden="true" class="quiz__letter">b)</span>
          <span class="quiz__response">{{questions[counter].option_b}}</span>
        </label>

        <label class="quiz__answer">
          <input type="radio" name="option" @click="handleOptionSelected(questions[counter].option_c)" class="quiz__opt">
          <span aria-hidden="true" class="quiz__letter">c)</span>
          <span class="quiz__response">{{questions[counter].option_c}}</span>
        </label>
      </fieldset>
      <img src="../../public/like.svg"
           class="quiz__like"
           :class="{'active' : isCorrectAnimationTrigger}"
           alt="heart because your answer is right">
      <img src="../../public/fail.svg"
           class="quiz__fail"
           :class="{'active' : isCorrectAnimationTrigger===false}"
           alt="a cross 'cause you fail">
    </form>
    <article class="quick__points-container" v-if="questions.length && points>0 && mode.rerun">
      <h3 class="quick__points"
          >{{points}} points
      </h3>
      <h3 class="quick__sum" :class="{'active' : isCorrectAnimationTrigger}"> +10 points</h3>
      <img class="quick__sparkles"
           src="../../public/virutas.svg" alt="doodle of sparkles">
    </article>
  </section>

  <!--Results-->
  <div v-if="((mode.numberOfQuestions === counter || !timerAutoStart) && mode.hasScore) && this.questions.length"
    class="quiz__container">
    <article
      class="quiz__results"
     :class="{'active': questions}">
      <h3 class="quiz__points quiz__points--mod ">Total Score</h3>
      <p
        class="quiz__calification quiz__calification--active"
        :class="{'active': questions}">
        {{this.points}} of {{this.mode.numberOfQuestions*10}} possible points
      </p>
      <a v-if="!this.mode.mod"
        @click="handleNewQuiz"
        class="quiz__suggest">
        New quiz ?
      </a>
      <a v-if="this.mode.mod==='homeMod'"
              @click="router().push('/register')"
              class="quiz__suggest">
        Register to play more!
      </a>
    </article>
  </div>

</template>
