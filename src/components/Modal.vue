<script>

export default {
  name: 'Modal',
  props: {
    show: Boolean,
    functionality: Function
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