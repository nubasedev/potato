import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, } from 'react';
import styles from './styles.module.scss';
export const MdeTextarea = forwardRef(({ value, setValue, textareaComponent, onKeyCommand, ...props }, ref) => {
    const TextareaComponent = (textareaComponent ||
        'textarea');
    const handlePast = (e) => {
        const files = e?.clipboardData?.files ?? [];
        if (!files.length) {
            return;
        }
        e.preventDefault();
    };
    return (_jsx("div", { className: styles.container, "data-fc-mde-textarea-container": true, children: _jsx(TextareaComponent, { ref: ref, className: styles.main, value: value, onChange: (e) => setValue(e.target.value), onKeyDown: onKeyCommand, onPaste: handlePast, "data-fc-mde-textarea": true, ...props }) }));
});
MdeTextarea.displayName = 'MdeTextarea';
