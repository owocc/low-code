<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'

// import { CustomData, CustomEvents } from './nodes'
</script>

<template>
  <div class="p-5 bg-white rounded-lg border dark:bg-gray-800">
    <Handle type="target" :position="Position.Top" class="bg-slate-100 border" />
    <Handle type="source" :position="Position.Bottom" />
    <Handle type="source" :position="Position.Left" class="bg-slate-100 border" />
    <div>你好</div>
  </div>
</template>
