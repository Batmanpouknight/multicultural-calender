import { computed, ref } from 'vue'
import { link } from './link.js'
import { loadingApp } from './loading.js'

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
