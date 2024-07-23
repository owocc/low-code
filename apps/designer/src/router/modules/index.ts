import { type RouteRecordRaw } from 'vue-router'
// 一些额外的路由配置啥的

const importRoutesModules = import.meta.glob('@/views/**/routes/index.routes.{js,ts}', {
  eager: true,
  import: 'default'
})

export const loadViewRoutes = () => {
  const viewRoutes: Array<RouteRecordRaw> = []
  for (const path in importRoutesModules) {
    const routes = importRoutesModules[path] as RouteRecordRaw
    viewRoutes.push(routes)
  }
  return viewRoutes
}
