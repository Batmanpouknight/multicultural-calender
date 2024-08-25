import { ref } from 'vue'
import { link } from './link'

export const events = ref([])

export async function fetchEvents() {
  try {
    const eventsResult = await fetch(`${link}/api/events`)
    events.value = await eventsResult.json()
  } catch (error) {
    console.error('Server did not respond to evennts: ', error)
  }
}
