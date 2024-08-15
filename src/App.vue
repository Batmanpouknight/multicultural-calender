<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import Header from './components/AppHeader.vue'
import AccountComp from './components/AccountComp.vue'
import Cookies from 'js-cookie'

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

const user = reactive({
  id: '',
  username: '',
  email: '',
  type: 'anonymous',
})

const loggedIn = computed(() => user.id !== '')

const showAccountOverlay = ref(false)
const tempShowSideBar = ref(false)
const showSideBar = ref(window.innerWidth > 800)
const mobileMode = ref(window.innerWidth < 800)

const calenderStyle = reactive({})

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
  } else if (newMonth < currentMonth.value) {
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

watch(showSideBar, (newVal) => {
  console.log('showSideBar', newVal, mobileMode.value)
  if (mobileMode.value) {
    if (newVal) {
      animateSideBar.slideIn_animation = true
      setTimeout(() => {
        animateSideBar.slideIn_animation = false
      }, 200)
    } else {
      tempShowSideBar.value = true
      animateSideBar.slideOut_animation = true
      setTimeout(() => {
        tempShowSideBar.value = false
        animateSideBar.slideOut_animation = false
      }, 180)
    }
  } else {
    if (newVal) {
      animateSideBar.slideIn_animation = true
      animateCalender.shrink_animation = true
      gridArea['grid-template-columns'] = '15vw 85vw'
      setTimeout(() => {
        animateCalender.shrink_animation = false
        animateSideBar.slideIn_animation = false
      }, 200)
    } else {
      tempShowSideBar.value = true
      animateSideBar.slideOut_animation = true
      animateCalender.stretch_animation = true
      setTimeout(() => {
        tempShowSideBar.value = false
        gridArea['grid-template-columns'] = '0vw 100vw'
        animateSideBar.slideOut_animation = false
        animateCalender.stretch_animation = false
      }, 180)
    }
  }
})

function cookieCheck() {
  const id = Cookies.get('id')
  const email = Cookies.get('email')
  const username = Cookies.get('username')
  const type = Cookies.get('type')
  if (id && email && username && type) {
    user.id = id
    user.email = email
    user.username = username
    user.type = type
  }
}

async function fetchCalendar() {
  try {
    // const res = await fetch('http://localhost:3000/months')
    const res = await fetch('https://calender-database.onrender.com/months')
    months.value = await res.json()
  } catch (error) {
    console.error('Server did not respond: ', error)
  }
  loadingApp.value = false
}

onBeforeMount(async () => {
  cookieCheck()
  await fetchCalendar()
})
</script>
<template>
  <div id="container" v-if="months.length > 0" :style="gridArea">
    <div class="header">
      <Header
        v-if="months.length > 0"
        v-model:showSideBar="showSideBar"
        v-model:mobileMode="mobileMode"
        :loggedIn="loggedIn"
        :months="months"
        :currentMonth="currentMonth"
        @changeMonth="changeMonth"
        @showAccountOverlay="showAccountOverlay = true" />
    </div>

    <div
      class="calender"
      :style="calenderStyle"
      :class="animateCalender"
      @touchstart="handleCalendarTouch"
      @touchmove="handleCalendarTouch"
      @touchend="handleCalendarTouch"
      @touchcancel="handleCalendarTouch">
      <Calender
        v-model:months="months"
        :daySelected="daySelected"
        :currentMonth="currentMonth"
        :countries="countries"
        @changeMonth="changeMonth"
        @changeDay="changeDay" />
    </div>
    <div class="create-event" :class="animateSideBar" v-show="showSideBar || tempShowSideBar">
      <CreateEvent
        :months="months"
        :daySelected="daySelected"
        :currentMonth="currentMonth"
        :countries="countries"
        :loggedIn="loggedIn"
        @changeMonth="changeMonth"
        @toggleCountry="toggleCountry" />
    </div>
    <div class="account-overlay" v-if="showAccountOverlay">
      <AccountComp v-model:user="user" @hideAccountOverlay="showAccountOverlay = false" />
    </div>
  </div>
  <div id="loading" v-else-if="loadingApp">
    <h1>Loading...</h1>
    <svg class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
  </div>
  <div id="page-error" v-else>Something went wrong</div>
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
  display: grid;
  grid-template-areas:
    'header header'
    'create-event calender';
  grid-template-rows: 8vh 92vh;
  overflow: hidden;
}

#loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 2.5rem;
  height: 100vh;
  width: 100vw;
}

#loading > * {
  margin: 50px;
}

#page-error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-size: 3rem;
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
  width: 100%;
  height: 100%;
}

.create-event {
  grid-area: create-event;
  width: 100%;
  height: 100%;
  background-color: white;
}

.account-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 1002;
}

@keyframes stretchCalendar {
  0% {
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
  animation: 190ms linear reverse slideSide;
}

@media screen and (max-width: 800px) {
  #container {
    grid-template-areas:
      'header header'
      'calender calender';
  }
  .create-event {
    /* display: none; */
    position: absolute;
    width: 50vw;
    top: 8vh;
  }
}

.spinner {
  animation: rotator 1.4s linear infinite;
}

#loading .spinner {
  height: 150px;
  width: 150px;
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
