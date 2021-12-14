export type TMenuItem = {
  label: string
  icon?: string | any
  href?: string
  items?: TMenuItem[]
  initialOpenState?: boolean
}

export type PropsItemMenu = {
  isCollapsed: boolean
  item: TMenuItem
  id: string
  href?: string
  textStyle?: any
  onOpen?: () => any
  click: (index: string, href?: string) => any
}
