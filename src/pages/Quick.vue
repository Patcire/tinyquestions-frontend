<script>
import Quiz from '@/components/Quiz.vue'
import { callAPI } from '@/helpers/callAPI.js'

export default {
  name: 'Quick',
  components: { Quiz },
  data() {
    return {
      questions:  [],
      counter: 0,
      points: 0,
      mode: ['Quick quiz', 'quick__title']
    }
  },
  methods:{
    async getQuestionsFromAPI(){
      this.questions = await callAPI('http://localhost:8000/api/ques/rand/12')
      console.log(this.questions)
      console.log('long'+this.questions.length)
    },
    handleNextQuestion(){
      this.counter++
      console.log(this.counter)
    }
  },
  async created() {
    await this.getQuestionsFromAPI()
  },
}
</script>{


<template>

  <section class="quick">
  <Quiz
        :questions="questions"
        :counter="counter"
        @next="handleNextQuestion"
        :mode="mode"
        :numberOfQuestions="this.questions.length">
  </Quiz>
  </section>

</template>
