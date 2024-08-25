<script setup>
import { reactive, ref } from 'vue'
import { months, getOffSetOfMonth } from '@/utils/months'
import { submitEdit, errors, eventResponse, sendingEvent } from '@/utils/events'
import { countries } from '@/utils/countries'
import { hideEditEventOverlay } from '@/utils/editEventOverlay'

const props = defineProps({
  eventToEdit: { type: Object, required: true },
})
</script>
<template>
  <div id="edit-event-container" @click.self="hideEditEventOverlay">
    <div id="edit-event-card">
      <div>
        <form @submit.prevent="submitEdit($event, eventToEdit)">
          <div>
            <label for="name-input">Name</label> <input type="text" name="name-input" id="name-input" :value="eventToEdit.name" />
            <div v-if="errors.name" class="error">{{ errors.name }}</div>
          </div>
          <div>
            <label for="details-input">Details</label><textarea name="details-input" id="details-input" :value="eventToEdit.description"></textarea>
            <div v-if="errors.description" class="error">{{ errors.description }}</div>
          </div>
          <div id="class-inputs">
            <input type="number" name="day" class="day" :value="eventToEdit.dayNumber" />/
            <select name="month" class="month">
              <option v-for="(month, index) in months" :key="index" :value="index" :selected="index == eventToEdit.month">
                {{ month.name }}
              </option>
            </select>
            <div v-if="errors.date" class="error">{{ errors.date }}</div>
          </div>
          <div>
            <label for="country">Select Country: </label>
            <select name="country" id="country" @change="errors.country = null">
              <option v-for="(country, index) in countries" :key="index" :value="index" :selected="index == eventToEdit.country">
                {{ country.name }}
              </option>
            </select>
            <div v-if="errors.country" class="error">{{ errors.country }}</div>
          </div>
          <div>
            <label for="holiday">Is this day a holiday in that country?</label>
            <select name="holiday" id="holiday">
              <option value="true" :selected="eventToEdit.holiday == true">Yes</option>
              <option value="false" :selected="eventToEdit.holiday == false">No</option>
            </select>
            <div v-if="errors.holiday" class="error">{{ errors.holiday }}</div>
          </div>

          <div>
            <label for="source">Source(Optional): </label>
            <input type="url" name="source" id="source" :value="eventToEdit.source" />
            <div v-if="errors.source" class="error">{{ errors.source }}</div>
          </div>
          <div id="buttons"><button type="submit">Save</button> <button @click.prevent="hideEditEventOverlay">Cancel</button></div>
          <svg v-if="sendingEvent" class="spinner" width="30px" height="30px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg
          ><br />
          <div id="event-result" :class="{ error: !eventResponse.status, success: eventResponse.status }" v-if="eventResponse.show">
            {{ eventResponse.message }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
#edit-event-container {
  height: 100vh;
  width: 100vw;
}

#edit-event-card {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 50%;
  height: fit-content;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

form {
  display: flex;
  flex-direction: column;
}

form #name-input {
  width: 50%;
}

form > div {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
}

form > #class-inputs {
  display: flex;
  flex-direction: row;
}

form > #class-inputs > input {
  width: 50px;
  margin-right: 5px;
}

form > div#buttons {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

form > div#buttons > button {
  width: 100px;
  height: 30px;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  border: none;
}

label {
  font-size: 1.2em;
  margin-bottom: 5px;
}

textarea {
  height: 100px;
}
</style>
