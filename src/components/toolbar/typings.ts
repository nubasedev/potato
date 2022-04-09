import { ComponentClass, HtmlHTMLAttributes, ReactNode } from 'react'
import { MdeTabProps } from '../typings'
export interface MdeToolbarProps {
  buttons: MdeToolbarBtnData[][]
  onCommand: (commandName: string) => void
  onTabChange: (tab: MdeTabProps) => void
  readOnly: boolean
  disablePreview: boolean
  tab: MdeTabProps
  writeButtonProps?: HtmlHTMLAttributes<HTMLButtonElement>
  previewButtonProps?: HtmlHTMLAttributes<HTMLButtonElement>
  buttonProps?: HtmlHTMLAttributes<HTMLButtonElement>
}
export interface MdeToolbarBtnData {
  commandName: string
  buttonContent: ReactNode
  buttonProps: any
  buttonComponentClass: ComponentClass | string
}
export interface MdeToolbarBtnProps {
  name: string
  buttonComponentClass?: ComponentClass | string
  buttonProps: any
  buttonContent: React.ReactNode
  onClick: React.MouseEventHandler<any>
  readOnly: boolean
}
export interface MdeToolbarBtnGroupProps {
  hidden: boolean
  children: ReactNode
}
