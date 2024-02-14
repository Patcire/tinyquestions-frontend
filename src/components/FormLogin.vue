<script>
import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'
import { validationSchema } from '@/helpers/formHelpers.js'
import { ErrorMessage, Field, Form} from 'vee-validate'

export default {
  name: 'FormLogin',
  data(){
    return{
      sessionStore: useSessionStore(),
      schema:validationSchema
    }
  },
  methods: {
   handleLoguin() {
     this.sessionStore.checkUserCredentials()
     //router.push('/games')
         router.push('/games')
    }
  },
  components:{
    vField: Field,
    vForm: Form,
    vError: ErrorMessage,
  }
}
</script>

<template>

  <vForm class="form" :validation-schema="this.schema" v-slot="{submitForm}">
    <vField placeholder="Username..." class="form__input" type="string" name="username"/>
    <vError name="username" class="contact__error"></vError>
    <vField type="password" name="password" placeholder="Password..." class="form__input"/>
    <vError name="password" class="contact__error"></vError>
    <button type="submit" @click="submitForm(handleLoguin)" class="primary-button">Enter</button>
  </vForm>
</template>
