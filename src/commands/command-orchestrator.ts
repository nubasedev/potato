import { ChangeEvent, KeyboardEvent, RefObject } from 'react'
import { MdeTextApi, MdeTextState } from '../typings/command-options.ts'
import { MdeSelection } from '../typings/selection.ts'
import { insertText } from '../utils/insert-text-at-position.ts'
import { extractKeyActivatedCommands } from './command-utils.ts'
import {
  MdeCommandContext,
  MdeCommandMapProps,
  MdeCommandProps,
  MdePasteCommandContext,
  MdePasteOptions,
} from './command.ts'
import {
  getDefaultCommandMap,
  getDefaultSaveImageCommandName,
} from './default-commands/defaults.ts'
export class MdeTextAreaTextApi implements MdeTextApi {
  private readonly refTextarea: RefObject<HTMLTextAreaElement | null>
  constructor(refTextarea: RefObject<HTMLTextAreaElement | null>) {
    this.refTextarea = refTextarea
  }
  public replaceSelection = (text: string): MdeTextState => {
    const textarea = this.refTextarea.current as HTMLTextAreaElement
    insertText(textarea, text)
    return getStateFromTextArea(textarea)
  }
  public setSelectionRange = (selection: MdeSelection): MdeTextState => {
    const textarea = this.refTextarea.current as HTMLTextAreaElement
    textarea.focus()
    textarea.selectionStart = selection.start
    textarea.selectionEnd = selection.end
    return getStateFromTextArea(textarea)
  }
  public getState = (): MdeTextState => {
    const textarea = this.refTextarea.current as HTMLTextAreaElement
    return getStateFromTextArea(textarea)
  }
}
export const getStateFromTextArea = (
  textarea: HTMLTextAreaElement,
): MdeTextState => {
  return {
    selection: {
      start: textarea.selectionStart,
      end: textarea.selectionEnd,
    },
    text: textarea.value,
    selectedText: textarea.value.slice(
      textarea.selectionStart,
      textarea.selectionEnd,
    ),
  }
}
interface MdeCommandOrchestratorProps {
  setText: (text: string) => void
  customCommands: MdeCommandMapProps
  refTextarea: RefObject<HTMLTextAreaElement | null>
  pasteOptions?: MdePasteOptions
}
export class MdeCommandOrchestrator {
  private readonly setText: (text: string) => void
  private readonly refTextarea: RefObject<HTMLTextAreaElement | null>
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
    refTextarea,
    pasteOptions,
  }: MdeCommandOrchestratorProps) {
    if (pasteOptions && !pasteOptions.saveImage) {
      throw new Error('paste options are incomplete. saveImage are required ')
    }
    this.commandMap = { ...getDefaultCommandMap(), ...(customCommands || {}) }
    this.pasteOptions = pasteOptions
    this.keyActivatedCommands = extractKeyActivatedCommands(customCommands)
    this.refTextarea = refTextarea
    this.textApi = new MdeTextAreaTextApi(refTextarea)
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
  public handleKeyCommand = async (
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
      return
    }
    this.isExecuting = true
    const textarea = this.refTextarea.current as HTMLTextAreaElement
    const initialState = getStateFromTextArea(textarea)
    await this.getCommand(commandName).execute({
      setText: this.setText,
      initialState,
      textApi: this.textApi,
      context,
    })
    this.isExecuting = false
  }
  /**
   * Executes the paste command
   */
  public executePasteCommand = async (event: ClipboardEvent): Promise<void> => {
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
   * Executes the drop command
   */
  public executeDropCommand = async (event: DragEvent): Promise<void> => {
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
