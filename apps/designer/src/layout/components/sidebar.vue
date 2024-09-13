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
  <div class="card w-12 border rounded-lg flex justify-center">

  </div>
</template>
