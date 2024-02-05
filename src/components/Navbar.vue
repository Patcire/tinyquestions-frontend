<script>
export default {
  name: 'Navbar'
}

const userConnected = true
</script>

<template>

  <section>
    <ul>
      <router-link to="/">Home</router-link>
      <router-link to="/games">Games</router-link>
      <router-link to="/create">Create</router-link>
      <router-link to="/play">Play</router-link>
      <router-link to="/about">About</router-link>



    </ul>
  </section>

</template>

<style scoped>

</style>