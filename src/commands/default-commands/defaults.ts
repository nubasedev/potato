import { MdeCommandMapProps, MdeToolbarCommands } from '../command.ts'
import { boldCommand } from './bold.tsx'
import { codeCommand } from './code.tsx'
import { headerCommand } from './header.tsx'
import { imageCommand } from './image.tsx'
import { italicCommand } from './italic.tsx'
import { linkCommand } from './link.tsx'
import {
  checkedListCommand,
  orderedListCommand,
  unorderedListCommand,
} from './list.tsx'
import { quoteCommand } from './quote.tsx'
import { strikeThroughCommand } from './strike-through.tsx'
export const getDefaultToolbarCommands = (): MdeToolbarCommands => [
  ['header', 'bold', 'italic', 'strikethrough'],
  ['link', 'quote', 'code', 'image'],
  ['unorderedList', 'orderedList', 'checkedList'],
]
export const getDefaultCommandMap = (): MdeCommandMapProps => ({
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
})
export function getDefaultSaveImageCommandName() {
  return 'save-image'
}
