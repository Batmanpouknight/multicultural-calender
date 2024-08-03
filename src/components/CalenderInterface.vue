<script setup>
import { computed, ref } from 'vue'

const props = defineProps(['months', 'daySelected', 'currentMonth', 'currentDayIndex', 'countries'])
const emit = defineEmits(['changeMonth', 'changeDay'])

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const getMonth = computed(() => props.months[props.currentMonth])

function getCellValue(row, column) {
  return (row - 1) * 7 + column - 1
}

const getEventsForADay = (day) => {
  let events = []
  let dayInfo = getMonth.value.dates[day]
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
    <button @click="emit('changeMonth', 'perv')">Perv</button>
    <h1 class="monthName">{{ getMonth.name }}</h1>
    <button @click="emit('changeMonth', 'next')">Next</button>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th v-for="day in days" :key="day">{{ day }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="n in getMonth.rows" :key="n">
        <td
          v-for="m in 7"
          :key="m"
          :class="{
            thisMonth: getMonth.dates[getCellValue(n, m)].dayIsInThisMonth,
            notThisMonth: !getMonth.dates[getCellValue(n, m)].dayIsInThisMonth,
            selected:
              getMonth.dates[getCellValue(n, m)].number === daySelected &&
              getMonth.dates[getCellValue(n, m)].dayIsInThisMonth
          }"
          @click="
            emit(
              'changeDay',
              getMonth.dates[getCellValue(n, m)].number,
              getMonth.dates[getCellValue(n, m)].dayIsInThisMonth
            )
          "
        >
          {{ getMonth.dates[getCellValue(n, m)].number }}
          <div v-if="getMonth.dates[getCellValue(n, m)].events.length > 0">
            <div
              v-for="event in getEventsForADay(getCellValue(n, m))"
              class="event-name"
              :key="event.id"
            >
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
  background-color: lightgray;
}

.thisMonth {
  background-color: white;
}

.thisMonth:hover {
  background-color: lightblue;
}

.selected {
  background-color: lightgreen;
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
  padding: 10px;
  width: 14.28%;
  text-align: center;
}
</style>
