<script>

import { socketIO } from '@/plugins/socket.js'
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'

export default {
  name: 'Room',
  data() {
    return {
      message: '',
      allMsg: [],
      socket: null,
      sesh: useSessionStore,
      roomID: null,
      isConnected: false
    };
  },
  methods:{
    router() {
      return router
    },
    sendMessage() {
      console.log('sending...'+this.message)
      console.log('pepe')

      this.socket.emit('message', `${useSessionStore().user.username}: ${this.message}`);
      this.message = ''
    },

    createRoom(){
      this.roomID = crypto.randomUUID()
      console.log(this.roomID)
      this.socket.emit('joinRoom', this.roomID);

    },

  joinToExistingRoom(){
    this.socket.emit('joinRoom', this.roomID);
  }

  },

  created() {
    this.socket = socketIO

    this.socket.on('connect', () => {
      console.log('Connected to server', this.socket.id, useSessionStore().user.username);
    })

    this.socket.on('disconnect', (reason) => {
      console.log('user disconnected from socket:', this.socket.id, 'Reason:', reason);
    })

    this.socket.on('message', (msg)=>{
      console.log(msg)
      this.allMsg.push(msg)
    })

    this.socket.on('userJoinedRoom', (res)=>{
      console.log(res)
      console.log(res[0])
      if (res) this.isConnected = true
    })

    },
    beforeRouteLeave() {
      this.socket && this.socket.disconnect()
    }

}
</script>

<template>


  <form>
    <label>join to a room</label>
    <input type="text" placeholder="ej: hola" v-model="roomID">
    <button @click.prevent="joinToExistingRoom">send</button>
  </form>

  <h3 v-if="roomID && isConnected">room: {{this.roomID}}</h3>

  <article>
    <ul>
      <li v-for="(msg, index) in allMsg">
        <p :class="{'paunlao': index%2!==0}">{{msg}}</p>
      </li>
    </ul>
  </article>

  <div>
    <button class="primary-button" @click="createRoom">create</button>

  </div>
  <button class="primary-button primary-button--modal-mod" @click="router().push('/games')">games</button>

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