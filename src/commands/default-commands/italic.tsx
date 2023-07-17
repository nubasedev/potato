import { MdeLanguage } from '../../components/language'
import { selectWord } from '../../utils/markdown-util'
import { MdeCommandProps } from '../command'
export const italicCommand = (): MdeCommandProps => ({
  buttonProps: {
    'aria-label': MdeLanguage.gettext('Add italic text'),
    title: MdeLanguage.gettext('Add italic text'),
  },
  execute: ({ initialState, textApi, setText }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: initialState.text,
      selection: initialState.selection,
    })
    const state1 = textApi.setSelectionRange(newSelectionRange)
    // Replaces the current selection with the italic mark up
    const state2 = textApi.replaceSelection(`*${state1.selectedText}*`)
    // Adjust the selection to not contain the *
    setText(
      textApi.setSelectionRange({
        start: state2.selection.end - 1 - state1.selectedText.length,
        end: state2.selection.end - 1,
      }).text,
    )
  },
  handleKeyCommand: (e) => (e.ctrlKey || e.metaKey) && e.key === 'i',
})
