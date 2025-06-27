import {
  Bold,
  Code2,
  Heading,
  Image,
  Italic,
  Link,
  List,
  ListChecks,
  ListOrdered,
  Quote,
  Strikethrough,
} from 'lucide-react'
import { FC, type HTMLProps } from 'react'
import styles from './styles.module.scss'
import { MdeIconProviderProps } from './typings.ts'
const MdeSvgContainer: FC<HTMLProps<HTMLDivElement>> = (props) => (
  <div data-fc-mde-svg-icon-container {...props} />
)
export const MdeSvgIcon: FC<MdeIconProviderProps> = ({ icon }) => {
  const Icon =
    {
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
    }?.[icon] ?? null
  if (!Icon) {
    return null
  }
  return (
    <MdeSvgContainer>
      <Icon className={styles.main} data-fc-mde-svg-icon />
    </MdeSvgContainer>
  )
}
