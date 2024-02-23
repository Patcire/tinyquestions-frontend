<script>
import Modal from '@/components/Modal.vue'
import { postAPI } from '@/helpers/callAPI.js'

export default {
  name: 'Customizer',
  components: { Modal },
  data(){
    return{
      popUp: false,
      newQuestion: {
          title:"",
          optionA:"",
          optionB:"",
          optionC:"",
          correctOption:"",
      },
      customQuestions: []
    }
  },
  methods: {
    openAddForm(e) {
      e.preventDefault()
      this.popUp = !this.popUp
    },
    cleanForm(){
      this.$refs.title.value = ""
      this.$refs.optionA.value = ""
      this.$refs.optionB.value = ""
      this.$refs.optionC.value = ""
      this.$refs.correctOption.value = ""
    },
    async createQuestionOnDB(){
      await postAPI("http://localhost:8000/api/usque/create", {
        "title":this.newQuestion.title,
        "option_a":this.newQuestion.optionA,
        "option_b":this.newQuestion.optionB,
        "option_c":this.newQuestion.optionC,
        "correct_option":this.newQuestion.correctOption,
      })
    },
    saveQuestion() {

      this.newQuestion.title = this.$refs.title.value
      this.newQuestion.optionA = this.$refs.optionA.value
      this.newQuestion.optionB = this.$refs.optionB.value
      this.newQuestion.optionC = this.$refs.optionC.value
      this.newQuestion.correctOption = this.$refs.correctOption.value

      const question = {...this.newQuestion}

      this.createQuestionOnDB()
      this.customQuestions.push(question)
      this.popUp  = false
      this.cleanForm()
    },
  },
  mounted() {
    window.onclick = (e) => {
      e.target.classList.contains('modal') && this.openAddForm(e)
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
          src="../../public/clock.svg"
          class="customizer__icon"
          alt="clock icon">
        <img
          @click="openAddForm"
          src="../../public/add.svg"
          class="customizer__icon"
          alt="add icon">
      </div>
    </header>
    <article class="customizer__questions-container">
      <ul>
        <li v-for="question in customQuestions">
          <p class="customizer__title">{{question.title}}</p>
        </li>
      </ul>
    </article>

  </section>

  <!--only when modal is open-->
  <Modal :show="popUp" @submit.prevent="saveQuestion">
    <form>
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
  <button class="primary-button primary-button--customizer-mod2">Save</button>
</template>

