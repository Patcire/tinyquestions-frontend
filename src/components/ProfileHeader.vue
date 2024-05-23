<script>
import { useSessionStore } from '@/stores/sessionStore.js'
import { goTo } from '@/helpers/navHelpers.js'
import UserBanner from '@/components/UserBanner.vue'

export default {
  name: 'ProfileHeader',
  components: { UserBanner },
  emits: ['selection'],
  data(){
    return{
      seshStore: useSessionStore(),
      contentOption:"myQuizzes",
      chosenCSSclass:"--bold",
    }
  },
  methods:{
    goTo,
    changeOption(chosenOption){
      this.contentOption = chosenOption
      this.$emit('selection', this.contentOption)
    }
  }
}
</script>

<template>
  <header class="userinfo">

  <user-banner></user-banner>
    <article class="userinfo__stats">
      <p>Total points: {{seshStore.user.points}}</p>
      <img alt="point to separate" src="../../public/pointpoint.svg">
      <a @click="goTo('/records')">
        <p class="userinfo__solved">Solved quizzes: {{seshStore.user.quizzes_resolved}}</p>
      </a>
    </article>

    <article class="userinfo__settings">
      <button
        @click="changeOption('myQuizzes')"
        class="userinfo__options"
        :class="contentOption==='myQuizzes' ? '--bold' : '' "
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

      <span>|</span>
      <button @click="changeOption('ranks')" class="userinfo__options"
              :class="contentOption==='ranks' ? '--bold' : '' "
      >
        Rankings
      </button>
    </article>

  </header>

</template>
