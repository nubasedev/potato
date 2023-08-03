import { boldCommand } from './bold';
import { codeCommand } from './code';
import { headerCommand } from './header';
import { imageCommand } from './image';
import { italicCommand } from './italic';
import { linkCommand } from './link';
import { checkedListCommand, orderedListCommand, unorderedListCommand, } from './list';
import { quoteCommand } from './quote';
import { strikeThroughCommand } from './strike-through';
export const getDefaultToolbarCommands = () => [
    ['header', 'bold', 'italic', 'strikethrough'],
    ['link', 'quote', 'code', 'image'],
    ['unorderedList', 'orderedList', 'checkedList'],
];
export const getDefaultCommandMap = () => ({
    header: headerCommand,
    bold: boldCommand,
    italic: italicCommand,
    strikethrough: strikeThroughCommand,
    link: linkCommand,
    quote: quoteCommand,
    code: codeCommand,
    image: imageCommand,
    unorderedList: unorderedListCommand,
    orderedList: orderedListCommand,
    checkedList: checkedListCommand,
});
export function getDefaultSaveImageCommandName() {
    return 'save-image';
}
