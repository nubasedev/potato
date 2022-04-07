import { TextareaHTMLAttributes } from 'react'
import { MdeComponentSimilarTo } from '../../util/type-utils'
export interface MdeTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  setValue: (text: string) => void
  height?: number
  maxHeight?: number
  minHeight?: number
  heightUnits?: string
  /**
   * Custom textarea component. "textAreaComponent" can be any React component which
   * props are a subset of the props of an HTMLTextAreaElement
   */
  textareaComponent?: MdeComponentSimilarTo<
    HTMLTextAreaElement,
    TextareaHTMLAttributes<HTMLTextAreaElement>
  >
  /**
   * On keydown, the TextArea will trigger "onPossibleKeyCommand" as an opportunity for React-Mde to
   * execute a command. If a command is executed, React-Mde should return true, otherwise, false.
   */
  // onPossibleKeyCommand?: (e: KeyboardEvent<HTMLTextAreaElement>) => boolean
}
