<script setup lang="ts">
import WujieVue from 'wujie-vue3'

const { bus } = WujieVue
bus.$on('getData', function () { alert('patch') })

</script>

<template>
  <div>
    <h1>这是React App</h1>
    <WujieVue url="http://localhost:9001" />

  </div>
</template>