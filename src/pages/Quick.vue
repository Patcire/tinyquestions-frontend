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
      points: 0
    }
  },
  methods:{
    async getQuestionsFromAPI(){
      this.questions = await callAPI('http://localhost:8000/api/ques/rand/12')
      console.log(this.questions)
    },
    handleNextQuestion(){
      this.counter++
      console.log(this.counter)
    },
    calculatePoints(){
      this.points += 10
      console.log(this.points)
    }
  },
  async created() {
    await this.getQuestionsFromAPI()
  },
}
</script>

<template>

  <section class="quick">
  <Quiz v-if="questions.length > 0 && questions[counter]"
        :questions="questions"
        :counter="counter"
        @next="handleNextQuestion"
        mode="Quick quiz"
        @points="calculatePoints"
  ></Quiz>
  <article class="quick__points-container" v-if="questions.length">
    <h3  class="quick__points">{{points}} points</h3>
    <img class="quick__sparkles"
      src="../../public/virutas.svg" alt="doodle of color circles">
  </article>
  </section>

</template>
