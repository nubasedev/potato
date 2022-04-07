import { FC, useRef, useState } from 'react'
import styled from 'styled-components'
import { MdeCommandOrchestrator } from '../commands/command-orchestrator'
import {
  getDefaultCommandMap,
  getDefaultToolbarCommands,
} from '../commands/default-commands/defaults'
import {
  MDE_STYLE_BORDER_COLOR,
  MDE_STYLE_BORDER_RADIUS,
  MDE_STYLE_PADDING,
} from './config'
import { MdeSvgIcon } from './icon/svg-icon'
import { MdePreview } from './preview'
import { MdeTextarea } from './textarea'
import { MdeToolbar } from './toolbar'
import { MdeToolbarBtnData } from './toolbar/typings'
import { MdeProps, MdeTabProps } from './typings'
const StyledMde = styled.div`
  padding: ${MDE_STYLE_PADDING};
  border: 1px solid ${MDE_STYLE_BORDER_COLOR};
  border-radius: ${MDE_STYLE_BORDER_RADIUS};
`
const StyledMdeContainer = styled.div`
  &[data-hidden] {
    display: none;
  }
`
export const Mde: FC<MdeProps> = ({
  setText,
  commands = getDefaultCommandMap(),
  toolbarCommands = getDefaultToolbarCommands(),
  getIcon = (name: string) => <MdeSvgIcon icon={name} />,
  readOnly = false,
  minEditorHeight = 200,
  maxEditorHeight = 500,
  minPreviewHeight = 200,
  heightUnits = 'px',
  selectedTab = 'write',
  disablePreview = false,
  // paste,
  onTabChange,
  loadingPreview,
  text,
  generateMarkdownPreview,
  textAreaComponent,
  initialEditorHeight,
  commandButtons,
  writeButton,
  previewButton,
  textareaProps,
}) => {
  const refTextarea = useRef<HTMLTextAreaElement>(null)
  const refPreview = useRef<HTMLDivElement>(null)
  const [editorHeight] = useState<number>(
    initialEditorHeight || Math.min(maxEditorHeight, minEditorHeight),
  )
  const [commandOrchestrator] = useState<MdeCommandOrchestrator>(
    new MdeCommandOrchestrator({
      setText,
      customCommands: commands,
      textArea: refTextarea,
      // paste: paste? { ...pasteOptionDefaults, ...paste } : undefined,
    }),
  )
  // const handlePaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
  //   if (!paste?.saveImage) {
  //     return
  //   }
  //   await commandOrchestrator.executePasteCommand(e)
  // }
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
    <StyledMde className='mde'>
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
      <StyledMdeContainer
        className='mde__container'
        data-hidden={selectedTab === 'preview' || undefined}
      >
        <MdeTextarea
          ref={refTextarea}
          value={text}
          setValue={setText}
          textareaComponent={textAreaComponent}
          height={editorHeight}
          heightUnits={heightUnits}
          minHeight={minEditorHeight}
          maxHeight={maxEditorHeight}
          // onDrop={handleDrop}
          // onPaste={handlePaste}
          {...textareaProps}
        />
      </StyledMdeContainer>
      {selectedTab !== 'write' && (
        <MdePreview
          ref={refPreview}
          loadingPreview={loadingPreview}
          minHeight={minPreviewHeight}
          heightUnits={heightUnits}
          generateMarkdownPreview={generateMarkdownPreview}
          markdown={text}
        />
      )}
    </StyledMde>
  )
}
