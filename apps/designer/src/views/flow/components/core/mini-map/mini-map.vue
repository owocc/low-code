<script setup lang="ts">
import { MiniMap, MiniMapNode } from '@vue-flow/minimap'
</script>
<template>
  <MiniMap>
    <template #node-input="props">
      <MiniMapNode v-bind="props" />
    </template>
    <!-- <div class="bg-primary p-2"></div> -->
  </MiniMap>
</template>
