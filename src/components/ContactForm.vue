<script>
import {Field, Form, ErrorMessage} from 'vee-validate'
import { validationContact } from '@/helpers/formHelpers.js'

export default {
  name: 'ContactForm',
  data(){

    return{
      schema: validationContact
    }
  },
  methods: {
  },
  components:{
    vField: Field,
    vForm: Form,
    vError: ErrorMessage,
  }
}
</script>

<template>

  <vForm :validation-schema="this.schema" class="contact">

          <header class="contact__title">
            <h3>Tell us your problem</h3>
          </header>

      <vField class="contact__input" type="email" name="email" placeholder=" Email..."/>
      <vError name="email" class="form__global-error"></vError>

      <div class="contact__input contact__input--mod">
        <label class="contact__label">Date of the incidence
          <vField type="date" name="date" class="contact__date"/>
        </label>
        <vError name="date" class="form__global-error"></vError>
      </div>

        <vField as="textarea" name="textarea" placeholder="Your message..." class="contact__textarea"></vField>
      <vError name="textarea" class="form__global-error"></vError>

      <div class="contact__input contact__input--mod">
        <label class="contact__label">Accept our privacy policy
          <vField type="checkbox" name="policy" :value="true" class="contact__checkbox"/></label>
        <vError name="policy" class="form__global-error"></vError>
      </div>

    <button type="submit" class="contact__button">Send</button>
  </vForm>

</template>
