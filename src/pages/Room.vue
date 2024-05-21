<script>

export default {
  name: 'Room',
  data() {
    return {
      message: '',
    };
  },
  methods:{
    sendMessage() {
      console.log(this.message)
      this.$socket.emit('message', this.message);
    }
  },
  mounted() {
    this.$socket.on('gameStarted', (data) => {
      console.log('Game started!', data);
    });
  }
}
</script>

<template>

    <input type="text" placeholder="ej: hola" v-model="message">
  <p>msg: {{message}}</p>
    <button @click="sendMessage">send</button>

</template>

<style scoped>

</style>