<script>
import { callAPI } from '@/helpers/callAPI.js'

export default {
  name: 'Quiz',

  data(){
    return{
      isCorrect: null,
      points:0,
      questions: [],
      counter: 0
    }
  },

  props:{
    mode:{
      type: Object,
      required: true
    }
  },

  emits: ['next'],

  methods: {

    async getQuestionsFromAPI(){
      this.questions = await callAPI(`http://localhost:8000/api/ques/rand/${this.mode.numberOfQuestions}`)
      this.counter=0

      console.log(this.questions)
      console.log('long'+this.questions.length)
    },

    async handleNewQuiz(){
      await this.getQuestionsFromAPI()
      this.counter =0
      this.points = 0
    },
    async infiniteQuiz(){
      console.log('enter on the infinte')
      console.log('counter: ' + this.counter + 'questions: ' + this.questions.length)
      this.questions = [...this.questions, ...await callAPI(`http://localhost:8000/api/ques/rand/${this.mode.numberOfQuestions}`)]
    },
    async nextQuestion() {
      (!this.mode.rerun && this.counter === this.questions.length - 4) && await this.infiniteQuiz()
      this.counter++
      document.querySelectorAll('input[type="radio"]')
        .forEach(radio => radio.checked = false);
    },
    addScore(){
      this.points += 10
    },
    correctOption(optionSelected) {
      this.isCorrect = this.questions[this.counter].correct_option === optionSelected
      this.isCorrect && this.addScore()
    },
    handleSelection(optionSelected) {
      console.log('correct: '+ this.questions[this.counter].correct_option)
      console.log('selected: '+optionSelected)
      this.correctOption(optionSelected)
      setTimeout(()=>{
        this.nextQuestion()
      }, 300)
      setTimeout(()=>{
        this.isCorrect = null
      }, 460)
    },

  },

  async created() {
    await this.getQuestionsFromAPI()
  }

}
</script>

<template>

  <section class="quiz" v-if="questions.length > 0 && questions[counter]">

    <header class="quiz__header">
      <h1 :class=mode.class>{{mode.title}}</h1>
    </header>

    <form class="quiz__form" v-if="questions">
      
      <legend class="quiz__title">
       {{questions[counter].title}}
      </legend>

      <div class="quiz__answers">

        <label class="quiz__answer">
          <input type="radio" name="option" @click="handleSelection(questions[counter].option_a)" class="quiz__opt">
          <span class="quiz__letter">a)</span>
          <span class="quiz__response">{{questions[counter].option_a}}</span>
        </label>

        <label class="quiz__answer">
          <input type="radio" name="option"  @click="handleSelection(questions[counter].option_b)" class="quiz__opt">
          <span class="quiz__letter">b)</span>
          <span class="quiz__response">{{questions[counter].option_b}}</span>
        </label>

        <label class="quiz__answer">
          <input type="radio" name="option" @click="handleSelection(questions[counter].option_c)" class="quiz__opt">
          <span class="quiz__letter">c)</span>
          <span class="quiz__response">{{questions[counter].option_c}}</span>
        </label>
      </div>
      <img src="../../public/like.svg"
           class="quiz__like"
           :class="{'active' : isCorrect}"
           alt="heart because your answer is right">
      <img src="../../public/fail.svg"
           class="quiz__fail"
           :class="{'active' : isCorrect===false}"
           alt="a cross 'cause you fail">
    </form>
    <article class="quick__points-container" v-if="questions.length && points>0">
      <h3 class="quick__points"
          >{{points}} points
      </h3>
      <h3 class="quick__sum" :class="{'active' : isCorrect}"> +10 points</h3>
      <img class="quick__sparkles"
           src="../../public/virutas.svg" alt="doodle of sparkles">
    </article>
  </section>
  <article v-if="mode.numberOfQuestions === counter && mode.hasScore"
           class="quiz__results"
           :class="{'active': questions}">
    <h3 class="quick__points quick__points--mod ">Total Score</h3>
    <p
      class="quiz__calification quiz__calification--active"
      :class="{'active': questions}">
      {{this.points}} of 120 possible points
    </p>
    <button
      @click="handleNewQuiz"
      class="navbar__button navbar__button--again">
      New quiz ?
    </button>

  </article>

</template>
