import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { initPrimeVue } from './initialization/primeVue'
import '@clicknext/ui/dist/style.css'
import { createPinia } from 'pinia'
import ClicknextUI from '@clicknext/ui'

const pinia = createPinia()
const app = createApp(App) 

initPrimeVue(app)
app.use(pinia)
app.use(router);
app.use(ClicknextUI, {
    componentsGlobal: true
  })

app.mount('#app')
