import { jsx as _jsx } from "react/jsx-runtime";
import styles from './styles.module.scss';
export const MdeToolbarBtnGroup = ({ hidden, children, }) => {
    return (_jsx("div", { className: styles.btnGroup, "data-fc-mde-toolbar-button-group": true, "data-hidden": hidden || undefined, children: children }));
};
