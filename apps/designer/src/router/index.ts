import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { type App } from 'vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/flow',
    component: () => import('@/layout/layout.vue'),
    children: [
      {
        path: 'flow',
        component: () => import('@/views/flow/flow-view.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

export const setupRouter = (app: App) => {
  app.use(router)
}
