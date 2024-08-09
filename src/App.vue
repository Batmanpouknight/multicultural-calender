<script setup>
import { ref, reactive, onBeforeMount } from 'vue'

const months = ref([])

const loadingApp = ref(true)

const countries = ref([
  { id: 1, name: 'Iran', selected: true },
  { id: 2, name: 'Canada', selected: true },
  { id: 3, name: 'Ukraine', selected: true },
  { id: 4, name: 'China', selected: true },
  { id: 5, name: 'Korea', selected: true },
  { id: 6, name: 'Indigenous', selected: true },
])

const daySelected = ref(new Date().getDate())

const currentMonth = ref(new Date().getMonth())

const showSideBar = ref(true)

const sideBarStyle = reactive({
  width: '20vw',
  height: '98vh',
  order: 1,
  zIndex: 1,
})

const calenderStyle = reactive({
  height: '98vh',
  width: '80vw',
  order: 2,
  zIndex: 0,
})

function toggleSideBar() {
  if (showSideBar.value) {
    showSideBar.value = false
    sideBarStyle.width = '5vw'
    calenderStyle.width = '97vw'
  } else {
    showSideBar.value = true
    sideBarStyle.width = '20vw'
    calenderStyle.width = '80vw'
  }
}

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
  loadingApp.value = false
})
</script>
<template>
  <div id="container" v-if="months.length > 0">
    <div class="calender" :style="calenderStyle">
      <Calender
        v-model:months="months"
        :daySelected="daySelected"
        :currentMonth="currentMonth"
        :countries="countries"
        @changeMonth="changeMonth"
        @changeDay="changeDay"
      />
    </div>
    <div class="create-event" :style="sideBarStyle">
      <img
        src="./components/icons/menu.svg"
        alt="Menu Icon"
        id="menu-icon"
        @click="toggleSideBar"
      />
      <CreateEvent
        v-show="showSideBar"
        :months="months"
        :daySelected="daySelected"
        :currentMonth="currentMonth"
        :countries="countries"
        @changeMonth="changeMonth"
        @toggleCountry="toggleCountry"
      />
    </div>
  </div>
  <div v-else-if="loadingApp">Loading...</div>
  <div v-else>Something went wrong</div>
</template>
<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

#menu-icon {
  width: 40px;
  cursor: pointer;
}

#container {
  display: flex;
  justify-content: flex-start;
}
</style>
