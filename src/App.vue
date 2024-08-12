<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import Header from './components/AppHeader.vue'
import AccountComp from './components/AccountComp.vue'

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

const showAccountOverlay = ref(false)
const showSideBar = ref(true)
const mobileMode = ref(false)

const sideBarStyle = reactive({
  width: '15vw',
  height: '92vh',
  'background-color': 'white',
  // order: 2,
  zIndex: 1,
})

const calenderStyle = reactive({
  height: '92vh',
  width: '85vw',
  // order: 3,
  zIndex: 0,
})

const gridArea = reactive({
  'grid-template-columns': '15vw 85vw',
})

const animateCalender = reactive({
  animate__animated: true,
  animate__slideInLeft: false,
  animate__slideInRight: false,
  stretch_animation: false,
  shrink_animation: false,
})

const animateSideBar = reactive({
  slideIn_animation: false,
  slideOut_animation: false,
})

function changeMonth(newMonth) {
  if (newMonth > currentMonth.value) {
    animateCalender.animate__slideInRight = true
    animateCalender.animate__slideInLeft = false
  } else {
    animateCalender.animate__slideInRight = false
    animateCalender.animate__slideInLeft = true
  }

  setTimeout(() => {
    animateCalender.animate__slideInRight = false
    animateCalender.animate__slideInLeft = false
  }, 200)

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

var firstTouch = {}
var differenceX = 0
function handleCalendarTouch(e) {
  if (e.type == 'touchstart') firstTouch = e.touches[0]
  else if (e.type == 'touchmove') {
    differenceX = firstTouch.clientX - e.touches[0].clientX
    if (Math.abs(differenceX) < Math.abs(window.innerWidth / 6))
      calenderStyle.transform = `translateX(${-(firstTouch.clientX - e.touches[0].clientX)}px)`
  } else if (e.type == 'touchend') {
    differenceX = firstTouch.clientX - e.changedTouches[0].clientX
    calenderStyle.transform = 'none'
    if (differenceX > 50) {
      changeMonth(currentMonth.value + 1)
    } else if (differenceX < -50) {
      changeMonth(currentMonth.value - 1)
    }
    differenceX = 0
    firstTouch = {}
  }
}

onBeforeMount(async () => {
  try {
    const res = await fetch('http://localhost:3000/months')
    // const res = await fetch('https://calender-database.onrender.com/months')
    months.value = await res.json()
  } catch (error) {
    console.error('Server did not respond: ', error)
  }
  loadingApp.value = false
})
</script>
<template>
  <div id="container" v-if="months.length > 0" :style="gridArea">
    <div class="header">
      <Header
        v-if="months.length > 0"
        v-model:showSideBar="showSideBar"
        v-model:sideBarStyle="sideBarStyle"
        v-model:calenderStyle="calenderStyle"
        v-model:mobileMode="mobileMode"
        v-model:animateSideBar="animateSideBar"
        v-model:animateCalender="animateCalender"
        v-model:gridArea="gridArea"
        :months="months"
        :currentMonth="currentMonth"
        @changeMonth="changeMonth"
        @showAccountOverlay="showAccountOverlay = true"
      />
    </div>

    <div
      class="calender"
      :style="calenderStyle"
      :class="animateCalender"
      @touchstart="handleCalendarTouch"
      @touchmove="handleCalendarTouch"
      @touchend="handleCalendarTouch"
      @touchcancel="handleCalendarTouch"
    >
      <Calender
        v-model:months="months"
        :daySelected="daySelected"
        :currentMonth="currentMonth"
        :countries="countries"
        @changeMonth="changeMonth"
        @changeDay="changeDay"
      />
    </div>
    <div class="create-event" :style="sideBarStyle" :class="animateSideBar">
      <CreateEvent
        :months="months"
        :daySelected="daySelected"
        :currentMonth="currentMonth"
        :countries="countries"
        @changeMonth="changeMonth"
        @toggleCountry="toggleCountry"
      />
    </div>
    <div class="account-overlay" v-if="showAccountOverlay">
      <AccountComp @hideAccountOverlay="showAccountOverlay = false" />
    </div>
  </div>
  <div v-else-if="loadingApp">Loading...</div>
  <div v-else>Something went wrong</div>
</template>
<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
.animate__animated.animate__slideInLeft {
  --animate-duration: 200ms;
}
.animate__animated.animate__slideInRight {
  --animate-duration: 200ms;
}

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

#container {
  /* display: flex;
  position: relative;
  justify-content: flex-start;
  flex-wrap: wrap; */
  display: grid;
  grid-template-areas:
    'header header'
    'create-event calender';
  grid-template-rows: 8vh 92vh;
  overflow: hidden;
}

.header {
  grid-area: header;
  display: flex;
  width: 100vw;
  height: 8vh;
  /* order: 1; */
  background-color: #f0f0f0;
  justify-content: center;
  align-items: center;
}

.calender {
  grid-area: calender;
}

.create-event {
  grid-area: create-event;
}

.account-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 1001;
}

@keyframes stretchCalendar {
  0% {
    width: 85vw;
  }
  100% {
    transform: scaleX(1.176470588);
  }
}

@keyframes slideSide {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.stretch_animation {
  transform-origin: right;
  animation: 200ms linear stretchCalendar;
}
.shrink_animation {
  transform-origin: right;
  animation: 200ms linear reverse stretchCalendar;
}

.slideIn_animation {
  animation: 200ms linear slideSide;
}
.slideOut_animation {
  animation: 200ms linear reverse slideSide;
}

@media screen and (max-width: 800px) {
  #container {
    grid-template-areas: 'header' 'calender';
  }
}
</style>
