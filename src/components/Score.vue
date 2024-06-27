<script>
export default {
  name: 'Score',
  props: {
    points: Number,
    isCorrectAnimationTrigger: Boolean,
  },
}
</script>

<template>
  <article class="quick__points-container">
    <h3 class="quick__points"
    >{{points}} points
    </h3>
    <h3 class="quick__sum" :class="{'active' : isCorrectAnimationTrigger}"> +10 points</h3>
    <img class="quick__sparkles"
         src="../../public/virutas.svg" alt="doodle of sparkles">
  </article>
</template>

