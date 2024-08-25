<script setup>
import { errors, addEvent, eventResponse, sendingEvent } from '@/utils/events'
import { currentDay, currentMonth } from '@/utils/currentDay'
import { months } from '@/utils/months'
import { countries, toggleCountry } from '@/utils/countries'
import { loggedIn } from '@/utils/user'
</script>

<template>
  <div class="container">
    <div id="countries">
      Countries:
      <div v-for="country in countries" :key="country.id" class="country" @click="toggleCountry(country.id)">
        <input type="checkbox" :name="country.name" :value="country.name" :checked="country.selected" />
        <label :for="country.name">
          {{ country.name }}
        </label>
      </div>
    </div>

    <div class="new-event" v-if="loggedIn">
      <form @submit.prevent="addEvent">
        <div style="margin-top: 0">
          <label for="name">Name: </label>
          <input type="text" class="name" name="name" @change="errors.name = null" />
          <div v-if="errors.name" class="error">{{ errors.name }}</div>
        </div>

        <div>
          <div>
            <input type="number" name="day" class="day" :value="currentDay" />/
            <select name="month" class="month">
              <option v-for="(month, index) in months" :key="index" :value="index" :selected="index == currentMonth">
                {{ month.name }}
              </option>
            </select>
          </div>

          <div v-if="errors.date" class="error">{{ errors.date }}</div>
        </div>

        <div>
          <label for="description">Description: </label>
          <textarea name="description" id="description" @change="errors.description = null"></textarea>
          <div v-if="errors.description" class="error">{{ errors.description }}</div>
        </div>

        <div>
          <label for="country">Select Country: </label>
          <select name="country" id="country" @change="errors.country = null">
            <option value="default" selected disabled>Choose an option</option>
            <option v-for="(country, index) in countries" :key="index" :value="index">
              {{ country.name }}
            </option>
          </select>
          <div v-if="errors.country" class="error">{{ errors.country }}</div>
        </div>

        <div>
          <label for="holiday">Is this day a holiday in that country?</label>
          <select name="holiday" id="holiday">
            <option value="default" selected disabled>Choose an option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <div v-if="errors.holiday" class="error">{{ errors.holiday }}</div>
        </div>

        <div>
          <label for="source">Source(Optional): </label>
          <input type="url" name="source" id="source" />
          <div v-if="errors.source" class="error">{{ errors.source }}</div>
        </div>

        <button type="submit" id="submit-event">Add Event</button>
        <svg v-if="sendingEvent" class="spinner" width="30px" height="30px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg
        ><br />
        <div id="event-result" :class="{ error: !eventResponse.status, success: eventResponse.status }" v-if="eventResponse.show">
          {{ eventResponse.message }}
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container > * {
  margin-top: 20px;
}

.country {
  margin-left: 10px;
  cursor: pointer;
  user-select: none;
  width: fit-content;
}

.country:hover {
  animation: grow 0.5s forwards;
}

.success {
  width: fit-content;
  margin-top: 5px;
  color: green;
}

form > div {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

form > u {
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
}

.day {
  width: 35px;
}

.month {
  width: 85px;
  font-size: 12px;
}

#country {
  width: fit-content;
}

#submit-event {
  background-color: #4caf50;
  color: white;
  height: 40px;
  width: 100px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

#submit-event:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

#submit-event:hover {
  background-color: green;
}

select {
  background-color: rgba(0, 0, 0, 0.22);
  border: none;
  width: fit-content;
}

@keyframes grow {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.25);
  }
}
</style>
