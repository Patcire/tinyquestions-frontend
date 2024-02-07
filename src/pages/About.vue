<script>
import ContactForm from '@/components/ContactForm.vue'

export default {
  name: 'About',
  components: { ContactForm },
  data(){
    return{
      contactModal: false
    }
  },
  methods: {
    showContactModal(){
      this.contactModal = !this.contactModal
      console.log('modallll')
    },
    handleClose(e){
      (!this.contactModal && this.$el.contains(e.target)) && this.showContactModal()
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClose)
  }
}

</script>

<template>
  <section class="temp">
    <h1>About</h1>

    <article>
      <p>At tinyquestion we love filler games that help you
        to free all the stress of your day.
      </p>

      <p> With that in mind and simplicity, elegancy and fun like our values,
        we offer to you the best way to disconnect from daily tasks.
      </p>
      <p>Play little quizzes alone or with friends and free
        your mind. Maybe even you’ll learn something new!
      </p>
    </article>

    <button @click="showContactModal">Contact</button>
  </section>

  <ContactForm v-if="contactModal" class="form-modal" :class="{'form-modal--show' : contactModal}"></ContactForm>

</template>

<style scoped>
  .temp{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>