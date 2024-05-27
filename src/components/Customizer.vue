<script>
import Modal from '@/components/Modal.vue'
import { postAPI } from '@/helpers/callAPI.js'
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
import Loading from '@/components/Loading.vue'
import { goTo } from '@/helpers/navHelpers.js'

export default {
  name: 'Customizer',
  components: { Loading, Modal },
  data(){
    return{
      //user
      idUser:0,
      seshStorage: useSessionStore(),
      // modal data
      openAddForm: false,
      openTimeSettings: false,
      // questions data
      titleQuestion:"",
      optionA:"",
      optionB:"",
      optionC:"",
      correctOption:"",
      createdQuestions: [],
      // quizz data
      quizID: 0,
      quizName:"",
      numberOfQuestions: 0,
      clock:false,
      time:5,
      // component logic
      isLoading: false,
      cantSave: null,
      saved: false
    }
  },
  methods: {
    goTo,
    router() {
      return router
    },
    cleanForm(){
      this.titleQuestion = ""
      this.optionA = ""
      this.optionB = ""
      this.optionC = ""
      this.correctOption = ""
    },
    handleModal(e) {
      // 'cause thera is a different modal form for timer and another for add a new question
      e.preventDefault()
      // to open the correct one
      if (e.target.classList.contains('add')) this.openAddForm = !this.openAddForm
      if (e.target.classList.contains('time')) this.openTimeSettings = !this.openTimeSettings
      // to close
      if (this.$refs.addForm && e.target.classList.contains('modal')) this.openAddForm = !this.openAddForm
      if (this.$refs.timeForm && e.target.classList.contains('modal')) this.openTimeSettings = !this.openTimeSettings
    },
    closeTimer(){
      this.openTimeSettings = false
  },
    async createQuestionOnDB(question) {
      const questionResponse = await postAPI("http://localhost:8000/api/ques/create", {
        "title": question.titleQuestion,
        "option_a": question.optionA,
        "option_b": question.optionB,
        "option_c": question.optionC,
        "correct_option": question.correctOption,
        "isCustom": 1,
        "fk_id_quiz":  this.quizID

      })

      if (questionResponse.status === 500) return false
    },

    handleQuestionCreationVisually() { // for the user can visualize it on the page
      const question = {
        titleQuestion: this.titleQuestion,
        optionA: this.optionA,
        optionB: this.optionB,
        optionC: this.optionC,
        correctOption: this.correctOption
      }
      this.createdQuestions.push(question)
      this.openAddForm = false
     this.cleanForm()
    },

    async createdQuizOnDB() {
      this.isLoading = true
      const quiz = {
        clock: this.clock,
        time: this.time,
        name:this.quizName,
        numberOfQuestions: this.createdQuestions.length,
        idUser: this.seshStorage.user.userID,
      }

      const createdQuiz = await postAPI("http://localhost:8000/api/quiz/create", {
        "number_questions": quiz.numberOfQuestions,
        "clock": Boolean(this.clock),
        "time": parseInt(this.time),
        "type": "custom"
      })

      const createdQuizJSON = await createdQuiz.json()

      if (createdQuiz.status !== 201) {
        console.log('quiz nanai')
        this.cantSave= true
        this.isLoading = false
        return
      }

      else if (createdQuizJSON && createdQuizJSON.id_quiz) {

        this.quizID = createdQuizJSON.id_quiz

        const createdCustom = await postAPI("http://localhost:8000/api/cust/create", {
          "quiz_name": quiz.name,
          "id_quiz": this.quizID,
          "fk_id_user": this.seshStorage.user.userID
        })

        if (createdCustom.status !== 201) {
          console.log('custom nanai')
          this.cantSave= true
          this.isLoading = false
          return
        }

        // now we can create the questions on DB table
        for (const question of this.createdQuestions) {
           const responseQuestionCreated = await this.createQuestionOnDB(question);
           if (responseQuestionCreated === false){
             console.log('question nanai')
             this.cantSave = true
             this.isLoading = false
             return
           }
        }
      }

      this.saved = true
      this.isLoading = false

    },

    reloadPage(){
      window.location.reload()
    }

  },

  mounted() {
    window.onclick = (e) => {
      e.target.classList.contains('modal') && this.handleModal(e)
    }
  }

}
</script>

