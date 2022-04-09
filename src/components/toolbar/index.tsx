import { FC, MouseEvent } from 'react'
import styled from 'styled-components'
import {
  MDE_STYLE_BORDER_COLOR,
  MDE_STYLE_BORDER_RADIUS,
  MDE_STYLE_PADDING,
} from '../config'
import { MdeLanguage } from '../language'
import { MdeTabProps } from '../typings'
import { MdeToolbarButton } from './btn'
import { MdeToolbarBtnGroup } from './group'
import { MdeToolbarBtnData, MdeToolbarProps } from './typings'
const StyledMdeHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${MDE_STYLE_PADDING};
  padding-bottom: ${MDE_STYLE_PADDING};
  border-bottom: 1px solid ${MDE_STYLE_BORDER_COLOR};
`
const StyledMdeTab = styled.div`
  display: flex;
`
const StyledMdeTabBtn = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  padding: ${MDE_STYLE_PADDING};
  border-radius: ${MDE_STYLE_BORDER_RADIUS};
  :hover,
  &[data-active] {
    background: rgba(0, 0, 0, 0.1);
  }
`
export const MdeToolbar: FC<MdeToolbarProps> = ({
  onTabChange,
  buttons,
  onCommand,
  readOnly,
  disablePreview,
  writeButtonProps,
  previewButtonProps,
  tab,
  buttonProps,
}) => {
  const handleTabChange = (
    e: MouseEvent<HTMLButtonElement>,
    tab: MdeTabProps,
  ) => {
    e.preventDefault()
    onTabChange(tab)
  }
  if (!buttons?.length) {
    return null
  }
  const writePreviewTabs = (
    <StyledMdeTab className='mde__tab'>
      <StyledMdeTabBtn
        type='button'
        className='mde__tab__btn'
        onClick={(e) => handleTabChange(e, 'write')}
        data-active={tab === 'write' || undefined}
        {...writeButtonProps}
      >
        {MdeLanguage.gettext('Write')}
      </StyledMdeTabBtn>
      <StyledMdeTabBtn
        type='button'
        className='mde__tab__btn'
        onClick={(e) => handleTabChange(e, 'preview')}
        data-active={tab === 'preview' || undefined}
        {...previewButtonProps}
      >
        {MdeLanguage.gettext('Preview')}
      </StyledMdeTabBtn>
    </StyledMdeTab>
  )
  return (
    <StyledMdeHeader className='mde__header'>
      {disablePreview || writePreviewTabs}
      {buttons.map((commandGroup: MdeToolbarBtnData[], i: number) => (
        <MdeToolbarBtnGroup key={i} hidden={tab === 'preview'}>
          {commandGroup.map((c: MdeToolbarBtnData, j) => {
            return (
              <MdeToolbarButton
                key={j}
                name={c.commandName}
                buttonContent={c.buttonContent}
                buttonProps={{ ...(buttonProps || {}), ...c.buttonProps }}
                onClick={() => onCommand(c.commandName)}
                readOnly={readOnly}
                buttonComponentClass={c.buttonComponentClass}
              />
            )
          })}
        </MdeToolbarBtnGroup>
      ))}
    </StyledMdeHeader>
  )
}
