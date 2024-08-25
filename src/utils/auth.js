import { link } from './link.js'
import { user } from './user.js'
import { formValues, disableForm } from '../utils/formValues'
import { errors, clearErrors } from '../utils/formErrors.js'
import Cookies from 'js-cookie'
import Joi from 'joi'

export async function signupSubmit() {
  disableForm.value = true
  const { email, username, password, confirm_password } = formValues
  const type = 'user'

  clearErrors()

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: ['com', 'ca', 'net'] } })
      .required(),
    username: Joi.string().alphanum().min(3).max(12).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$*]{6,20}$')).required(),
    confirm_password: Joi.valid(Joi.ref('password')).required(),
  })
  const { error } = schema.validate({ email, username, password, confirm_password }, { abortEarly: false })
  if (error) {
    console.log(error)
    for (let i = 0; i < error.details.length; i++) {
      errors.value.push({ id: i + 2, message: error.details[i].message, location: error.details[i].context.key })
    }
    disableForm.value = false
  }

  if (errors.value.length === 0) {
    try {
      const response = await fetch(`${link}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, type }),
      })
      const data = await response.json()
      if (data.error) {
        errors.value.push({ id: data.error.code, message: data.error.message, location: data.error.location })
        disableForm.value = false
        return
      }

      disableForm.value = false
      user.id = data.result.id
      user.email = email
      user.username = username
      user.type = type
      Cookies.set('token', data.result.token, { expires: 14 })
    } catch (error) {
      console.log(error)
    }
  }
}

export async function loginSubmit() {
  disableForm.value = true
  const { email, password } = formValues

  clearErrors()
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: ['com', 'ca', 'net'] } })
      .required(),
    password: Joi.string().min(6).max(12).required(),
  })
  const { error } = schema.validate({ email, password }, { abortEarly: false })
  if (error) {
    for (let i = 0; i < error.details.length; i++) {
      errors.value.push({ id: i + 2, message: error.details[i].message, location: error.details[i].context.key })
    }
    disableForm.value = false
  }
  if (errors.value.length == 0) {
    try {
      const response = await fetch(`${link}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (data.error) {
        errors.value.push({ id: data.error.code, message: data.error.message, location: data.error.location })
        disableForm.value = false
        return
      }

      const userInfo = data.result

      user.id = userInfo.id
      user.email = userInfo.email
      user.username = userInfo.username
      user.type = userInfo.type
      user.events = userInfo.events
      Cookies.set('token', userInfo.token, { expires: 14 })
    } catch (error) {
      console.log(error)
    }
    disableForm.value = false
  }
}

export function logout() {
  user.id = ''
  user.email = ''
  user.username = ''
  user.type = 'anonymous'
  user.events = []
  Cookies.remove('token')
}
