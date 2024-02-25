<script>
export default {
  name: 'ProfileHeader',
  data(){
    return{

    }
  },
  methods:{
    changeContentToPersonal(){
      this.$emit('selection', 'personal')
      },
    changeContentToFavs(){
      this.$emit('selection', 'favs')
    }
  }
}
</script>

<template>
  <header class="userinfo">

    <article class="userinfo__photo">
      <img alt="doodle face" src="../../public/sigh.svg">
    </article>

    <h1 class="userinfo__username">@liliputiense01</h1>
    <article class="userinfo__stats">
      <p>Total points: 2300</p>
      <img alt="point to separate" src="../../public/pointpoint.svg">
      <p>Solved quizzes:  3</p>
    </article>

    <article class="userinfo__settings">
      <button
        @click="changeContentToPersonal"
        class="userinfo__options">My Quizzes</button>
      <span>|</span>
      <button
        @click="changeContentToFavs"
        @sendPreference="contentShowed"
        class="userinfo__options">Favs</button>
    </article>

  </header>

  <section class="userinfo__">
  </section>

</template>
