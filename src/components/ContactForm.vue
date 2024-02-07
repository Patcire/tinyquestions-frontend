<script>
import {Field, Form, ErrorMessage} from 'vee-validate'
import * as yup from 'yup'
import { boolean } from 'yup'

export default {
  name: 'ContactForm',
  data(){

    const validationSchema = yup.object().shape({
      email: yup.string().required().email('Invalid email format'),
      date: yup.date().required('Select the incidence date').max(2025, 'not trolling pls').min(2024, 'this web was created at 2024'),
      textarea: yup.string().required(),
      policy: yup.boolean().oneOf([true]).required('You have to accept our privacy policy')
    });

    return{
      schema: validationSchema
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

  <vForm :validation-schema="this.schema" class="form-contact">
      <h4>Tell us your problem</h4>

    <label>Email <vField type="email" name="email" placeholder="example@gmail.com"/></label>
    <vError name="email"></vError>

    <label>Date of the incidence<vField type="date" name="date"/></label>
    <vError name="date"></vError>

    <label>Your message: <vField as="textarea" name="textarea"></vField></label>
    <vError name="textarea"></vError>

    <label>Accept our privacy policy<vField type="checkbox" name="policy" :value="true"/></label>
    <vError name="policy"></vError>

    <button type="submit">Send</button>
  </vForm>

</template>
