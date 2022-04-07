/**
 * Inserts the given text at the cursor. If the element contains a selection, the selection
 * will be replaced by the text.
 */
export const insertText = (
  input: HTMLTextAreaElement | HTMLInputElement,
  text: string,
) => {
  input.setRangeText(
    text,
    input.selectionStart || 0,
    input.selectionEnd || 0,
    'select',
  )
}
