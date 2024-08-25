import { ref } from 'vue'

export const countries = ref([
  { id: 1, name: 'Iran', selected: true },
  { id: 2, name: 'Canada', selected: true },
  { id: 3, name: 'Ukraine', selected: true },
  { id: 4, name: 'China', selected: true },
  { id: 5, name: 'Korea', selected: true },
  { id: 6, name: 'Indigenous', selected: true },
])

export function toggleCountry(id) {
  const country = countries.value.find((country) => country.id === id)
  country.selected = !country.selected
}
