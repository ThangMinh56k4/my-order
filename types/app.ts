export type Constant = { [key: string]: { label: string, value: unknown } }

export type AppLoading = {
  show: () => void
  hide: () => void
}
