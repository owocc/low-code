<script setup lang="ts">
import { markRaw, ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import MiniMap from './mini-map/mini-map.vue'
import { initialEdges, initialNodes } from './initial-elements.ts'
import Toolbar from '@/views/flow/components/core/toolbar/toolbar.vue'
import TestNode from '../node/test.vue'
/**
`useVueFlow` 提供：
1. 一组方法与 VueFlow 实例进行交互（如 `fitView`、`setViewport`、`addEdges` 等）
2. 一组事件钩子用于监听 VueFlow 事件（如 `onInit`、`onNodeDragStop`、`onConnect` 等）
3. VueFlow 实例的内部状态（如 `nodes`, `edges`, `viewport`, 等）
 */
const { onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject } = useVueFlow()

const nodes = ref<Array<never>>(initialNodes)

const edges = ref<Array<never>>(initialEdges)

// 我们的暗模式切换标志
const dark = ref(false)

/**
这是一个 Vue Flow 事件钩子，可以在调用可组合函数的任何地方监听到它，而不仅限于主组件上。

VueFlow 组件上作为 `@event-name` 可用的任何事件也可以在可组合函数中作为 `onEventName` 使用，反之亦然。

当 VueFlow 视口初始化时会调用 onInit。
 */
onInit((vueFlowInstance) => {
  // 实例与 `useVueFlow` 的返回值相同
  vueFlowInstance.fitView()
})

/**
onNodeDragStop 在节点拖动完成时被调用
* 节点拖动事件提供以下信息：

* 1. 事件对象

* 2. 节点数组（如果有多个节点被拖动）

* 3. 触发拖动的节点

* 4. 与其他节点的任何交集
 */
onNodeDragStop(({ event, nodes, node }) => {
  console.log('Node Drag Stop', { event, nodes, node })
})

/**
当创建新连接时，将调用 onConnect。
您可以向新边添加其他属性（如类型或标签），或者通过不调用 `addEdges` 来完全阻止创建。
 */
onConnect((connection) => {
  addEdges(connection)
})

/**
  要更新一个节点或多个节点，您可以
* 1. 如果您正在使用 `v-model`，则更改节点对象

* 2. 使用 `useVueFlow` 中的 `updateNode` 方法来更新节点

* 3. 创建一个新的节点数组，并将其传递给 `nodes` ref
 */
function updatePos() {
  nodes.value = nodes.value.map((node) => {
    return {
      ...node,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400
      }
    }
  })
}

const nodeTypes = {
  testNode: markRaw(TestNode)
}
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :class="{ dark }"
    class="basic-flow"
    :default-viewport="{ zoom: 1.5 }"
    :min-zoom="0.2"
    :max-zoom="4"
    :nodeTypes="nodeTypes"
  >
    <Background pattern-color="#aaa" :gap="16" />
    <Toolbar />
    <MiniMap position="bottom-left" />

    <!-- <template #node-custom="testNode">
      <TestNode />
    </template> -->
  </VueFlow>
</template>
