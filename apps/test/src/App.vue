<script setup lang="ts">
import BackTest from './components/back/test.vue'
// import { RouterLink, RouterView } from 'vue-router'
import { test } from '@web/utils/transformer'
const onTest = () => {
  const x = test()
  console.log(x[0].key)
}
</script>

<template>
  <!-- <BackTest /> -->
  <button @click="onTest">Test</button>
</template>
