<script setup>
import Calender from './components/CalenderInterface.vue'
import CreateEvent from './components/CreateEvent.vue'
</script>
<template>
  <div id="container">
    <div class="calender">
      <Calender />
    </div>
    <div class="create-event">
      <CreateEvent />
    </div>
  </div>
</template>
<style>
#container {
  display: flex;
  justify-content: flex-start;
}

.create-event {
  width: 15vw;
  height: 85vh;
  background-color: #f1f1f1;
  border-right: 1px solid #e0e0e0;
  order: 1;
}
.calender {
  height: 85vh;
  width: 85vw;
  order: 2;
}
</style>
