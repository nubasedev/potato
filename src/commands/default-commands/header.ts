import { MdeLanguage } from '../../components/language'
import { MdeTextApi, MdeTextState } from '../../typings/command-options'
import { selectWord } from '../../util/markdown-util'
import { MdeCommandProps } from '../command'
const setHeader = (
  initialState: MdeTextState,
  api: MdeTextApi,
  prefix: string,
) => {
  // Adjust the selection to encompass the whole word if the caret is inside one
  const newSelectionRange = selectWord({
    text: initialState.text,
    selection: initialState.selection,
  })
  const state1 = api.setSelectionRange(newSelectionRange)
  // Add the prefix to the selection
  const state2 = api.replaceSelection(`${prefix}${state1.selectedText}`)
  // Adjust the selection to not contain the prefix
  api.setSelectionRange({
    start: state2.selection.end - state1.selectedText.length,
    end: state2.selection.end,
  })
}
export const headerCommand = (): MdeCommandProps => ({
  buttonProps: {
    'aria-label': MdeLanguage.gettext('Add header'),
    title: MdeLanguage.gettext('Add header'),
  },
  execute: ({ initialState, textApi }) => {
    setHeader(initialState, textApi, '### ')
  },
})
