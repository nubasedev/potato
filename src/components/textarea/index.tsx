import {
  DetailedHTMLFactory,
  forwardRef,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from 'react'
import styled from 'styled-components'
import { MdeTextareaProps } from './typings'
const StyledMdeTextareaContainer = styled.div`
  position: relative;
  .mde__textarea {
    outline: none;
    width: 100%;
    border: 0;
    vertical-align: top;
    resize: vertical;
    overflow-y: auto;
  }
`
export const MdeTextarea = forwardRef<HTMLTextAreaElement, MdeTextareaProps>(
  ({ value, setValue, textareaComponent, onKeyCommand, ...props }, ref) => {
    const [id] = useState<string>((Math.random() + 1).toString(36).substring(7))
    const TextareaComponent = (textareaComponent ||
      'textarea') as DetailedHTMLFactory<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >
    useEffect(() => {
      const event = new Event('input')
      document.querySelector(`[data-id="${id}"]`)?.dispatchEvent(event)
    }, [id])
    return (
      <StyledMdeTextareaContainer className='mde__textarea__container'>
        <TextareaComponent
          ref={ref}
          className='mde__textarea'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyCommand}
          data-testid='text-area'
          data-id={id}
          {...props}
        />
      </StyledMdeTextareaContainer>
    )
  },
)
MdeTextarea.displayName = 'MdeTextarea'
