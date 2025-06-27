import { MdeCommandMapProps, MdeToolbarCommands } from '../command.ts'
import { boldCommand } from './bold.ts'
import { codeCommand } from './code.ts'
import { headerCommand } from './header.ts'
import { imageCommand } from './image.ts'
import { italicCommand } from './italic.ts'
import { linkCommand } from './link.ts'
import {
  checkedListCommand,
  orderedListCommand,
  unorderedListCommand,
} from './list.ts'
import { quoteCommand } from './quote.ts'
import { strikeThroughCommand } from './strike-through.ts'
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
