import { ref, reactive, computed } from 'vue'
import { user } from './user'

export const showEventDetailsOverlay = ref(false)

export const showEventDetailsForDay = ref({})

export const eventDetailsLocation = reactive({ top: 0, left: 0 })

export function showEventDetails(event, e) {
  showEventDetailsOverlay.value = true
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

export const isThisUserEvent = computed(() => {
  return user.id === showEventDetailsForDay.value.userId
})
