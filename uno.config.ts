import { defineConfig } from 'unocss'
import presetWind from '@unocss/preset-wind'
import transformerDirectives from '@unocss/transformer-directives'
import presetRemToPx from '@unocss/preset-rem-to-px'

import { fontSize, breakpoints, colors } from './constants'

export default defineConfig({
  presets: [
    presetRemToPx(),
    presetWind({
      preflight: false,
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    fontSize,
    breakpoints,
    colors,
  },
  safelist: [],
})
