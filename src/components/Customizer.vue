<script>
import Modal from '@/components/Modal.vue'
import { postAPI } from '@/helpers/callAPI.js'

export default {
  name: 'Customizer',
  components: { Modal },
  data(){
    return{
      openAddForm: false,
      openTimeSettings: false,
      newQuestion: {
          title:"",
          optionA:"",
          optionB:"",
          optionC:"",
          correctOption:"",
          quizID: 0
      },
      newQuiz: {
        numberOfQuestions: 0,
        clock:false,
        time:0,
        idUser:0
      },
      createdQuestions: [],
      createdQuiz: {...this.newQuiz}
    }
  },
  methods: {

    handleModal(e) {
      e.preventDefault()
      // to open
      if (e.target.classList.contains('add')) this.openAddForm = !this.openAddForm
      if (e.target.classList.contains('time')) this.openTimeSettings = !this.openTimeSettings
      // to close
      if (this.$refs.addForm && e.target.classList.contains('modal')) this.openAddForm = !this.openAddForm
      if (this.$refs.timeForm && e.target.classList.contains('modal')) this.openTimeSettings = !this.openTimeSettings
    },

    cleanForm() {
      this.$refs.title.value = ""
      this.$refs.optionA.value = ""
      this.$refs.optionB.value = ""
      this.$refs.optionC.value = ""
      this.$refs.correctOption.value = ""
    },

    async createQuestionOnDB(question) {

      console.log("\ntitle\n" + question.title,
        "\noption_a\n" + question.optionA,
        "\noption_b\n" + question.optionB,
        "\noption_c\n" + question.optionC,
        "\ncorrect_option\n" + question.correctOption,
        "\nfk_id_quiz\n" + question.quizID)

      const q = await postAPI("http://localhost:8000/api/usque/create", {
        "title": question.title,
        "option_a": question.optionA,
        "option_b": question.optionB,
        "option_c": question.optionC,
        "correct_option": question.correctOption,
        "fk_id_quiz": question.quizID
      })
      await console.log('question enviada: ' + q)
    },

    showQuestionCreated() {
      this.newQuestion.title = this.$refs.title.value
      this.newQuestion.optionA = this.$refs.optionA.value
      this.newQuestion.optionB = this.$refs.optionB.value
      this.newQuestion.optionC = this.$refs.optionC.value
      this.newQuestion.correctOption = this.$refs.correctOption.value

      const question = { ...this.newQuestion }
      this.createdQuestions.push(question)
      this.openAddForm = false
      this.cleanForm()
    },

    saveTimerSettings() {
      if (this.$refs.clock.value && this.$refs.time.value) {
        this.createdQuiz = {
          ...this.newQuiz,
          clock: this.$refs.clock.value,
          time: this.$refs.time.value
        }
      }
      this.openTimeSettings = false
    },

    async createdQuizOnDB() {
      const quiz = {
        ...this.createdQuiz,
        numberOfQuestions: this.createdQuestions.length,
        idUser: 1
      }
      // REAdJUST THE CODE WHEN USER LOGIN IS IMPLEMENTED
      // BY NOW DEFAULT USER ID (1)

      const createdQuiz = await postAPI("http://localhost:8000/api/cust/create", {
        "n_questions": quiz.numberOfQuestions,
        "clock": Boolean(quiz.clock),
        "time": parseInt(quiz.time),
        "fk_id_user": quiz.idUser
      })

      const createdQuizJSON = await createdQuiz.json();

      if (createdQuizJSON && createdQuizJSON.id_quiz) {

        this.createdQuestions.forEach((question) => {
          const questionCreated = {
            ...question,
              quizID: createdQuizJSON.id_quiz
          }
          this.createQuestionOnDB(questionCreated)
        })
        console.log('tuto bene')
      }
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
  <section class="customizer">
    <header class="customizer__header">

      <input
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
          <p class="customizer__title">{{question.title}}</p>
        </li>
      </ul>
    </article>

  </section>
  <button
    @click="createdQuizOnDB()"
    class="primary-button primary-button--customizer-mod2">Save</button>


  <!--modal for new question-->
  <Modal v-if="this.openAddForm"
    :show="openAddForm"
    ref="addForm"
  >
    <form @submit.prevent="showQuestionCreated">
      <section class="customizer__form">
        <h2 class="customizer__modal-title">
          Add new question
        </h2>
        <input
          ref="title"
          placeholder="Question..."
          class="customizer__input-form">
        <input
          ref="optionA"
          placeholder="Option a..."
          class="customizer__input-form">
        <input
          ref="optionB"
          placeholder="Option b..."
          class="customizer__input-form">
        <input
          ref="optionC"
          placeholder="Option c..."
          class="customizer__input-form">
        <input
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
    <form @submit.prevent="saveTimerSettings">
      <section class="customizer__form customizer__form--timer">
          <article class="customizer__art">
          <h2 class="customizer__modal-title--timer">
            ¿Add timer?
          </h2>
          <select ref="clock" class="customizer__sel">
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
            ref="time"
            type="number"
            placeholder="0"
            class="customizer__input-form"
          >
        </article>
      </section>
      <button type="submit" class="primary-button primary-button--modal-mod">Add</button>
    </form>
  </Modal>
</template>

