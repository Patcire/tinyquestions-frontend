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

  <section class="quiz">

    <header class="quiz__header">
      <h1> Z E N</h1>
    </header>

    <form class="quiz__form" v-if="questions">
      
      <span class="quiz__title">
       {{questions[counter].title}}
      </span>

      <div class="quiz__answers">

        <label class="quiz__answer" @click="nextQuestion">
          <span class="quiz__letter">a)</span>
          <p class="quiz__response">{{questions[counter].option_a}}</p>
          <input type="radio" name="option"  @click="nextQuestion" class="quiz__opt">
        </label>

        <label class="quiz__answer" @click="nextQuestion">
          <span class="quiz__letter">b)</span>
          <p class="quiz__response">{{questions[counter].option_b}}</p>
          <input type="radio" name="option"  @click="nextQuestion" class="quiz__opt">
        </label>

        <label class="quiz__answer">
          <span class="quiz__letter">c)</span>
          <p class="quiz__response">{{questions[counter].option_c}}</p>
          <input type="radio" name="option" @click="nextQuestion" class="quiz__opt">
        </label>

      </div>
    </form>
  </section>

</template>
