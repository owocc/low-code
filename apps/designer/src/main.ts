import './assets/main.css'
import { createApp } from 'vue'
import { setupUILibrary } from '@/config'
import App from './app.vue'
import { setupStore } from './stores'
import { setupDirective } from './config/directive'
const bootstrap = () => {
  const app = createApp(App)
  setupUILibrary(app)
  setupStore(app)
  setupDirective(app)
  app.mount('#app')
}

bootstrap()
