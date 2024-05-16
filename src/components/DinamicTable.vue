<script>
export default {
  props:{
    urlPoint:{
      type: String,
      required: true
    }
  },
  name: 'Rankings',
  data(){
    return{
      url: `http:://localhost:8000/api/${this.urlPoint}`,
      data: []
    }
  }
}
</script>

<template>


    <table class="table">
      <tr class="table__header">
        <th>Rank</th>
        <th>Player</th>
        <th>Points</th>
      </tr>
      <tr class="table__row">
        <td>ej1</td>
        <td>ej2</td>
        <td>ej3</td>
      </tr>
    </table>

</template>

