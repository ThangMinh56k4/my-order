<script setup lang="ts">
const loadingStore = useLoadingStore()
const { loading } = storeToRefs(loadingStore)
</script>

<template>
  <div id="__layout">
    <el-container
      direction="vertical"
      class="min-h-screen max-w-screen-md mx-auto bg-primary-100"
    >
      <el-header class="bg-primary-600">
        <layout-header />
      </el-header>
      <el-main class="!p-0 !overflow-hidden">
        <slot />
      </el-main>
      <app-loading :loading="loading" />
    </el-container>
  </div>
</template>
