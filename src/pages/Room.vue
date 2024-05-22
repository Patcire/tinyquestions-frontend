<script>

import { socketIO } from '@/plugins/socket.js'
import { useSessionStore } from '@/stores/sessionStore.js'

export default {
  name: 'Room',
  data() {
    return {
      message: '',
      allMsg: [],
      socket: null,
      sesh: useSessionStore
    };
  },
  methods:{
    sendMessage() {
      console.log('sending...'+this.message)
      console.log('pepe')

      this.socket.emit('message', `${useSessionStore().user.username}: ${this.message}`);
      this.message = ''
      },
    disconnect(){
      this.socket.emit('turnoff');
    }
  },

  created() {
    this.socket = socketIO

    this.socket.on('message', (msg)=>{
      console.log(msg)
      this.allMsg.push(msg)
    })

    },

  mounted() {
    this.socket.on('closeSocketOnClient', () => {
      console.log('shut down');
      this.socket.disconnect();
    });
  },

  beforeUnmount() {
    this.socket.emit('closeSocket')
  }

}
</script>

<template>
  <h1>chat cutroso</h1>

  <section>
    <span>{{sesh().user.username}}</span>
    <span>{{sesh().user.points}}</span>
  </section>

  <form>
    <input type="text" placeholder="ej: hola" v-model="message">
    <button @click="sendMessage">send</button>
  </form>

  <article>
    <ul>
      <li v-for="(msg, index) in allMsg">
        <p :class="{'paunlao': index%2!==0}">{{msg}}</p>
      </li>
    </ul>
  </article>

  <div>
    <button @click="disconnect">Disconnect</button>
  </div>
</template>

<style scoped>
  div{

    padding-top: 100px;
    font-size: large;
  }

  article{
    //background-color: antiquewhite;
    padding-top: 100px;
    font-family: "Book Antiqua",serif;
    font-size: x-large;
    font-weight: bold;
  }
  .paunlao{
    padding-left: 100px;
    background-color: rgba(100, 149, 237, 0.13);

  }
  p{
    background-color: rgba(255, 140, 0, 0.15);
  }

  h1{
    padding-bottom: 50px;
    font-weight: bolder;
    font-family: "Broadway", 'serif';
    color: seagreen;
    -webkit-text-stroke: 2px black;
  }

  form{
    padding-bottom: 20px;
    font-size: x-large;
    font-family: "Gill Sans MT", 'serif' ;
  }

  section{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border:2px solid black;
    height: 90px;
    border-radius: 5px;
    width:90px;
    padding-bottom: 10px;
    margin-bottom: 12px;
  }
</style>