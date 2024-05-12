<script setup lang="ts">
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const { size = 64 } = defineProps<{
  size?: number
}>()

defineOptions({
  name: 'AppLoadingSpinner',
})
</script>

<template>
  <el-icon :size="size" class="app-loading-spinner">
    <fa :icon="faSpinner" />
  </el-icon>
</template>

<style lang="scss" scoped>
.app-loading-spinner {
  animation: loading-rotate 1.5s linear infinite;
}

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
