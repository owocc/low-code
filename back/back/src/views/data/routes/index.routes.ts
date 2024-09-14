import { defineRoutes } from '@/router/utils/helper'

export default defineRoutes({
  path: 'data',
  component: () => import('@data/data.view.vue')
})
