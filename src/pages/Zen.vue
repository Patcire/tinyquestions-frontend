<script>
import Quiz from '@/components/Quiz.vue'

export default {
  name: 'Zen',
  components: { Quiz },
  data(){
    return{
      mode:
        {
          title:' Z E N',
          class:'zen__title',
          clock: [false],
          numberOfQuestions: 10,
          hasScore: false,
          rerun: false,
          gameMode: "zen"
        }
    }
  },
  methods:{
  }

}

</script>

<template>
  <section class="zen">
    <div class="zen__ornaments">
      <img class="zen__doodle" alt="doodle of a plant" src="../../public/Vectorplant.png">
      <img class="zen__doodle" alt="doodle of a candy" src="../../public/Vectorcandy.png">
    </div>

    <div class="zen__quizz-container">
      <Quiz
            :mode="mode"
      ></Quiz>
    </div>
    <footer class="zen__phrase">
      <p class="zen__mantra">no points · no time · embrace the infinite </p>
    </footer>
  </section>
</template>
