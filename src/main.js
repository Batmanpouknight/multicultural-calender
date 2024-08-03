import { createApp } from 'vue'
import App from './App.vue'
import Calender from './components/CalenderInterface.vue'
import CreateEvent from './components/CreateEvent.vue'

createApp(App).component('Calender', Calender).component('CreateEvent', CreateEvent).mount('#app')
