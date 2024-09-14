<script setup lang="ts">
import * as AppComp from './components/app'
</script>
<template>
  <div class="flex p-2 gap-2 flex-col w-screen h-screen overflow-hidden ">
    <AppComp.Toolbar />
    <main class="flex flex-1 gap-2">
      <AppComp.Container>
        <template #footer>
          <AppComp.Footer />
        </template>
      </AppComp.Container>
      <div class="w-72 rounded-lg border flex-shrink-0 h-full">
      </div>
    </main>
  </div>
</template>
