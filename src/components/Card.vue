
<script>

import { deleteAPI, postAPI } from '@/helpers/callAPI.js'
import { useSessionStore } from '@/stores/sessionStore.js'

export default {
  name: 'Card',
  props:{
    quiz:{
      type: Object
    }
  },
  data(){
    return{
      userID: useSessionStore().user.userID,
      showPlayText: false,
      liked: false,
      likeIcon: "Vectorempty_heart.svg"
    }
  },
  methods:{
    async giveLike(){
      this.liked= !this.liked
      if (this.liked===true){
        const likeSaveOnDB = await postAPI(`http://localhost:8000/api/li/give`, {
          "fk_id_user": this.userID,
          "fk_id_quiz": this.quiz.id_quiz
        })
        return
      }
      console.log('meh, i dislike it really!')
      const likeDeleteOnDB = await deleteAPI(`http://localhost:8000/api/li/dis/${this.userID}/${this.quiz.id_quiz}`)
    }
  },
  created() {
    // when we show the quiz we must know if the quizz is already liked
    // to change the iconm
    const isLiked= useSessionStore().user.likedStorage.some((quizLocalStorage)=> {
      return  quizLocalStorage.id_quiz === this.quiz.id_quiz
    })

    if(isLiked) this.liked=true
  }
}
</script>

<template>
  <article
    @mouseenter="showPlayText=true"
    @mouseleave="showPlayText=false"
    class="card"
  >

    <button class="card__like">

      <img
        @click="giveLike"
        class="card__empty-heart"
        alt="doodle of a heart"
        :src="liked ?
          '../../public/like.svg'
        :
          '../../public/Vectorempty_heart.svg'"
      >

    </button>

    <section class="card__info">
      <p>Total questions: {{quiz.n_questions}}</p>
      <p v-if="quiz.clock">Time: {{quiz.time}} s</p>
    </section>

    <p class="card__action" v-if="showPlayText">play</p>
    <footer class="card__footer">
      <h1 class="card__name">{{quiz.quiz_name}}</h1>
    </footer>

  </article>
</template>

