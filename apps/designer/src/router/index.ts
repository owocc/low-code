import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { type App } from 'vue'
import { loadViewRoutes } from './modules'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/layout/layout.vue'),
    children: [...loadViewRoutes()]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

/** 加载路由 */
export const setupRouter = (app: App) => {
  app.use(router)
}
