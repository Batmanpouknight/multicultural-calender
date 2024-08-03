<script setup>
import { ref, computed } from 'vue'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const months = ref([
  {
    name: 'January',
    days: 31,
    rows: 5,
    dates: [
      { number: 31, events: [], dayIsInThisMonnth: false },
      { number: 1, events: [], dayIsInThisMonnth: true },
      { number: 2, events: [], dayIsInThisMonnth: true },
      { number: 3, events: [], dayIsInThisMonnth: true },
      { number: 4, events: [], dayIsInThisMonnth: true },
      { number: 5, events: [], dayIsInThisMonnth: true },
      { number: 6, events: [], dayIsInThisMonnth: true },
      { number: 7, events: [], dayIsInThisMonnth: true },
      { number: 8, events: [], dayIsInThisMonnth: true },
      { number: 9, events: [], dayIsInThisMonnth: true },
      { number: 10, events: [], dayIsInThisMonnth: true },
      { number: 11, events: [], dayIsInThisMonnth: true },
      { number: 12, events: [], dayIsInThisMonnth: true },
      { number: 13, events: [], dayIsInThisMonnth: true },
      { number: 14, events: [], dayIsInThisMonnth: true },
      { number: 15, events: [], dayIsInThisMonnth: true },
      { number: 16, events: [], dayIsInThisMonnth: true },
      { number: 17, events: [], dayIsInThisMonnth: true },
      { number: 18, events: [], dayIsInThisMonnth: true },
      { number: 19, events: [], dayIsInThisMonnth: true },
      { number: 20, events: [], dayIsInThisMonnth: true },
      { number: 21, events: [], dayIsInThisMonnth: true },
      { number: 22, events: [], dayIsInThisMonnth: true },
      { number: 23, events: [], dayIsInThisMonnth: true },
      { number: 24, events: [], dayIsInThisMonnth: true },
      { number: 25, events: [], dayIsInThisMonnth: true },
      { number: 26, events: [], dayIsInThisMonnth: true },
      { number: 27, events: [], dayIsInThisMonnth: true },
      { number: 28, events: [], dayIsInThisMonnth: true },
      { number: 29, events: [], dayIsInThisMonnth: true },
      { number: 30, events: [], dayIsInThisMonnth: true },
      { number: 31, events: [], dayIsInThisMonnth: true },
      { number: 1, events: [], dayIsInThisMonnth: false },
      { number: 2, events: [], dayIsInThisMonnth: false },
      { number: 3, events: [], dayIsInThisMonnth: false }
    ]
  },
  {
    name: 'February',
    days: 29,
    rows: 5,
    dates: [
      { number: 28, events: [], dayIsInThisMonnth: false },
      { number: 29, events: [], dayIsInThisMonnth: false },
      { number: 30, events: [], dayIsInThisMonnth: false },
      { number: 31, events: [], dayIsInThisMonnth: false },
      { number: 1, events: [], dayIsInThisMonnth: true },
      { number: 2, events: [], dayIsInThisMonnth: true },
      { number: 3, events: [], dayIsInThisMonnth: true },
      { number: 4, events: [], dayIsInThisMonnth: true },
      { number: 5, events: [], dayIsInThisMonnth: true },
      { number: 6, events: [], dayIsInThisMonnth: true },
      { number: 7, events: [], dayIsInThisMonnth: true },
      { number: 8, events: [], dayIsInThisMonnth: true },
      { number: 9, events: [], dayIsInThisMonnth: true },
      { number: 10, events: [], dayIsInThisMonnth: true },
      { number: 11, events: [], dayIsInThisMonnth: true },
      { number: 12, events: [], dayIsInThisMonnth: true },
      { number: 13, events: [], dayIsInThisMonnth: true },
      { number: 14, events: [], dayIsInThisMonnth: true },
      { number: 15, events: [], dayIsInThisMonnth: true },
      { number: 16, events: [], dayIsInThisMonnth: true },
      { number: 17, events: [], dayIsInThisMonnth: true },
      { number: 18, events: [], dayIsInThisMonnth: true },
      { number: 19, events: [], dayIsInThisMonnth: true },
      { number: 20, events: [], dayIsInThisMonnth: true },
      { number: 21, events: [], dayIsInThisMonnth: true },
      { number: 22, events: [], dayIsInThisMonnth: true },
      { number: 23, events: [], dayIsInThisMonnth: true },
      { number: 24, events: [], dayIsInThisMonnth: true },
      { number: 25, events: [], dayIsInThisMonnth: true },
      { number: 26, events: [], dayIsInThisMonnth: true },
      { number: 27, events: [], dayIsInThisMonnth: true },
      { number: 28, events: [], dayIsInThisMonnth: true },
      { number: 29, events: [], dayIsInThisMonnth: true },
      { number: 1, events: [], dayIsInThisMonnth: false },
      { number: 2, events: [], dayIsInThisMonnth: false }
    ]
  },
  {
    name: 'March',
    days: 31,
    rows: 6,
    dates: [
      { number: 25, events: [], dayIsInThisMonnth: false },
      { number: 26, events: [], dayIsInThisMonnth: false },
      { number: 27, events: [], dayIsInThisMonnth: false },
      { number: 28, events: [], dayIsInThisMonnth: false },
      { number: 29, events: [], dayIsInThisMonnth: false },
      { number: 1, events: [], dayIsInThisMonnth: true },
      { number: 2, events: [], dayIsInThisMonnth: true },
      { number: 3, events: [], dayIsInThisMonnth: true },
      { number: 4, events: [], dayIsInThisMonnth: true },
      { number: 5, events: [], dayIsInThisMonnth: true },
      { number: 6, events: [], dayIsInThisMonnth: true },
      { number: 7, events: [], dayIsInThisMonnth: true },
      { number: 8, events: [], dayIsInThisMonnth: true },
      { number: 9, events: [], dayIsInThisMonnth: true },
      { number: 10, events: [], dayIsInThisMonnth: true },
      { number: 11, events: [], dayIsInThisMonnth: true },
      { number: 12, events: [], dayIsInThisMonnth: true },
      { number: 13, events: [], dayIsInThisMonnth: true },
      { number: 14, events: [], dayIsInThisMonnth: true },
      { number: 15, events: [], dayIsInThisMonnth: true },
      { number: 16, events: [], dayIsInThisMonnth: true },
      { number: 17, events: [], dayIsInThisMonnth: true },
      { number: 18, events: [], dayIsInThisMonnth: true },
      { number: 19, events: [], dayIsInThisMonnth: true },
      { number: 20, events: [], dayIsInThisMonnth: true },
      { number: 21, events: [], dayIsInThisMonnth: true },
      { number: 22, events: [], dayIsInThisMonnth: true },
      { number: 23, events: [], dayIsInThisMonnth: true },
      { number: 24, events: [], dayIsInThisMonnth: true },
      { number: 25, events: [], dayIsInThisMonnth: true },
      { number: 26, events: [], dayIsInThisMonnth: true },
      { number: 27, events: [], dayIsInThisMonnth: true },
      { number: 28, events: [], dayIsInThisMonnth: true },
      { number: 29, events: [], dayIsInThisMonnth: true },
      { number: 30, events: [], dayIsInThisMonnth: true },
      { number: 31, events: [], dayIsInThisMonnth: true },
      { number: 1, events: [], dayIsInThisMonnth: false },
      { number: 2, events: [], dayIsInThisMonnth: false },
      { number: 3, events: [], dayIsInThisMonnth: false },
      { number: 4, events: [], dayIsInThisMonnth: false },
      { number: 5, events: [], dayIsInThisMonnth: false },
      { number: 6, events: [], dayIsInThisMonnth: false }
    ]
  },
  {
    name: 'April',
    days: 30,
    rows: 5,
    dates: [
      { number: 31, events: [], dayIsInThisMonnth: false },
      { number: 1, events: [], dayIsInThisMonnth: true },
      { number: 2, events: [], dayIsInThisMonnth: true },
      { number: 3, events: [], dayIsInThisMonnth: true },
      { number: 4, events: [], dayIsInThisMonnth: true },
      { number: 5, events: [], dayIsInThisMonnth: true },
      { number: 6, events: [], dayIsInThisMonnth: true },
      { number: 7, events: [], dayIsInThisMonnth: true },
      { number: 8, events: [], dayIsInThisMonnth: true },
      { number: 9, events: [], dayIsInThisMonnth: true },
      { number: 10, events: [], dayIsInThisMonnth: true },
      { number: 11, events: [], dayIsInThisMonnth: true },
      { number: 12, events: [], dayIsInThisMonnth: true },
      { number: 13, events: [], dayIsInThisMonnth: true },
      { number: 14, events: [], dayIsInThisMonnth: true },
      { number: 15, events: [], dayIsInThisMonnth: true },
      { number: 16, events: [], dayIsInThisMonnth: true },
      { number: 17, events: [], dayIsInThisMonnth: true },
      { number: 18, events: [], dayIsInThisMonnth: true },
      { number: 19, events: [], dayIsInThisMonnth: true },
      { number: 20, events: [], dayIsInThisMonnth: true },
      { number: 21, events: [], dayIsInThisMonnth: true },
      { number: 22, events: [], dayIsInThisMonnth: true },
      { number: 23, events: [], dayIsInThisMonnth: true },
      { number: 24, events: [], dayIsInThisMonnth: true },
      { number: 25, events: [], dayIsInThisMonnth: true },
      { number: 26, events: [], dayIsInThisMonnth: true },
      { number: 27, events: [], dayIsInThisMonnth: true },
      { number: 28, events: [], dayIsInThisMonnth: true },
      { number: 29, events: [], dayIsInThisMonnth: true },
      { number: 30, events: [], dayIsInThisMonnth: true },
      { number: 1, events: [], dayIsInThisMonnth: false },
      { number: 2, events: [], dayIsInThisMonnth: false },
      { number: 3, events: [], dayIsInThisMonnth: false },
      { number: 4, events: [], dayIsInThisMonnth: false }
    ]
  },
  {
    name: 'May',
    days: 31,
    rows: 5,
    dates: [
      { number: 28, events: [], dayIsInThisMonnth: false },
      { number: 29, events: [], dayIsInThisMonnth: false },
      { number: 30, events: [], dayIsInThisMonnth: false },
      { number: 1, events: [], dayIsInThisMonnth: true },
      { number: 2, events: [], dayIsInThisMonnth: true },
      { number: 3, events: [], dayIsInThisMonnth: true },
      { number: 4, events: [], dayIsInThisMonnth: true },
      { number: 5, events: [], dayIsInThisMonnth: true },
      { number: 6, events: [], dayIsInThisMonnth: true },
      { number: 7, events: [], dayIsInThisMonnth: true },
      { number: 8, events: [], dayIsInThisMonnth: true },
      { number: 9, events: [], dayIsInThisMonnth: true },
      { number: 10, events: [], dayIsInThisMonnth: true },
      { number: 11, events: [], dayIsInThisMonnth: true },
      { number: 12, events: [], dayIsInThisMonnth: true },
      { number: 13, events: [], dayIsInThisMonnth: true },
      { number: 14, events: [], dayIsInThisMonnth: true },
      { number: 15, events: [], dayIsInThisMonnth: true },
      { number: 16, events: [], dayIsInThisMonnth: true },
      { number: 17, events: [], dayIsInThisMonnth: true },
      { number: 18, events: [], dayIsInThisMonnth: true },
      { number: 19, events: [], dayIsInThisMonnth: true },
      { number: 20, events: [], dayIsInThisMonnth: true },
      { number: 21, events: [], dayIsInThisMonnth: true },
      { number: 22, events: [], dayIsInThisMonnth: true },
      { number: 23, events: [], dayIsInThisMonnth: true },
      { number: 24, events: [], dayIsInThisMonnth: true },
      { number: 25, events: [], dayIsInThisMonnth: true },
      { number: 26, events: [], dayIsInThisMonnth: true },
      { number: 27, events: [], dayIsInThisMonnth: true },
      { number: 28, events: [], dayIsInThisMonnth: true },
      { number: 29, events: [], dayIsInThisMonnth: true },
      { number: 30, events: [], dayIsInThisMonnth: true },
      { number: 31, events: [], dayIsInThisMonnth: true },
      { number: 1, events: [], dayIsInThisMonnth: false }
    ]
  },
  {
    name: 'June',
    days: 30,
    rows: 6,
    dates: [
      { number: 26, events: [], dayIsInThisMonnth: false },
      { number: 27, events: [], dayIsInThisMonnth: false },
      { number: 28, events: [], dayIsInThisMonnth: false },
      { number: 29, events: [], dayIsInThisMonnth: false },
      { number: 30, events: [], dayIsInThisMonnth: false },
      { number: 31, events: [], dayIsInThisMonnth: false },
      { number: 1, events: [], dayIsInThisMonnth: true },
      { number: 2, events: [], dayIsInThisMonnth: true },
      { number: 3, events: [], dayIsInThisMonnth: true },
      { number: 4, events: [], dayIsInThisMonnth: true },
      { number: 5, events: [], dayIsInThisMonnth: true },
      { number: 6, events: [], dayIsInThisMonnth: true },
      { number: 7, events: [], dayIsInThisMonnth: true },
      { number: 8, events: [], dayIsInThisMonnth: true },
      { number: 9, events: [], dayIsInThisMonnth: true },
      { number: 10, events: [], dayIsInThisMonnth: true },
      { number: 11, events: [], dayIsInThisMonnth: true },
      { number: 12, events: [], dayIsInThisMonnth: true },
      { number: 13, events: [], dayIsInThisMonnth: true },
      { number: 14, events: [], dayIsInThisMonnth: true },
      { number: 15, events: [], dayIsInThisMonnth: true },
      { number: 16, events: [], dayIsInThisMonnth: true },
      { number: 17, events: [], dayIsInThisMonnth: true },
      { number: 18, events: [], dayIsInThisMonnth: true },
      { number: 19, events: [], dayIsInThisMonnth: true },
      { number: 20, events: [], dayIsInThisMonnth: true },
      { number: 21, events: [], dayIsInThisMonnth: true },
      { number: 22, events: [], dayIsInThisMonnth: true },
      { number: 23, events: [], dayIsInThisMonnth: true },
      { number: 24, events: [], dayIsInThisMonnth: true },
      { number: 25, events: [], dayIsInThisMonnth: true },
      { number: 26, events: [], dayIsInThisMonnth: true },
      { number: 27, events: [], dayIsInThisMonnth: true },
      { number: 28, events: [], dayIsInThisMonnth: true },
      { number: 29, events: [], dayIsInThisMonnth: true },
      { number: 30, events: [], dayIsInThisMonnth: true },
      { number: 1, events: [], dayIsInThisMonnth: false },
      { number: 2, events: [], dayIsInThisMonnth: false },
      { number: 3, events: [], dayIsInThisMonnth: false },
      { number: 4, events: [], dayIsInThisMonnth: false },
      { number: 5, events: [], dayIsInThisMonnth: false },
      { number: 6, events: [], dayIsInThisMonnth: false }
    ]
  },
  {
    name: 'July',
    days: 31,
    rows: 5,
    dates: [
      { number: 30, events: [], dayIsInThisMonnth: false },
      { number: 31, events: [], dayIsInThisMonnth: false },
      { number: 1, events: [], dayIsInThisMonnth: true },
      { number: 2, events: [], dayIsInThisMonnth: true },
      { number: 3, events: [], dayIsInThisMonnth: true },
      { number: 4, events: [], dayIsInThisMonnth: true },
      { number: 5, events: [], dayIsInThisMonnth: true },
      { number: 6, events: [], dayIsInThisMonnth: true },
      { number: 7, events: [], dayIsInThisMonnth: true },
      { number: 8, events: [], dayIsInThisMonnth: true },
      { number: 9, events: [], dayIsInThisMonnth: true },
      { number: 10, events: [], dayIsInThisMonnth: true },
      { number: 11, events: [], dayIsInThisMonnth: true },
      { number: 12, events: [], dayIsInThisMonnth: true },
      { number: 13, events: [], dayIsInThisMonnth: true },
      { number: 14, events: [], dayIsInThisMonnth: true },
      { number: 15, events: [], dayIsInThisMonnth: true },
      { number: 16, events: [], dayIsInThisMonnth: true },
      { number: 17, events: [], dayIsInThisMonnth: true },
      { number: 18, events: [], dayIsInThisMonnth: true },
      { number: 19, events: [], dayIsInThisMonnth: true },
      { number: 20, events: [], dayIsInThisMonnth: true },
      { number: 21, events: [], dayIsInThisMonnth: true },
      { number: 22, events: [], dayIsInThisMonnth: true },
      { number: 23, events: [], dayIsInThisMonnth: true },
      { number: 24, events: [], dayIsInThisMonnth: true },
      { number: 25, events: [], dayIsInThisMonnth: true },
      { number: 26, events: [], dayIsInThisMonnth: true },
      { number: 27, events: [], dayIsInThisMonnth: true },
      { number: 28, events: [], dayIsInThisMonnth: true },
      { number: 29, events: [], dayIsInThisMonnth: true },
      { number: 30, events: [], dayIsInThisMonnth: true },
      { number: 31, events: [], dayIsInThisMonnth: true },
      { number: 1, events: [], dayIsInThisMonnth: false },
      { number: 2, events: [], dayIsInThisMonnth: false },
      { number: 3, events: [], dayIsInThisMonnth: false }
    ]
  },
  {
    name: 'August',
    days: 31,
    rows: 5,
    dates: [
      { number: 28, events: [], dayIsInThisMonnth: false },
      { number: 29, events: [], dayIsInThisMonnth: false },
      { number: 30, events: [], dayIsInThisMonnth: false },
      { number: 31, events: [], dayIsInThisMonnth: false },
      { number: 1, events: [], dayIsInThisMonnth: true },
      { number: 2, events: [], dayIsInThisMonnth: true },
      { number: 3, events: [], dayIsInThisMonnth: true },
      { number: 4, events: [], dayIsInThisMonnth: true },
      { number: 5, events: [], dayIsInThisMonnth: true },
      { number: 6, events: [], dayIsInThisMonnth: true },
      { number: 7, events: [], dayIsInThisMonnth: true },
      { number: 8, events: [], dayIsInThisMonnth: true },
      { number: 9, events: [], dayIsInThisMonnth: true },
      { number: 10, events: [], dayIsInThisMonnth: true },
      { number: 11, events: [], dayIsInThisMonnth: true },
      { number: 12, events: [], dayIsInThisMonnth: true },
      { number: 13, events: [], dayIsInThisMonnth: true },
      { number: 14, events: [], dayIsInThisMonnth: true },
      { number: 15, events: [], dayIsInThisMonnth: true },
      { number: 16, events: [], dayIsInThisMonnth: true },
      { number: 17, events: [], dayIsInThisMonnth: true },
      { number: 18, events: [], dayIsInThisMonnth: true },
      { number: 19, events: [], dayIsInThisMonnth: true },
      { number: 20, events: [], dayIsInThisMonnth: true },
      { number: 21, events: [], dayIsInThisMonnth: true },
      { number: 22, events: [], dayIsInThisMonnth: true },
      { number: 23, events: [], dayIsInThisMonnth: true },
      { number: 24, events: [], dayIsInThisMonnth: true },
      { number: 25, events: [{ id: 1, name: 'Pouyan Birthday' }], dayIsInThisMonnth: true },
      { number: 26, events: [], dayIsInThisMonnth: true },
      { number: 27, events: [], dayIsInThisMonnth: true },
      { number: 28, events: [], dayIsInThisMonnth: true },
      { number: 29, events: [], dayIsInThisMonnth: true },
      { number: 30, events: [], dayIsInThisMonnth: true },
      { number: 31, events: [], dayIsInThisMonnth: true },
      { number: 1, events: [], dayIsInThisMonnth: false },
      { number: 2, events: [], dayIsInThisMonnth: false },
      { number: 3, events: [], dayIsInThisMonnth: false }
    ]
  },
  {
    name: 'September',
    days: 30,
    rows: 5,
    dates: [
      { number: 1, events: [], dayIsInThisMonnth: true },
      { number: 2, events: [], dayIsInThisMonnth: true },
      { number: 3, events: [], dayIsInThisMonnth: true },
      { number: 4, events: [], dayIsInThisMonnth: true },
      { number: 5, events: [], dayIsInThisMonnth: true },
      { number: 6, events: [], dayIsInThisMonnth: true },
      { number: 7, events: [], dayIsInThisMonnth: true },
      { number: 8, events: [], dayIsInThisMonnth: true },
      { number: 9, events: [], dayIsInThisMonnth: true },
      { number: 10, events: [], dayIsInThisMonnth: true },
      { number: 11, events: [], dayIsInThisMonnth: true },
      { number: 12, events: [], dayIsInThisMonnth: true },
      { number: 13, events: [], dayIsInThisMonnth: true },
      { number: 14, events: [], dayIsInThisMonnth: true },
      { number: 15, events: [], dayIsInThisMonnth: true },
      { number: 16, events: [], dayIsInThisMonnth: true },
      { number: 17, events: [], dayIsInThisMonnth: true },
      { number: 18, events: [], dayIsInThisMonnth: true },
      { number: 19, events: [], dayIsInThisMonnth: true },
      { number: 20, events: [], dayIsInThisMonnth: true },
      { number: 21, events: [], dayIsInThisMonnth: true },
      { number: 22, events: [], dayIsInThisMonnth: true },
      { number: 23, events: [], dayIsInThisMonnth: true },
      { number: 24, events: [], dayIsInThisMonnth: true },
      { number: 25, events: [], dayIsInThisMonnth: true },
      { number: 26, events: [], dayIsInThisMonnth: true },
      { number: 27, events: [], dayIsInThisMonnth: true },
      { number: 28, events: [], dayIsInThisMonnth: true },
      { number: 29, events: [], dayIsInThisMonnth: true },
      { number: 30, events: [], dayIsInThisMonnth: true },
      { number: 1, events: [], dayIsInThisMonnth: false },
      { number: 2, events: [], dayIsInThisMonnth: false },
      { number: 3, events: [], dayIsInThisMonnth: false },
      { number: 4, events: [], dayIsInThisMonnth: false },
      { number: 5, events: [], dayIsInThisMonnth: false }
    ]
  },
  {
    name: 'October',
    days: 31,
    rows: 5,
    dates: [
      { number: 29, events: [], dayIsInThisMonnth: false },
      { number: 30, events: [], dayIsInThisMonnth: false },
      { number: 1, events: [], dayIsInThisMonnth: true },
      { number: 2, events: [], dayIsInThisMonnth: true },
      { number: 3, events: [], dayIsInThisMonnth: true },
      { number: 4, events: [], dayIsInThisMonnth: true },
      { number: 5, events: [], dayIsInThisMonnth: true },
      { number: 6, events: [], dayIsInThisMonnth: true },
      { number: 7, events: [], dayIsInThisMonnth: true },
      { number: 8, events: [], dayIsInThisMonnth: true },
      { number: 9, events: [], dayIsInThisMonnth: true },
      { number: 10, events: [], dayIsInThisMonnth: true },
      { number: 11, events: [], dayIsInThisMonnth: true },
      { number: 12, events: [], dayIsInThisMonnth: true },
      { number: 13, events: [], dayIsInThisMonnth: true },
      { number: 14, events: [], dayIsInThisMonnth: true },
      { number: 15, events: [], dayIsInThisMonnth: true },
      { number: 16, events: [], dayIsInThisMonnth: true },
      { number: 17, events: [], dayIsInThisMonnth: true },
      { number: 18, events: [], dayIsInThisMonnth: true },
      { number: 19, events: [], dayIsInThisMonnth: true },
      { number: 20, events: [], dayIsInThisMonnth: true },
      { number: 21, events: [], dayIsInThisMonnth: true },
      { number: 22, events: [], dayIsInThisMonnth: true },
      { number: 23, events: [], dayIsInThisMonnth: true },
      { number: 24, events: [], dayIsInThisMonnth: true },
      { number: 25, events: [], dayIsInThisMonnth: true },
      { number: 26, events: [], dayIsInThisMonnth: true },
      { number: 27, events: [], dayIsInThisMonnth: true },
      { number: 28, events: [], dayIsInThisMonnth: true },
      { number: 29, events: [], dayIsInThisMonnth: true },
      { number: 30, events: [], dayIsInThisMonnth: true },
      { number: 31, events: [], dayIsInThisMonnth: true },
      { number: 1, events: [], dayIsInThisMonnth: false },
      { number: 2, events: [], dayIsInThisMonnth: false }
    ]
  },
  {
    name: 'November',
    days: 30,
    rows: 5,
    dates: [
      { number: 27, events: [], dayIsInThisMonnth: false },
      { number: 28, events: [], dayIsInThisMonnth: false },
      { number: 29, events: [], dayIsInThisMonnth: false },
      { number: 30, events: [], dayIsInThisMonnth: false },
      { number: 31, events: [], dayIsInThisMonnth: false },
      { number: 1, events: [], dayIsInThisMonnth: true },
      { number: 2, events: [], dayIsInThisMonnth: true },
      { number: 3, events: [], dayIsInThisMonnth: true },
      { number: 4, events: [], dayIsInThisMonnth: true },
      { number: 5, events: [], dayIsInThisMonnth: true },
      { number: 6, events: [], dayIsInThisMonnth: true },
      { number: 7, events: [], dayIsInThisMonnth: true },
      { number: 8, events: [], dayIsInThisMonnth: true },
      { number: 9, events: [], dayIsInThisMonnth: true },
      { number: 10, events: [], dayIsInThisMonnth: true },
      { number: 11, events: [], dayIsInThisMonnth: true },
      { number: 12, events: [], dayIsInThisMonnth: true },
      { number: 13, events: [], dayIsInThisMonnth: true },
      { number: 14, events: [], dayIsInThisMonnth: true },
      { number: 15, events: [], dayIsInThisMonnth: true },
      { number: 16, events: [], dayIsInThisMonnth: true },
      { number: 17, events: [], dayIsInThisMonnth: true },
      { number: 18, events: [], dayIsInThisMonnth: true },
      { number: 19, events: [], dayIsInThisMonnth: true },
      { number: 20, events: [], dayIsInThisMonnth: true },
      { number: 21, events: [], dayIsInThisMonnth: true },
      { number: 22, events: [], dayIsInThisMonnth: true },
      { number: 23, events: [], dayIsInThisMonnth: true },
      { number: 24, events: [], dayIsInThisMonnth: true },
      { number: 25, events: [], dayIsInThisMonnth: true },
      { number: 26, events: [], dayIsInThisMonnth: true },
      { number: 27, events: [], dayIsInThisMonnth: true },
      { number: 28, events: [], dayIsInThisMonnth: true },
      { number: 29, events: [], dayIsInThisMonnth: true },
      { number: 30, events: [], dayIsInThisMonnth: true }
    ]
  },
  {
    name: 'December',
    days: 31,
    rows: 5,
    dates: [
      { number: 1, events: [], dayIsInThisMonnth: true },
      { number: 2, events: [], dayIsInThisMonnth: true },
      { number: 3, events: [], dayIsInThisMonnth: true },
      { number: 4, events: [], dayIsInThisMonnth: true },
      { number: 5, events: [], dayIsInThisMonnth: true },
      { number: 6, events: [], dayIsInThisMonnth: true },
      { number: 7, events: [], dayIsInThisMonnth: true },
      { number: 8, events: [], dayIsInThisMonnth: true },
      { number: 9, events: [], dayIsInThisMonnth: true },
      { number: 10, events: [], dayIsInThisMonnth: true },
      { number: 11, events: [], dayIsInThisMonnth: true },
      { number: 12, events: [], dayIsInThisMonnth: true },
      { number: 13, events: [], dayIsInThisMonnth: true },
      { number: 14, events: [], dayIsInThisMonnth: true },
      { number: 15, events: [], dayIsInThisMonnth: true },
      { number: 16, events: [], dayIsInThisMonnth: true },
      { number: 17, events: [], dayIsInThisMonnth: true },
      { number: 18, events: [], dayIsInThisMonnth: true },
      { number: 19, events: [], dayIsInThisMonnth: true },
      { number: 20, events: [], dayIsInThisMonnth: true },
      { number: 21, events: [], dayIsInThisMonnth: true },
      { number: 22, events: [], dayIsInThisMonnth: true },
      { number: 23, events: [], dayIsInThisMonnth: true },
      { number: 24, events: [], dayIsInThisMonnth: true },
      { number: 25, events: [], dayIsInThisMonnth: true },
      { number: 26, events: [], dayIsInThisMonnth: true },
      { number: 27, events: [], dayIsInThisMonnth: true },
      { number: 28, events: [], dayIsInThisMonnth: true },
      { number: 29, events: [], dayIsInThisMonnth: true },
      { number: 30, events: [], dayIsInThisMonnth: true },
      { number: 31, events: [], dayIsInThisMonnth: true },
      { number: 1, events: [], dayIsInThisMonnth: false },
      { number: 2, events: [], dayIsInThisMonnth: false },
      { number: 3, events: [], dayIsInThisMonnth: false },
      { number: 4, events: [], dayIsInThisMonnth: false }
    ]
  }
])

