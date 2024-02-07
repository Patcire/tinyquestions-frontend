<script>

export default {
  name: 'Modal',
  data() {
    return {

    }
  },

  props: {
    show: Boolean
  }
}
</script>

<template>
  <section class="modal" :class="{'modal--show' : show}">
    <section class="modal__content">
      <slot></slot>
    </section>
  </section>
</template>

<style scoped>

</style>