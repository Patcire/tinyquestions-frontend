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
    mode:{
      type: String,
      required: true
    },
  },
  methods: {
    nextQuestion() {
      this.$emit('next');
      console.log('next');
    },
    correctOption(optionSelected) {
      (this.questions[this.counter].correct_option === optionSelected) ?
        this.$emit('points')
        :
        console.log('fallo')
    },
    handleSelection(optionSelected) {

      this.correctOption(optionSelected)
      setTimeout(()=>{
        this.nextQuestion()
      }, 300)
    },

  }
}
</script>

<template>

  <section class="quiz">

    <header class="quiz__header">
      <h1>{{mode}}</h1>
    </header>

    <form class="quiz__form" v-if="questions">
      
      <span class="quiz__title">
       {{questions[counter].title}}
      </span>

      <div class="quiz__answers">

        <label class="quiz__answer">
          <span class="quiz__letter">a)</span>
          <span class="quiz__response">{{questions[counter].option_a}}</span>
          <input type="radio" name="option" @click="handleSelection(questions[counter].option_a)" class="quiz__opt">
        </label>

        <label class="quiz__answer">
          <span class="quiz__letter">b)</span>
          <span class="quiz__response">{{questions[counter].option_b}}</span>
          <input type="radio" name="option"  @click="handleSelection(questions[counter].option_b)" class="quiz__opt">
        </label>

        <label class="quiz__answer">
          <span class="quiz__letter">c)</span>
          <span class="quiz__response">{{questions[counter].option_c}}</span>
          <input type="radio" name="option" @click="handleSelection(questions[counter].option_c)" class="quiz__opt">
        </label>

      </div>
    </form>
  </section>

</template>
