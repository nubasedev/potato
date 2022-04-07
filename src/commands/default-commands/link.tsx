import { MdeLanguage } from '../../components/language'
import { selectWord } from '../../util/markdown-util'
import { MdeCommandProps } from '../command'
export const linkCommand = (): MdeCommandProps => ({
  buttonProps: {
    'aria-label': MdeLanguage.gettext('Add a link'),
    title: MdeLanguage.gettext('Add a link'),
  },
  execute: ({ initialState, textApi }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: initialState.text,
      selection: initialState.selection,
    })
    const state1 = textApi.setSelectionRange(newSelectionRange)
    // Replaces the current selection with the bold mark up
    const state2 = textApi.replaceSelection(`[${state1.selectedText}](url)`)
    // Adjust the selection to not contain the **
    textApi.setSelectionRange({
      start: state2.selection.end - 6 - state1.selectedText.length,
      end: state2.selection.end - 6,
    })
  },
  handleKeyCommand: (e) => (e.ctrlKey || e.metaKey) && e.key === 'k',
})
