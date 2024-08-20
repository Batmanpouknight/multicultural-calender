<script setup>
import { computed, ref, onMounted, reactive } from 'vue'

const props = defineProps(['months', 'daySelected', 'currentMonth', 'countries', 'user'])
const emit = defineEmits(['changeDay', 'editEvent'])

const events = defineModel('events')

const dayFullStrings = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const dayShortStrings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const days = ref(window.innerWidth < 800 ? dayShortStrings : dayFullStrings)

const showOverlay = ref(false)

const showEventDetailsForDay = ref(new Date().getDate())

const eventDetailsLocation = reactive({ top: 0, left: 0 })

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
  return getCurrnetMonthObject.value.dates[index].number === props.daySelected && getCurrnetMonthObject.value.dates[index].dayIsInThisMonth
}

/**
 * returns the events for a specific day based on the filetered countries
 * @param {number} day the day to get the events for
 * @returns {array} the events for the day
 */
function getEventsForADay(index) {
  let filteredEvents = []
  let dayInfo = getCurrnetMonthObject.value.dates[index]
  for (let i = 0; i < dayInfo.events.length; i++) {
    const event = events.value.find((e) => e._id === dayInfo.events[i])
    if (event && props.countries[event.country].selected) {
      filteredEvents.push(event)
    }
  }
  return filteredEvents
}

function showEventDetails(event, e) {
  showOverlay.value = true
  showEventDetailsForDay.value = event
  eventDetailsLocation.top = Number((e.y / window.innerHeight) * 100) + '%'
  eventDetailsLocation.left = Number((e.x / window.innerWidth) * 100) + '%'
  if (e.x > window.innerWidth / 2) {
    eventDetailsLocation.left = Number((e.x / window.innerWidth) * 100 - 20) + '%'
  }
  if (e.y > window.innerHeight / 2) {
    eventDetailsLocation.top = Number((e.y / window.innerHeight) * 100 - 20) + '%'
  }
}

const isThisUserEvent = computed(() => {
  return props.user.id === showEventDetailsForDay.value.userId
})

function deleteEvent() {
  try {
    const res = fetch('https://calender-database.onrender.com/api/removeevent', {
      // const res = fetch('http://localhost:3000/api/removeevent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: showEventDetailsForDay.value._id }),
    })
    events.value = events.value.filter((e) => e._id !== showEventDetailsForDay.value._id)
    showOverlay.value = false
  } catch (error) {
    console.error(error)
  }
}

function showEditEvent(event) {
  emit('editEvent', event)
  showOverlay.value = false
}

onMounted(() => {
  window.addEventListener('resize', () => {
    window.innerWidth < 800 ? (days.value = dayShortStrings) : (days.value = dayFullStrings)
  })
})
</script>

<template>
  <div id="calender-grid" :style="{ 'grid-template-rows': `repeat(${getCurrnetMonthObject.rows}, ${itemHeight}%)` }">
    <div
      v-for="(n, index) in 7 * getCurrnetMonthObject.rows"
      :key="n"
      class="calender-item"
      :class="{
        thisMonth: getDayObject(index).dayIsInThisMonth,
        notThisMonth: !getDayObject(index).dayIsInThisMonth,
        selected: isSelected(index),
      }"
      @click.self="emit('changeDay', getDayObject(index))">
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

  <div class="overlay" @click.self="showOverlay = false" v-if="showOverlay">
    <div class="event-details" :style="eventDetailsLocation">
      <div class="x-button" @click="showOverlay = false">x</div>
      <div class="event-info">
        <div>name: {{ showEventDetailsForDay.name }}</div>
        <div>country: {{ props.countries[showEventDetailsForDay.country].name }}</div>
        <div>description: {{ showEventDetailsForDay.description }}</div>
        <div v-if="showEventDetailsForDay.source"><a :href="showEventDetailsForDay.source" target="_blank">Source</a></div>
        <div v-if="isThisUserEvent">
          <button @click="deleteEvent()">Delete</button><button @click="showEditEvent(showEventDetailsForDay)">Edit</button>
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
