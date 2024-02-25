<script>
import Card from '@/components/Card.vue'

export default {
  name: 'Gallery',
  components: { Card },
  props:{
    content:{
      type: String
    }
  }
}
</script>

<template>
  <section class="gallery">
    <h1>{{content}}</h1>
    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
  </section>
</template>

