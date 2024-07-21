import { ref, computed, effect } from '@vue/reactivity'

export const x = ref(1)

export const fn = () => {
  x.value += 1
}

effect(() => {
  console.log(x.value)
}, {})



