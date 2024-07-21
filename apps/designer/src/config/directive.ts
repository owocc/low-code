import { type App } from 'vue'
import Tooltip from 'primevue/tooltip'

export const setupDirective = (app: App) => {
  app.directive('tooltip', Tooltip)
}
