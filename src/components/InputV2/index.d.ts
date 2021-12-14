export type InputBSCProps = {
  placeholder?: string
  value?: string | number
  type?: string
  left?: JSX.Element
  right?: JSX.Element,
  change?: (params?: any) => any
}

export type InputBSCRef = {
  value?: string | number
}