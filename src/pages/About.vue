<script>
import ContactForm from '@/components/ContactForm.vue'
import Modal from '@/components/Modal.vue'

export default {

  name: 'About',
  components: { Modal, ContactForm },
  data(){
    return{
      popUp: false
    }
  },
  methods: {
    handleShowModal(e) {
      e.preventDefault()
      this.popUp = !this.popUp
    }
  },
  mounted() {
    window.onclick = (e) => {
      e.target.classList.contains('modal') && this.handleShowModal(e)
      }
    }
}

</script>

<template>
  <div class="about__circle"></div> <!--only for decoration-->
  <section class="about">

    <article class="about__text">
      <p class="about__p">At <strong>tinyquestion</strong> we love filler games that help you
        to free all the stress of your day.
      </p>

      <p class="about__p"> With that in mind and simplicity, elegancy and fun like our values,
        we offer to you the best way to disconnect from daily tasks.
      </p>
      <p class="about__p">Play little quizzes alone or with friends and free
        your mind. <strong>Maybe even you’ll learn something new!</strong>
      </p>
    </article>
    <img class="about__doodle" src="../../public/thinker.svg" alt="head doodle" />

    <div class="about__container">
      <button @click="handleShowModal" class="about__btn primary-button">Contact</button>
    </div>
  </section>

  <Modal
    :show="popUp"
    buttonText="Send"
  >
    <ContactForm></ContactForm>
  </Modal>

</template>
