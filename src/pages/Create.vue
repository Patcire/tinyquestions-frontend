<script>
import Customizer from '@/components/Customizer.vue'

export default {
  name: 'Create',
  components: { Customizer }
}
</script>

<template>
  <section class="create">
    <div class="create__container-wmelon">
      <img
        class="create__wmelon"
        alt="watermelon doodle"
        src="../../public/Vectorwmelon.svg">
    </div>
    <Customizer></Customizer>
    <div class="create__container-electron">
      <img
      class="create__electron"
      alt="electron doodle"
      src="../../public/Vectorelectron.svg">
    </div>
  </section>

</template>
