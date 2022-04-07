import { ChangeEvent, ComponentClass, ReactNode } from 'react'
import { MdeTextApi, MdeTextState } from '../typings/command-options'
import { MdeHandleKeyCommand } from '../typings/function-types'
export type MdeGetIcon = (iconName: string) => ReactNode
export interface MdeExecuteOptions {
  initialState: MdeTextState
  textApi: MdeTextApi
  context?: MdeCommandContext
}
export interface MdeCommandProps {
  buttonComponentClass?: ComponentClass | string
  icon?: (getIconFromProvider: MdeGetIcon) => ReactNode
  buttonProps?: any
  execute: (options: MdeExecuteOptions) => void | Promise<void>
  /**
   * On every key-down, "handleKeyCommand", if defined, will be executed for every command.
   * The first "HandleKeyCommand" that returns true will cause the command to be executed.
   * "HandleKeyCommand" for subsequent commands will not be executed after the first one returns true.
   */
  handleKeyCommand?: MdeHandleKeyCommand
}
export interface MdeCommandContext {
  type: string
}
export interface MdePasteCommandContext extends MdeCommandContext {
  type: 'paste'
  event: ClipboardEvent | DragEvent | ChangeEvent
  pasteOptions: MdePasteOptions
}
export type MdeToolbarCommands = string[][]
export type MdeCommandMapProps = Record<string, CallableFunction>
export interface MdePasteOptions {
  /**
   * Generator function to save images pasted.
   * This generator should 1) Yield the image URL. 2) Return true if the save was successful or false, otherwise
   */
  saveImage: MdeSaveImageHandler
  /**
   * Command to execute on paste command
   */
  command?: string
  /**
   * The accept attribute specifies a filter for what file types the user can pick from the file input dialog box.
   */
  accept?: string
  /**
   * When present, it specifies that the user is allowed to enter more than one value in the file input dialog box.
   * By default is set to true
   */
  multiple?: boolean
}
export type MdeSaveImageHandler = (
  data: ArrayBuffer,
  file: Blob,
) => AsyncGenerator<string, boolean>
