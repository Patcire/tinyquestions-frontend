<script>
import { callAPI } from '@/helpers/callAPI.js'
import { useSessionStore } from '../stores/sessionStore.js'

export default {
  methods: { useSessionStore },
  props:{
    urlPoint:{
      type: String,
      required: true
    },
    columns:{
      type: Array,
      required: true
    }
  },
  name: 'Rankings',
  data(){
    return{
      url: `http://localhost:8000/api/${this.urlPoint}`,
      data: []
    }
  },

  async created() {
    console.log(this.url)
    this.data = (await callAPI(this.url)).data
    await console.log(this.data)

  }
}
</script>

<template>

    <table class="table">
      <tr class="table__header">
        <th v-for="column in columns" :key="column">{{column}}</th>
      </tr>
      <tr v-for="(player, index) in data" class="table__row">
        <td>{{index+1}}</td>
        <td>{{player.username}}</td>
        <td>{{player.points}}</td>
      </tr>
      <!--Special row for user position-->
      <tr class="table__row table__row--user">
        <td class="table__relative">
          <div class="table__special">
            <img alt="hearts" src="/public/hearts.svg" class="table__hearts">
          </div>
          <strong>678</strong>
        </td>
        <td><strong>{{useSessionStore().user.username}}</strong></td>
        <td><strong>{{ useSessionStore().user.points }}</strong></td>
      </tr>
    </table>

</template>

