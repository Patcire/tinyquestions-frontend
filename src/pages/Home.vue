<script>
import Under from '@/components/Under.vue'
import { useSessionStore } from '@/stores/sessionStore.js'
import Quiz from '@/components/Quiz.vue'

export default {
  name: 'Home',
  components: { Quiz, Under },
  data(){
    return{
      sesh: useSessionStore(),
      mode:{
        title:'',
        class:'quick__title',
        clock: [false, 0], // miliseconds
        numberOfQuestions: 5,
        hasScore: true,
        rerun: false,
        mod:'homeMod'
      }
    }
  }
}
</script>

<template>
  <section class="home">
    <div class="home__content">
      <img src="../../public/formforma.svg" alt="figure" aria-hidden="true" class="home__figure">
      <div class="home__figure">
        <article class="home__container">
          <div class="home__subcontainter">
          <img class="home__eye"
            src="../../public/eyeeye.svg"
            alt="doodle of an eye">
          </div>
         <Quiz :mode="mode"></Quiz>

          <div class="home__subcontainter">
            <img class="home__cereals"
              src="../../public/cerealscereals.svg"
              alt="doodle of a cereals bowl">
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

