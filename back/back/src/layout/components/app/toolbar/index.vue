<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
</script>
<template>
    <Toolbar class="h-12 border rounded-lg items-center flex justify-between p-2" unstyled>
        <template #start>
            <Button icon="i-lucide-chevron-left" class="mr-2" severity="secondary" text />
        </template>
    </Toolbar>
</template>