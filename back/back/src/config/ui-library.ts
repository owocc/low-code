import { type App } from 'vue'
import PrimeVue from 'primevue/config'
// import UI from '@/ui'
export const setupUILibrary = (app: App) => {
  // const Theme = definePreset(Aura, {})
  app.use(PrimeVue, {
    unstyled: true,
    // pt: UI
  })
}
