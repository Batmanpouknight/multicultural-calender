import { reactive, computed } from 'vue'
import { link } from './link.js'
import { formValues, disableForm } from '../utils/formValues'
import { errors, clearErrors } from '../utils/formErrors.js'
import Cookies from 'js-cookie'
import Joi from 'joi'
import bcrypt from 'bcryptjs'

export const user = reactive({
  id: '',
  username: '',
  email: '',
  type: 'anonymous',
  events: [],
})

export async function fetchUser() {
  if (!Cookies.get('token')) return

  try {
    const res = await fetch(`${link}/user/updatefromserver`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`,
      },
    })
    const data = await res.json()
    user.id = data.result.id
    user.email = data.result.email
    user.username = data.result.username
    user.type = data.result.type
    user.events = data.result.events
  } catch (error) {
    console.error('Server did not respond: ', error)
  }
}

export const loggedIn = computed(() => user.id !== '')
