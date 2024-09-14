import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import wujieVue3 from 'wujie-vue3'



const app = createApp(App)

app.use(wujieVue3)

app.mount('#app')
