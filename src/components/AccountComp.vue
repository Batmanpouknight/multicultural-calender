<script setup>
import { ref } from 'vue'

const emit = defineEmits(['hideAccountOverlay'])

const showInfo = ref('signup')
</script>
<template>
  <div id="account-container">
    <div id="account-card">
      <div id="close-button" @click="emit('hideAccountOverlay')">X</div>
      <div id="account-header">
        <h1>Account Page</h1>
        <h3>LOGO</h3>
      </div>
      <div id="signup" v-if="showInfo == 'signup'">
        <h2 style="text-align: center">Sign Up</h2>
        <form class="info-form">
          <div><label for="email">Email</label> <input type="email" id="email" name="email" /></div>
          <div><label for="password">Password</label> <input type="password" id="password" name="password" /></div>
          <div><label for="confirm-password">Confirm Password</label> <input type="password" id="confirm-password" name="confirm-password" /></div>
          <button type="submit">Sign Up</button>
          <button type="button" @click="showInfo = 'login'">Login</button>
        </form>
      </div>
      <div id="login" v-else-if="showInfo == 'login'">
        <h2 style="text-align: center">Login</h2>
        <form class="info-form">
          <div><label for="email">Email</label> <input type="email" id="email" name="email" /></div>
          <div><label for="password">Password</label> <input type="password" id="password" name="password" /></div>
          <button type="submit">Login</button>
          <button type="button" @click="showInfo = 'signup'">Sign Up</button>
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
</style>
