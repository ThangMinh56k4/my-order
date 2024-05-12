import { generateConstants } from '../utils/constant'

export * from './theme'

export const LANG = generateConstants({
  vi: {
    value: 'vi',
    label: 'Tiếng Việt',
  },
  en: {
    value: 'en',
    label: 'English',
  },
})
