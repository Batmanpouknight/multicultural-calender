<script setup>
import { ref, computed } from 'vue'
const IRAN = 0
const CANADA = 1
const CHINA = 2
const INDIA1 = 3
const USA = 4
const months = ref([
  {
    name: 'January',
    days: 31,
    rows: 5,
    dates: [
      { number: 31, events: [], dayIsInThisMonth: false },
      { number: 1, events: [], dayIsInThisMonth: true },
      { number: 2, events: [], dayIsInThisMonth: true },
      { number: 3, events: [], dayIsInThisMonth: true },
      { number: 4, events: [], dayIsInThisMonth: true },
      { number: 5, events: [], dayIsInThisMonth: true },
      { number: 6, events: [], dayIsInThisMonth: true },
      { number: 7, events: [], dayIsInThisMonth: true },
      { number: 8, events: [], dayIsInThisMonth: true },
      { number: 9, events: [], dayIsInThisMonth: true },
      { number: 10, events: [], dayIsInThisMonth: true },
      { number: 11, events: [], dayIsInThisMonth: true },
      { number: 12, events: [], dayIsInThisMonth: true },
      { number: 13, events: [], dayIsInThisMonth: true },
      { number: 14, events: [], dayIsInThisMonth: true },
      { number: 15, events: [], dayIsInThisMonth: true },
      { number: 16, events: [], dayIsInThisMonth: true },
      { number: 17, events: [], dayIsInThisMonth: true },
      { number: 18, events: [], dayIsInThisMonth: true },
      { number: 19, events: [], dayIsInThisMonth: true },
      { number: 20, events: [], dayIsInThisMonth: true },
      { number: 21, events: [], dayIsInThisMonth: true },
      { number: 22, events: [], dayIsInThisMonth: true },
      { number: 23, events: [], dayIsInThisMonth: true },
      { number: 24, events: [], dayIsInThisMonth: true },
      { number: 25, events: [], dayIsInThisMonth: true },
      { number: 26, events: [], dayIsInThisMonth: true },
      { number: 27, events: [], dayIsInThisMonth: true },
      { number: 28, events: [], dayIsInThisMonth: true },
      { number: 29, events: [], dayIsInThisMonth: true },
      { number: 30, events: [], dayIsInThisMonth: true },
      { number: 31, events: [], dayIsInThisMonth: true },
      { number: 1, events: [], dayIsInThisMonth: false },
      { number: 2, events: [], dayIsInThisMonth: false },
      { number: 3, events: [], dayIsInThisMonth: false }
    ]
  },
  {
    name: 'February',
    days: 29,
    rows: 5,
    dates: [
      { number: 28, events: [], dayIsInThisMonth: false },
      { number: 29, events: [], dayIsInThisMonth: false },
      { number: 30, events: [], dayIsInThisMonth: false },
      { number: 31, events: [], dayIsInThisMonth: false },
      { number: 1, events: [], dayIsInThisMonth: true },
      { number: 2, events: [], dayIsInThisMonth: true },
      { number: 3, events: [], dayIsInThisMonth: true },
      { number: 4, events: [], dayIsInThisMonth: true },
      { number: 5, events: [], dayIsInThisMonth: true },
      { number: 6, events: [], dayIsInThisMonth: true },
      { number: 7, events: [], dayIsInThisMonth: true },
      { number: 8, events: [], dayIsInThisMonth: true },
      { number: 9, events: [], dayIsInThisMonth: true },
      { number: 10, events: [], dayIsInThisMonth: true },
      { number: 11, events: [], dayIsInThisMonth: true },
      { number: 12, events: [], dayIsInThisMonth: true },
      { number: 13, events: [], dayIsInThisMonth: true },
      { number: 14, events: [], dayIsInThisMonth: true },
      { number: 15, events: [], dayIsInThisMonth: true },
      { number: 16, events: [], dayIsInThisMonth: true },
      { number: 17, events: [], dayIsInThisMonth: true },
      { number: 18, events: [], dayIsInThisMonth: true },
      { number: 19, events: [], dayIsInThisMonth: true },
      { number: 20, events: [], dayIsInThisMonth: true },
      { number: 21, events: [], dayIsInThisMonth: true },
      { number: 22, events: [], dayIsInThisMonth: true },
      { number: 23, events: [], dayIsInThisMonth: true },
      { number: 24, events: [], dayIsInThisMonth: true },
      { number: 25, events: [], dayIsInThisMonth: true },
      { number: 26, events: [], dayIsInThisMonth: true },
      { number: 27, events: [], dayIsInThisMonth: true },
      { number: 28, events: [], dayIsInThisMonth: true },
      { number: 29, events: [], dayIsInThisMonth: true },
      { number: 1, events: [], dayIsInThisMonth: false },
      { number: 2, events: [], dayIsInThisMonth: false }
    ]
  },
  {
    name: 'March',
    days: 31,
    rows: 6,
    dates: [
      { number: 25, events: [], dayIsInThisMonth: false },
      { number: 26, events: [], dayIsInThisMonth: false },
      { number: 27, events: [], dayIsInThisMonth: false },
      { number: 28, events: [], dayIsInThisMonth: false },
      { number: 29, events: [], dayIsInThisMonth: false },
      { number: 1, events: [], dayIsInThisMonth: true },
      { number: 2, events: [], dayIsInThisMonth: true },
      { number: 3, events: [], dayIsInThisMonth: true },
      { number: 4, events: [], dayIsInThisMonth: true },
      { number: 5, events: [], dayIsInThisMonth: true },
      { number: 6, events: [], dayIsInThisMonth: true },
      { number: 7, events: [], dayIsInThisMonth: true },
      { number: 8, events: [], dayIsInThisMonth: true },
      { number: 9, events: [], dayIsInThisMonth: true },
      { number: 10, events: [], dayIsInThisMonth: true },
      { number: 11, events: [], dayIsInThisMonth: true },
      { number: 12, events: [], dayIsInThisMonth: true },
      { number: 13, events: [], dayIsInThisMonth: true },
      { number: 14, events: [], dayIsInThisMonth: true },
      { number: 15, events: [], dayIsInThisMonth: true },
      { number: 16, events: [], dayIsInThisMonth: true },
      { number: 17, events: [], dayIsInThisMonth: true },
      { number: 18, events: [], dayIsInThisMonth: true },
      { number: 19, events: [], dayIsInThisMonth: true },
      { number: 20, events: [], dayIsInThisMonth: true },
      { number: 21, events: [], dayIsInThisMonth: true },
      { number: 22, events: [], dayIsInThisMonth: true },
      { number: 23, events: [], dayIsInThisMonth: true },
      { number: 24, events: [], dayIsInThisMonth: true },
      { number: 25, events: [], dayIsInThisMonth: true },
      { number: 26, events: [], dayIsInThisMonth: true },
      { number: 27, events: [], dayIsInThisMonth: true },
      { number: 28, events: [], dayIsInThisMonth: true },
      { number: 29, events: [], dayIsInThisMonth: true },
      { number: 30, events: [], dayIsInThisMonth: true },
      { number: 31, events: [], dayIsInThisMonth: true },
      { number: 1, events: [], dayIsInThisMonth: false },
      { number: 2, events: [], dayIsInThisMonth: false },
      { number: 3, events: [], dayIsInThisMonth: false },
      { number: 4, events: [], dayIsInThisMonth: false },
      { number: 5, events: [], dayIsInThisMonth: false },
      { number: 6, events: [], dayIsInThisMonth: false }
    ]
  },
  {
    name: 'April',
    days: 30,
    rows: 5,
    dates: [
      { number: 31, events: [], dayIsInThisMonth: false },
      { number: 1, events: [], dayIsInThisMonth: true },
      { number: 2, events: [], dayIsInThisMonth: true },
      { number: 3, events: [], dayIsInThisMonth: true },
      { number: 4, events: [], dayIsInThisMonth: true },
      { number: 5, events: [], dayIsInThisMonth: true },
      { number: 6, events: [], dayIsInThisMonth: true },
      { number: 7, events: [], dayIsInThisMonth: true },
      { number: 8, events: [], dayIsInThisMonth: true },
      { number: 9, events: [], dayIsInThisMonth: true },
      { number: 10, events: [], dayIsInThisMonth: true },
      { number: 11, events: [], dayIsInThisMonth: true },
      { number: 12, events: [], dayIsInThisMonth: true },
      { number: 13, events: [], dayIsInThisMonth: true },
      { number: 14, events: [], dayIsInThisMonth: true },
      { number: 15, events: [], dayIsInThisMonth: true },
      { number: 16, events: [], dayIsInThisMonth: true },
      { number: 17, events: [], dayIsInThisMonth: true },
      { number: 18, events: [], dayIsInThisMonth: true },
      { number: 19, events: [], dayIsInThisMonth: true },
      { number: 20, events: [], dayIsInThisMonth: true },
      { number: 21, events: [], dayIsInThisMonth: true },
      { number: 22, events: [], dayIsInThisMonth: true },
      { number: 23, events: [], dayIsInThisMonth: true },
      { number: 24, events: [], dayIsInThisMonth: true },
      { number: 25, events: [], dayIsInThisMonth: true },
      { number: 26, events: [], dayIsInThisMonth: true },
      { number: 27, events: [], dayIsInThisMonth: true },
      { number: 28, events: [], dayIsInThisMonth: true },
      { number: 29, events: [], dayIsInThisMonth: true },
      { number: 30, events: [], dayIsInThisMonth: true },
      { number: 1, events: [], dayIsInThisMonth: false },
      { number: 2, events: [], dayIsInThisMonth: false },
      { number: 3, events: [], dayIsInThisMonth: false },
      { number: 4, events: [], dayIsInThisMonth: false }
    ]
  },
  {
    name: 'May',
    days: 31,
    rows: 5,
    dates: [
      { number: 28, events: [], dayIsInThisMonth: false },
      { number: 29, events: [], dayIsInThisMonth: false },
      { number: 30, events: [], dayIsInThisMonth: false },
      { number: 1, events: [], dayIsInThisMonth: true },
      { number: 2, events: [], dayIsInThisMonth: true },
      { number: 3, events: [], dayIsInThisMonth: true },
      { number: 4, events: [], dayIsInThisMonth: true },
      { number: 5, events: [], dayIsInThisMonth: true },
      { number: 6, events: [], dayIsInThisMonth: true },
      { number: 7, events: [], dayIsInThisMonth: true },
      { number: 8, events: [], dayIsInThisMonth: true },
      { number: 9, events: [], dayIsInThisMonth: true },
      { number: 10, events: [], dayIsInThisMonth: true },
      { number: 11, events: [], dayIsInThisMonth: true },
      { number: 12, events: [], dayIsInThisMonth: true },
      { number: 13, events: [], dayIsInThisMonth: true },
      { number: 14, events: [], dayIsInThisMonth: true },
      { number: 15, events: [], dayIsInThisMonth: true },
      { number: 16, events: [], dayIsInThisMonth: true },
      { number: 17, events: [], dayIsInThisMonth: true },
      { number: 18, events: [], dayIsInThisMonth: true },
      { number: 19, events: [], dayIsInThisMonth: true },
      { number: 20, events: [], dayIsInThisMonth: true },
      { number: 21, events: [], dayIsInThisMonth: true },
      { number: 22, events: [], dayIsInThisMonth: true },
      { number: 23, events: [], dayIsInThisMonth: true },
      { number: 24, events: [], dayIsInThisMonth: true },
      { number: 25, events: [], dayIsInThisMonth: true },
      { number: 26, events: [], dayIsInThisMonth: true },
      { number: 27, events: [], dayIsInThisMonth: true },
      { number: 28, events: [], dayIsInThisMonth: true },
      { number: 29, events: [], dayIsInThisMonth: true },
      { number: 30, events: [], dayIsInThisMonth: true },
      { number: 31, events: [], dayIsInThisMonth: true },
      { number: 1, events: [], dayIsInThisMonth: false }
    ]
  },
  {
    name: 'June',
    days: 30,
    rows: 6,
    dates: [
      { number: 26, events: [], dayIsInThisMonth: false },
      { number: 27, events: [], dayIsInThisMonth: false },
      { number: 28, events: [], dayIsInThisMonth: false },
      { number: 29, events: [], dayIsInThisMonth: false },
      { number: 30, events: [], dayIsInThisMonth: false },
      { number: 31, events: [], dayIsInThisMonth: false },
      { number: 1, events: [], dayIsInThisMonth: true },
      { number: 2, events: [], dayIsInThisMonth: true },
      { number: 3, events: [], dayIsInThisMonth: true },
      { number: 4, events: [], dayIsInThisMonth: true },
      { number: 5, events: [], dayIsInThisMonth: true },
      { number: 6, events: [], dayIsInThisMonth: true },
      { number: 7, events: [], dayIsInThisMonth: true },
      { number: 8, events: [], dayIsInThisMonth: true },
      { number: 9, events: [], dayIsInThisMonth: true },
      { number: 10, events: [], dayIsInThisMonth: true },
      { number: 11, events: [], dayIsInThisMonth: true },
      { number: 12, events: [], dayIsInThisMonth: true },
      { number: 13, events: [], dayIsInThisMonth: true },
      { number: 14, events: [], dayIsInThisMonth: true },
      { number: 15, events: [], dayIsInThisMonth: true },
      { number: 16, events: [], dayIsInThisMonth: true },
      { number: 17, events: [], dayIsInThisMonth: true },
      { number: 18, events: [], dayIsInThisMonth: true },
      { number: 19, events: [], dayIsInThisMonth: true },
      { number: 20, events: [], dayIsInThisMonth: true },
      { number: 21, events: [], dayIsInThisMonth: true },
      { number: 22, events: [], dayIsInThisMonth: true },
      { number: 23, events: [], dayIsInThisMonth: true },
      { number: 24, events: [], dayIsInThisMonth: true },
      { number: 25, events: [], dayIsInThisMonth: true },
      { number: 26, events: [], dayIsInThisMonth: true },
      { number: 27, events: [], dayIsInThisMonth: true },
      { number: 28, events: [], dayIsInThisMonth: true },
      { number: 29, events: [], dayIsInThisMonth: true },
      { number: 30, events: [], dayIsInThisMonth: true },
      { number: 1, events: [], dayIsInThisMonth: false },
      { number: 2, events: [], dayIsInThisMonth: false },
      { number: 3, events: [], dayIsInThisMonth: false },
      { number: 4, events: [], dayIsInThisMonth: false },
      { number: 5, events: [], dayIsInThisMonth: false },
      { number: 6, events: [], dayIsInThisMonth: false }
    ]
  },
  {
    name: 'July',
    days: 31,
    rows: 5,
    dates: [
      { number: 30, events: [], dayIsInThisMonth: false },
      { number: 31, events: [], dayIsInThisMonth: false },
      { number: 1, events: [], dayIsInThisMonth: true },
      { number: 2, events: [], dayIsInThisMonth: true },
      { number: 3, events: [], dayIsInThisMonth: true },
      { number: 4, events: [], dayIsInThisMonth: true },
      { number: 5, events: [], dayIsInThisMonth: true },
      { number: 6, events: [], dayIsInThisMonth: true },
      { number: 7, events: [], dayIsInThisMonth: true },
      { number: 8, events: [], dayIsInThisMonth: true },
      { number: 9, events: [], dayIsInThisMonth: true },
      { number: 10, events: [], dayIsInThisMonth: true },
      { number: 11, events: [], dayIsInThisMonth: true },
      { number: 12, events: [], dayIsInThisMonth: true },
      { number: 13, events: [], dayIsInThisMonth: true },
      { number: 14, events: [], dayIsInThisMonth: true },
      { number: 15, events: [], dayIsInThisMonth: true },
      { number: 16, events: [], dayIsInThisMonth: true },
      { number: 17, events: [], dayIsInThisMonth: true },
      { number: 18, events: [], dayIsInThisMonth: true },
      { number: 19, events: [], dayIsInThisMonth: true },
      { number: 20, events: [], dayIsInThisMonth: true },
      { number: 21, events: [], dayIsInThisMonth: true },
      { number: 22, events: [], dayIsInThisMonth: true },
      { number: 23, events: [], dayIsInThisMonth: true },
      { number: 24, events: [], dayIsInThisMonth: true },
      { number: 25, events: [], dayIsInThisMonth: true },
      { number: 26, events: [], dayIsInThisMonth: true },
      { number: 27, events: [], dayIsInThisMonth: true },
      { number: 28, events: [], dayIsInThisMonth: true },
      { number: 29, events: [], dayIsInThisMonth: true },
      { number: 30, events: [], dayIsInThisMonth: true },
      { number: 31, events: [], dayIsInThisMonth: true },
      { number: 1, events: [], dayIsInThisMonth: false },
      { number: 2, events: [], dayIsInThisMonth: false },
      { number: 3, events: [], dayIsInThisMonth: false }
    ]
  },
  {
    name: 'August',
    days: 31,
    rows: 5,
    dates: [
      { number: 28, events: [], dayIsInThisMonth: false },
      { number: 29, events: [], dayIsInThisMonth: false },
      { number: 30, events: [], dayIsInThisMonth: false },
      { number: 31, events: [], dayIsInThisMonth: false },
      { number: 1, events: [], dayIsInThisMonth: true },
      { number: 2, events: [], dayIsInThisMonth: true },
      { number: 3, events: [], dayIsInThisMonth: true },
      { number: 4, events: [], dayIsInThisMonth: true },
      { number: 5, events: [], dayIsInThisMonth: true },
      { number: 6, events: [], dayIsInThisMonth: true },
      { number: 7, events: [], dayIsInThisMonth: true },
      { number: 8, events: [], dayIsInThisMonth: true },
      { number: 9, events: [], dayIsInThisMonth: true },
      { number: 10, events: [], dayIsInThisMonth: true },
      { number: 11, events: [], dayIsInThisMonth: true },
      { number: 12, events: [], dayIsInThisMonth: true },
      { number: 13, events: [], dayIsInThisMonth: true },
      { number: 14, events: [], dayIsInThisMonth: true },
      { number: 15, events: [], dayIsInThisMonth: true },
      { number: 16, events: [], dayIsInThisMonth: true },
      { number: 17, events: [], dayIsInThisMonth: true },
      { number: 18, events: [], dayIsInThisMonth: true },
      { number: 19, events: [], dayIsInThisMonth: true },
      { number: 20, events: [], dayIsInThisMonth: true },
      { number: 21, events: [], dayIsInThisMonth: true },
      { number: 22, events: [], dayIsInThisMonth: true },
      { number: 23, events: [], dayIsInThisMonth: true },
      { number: 24, events: [], dayIsInThisMonth: true },
      {
        number: 25,
        events: [
          {
            id: 1,
            name: 'Pouyan Birthday',
            country: IRAN,
            description:
              'Pouyan is the greatest man in the entire world and that day is his birthday'
          },
          {
            id: 2,
            name: 'Racist American Guy Birthday',
            country: USA,
            description:
              'George Wallace is the worst man in the entire history and that day is his birthday'
          }
        ],
        dayIsInThisMonth: true
      },
      { number: 26, events: [], dayIsInThisMonth: true },
      { number: 27, events: [], dayIsInThisMonth: true },
      { number: 28, events: [], dayIsInThisMonth: true },
      { number: 29, events: [], dayIsInThisMonth: true },
      { number: 30, events: [], dayIsInThisMonth: true },
      { number: 31, events: [], dayIsInThisMonth: true },
      { number: 1, events: [], dayIsInThisMonth: false },
      { number: 2, events: [], dayIsInThisMonth: false },
      { number: 3, events: [], dayIsInThisMonth: false }
    ]
  },
  {
    name: 'September',
    days: 30,
    rows: 5,
    dates: [
      { number: 1, events: [], dayIsInThisMonth: true },
      { number: 2, events: [], dayIsInThisMonth: true },
      { number: 3, events: [], dayIsInThisMonth: true },
      { number: 4, events: [], dayIsInThisMonth: true },
      { number: 5, events: [], dayIsInThisMonth: true },
      { number: 6, events: [], dayIsInThisMonth: true },
      { number: 7, events: [], dayIsInThisMonth: true },
      { number: 8, events: [], dayIsInThisMonth: true },
      { number: 9, events: [], dayIsInThisMonth: true },
      { number: 10, events: [], dayIsInThisMonth: true },
      { number: 11, events: [], dayIsInThisMonth: true },
      { number: 12, events: [], dayIsInThisMonth: true },
      { number: 13, events: [], dayIsInThisMonth: true },
      { number: 14, events: [], dayIsInThisMonth: true },
      { number: 15, events: [], dayIsInThisMonth: true },
      { number: 16, events: [], dayIsInThisMonth: true },
      { number: 17, events: [], dayIsInThisMonth: true },
      { number: 18, events: [], dayIsInThisMonth: true },
      { number: 19, events: [], dayIsInThisMonth: true },
      { number: 20, events: [], dayIsInThisMonth: true },
      { number: 21, events: [], dayIsInThisMonth: true },
      { number: 22, events: [], dayIsInThisMonth: true },
      { number: 23, events: [], dayIsInThisMonth: true },
      { number: 24, events: [], dayIsInThisMonth: true },
      { number: 25, events: [], dayIsInThisMonth: true },
      { number: 26, events: [], dayIsInThisMonth: true },
      { number: 27, events: [], dayIsInThisMonth: true },
      { number: 28, events: [], dayIsInThisMonth: true },
      { number: 29, events: [], dayIsInThisMonth: true },
      { number: 30, events: [], dayIsInThisMonth: true },
      { number: 1, events: [], dayIsInThisMonth: false },
      { number: 2, events: [], dayIsInThisMonth: false },
      { number: 3, events: [], dayIsInThisMonth: false },
      { number: 4, events: [], dayIsInThisMonth: false },
      { number: 5, events: [], dayIsInThisMonth: false }
    ]
  },
  {
    name: 'October',
    days: 31,
    rows: 5,
    dates: [
      { number: 29, events: [], dayIsInThisMonth: false },
      { number: 30, events: [], dayIsInThisMonth: false },
      { number: 1, events: [], dayIsInThisMonth: true },
      { number: 2, events: [], dayIsInThisMonth: true },
      { number: 3, events: [], dayIsInThisMonth: true },
      { number: 4, events: [], dayIsInThisMonth: true },
      { number: 5, events: [], dayIsInThisMonth: true },
      { number: 6, events: [], dayIsInThisMonth: true },
      { number: 7, events: [], dayIsInThisMonth: true },
      { number: 8, events: [], dayIsInThisMonth: true },
      { number: 9, events: [], dayIsInThisMonth: true },
      { number: 10, events: [], dayIsInThisMonth: true },
      { number: 11, events: [], dayIsInThisMonth: true },
      { number: 12, events: [], dayIsInThisMonth: true },
      { number: 13, events: [], dayIsInThisMonth: true },
      { number: 14, events: [], dayIsInThisMonth: true },
      { number: 15, events: [], dayIsInThisMonth: true },
      { number: 16, events: [], dayIsInThisMonth: true },
      { number: 17, events: [], dayIsInThisMonth: true },
      { number: 18, events: [], dayIsInThisMonth: true },
      { number: 19, events: [], dayIsInThisMonth: true },
      { number: 20, events: [], dayIsInThisMonth: true },
      { number: 21, events: [], dayIsInThisMonth: true },
      { number: 22, events: [], dayIsInThisMonth: true },
      { number: 23, events: [], dayIsInThisMonth: true },
      { number: 24, events: [], dayIsInThisMonth: true },
      { number: 25, events: [], dayIsInThisMonth: true },
      { number: 26, events: [], dayIsInThisMonth: true },
      { number: 27, events: [], dayIsInThisMonth: true },
      { number: 28, events: [], dayIsInThisMonth: true },
      { number: 29, events: [], dayIsInThisMonth: true },
      { number: 30, events: [], dayIsInThisMonth: true },
      { number: 31, events: [], dayIsInThisMonth: true },
      { number: 1, events: [], dayIsInThisMonth: false },
      { number: 2, events: [], dayIsInThisMonth: false }
    ]
  },
  {
    name: 'November',
    days: 30,
    rows: 5,
    dates: [
      { number: 27, events: [], dayIsInThisMonth: false },
      { number: 28, events: [], dayIsInThisMonth: false },
      { number: 29, events: [], dayIsInThisMonth: false },
      { number: 30, events: [], dayIsInThisMonth: false },
      { number: 31, events: [], dayIsInThisMonth: false },
      { number: 1, events: [], dayIsInThisMonth: true },
      { number: 2, events: [], dayIsInThisMonth: true },
      { number: 3, events: [], dayIsInThisMonth: true },
      { number: 4, events: [], dayIsInThisMonth: true },
      { number: 5, events: [], dayIsInThisMonth: true },
      { number: 6, events: [], dayIsInThisMonth: true },
      { number: 7, events: [], dayIsInThisMonth: true },
      { number: 8, events: [], dayIsInThisMonth: true },
      { number: 9, events: [], dayIsInThisMonth: true },
      { number: 10, events: [], dayIsInThisMonth: true },
      { number: 11, events: [], dayIsInThisMonth: true },
      { number: 12, events: [], dayIsInThisMonth: true },
      { number: 13, events: [], dayIsInThisMonth: true },
      { number: 14, events: [], dayIsInThisMonth: true },
      { number: 15, events: [], dayIsInThisMonth: true },
      { number: 16, events: [], dayIsInThisMonth: true },
      { number: 17, events: [], dayIsInThisMonth: true },
      { number: 18, events: [], dayIsInThisMonth: true },
      { number: 19, events: [], dayIsInThisMonth: true },
      { number: 20, events: [], dayIsInThisMonth: true },
      { number: 21, events: [], dayIsInThisMonth: true },
      { number: 22, events: [], dayIsInThisMonth: true },
      { number: 23, events: [], dayIsInThisMonth: true },
      { number: 24, events: [], dayIsInThisMonth: true },
      { number: 25, events: [], dayIsInThisMonth: true },
      { number: 26, events: [], dayIsInThisMonth: true },
      { number: 27, events: [], dayIsInThisMonth: true },
      { number: 28, events: [], dayIsInThisMonth: true },
      { number: 29, events: [], dayIsInThisMonth: true },
      { number: 30, events: [], dayIsInThisMonth: true }
    ]
  },
  {
    name: 'December',
    days: 31,
    rows: 5,
    dates: [
      { number: 1, events: [], dayIsInThisMonth: true },
      { number: 2, events: [], dayIsInThisMonth: true },
      { number: 3, events: [], dayIsInThisMonth: true },
      { number: 4, events: [], dayIsInThisMonth: true },
      { number: 5, events: [], dayIsInThisMonth: true },
      { number: 6, events: [], dayIsInThisMonth: true },
      { number: 7, events: [], dayIsInThisMonth: true },
      { number: 8, events: [], dayIsInThisMonth: true },
      { number: 9, events: [], dayIsInThisMonth: true },
      { number: 10, events: [], dayIsInThisMonth: true },
      { number: 11, events: [], dayIsInThisMonth: true },
      { number: 12, events: [], dayIsInThisMonth: true },
      { number: 13, events: [], dayIsInThisMonth: true },
      { number: 14, events: [], dayIsInThisMonth: true },
      { number: 15, events: [], dayIsInThisMonth: true },
      { number: 16, events: [], dayIsInThisMonth: true },
      { number: 17, events: [], dayIsInThisMonth: true },
      { number: 18, events: [], dayIsInThisMonth: true },
      { number: 19, events: [], dayIsInThisMonth: true },
      { number: 20, events: [], dayIsInThisMonth: true },
      { number: 21, events: [], dayIsInThisMonth: true },
      { number: 22, events: [], dayIsInThisMonth: true },
      { number: 23, events: [], dayIsInThisMonth: true },
      { number: 24, events: [], dayIsInThisMonth: true },
      { number: 25, events: [], dayIsInThisMonth: true },
      { number: 26, events: [], dayIsInThisMonth: true },
      { number: 27, events: [], dayIsInThisMonth: true },
      { number: 28, events: [], dayIsInThisMonth: true },
      { number: 29, events: [], dayIsInThisMonth: true },
      { number: 30, events: [], dayIsInThisMonth: true },
      { number: 31, events: [], dayIsInThisMonth: true },
      { number: 1, events: [], dayIsInThisMonth: false },
      { number: 2, events: [], dayIsInThisMonth: false },
      { number: 3, events: [], dayIsInThisMonth: false },
      { number: 4, events: [], dayIsInThisMonth: false }
    ]
  }
])

