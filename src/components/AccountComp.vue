<script setup>
import { ref, reactive } from 'vue'
import Joi from 'joi'
import bcrypt from 'bcryptjs'
import Cookies from 'js-cookie'

const user = defineModel('user')

const emit = defineEmits(['hideAccountOverlay'])

const formValues = reactive({
  email: '',
  password: '',
  username: '',
  'confirm-password': '',
})

const showInfo = ref('signup')
const errors = ref([])
const disableForm = ref(false)

function updateFormValues(e) {
  formValues[e.target.name] = e.target.value
}

function updateCookie() {
  Cookies.set('id', user.value.id, { expires: 14 })
  Cookies.set('email', user.value.email, { expires: 14 })
  Cookies.set('username', user.value.username, { expires: 14 })
  Cookies.set('type', user.value.type, { expires: 14 })
}

async function signupSubmit() {
  disableForm.value = true
  const email = formValues.email
  const username = formValues.username
  const password = formValues.password
  const confirmPassword = formValues['confirm-password']
  const type = 'user'
  errors.value = []
  if (password !== confirmPassword) {
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
    console.log(error.details)
    for (let i = 0; i < error.details.length; i++) {
      errors.value.push({ id: i + 2, message: error.details[i].message, location: error.details[i].context.key })
    }
    disableForm.value = false
  }

  const hashedPassword = await bcrypt.hash(password, 15)

  if (errors.value.length === 0) {
    console.log('no errors')
    try {
      const response = await fetch('https://calender-database.onrender.com/users/signup', {
        // const response = await fetch('http://localhost:3000/users/signup', {
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
      updateCookie()

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
}

async function loginSubmit() {
  disableForm.value = true
  const email = formValues.email
  const password = formValues.password
  errors.value = []
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: ['com', 'ca', 'net'] } })
      .required(),
    password: Joi.string().min(6).max(12).required(),
  })
  const { error } = schema.validate({ email, password }, { abortEarly: false })
  if (error) {
    console.log(error.details)
    for (let i = 0; i < error.details.length; i++) {
      errors.value.push({ id: i + 2, message: error.details[i].message, location: error.details[i].context.key })
    }
    disableForm.value = false
  }
  if (errors.value.length == 0) {
    try {
      const response = await fetch('https://calender-database.onrender.com/users/login', {
        // const response = await fetch('http://localhost:3000/users/login', {
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
      updateCookie()
      disableForm.value = false
    } catch (error) {
      disableForm.value = false
      console.log(error)
    }
  }
}

function logout() {
  user.value.id = ''
  user.value.email = ''
  user.value.username = ''
  user.value.type = 'anonymous'
  Cookies.remove('id')
  Cookies.remove('email')
  Cookies.remove('username')
  Cookies.remove('type')
}
</script>
<template>
  <div id="account-container">
    <div id="account-card">
      <div id="close-button" @click="emit('hideAccountOverlay')">X</div>
      <div id="account-header">
        <h1>Account Page</h1>
        <h3>LOGO</h3>
      </div>
      <div id="user-info" v-if="user.type != 'anonymous'">
        <h2>Welcome, {{ user.username }}</h2>
        Idk add some more stuff here
        <button @click="logout">Log Out</button>
      </div>
      <div id="signup" v-else-if="showInfo == 'signup'">
        <h2 style="text-align: center">Sign Up</h2>
        <form class="info-form" @submit.prevent="signupSubmit" novalidate>
          <div>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" :value="formValues.email" @change="updateFormValues" :disabled="disableForm" />
          </div>
          <div>
            <label for="username">Username</label>
            <input type="text" id="username" name="username" :value="formValues.username" @change="updateFormValues" :disabled="disableForm" />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" :value="formValues.password" @change="updateFormValues" :disabled="disableForm" />
          </div>
          <div>
            <label for="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              :value="formValues['confirm-password']"
              @change="updateFormValues"
              :disabled="disableForm"
            />
          </div>
          <button class="submit-button" type="submit" :disabled="disableForm">Sign Up</button>
          <button class="change-form-button" type="button" @click="showInfo = 'login'" :disabled="disableForm">Log In</button>
          <div class="errors" v-for="error in errors" :key="error.id">{{ error.message }}</div>
        </form>
      </div>
      <div id="login" v-else-if="showInfo == 'login'" novalidate>
        <h2 style="text-align: center">Login</h2>
        <form class="info-form" @submit.prevent="loginSubmit">
          <div>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" :value="formValues.email" @change="updateFormValues" :disabled="disableForm" />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" :value="formValues.password" @change="updateFormValues" :disabled="disableForm" />
          </div>
          <button class="submit-button" type="submit" :disabled="disableForm">Login</button>
          <button class="change-form-button" type="button" @click="showInfo = 'signup'" :disabled="disableForm">Sign Up</button>
          <div class="errors" v-for="error in errors" :key="error.id">{{ error.message }}</div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
#account-container {
  height: 100vh;
}

#account-card {
  background-color: lightgray;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 30px;
  height: 90%;
  width: 30%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#close-button {
  position: absolute;
  top: 0;
  left: 1%;
  cursor: pointer;
}

#close-button:hover {
  color: red;
}

#account-header {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

#signup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  width: 100%;
}

form > div {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
}
input {
  width: 100%;
  height: 30px;
  font-size: 20px;
}

button {
  margin: 10px 0;
  width: 100%;
  padding: 10px;
  background-color: #3f3fff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #3f3f7f;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>
