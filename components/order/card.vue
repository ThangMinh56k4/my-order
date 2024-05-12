<script setup lang="ts">
import { faImage, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import type { MenuItem } from '@/types'

const { menu } = defineProps<{ menu: MenuItem, selected: boolean }>()

const emits = defineEmits<{
  select: [MenuItem]
  changeQuantity: [{ id: string, quantity: number }]
}>()

const num = defineModel<number>('quantity', {
  default: 0,
})

const onChangeQuantity = (currentNumber?: number) => {
  emits('changeQuantity', { id: menu.id, quantity: currentNumber! })
}
</script>

<template>
  <el-card
    :class="['order-card', {
      selected: selected,
    }]"
    shadow="hover"
    @click="$emit('select', menu)"
  >
    <template #header>
      <div class="header">
        <p class="title">
          {{ menu.name }}
        </p>
        <h2 class="price">
          {{ formatNumber(menu.price) }}
        </h2>
        <fa v-if="selected" :icon="faCheckCircle" class="absolute right-2 top-2 text-success-600 text-2xl" />
      </div>
    </template>
    <div class="content">
      <el-image
        v-if="menu.imgUrl"
        :src="menu.imgUrl"
        fit="cover"
        class="w-full h-40"
      />
      <el-icon v-else size="150" class="m-auto">
        <fa :icon="faImage" />
      </el-icon>
      <el-input-number v-if="selected" v-model="num" :min="0" :max="10" class="quantity" @change="onChangeQuantity" />
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
@use '~/assets/sass/base/variables' as vars;

.order-card {
  @apply rounded-2xl border border-white border-2 relative cursor-pointer;

  &.selected {
    @apply border-success-600 bg-green-50;
  }

  :deep(.el-card__header) {
    @apply border-b-white;
  }

  :deep(.el-card__body) {
    @apply p-0;
  }
}
.order-card > .el-card__header > .header {
  @apply flex flex-col;

  & > .title {
    @apply text-lg line-clamp-1 text-gray-400;
  }

  & > .price {
    @apply text-right text-primary-600;
  }
}
.order-card > .el-card__body > .content {
  @apply flex flex-col text-gray-200;

  > .quantity {
    @apply absolute left-1/2 bottom-2 w-30;
    transform: translateX(-50%);
  }

  > .quantity :deep(.el-input-number__decrease) {
    @apply bg-success-600 text-white text-xl font-bold;

    &:hover ~ .el-input:not(.is-disabled) .el-input__wrapper {
      box-shadow: vars.$input-box-shadow;
    }
  }

  > .quantity :deep(.el-input-number__increase) {
    @apply bg-success-600 text-white text-xl font-bold;

    &:hover ~ .el-input:not(.is-disabled) .el-input__wrapper {
      box-shadow: vars.$input-box-shadow;
    }
  }
}
</style>
