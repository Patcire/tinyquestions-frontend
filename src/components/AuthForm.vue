<script>
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
import { validationLogin, validationRegister } from '@/helpers/formHelpers.js'
import { ErrorMessage, Field, Form } from 'vee-validate'
import Loading from '@/components/Loading.vue'

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
      location,
      showErrorOfFailSubmit: false,
      errorFailSubmitMessage: "",
      isLoading: false
    }
  },
  methods: {

    async handleLogin() {
      this.isLoading = true
      const check = await this.sessionStore.checkUserCredentials(this.username, this.password)
      while (check === null){
      }
      if (!check){
        this.isLoading = false
        this.showErrorOfFailSubmit = true
        this.errorFailSubmitMessage ="No user found with these credentials"
        return
      }
      this.isLoading = false
      check && await router.push('/games')
    },

    async handleRegister(){
      this.isLoading = true
      const register = await this.sessionStore.register(this.email, this.username, this.password)

      if (!register){
        this.isLoading = false
        this.showErrorOfFailSubmit = true
        this.errorFailSubmitMessage ="something went wrong, try again!"
        return
      }
      else if(register==='exist'){
        this.isLoading = false
        this.showErrorOfFailSubmit = true
        this.errorFailSubmitMessage ="username not available"
        return
      }
      this.isLoading = false
      register && await router.push('/rules')
    },

    onSubmit(e) {
      this.showErrorOfFailSubmit = false
      e.preventDefault()
        this.$refs.regform && this.$refs.regform.validate().then(validation => {
          validation.valid && this.handleRegister()
        })
        this.$refs.logform && this.$refs.logform.validate().then(validation => {
          validation.valid && this.handleLogin()
      })
    }

  },

  components: { Loading, vField: Field, vForm: Form, vError: ErrorMessage, },
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
  <Loading v-if="isLoading"
           key-word="loading"
           imgSrc="../../public/Vectorelectron2.svg">
  </Loading>
  <section v-if="!isLoading">
    <vForm class="form" :validation-schema="schemaLogin" ref="logform" v-if="!registerForm">
      <vField v-model="username" placeholder="Username..." aria-label="username" class="form__input" type="string" name="username"/>
      <vError name="username" class="form__global-error"></vError>
      <vField v-model="password" type="password" name="password" placeholder="Password..." aria-label="password" class="form__input"/>
      <vError name="password" class="form__global-error"></vError>
      <button type="submit"  class="primary-button" @click="onSubmit">Enter</button>
      <p v-if="showErrorOfFailSubmit"
        class="form__global-error">{{errorFailSubmitMessage}}</p>
    </vForm>

    <vForm class="form" :validation-schema="schemaRegister" ref="regform" v-if="registerForm">
      <vField v-model="email" placeholder="Email..." aria-label="email" class="form__input" type="email" name="email"/>
      <vError name="email" class="form__global-error"></vError>
      <vField v-model="username" placeholder="Username..." aria-label="username" class="form__input" type="string" name="username"/>
      <vError name="username" class="form__global-error"></vError>
      <vField v-model="password" type="password" name="password" aria-label="password" placeholder="Password..." class="form__input"/>
      <vError name="password" class="form__global-error"></vError>
      <button type="submit"  class="primary-button" @click="onSubmit">Enter</button>
      <p v-if="showErrorOfFailSubmit"
         class="form__global-error">{{errorFailSubmitMessage}}</p>
    </vForm>
  </section>

</template>
