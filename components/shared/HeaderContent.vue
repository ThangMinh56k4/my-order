<script setup lang="ts">
const { title } = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="header-content">
    <h1 class="title">
      {{ title }}
    </h1>
    <div class="action">
      <slot name="action" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-content {
  @apply flex justify-between items-center;

  > .title {
    @apply text-3xl font-bold text-primary-600;
  }
}
</style>
