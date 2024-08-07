<script setup>
import { computed, ref } from 'vue'

const props = defineProps(['daySelected', 'currentMonth', 'countries'])
const emit = defineEmits(['toggleCountry', 'changeMonth'])
const months = defineModel('months')
const nameError = ref(null)
const descriptionError = ref(null)
const countryError = ref(null)
const dateError = ref(null)

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
    button.disabled = false
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

    months.value[month].dates[dayIndex].events.push({
      id: id,
      name,
      description,
      country,
    })
  } catch (error) {
    console.error(error)
    button.disabled = false
  }
}
</script>

<template>
  <div class="container">
    <div class="dateInfo">
      <div>Date: {{ getMonth.name }} {{ daySelected }}</div>
      <div v-show="getCurrentDay.events.length > 0" class="events">
        Events:
        <ul>
          <li v-for="event in getEventsForSelectedDay" :key="event.id">{{ event.name }}</li>
        </ul>
      </div>
    </div>
    <div class="countries">
      Countries:
      <div
        v-for="country in countries"
        :key="country.id"
        @click="emit('toggleCountry', country.id)"
      >
        <input
          type="checkbox"
          :name="country.name"
          :value="country.name"
          :checked="country.selected"
        />
        <label :for="country.name">
          {{ country.name }}
        </label>
      </div>
    </div>

    <div class="changeMonth">
      <select name="month" id="month" @change="handleMonthChange">
        <option
          v-for="(month, index) in months"
          :key="index"
          :value="index"
          :selected="index == props.currentMonth"
        >
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
        <input type="text" class="name-input" name="name-input" />
        <span v-if="nameError" class="error">{{ nameError }}</span>
        <br /><br />

        <input type="number" name="day-input" class="day-input" :value="daySelected" />/
        <select name="month-input" class="month-input">
          <option
            v-for="(month, index) in months"
            :key="index"
            :value="index"
            :selected="index == props.currentMonth"
          >
            {{ month.name }}
          </option>
        </select>
        <span v-if="dateError" class="error">{{ dateError }}</span>

        <br /><br />

        <label for="descriptionInput">Description: </label>
        <textarea name="descriptionInput" id="descriptionInput"></textarea>
        <span v-if="descriptionError" class="error">{{ descriptionError }}</span>

        <br /><br />

        <label for="selectCountry">Select Country: </label>
        <select name="selectCountry" id="selectCountry">
          <option value="default" selected disabled>Choose an option</option>
          <option v-for="(country, index) in countries" :key="index" :value="index">
            {{ country.name }}
          </option>
        </select>
        <span v-if="countryError" class="error">{{ countryError }}</span>

        <br /><br />

        <button type="submit">Add Event</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.text-input {
  width: 70%;
}

.container > * {
  margin-top: 20px;
}

input[type='checkbox'].custom-checkbox {
  pointer-events: none;
}

.error {
  color: red;
}

.day-input {
  width: 35px;
}

.month-input {
  width: 85px;
  font-size: 12px;
}
</style>
