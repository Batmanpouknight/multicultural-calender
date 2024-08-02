<script setup>
import { ref, computed } from 'vue'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const i = ref(0)
//needs way to figure out how many days in a month
const months = ref([
  {
    name: 'January',
    days: 31,
    rows: 5,
    dates: [
      31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
      26, 27, 28, 29, 30, 31, 1, 2, 3
    ]
  },
  {
    name: 'February',
    days: 29,
    rows: 5,
    dates: [
      28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
      23, 24, 25, 26, 27, 28, 29, 1, 2
    ]
  },
  {
    name: 'March',
    days: 31,
    rows: 6,
    dates: [
      25, 26, 27, 28, 29, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6
    ]
  },
  {
    name: 'April',
    days: 30,
    rows: 5,
    dates: [
      31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
      26, 27, 28, 29, 30, 1, 2, 3, 4
    ]
  },
  {
    name: 'May',
    days: 31,
    rows: 5,
    dates: [
      28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
      24, 25, 26, 27, 28, 29, 30, 31, 1
    ]
  },
  {
    name: 'June',
    days: 30,
    rows: 6,
    dates: [
      26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6
    ]
  },
  {
    name: 'July',
    days: 31,
    rows: 5,
    dates: [
      30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
      26, 27, 28, 29, 30, 31, 1, 2, 3
    ]
  },
  {
    name: 'August',
    days: 31,
    rows: 5,
    dates: [
      28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
      23, 24, 25, 26, 27, 28, 29, 30, 31
    ]
  },
  {
    name: 'September',
    days: 30,
    rows: 5,
    dates: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 1, 2, 3, 4, 5
    ]
  },
  {
    name: 'October',
    days: 31,
    rows: 5,
    dates: [
      29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
      25, 26, 27, 28, 29, 30, 31, 1, 2
    ]
  },
  {
    name: 'November',
    days: 30,
    rows: 5,
    dates: [
      27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30
    ]
  },
  {
    name: 'December',
    days: 31,
    rows: 5,
    dates: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 1, 2, 3, 4
    ]
  }
])

const currentMonth = ref(new Date().getMonth())
const getMonth = computed(() => months.value[currentMonth.value])
function getCellValue(row, column) {
  return (row - 1) * 7 + column - 1
}
function changeMonth(direction) {
  if (direction === 'next' && currentMonth.value < 11) {
    currentMonth.value++
  } else if (direction === 'perv' && currentMonth.value > 0) {
    currentMonth.value--
  }
}
</script>

<template>
  <div class="month">
    <button @click="changeMonth('perv')">Perv</button>
    <h1 class="monthName">{{ getMonth.name }}</h1>
    <button @click="changeMonth('next')">Next</button>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th v-for="day in days" :key="day">{{ day }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="n in getMonth.rows" :key="n">
        <td v-for="m in 7" :key="m">{{ getMonth.dates[getCellValue(n, m)] }}</td>
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
.table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 10px;
}
</style>
