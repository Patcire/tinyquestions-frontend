<script>
import { callAPI } from '@/helpers/callAPI.js'

export default {
  name: 'Zen',
  data() {
    return {
      questions:  "",
      counter: 0,
    }
  },
  methods:{
    async getQuestionsFromAPI(){
      // zen is an infinite quiz
      // but now in my api there are only 27 questions
      // so now Im not controlling repeateds questions
      // when my API increase the number of questions i will fixed that
      this.questions = [...this.questions, ...await callAPI('http://127.0.0.1:8000/api/ques/rand/4')]
    }
  },
  computed:{
    nextQuestion(){
      this.counter++
    }
  },
  watch:{
    counter(newValue){
      newValue === this.questions.length-1 && this.getQuestionsFromAPI()
    }
  },
  async created() {
    // first call to api when the component is created
    this.questions = await callAPI('http://127.0.0.1:8000/api/ques/rand/4')
  }
}

</script>

<template>
  <section class="zen-content">
  <form class="quiz" v-if="questions">

    <legend class="quiz__title">{{questions[counter].title}}</legend>

      <label class="quiz__answer">a) {{questions[counter].option_a}}
        <input type="radio" name="option" @click="nextQuestion" class="quiz__opt">
      </label>

      <label class="quiz__answer">b) {{questions[counter].option_b}}
        <input type="radio" name="option" @click="nextQuestion" class="quiz__opt">
      </label>

      <label class="quiz__answer">c) {{questions[counter].option_c}}
        <input type="radio" name="option" @click="nextQuestion" class="quiz__opt">
      </label>
    </form>
  </section>

</template>
