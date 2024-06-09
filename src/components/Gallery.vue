<script>
import Card from '@/components/Card.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Gallery',
  components: { Loading, Card },
  props:{
    content:{
      type: Array
    },
    bgCardColorCSS:{
      type: String
    },
    loadingContent: {type: Boolean}
  },
}
</script>

<template>
  <Loading v-if="!content.length && loadingContent"
           key-word="loading" imgSrc="public/Vectorelectron2.svg"></Loading>
  <section class="gallery" v-if="content.length">
    <ul v-for="quiz in content" :key="quiz.id_quiz">
      <Card :quiz="quiz" :bgCardColorCSS="bgCardColorCSS"></Card>
    </ul>
  </section>

  <article v-if="!content.length && !loadingContent" class="no-gallery">
    <h1>Nothing here :(</h1>
    <img class="no-gallery__bird"
      alt="doodle of a bird" src="../../public/birdbird.svg">
  </article>

</template>

