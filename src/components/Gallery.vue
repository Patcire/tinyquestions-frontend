<script>
import Card from '@/components/Card.vue'

export default {
  name: 'Gallery',
  components: { Card },
  props:{
    content:{
      type: Array
    },
    bgCardColorCSS:{
      type: String
    }
  },
  data(){
    return{

    }
  }
}
</script>

<template>

  <section class="gallery" v-if="content.length">
    <ul v-for="quiz in content" :key="quiz.id_quiz">
      <Card :quiz="quiz" :bgCardColorCSS="bgCardColorCSS"></Card>
    </ul>
  </section>

  <article v-if="!content.length" class="no-gallery"> 
    <h1>Nothing here :(</h1>
    <img class="no-gallery__bird"
      alt="doodle of a bird" src="../../public/birdbird.svg">
  </article>

</template>

