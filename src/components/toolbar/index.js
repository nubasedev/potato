import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MdeLanguage } from '../language';
import { MdeToolbarButton } from './btn';
import { MdeToolbarBtnGroup } from './group';
import styles from './styles.module.scss';
export const MdeToolbar = ({ onTabChange, buttons, onCommand, readOnly, disablePreview, writeButtonProps, previewButtonProps, tab, buttonProps, }) => {
    const handleTabChange = (e, tab) => {
        e.preventDefault();
        onTabChange(tab);
    };
    if (!buttons?.length) {
        return null;
    }
    const writePreviewTabs = (_jsxs("div", { className: styles.tab, "data-fc-mde-tab": true, children: [_jsx("button", { type: 'button', className: styles.tabButton, "data-fc-mde-tab-button": true, onClick: (e) => handleTabChange(e, 'write'), "data-active": tab === 'write' || undefined, ...writeButtonProps, children: MdeLanguage.gettext('Write') }), _jsx("button", { type: 'button', className: styles.tabButton, "data-fc-mde-tab-button": true, onClick: (e) => handleTabChange(e, 'preview'), "data-active": tab === 'preview' || undefined, ...previewButtonProps, children: MdeLanguage.gettext('Preview') })] }));
    return (_jsxs("div", { className: styles.header, "data-fc-mde-header": true, children: [disablePreview || writePreviewTabs, buttons.map((commandGroup, i) => (_jsx(MdeToolbarBtnGroup, { hidden: tab === 'preview', children: commandGroup.map((c, j) => {
                    return (_jsx(MdeToolbarButton, { name: c.commandName, buttonContent: c.buttonContent, buttonProps: { ...(buttonProps || {}), ...c.buttonProps }, onClick: () => onCommand(c.commandName), readOnly: readOnly, buttonComponentClass: c.buttonComponentClass }, j));
                }) }, i)))] }));
};
