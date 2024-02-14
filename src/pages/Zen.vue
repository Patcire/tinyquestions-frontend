<script>
import { callAPI } from '@/helpers/callAPI.js'

export default {
  name: 'Zen',
  data() {
    return {
      questions:  ""
    }
  },
  async created() {
   this.questions = await callAPI('http://127.0.0.1:8000/api/ques/rand/4')
    console.log(this.questions)
  }
}



</script>

<template>
  <section class="zen-content">
  <form class="quiz">

    <legend class="quiz__title">{{questions[0].title}}</legend>

      <label class="quiz__opt">{{questions[0].option_a}}
        <input type="radio" name="option"></label>

      <label class="quiz__opt">{{questions[0].option_b}}
        <input type="radio" name="option"></label>

      <label class="quiz__opt">{{questions[0].option_c}}
        <input type="radio" name="option"></label>
    </form>
  </section>

</template>

<style scoped>

</style>