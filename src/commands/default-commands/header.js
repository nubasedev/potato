import { MdeLanguage } from '../../components/language';
import { selectWord } from '../../utils/markdown-util';
const setHeader = (initialState, api, prefix) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
        text: initialState.text,
        selection: initialState.selection,
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    // Add the prefix to the selection
    const state2 = api.replaceSelection(`${prefix}${state1.selectedText}`);
    // Adjust the selection to not contain the prefix
    return api.setSelectionRange({
        start: state2.selection.end - state1.selectedText.length,
        end: state2.selection.end,
    });
};
export const headerCommand = () => ({
    buttonProps: {
        'aria-label': MdeLanguage.gettext('Add header'),
        title: MdeLanguage.gettext('Add header'),
    },
    execute: ({ initialState, textApi, setText }) => {
        setText(setHeader(initialState, textApi, '### ').text);
    },
});
