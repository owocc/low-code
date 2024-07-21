import { type App } from 'vue'
import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config'
import Theme from '@primevue/themes/aura'

export const setupUILibrary = (app: App) => {
  const config: PrimeVueConfiguration = {
    theme: {
      preset: Theme,
      options: {}
      // options:{
      //   darkModeSelector: 'light',
      // }
    }
  }
  app.use(PrimeVue, config)
}
