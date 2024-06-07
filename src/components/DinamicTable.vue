<script>
import { callAPI } from '@/helpers/callAPI.js'
import { useSessionStore } from '../stores/sessionStore.js'
import Pagination from '@/components/Pagination.vue'
import { apiDirection } from '@/helpers/others.js'

export default {
  components: { Pagination },
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
      selectedIndexOfPageOrder:  0, // we play with the value of the selected index by the user on the array
      lengthOfApiResponse: 0,
      minPositionOfRankPage: 0,
      maxPositionOfRankPage: 0,
      countAllUsersRegistered: 0

    }
  },
  computed: {
    apiUrl() {
      return `${apiDirection}/api/${this.urlPoint}/${this.order}?page=${this.allPagesInOrder[this.selectedIndexOfPageOrder]}`;
    },

  },
  methods: {
    useSessionStore,
    changeOrder(){
      this.order === 'desc' ? this.order = 'asc' : this.order = 'desc'
    },

    handleMoveToActualPage(page){
      if (this.selectedIndexOfPageOrder !== page-1) this.selectedIndexOfPageOrder= page-1
    },

    handleUserPositionsWhenDesc(){
      let pageToRender =  this.allPagesInOrder[this.selectedIndexOfPageOrder]-1
      this.minPositionOfRankPage =  pageToRender*this.lengthOfApiResponse
    },

    handleUserPositionsWhenAsc(){
      let pageToRender =  this.allPagesInOrder[this.selectedIndexOfPageOrder]-1
      this.maxPositionOfRankPage =  this.countAllUsersRegistered-((pageToRender)*this.lengthOfApiResponse)
    },

  },

  async created() {
    let response =  await callAPI(this.apiUrl)
    this.data = response.data
    for (let i = 1; i<response.last_page; i++){
      this.allPagesInOrder.push(i+1)
    }

    this.lengthOfApiResponse= this.data.length
    this.handleUserPositionsWhenDesc()
    let userCount = await (callAPI(`${apiDirection}/api/user/count`))
    await console.log(userCount)
    this.countAllUsersRegistered = userCount.count
    this.maxPositionOfRankPage =  this.countAllUsersRegistered

  },

  watch:{
    async order(value){
      console.log('order', value)
      console.log('url', this.apiUrl)
      this.data = (await callAPI(this.apiUrl)).data

    },

    async selectedIndexOfPageOrder(){
      this.order === 'desc' ? this.handleUserPositionsWhenDesc() : this.handleUserPositionsWhenAsc()
      this.data = (await callAPI(this.apiUrl)).data
    },

  }


}
</script>

<template>

    <table class="table" v-if="this.data.length">
      <tr class="table__header">
        <th v-for="column in columns"
            @click="this.changeOrder()"
            class="table__column-title"
            :key="column">{{column}}
        </th>
      </tr>
      <tr v-for="(player, index) in this.data" class="table__row">
        <td v-if="this.order === 'desc'">{{index+1+this.minPositionOfRankPage }}</td>
        <td v-if="this.order === 'asc'">{{maxPositionOfRankPage-index}}
        </td>
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


    <pagination :lastPage="this.allPagesInOrder[this.allPagesInOrder.length-1]"
                :actualPage="this.allPagesInOrder[this.selectedIndexOfPageOrder]"
                :displayRow="true"
                @moveToActualPag="handleMoveToActualPage"
                v-if="this.data.length"
    >
      <p class="pagination__count">{{this.allPagesInOrder[this.selectedIndexOfPageOrder]}}/{{this.allPagesInOrder[this.allPagesInOrder.length-1]}}</p>
    </pagination>


</template>

