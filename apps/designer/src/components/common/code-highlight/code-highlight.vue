<script setup lang="ts">
import { codeToHtml } from 'shiki'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  code: any
}>()

const codeText = computed(() => {
  return JSON.stringify(props.code, null, 2)
})
const coded = 'const x = 1'
const htmle = computed(async () => {
  return await codeToHtml(codeText.value, {
    lang: 'json',
    theme: 'vitesse-dark'
  })
})

// const html = await codeToHtml(codeText.value, {
//   lang: 'javascript',
//   theme: 'vitesse-dark'
// })
const htmlb = ref('')
onMounted(async () => {
  console.log(await htmle.value)
  htmlb.value = await htmle.value
})
</script>
<template>
  <div>
    <pre v-html="htmlb"></pre>
  </div>
</template>
