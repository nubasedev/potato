import { jsx as _jsx } from "react/jsx-runtime";
import { Bold, Code2, Heading, Image, Italic, Link, List, ListChecks, ListOrdered, Quote, Strikethrough, } from 'lucide-react';
import styles from './styles.module.scss';
const MdeSvgContainer = (props) => (_jsx("div", { "data-fc-mde-svg-icon-container": true, ...props }));
export const MdeSvgIcon = ({ icon }) => {
    const Icon = {
        header: Heading,
        bold: Bold,
        italic: Italic,
        strikethrough: Strikethrough,
        code: Code2,
        quote: Quote,
        unorderedList: ListOrdered,
        orderedList: List,
        checkedList: ListChecks,
        link: Link,
        image: Image,
    }?.[icon] ?? null;
    if (!Icon) {
        return null;
    }
    return (_jsx(MdeSvgContainer, { children: _jsx(Icon, { className: styles.main, "data-fc-mde-svg-icon": true }) }));
};
