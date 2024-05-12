<script setup lang="ts">
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const { locale, setLocale } = useI18n()
const flagMap = {
  [LANG.en.value]: '/flag-en.png',
  [LANG.vi.value]: '/flag-vi.png',
  default: '/flag-vi.png',
}

const flagSrc = computed(() => {
  return flagMap[locale.value] || flagMap.default
})

const onChangeLang = (lang: string) => {
  setLocale(lang)
}
</script>

<template>
  <div class="flex items-center justify-between h-full w-full">
    <div class="w-14 h-12 bg-white flex items-center justify-center rounded-sm">
      <img src="@/assets/img/logo.png" class="w-11/12 h-11/12 object-contain">
    </div>
    <div class="flex items-center justify-end">
      <el-dropdown @command="onChangeLang">
        <el-image :src="flagSrc" fit="fill" class="w-6 h-6 rounded-full border border-2 border-white" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="{ label, value } in LANG.valueLabelList" :key="value" :command="value">
              <el-image :src="flagMap[value]" fit="fill" class="w-4 h-4 rounded-full border border-2 border-white mr-2" />
              {{ label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
