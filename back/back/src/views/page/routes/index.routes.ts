import { defineRoutes } from '@/router/utils/helper'

export default defineRoutes({
  path: 'page',
  component: () => import('@page/page.view.vue')
})
