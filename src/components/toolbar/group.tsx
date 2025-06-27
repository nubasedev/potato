import { FC } from 'react'
import styles from './styles.module.scss'
import { MdeToolbarBtnGroupProps } from './typings.ts'
export const MdeToolbarBtnGroup: FC<MdeToolbarBtnGroupProps> = ({
  hidden,
  children,
}) => {
  return (
    <div
      className={styles.btnGroup}
      data-fc-mde-toolbar-button-group
      data-hidden={hidden || undefined}
    >
      {children}
    </div>
  )
}
