import { ref } from 'vue'
import { showEventDetails, showEventDetailsOverlay } from './eventDetailsOverlay'

export const showEditEvent = ref(false)

export const eventToEdit = ref({})

export function hideEditEventOverlay() {
  showEditEvent.value = false
}

export function showEditEventOverlay(event) {
  eventToEdit.value = event
  showEditEvent.value = true
  showEventDetailsOverlay.value = false
}
