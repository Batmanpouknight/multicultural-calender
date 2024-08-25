<script setup>
import { ref } from 'vue'
import { formValues, updateFormValues, disableForm } from '../utils/formValues'
import { signupSubmit, loginSubmit, logout } from '../utils/auth'

const user = defineModel('user')
const events = defineModel('events')

const emit = defineEmits(['hideAccountOverlay'])

const showInfo = ref('signup')

function getEventsForUser() {
  let userEvents = []
  if (!user.value.events) return userEvents
  for (let i = 0; i < user.value.events.length; i++) {
    const event = events.value.find((event) => event._id === user.value.events[i])
    if (event) userEvents.push(event)
  }
  return userEvents
}
</script>
<template>
  <div id="account-container" @click.self="emit('hideAccountOverlay')">
    <div id="account-card">
      <div id="close-button" @click="emit('hideAccountOverlay')">X</div>
      <div id="account-header">
        <h1>Account Page</h1>
        <h3>LOGO</h3>
      </div>
      <div id="user-info" v-if="user.type != 'anonymous'">
        <h2>Welcome, {{ user.username }}</h2>
        <div id="user-events">
          <h3>Your Events:</h3>
          <div v-for="event in getEventsForUser()" :key="event._id">{{ event.name }}</div>
        </div>
        <button @click="logout">Log Out</button>
      </div>
      <div id="signup" v-else-if="showInfo == 'signup'">
        <h2 style="text-align: center">Sign Up</h2>
        <form class="info-form" @submit.prevent="signupSubmit" novalidate>
          <div id="email">
            <label for="email">Email</label>
            <input type="email" id="email-input" name="email" :value="formValues.email" @change="updateFormValues" :disabled="disableForm" />
          </div>
          <div id="username">
            <label for="username">Username</label>
            <input type="text" id="username-input" name="username" :value="formValues.username" @change="updateFormValues" :disabled="disableForm" />
          </div>
          <div id="password">
            <label for="password">Password</label>
            <input
              type="password"
              id="password-input"
              name="password"
              :value="formValues.password"
              @change="updateFormValues"
              :disabled="disableForm" />
          </div>
          <div id="confirm_password">
            <label for="confirm_password">Confirm Password</label>
            <input
              type="password"
              id="confirm_password-input"
              name="confirm_password"
              :value="formValues.confirm_password"
              @change="updateFormValues"
              :disabled="disableForm" />
          </div>
          <button class="submit-button" type="submit" :disabled="disableForm">Sign Up</button>
          <button class="change-form-button" type="button" @click="showInfo = 'login'" :disabled="disableForm">Log In</button>
          <!-- <div class="errors" v-for="error in errors" :key="error.id">{{ error.message }}</div> -->
        </form>
      </div>
      <div id="login" v-else-if="showInfo == 'login'" novalidate>
        <h2 style="text-align: center">Login</h2>
        <form class="info-form" @submit.prevent="loginSubmit">
          <div id="email">
            <label for="email">Email</label>
            <input type="email" id="email-input" name="email" :value="formValues.email" @change="updateFormValues" :disabled="disableForm" />
          </div>
          <div id="password">
            <label for="password">Password</label>
            <input
              type="password"
              id="password-input"
              name="password"
              :value="formValues.password"
              @change="updateFormValues"
              :disabled="disableForm" />
          </div>
          <button class="submit-button" type="submit" :disabled="disableForm">Login</button>
          <button class="change-form-button" type="button" @click="showInfo = 'signup'" :disabled="disableForm">Sign Up</button>
          <!-- <div class="errors" v-for="error in errors" :key="error.id">{{ error.message }}</div> -->
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
  height: 95%;
  width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
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

#user-events {
  margin: 10px 0;
}

#user-events > * {
  margin: 5px 0;
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

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}

@media screen and (max-width: 450px) {
  #account-card {
    width: 90%;
  }
}
</style>
