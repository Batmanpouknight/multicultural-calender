<script setup>
import { computed } from 'vue'

const props = defineProps(['months', 'daySelected', 'currentMonth', 'countries'])
const emit = defineEmits(['toggleCountry'])

const getMonth = computed(() => props.months[props.currentMonth])

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
  console.log(currentDay)
  for (let i = 0; i < currentDay.events.length; i++) {
    if (props.countries[currentDay.events[i].country].selected) {
      events.push(currentDay.events[i])
    }
  }
  return events
})
</script>

<template>
  <div class="dateInfo">
    <div>Date: {{ months[currentMonth].name }} {{ daySelected }}</div>
    <div v-show="getEventsForSelectedDay.length > 0">
      Events:
      <ul>
        <li v-for="event in getEventsForSelectedDay" :key="event.id">{{ event.name }}</li>
      </ul>
    </div>
  </div>
  <div class="countries">
    Countries:
    <div v-for="country in countries" :key="country.id" @click="emit('toggleCountry', country.id)">
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

  <!-- <form>
    <label for="name-input">Name: </label>
    <input type="text" class="name-input" name="name-input"/>
    <br><br>
    <label for="descriptionInput">Description: </label>
    <input type="text" class="descriptionInput" name="descriptionInput">

    <button type="submit">Add Event</button>
  </form> -->
</template>

<style scoped>
.text-input {
  width: 70%;
}
input[type='checkbox'].custom-checkbox {
  pointer-events: none;
}
</style>
