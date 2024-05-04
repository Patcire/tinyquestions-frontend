<script>
import Quiz from '@/components/Quiz.vue'
import { callAPI } from '@/helpers/callAPI.js'
import { useSessionStore } from '@/stores/sessionStore.js'

export default {
  name: 'Custom',
  components: { Quiz },
  data(){
    return{
      mode:
        {
          title:'',
          class:'custom__title',
          clock: [false, 45000], // miliseconds
          numberOfQuestions: 0,
          hasScore: true,
          rerun: false,
          isCustom: true,
          idCustomquiz: useSessionStore().user.lastCustomQuizSelected
        }
    }
  },
  created() {

  }
}
</script>

<template>
  <section class="custom">
    <quiz :mode="mode"></quiz>
  </section>

</template>

<style scoped>

</style>