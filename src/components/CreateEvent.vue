<script setup>
// import { ref } from 'vue'
const props = defineProps(['months', 'daySelected', 'currentMonth'])
</script>

<template>
  Date: {{ months[currentMonth].name }} {{ daySelected }}
  <form>
    <label for="name-input">Name: </label>
    <input type="text" class="name-input" />

    <button type="submit">Add Event</button>
  </form>
</template>

<style scoped>
input {
  width: 80%;
}
</style>
