<script>
export default {
  name: 'Contact'
}
</script>

<template>
  <form>
    <label>Email <input type="email" name="email" placeholder="example@gmail.com"></label>
    <label>Date <input type="date" name="date"></label>
    <label>Your message: <textarea></textarea></label>
    <label>Accept our privacy policy<input type="checkbox" name="privacy"></label>
    <button>Send</button>
  </form>
</template>

<style scoped>

</style>