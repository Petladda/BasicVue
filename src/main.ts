import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { initPrimeVue } from './initialization/primeVue'





const app = createApp(App) 

initPrimeVue(app)
app.use(router);


app.mount('#app')
