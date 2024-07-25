import { createRouter, createWebHistory } from 'vue-router'
import {} from 'utils/router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home'
      // component:
    }
  ]
})

export default router
