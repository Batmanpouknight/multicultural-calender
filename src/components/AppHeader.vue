<script setup>
import { onMounted } from 'vue'

const showSideBar = defineModel('showSideBar')
const sideBarStyle = defineModel('sideBarStyle')
const calenderStyle = defineModel('calenderStyle')
const mobileMode = defineModel('mobileMode')

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
    sideBarStyle.value.width = '50vw'
    calenderStyle.value.width = '100vw'
  } else {
    mobileMode.value = false
    showSideBar.value = true
    sideBarStyle.value.position = 'relative'
    sideBarStyle.value.width = '20vw'
    calenderStyle.value.width = '80vw'
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth < 800) {
      mobileMode.value = true
      showSideBar.value = false
      sideBarStyle.value.position = 'absolute'
      sideBarStyle.value.display = false
      sideBarStyle.value.width = '50vw'
      calenderStyle.value.width = '100vw'
    } else {
      mobileMode.value = false
      showSideBar.value = true
      sideBarStyle.value.position = 'relative'
      sideBarStyle.value.width = '20vw'
      calenderStyle.value.width = '80vw'
    }
  })
})
</script>

<template>
  <div id="container">
    <img src="./icons/menu.svg" alt="Menu Icon" id="menu-icon" @click="handleHide" />
  </div>
</template>

<style scoped>
#menu-icon {
  width: 40px;
  cursor: pointer;
}
</style>
