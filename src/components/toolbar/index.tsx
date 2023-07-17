import { FC, MouseEvent } from 'react'
import { MdeLanguage } from '../language'
import { MdeToolbarButton } from './btn'
import { MdeToolbarBtnGroup } from './group'
import styles from './styles.module.scss'
import { MdeTabProps, MdeToolbarBtnData, MdeToolbarProps } from './typings'
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
    <div className={styles.tab} data-fc-mde-tab>
      <button
        type='button'
        className={styles.tabButton}
        data-fc-mde-tab-button
        onClick={(e) => handleTabChange(e, 'write')}
        data-active={tab === 'write' || undefined}
        {...writeButtonProps}
      >
        {MdeLanguage.gettext('Write')}
      </button>
      <button
        type='button'
        className={styles.tabButton}
        data-fc-mde-tab-button
        onClick={(e) => handleTabChange(e, 'preview')}
        data-active={tab === 'preview' || undefined}
        {...previewButtonProps}
      >
        {MdeLanguage.gettext('Preview')}
      </button>
    </div>
  )
  return (
    <div className={styles.header} data-fc-mde-header>
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
    </div>
  )
}
