export const useLoadingStore = defineStore('loading', () => {
  const { provide, $loading } = useNuxtApp()

  const loading = ref(false)

  const showLoading = () => {
    loading.value = true
  }

  const hideLoading = () => {
    loading.value = false
  }

  if (!$loading) {
    provide('loading', { show: showLoading, hide: hideLoading })
  }

  return { loading, showLoading, hideLoading }
})
