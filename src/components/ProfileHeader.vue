<script>
import { useSessionStore } from '@/stores/sessionStore.js'

export default {
  name: 'ProfileHeader',
  emits: ['selection'],
  data(){
    return{
      seshStore: useSessionStore(),
      contentOption:"myQuizzes",
      chosenCSSclass:"--bold",
    }
  },
  methods:{
    changeOption(chosenOption){
      this.contentOption = chosenOption
      this.$emit('selection', this.contentOption)
      }
  }
}
</script>

<template>
  <header class="userinfo">

    <article class="userinfo__photo">
      <img alt="doodle face" src="../../public/sigh.svg">
    </article>

    <h1 class="userinfo__username">@{{seshStore.user.username}}</h1>
    <article class="userinfo__stats">
      <p>Total points: {{seshStore.user.points}}</p>
      <img alt="point to separate" src="../../public/pointpoint.svg">
      <p>Solved quizzes: {{seshStore.user.quizzes_resolved}}</p>
    </article>

    <article class="userinfo__settings">
      <button
        @click="changeOption('myQuizzes')"
        class="userinfo__options"
        :class="{ '--bold': contentOption === 'myQuizzes' }"
        >
        My Quizzes
      </button>
      <span>|</span>
      <button
        @click="changeOption('liked')"
        class="userinfo__options"
        :class="contentOption==='liked' ? '--bold' : '' "
      >
        Liked
      </button>
      <span>|</span>
      <button
        @click="changeOption('explore')"
        class="userinfo__options"
        :class="contentOption==='explore' ? '--bold' : '' "

      >
        Explore
      </button>
    </article>

  </header>

</template>
