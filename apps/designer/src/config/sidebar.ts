import type { MenuItem } from 'primevue/menuitem'
import type { RouteLocationRaw } from 'vue-router'
export interface SidebarItem extends MenuItem {
  to?: RouteLocationRaw | string
  items?: Array<SidebarItem> | undefined
}

export const sidebarInitData: Array<SidebarItem> = [
  {
    separator: true
  },
  {
    label: '导航',
    items: [
      {
        label: '页面',
        icon: 'i-lucide-file',
        to: '/page'
        // shortcut: 'option+p'
      },
      {
        label: '逻辑',
        icon: 'i-lucide-bring-to-front',
        to: '/flow'
        // shortcut: 'option+l'
      },
      {
        label: '数据',
        icon: 'i-lucide-database',
        to: '/data'
        // shortcut: 'option+d'
      },
      {
        label: '流程',
        icon: 'i-lucide-bar-chart-horizontal-big',
        to: '/process'
      }
    ]
  },
  {
    separator: true
  },
  {
    label: '页面结构',
    items: [
      {
        label: '还未开发',
        icon: 'i-lucide-circle-fading-plus',
        to: '/notfound'
      }
    ]
  }
]
