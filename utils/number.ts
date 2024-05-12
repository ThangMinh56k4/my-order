export const formatNumber = (value: number, locale: string = 'vi-VN', options: Intl.NumberFormatOptions = {
  style: 'currency',
  currency: 'VND',
}) => new Intl.NumberFormat(locale, options).format(value)
