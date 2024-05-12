<script setup lang="ts">
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import type { MenuItem } from '@/types'

definePageMeta({
  middleware: ['validate-auth'],
})

const { $firebaseService, $loading } = useNuxtApp()
const { t } = useI18n()

const menuItems = ref<MenuItem[]>([])
const selectedMenuItemIds = ref<string[]>([])

useLazyAsyncData('menuItems', async () => {
  $loading.show()
  menuItems.value = await $firebaseService.menu.getAll()
  $loading.hide()
})

const isShowOrder = computed(() => selectedMenuItemIds.value.length > 0)

const total = computed(() => {
  const total = menuItems.value.reduce((acc, menu) => {
    if (selectedMenuItemIds.value.includes(menu.id)) {
      acc += menu.price * (menu.quantity || 0)
    }

    return acc
  }, 0)

  return formatNumber(total)
})

const onSearch = () => {}

const onSelect = ({ id }: MenuItem) => {
  const selectedMenu = selectedMenuItemIds.value.find(itemId => itemId === id)

  if (selectedMenu) {
    return
  }

  selectedMenuItemIds.value.push(id)
  menuItems.value = menuItems.value.map((menu) => {
    if (menu.id === id) {
      menu.quantity = 1
    }

    return menu
  })
}

const onChangeQuantity = ({ id, quantity }: { id: string, quantity: number }) => {
  if (!quantity) {
    selectedMenuItemIds.value = selectedMenuItemIds.value.filter(itemId => itemId !== id)
  }
}
</script>

<template>
  <div class="menu-list">
    <shared-header-content :title="t('indexPage.title')">
      <template #action>
        <order-search disabled @search="onSearch" />
      </template>
    </shared-header-content>
    <div class="content">
      <template v-for="i in 3" :key="i">
        <order-card
          v-for="menu in menuItems"
          :key="menu.id"
          v-model:quantity="menu.quantity"
          :menu="menu"
          :selected="selectedMenuItemIds.includes(menu.id)"
          class="w-full min-h-60"
          @select="onSelect"
          @change-quantity="onChangeQuantity"
        />
      </template>
    </div>
    <div class="footer">
      <transition name="el-fade-in">
        <el-button v-if="isShowOrder" type="primary" :size="'large'" class="min-w-80">
          <fa :icon="faShoppingCart" class="mr-2" />
          {{ t('indexPage.btn_order', { total: total }) }}
        </el-button>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/sass/base/variables' as *;
@use '~/assets/sass/base/mixins' as *;

.menu-list {
  @apply flex flex-col gap-4 p-5;
  height: calc(100vh - #{$header-height} - 40px);

  .content {
    @apply grid grid-cols-4 gap-4 overflow-auto h-full pr-4 -mr-4;

    @include mediaquery-down('md') {
      @apply grid-cols-3;
    }

    @include mediaquery-down('sm') {
      @apply grid-cols-2;
    }
  }

  .footer {
    @apply  w-full mt-auto flex justify-center items-end;
  }
}
</style>
