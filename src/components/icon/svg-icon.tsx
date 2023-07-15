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
import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { MDE_STYLE_ICON_SIZE } from '../config'
import { MdeIconProviderProps } from './typings'
const StyledMdeSvg = styled.div`
  width: ${MDE_STYLE_ICON_SIZE};
  height: ${MDE_STYLE_ICON_SIZE};
  svg {
    width: ${MDE_STYLE_ICON_SIZE};
    height: ${MDE_STYLE_ICON_SIZE};
  }
`
const MdeSvgContainer: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
  <StyledMdeSvg className='mde__svg-icon' {...props} />
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
      <Icon />
    </MdeSvgContainer>
  )
}
