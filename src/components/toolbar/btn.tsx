import { createElement, FC } from 'react'
import { MdeToolbarBtnProps } from './typings'
import styles from './styles.module.scss'
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
          className: 'mde__toolbar__group__item__btn',
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
