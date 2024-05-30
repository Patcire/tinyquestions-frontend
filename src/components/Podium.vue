<script>
export default {
  name: 'Podium',
  props: {
    infoForPodium:{type: Array, required: true}
  }
}
</script>

<template>
  <section class="podium">
    <h3 class="podium__title">Podium</h3>
    <article class="podium__ranks">
      <ol>
        <li v-for=" (user, index) in infoForPodium">
          <p>
            {{ infoForPodium.length-index}}º {{user.username}} : {{ user.points }}
          </p>
        </li>
      </ol>
    </article>
  </section>
</template>
