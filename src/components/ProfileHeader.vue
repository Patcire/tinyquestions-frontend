<script>
import { useSessionStore } from '@/stores/sessionStore.js'

export default {
  name: 'ProfileHeader',
  emits: ['selection'],
  data(){
    return{
      seshStore: useSessionStore(),
      myQuizzesCSSclass:"--bold",
      favsCSSclass:""
    }
  },
  methods:{
    changeContentToMyQuizzes(){
      this.$emit('selection', 'myQuizzes')
      this.myQuizzesCSSclass = "--bold"
      this.favsCSSclass= ""
      },
    changeContentToFavs(){
      this.$emit('selection', 'favs')
      this.favsCSSclass = "--bold"
      this.myQuizzesCSSclass= ""
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
        @click="changeContentToMyQuizzes"
        class="userinfo__options"
        :class="myQuizzesCSSclass">
        My Quizzes
      </button>
      <span>|</span>
      <button
        @click="changeContentToFavs"
        @sendPreference="contentShowed"
        class="userinfo__options"
        :class="favsCSSclass">
        Favs
      </button>
    </article>

  </header>

</template>
