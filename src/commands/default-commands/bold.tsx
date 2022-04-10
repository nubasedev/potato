import { MdeLanguage } from '../../components/language'
import { selectWord } from '../../util/markdown-util'
import { MdeCommandProps } from '../command'
export const boldCommand = (): MdeCommandProps => ({
  buttonProps: {
    'aria-label': MdeLanguage.gettext('Add bold text'),
    title: MdeLanguage.gettext('Add bold text'),
  },
  execute: ({ initialState, textApi, setText }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: initialState.text,
      selection: initialState.selection,
    })
    const state1 = textApi.setSelectionRange(newSelectionRange)
    // Replaces the current selection with the bold mark up
    const state2 = textApi.replaceSelection(`**${state1.selectedText}**`)
    // Adjust the selection to not contain the **
    setText(
      textApi.setSelectionRange({
        start: state2.selection.end - 2 - state1.selectedText.length,
        end: state2.selection.end - 2,
      }).text,
    )
  },
  handleKeyCommand: (e) => (e.ctrlKey || e.metaKey) && e.key === 'b',
})