const daySelected = ref(new Date().getDate())

const currentMonth = ref(new Date().getMonth())
const getMonth = computed(() => months.value[currentMonth.value])
function getCellValue(row, column) {
  return (row - 1) * 7 + column - 1
}
function changeMonth(direction) {
  if (direction === 'next' && currentMonth.value < 11) {
    currentMonth.value++
    daySelected.value = 1
  } else if (direction === 'perv' && currentMonth.value > 0) {
    currentMonth.value--
    daySelected.value = 1
  }
}
const getEventsForADay = (day) => {
  return getMonth.value.dates[day].events
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
        <td
          v-for="m in 7"
          :key="m"
          :class="{
            thisMonth: getMonth.dates[getCellValue(n, m)].dayIsInThisMonnth,
            notThisMonth: !getMonth.dates[getCellValue(n, m)].dayIsInThisMonnth,
            selected:
              getMonth.dates[getCellValue(n, m)].number === daySelected &&
              getMonth.dates[getCellValue(n, m)].dayIsInThisMonnth
          }"
          @click="daySelected = getMonth.dates[getCellValue(n, m)].number"
        >
          {{ getMonth.dates[getCellValue(n, m)].number }}
          <div v-if="getMonth.dates[getCellValue(n, m)].events.length > 0">
            <div v-for="event in getEventsForADay(getCellValue(n, m))" :key="event.id">
              {{ event.name }}
            </div>
          </div>
        </td>
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

.notThisMonth {
  background-color: lightgray;
}

.thisMonth {
  background-color: white;
}

.thisMonth:hover {
  background-color: lightblue;
}

.selected {
  background-color: lightgreen;
}

.table {
  width: 100%;
  height: 85%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 10px;
  width: 14.28%;
  text-align: center;
}
</style>
