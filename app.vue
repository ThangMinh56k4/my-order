<script lang="ts" setup>
import vi from 'element-plus/dist/locale/vi.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import dayjs from 'dayjs'

import 'dayjs/locale/vi'

const { locale } = useI18n()

const themeLocale = ref()

watch(
  locale,
  () => {
    dayjs.locale(locale.value)
    switch (locale.value) {
      case LANG.en.value:
        themeLocale.value = en
        break

      default:
        themeLocale.value = vi
        break
    }
  },
  // eslint-disable-next-line @stylistic/comma-dangle
  { immediate: true }
)

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})
</script>

<template>
  <el-config-provider :locale="themeLocale">
    <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
      <Head>
        <template v-for="link in head.link" :key="link.id">
          <Link
            :id="link.id"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta
            :id="meta.id"
            :property="meta.property"
            :content="meta.content"
          />
        </template>
      </Head>
      <Body>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </Body>
    </Html>
  </el-config-provider>
</template>
