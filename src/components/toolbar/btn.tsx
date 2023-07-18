import { createElement, FC } from 'react'
import styles from './styles.module.scss'
import { MdeToolbarBtnProps } from './typings'
const defaultButtonProps = {
  tabIndex: -1,
}
export const MdeToolbarButton: FC<MdeToolbarBtnProps> = ({
  buttonComponentClass,
  buttonContent,
  buttonProps,
  onClick,
  readOnly,
  name,
}) => {
  const finalButtonProps = { ...defaultButtonProps, ...(buttonProps || {}) }
  const finalButtonComponent = buttonComponentClass || 'button'
  return (
    <div className={styles.btn} data-fc-mde-toolbar-button>
      {createElement(
        finalButtonComponent,
        {
          'data-fc-mde-toolbar-button-item': true,
          'data-name': name,
          ...finalButtonProps,
          ...{
            onClick,
            disabled: readOnly,
            type: 'button',
          },
        },
        buttonContent,
      )}
    </div>
  )
}
