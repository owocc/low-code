import { type App } from 'vue'
import PrimeVue from 'primevue/config'
// import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'

export const setupUILibrary = (app: App) => {
  // const Theme = definePreset(Aura, {})
  app.use(PrimeVue, {
    unstyled: true
  })
}
