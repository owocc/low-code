<script setup lang="ts">
import type { EdgeProps } from '@vue-flow/core'
import { BezierEdge } from '@vue-flow/core'

// import { CustomData } from './edges'

// props were passed from the slot using `v-bind="customEdgeProps"`
const props = defineProps<EdgeProps<any>>()

console.log(props.data.hello) // 'world'
</script>

<script lang="ts">
export default {
  name: 'CustomEdge'
}
</script>

<template>
  <BezierEdge
    :source-x="sourceX"
    :source-y="sourceY"
    :target-x="targetX"
    :target-y="targetY"
    :source-position="sourcePosition"
    :target-position="targetPosition"
  >
    <button>666</button>
  </BezierEdge>
</template>
