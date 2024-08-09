<script setup>
import { computed, ref, reactive } from 'vue'

const props = defineProps(['daySelected', 'currentMonth', 'countries'])
const emit = defineEmits(['toggleCountry', 'changeMonth'])
const months = defineModel('months')
const nameError = ref(null)
const descriptionError = ref(null)
const countryError = ref(null)
const dateError = ref(null)
const sendingEvent = ref(false)
const eventResponse = reactive({ show: false, status: null, message: null })

const getMonth = computed(() => {
  return months.value[props.currentMonth]
})

function getOffSetOfMonth(month) {
  let offset = 0
  for (let i = 0; i < 7; i++) {
    if (!month.dates[i].dayIsInThisMonth) offset++
  }
  return offset - 1
}

const getCurrentDay = computed(() => {
  return getMonth.value.dates[props.daySelected + getOffSetOfMonth(getMonth.value)]
})

function handleMonthChange(event) {
  emit('changeMonth', event.target.value)
}

const getEventsForSelectedDay = computed(() => {
  let events = []
  const currentDay = getCurrentDay.value
  for (let i = 0; i < currentDay.events.length; i++) {
    if (props.countries[currentDay.events[i].country].selected) {
      events.push(currentDay.events[i])
    }
  }
  return events
})

async function addEvent(event) {
  const name = event.target['name-input'].value
  const description = event.target['descriptionInput'].value
  const country = event.target['selectCountry'].value
  const month = event.target['month-input'].value
  const dayNumber = event.target['day-input'].value
  const dayIndex = Number(dayNumber) + getOffSetOfMonth(months.value[month])
  const button = event.target.querySelector('button')
  button.disabled = true
  sendingEvent.value = true

  console.log(dayNumber, dayIndex)

  nameError.value = null
  descriptionError.value = null
  countryError.value = null
  dateError.value = null

  let error = false
  if (!name) {
    nameError.value = 'Name is required'
    error = true
  }
  if (!description) {
    descriptionError.value = 'Description is required'
    error = true
  }
  if (country == 'default') {
    countryError.value = 'Country is required'
    error = true
  }
  if (!(month >= 0 && month <= 11)) {
    dateError.value = 'Invalid month'
    error = true
  }

  if (dayNumber > months.value[month].days || dayNumber < 0) {
    dateError.value = 'Invalid day'
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
    const id = await fetch('https://calender-database.onrender.com/api/addevent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        country,
        month,
        dayIndex,
      }),
    })
    button.disabled = false
    sendingEvent.value = false
    eventResponse.show = true
    eventResponse.status = true
    eventResponse.message = 'Success!'

    months.value[month].dates[dayIndex].events.push({
      id: id,
      name,
      description,
      country,
    })
  } catch (error) {
    console.error(error)
    eventResponse.show = true
    eventResponse.status = false
    eventResponse.message = 'Something went wrong. Please try again later.'
    button.disabled = false
    sendingEvent.value = false
  }
}
</script>

<template>
  <div class="container">
    <div v-show="getCurrentDay.events.length > 0" class="events">
      Events:
      <ul>
        <li v-for="event in getEventsForSelectedDay" :key="event.id">{{ event.name }}</li>
      </ul>
    </div>
    <div class="countries">
      Countries:
      <div v-for="country in countries" :key="country.id" class="country" style="width: fit-content" @click="emit('toggleCountry', country.id)">
        <input type="checkbox" :name="country.name" :value="country.name" :checked="country.selected" />
        <label :for="country.name">
          {{ country.name }}
        </label>
      </div>
    </div>

    <div class="changeMonth">
      <select name="month" id="month" @change="handleMonthChange">
        <option v-for="(month, index) in months" :key="index" :value="index" :selected="index == props.currentMonth">
          {{ month.name }}
        </option>
      </select>
      <br />
      <br />
      <button @click="$emit('changeMonth', new Date().getMonth())">Go to current month</button>
    </div>

    <div class="new-event">
      <form @submit.prevent="addEvent">
        <label for="name-input">Name: </label>
        <input type="text" class="name-input" name="name-input" @change="nameError = null" />
        <div v-if="nameError" class="error">{{ nameError }}</div>
        <br /><br />

        <input type="number" name="day-input" class="day-input" :value="daySelected" />/
        <select name="month-input" class="month-input">
          <option v-for="(month, index) in months" :key="index" :value="index" :selected="index == props.currentMonth">
            {{ month.name }}
          </option>
        </select>
        <div v-if="dateError" class="error">{{ dateError }}</div>

        <br /><br />

        <label for="descriptionInput">Description: </label>
        <textarea name="descriptionInput" id="descriptionInput" @change="descriptionError = null"></textarea>
        <div v-if="descriptionError" class="error">{{ descriptionError }}</div>

        <br /><br />

        <label for="selectCountry">Select Country: </label>
        <select name="selectCountry" id="selectCountry" @change="countryError = null">
          <option value="default" selected disabled>Choose an option</option>
          <option v-for="(country, index) in countries" :key="index" :value="index">
            {{ country.name }}
          </option>
        </select>
        <div v-if="countryError" class="error">{{ countryError }}</div>

        <br /><br />

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
  background-color: red;
  color: white;
}

.success {
  width: fit-content;
  margin-top: 5px;
  background-color: green;
  color: white;
}

.day-input {
  width: 35px;
}

.month-input {
  width: 85px;
  font-size: 12px;
}

#submit-event {
  background-color: #4caf50;
  color: white;
  height: 40px;
  width: 100px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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

.spinner {
  animation: rotator 1.4s linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation:
    dash 1.4s ease-in-out infinite,
    colors 5.6s ease-in-out infinite;
}

@keyframes colors {
  0% {
    stroke: #4285f4;
  }
  25% {
    stroke: #de3e35;
  }
  50% {
    stroke: #f7c223;
  }
  75% {
    stroke: #1b9a59;
  }
  100% {
    stroke: #4285f4;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
}
</style>
