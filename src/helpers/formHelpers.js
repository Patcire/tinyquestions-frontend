import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  email: yup.string().required().email('Invalid email format'),
  date: yup.date().required('Select the incidence date').max(2025, 'not trolling pls').min(2024, 'this web was created at 2024'),
  textarea: yup.string().required(),
  policy: yup.boolean().oneOf([true]).required('You have to accept our privacy policy'),
  username: yup.string().required().min(8, 'mínimo 8 carácteres'),
  password: yup.string().required().min(8, 'mínimo 6 carácteres')
});