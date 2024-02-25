<script>
export default {
  name: 'Card',
  props:{
    info:{
      type: Array
    }
  }
}
</script>

<template>
  <article class="card">
    <section class="card__info">
      <p>Total questions: 9</p>
      <p>Clock: 45s</p>
    </section>
    <footer class="card__footer">
      <h1 class="card__name">Name of the quizzzzzzzzzzzzzzzzzzzzzzzzzz</h1>
    </footer>
  </article>
</template>

