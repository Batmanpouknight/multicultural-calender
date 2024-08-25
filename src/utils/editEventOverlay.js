import { ref } from 'vue'

export const showEditEvent = ref(false)

export const eventToEdit = ref({})

export function hideEditEventOverlay() {
  showEditEvent.value = false
}
