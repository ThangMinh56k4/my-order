export default defineI18nConfig(() => ({
  fallbackLocale: 'vi',
  legacy: false,
  locale: 'vi',
  numberFormats: {
    vi: {
      currency: {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
      percent: {
        style: 'percent',
        useGrouping: false,
      },
    },
    en: {
      currency: {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
      percent: {
        style: 'percent',
        useGrouping: false,
      },
    },
  },

  datetimeFormats: {
    vi: {
      date: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
      datetime: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
    en: {
      date: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
      datetime: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
  },
}))
