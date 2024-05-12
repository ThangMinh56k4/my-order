import type { Constant } from '@/types'

export function generateConstants<
  T extends Constant,
  K extends keyof T,
  V extends T[K]['value'],
  L extends T[K]['label'],
>(constant: T) {
  return {
    ...constant,
    valueLabelList: Object.keys(constant).map((key: string) => {
      const constantValue = constant[key]
      const value: V = constantValue.value as V
      const label: L = constantValue.label as L

      return {
        ...constantValue,
        label,
        value,
        key,
      }
    }),
    labelList: Object.keys(constant).map(key => constant[key].label),
    valueList: Object.keys(constant).map(key => constant[key].value),
    labelOf: (value: V) => {
      const key = Object.keys(constant).find(
        key => constant[key]?.value === value,
      )
      return key ? constant[key].label : ''
    },
    valueOf: (label: L): V | undefined => {
      const key = Object.keys(constant).find(
        key => constant[key]?.label === label,
      )

      return key ? (constant[key].value as V) : undefined
    },
    keyOf: (value: V) => {
      const key = Object.keys(constant).find(
        key => constant[key]?.value === value,
      )
      return key
    },
  }
}
