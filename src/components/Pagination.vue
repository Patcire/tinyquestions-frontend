<script>
export default {
  name: 'Pagination',
  props:{
    actualPage: {required: true, type: Number },
    lastPage: {required: true, type: Number },
    displayRow: {required: false, type: Boolean },
  },
  emits:['moveToActualPag'],
  data(){
    return{
      currentPage: this.actualPage,
      endPage: this.lastPage
    }
  },
  methods:{
    handleNextPage(){
      if (this.currentPage<this.endPage) this.currentPage++
      this.$emit('moveToActualPag', this.currentPage)

    },
    handlePrevPage(){
      if (this.currentPage>1) this.currentPage--
      this.$emit('moveToActualPag', this.currentPage)
    }
  }
}
</script>

<template>
  <section class="pagination" :class="{'__row': this.displayRow}">

    <img @click="handlePrevPage"
      alt="arrow up" src="/public/arrow.svg" class="pagination__arrow">
      <slot></slot>
    <img @click="handleNextPage"
      alt="arrow down" src="/public/arrow.svg" class="pagination__arrow--down">
  </section>

</template>

