import { defineRoutes } from '@/router/utils/helper'

export default defineRoutes({
  path: 'process',
  component: () => import('@process/process.view.vue')
})
