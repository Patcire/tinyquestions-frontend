<script>
import { callAPI } from '@/helpers/callAPI.js'
import { useSessionStore } from '../stores/sessionStore.js'

export default {
  props:{
    urlPoint:{
      type: String,
      required: true
    },
    columns:{
      type: Array,
      required: true
    },
  },
  name: 'Rankings',
  data(){
    return{
      data: [],
      order: 'desc',
      allPagesInOrder: [1], // this array will contain the total pages of stats on the db order by asc/desc (defined by the user)
      selectedIndexOfPageOrder:  0 // we play with the value of the selected index by the user on the array
    }
  },
  computed: {
    apiUrl() {
      return `http://localhost:8000/api/${this.urlPoint}/${this.order}?page=${this.allPagesInOrder[this.selectedIndexOfPageOrder]}`;
    }
  },
  methods: {
    useSessionStore,
    changeOrder(){
      this.order === 'desc' ? this.order = 'asc' : this.order = 'desc'
    },
  },

  async created() {
    let response =  await callAPI(this.apiUrl)
    this.data = response.data
    for (let i = 1; i<response.last_page; i++){
      this.allPagesInOrder.push(i+1)
    }

  },

  watch:{
    async order(value){
      console.log('order', value)
      console.log('url', this.apiUrl)
      this.data = (await callAPI(this.apiUrl)).data
    },
    //async selectedIndexOfPageOrder(){
    //  this.data = (await callAPI(this.apiUrl)).data
    //},

  }


}
</script>

<template>

    <table class="table">
      <tr class="table__header">
        <th v-for="column in columns"
            @click="this.changeOrder()"
            class="table__column-title"
            :key="column">{{column}}
        </th>
      </tr>
      <tr v-for="(player, index) in this.data" class="table__row">
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

