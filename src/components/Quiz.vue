<script>
import { callAPI, postAPI } from '@/helpers/callAPI.js'
import router from '@/router/router.js'
import Loading from '@/components/Loading.vue'
import { useSessionStore } from '@/stores/sessionStore.js'
import { boolean } from 'yup'
import Results from '@/components/Results.vue'

export default {
  name: 'Quiz',
  computed: {
  },
  components: { Results, Loading },
  data(){
    return{
      isCorrectAnimationTrigger: null,
      points:0,
      quizzesResolved:0,
      questions: [],
      counter: 0,
      timerAutoStart: true,
      isLoading: false,
      responses: [],
      quizID: null, // until we created on the db we don't know the id
      matchID: null, // same with match
      seshStore: useSessionStore().user
    }
  },

  props:{
    mode:{
      type: Object,
      required: true
      /*
      |--Mode template Sheet--|
        -title: title of the play mode **String**
        -class: CSS class to the title of the play mode **String**
        -clock: Array with two values [**Boolean**, miliseconds (**Number**)]
        -numberOfQuestions: **Number**
        -hasScore: **Boolean**
        -rerun: **Boolean**
        -mod: to mod some of the functions of the quiz **String**
        -isCustom: we need to know if questions can't be random **Boolean**
        -idCustomQuiz: if is custom we need the quiz id **Number**
        -gameMode: if is not custom we need to know the mode of random game (f.e: quick) **String**
        -isMultiplayer: **Boolean**
        -questionsForMultiplayerMatch: Object taht contains questions for multiplayer match *Object*
      */
    }
  },
  emits:['hideQuiz', 'responses', 'playerFinishTheQuiz'],

  methods: {
    router() {
      return router
    },

    // to get questions from API

    async getQuestionsFromAPIForNewQuiz(){
      this.questions = await callAPI(`http://localhost:8000/api/ques/rand/${this.mode.numberOfQuestions}`)
    },
    async getMoreQuestionsForZenMode(){
      this.questions = [...this.questions, ...await callAPI(`http://localhost:8000/api/ques/rand/${this.mode.numberOfQuestions}`)]
    },
    async getQuestionsOfCustomQuiz(){
      let quizInfo = await callAPI(`http://localhost:8000/api/cust/${useSessionStore().user.lastCustomQuizSelected}`)
      // now we need to set some values on the mode parameters
      // to made that quiz logic works
      this.questions = quizInfo.questions
      this.mode.numberOfQuestions = this.questions.length+1
      this.mode.title = quizInfo.quiz_name
    },

    // to handle the logic of the questions

    handleHideQuiz() { // only for multiplayers matches, to hide until all players hava answered
      this.$emit('hideQuiz', true);
    },

    async nextQuestion() {

      // if is a multiplayer match we need to wait until all players had answered
        if (this.mode.isMultiplayer) this.handleHideQuiz()

      this.counter++
      // evaluation for infinite (zen) mode
      (!this.mode.rerun && this.counter === this.questions.length - 6) && await this.getMoreQuestionsForZenMode()
      document.querySelectorAll('input[type="radio"]')
        .forEach(radio => radio.checked = false)

    },

    addScore(){
      this.points += 10
    },

    correctOption(optionSelected) {
      this.isCorrectAnimationTrigger = this.questions[this.counter].correct_option === optionSelected
      this.isCorrectAnimationTrigger && this.addScore()
    },

    handleOptionSelected(optionSelected) {
      this.responses.push({
          "selected": optionSelected,
          "correct": this.questions[this.counter].correct_option,
          "wasRight": this.questions[this.counter].correct_option === optionSelected
        })
      if (this.mode.isMultiplayer) this.$emit('responses', {
        "selected": optionSelected,
        "correct": this.questions[this.counter].correct_option,
        "wasRight": this.questions[this.counter].correct_option === optionSelected,
        "questionNumber": this.counter+1,
      })
      this.correctOption(optionSelected)
      setTimeout(()=>{
        this.nextQuestion()
      }, 300)
      setTimeout(()=>{
        this.isCorrectAnimationTrigger = null
      }, 460)

    },

    // to handle user Stats
    async updateUserStats(){
      console.log('iscust?'+this.mode.isCustom)
      useSessionStore().user.points +=  this.points
      useSessionStore().user.quizzes_resolved +=  1
      await useSessionStore().updateStats()

    },

    //to handle the quiz logic

    async createQuizAndMatchOnDB(){

      //only for random quizzes need create the quizz
      if (!this.mode.isCustom){
        const createdQuiz = await postAPI('http://localhost:8000/api/quiz/create',
          {
            "number_questions": this.questions.length,
            "clock": this.mode.clock[0],
            "time": this.mode.clock[1],
            "type": "random",
          })

        if (createdQuiz.status !== 201){
          // to do --> MODAL error al guardar
          console.log('quiz no creater')
          console.log(createdQuiz)
          return
        }

        const infoQuizCreated = await createdQuiz.json()
        this.quizID = await infoQuizCreated.id_quiz
        console.log('quizID: ' + await this.quizID)

        // if the quiz is random we need to add to his dedicate table
        // (custom quizzes are always created by user before they can play it)
        let createdRandomQuiz = {}
        createdRandomQuiz = await postAPI('http://localhost:8000/api/rand/create',
          {
            "id_quiz": this.quizID,
            "mode": this.mode.gameMode
          })

        if (createdRandomQuiz.status !== 201){
          // to do --> MODAL error al guardar
          console.log('random no created')
          console.log(createdRandomQuiz.json())
        }
      }
      else {
        // if the user plays a custom quizz we pick up the existing quiz id
        // to create the match
        console.log('we are here')
        this.quizID = useSessionStore().user.lastCustomQuizSelected
      }


      // then we create the match
      const createdMatch = await postAPI('http://localhost:8000/api/match/create', {
        "isMultiplayer": this.mode.isMultiplayer,
        "fk_id_quiz": await this.quizID,

      })

      if (createdMatch.status !== 201){
        // to do --> MODAL error al guardar
        console.log(await createdMatch.json())
        return
      }

      const infoMatch = await createdMatch.json()
      this.matchID = await infoMatch.id_match
      console.log("idMatch: "+ await this.matchID)


    },

    async handleNewQuiz(){
      this.questions = [] // to activate the loading animation
      await this.getQuestionsFromAPIForNewQuiz()
      this.counter =0
      this.points = 0
      this.timerAutoStart = true
      this.mode.gameMode !== "zen" &&  await this.createQuizAndMatchOnDB()
    },

    handleTimesOut(){
      this.timerAutoStart = false
    },

    async handleFinishedQuiz(){
      // the app needs to save the asociated questions
      // responses to their respective quiz/matches on DB

      if (this.mode.isMultiplayer){
        this.$emit('playerFinishTheQuiz', {
          username: this.seshStore.username,
          points: this.points
        })
        return
      }

      if(!this.mode.isCustom){
        let asociatedQuestion = {}
        for (const question of this.questions) {
           asociatedQuestion = await postAPI(
             'http://localhost:8000/api/has/create', {
               "id_quiz": await this.quizID,
               "id_question": question.id_question
             })
          if (asociatedQuestion.status !== 201){
            console.log(question.id_question+' id ques')
            console.log(await asociatedQuestion.json())
            return
          }
          console.log('asociatedQuest: ' + await asociatedQuestion.json())
        }
      }
      // and finally create the report (table user_play_match)
      const createdReport = await postAPI('http://localhost:8000/api/play/create', {
        "id_user": useSessionStore().user.userID,
        "id_quiz": await this.quizID,
        "points": this.points,
        "answers": JSON.stringify(this.responses),
        "id_match": await this.matchID
      })

      if (createdReport.status !== 200){
        // to do --> MODAL error al guardar
        console.log('report no created')
        console.log(createdReport.status)
        return
      }
      if (!this.mode.isCustom) await this.updateUserStats() && console.log('stats updated')
      console.log(createdReport.status)

    }

  },

  async created() {

    if(this.mode.isMultiplayer === 1){
      console.log(this.questions)
      this.questions = [...this.mode.questionsForMultiplayerMatch]

      return
    }

    this.mode.isCustom ?
    await this.getQuestionsOfCustomQuiz()
      :
    await this.getQuestionsFromAPIForNewQuiz()

    this.mode.gameMode !== "zen" &&  await this.createQuizAndMatchOnDB()
  },

  watch: {
    counter(value) {
      // when matches finish and game mode is not zen
      if (value>this.questions.length-1 && this.mode.gameMode !== "zen") this.handleFinishedQuiz()
    },
  }

}
</script>

