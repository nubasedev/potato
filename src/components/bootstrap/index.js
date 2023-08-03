import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { MdeCommandOrchestrator } from '../../commands/command-orchestrator';
import { getDefaultCommandMap, getDefaultToolbarCommands, } from '../../commands/default-commands/defaults';
import { MdeSvgIcon } from '../icon/svg-icon';
import { MdePreview } from '../preview';
import { MdeTextarea } from '../textarea';
import { MdeToolbar } from '../toolbar';
import './global.scss';
import styles from './styles.module.scss';
export const Mde = ({ setText, refTextarea, commands = getDefaultCommandMap(), toolbarCommands = getDefaultToolbarCommands(), getIcon = (name) => _jsx(MdeSvgIcon, { icon: name }), readOnly = false, selectedTab = 'write', disablePreview = false, 
// paste,
onTabChange, loadingPreview, text, generateMarkdownPreview, textareaComponent, commandButtons, writeButton, previewButton, textareaProps, }) => {
    const refPreview = useRef(null);
    const commandOrchestrator = new MdeCommandOrchestrator({
        setText,
        customCommands: commands,
        refTextarea,
        // paste: paste? { ...pasteOptionDefaults, ...paste } : undefined,
    });
    // const handlePaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
    //   if (!paste?.saveImage) {
    //     return
    //   }
    //   await commandOrchestrator.executePasteCommand(e)
    // }
    // const handleDrop = async (e: DragEvent<HTMLTextAreaElement>) => {
    //   if (!paste?.saveImage) {
    //     return
    //   }
    //   await commandOrchestrator.executeDropCommand(e)
    // }
    const handleTabChange = (newTab) => {
        onTabChange(newTab);
    };
    const handleCommand = async (commandName) => {
        await commandOrchestrator.executeCommand(commandName);
    };
    const toolbarButtons = toolbarCommands
        .map((group) => {
        return group.map((commandName) => {
            const command = commandOrchestrator.getCommand(commandName);
            return {
                commandName: commandName,
                buttonContent: command.icon
                    ? command.icon(getIcon)
                    : getIcon(commandName),
                buttonProps: command.buttonProps,
                buttonComponentClass: command.buttonComponentClass,
            };
        });
    })
        .filter((item) => item);
    return (_jsxs("div", { className: styles.main, "data-fc-mde": true, children: [_jsx(MdeToolbar, { buttons: toolbarButtons, onCommand: handleCommand, onTabChange: handleTabChange, tab: selectedTab, readOnly: readOnly, disablePreview: disablePreview, buttonProps: commandButtons, writeButtonProps: writeButton, previewButtonProps: previewButton }), _jsx("div", { className: styles.container, "data-fc-mde-container": true, "data-hidden": selectedTab === 'preview' || undefined, children: _jsx(MdeTextarea, { ref: refTextarea, value: text, setValue: setText, textareaComponent: textareaComponent, onKeyCommand: commandOrchestrator.handleKeyCommand, ...textareaProps }) }), selectedTab !== 'write' && (_jsx(MdePreview, { ref: refPreview, loadingPreview: loadingPreview, generateMarkdownPreview: generateMarkdownPreview, markdown: text }))] }));
};
