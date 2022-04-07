import { KeyboardEvent } from 'react'
export type MdeGenerateMarkdownPreview = (markdown: string) => Promise<string>
/**
 * If the command returns true for a given KeyboardEvent,
 * the command is executed
 */
export type MdeHandleKeyCommand = (
  e: KeyboardEvent<HTMLTextAreaElement>,
) => boolean
