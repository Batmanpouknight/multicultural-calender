<script setup>
import { computed } from 'vue'

const props = defineProps(['months', 'daySelected', 'currentMonth', 'countries'])
const emit = defineEmits(['toggleCountry', 'changeMonth'])

const getMonth = computed(() => {
  return props.months[props.currentMonth]
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
      <select name="month" id="month">
        <option
          v-for="(month, index) in months"
          :key="index"
          :value="index"
          :selected="index == props.currentMonth"
          @click="$emit('changeMonth', index)"
        >
          {{ month.name }}
        </option>
      </select>
      <br />
      <br />
      <button @click="$emit('changeMonth', new Date().getMonth())">Go to current month</button>
    </div>

    <div class="new-event">
      <form>
        <label for="name-input">Name: </label>
        <input type="text" class="name-input" name="name-input" />
        <br /><br />
        <label for="descriptionInput">Description: </label>
        <textarea name="descriptionInput" id="descriptionInput"></textarea>
        <!-- <input type="text" class="descriptionInput" name="descriptionInput" /> -->
        <br /><br />
        <select name="selectCountry" id="selectCountry">
          <option value="default" selected disabled>Choose an option</option>
          <option v-for="(country, index) in countries" :key="index" :value="index">
            {{ country.name }}
          </option>
        </select>
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
</style>
