import { insertText } from '../utils/insert-text-at-position';
import { extractKeyActivatedCommands } from './command-utils';
import { getDefaultCommandMap, getDefaultSaveImageCommandName, } from './default-commands/defaults';
export class MdeTextAreaTextApi {
    refTextarea;
    constructor(refTextarea) {
        this.refTextarea = refTextarea;
    }
    replaceSelection = (text) => {
        const textarea = this.refTextarea.current;
        insertText(textarea, text);
        return getStateFromTextArea(textarea);
    };
    setSelectionRange = (selection) => {
        const textarea = this.refTextarea.current;
        textarea.focus();
        textarea.selectionStart = selection.start;
        textarea.selectionEnd = selection.end;
        return getStateFromTextArea(textarea);
    };
    getState = () => {
        const textarea = this.refTextarea.current;
        return getStateFromTextArea(textarea);
    };
}
export const getStateFromTextArea = (textarea) => {
    return {
        selection: {
            start: textarea.selectionStart,
            end: textarea.selectionEnd,
        },
        text: textarea.value,
        selectedText: textarea.value.slice(textarea.selectionStart, textarea.selectionEnd),
    };
};
export class MdeCommandOrchestrator {
    setText;
    refTextarea;
    textApi;
    commandMap;
    /**
     * Names of commands that can be activated by the keyboard
     */
    keyActivatedCommands;
    /**
     * Indicates whether there is a command currently executing
     */
    isExecuting = false;
    pasteOptions;
    constructor({ setText, customCommands, refTextarea, pasteOptions, }) {
        if (pasteOptions && !pasteOptions.saveImage) {
            throw new Error('paste options are incomplete. saveImage are required ');
        }
        this.commandMap = { ...getDefaultCommandMap(), ...(customCommands || {}) };
        this.pasteOptions = pasteOptions;
        this.keyActivatedCommands = extractKeyActivatedCommands(customCommands);
        this.refTextarea = refTextarea;
        this.textApi = new MdeTextAreaTextApi(refTextarea);
        this.setText = setText;
    }
    getCommand = (name) => {
        const command = this.commandMap[name];
        if (!command) {
            throw new Error(`Cannot execute command. Command not found: ${name}`);
        }
        return command();
    };
    /**
     * Tries to find a command the wants to handle the keyboard event.
     * If a command is found, it is executed and the function returns
     */
    handleKeyCommand = async (e) => {
        for (const commandName of this.keyActivatedCommands) {
            const cn = this.getCommand(commandName);
            if (cn?.handleKeyCommand?.(e)) {
                await this.executeCommand(commandName);
                return true;
            }
        }
        return false;
    };
    executeCommand = async (commandName, context) => {
        if (this.isExecuting) {
            return;
        }
        this.isExecuting = true;
        const textarea = this.refTextarea.current;
        const initialState = getStateFromTextArea(textarea);
        await this.getCommand(commandName).execute({
            setText: this.setText,
            initialState,
            textApi: this.textApi,
            context,
        });
        this.isExecuting = false;
    };
    /**
     * Executes the paste command
     */
    // public executePasteCommand = async (event: ClipboardEvent): Promise<void> => {
    //   if (this.pasteOptions) {
    //     return this.executeCommand(
    //       this.pasteOptions.command || getDefaultSaveImageCommandName(),
    //       {
    //         pasteOptions: this.pasteOptions,
    //         event: event,
    //       } as MdePasteCommandContext,
    //     )
    //   }
    // }
    /**
     * Executes the drop command
     */
    // public executeDropCommand = async (event: DragEvent): Promise<void> => {
    //   if (this.pasteOptions) {
    //     return this.executeCommand(
    //       this.pasteOptions.command || getDefaultSaveImageCommandName(),
    //       {
    //         pasteOptions: this.pasteOptions,
    //         event: event,
    //       } as MdePasteCommandContext,
    //     )
    //   }
    // }
    /**
     * Executes the "select image" command
     */
    executeSelectImageCommand = async (event) => {
        if (this.pasteOptions) {
            return this.executeCommand(this.pasteOptions.command || getDefaultSaveImageCommandName(), {
                pasteOptions: this.pasteOptions,
                event: event,
            });
        }
    };
    /**
     * Returns a command by name
     * @param name
     */
    getCommandByName = (name) => {
        return this.commandMap[name];
    };
}
