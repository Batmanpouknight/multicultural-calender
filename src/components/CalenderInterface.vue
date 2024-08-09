<script setup>
import { computed, ref, reactive } from 'vue'

const props = defineProps(['months', 'daySelected', 'currentMonth', 'countries'])
const emit = defineEmits(['changeMonth', 'changeDay'])

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const showOverlay = ref(false)

const showEventDetailsForDay = ref(new Date().getDate())

const animateCalender = reactive({
  animate__animated: true,
  animate__slideInLeft: false,
  animate__slideInRight: false,
})

/**
 * returns the height of the items in the calender grid
 * @returns {number} the height of the items
 */
const itemHeight = computed(() => {
  return 100 / getCurrnetMonthObject.value.rows
})

/**
 * returns the month object based on the current month
 * @returns {object} the month object
 */
const getCurrnetMonthObject = computed(() => {
  return props.months[props.currentMonth]
})

/**
 * returns the day object based on the index in the table
 * @param {number} index in the table
 * @returns {object} the day object
 */
function getDayObject(index) {
  return getCurrnetMonthObject.value.dates[index]
}

/**
 * returns if the day is selected
 * @param {number} index in the table
 * @returns {boolean} if the day is selected
 */
function isSelected(index) {
  return (
    getCurrnetMonthObject.value.dates[index].number === props.daySelected &&
    getCurrnetMonthObject.value.dates[index].dayIsInThisMonth
  )
}

/**
 * changes the month based on the direction
 * @param {number} direction the direction to change the month
 */
function changeMonthButton(direction) {
  console.log('smth')
  emit('changeMonth', props.currentMonth + direction)
  if (direction === 1) {
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
}

/**
 * returns the events for a specific day based on the filetered countries
 * @param {number} day the day to get the events for
 * @returns {array} the events for the day
 */
function getEventsForADay(index) {
  let events = []
  let day = index
  let dayInfo = getCurrnetMonthObject.value.dates[day]
  for (let i = 0; i < dayInfo.events.length; i++) {
    if (props.countries[dayInfo.events[i].country].selected) {
      events.push(dayInfo.events[i])
    }
  }

  return events
}
</script>

<template>
  <div class="month">
    <button @click="changeMonthButton(-1)">Prev</button>
    <h1 class="monthName" :class="animateCalender">
      {{ getCurrnetMonthObject.name }}
    </h1>
    <button @click="changeMonthButton(1)">Next</button>
  </div>

  <div
    id="calender-grid"
    :style="{ 'grid-template-rows': `repeat(${getCurrnetMonthObject.rows}, ${itemHeight}%)` }"
    :class="animateCalender"
  >
    <div
      v-for="(n, index) in 7 * getCurrnetMonthObject.rows"
      :key="n"
      class="calender-item"
      :class="{
        thisMonth: getDayObject(index).dayIsInThisMonth,
        notThisMonth: !getDayObject(index).dayIsInThisMonth,
        selected: isSelected(index),
      }"
      @click.self="emit('changeDay', getDayObject(index))"
    >
      <div v-if="index < 7">{{ days[index] }}</div>
      {{ getDayObject(index).number }}
      <div
        v-for="event in getEventsForADay(index)"
        class="event-name"
        :key="event.id"
        @click="(showOverlay = true), (showEventDetailsForDay = event)"
      >
        {{ event.name }}
      </div>
    </div>
  </div>

  <div v-if="showOverlay">
    <div class="event-details">
      <div class="x-button" @click="showOverlay = false">x</div>
      <div class="event-info">
        info: <br />
        name: {{ showEventDetailsForDay.name }} <br />
        country: {{ props.countries[showEventDetailsForDay.country].name }} <br />
        description: {{ showEventDetailsForDay.description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
.animate__animated.animate__slideInLeft {
  --animate-duration: 200ms;
}
.animate__animated.animate__slideInRight {
  --animate-duration: 200ms;
}

.month {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10%;
}

.monthName {
  display: inline;
}

.month > button {
  height: 50%;
  width: 10%;
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
  margin: 10px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 5px;
  font-size: 12px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  text-overflow: ellipsis;
}
.event-name:hover {
  cursor: pointer;
}

#calender-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 90%;
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

.event-details {
  position: fixed;
  height: 500px;
  width: 500px;
  z-index: 1000;
  background-color: orange;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  /* text-align: center; */
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
.event-info {
  margin-top: 50px;
}
</style>
