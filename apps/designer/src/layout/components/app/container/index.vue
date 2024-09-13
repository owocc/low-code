<script setup lang="ts">
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
</script>

<template>
    <Splitter layout="vertical" class="flex-1">
        <SplitterPanel :size="95">
            <Splitter class="flex-1">
                <SplitterPanel :size="20" :min-size="5" class="max-w-[40%]">
                    <slot name="sidebar" />
                </SplitterPanel>
                <SplitterPanel :size="80">
                    <slot />
                </SplitterPanel>
            </Splitter>
        </SplitterPanel>

        <SplitterPanel :size="5" class="max-h-[80%]">
            <slot name="footer" />
        </SplitterPanel>
    </Splitter>
</template>