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
      viewData: [],
      order: 'desc',
      lastPage: null,
      actualPage:1,
      lengthOfApiResponse: 0,
      topPositionOfDescRankPage: 0,
      topPositionOfAscRankPage: 0,
      countAllUsersRegistered: 0,
      isUserOnPage: null

    }
  },
  computed: {
    apiUrl() {
      return `${apiDirection}/api/${this.urlPoint}/${this.order}?page=${this.actualPage}`;
    },

  },
  methods: {
    useSessionStore,
    changeOrder(){
      this.order === 'desc' ? this.order = 'asc' : this.order = 'desc'
      this.handleMoveToActualPage(this.actualPage)
    },

    handleUserPositionsWhenDesc(index){
      let topRankOfThePage = (this.actualPage-1)*this.lengthOfApiResponse
      return this.actualPage !== 1 ? index+1+topRankOfThePage : index+1
    },

    handleUserPositionsWhenAsc(index){
      let topRankOfThePage = this.countAllUsersRegistered-((this.actualPage-1)*this.lengthOfApiResponse)
      let temporalStorageUsersCount = this.countAllUsersRegistered
      return this.actualPage !== 1 ? topRankOfThePage-index : temporalStorageUsersCount-index
    },

    async handleMoveToActualPage(page){
      if (this.actualPage !== page) this.actualPage= page
      this.viewData = (await callAPI(this.apiUrl)).data
    },


  },

  async created() {
    this.handleUserPositionsWhenDesc()
    let userCount = await (callAPI(`${apiDirection}/api/user/count`))
    let response =  await callAPI(this.apiUrl)
    this.viewData = response.data
    this.lengthOfApiResponse= this.viewData.length
    this.lastPage = response.last_page
    this.countAllUsersRegistered = userCount.count
    this.topPositionOfAscRankPage =  this.countAllUsersRegistered

  },

  watch:{
     actualPage(value){
        this.handleMoveToActualPage(value)
    },
    viewData(value){
      console.log(value)
      value.some(user => user.username === useSessionStore().user.username) ?
        this.isUserOnPage= true
        :
        this.isUserOnPage= false
    }
  }

}
</script>

<template>

    <table class="table" v-if="this.viewData.length">
      <tr class="table__header">
        <th v-for="column in columns"
            @click="this.changeOrder()"
            class="table__column-title"
            :key="column">{{column}}
        </th>
      </tr>
      <tr  class="table__row"
           :class="{'--strong': this.isUserOnPage && player.username===useSessionStore().user.username}"
           v-for="(player, index) in this.viewData"
      >
        <td v-if="this.order === 'desc'">{{ handleUserPositionsWhenDesc(index) }}</td>
        <td v-if="this.order === 'asc'">{{ handleUserPositionsWhenAsc(index) }}
        </td>
        <td>{{player.username}}</td>
        <td>{{player.points}}</td>
      </tr>
      <!--Special row for user position-->
      <tr class="table__row table__row--user" v-if="!isUserOnPage">
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


    <pagination :lastPage="this.lastPage"
                :actualPage="this.actualPage"
                :displayRow="true"
                @moveToActualPag="handleMoveToActualPage"
                v-if="this.viewData.length"
    >
      <p class="pagination__count">{{this.actualPage}}/{{this.lastPage}}</p>
    </pagination>


</template>

