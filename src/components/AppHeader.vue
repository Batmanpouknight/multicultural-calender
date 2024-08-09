<script setup>
import { onMounted, computed } from 'vue'

const props = defineProps(['months', 'currentMonth'])

const emit = defineEmits(['changeMonth'])

const showSideBar = defineModel('showSideBar')
const sideBarStyle = defineModel('sideBarStyle')
const calenderStyle = defineModel('calenderStyle')
const mobileMode = defineModel('mobileMode')

/**
 * returns the month object based on the current month
 * @returns {object} the month object
 */
const getCurrnetMonthObject = computed(() => {
  return props.months[props.currentMonth]
})

function changeMonthButton(direction) {
  console.log('smth')
  emit('changeMonth', props.currentMonth + direction)

  // if (direction === 1) {
  //   animateCalender.animate__slideInRight = true
  //   animateCalender.animate__slideInLeft = false
  // } else {
  //   animateCalender.animate__slideInRight = false
  //   animateCalender.animate__slideInLeft = true
  // }

  // setTimeout(() => {
  //   animateCalender.animate__slideInRight = false
  //   animateCalender.animate__slideInLeft = false
  // }, 200)
}

function toggleSideBar() {
  if (showSideBar.value) {
    showSideBar.value = false
    sideBarStyle.value.display = 'none'
    calenderStyle.value.width = '100vw'
  } else {
    showSideBar.value = true
    sideBarStyle.value.display = 'block'
    calenderStyle.value.width = '80vw'
  }
}

function overlapSideBar() {
  if (showSideBar.value) {
    showSideBar.value = false
    sideBarStyle.value.display = 'none'
  } else {
    sideBarStyle.value.display = 'block'
    showSideBar.value = true
  }
}

function handleHide() {
  if (mobileMode.value) overlapSideBar()
  else toggleSideBar()
}

onMounted(() => {
  if (window.innerWidth < 800) {
    mobileMode.value = true
    showSideBar.value = false
    sideBarStyle.value.position = 'absolute'
    sideBarStyle.value.width = '0vw'
    sideBarStyle.value.display = 'none'
    sideBarStyle.value.top = '8vh'
    sideBarStyle.value.width = '50vw'
    calenderStyle.value.width = '100vw'
  } else {
    mobileMode.value = false
    showSideBar.value = true
    sideBarStyle.value.position = 'relative'
    sideBarStyle.value.display = 'block'
    sideBarStyle.value.top = '0'
    sideBarStyle.value.width = '20vw'
    calenderStyle.value.width = '80vw'
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth < 800) {
      mobileMode.value = true
      showSideBar.value = false
      sideBarStyle.value.position = 'absolute'
      sideBarStyle.value.width = '0vw'
      sideBarStyle.value.display = 'none'
      sideBarStyle.value.top = '8vh'
      sideBarStyle.value.width = '50vw'
      calenderStyle.value.width = '100vw'
    } else {
      mobileMode.value = false
      showSideBar.value = true
      sideBarStyle.value.position = 'relative'
      sideBarStyle.value.display = 'block'
      sideBarStyle.value.top = '0'
      sideBarStyle.value.width = '20vw'
      calenderStyle.value.width = '80vw'
    }
  })
})
</script>

<template>
  <div id="header-container">
    <div class="month">
      <button @click="changeMonthButton(-1)">Prev</button>
      <h1 class="monthName">
        {{ getCurrnetMonthObject.name }}
      </h1>
      <button @click="changeMonthButton(1)">Next</button>
    </div>
    <img src="./icons/menu.svg" alt="Menu Icon" id="menu-icon" @click="handleHide" />
    <div id="account">Account</div>
  </div>
</template>

<style scoped>
#header-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.month {
  display: flex;
  justify-content: space-between;
  order: 2;
  align-items: center;
  height: 100%;
  width: 50%;
}

.monthName {
  display: inline;
}

.month > button {
  height: 40px;
  width: 80px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
}

.month > button:hover {
  background-color: green;
  cursor: pointer;
}

#menu-icon {
  /* position: absolute;
  left: 20px;
  width: 40px; */
  order: 1;
  cursor: pointer;
}

#account {
  order: 3;
  cursor: pointer;
}

@media screen and (max-width: 800px) {
  h1 {
    font-size: 1.5rem;
  }
  .month > button {
    height: 20px;
    width: 40px;
  }
}
</style>
