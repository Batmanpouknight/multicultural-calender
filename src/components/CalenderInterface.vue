<script setup>
import { computed } from 'vue'

const props = defineProps(['months', 'daySelected', 'currentMonth', 'countries'])
const emit = defineEmits(['changeMonth', 'changeDay'])

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/**
 * returns the month object based on the current month
 * @returns {object} the month object
 */
const getMonthObject = computed(() => {
  console.log(props.months)
  return props.months[props.currentMonth]
})

/**
 * returns the day object based on the row and column in the table
 * @param {number} row in the table
 * @param {number} column in the table
 * @returns {object} the day object
 */
function getDayObject(row, column) {
  return getMonthObject.value.dates[getCellValue(row, column)]
}

function isSelected(row, column) {
  return (
    getMonthObject.value.dates[getCellValue(row, column)].number === props.daySelected &&
    getMonthObject.value.dates[getCellValue(row, column)].dayIsInThisMonth
  )
}

function getCellValue(row, column) {
  return (row - 1) * 7 + column - 1
}

/**
 * returns the events for a specific day based on the filetered countries
 * @param {number} day the day to get the events for
 * @returns {array} the events for the day
 */
function getEventsForADay(row, column) {
  let events = []
  let day = getCellValue(row, column)
  let dayInfo = getMonthObject.value.dates[day]
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
    <button @click="emit('changeMonth', props.currentMonth - 1)">Perv</button>
    <h1 class="monthName">{{ getMonthObject.name }}</h1>
    <button @click="emit('changeMonth', props.currentMonth + 1)">Next</button>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th v-for="day in days" :key="day">{{ day }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in getMonthObject.rows" :key="row">
        <td
          v-for="column in 7"
          :key="column"
          :class="{
            thisMonth: getDayObject(row, column).dayIsInThisMonth,
            notThisMonth: !getDayObject(row, column).dayIsInThisMonth,
            selected: isSelected(row, column),
          }"
          @click="emit('changeDay', getDayObject(row, column))"
        >
          {{ getDayObject(row, column).number }}
          <div v-if="getDayObject(row, column).events.length > 0">
            <div v-for="event in getEventsForADay(row, column)" class="event-name" :key="event.id">
              {{ event.name }}
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.month {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.monthName {
  display: inline;
}

.notThisMonth {
  background-color: gray;
}

.thisMonth {
  background-color: white;
}

.thisMonth:hover {
  background-color: lightblue;
}

.selected {
  background-color: lightgray;
}
.event-name {
  background-color: lightcoral;
  margin: 5px;
  border-radius: 5px;
}
.table {
  width: 100%;
  height: 85%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  height: 15%;
  width: 14.28%;
  text-align: center;
}
th {
  background-color: lightgreen;
}
</style>
