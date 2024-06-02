<script>
import { useSessionStore } from '../stores/sessionStore.js'

export default {
  name: 'UserBanner',
  methods: { useSessionStore },
  props: {
    player: { required: false, type: String }, // for multiplayer matches,
    admin: { required: false, type: Number }
  },
  created() {
    console.log(this.player)
  }
}
</script>

<template>

  <section class="user-banner">

    <article class="user-banner__circle">
      <img alt="doodle face" src="../../public/sigh.svg" class="user-banner__photo">
    </article>

    <h1 v-if="!player" class="user-banner__username">@{{useSessionStore().user.username}}</h1>
    <h1 v-if="player" class="user-banner__username">@{{player}}</h1>
    <!-- Who creates the room(admin) is the first rendered-->
    <div v-if="admin===0" class="user-banner__container">
      <article class="user-banner__admin">
        <p>admin</p>
        <img  class="user-banner__mini-icon" alt="mini-icon for decoration" src="/public/Vectorplant.png">
      </article>
    </div>
  </section>

</template>

