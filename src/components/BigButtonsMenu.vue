<script>
export default {
  name: 'BigButtonsMenu'
}
</script>

<template>
  <nav class="games-menu">
    <ul class="games-menu__list">
      <li class="games-menu__element">
        <router-link to="/quick" class="games-menu__anchor">
          Quick
          Play</router-link>
      </li>
      <li class="games-menu__element">
        <router-link to="/mirror" class="games-menu__anchor games-menu__anchor--disabled">
          Mirror</router-link>
      </li>
      <li class="games-menu__element">
        <router-link to="/exploding" class="games-menu__anchor games-menu__anchor--disabled">
          Exploding
          questions</router-link>
      </li>
      <li class="games-menu__element">
        <router-link to="/zen" class="games-menu__anchor">
          Zen</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>