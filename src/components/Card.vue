
<script>

import { deleteAPI, postAPI } from '@/helpers/callAPI.js'
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
import { apiDirection } from '@/helpers/others.js'

export default {
  name: 'Card',
  props:{
    quiz:{
      type: Object
    },
    bgCardColorCSS:{
      type: String
    }
  },
  data(){
    return{
      userID: useSessionStore().user.userID,
      showPlayText: false,
      liked: false,
      likeIcon: '../../public/like.svg',
      emptyHeartIcon: '../../public/empty_heart.svg',
      idQuizSelected: 0
    }
  },
  methods:{
    router() {
      return router
    },
    async giveLikeOrDislike(){
      // I aproeached this with the
      // "optimistic" promise priciples
      //  i  shopw the like/dislike visually
      this.liked= !this.liked
      if (this.liked===true){
        const likeSaveOnDB = await postAPI(`${apiDirection}/api/li/give`, {
          "fk_id_user": this.userID,
          "fk_id_quiz": this.quiz.id_quiz
        })

        // and then, if the API post fail
        // I undo the visual icon
        if (likeSaveOnDB.error === 'not created') {
          this.liked = false
        }
        // finally, if all was success, update the LS
        useSessionStore().user.likedStorage.push(this.quiz)
        return
      }

      const likeDeleteOnDB = await deleteAPI(`${apiDirection}/api/li/dis/${this.userID}/${this.quiz.id_quiz}`)
      if (!likeDeleteOnDB)  this.liked = true
      const updateStorage = useSessionStore().user.likedStorage.filter((quizLS) => quizLS.id_quiz !== this.quiz.id_quiz )
      useSessionStore().user.likedStorage = [...updateStorage]
    },
    handlePlayQuizSelected(){
      useSessionStore().user.lastCustomQuizSelected = this.quiz.id_quiz
      this.router().push('/custom')
    }

  },
  created() {
    // when we show the quiz we must know if the quizz is already liked
    // to change the iconm
    const isLiked= useSessionStore().user.likedStorage.some((quizLocalStorage)=> {
      return  quizLocalStorage.id_quiz === this.quiz.id_quiz
    })

    if(isLiked) this.liked=true

    this.idQuizSelected = this.quiz.id_quiz
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
        @click="giveLikeOrDislike"
        class="card__empty-heart"
        alt="doodle of a heart"
        v-if="liked"
        src="../../public/like.svg"
      >
      <img
        @click="giveLikeOrDislike"
        class="card__empty-heart"
        alt="doodle of a heart"
        v-if="!liked"
        src="../../public/empty_heart.svg"
      >


    </button>

    <section class="card__info">
      <p>Total questions: {{quiz.number_questions}}</p>
      <p v-if="quiz.clock">Time: {{quiz.time}} s</p>
    </section>

    <button class="card__action" v-if="showPlayText" @click="handlePlayQuizSelected">play</button>
    <footer
      class="card__footer"
      :class="this.bgCardColorCSS"
    >
      <h1 class="card__name">{{quiz.quiz_name}}</h1>
    </footer>

  </article>
</template>

