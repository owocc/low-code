<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/sidebar.vue'
import RightPanel from './components/right-panel.vue'
</script>
<template>
  <div class="flex w-screen h-screen overflow-hidden p-1 gap-1">
    <div class="flex gap-1 w-full h-full">
      <Sidebar />
      <main class="flex-1 card">
        <RouterView />
      </main>
    </div>

    <div class="w-60 h-full card">
      <RightPanel />
    </div>
  </div>
</template>
