<script>
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
import { validationLogin } from '@/helpers/formHelpers.js'
import { ErrorMessage, Field, Form, validate } from 'vee-validate'

export default {
  name: 'FormLogin',

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
  components:{
    vField: Field,
    vForm: Form,
    vError: ErrorMessage,
  },
  mounted() {
    console.log('usermountedlogin: '+this.sessionStore.isConnected)
  }
}
</script>

<template>

  <vForm class="form" :validation-schema="schema" ref="form">
    <vField placeholder="Username..." class="form__input" type="string" name="username"/>
    <vError name="username" class="contact__error"></vError>
    <vField type="password" name="password" placeholder="Password..." class="form__input"/>
    <vError name="password" class="contact__error"></vError>
    <button type="submit"  class="primary-button" @click="onSubmit">Enter</button>
  </vForm>
</template>
