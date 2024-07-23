<script setup lang="ts">
import Button from 'primevue/button'
import ButtonGroup from 'primevue/buttongroup'
import { computed } from 'vue'
import { useVueFlow } from '@vue-flow/core'
const { fitView, zoomIn, zoomOut, getViewport } = useVueFlow()

const onZoomInHandler = () => {
  zoomIn({
    duration: 350
  })
}

const onZoomOutHandler = () => {
  zoomOut({
    duration: 350
  })
}

function onFitViewHandler() {
  fitView({
    duration: 500
  })
}
const scaleSize = computed(() => getViewport().zoom.toFixed(2))
</script>
<template>
  <div class="absolute z-10 right-0 bottom-0 m-1 flex gap-1">
    <ButtonGroup class="bg-primary rounded-full flex items-center">
      <Button
        v-tooltip="{ value: '搜索' }"
        icon="i-lucide-search"
        @click="onZoomInHandler"
        rounded
      />

      <div class="text-white text-sm w-10 text-center">
        {{ scaleSize }}
      </div>
      <Button icon="i-lucide-plus" @click="onZoomInHandler" rounded />
      <Button icon="i-lucide-minus" @click="onZoomOutHandler" rounded />

      <Button icon="i-lucide-scan" @click="onFitViewHandler" rounded />
      <Button icon="i-lucide-arrow-right-from-line" rounded />
    </ButtonGroup>
  </div>
</template>
