import { ref, reactive } from 'vue'

export const formValues = reactive({
  email: '',
  password: '',
  username: '',
  confirm_password: '',
})

export const disableForm = ref(false)

export function updateFormValues(e) {
  formValues[e.target.name] = e.target.value
}
