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
import { MdeIconProviderProps } from './typings'
const StyledMdeSvg = styled.div`
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: inherit;
  overflow: visible;
  vertical-align: -0.125em;
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
