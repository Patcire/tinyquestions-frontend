<script>
import Quiz from '@/components/Quiz.vue'
import { callAPI } from '@/helpers/callAPI.js'

export default {
  name: 'Quick',
  components: { Quiz },
  data() {
    return {
      mode:
        {
           title:'Quick quiz',
           class:'quick__title',
           clock: [true, 9990000], // miliseconds
           numberOfQuestions: 12,
           hasScore: true,
           rerun: true
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
