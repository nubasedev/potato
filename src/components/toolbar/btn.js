import { jsx as _jsx } from "react/jsx-runtime";
import { createElement } from 'react';
import styles from './styles.module.scss';
const defaultButtonProps = {
    tabIndex: -1,
};
export const MdeToolbarButton = ({ buttonComponentClass, buttonContent, buttonProps, onClick, readOnly, name, }) => {
    const finalButtonProps = { ...defaultButtonProps, ...(buttonProps || {}) };
    const finalButtonComponent = buttonComponentClass || 'button';
    return (_jsx("div", { className: styles.btn, "data-fc-mde-toolbar-button": true, children: createElement(finalButtonComponent, {
            'data-fc-mde-toolbar-button-item': true,
            'data-name': name,
            ...finalButtonProps,
            ...{
                onClick,
                disabled: readOnly,
                type: 'button',
            },
        }, buttonContent) }));
};
