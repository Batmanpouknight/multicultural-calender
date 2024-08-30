<script setup>
import { computed, ref, onMounted, reactive } from 'vue'
import { deleteEvent, getEventsForADay } from '../utils/events'
import { currnetMonthObject, getDayObject } from '../utils/months'
import { countries } from '@/utils/countries'
import {
  showEventDetailsOverlay,
  eventDetailsLocation,
  showEventDetailsForDay,
  showEventDetails,
  isThisUserEvent,
} from '../utils/eventDetailsOverlay'
import { showEditEventOverlay } from '@/utils/editEventOverlay'
import { changeDay, currentDay } from '../utils/currentDay'

const emit = defineEmits(['editEvent'])

const dayFullStrings = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const dayShortStrings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const days = ref(window.innerWidth < 800 ? dayShortStrings : dayFullStrings)

/**
 * returns the height of the items in the calender grid
 * @returns {number} the height of the items
 */
const itemHeight = computed(() => 100 / currnetMonthObject.value.rows)

/**
 * returns if the day is selected
 * @param {number} index in the table
 * @returns {boolean} if the day is selected
 */
function isSelected(index) {
  return currnetMonthObject.value.dates[index].number === currentDay.value && currnetMonthObject.value.dates[index].dayIsInThisMonth
}

onMounted(() => {
  window.addEventListener('resize', () => {
    window.innerWidth < 800 ? (days.value = dayShortStrings) : (days.value = dayFullStrings)
  })
})
</script>

<template>
  <div id="calender-grid" :style="{ 'grid-template-rows': `repeat(${currnetMonthObject.rows}, ${itemHeight}%)` }">
    <div
      v-for="(n, index) in 7 * currnetMonthObject.rows"
      :key="n"
      class="calender-item"
      :class="{
        thisMonth: getDayObject(index).dayIsInThisMonth,
        notThisMonth: !getDayObject(index).dayIsInThisMonth,
        selected: isSelected(index),
      }"
      @click.self="changeDay(getDayObject(index))">
      <div v-if="index < 7">{{ days[index] }}</div>
      {{ getDayObject(index).number }}
      <div
        v-for="event in getEventsForADay(index)"
        class="event-name"
        :class="{ holiday: event.holiday }"
        :key="event.id"
        @click="showEventDetails(event, $event)">
        {{ event.name }}
      </div>
    </div>
  </div>

  <div class="overlay" @click.self="showEventDetailsOverlay = false" v-if="showEventDetailsOverlay">
    <div class="event-details" :style="eventDetailsLocation">
      <div class="x-button" @click="showEventDetailsOverlay = false">x</div>
      <div class="event-info">
        <div>name: {{ showEventDetailsForDay.name }}</div>
        <div>country: {{ countries[showEventDetailsForDay.country].name }}</div>
        <div>description: {{ showEventDetailsForDay.description }}</div>
        <div v-if="showEventDetailsForDay.source"><a :href="showEventDetailsForDay.source" target="_blank">Source</a></div>
        <div v-if="isThisUserEvent">
          <button @click="deleteEvent(showEventDetailsForDay._id)">Delete</button
          ><button @click="showEditEventOverlay(showEventDetailsForDay)">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calender-item.notThisMonth {
  background-color: gray;
  color: white;
}

.calender-item.thisMonth {
  background-color: white;
}

.thisMonth:hover {
  background-color: lightblue;
}

.calender-item.selected {
  background-color: lightgray;
}
.event-name {
  background-color: lightcoral;
  margin: 5px;
  padding-left: 5px;
  border-radius: 5px;
  font-size: 14px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  text-overflow: ellipsis;
}

.event-name.holiday {
  background-color: lightgreen;
}

.event-name:hover {
  cursor: pointer;
}

#calender-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 100%;
  width: 100%;
}

.calender-item {
  vertical-align: top;
  text-align: center;
  border: 1px solid black;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.overlay {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.event-details {
  position: fixed;
  height: fit-content;
  width: 400px;
  z-index: 1001;
  background-color: orange;
  padding: 30px;
  /* transform: translate(-50%, -50%); */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.event-info {
  display: flex;
  flex-direction: column;
}

.x-button {
  position: absolute;
  top: 0;
  right: 95%;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}
.x-button:hover {
  background-color: red;
}

@media (max-width: 800px) {
  .event-details {
    width: 300px;
  }
}
</style>
