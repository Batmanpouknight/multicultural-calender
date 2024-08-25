import { ref } from 'vue'

export const currentDay = ref(new Date().getDate())
export const currentMonth = ref(new Date().getMonth())

export function changeDay(day) {
  if (day.dayIsInThisMonth) currentDay.value = day.number
}
