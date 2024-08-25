import { computed, ref } from 'vue'
import { link } from './link.js'
import { loadingApp } from './loading.js'
import { currentMonth } from './currentDay.js'

export const months = ref([])

export async function fetchMonths() {
  try {
    const monthResult = await fetch(`${link}/months`)
    months.value = await monthResult.json()
  } catch (error) {
    console.error('Server did not respond for months: ', error)
  }
  loadingApp.value = false
}

export const isMonthLoaded = computed(() => months.value.length > 0)

/**
 * returns the month object based on the current month
 * @returns {object} the month object
 */
export const currnetMonthObject = computed(() => months.value[currentMonth.value])

/**
 * returns the day object based on the index in the table
 * @param {number} index in the table
 * @returns {object} the day object
 */
export function getDayObject(index) {
  return currnetMonthObject.value.dates[index]
}

export function getOffSetOfMonth(month) {
  let offset = 0
  for (let i = 0; i < 7; i++) {
    if (!month.dates[i].dayIsInThisMonth) offset++
  }
  return offset - 1
}
