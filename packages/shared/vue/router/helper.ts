import { type App } from 'vue'
import { type Router } from 'vue-router'

export const setupRouter = (app: App, router: Router) => {
  app.use(router)
}
