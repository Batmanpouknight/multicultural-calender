<script setup>
import { ref, reactive } from 'vue'

const props = defineProps(['daySelected', 'currentMonth', 'countries', 'loggedIn', 'user'])
const emit = defineEmits(['toggleCountry'])
const months = defineModel('months')
const events = defineModel('events')

const errors = reactive({
  name: null,
  description: null,
  country: null,
  date: null,
})

const sendingEvent = ref(false)
const eventResponse = reactive({ show: false, status: null, message: null })

function getOffSetOfMonth(month) {
  let offset = 0
  for (let i = 0; i < 7; i++) {
    if (!month.dates[i].dayIsInThisMonth) offset++
  }
  return offset - 1
}

async function addEvent(event) {
  const name = event.target['name-input'].value
  const description = event.target['descriptionInput'].value
  const country = Number(event.target['selectCountry'].value)
  const month = Number(event.target['month-input'].value)
  const dayNumber = Number(event.target['day-input'].value)
  const dayIndex = Number(dayNumber) + getOffSetOfMonth(months.value[month])
  const button = event.target.querySelector('button')
  const userId = props.user.id
  button.disabled = true
  sendingEvent.value = true

  console.log(dayNumber, dayIndex)

  errors.name = null
  errors.description = null
  errors.country = null
  errors.date = null

  let error = false
  if (!name) {
    errors.name = 'Name is required'
    error = true
  }
  if (!description) {
    errors.description = 'Description is required'
    error = true
  }
  if (country == 'default') {
    errors.country = 'Country is required'
    error = true
  }
  if (!(month >= 0 && month <= 11)) {
    errors.date = 'Invalid month'
    error = true
  }

  if (dayNumber > months.value[month].days || dayNumber < 0) {
    errors.date = 'Invalid day'
    error = true
  }
  if (!userId) {
    errors.name = 'You must be logged in to add an event'
    error = true
  }

  if (error) {
    eventResponse.show = true
    eventResponse.status = false
    eventResponse.message = 'Some fields are invalid'
    button.disabled = false
    sendingEvent.value = false
    return
  }

  try {
    // const response = await fetch('http://localhost:3000/api/addevent', {
    const response = await fetch('https://calender-database.onrender.com/api/addevent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        country,
        month,
        dayNumber,
        dayIndex,
        userId,
      }),
    })

    eventResponse.status = true
    eventResponse.message = 'Success!'
    const id = await response.text()

    events.value.push({ _id: id, name, description, country, month, dayNumber, dayIndex })
    months.value[month].dates[dayIndex].events.push(id)

    event.target['name-input'].value = ''
    event.target['descriptionInput'].value = ''
    event.target['selectCountry'].value = 'default'
  } catch (error) {
    console.error(error)
    eventResponse.status = false
    eventResponse.message = 'Something went wrong. Please try again later.'
  }
  button.disabled = false
  sendingEvent.value = false
  eventResponse.show = true
}
</script>

<template>
  <div class="container">
    <div class="countries">
      Countries:
      <div v-for="country in countries" :key="country.id" class="country" style="width: fit-content" @click="emit('toggleCountry', country.id)">
        <input type="checkbox" :name="country.name" :value="country.name" :checked="country.selected" />
        <label :for="country.name">
          {{ country.name }}
        </label>
      </div>
    </div>

    <div class="new-event" v-if="loggedIn">
      <form @submit.prevent="addEvent">
        <div style="margin-top: 0">
          <label for="name-input">Name: </label>
          <input type="text" class="name-input" name="name-input" @change="errors.name = null" />
          <div v-if="errors.name" class="error">{{ errors.name }}</div>
        </div>

        <div>
          <div>
            <input type="number" name="day-input" class="day-input" :value="daySelected" />/
            <select name="month-input" class="month-input">
              <option v-for="(month, index) in months" :key="index" :value="index" :selected="index == props.currentMonth">
                {{ month.name }}
              </option>
            </select>
          </div>

          <div v-if="errors.date" class="error">{{ errors.date }}</div>
        </div>

        <div>
          <label for="descriptionInput">Description: </label>
          <textarea name="descriptionInput" id="descriptionInput" @change="errors.description = null"></textarea>
          <div v-if="errors.description" class="error">{{ errors.description }}</div>
        </div>

        <div>
          <label for="selectCountry">Select Country: </label>
          <select name="selectCountry" id="selectCountry" @change="errors.country = null">
            <option value="default" selected disabled>Choose an option</option>
            <option v-for="(country, index) in countries" :key="index" :value="index">
              {{ country.name }}
            </option>
          </select>
          <div v-if="errors.country" class="error">{{ errors.country }}</div>
        </div>

        <button type="submit" id="submit-event">Add Event</button>
        <svg v-if="sendingEvent" class="spinner" width="30px" height="30px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg
        ><br />
        <div id="event-result" :class="{ error: !eventResponse.status, success: eventResponse.status }" v-if="eventResponse.show">
          {{ eventResponse.message }}
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container > * {
  margin-top: 20px;
}

input[type='checkbox'].custom-checkbox {
  pointer-events: none;
}

.error {
  width: fit-content;
  margin-top: 5px;
  color: red;
}

.success {
  width: fit-content;
  margin-top: 5px;
  color: green;
}

form > div {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

form > u {
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
}

.day-input {
  width: 35px;
}

.month-input {
  width: 85px;
  font-size: 12px;
}

#selectCountry {
  width: fit-content;
}

#submit-event {
  background-color: #4caf50;
  color: white;
  height: 40px;
  width: 100px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

#submit-event:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

#submit-event:hover {
  background-color: green;
}

select {
  background-color: rgba(0, 0, 0, 0.22);
  border: none;
}
</style>