<template>

  <Loading v-if="!questions.length"
           key-word="loading"
           imgSrc="../../public/Vectorelectron2.svg"
  ></Loading>

  <section class="quiz quiz--home"
           v-if="questions.length > 0
                 && questions[counter]
                 && timerAutoStart"
  >

    <header class="quiz__header" v-if="mode.title">
      <h1 :class=mode.class  aria-label="title of the game mode">{{mode.title}}</h1>

      <Vountdown
        v-if="this.mode.clock[0]"
        :auto="this.timerAutoStart"
        class="quiz__timer"
        :time="this.mode.clock[1]"
        @done="handleTimesOut"
        v-slot="{seconds}"
      >
        <em>00:{{ seconds }} s</em>
      </Vountdown>

    </header>

    <form class="quiz__form" v-if="questions">
      
      <legend class="quiz__title">
       {{questions[counter].title}}
      </legend>

      <fieldset class="quiz__answers">

        <label class="quiz__answer">
          <input type="radio" name="option" @click="handleOptionSelected(questions[counter].option_a)" class="quiz__opt">
          <span aria-hidden="true" class="quiz__letter">a)</span>
          <span class="quiz__response">{{questions[counter].option_a}}</span>
        </label>

        <label class="quiz__answer">
          <input type="radio" name="option" @click="handleOptionSelected(questions[counter].option_b)" class="quiz__opt">
          <span aria-hidden="true" class="quiz__letter">b)</span>
          <span class="quiz__response">{{questions[counter].option_b}}</span>
        </label>

        <label class="quiz__answer">
          <input type="radio" name="option" @click="handleOptionSelected(questions[counter].option_c)" class="quiz__opt">
          <span aria-hidden="true" class="quiz__letter">c)</span>
          <span class="quiz__response">{{questions[counter].option_c}}</span>
        </label>
      </fieldset>
      <img src="../../public/like.svg"
           class="quiz__like"
           :class="{'active' : isCorrectAnimationTrigger}"
           alt="heart because your answer is right">
      <img src="../../public/fail.svg"
           class="quiz__fail"
           :class="{'active' : isCorrectAnimationTrigger===false}"
           alt="a cross 'cause you fail">
    </form>

    <!--score-->
    <div v-if="!this.mode.isMultiplayer">
      <article class="quick__points-container" v-if="questions.length && points>0 && (mode.rerun || mode.isCustom)">
        <h3 class="quick__points"
            >{{points}} points
        </h3>
        <h3 class="quick__sum" :class="{'active' : isCorrectAnimationTrigger}"> +10 points</h3>
        <img class="quick__sparkles"
             src="../../public/virutas.svg" alt="doodle of sparkles">
      </article>
    </div>
  </section>

  <!--Results-->
  <div v-if="((mode.numberOfQuestions === counter || !timerAutoStart) && mode.hasScore) && this.questions.length && !this.mode.isMultiplayer"
    class="quiz__container">
    <results
      :points="this.points"
      :questions="this.questions"
      :mode="this.mode"
      @handleNewQuiz="handleNewQuiz"
    ></results>
  </div>

</template>
