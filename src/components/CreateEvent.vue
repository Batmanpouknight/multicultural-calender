<script setup>
import { ref } from 'vue'
const counter = ref(0)
</script>

<template>
  <div>
    <h1>Counter: {{ counter }}</h1>
    <button @click="counter++">Increment</button>
  </div>
</template>
