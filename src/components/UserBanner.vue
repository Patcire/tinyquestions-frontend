<script>
import { useSessionStore } from '../stores/sessionStore.js'

export default {
  name: 'UserBanner',
  methods: { useSessionStore },
  props: {
    player: { // for multiplayer matches
      required: false
    }
  }
}
</script>

<template>

  <section class="user-banner">

    <article class="user-banner__photo">
      <img alt="doodle face" src="../../public/sigh.svg">
    </article>

    <h1 v-if="!player" class="user-banner__username">@{{useSessionStore().user.username}}</h1>
    <h1 v-if="player" class="user-banner__username">@{{player}}</h1>

  </section>

</template>

