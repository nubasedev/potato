import { MdeSelection } from '../typings/selection';
import { MdeTextSection } from '../typings/text-section';
export declare function getSurroundingWord(text: string, position: number): MdeSelection;
/**
 * If the cursor is inside a word and (selection.start === selection.end)
 * returns a new Selection where the whole word is selected
 * @param text
 * @param selection
 */
export declare function selectWord({ text, selection }: MdeTextSection): MdeSelection;
/**
 *  Gets the number of line-breaks that would have to be inserted before the given 'startPosition'
 *  to make sure there's an empty line between 'startPosition' and the previous text
 */
export declare function getBreaksNeededForEmptyLineBefore(text: string | undefined, startPosition: number): number;
/**
 *  Gets the number of line-breaks that would have to be inserted after the given 'startPosition'
 *  to make sure there's an empty line between 'startPosition' and the next text
 */
export declare function getBreaksNeededForEmptyLineAfter(text: string | undefined, startPosition: number): number;
