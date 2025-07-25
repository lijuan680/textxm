declare namespace Api {
  interface ResultType<T = null> {
    state: number
    msg: string
    data: T
  }
  interface Tabs {
    path: string
    label: string
  }
}
