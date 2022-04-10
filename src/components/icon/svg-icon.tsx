import {
  faBold,
  faCode,
  faHeader,
  faImage,
  faItalic,
  faLink,
  faListCheck,
  faListOl,
  faListUl,
  faQuoteLeft,
  faStrikethrough,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  const faIcon =
    {
      header: faHeader,
      bold: faBold,
      italic: faItalic,
      strikethrough: faStrikethrough,
      code: faCode,
      quote: faQuoteLeft,
      unorderedList: faListUl,
      orderedList: faListOl,
      checkedList: faListCheck,
      link: faLink,
      image: faImage,
    }?.[icon] ?? null
  if (!faIcon) {
    return null
  }
  return (
    <MdeSvgContainer>
      <FontAwesomeIcon icon={faIcon} />
    </MdeSvgContainer>
  )
}
