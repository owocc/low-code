<script setup lang="ts">
import Button from 'primevue/button'
import ButtonGroup from 'primevue/buttongroup'
import { computed, ref } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import Dock from 'primevue/dock'

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

const items = ref([
  {
    label: 'Finder',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/finder.svg'
    // command: () => {
    //   displayFinder.value = true
    // }
  },
  {
    label: 'Terminal',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/terminal.svg'
    // command: () => {
    //   displayTerminal.value = true
    // }
  },
  {
    label: 'App Store',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/appstore.svg'
    // command: () => {
    //   toast.add({
    //     severity: 'error',
    //     summary: 'An unexpected error occurred while signing in.',
    //     detail: 'UNTRUSTED_CERT_TITLE',
    //     group: 'tc',
    //     life: 3000
    //   })
    // }
  },
  {
    label: 'Safari',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/safari.svg'
    // command: () => {
    //   toast.add({
    //     severity: 'warn',
    //     summary: 'Safari has stopped working',
    //     group: 'tc',
    //     life: 3000
    //   })
    // }
  },
  {
    label: 'Photos',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/photos.svg'
    // command: () => {
    //   displayPhotos.value = true
    // }
  },
  {
    label: 'GitHub',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/github.svg'
  },
  {
    label: 'Trash',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/trash.png'
    // command: () => {
    //   toast.add({ severity: 'info', summary: 'Empty Trash', life: 3000 })
    // }
  }
])
</script>
<template>
  <div
    class="z-50 absolute left-0 right-0 mx-auto rounded-full bg-white dark:bg-primary-900 p-2 bottom-0 m-2 flex items-center w-max gap-2"
    unstyled
  >
    <Button v-tooltip="{ value: '搜索' }" icon="i-lucide-search" rounded />

    <div class="text-white text-sm w-10 text-center">
      {{ scaleSize }}
    </div>
    <Button icon="i-lucide-plus" @click="onZoomInHandler" rounded />
    <Button icon="i-lucide-minus" @click="onZoomOutHandler" rounded />

    <Button icon="i-lucide-scan" @click="onFitViewHandler" rounded />
    <Button icon="i-lucide-arrow-right-from-line" rounded />
  </div>
</template>

<style scoped>
.dock-demo > .dock-window {
  width: 100%;
  height: 450px;
  position: relative;
  background-image: url('https://primefaces.org/cdn/primevue/images/dock/window.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.dock-demo .p-menubar {
  padding: 0;
  border-radius: 0;
}
</style>
