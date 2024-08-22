<script setup>
import { reactive, ref } from 'vue'
import Joi from 'joi'

const props = defineProps({
  countries: { type: Array, required: true },
  eventToEdit: { type: Object, required: true },
})
const emit = defineEmits(['hideEditEvent'])

const events = defineModel('events', { required: true, type: Array })
const months = defineModel('months', { required: true, type: Array })

const sendingEvent = ref(false)
const eventResponse = reactive({ show: false, status: null, message: null })
const errors = reactive({
  name: null,
  description: null,
  country: null,
  date: null,
  holiday: null,
  source: null,
})

function getOffSetOfMonth(month) {
  let offset = 0
  for (let i = 0; i < 7; i++) {
    if (!month.dates[i].dayIsInThisMonth) offset++
  }
  return offset - 1
}

async function submitEdit(e) {
  const name = e.target['name-input'].value
  const description = e.target['details-input'].value
  const month = Number(e.target['month'].value)
  const dayNumber = Number(e.target['day'].value)
  const dayIndex = Number(dayNumber) + getOffSetOfMonth(months.value[month])
  const country = Number(e.target['country'].value)
  const holiday = e.target['holiday'].value
  const source = e.target['source'].value
  const userId = props.eventToEdit.userId
  const _id = props.eventToEdit._id
  const buttons = e.target.querySelectorAll('button')

  sendingEvent.value = true
  buttons.forEach((button) => (button.disabled = true))

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
    buttons.forEach((button) => (button.disabled = false))
    sendingEvent.value = false

    error.details.forEach((detail) => {
      errors[detail.context.key] = detail.message
    })
    return
  }

  try {
    const res = await fetch('https://calender-database.onrender.com/api/updateevent', {
      // const res = await fetch(`http://localhost:3000/api/updateevent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id,
        name,
        description,
        dayNumber,
        dayIndex,
        month,
        country,
        holiday: holiday == 'true',
        source,
        userId,
      }),
    })
  } catch (err) {
    console.log(err)
  } finally {
    emit('hideEditEvent')
    buttons.forEach((button) => (button.disabled = false))
    sendingEvent.value = false

    const indexOfEvent = events.value.indexOf(props.eventToEdit)
    events.value[indexOfEvent] = {
      _id,
      name,
      description,
      dayNumber,
      dayIndex,
      month,
      country,
      holiday: holiday == 'true',
      source,
      userId,
    }
    const monthBefore = props.eventToEdit.month
    const dayIndexBefore = props.eventToEdit.dayIndex
    const eventsBefore = months.value[monthBefore].dates[dayIndexBefore].events
    const eventsAfter = months.value[month].dates[dayIndex].events
    if (!(monthBefore === month && dayIndexBefore === dayIndex)) {
      eventsBefore.splice(eventsBefore.indexOf(props.eventToEdit), 1)
      console.log(eventsBefore)
      eventsAfter.push(_id)
    }
  }
}
</script>
<template>
  <div id="edit-event-container" @click.self="emit('hideEditEvent')">
    <div id="edit-event-card">
      <div>
        <form @submit.prevent="submitEdit">
          <div>
            <label for="name-input">Name</label> <input type="text" name="name-input" id="name-input" :value="eventToEdit.name" />
            <div v-if="errors.name" class="error">{{ errors.name }}</div>
          </div>
          <div>
            <label for="details-input">Details</label><textarea name="details-input" id="details-input" :value="eventToEdit.description"></textarea>
            <div v-if="errors.description" class="error">{{ errors.description }}</div>
          </div>
          <div id="class-inputs">
            <input type="number" name="day" class="day" :value="eventToEdit.dayNumber" />/
            <select name="month" class="month">
              <option v-for="(month, index) in months" :key="index" :value="index" :selected="index == eventToEdit.month">
                {{ month.name }}
              </option>
            </select>
            <div v-if="errors.date" class="error">{{ errors.date }}</div>
          </div>
          <div>
            <label for="country">Select Country: </label>
            <select name="country" id="country" @change="errors.country = null">
              <option v-for="(country, index) in countries" :key="index" :value="index" :selected="index == eventToEdit.country">
                {{ country.name }}
              </option>
            </select>
            <div v-if="errors.country" class="error">{{ errors.country }}</div>
          </div>
          <div>
            <label for="holiday">Is this day a holiday in that country?</label>
            <select name="holiday" id="holiday">
              <option value="true" :selected="eventToEdit.holiday == true">Yes</option>
              <option value="false" :selected="eventToEdit.holiday == false">No</option>
            </select>
            <div v-if="errors.holiday" class="error">{{ errors.holiday }}</div>
          </div>

          <div>
            <label for="source">Source(Optional): </label>
            <input type="url" name="source" id="source" :value="eventToEdit.source" />
            <div v-if="errors.source" class="error">{{ errors.source }}</div>
          </div>
          <div id="buttons"><button type="submit">Save</button> <button @click.prevent="emit('hideEditEvent')">Cancel</button></div>
          <svg v-if="sendingEvent" class="spinner" width="30px" height="30px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg
          ><br />
          <div id="event-result" :class="{ error: !eventResponse.status, success: eventResponse.status }" v-if="eventResponse.show">
            {{ eventResponse.message }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
#edit-event-container {
  height: 100vh;
  width: 100vw;
}

#edit-event-card {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 50%;
  height: fit-content;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

form {
  display: flex;
  flex-direction: column;
}

form #name-input {
  width: 50%;
}

form > div {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
}

form > #class-inputs {
  display: flex;
  flex-direction: row;
}

form > #class-inputs > input {
  width: 50px;
  margin-right: 5px;
}

form > div#buttons {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

form > div#buttons > button {
  width: 100px;
  height: 30px;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  border: none;
}

label {
  font-size: 1.2em;
  margin-bottom: 5px;
}

textarea {
  height: 100px;
}
</style>
