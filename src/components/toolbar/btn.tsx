import { createElement, FC } from 'react'
import styled from 'styled-components'
import {
  MDE_STYLE_BORDER_RADIUS,
  MDE_STYLE_PADDING,
  MDE_STYLE_TOOLBAR_BG_HOVER,
  MDE_STYLE_TOOLBAR_FG,
} from '../config'
import { MdeToolbarBtnProps } from './typings'
const defaultButtonProps = {
  tabIndex: -1,
}
const StyledMdeToolbarBtn = styled.li`
  position: relative;
  margin: 0;
  padding: 0;
  button {
    cursor: pointer;
    padding: ${MDE_STYLE_PADDING};
    margin: 0;
    border: none;
    background: none;
    color: ${MDE_STYLE_TOOLBAR_FG};
    border-radius: ${MDE_STYLE_BORDER_RADIUS};
    :hover {
      background-color: ${MDE_STYLE_TOOLBAR_BG_HOVER};
    }
  }
`
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
    <StyledMdeToolbarBtn className='mde__toolbar__group__item'>
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
    </StyledMdeToolbarBtn>
  )
}
