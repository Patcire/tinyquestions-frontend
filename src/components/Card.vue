<script>
export default {
  name: 'Card',
  props:{
    quiz:{
      type: Object
    }
  },
  data(){
    return{
      showPlayText: false
    }
  }
}
</script>

<template>
  <article
    @mouseenter="showPlayText=true"
    @mouseleave="showPlayText=false"
    class="card">

    <section class="card__info">
      <p>Total questions: {{quiz.n_questions}}</p>
      <p v-if="quiz.clock">Time: {{quiz.time}} s</p>
    </section>
    <p class="card__action" v-if="showPlayText">play</p>
    <footer class="card__footer">
      <h1 class="card__name">{{quiz.quiz_name}}</h1>
    </footer>

  </article>
</template>

