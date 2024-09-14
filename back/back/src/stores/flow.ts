import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { Edge, Node } from '@vue-flow/core'

const useFlowStore = defineStore('flow', () => {
  const nodes: Ref<Node[]> = ref<Node[]>([])
  const edges:Ref<Edge[]> = ref<Edge[]>([])

  return {
    nodes,
    edges
  }
})

export default useFlowStore
