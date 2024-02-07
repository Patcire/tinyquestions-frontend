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
  <section class="about">

    <article>
      <p>At <strong>tinyquestion</strong> we love filler games that help you
        to free all the stress of your day.
      </p>

      <p> With that in mind and simplicity, elegancy and fun like our values,
        we offer to you the best way to disconnect from daily tasks.
      </p>
      <p>Play little quizzes alone or with friends and free
        your mind. <strong>Maybe even you’ll learn something new!</strong>
      </p>
    </article>

    <img src="../../public/thinker.svg" alt="head doodle" />
    <button @click="handleShowModal" class="primary-button">Contact</button>
  </section>

  <Modal :show="popUp">
    <ContactForm></ContactForm>
  </Modal>
</template>
