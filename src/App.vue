<script setup>
import { ref, onBeforeMount } from 'vue'

const months = ref([])

const loading = ref(true)

const countries = ref([
  { id: 1, name: 'Iran', selected: true },
  { id: 2, name: 'Canada', selected: true },
  { id: 3, name: 'Ukraine', selected: true },
  { id: 4, name: 'China', selected: true },
  { id: 5, name: 'Korea', selected: true },
  { id: 5, name: 'Indigenous', selected: true },
])

const daySelected = ref(new Date().getDate())

const currentMonth = ref(new Date().getMonth())

function changeMonth(newMonth) {
  if (newMonth < 0) newMonth = 11
  else if (newMonth > 11) newMonth = 0
  currentMonth.value = newMonth

  if (newMonth == new Date().getMonth()) daySelected.value = new Date().getDate()
  else daySelected.value = 1
}

function changeDay(day) {
  if (day.dayIsInThisMonth) daySelected.value = day.number
}

function toggleCountry(id) {
  const country = countries.value.find((country) => country.id === id)
  country.selected = !country.selected
}

onBeforeMount(async () => {
  try {
    // const res = await fetch('http://localhost:3000/months')
    const res = await fetch('https://calender-database.onrender.com/months')
    months.value = await res.json()
  } catch (error) {
    console.error('Server did not respond: ', error)
  }
  loading.value = false
})
</script>
<template>
  <div id="container" v-if="months.length > 0">
    <div class="calender">
      <Calender
        v-model:months="months"
        :daySelected="daySelected"
        :currentMonth="currentMonth"
        :countries="countries"
        @changeMonth="changeMonth"
        @changeDay="changeDay"
      />
    </div>
    <div class="create-event">
      <CreateEvent
        :months="months"
        :daySelected="daySelected"
        :currentMonth="currentMonth"
        :countries="countries"
        @changeMonth="changeMonth"
        @toggleCountry="toggleCountry"
      />
    </div>
  </div>
  <div v-else-if="loading">Loading...</div>
  <div v-else>Something went wrong</div>
</template>
<style>
#container {
  display: flex;
  justify-content: flex-start;
}

.create-event {
  width: 20vw;
  height: 90vh;
  order: 1;
}
.calender {
  height: 90vh;
  width: 80vw;
  order: 2;
}
</style>
