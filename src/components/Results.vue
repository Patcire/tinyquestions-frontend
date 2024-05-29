<script>
import router from '@/router/router.js'

export default {
  name: 'Results',
  emits:['handleNewQuiz'],
  methods: {
    router() {
      return router
    },
    emitStartNewQuiz(){
      this.$emit('handleNewQuiz');
    }
  },
  props:{
    mode:{type:Object, required: true},
    questions:{type:Object, required: true},
    points:{type: Number, required: true}
  },


}
</script>

<template>
  <article
    class="quiz__results"
    :class="{'active': questions}">
    <h3 class="quiz__points quiz__points--mod ">Total Score</h3>
    <p
      class="quiz__calification quiz__calification--active"
      :class="{'active': questions}">
      {{this.points}} of {{this.mode.numberOfQuestions*10}} possible points
    </p>
    <a v-if="!this.mode.mod && !this.mode.isCustom"
       @click="emitStartNewQuiz"
       class="quiz__suggest">
      New quiz ?
    </a>
    <a v-if="this.mode.mod==='homeMod'"
       @click="router().push('/register')"
       class="quiz__suggest">
      Register to play more!
    </a>
    <a  v-if="this.mode.isCustom" class="quiz__suggest"
        @click="router().push('/profile')">
      Go to Community quizzes
    </a>
  </article>
</template>

<style scoped>

</style>