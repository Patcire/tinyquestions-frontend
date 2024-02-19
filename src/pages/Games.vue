<script>

import BigButtonsMenu from '@/components/BigButtonsMenu.vue'

export default {
  name: 'Games',
  components: { BigButtonsMenu }
}

</script>

<template>
  <section class="games">
    <div class="games__container">
      <img class="games__hand" src="../../public/Vectorhand.svg" alt="hand doodle">
    </div>
    <BigButtonsMenu></BigButtonsMenu>
    <div class="games__container games__container--mod">
      <img class="games__daydream" src="../../public/Vectordaydream.svg" alt="hand doodle">
    </div>
  </section>
</template>
