<script>
export default {
  name: 'Loading',
  props: {
    imgSrc:{String},
    keyWord:{String, required: true},
  },
}
</script>
git
<template>
  <article class="loading">
    <img v-if="this.imgSrc  && this.imgSrc.includes('clock')"
      class="loading__img"
      :src="imgSrc"
      alt="doodle">

    <div class="loading__subcontainer">
      <p class="loading__word">{{keyWord}}</p>
      <span class="loading__detail">...</span>
    </div>
  </article>
</template>

