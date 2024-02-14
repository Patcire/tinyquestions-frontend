<script>
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
import { validationLogin, validationRegister } from '@/helpers/formHelpers.js'
import { ErrorMessage, Field, Form } from 'vee-validate'

export default {
  name: 'AuthForm',

  data() {
    return {
      sessionStore: useSessionStore(),
      schemaLogin: validationLogin,
      schemaRegister: validationRegister,
      registerForm: false,
      location
    }
  },
  methods: {
    handleLogin() {
      this.sessionStore.checkUserCredentials()
      router.push('/games');
    },
    handleRegister(){
      this.sessionStore.checkUserCredentials()
      router.push('/games');
    },
    onSubmit(e) {
      e.preventDefault()
      if (this.registerForm) {
        this.$refs.regform.validate().then(validation => {
          validation.valid && this.handleRegister()
        })
      }
      this.$refs.logform.validate().then(validation => {
        validation.valid && this.handleLogin()
      })
    }
  },
  components: { vField: Field, vForm: Form, vError: ErrorMessage, },
  mounted() {
    this.location = window.location.href
  },
  watch: {
    location(loc) {
      if (loc.includes('register')) {
        this.registerForm = true
      }
    }
  }
}

</script>

<template>
  <vForm class="form" :validation-schema="schemaLogin" ref="logform" v-if="!registerForm">
    <vField placeholder="Username..." class="form__input" type="string" name="username"/>
    <vError name="username" class="contact__error"></vError>
    <vField type="password" name="password" placeholder="Password..." class="form__input"/>
    <vError name="password" class="contact__error"></vError>
    <button type="submit"  class="primary-button" @click="onSubmit">Enter</button>
  </vForm>

  <vForm class="form" :validation-schema="schemaRegister" ref="regform" v-if="registerForm">
    <vField placeholder="Email..." class="form__input" type="email" name="email"/>
    <vError name="email" class="contact__error"></vError>
    <vField placeholder="Username..." class="form__input" type="string" name="username"/>
    <vError name="username" class="contact__error"></vError>
    <vField type="password" name="password" placeholder="Password..." class="form__input"/>
    <vError name="password" class="contact__error"></vError>
    <button type="submit"  class="primary-button" @click="onSubmit">Enter</button>
  </vForm>

</template>
