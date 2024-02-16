<script>
export default {
  name: 'Quiz',
  props:{
    questions:{
      type: Array,
      required: true
    },
    counter: {
      type: Number,
      required: true
    },
  },
  computed:{
    nextQuestion(){
      this.$emit('next')
    }
  },

}
</script>

<template>

  <section class="zen-content">
    <form class="quiz" v-if="questions">

      <legend class="quiz__title">{{questions[counter].title}}</legend>

      <label class="quiz__answer" @click="nextQuestion">a) {{questions[counter].option_a}}
        <input type="radio" name="option"  @click="nextQuestion" class="quiz__opt">
      </label>

      <label class="quiz__answer" @click="nextQuestion">b) {{questions[counter].option_b}}
        <input type="radio" name="option"  @click="nextQuestion" class="quiz__opt">
      </label>

      <label class="quiz__answer">c) {{questions[counter].option_c}}
        <input type="radio" name="option" @click="nextQuestion" class="quiz__opt">
      </label>
    </form>
  </section>

</template>
