<script setup>
import { ref, reactive } from 'vue'
import Joi from 'joi'

const props = defineProps(['daySelected', 'currentMonth', 'countries', 'loggedIn', 'user'])
const emit = defineEmits(['toggleCountry'])
const months = defineModel('months')
const events = defineModel('events')

const errors = reactive({
  name: null,
  description: null,
  country: null,
  date: null,
  holiday: null,
  source: null,
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
  const name = event.target['name'].value
  const description = event.target['description'].value
  const country = Number(event.target['country'].value)
  const month = Number(event.target['month'].value)
  const dayNumber = Number(event.target['day'].value)
  const holiday = event.target['holiday'].value
  const source = event.target['source'].value
  const dayIndex = Number(dayNumber) + getOffSetOfMonth(months.value[month])
  const button = event.target.querySelector('button')
  const userId = props.user.id
  button.disabled = true
  sendingEvent.value = true

  errors.name = null
  errors.description = null
  errors.country = null
  errors.date = null
  errors.holiday = null
  errors.source = null

  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().max(150).required(),
    country: Joi.number().min(0).max(5).required(),
    month: Joi.number().min(0).max(11).required(),
    dayNumber: Joi.number().min(0).max(30).required(),
    holiday: Joi.bool().required(),
    source: Joi.string().allow('').uri().optional(),
    userId: Joi.string().required(),
  })

  const { error } = schema.validate({ name, description, country, month, dayNumber, holiday, source, userId }, { abortEarly: false })

  if (error) {
    console.log(error.details)
    eventResponse.show = true
    eventResponse.status = false
    eventResponse.message = 'Some fields are invalid'
    button.disabled = false
    sendingEvent.value = false

    error.details.forEach((detail) => {
      errors[detail.context.key] = detail.message
    })
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
        holiday: holiday === 'true',
        source,
        userId,
      }),
    })

    eventResponse.status = true
    eventResponse.message = 'Success!'
    const _id = await response.text()

    events.value.push({ _id, name, description, country, month, dayNumber, dayIndex, holiday: holiday == 'true', source, userId })
    months.value[month].dates[dayIndex].events.push(_id)

    event.target['name'].value = ''
    event.target['description'].value = ''
    event.target['country'].value = 'default'
    event.target['source'].value = ''
    event.target['holiday'].value = 'default'
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
    <div id="countries">
      Countries:
      <div v-for="country in countries" :key="country.id" class="country" @click="emit('toggleCountry', country.id)">
        <input type="checkbox" :name="country.name" :value="country.name" :checked="country.selected" />
        <label :for="country.name">
          {{ country.name }}
        </label>
      </div>
    </div>

    <div class="new-event" v-if="loggedIn">
      <form @submit.prevent="addEvent">
        <div style="margin-top: 0">
          <label for="name">Name: </label>
          <input type="text" class="name" name="name" @change="errors.name = null" />
          <div v-if="errors.name" class="error">{{ errors.name }}</div>
        </div>

        <div>
          <div>
            <input type="number" name="day" class="day" :value="daySelected" />/
            <select name="month" class="month">
              <option v-for="(month, index) in months" :key="index" :value="index" :selected="index == props.currentMonth">
                {{ month.name }}
              </option>
            </select>
          </div>

          <div v-if="errors.date" class="error">{{ errors.date }}</div>
        </div>

        <div>
          <label for="description">Description: </label>
          <textarea name="description" id="description" @change="errors.description = null"></textarea>
          <div v-if="errors.description" class="error">{{ errors.description }}</div>
        </div>

        <div>
          <label for="country">Select Country: </label>
          <select name="country" id="country" @change="errors.country = null">
            <option value="default" selected disabled>Choose an option</option>
            <option v-for="(country, index) in countries" :key="index" :value="index">
              {{ country.name }}
            </option>
          </select>
          <div v-if="errors.country" class="error">{{ errors.country }}</div>
        </div>

        <div>
          <label for="holiday">Is this day a holiday in that country?</label>
          <select name="holiday" id="holiday">
            <option value="default" selected disabled>Choose an option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <div v-if="errors.holiday" class="error">{{ errors.holiday }}</div>
        </div>

        <div>
          <label for="source">Source(Optional): </label>
          <input type="url" name="source" id="source" />
          <div v-if="errors.source" class="error">{{ errors.source }}</div>
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

.country {
  margin-left: 10px;
  cursor: pointer;
  user-select: none;
  width: fit-content;
}

.country:hover {
  animation: grow 0.5s forwards;
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

.day {
  width: 35px;
}

.month {
  width: 85px;
  font-size: 12px;
}

#country {
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
  width: fit-content;
}

@keyframes grow {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.25);
  }
}
</style>
