<script setup lang="ts">
defineOptions({
  name: 'AppLoading',
})

const { loading } = defineProps<{ loading?: boolean }>()
const loadingMask: Ref<HTMLDivElement | null> = ref(null)

const resizeObserver = new ResizeObserver(() => {
  const loadingEl = loadingMask.value as HTMLDivElement
  const parentEl = loadingEl?.parentElement

  if (!loadingEl || !parentEl) {
    return
  }

  const clientRect = parentEl.getBoundingClientRect()
  const rectProps = ['top', 'left', 'width', 'height']

  type DomRectProp = keyof typeof clientRect

  for (const prop of rectProps) {
    loadingEl.style.setProperty(prop, `${clientRect[prop as DomRectProp]}px`)
  }
})

watchEffect(() => {
  document.body.inert = loading || false
})

onMounted(() => {
  const parentEl = loadingMask.value!.parentElement

  if (!parentEl) {
    return
  }

  resizeObserver.observe(parentEl)

  onUnmounted(() => {
    resizeObserver.unobserve(parentEl)
  })
})
</script>

<template>
  <div v-show="loading" ref="loadingMask" class="app-loading">
    <app-loading-spinner class="text-primary-600" />
  </div>
</template>

<style lang="scss" scoped>
@use '~~/assets/sass/base/variables' as var;

.app-loading {
  @apply fixed flex items-center justify-center inset-0 z-100000 select-none bg-opacity-60 text-primary-600;
}
</style>