<template>
  <div v-if="isLoading" class="div__loading">
    <Loading key-word="loading" imgSrc="../../public/Vectorelectron2.svg"></Loading>
  </div>
  <section class="customizer" v-if="!saved && !isLoading">
    <header class="customizer__header">

      <input
        v-model="quizName"
        class="customizer__input"
        type="text"
        placeholder="Quiz name..."
      >
      <div class="customizer__buttons-container">
        <img
          id="time"
          @click="handleModal"
          src="../../public/clock.svg"
          class="customizer__icon time -only-for-e.target"
          alt="clock icon">
        <img
          id="add"
          @click="handleModal"
          src="../../public/add.svg"
          class="customizer__icon add -only-for-e.target"
          alt="add icon">
      </div>
    </header>
    <article class="customizer__questions-container">
      <ul>
        <li v-for="question in createdQuestions">
          <p class="customizer__title">{{question.titleQuestion}}</p>
        </li>
      </ul>
    </article>

  </section>
  <button
    v-if="!isLoading && !saved"
    @click="createdQuizOnDB()"
    class="primary-button primary-button--customizer-mod2">Save</button>
  <p class="form__global-error" v-if="cantSave">Something failed on save, try again! </p>
  <article v-if="saved" class="customizer__saved">
    <p class="form__global-error">Quiz saved!</p>
    <button
      @click="reloadPage"
      class="primary-button primary-button--customizer-mod2">Create
    </button>
    <button
      @click="goTo('/profile')"
      class="primary-button primary-button--customizer-mod2">See it
    </button>
  </article>

  <!--modal for new question-->
  <Modal v-if="this.openAddForm"
    :show="openAddForm"
    ref="addForm"
  >
    <form @submit.prevent="handleQuestionCreationVisually">
      <section class="customizer__form">
        <h2 class="customizer__modal-title">
          Add new question
        </h2>
        <input
          v-model="titleQuestion"
          ref="title"
          placeholder="Question..."
          class="customizer__input-form">
        <input
          v-model="optionA"
          ref="optionA"
          placeholder="Option a..."
          class="customizer__input-form">
        <input
          v-model="optionB"
          ref="optionB"
          placeholder="Option b..."
          class="customizer__input-form">
        <input
          v-model="optionC"
          ref="optionC"
          placeholder="Option c..."
          class="customizer__input-form">
        <input
          v-model="correctOption"
          ref="correctOption"
          placeholder="Correct option..."
          class="customizer__input-form">
      </section>
      <button type="submit" class="primary-button primary-button--modal-mod">Add</button>
    </form>
  </Modal>

  <!--modal for timer-->
  <Modal v-if="this.openTimeSettings"
    :show="openTimeSettings"
    ref="timeForm"
  >
    <form @submit.prevent="closeTimer">
      <section class="customizer__form customizer__form--timer">
          <article class="customizer__art">
          <h2 class="customizer__modal-title--timer">
            ¿Add timer?
          </h2>
          <select v-model="clock" ref="clock" class="customizer__sel">
            <option  class="customizer__opt"
              value="false">false</option>
            <option class="customizer__opt"
              value="true">true</option>
          </select>
        </article>
        <article class="customizer__art">
        <h2 class="customizer__modal-title--timer">
        Seconds:
        </h2>
          <input
            v-model="time"
            ref="time"
            type="number"
            min="5"
            placeholder="5"
            class="customizer__input-form"
          >
        </article>
      </section>
      <button type="submit" class="primary-button primary-button--modal-mod">Add</button>
    </form>
  </Modal>
</template>

