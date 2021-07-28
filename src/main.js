import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import BaseCard from './components/BaseCard.vue'
// createApp(App).mount('#app')

const app = createApp(App)
app.component('base-card', BaseCard)
app.mount('#app')
