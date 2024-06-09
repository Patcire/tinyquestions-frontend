<script>
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
import { validationLogin, validationRegister } from '@/helpers/formHelpers.js'
import { ErrorMessage, Field, Form } from 'vee-validate'
import Loading from '@/components/Loading.vue'
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'AuthForm',
  components: { Loading, vField: Field, vForm: Form, vError: ErrorMessage, },
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
      isLoading: false,
      randomID: null,
      hideDialog: false
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
    },

  },
  watch: {
    location(loc) {
      if (loc.includes('register')) {
        this.registerForm = true
        this.email = `rand-${this.randomID.split('-')[4]}@mijita.ganesh23452345`
        this.password = this.randomID.split('-')[4]
      }
    }
  },

  mounted() {
    this.location = window.location.href
  },

  created() {
    this.randomID = uuidv4()
  }

}
</script>

<template>
  <Loading v-if="isLoading"
           key-word="loading"
           imgSrc="../../public/Vectorelectron2.svg">
  </Loading>
  <section v-if="!isLoading">

  <!--login form-->
    <vForm class="form" :validation-schema="schemaLogin" ref="logform" v-if="!registerForm">
      <vField v-model="username" placeholder="Username..." aria-label="username" class="form__input" type="string" name="username"/>
      <vError name="username" class="form__global-error"></vError>
      <vField v-model="password" type="password" name="password" placeholder="Password..." aria-label="password" class="form__input"/>
      <vError name="password" class="form__global-error"></vError>
      <button type="submit"  class="primary-button" @click="onSubmit">Enter</button>
      <p v-if="showErrorOfFailSubmit"
        class="form__global-error">{{errorFailSubmitMessage}}</p>
    </vForm>


    <!--register dialog-->
    <div class="dialog__container" v-if="registerForm && !hideDialog">
      <dialog open class="dialog__info">
        <p class="dialog__message">
          Temporarily, and for security, email and password are generated randomly.</p>
        <p>
          Still, you can choose the username and use the account with the next password (save it!).
        </p>
        <p class="dialog__message">
          password: <strong>{{this.password}}</strong>
        </p>
        <button @click="this.hideDialog = true" class="dialog__button">Understood</button>
      </dialog>
    </div>

    <!--register form-->
    <vForm class="form" :validation-schema="schemaRegister" ref="regform" v-if="registerForm">
      <vField v-model="email" placeholder="Email..." aria-label="email" class="form__input" type="email" name="email" disabled/>
      <vError name="email" class="form__global-error"></vError>
      <vField v-model="username" placeholder="Username..." aria-label="username" class="form__input" type="string" name="username"/>
      <vError name="username" class="form__global-error"></vError>
      <vField v-model="password" type="password" name="password" aria-label="password" placeholder="Password..." class="form__input" disabled/>
      <vError name="password" class="form__global-error"></vError>
      <button v-if="hideDialog" type="submit"  class="primary-button" @click="onSubmit">Enter</button>
      <p v-if="showErrorOfFailSubmit"
         class="form__global-error">{{errorFailSubmitMessage}}</p>
    </vForm>

  </section>

</template>
