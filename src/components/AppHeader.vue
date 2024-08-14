<script setup>
import { onMounted, computed } from 'vue'

const props = defineProps(['months', 'currentMonth', 'loggedIn'])

const emit = defineEmits(['changeMonth', 'showAccountOverlay'])

const showSideBar = defineModel('showSideBar')
const mobileMode = defineModel('mobileMode')
const animateSideBar = defineModel('animateSideBar')
const animateCalender = defineModel('animateCalender')
const gridArea = defineModel('gridArea')

/**
 * returns the month object based on the current month
 * @returns {object} the month object
 */
const getCurrnetMonthObject = computed(() => {
  return props.months[props.currentMonth]
})

function changeMonthButton(direction) {
  emit('changeMonth', props.currentMonth + direction)
}

function toggleSideBar() {
  if (showSideBar.value) {
    animateSideBar.value.slideOut_animation = true
    animateCalender.value.stretch_animation = true
    setTimeout(() => {
      gridArea.value['grid-template-columns'] = '0vw 100vw'
      showSideBar.value = false
      animateSideBar.value.slideOut_animation = false
      animateCalender.value.stretch_animation = false
    }, 200)
  } else {
    showSideBar.value = true
    animateSideBar.value.slideIn_animation = true
    animateCalender.value.shrink_animation = true
    gridArea.value['grid-template-columns'] = '15vw 85vw'
    setTimeout(() => {
      animateCalender.value.shrink_animation = false
      animateSideBar.value.slideIn_animation = false
    }, 200)
  }
}

function overlapSideBar() {
  if (showSideBar.value) {
    showSideBar.value = false
    animateSideBar.value.slideOut_animation = true
    setTimeout(() => {
      animateSideBar.value.slideOut_animation = false
    }, 200)
  } else {
    showSideBar.value = true
    animateSideBar.value.slideIn_animation = true
    setTimeout(() => {
      animateSideBar.value.slideIn_animation = false
    }, 200)
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
  } else {
    mobileMode.value = false
    showSideBar.value = true
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth < 800) {
      mobileMode.value = true
      showSideBar.value = false
    } else {
      mobileMode.value = false
      showSideBar.value = true
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
    <div id="account" @click="emit('showAccountOverlay')"><span v-if="loggedIn">Account</span> <span v-else>Signup/Login</span></div>
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
