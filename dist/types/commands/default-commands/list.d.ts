import { MdeTextApi, MdeTextState } from '../../typings/command-options.ts';
import { MdeCommandProps } from '../command.ts';
export type AlterLineFunction = (line: string, index: number) => string;
/**
 * Inserts insertionString before each line
 */
export declare function insertBeforeEachLine(selectedText: string, insertBefore: string | AlterLineFunction): {
    modifiedText: string;
    insertionLength: number;
};
export declare const makeList: (state0: MdeTextState, api: MdeTextApi, insertBefore: string | AlterLineFunction) => MdeTextState;
export declare const unorderedListCommand: () => MdeCommandProps;
export declare const orderedListCommand: () => MdeCommandProps;
export declare const checkedListCommand: () => MdeCommandProps;
