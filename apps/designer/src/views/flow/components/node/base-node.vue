<script setup lang="ts">
import { tv } from 'tailwind-variants'
import { useVueFlow } from '@vue-flow/core'
const {
  onNodeDragStart,
  onNodeDragStop,
  onNodeClick,
  onNodeDrag,
  onNodeDoubleClick,
  onNodeContextMenu
} = useVueFlow()

//聚焦到节点
onNodeDoubleClick((node) => {})

onNodeContextMenu(({ event, node }) => {
  event.preventDefault()
  console.log(node.position.x)
  console.log(node.position.y)
})
</script>
<template>
  <div class="border-2 border-primary bg-white p-2 rounded-lg dark:bg-slate-700">
    <slot />
  </div>
</template>
