import { ChangeEvent, KeyboardEvent, RefObject } from 'react'
import { MdeTextApi, MdeTextState } from '../typings/command-options'
import { MdeSelection } from '../typings/selection'
import { insertText } from '../util/insert-text-at-position'
import {
  MdeCommandContext,
  MdeCommandMapProps,
  MdeCommandProps,
  MdePasteCommandContext,
  MdePasteOptions,
} from './command'
import { extractKeyActivatedCommands } from './command-utils'
import {
  getDefaultCommandMap,
  getDefaultSaveImageCommandName,
} from './default-commands/defaults'
export class MdeTextAreaTextApi implements MdeTextApi {
  private readonly textAreaRef: RefObject<HTMLTextAreaElement>
  constructor(textAreaRef: RefObject<HTMLTextAreaElement>) {
    this.textAreaRef = textAreaRef
  }
  public replaceSelection = (text: string): MdeTextState => {
    const textArea = this.textAreaRef.current as HTMLTextAreaElement
    insertText(textArea, text)
    return getStateFromTextArea(textArea)
  }
  public setSelectionRange = (selection: MdeSelection): MdeTextState => {
    const textArea = this.textAreaRef.current as HTMLTextAreaElement
    textArea.focus()
    textArea.selectionStart = selection.start
    textArea.selectionEnd = selection.end
    return getStateFromTextArea(textArea)
  }
  public getState = (): MdeTextState => {
    const textArea = this.textAreaRef.current as HTMLTextAreaElement
    return getStateFromTextArea(textArea)
  }
}
export const getStateFromTextArea = (
  textArea: HTMLTextAreaElement,
): MdeTextState => {
  return {
    selection: {
      start: textArea.selectionStart,
      end: textArea.selectionEnd,
    },
    text: textArea.value,
    selectedText: textArea.value.slice(
      textArea.selectionStart,
      textArea.selectionEnd,
    ),
  }
}
interface MdeCommandOrchestratorProps {
  setText: (text: string) => void
  customCommands: MdeCommandMapProps
  textArea: RefObject<HTMLTextAreaElement>
  pasteOptions?: MdePasteOptions
}
export class MdeCommandOrchestrator {
  private readonly setText: (text: string) => void
  private readonly textAreaRef: RefObject<HTMLTextAreaElement>
  private readonly textApi: MdeTextApi
  private readonly commandMap: MdeCommandMapProps
  /**
   * Names of commands that can be activated by the keyboard
   */
  private keyActivatedCommands: string[]
  /**
   * Indicates whether there is a command currently executing
   */
  private isExecuting = false
  private readonly pasteOptions?: MdePasteOptions
  constructor({
    setText,
    customCommands,
    textArea,
    pasteOptions,
  }: MdeCommandOrchestratorProps) {
    if (pasteOptions && !pasteOptions.saveImage) {
      throw new Error('paste options are incomplete. saveImage are required ')
    }
    this.commandMap = { ...getDefaultCommandMap(), ...(customCommands || {}) }
    this.pasteOptions = pasteOptions
    this.keyActivatedCommands = extractKeyActivatedCommands(customCommands)
    this.textAreaRef = textArea
    this.textApi = new MdeTextAreaTextApi(textArea)
    this.setText = setText
  }
  public getCommand = (name: string): MdeCommandProps => {
    const command = this.commandMap[name]
    if (!command) {
      throw new Error(`Cannot execute command. Command not found: ${name}`)
    }
    return command()
  }
  /**
   * Tries to find a command the wants to handle the keyboard event.
   * If a command is found, it is executed and the function returns
   */
  public handlePossibleKeyCommand = async (
    e: KeyboardEvent<HTMLTextAreaElement>,
  ): Promise<boolean> => {
    for (const commandName of this.keyActivatedCommands) {
      const cn = this.getCommand(commandName)
      if (cn?.handleKeyCommand?.(e)) {
        await this.executeCommand(commandName)
        return true
      }
    }
    return false
  }
  public executeCommand = async (
    commandName: string,
    context?: MdeCommandContext,
  ): Promise<void> => {
    if (this.isExecuting) {
      // The simplest thing to do is to ignore commands while
      // there is already a command executing. The alternative would be to queue commands
      // but there is no guarantee that the state after one command executes will still be compatible
      // with the next one. In fact, it is likely not to be.
      return
    }
    this.isExecuting = true
    const command = this.commandMap[commandName]
    const textarea = this.textAreaRef.current as HTMLTextAreaElement
    await command().execute({
      initialState: getStateFromTextArea(textarea),
      textApi: this.textApi,
      context,
    })
    this.setText(textarea.value)
    this.isExecuting = false
  }
  /**
   * Executes the paste command
   */
  // public executePasteCommand = async (event: ClipboardEvent): Promise<void> => {
  //   if (this.pasteOptions) {
  //     return this.executeCommand(
  //       this.pasteOptions.command || getDefaultSaveImageCommandName(),
  //       {
  //         pasteOptions: this.pasteOptions,
  //         event: event,
  //       } as MdePasteCommandContext,
  //     )
  //   }
  // }
  /**
   * Executes the drop command
   */
  // public executeDropCommand = async (event: DragEvent): Promise<void> => {
  //   if (this.pasteOptions) {
  //     return this.executeCommand(
  //       this.pasteOptions.command || getDefaultSaveImageCommandName(),
  //       {
  //         pasteOptions: this.pasteOptions,
  //         event: event,
  //       } as MdePasteCommandContext,
  //     )
  //   }
  // }
  /**
   * Executes the "select image" command
   */
  public executeSelectImageCommand = async (
    event: ChangeEvent,
  ): Promise<void> => {
    if (this.pasteOptions) {
      return this.executeCommand(
        this.pasteOptions.command || getDefaultSaveImageCommandName(),
        {
          pasteOptions: this.pasteOptions,
          event: event,
        } as MdePasteCommandContext,
      )
    }
  }
  /**
   * Returns a command by name
   * @param name
   */
  public getCommandByName = (name: string) => {
    return this.commandMap[name]
  }
}
