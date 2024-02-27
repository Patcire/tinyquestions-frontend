<script>
export default {
  name: 'Card',
  props:{
    quiz:{
      type: Object
    }
  }
}
</script>

<template>
  <article class="card">
    <section class="card__info">
      <p>Total questions: {{quiz.n_questions}}</p>
      <p v-if="quiz.clock">Time: {{quiz.time}} s</p>
    </section>
    <footer class="card__footer">
      <h1 class="card__name">{{quiz.quiz_name}}</h1>
    </footer>
  </article>
</template>

