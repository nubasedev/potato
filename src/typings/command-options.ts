import { MdeSelection } from './selection.ts'
/**
 * The state of the text of the whole editor
 */
export interface MdeTextState {
  /**
   * All the text in the editor
   */
  text: string
  /**
   * The text that is selected
   */
  selectedText: string
  /**
   * The section of the text that is selected
   */
  selection: MdeSelection
}
export interface MdeTextApi {
  /**
   * Replaces the current selection with the new text. This will make the new selectedText to be empty, the
   * selection start and selection end will be the same and will both point to the end
   * @param text Text that should replace the current selection
   */
  replaceSelection(text: string): MdeTextState
  /**
   * Selects the specified text range
   * @param selection
   */
  setSelectionRange(selection: MdeSelection): MdeTextState
  /**
   * Get the current text state
   */
  getState(): MdeTextState
}
