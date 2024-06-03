<script>
export default {
  name: 'Pagination',
  emits:['clickNextPag', 'clickPrevPage'],
}
</script>

<template>
  <section class="pagination">

    <img @click="this.$emit('clickPrevPage')"
      alt="arrow up" src="/public/arrow.svg" class="pagination__arrow">
      <slot></slot>
    <img @click="this.$emit('clickNextPag')"
      alt="arrow down" src="/public/arrow.svg" class="pagination__arrow--down">
  </section>

</template>

