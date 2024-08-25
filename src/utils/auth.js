import { link } from './link.js'
import { user } from './user.js'
import { formValues, disableForm } from '../utils/formValues'
import { errors, clearErrors } from '../utils/formErrors.js'
import Cookies from 'js-cookie'
import Joi from 'joi'
import bcrypt from 'bcryptjs'

export async function signupSubmit() {
  disableForm.value = true
  const { email, username, password, confirm_password } = formValues
  const type = 'user'

  clearErrors()
  if (password !== confirm_password) {
    errors.value.push({ id: 1, message: 'Passwords do not match', location: 'password' })
    disableForm.value = false
  }
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: ['com', 'ca', 'net'] } })
      .required(),
    username: Joi.string().alphanum().min(3).max(12).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$*]{3,20}$')).required(),
  })
  const { error } = schema.validate({ email, username, password }, { abortEarly: false })
  if (error) {
    for (let i = 0; i < error.details.length; i++) {
      errors.value.push({ id: i + 2, message: error.details[i].message, location: error.details[i].context.key })
    }
    disableForm.value = false
  }

  const hashedPassword = await bcrypt.hash(password, 15)

  if (errors.value.length === 0) {
    try {
      const response = await fetch(`${link}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password: hashedPassword, type }),
      })
      const data = await response.json()
      if (data.error) {
        errors.value.push({ id: data.error.code, message: data.error.message, location: data.error.location })
        disableForm.value = false
        return
      }

      disableForm.value = false
      user.value.id = data.result.id
      user.value.email = email
      user.value.username = username
      user.value.type = type
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
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (data.error) {
        errors.value.push({ id: data.error.code, message: data.error.message, location: data.error.location })
        disableForm.value = false
        return
      }

      const userInfo = data.result

      const passwordMatch = await bcrypt.compare(password, userInfo.password)
      if (!passwordMatch) {
        errors.value.push({ id: 401, message: 'Incorrect password', location: 'password' })
        disableForm.value = false
        return
      }
      user.value.id = userInfo.id
      user.value.email = userInfo.email
      user.value.username = userInfo.username
      user.value.type = userInfo.type
      user.value.events = userInfo.events
      Cookies.set('token', userInfo.token, { expires: 14 })
    } catch (error) {
      console.log(error)
    }
    disableForm.value = false
  }
}

export function logout() {
  user.value.id = ''
  user.value.email = ''
  user.value.username = ''
  user.value.type = 'anonymous'
  user.value.events = []
  Cookies.remove('token')
}
