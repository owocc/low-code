<script setup lang="ts">
// import { type MenuItem } from 'primevue/menuitem'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import Menu from 'primevue/menu'
import Logo from '@/components/icons/logo.vue'
import Tag from 'primevue/tag'
import Badge from 'primevue/badge'
import { sidebarInitData } from '@/config/sidebar'
const items = ref(sidebarInitData)
</script>

<template>
  <div class="card flex justify-center">
    <Menu :model="items" class="w-full md:w-60 overflow-y-auto">
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
        <RouterLink
          class="flex items-center"
          v-bind="props.action"
          :to="item.to"
          active-class="bg-primary text-white rounded"
        >
          <template #default="{ isActive }">
            <span :class="{ [item.icon]: true, 'text-white': isActive }" />
            <span
              :class="{
                'text-white': isActive
              }"
              >{{ item.label }}</span
            >
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            <span
              v-if="item.shortcut"
              class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
              >{{ item.shortcut }}</span
            >
          </template>
        </RouterLink>
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
