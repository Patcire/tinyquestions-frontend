<script>
import Quiz from '@/components/Quiz.vue'

export default {
  name: 'CommunityQuizzes',
  components: { Quiz },
  data(){
    return{
      mode:{

      }
    }
  }
}
</script>

<template>
  <Quiz :mode="mode"></Quiz>
</template>

