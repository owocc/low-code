import { defineRoutes } from '@/router/utils/helper'

export default defineRoutes({
  path: 'flow',
  component: () => import('@flow/flow.view.vue')
})
