import { ChangeEvent, KeyboardEvent, RefObject } from 'react';
import { MdeTextApi, MdeTextState } from '../typings/command-options';
import { MdeSelection } from '../typings/selection';
import { MdeCommandContext, MdeCommandMapProps, MdeCommandProps, MdePasteOptions } from './command';
export declare class MdeTextAreaTextApi implements MdeTextApi {
    private readonly refTextarea;
    constructor(refTextarea: RefObject<HTMLTextAreaElement | null>);
    replaceSelection: (text: string) => MdeTextState;
    setSelectionRange: (selection: MdeSelection) => MdeTextState;
    getState: () => MdeTextState;
}
export declare const getStateFromTextArea: (textarea: HTMLTextAreaElement) => MdeTextState;
interface MdeCommandOrchestratorProps {
    setText: (text: string) => void;
    customCommands: MdeCommandMapProps;
    refTextarea: RefObject<HTMLTextAreaElement | null>;
    pasteOptions?: MdePasteOptions;
}
export declare class MdeCommandOrchestrator {
    private readonly setText;
    private readonly refTextarea;
    private readonly textApi;
    private readonly commandMap;
    /**
     * Names of commands that can be activated by the keyboard
     */
    private keyActivatedCommands;
    /**
     * Indicates whether there is a command currently executing
     */
    private isExecuting;
    private readonly pasteOptions?;
    constructor({ setText, customCommands, refTextarea, pasteOptions, }: MdeCommandOrchestratorProps);
    getCommand: (name: string) => MdeCommandProps;
    /**
     * Tries to find a command the wants to handle the keyboard event.
     * If a command is found, it is executed and the function returns
     */
    handleKeyCommand: (e: KeyboardEvent<HTMLTextAreaElement>) => Promise<boolean>;
    executeCommand: (commandName: string, context?: MdeCommandContext) => Promise<void>;
    /**
     * Executes the paste command
     */
    /**
     * Executes the drop command
     */
    /**
     * Executes the "select image" command
     */
    executeSelectImageCommand: (event: ChangeEvent) => Promise<void>;
    /**
     * Returns a command by name
     * @param name
     */
    getCommandByName: (name: string) => CallableFunction;
}
export {};
