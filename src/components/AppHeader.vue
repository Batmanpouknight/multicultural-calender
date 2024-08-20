<script setup>
import { ref, computed } from 'vue'

const props = defineProps(['months', 'currentMonth', 'loggedIn'])

const emit = defineEmits(['changeMonth', 'showAccountOverlay'])

const showSideBar = defineModel('showSideBar')

const showMonthDropdown = ref(false)

/**
 * returns the month object based on the current month
 * @returns {object} the month object
 */
const currnetMonthObject = computed(() => {
  return props.months[props.currentMonth]
})

function changeMonthButton(direction) {
  emit('changeMonth', props.currentMonth + direction)
}

function changeMonth(month) {
  showMonthDropdown.value = false
  emit('changeMonth', month)
  document.getElementById('dropdown-icon').style.transform = 'rotate(0deg)'
  document.getElementById('dropdown-icon').classList.add('animate-rotate-reverse')
  setTimeout(() => {
    document.getElementById('dropdown-icon').classList.remove('animate-rotate-reverse')
  }, 200)
}

function toggleDropdown() {
  const dropdownIcon = document.getElementById('dropdown-icon')
  const dropdown = document.getElementById('month-dropdown')
  if (showMonthDropdown.value) {
    dropdownIcon.style.transform = 'rotate(0deg)'
    dropdownIcon.classList.add('animate-rotate-reverse')
    dropdown.classList.add('animate-dropdown-reverse')
    setTimeout(() => {
      dropdownIcon.classList.remove('animate-rotate-reverse')
      dropdown.classList.remove('animate-dropdown-reverse')
      showMonthDropdown.value = false
    }, 200)
  } else {
    showMonthDropdown.value = true
    dropdownIcon.style.transform = 'rotate(180deg)'
    dropdownIcon.classList.add('animate-rotate')
    dropdown.classList.add('animate-dropdown')
    setTimeout(() => {
      dropdownIcon.classList.remove('animate-rotate')
      dropdown.classList.remove('animate-dropdown')
    }, 200)
  }
}

function toggleSideBar() {
  showSideBar.value = !showSideBar.value
}
</script>

<template>
  <div id="header-container">
    <div class="month">
      <button @click="changeMonthButton(-1)">Prev</button>
      <div class="monthName" @click="toggleDropdown">
        <h1>
          {{ currnetMonthObject.name }}
        </h1>
        <img src="./icons/arrow_drop_down.svg" alt="dropdownIcon arrow" id="dropdown-icon" />
      </div>

      <div id="month-dropdown" v-show="showMonthDropdown">
        <div class="dropdown-item" @click="changeMonth(new Date().getMonth())">Current Month</div>
        <div v-for="(month, index) in months" class="dropdown-item" :key="month.id" @click="changeMonth(index)">
          {{ month.name }}
        </div>
      </div>
      <button @click="changeMonthButton(1)">Next</button>
    </div>
    <img src="./icons/menu.svg" alt="Menu Icon" id="menu-icon" @click="toggleSideBar" />
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
  order: 1;
  cursor: pointer;
}

#account {
  order: 3;
  cursor: pointer;
}

.monthName {
  display: flex;
  cursor: pointer;
}

.monthName > h1 {
  margin: 0;
  display: inline;
}

.monthName > img {
  height: 50px;
  width: 50px;
}

#month-dropdown {
  position: absolute;
  top: 7vh;
  left: 50%;
  background-color: white;
}

.dropdown-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: center;
  cursor: pointer;
}

#month-dropdown > div:hover {
  background-color: #f9f9f9;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}

.animate-rotate {
  animation: rotate 200ms forwards;
}

.animate-rotate-reverse {
  animation: rotate 200ms reverse forwards;
}

@keyframes dropdown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-dropdown {
  animation: dropdown 200ms forwards;
}

.animate-dropdown-reverse {
  animation: dropdown 200ms reverse forwards;
}

@media screen and (max-width: 800px) {
  .monthName > img {
    width: 24px;
    height: 24px;
  }
  h1 {
    font-size: 1.5rem;
  }
  .month > button {
    height: 20px;
    width: 40px;
  }
}
</style>
