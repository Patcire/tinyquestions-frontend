<script>
import {  ErrorMessage as vError,  Field as vField, Form as vForm } from 'vee-validate'
import { useSessionStore } from '@/stores/sessionStore.js'
import { validationLogin } from '@/helpers/formHelpers.js'
import router from '@/router/router.js'

export default {
  name: 'FormRegister',
  components: { vField, vError, vForm },
  data(){
    return{
      sessionStore: useSessionStore(),
      schema: validationLogin
    }
  },
  methods: {
    handleLogin(){
      this.sessionStore.checkUserCredentials()
      router.push('/games');


    },
    onSubmit(e) {
      e.preventDefault()
      this.$refs.form.validate().then(validation => {
        validation.valid && this.handleLogin()
      })
    }
  },

  mounted() {
    console.log('usermountedlogin: '+this.sessionStore.isConnected)
  }

}
</script>

<template>
  <template>

    <vForm class="form" :validation-schema="schema" ref="form">
      <vField placeholder="Email..." class="form__input" type="email" name="email"/>
      <vError name="email" class="contact__error"></vError>
      <vField placeholder="Username..." class="form__input" type="string" name="username"/>
      <vError name="username" class="contact__error"></vError>
      <vField type="password" name="password" placeholder="Password..." class="form__input"/>
      <vError name="password" class="contact__error"></vError>
      <button type="submit"  class="primary-button" @click="onSubmit">Enter</button>
    </vForm>
  </template>

</template>

<style scoped>

</style>