const countries = ref([
  { id: 1, name: 'Iran', selected: true },
  { id: 2, name: 'Canada', selected: true },
  { id: 3, name: 'China', selected: true },
  { id: 4, name: 'India', selected: true },
  { id: 5, name: 'USA', selected: true }
])

const daySelected = ref(new Date().getDate())

const currentMonth = ref(new Date().getMonth())

function getOffSetOfMonth(month) {
  let offset = 0
  for (let i = 0; i < 7; i++) {
    if (!month.dates[i].dayIsInThisMonth) offset++
  }
  return offset - 1
}

const getCurrentDayIndex = computed(() => {
  return daySelected.value + getOffSetOfMonth(months.value[currentMonth.value])
})

function changeMonth(direction) {
  if (direction === 'next' && currentMonth.value < 11) {
    currentMonth.value++
    daySelected.value = 1
  } else if (direction === 'perv' && currentMonth.value > 0) {
    currentMonth.value--
    daySelected.value = 1
  }
}

function changeDay(day) {
  daySelected.value = day
}

function toggleCountry(id) {
  const country = countries.value.find((country) => country.id === id)
  country.selected = !country.selected
}
</script>
<template>
  <div id="container">
    <div class="calender">
      <Calender
        :months="months"
        :daySelected="daySelected"
        :currentMonth="currentMonth"
        :currentDayIndex="getCurrentDayIndex"
        :countries="countries"
        @changeMonth="changeMonth"
        @changeDay="changeDay"
      />
    </div>
    <div class="create-event">
      <CreateEvent
        :months="months"
        :daySelected="daySelected"
        :currentMonth="currentMonth"
        :currentDayIndex="getCurrentDayIndex"
        :countries="countries"
        @toggleCountry="toggleCountry"
      />
    </div>
  </div>
</template>
<style>
#container {
  display: flex;
  justify-content: flex-start;
}

.create-event {
  width: 20vw;
  height: 90vh;
  order: 1;
}
.calender {
  height: 90vh;
  width: 80vw;
  order: 2;
}
</style>
