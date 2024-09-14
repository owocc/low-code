<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import BaseNode from './base-node.vue'
defineProps<NodeProps>()
// import { CustomData, CustomEvents } from './nodes'
</script>

<template>
  <BaseNode>
    <Handle type="target" :position="Position.Top" class="bg-slate-100 border" />
    <Handle type="source" :position="Position.Bottom" class="bg-slate-100 border" />
    <!-- <Handle type="target" :position="Position.Left" class="bg-slate-100 border" />
    <Handle type="target" :position="Position.Right" class="bg-slate-100 border" /> -->

    <div>你好世界</div>
  </BaseNode>
</template>
