import classnames from 'classnames'
import { FC } from 'react'
import styled from 'styled-components'
import { MDE_STYLE_PADDING } from '../config'
import { MdeToolbarBtnGroupProps } from './typings'
const StyledMdeToolbarBtnGroup = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 ${MDE_STYLE_PADDING} 0 0;
  padding: 0;
  list-style: none;
  &[data-hidden] {
    opacity: 0.3;
    pointer-events: none;
  }
`
export const MdeToolbarBtnGroup: FC<MdeToolbarBtnGroupProps> = ({
  hidden,
  children,
}) => {
  return (
    <StyledMdeToolbarBtnGroup
      className={classnames({
        mde__toolbar__group: true,
      })}
      data-hidden={hidden || undefined}
    >
      {children}
    </StyledMdeToolbarBtnGroup>
  )
}
