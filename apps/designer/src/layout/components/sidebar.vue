<script setup lang="ts">
import { ref } from 'vue'
import Menu from 'primevue/menu'
import Logo from '@/components/icons/logo.vue'
import Tag from 'primevue/tag'
import Badge from 'primevue/badge'
const items = ref([
  {
    separator: true
  },
  {
    label: '导航',
    items: [
      {
        label: '页面',
        icon: 'i-lucide-file'
        // shortcut: '⌘+L'
      },
      {
        label: '逻辑',
        icon: 'i-lucide-bring-to-front'
        // shortcut: '⌘+S'
      },
      {
        label: '数据',
        icon: 'i-lucide-database'
        // shortcut: '⌘+S'
      },
      {
        label: '流程',
        icon: 'i-lucide-bar-chart-horizontal-big'
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
        icon: 'i-lucide-circle-fading-plus'
      }
    ]
  }
])
</script>

<template>
  <div class="card flex justify-center">
    <Menu :model="items" class="w-full md:w-60">
      <template #start>
        <span class="inline-flex items-center gap-1 px-2 py-2">
          <Logo class="h-6" />
          <span class="text-xl font-semibold">低代码平台</span>
          <Tag>测试</Tag>
        </span>
      </template>
      <template #submenulabel="{ item }">
        <span class="text-primary font-bold">{{ item.label }}</span>
      </template>

      <template #item="{ item, props }">
        <!-- v-ripple -->
        <a class="flex items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
          <span
            v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
        </a>
      </template>
      <!-- adbout -->
      <template #end>
        <!-- v-ripple -->
        <a
          href="/"
          class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200"
        >
          <span class="inline-flex flex-col items-start">
            <a
              href="https://github.com/Neo-Library"
              class="font-bold hover:text-primary transition-colors"
              >Neolibrary</a
            >
            <a class="text-sm text-primary" href="https://github.com/owocc">@owocc</a>
          </span>
        </a>
      </template>
    </Menu>
  </div>
</template>
