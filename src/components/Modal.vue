<script>

export default {
  name: 'Modal',
  props: {
    show: Boolean,
    functionality: Function,
    modder: String,
    buttonText: String
  },
  emits: ['activeModalFunction'],
  methods:{
    emitActivate(){
      this.$emit('activeModalFunction', true);
    }
  }
}
</script>

<template>
  <section
    class="modal"
    :class="{'modal--show' : show}"
  >
    <section class="modal__content">
      <slot></slot>
    </section>

    <div class="modal__button-container">
      <button
        class="primary-button primary-button--modal"
        @click="emitActivate()"
      >{{ buttonText }}</button>
    </div>
  </section>
</template>
