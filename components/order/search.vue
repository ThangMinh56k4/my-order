<script setup lang="ts">
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const { t } = useI18n()

defineProps<{
  disabled: boolean
}>()

defineEmits<{
  search: [search: string]
}>()

const search = ref('')
</script>

<template>
  <el-form
    novalidate
    class="flex items-center gap-2"
    @submit.prevent="$emit('search', search)"
  >
    <el-form-item class="!mb-0 w-50">
      <el-input
        v-model="search"
        :disabled="disabled"
        :placeholder="t('indexPage.plhd_search')"
      />
    </el-form-item>
    <el-form-item class="!mb-0">
      <el-button
        :disabled="disabled"
        type="primary"
        native-type="submit"
      >
        <fa :icon="faSearch" />
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>

</style>
