import { ref, watch } from 'vue'

export const errors = ref([])

export function clearErrors() {
  errors.value = []
  document.querySelectorAll('.error').forEach((error) => error.remove())
}
watch(errors, () => {
  if (errors.value.length > 0) {
    errors.value.forEach((error) => {
      const errorElement = document.createElement('div')
      errorElement.classList.add('error')
      errorElement.textContent = error.message
      document.getElementById(error.location).appendChild(errorElement)
    })
  } else {
    document.querySelectorAll('.error').forEach((error) => error.remove())
  }
})
