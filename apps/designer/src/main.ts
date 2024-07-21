import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupUILibrary } from '@/config'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './stores'
import { setupDirective } from './config/directive'
const bootstrap = () => {
  const app = createApp(App)
  setupUILibrary(app)
  setupStore(app)
  setupRouter(app)
  setupDirective(app)
  app.mount('#app')
}

bootstrap()
