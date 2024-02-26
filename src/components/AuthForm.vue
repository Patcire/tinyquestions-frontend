<script>
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
import { validationLogin, validationRegister } from '@/helpers/formHelpers.js'
import { ErrorMessage, Field, Form } from 'vee-validate'

export default {
  name: 'AuthForm',

  data() {
    return {
      username:"",
      password:"",
      email:"",
      sessionStore: useSessionStore(),
      schemaLogin: validationLogin,
      schemaRegister: validationRegister,
      registerForm: false,
      location
    }
  },
  methods: {
    async handleLogin() {
      console.log(this.username, this.password)
      const check = await this.sessionStore.checkUserCredentials(this.username, this.password)
      console.log(check) // if = false show modal with error
      check && await router.push('/games')
    },
    async handleRegister(){
      console.log(this.email,this.username, this.password)
      const register = await this.sessionStore.register(this.email, this.username, this.password)
      console.log(register) // if = false show modal with error
      register && await router.push('/games')
    },
    onSubmit(e) {
      e.preventDefault()
        this.$refs.regform && this.$refs.regform.validate().then(validation => {
          validation.valid && this.handleRegister()
        })
        this.$refs.logform && this.$refs.logform.validate().then(validation => {
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
    <vField v-model="username" placeholder="Username..." class="form__input" type="string" name="username"/>
    <vError name="username" class="contact__error"></vError>
    <vField v-model="password" type="password" name="password" placeholder="Password..." class="form__input"/>
    <vError name="password" class="contact__error"></vError>
    <button type="submit"  class="primary-button" @click="onSubmit">Enter</button>
  </vForm>

  <vForm class="form" :validation-schema="schemaRegister" ref="regform" v-if="registerForm">
    <vField v-model="email" placeholder="Email..." class="form__input" type="email" name="email"/>
    <vError name="email" class="contact__error"></vError>
    <vField v-model="username" placeholder="Username..." class="form__input" type="string" name="username"/>
    <vError name="username" class="contact__error"></vError>
    <vField v-model="password" type="password" name="password" placeholder="Password..." class="form__input"/>
    <vError name="password" class="contact__error"></vError>
    <button type="submit"  class="primary-button" @click="onSubmit">Enter</button>
  </vForm>

</template>
