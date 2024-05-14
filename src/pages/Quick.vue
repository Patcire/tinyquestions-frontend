<script>
import Quiz from '@/components/Quiz.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Quick',
  components: { Loading, Quiz },
  data() {
    return {
      mode:
        {
           title:'Quick quiz',
           class:'quick__title',
           clock: [true, 45000], // miliseconds
           numberOfQuestions: 12,
           hasScore: true,
           rerun: true,
           gameMode: "quick",
           isCustom: false
        }
    }
  },
}
</script>{


<template>

  <section class="quick">
    <Quiz :mode="mode"></Quiz>
  </section>

</template>
