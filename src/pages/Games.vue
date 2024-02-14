<script>

export default {
  name: 'Games',
}

</script>

<template>
  <section >
    <nav class="game-menu">
      <ul class="game-menu__list">
        <li class="game-menu__element">
          <router-link to="/quick" class="game-menu__anchor">
            QuickPlay</router-link>
        </li>
        <li>
          <router-link to="/mirror" class="game-menu__anchor">
            mirror</router-link>
        </li>
        <li>
          <router-link to="/exploding" class="game-menu__anchor">
            exploding</router-link>
        </li>
        <li>
          <router-link to="/zen" class="game-menu__anchor">
            zen</router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>
