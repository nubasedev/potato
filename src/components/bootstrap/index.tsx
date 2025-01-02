import { FC, useRef } from 'react'
import { MdeCommandOrchestrator } from '../../commands/command-orchestrator'
import {
  getDefaultCommandMap,
  getDefaultToolbarCommands,
} from '../../commands/default-commands/defaults'
import { MdeSvgIcon } from '../icon/svg-icon'
import { MdePreview } from '../preview'
import { MdeTextarea } from '../textarea'
import { MdeToolbar } from '../toolbar'
import { MdeTabProps, MdeToolbarBtnData } from '../toolbar/typings'
import './global.scss'
import styles from './styles.module.scss'
import { MdeProps } from './typings'
export const Mde: FC<MdeProps> = ({
  setText,
  refTextarea,
  commands = getDefaultCommandMap(),
  toolbarCommands = getDefaultToolbarCommands(),
  getIcon = (name: string) => <MdeSvgIcon icon={name} />,
  readOnly = false,
  selectedTab = 'write',
  disablePreview = false,
  paste,
  onTabChange,
  loadingPreview,
  text,
  generateMarkdownPreview,
  textareaComponent,
  commandButtons,
  writeButton,
  previewButton,
  textareaProps,
}) => {
  const refPreview = useRef<HTMLDivElement>(null)
  const commandOrchestrator = new MdeCommandOrchestrator({
    setText,
    customCommands: commands,
    refTextarea: refTextarea,
    pasteOptions: paste,
  })
  const handlePaste = async (e: globalThis.ClipboardEvent) => {
    if (!paste?.saveImage) {
      return
    }
    await commandOrchestrator.executePasteCommand(e)
  }
  // const handleDrop = async (e: DragEvent<HTMLTextAreaElement>) => {
  //   if (!paste?.saveImage) {
  //     return
  //   }
  //   await commandOrchestrator.executeDropCommand(e)
  // }
  const handleTabChange = (newTab: MdeTabProps) => {
    onTabChange(newTab)
  }
  const handleCommand = async (commandName: string) => {
    await commandOrchestrator.executeCommand(commandName)
  }
  const toolbarButtons = toolbarCommands
    .map((group) => {
      return group.map((commandName) => {
        const command = commandOrchestrator.getCommand(commandName)
        return {
          commandName: commandName,
          buttonContent: command.icon
            ? command.icon(getIcon)
            : getIcon(commandName),
          buttonProps: command.buttonProps,
          buttonComponentClass: command.buttonComponentClass,
        } as MdeToolbarBtnData
      })
    })
    .filter((item) => item)
  return (
    <div className={styles.main} data-fc-mde>
      <MdeToolbar
        buttons={toolbarButtons}
        onCommand={handleCommand}
        onTabChange={handleTabChange}
        tab={selectedTab}
        readOnly={readOnly}
        disablePreview={disablePreview}
        buttonProps={commandButtons}
        writeButtonProps={writeButton}
        previewButtonProps={previewButton}
      />
      <div
        className={styles.container}
        data-fc-mde-container
        data-hidden={selectedTab === 'preview' || undefined}
      >
        <MdeTextarea
          ref={refTextarea}
          value={text}
          setValue={setText}
          textareaComponent={textareaComponent}
          onKeyCommand={commandOrchestrator.handleKeyCommand}
          // onDrop={handleDrop}
          onPaste={handlePaste}
          {...textareaProps}
        />
      </div>
      {selectedTab !== 'write' && (
        <MdePreview
          ref={refPreview}
          loadingPreview={loadingPreview}
          generateMarkdownPreview={generateMarkdownPreview}
          markdown={text}
        />
      )}
    </div>
  )
}
