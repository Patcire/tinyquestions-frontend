<script>
import { callAPI } from '@/helpers/callAPI.js'
import Quiz from '@/components/Quiz.vue'

export default {
  name: 'Zen',
  components: { Quiz },
  data() {
    return {
      questions:  [],
      counter: 0,
    }
  },
  methods:{
    async getQuestionsFromAPI(){
      // zen is an infinite quiz
      // but now in my api there are only 27 questions
      // so now Im not controlling repeateds questions
      // when my API increase the number of questions i will fixed that
      this.questions = [...this.questions, ...(await callAPI('http://127.0.0.1:8000/api/ques/rand/5'))]//
    },
    async handleNextQuestion(){
      this.counter++
      await this.getQuestionsFromAPI();
    }
  },
  async created() {
    // first call to api when the component is created
    //this.questions = await callAPI('http://127.0.0.1:8000/api/ques/rand/4')
    await this.getQuestionsFromAPI()
  },
  watch:{
    counter(newValue){
      newValue === this.questions.length-1 && this.getQuestionsFromAPI()
    }
  },
}

</script>

<template>
  <section class="zen">
    <div class="zen__ornaments">
      <img class="zen__doodle" alt="doodle of a plant" src="../../public/Vectorplant.png">
      <img class="zen__doodle" alt="doodle of a candy" src="../../public/Vectorcandy.png">
    </div>

    <Quiz v-if="questions.length > 0 && questions[counter]"
          :questions="questions"
          :counter="counter"
          @next="handleNextQuestion"
    ></Quiz>
    <footer class="zen__phrase">
      <p class="zen__mantra">no points · no time · embrace the infinite </p>
    </footer>
  </section>
</template>
