import { MarkerType } from '@vue-flow/core'

export const initialNodes: Array<never> = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 0 },
    class: 'light'
  },
  {
    id: '1dsad',
    data: { label: 'Node c' },
    // this will create the node-type `custom`
    type: 'testNode',
    position: { x: 50, y: 50 }
  },
  {
    id: '2',
    type: 'output',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
    class: 'light'
  }
]

export const initialEdges: Array<never> = [
  {
    id: '1->1dsad',
    source: '1',
    target: '1dsad'
  }
]
