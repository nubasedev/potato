import {
  ClipboardEvent,
  DetailedHTMLFactory,
  forwardRef,
  TextareaHTMLAttributes,
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
    const TextareaComponent = (textareaComponent ||
      'textarea') as DetailedHTMLFactory<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >
    const handlePast = (e: ClipboardEvent<HTMLTextAreaElement>) => {
      const files = e?.clipboardData?.files ?? []
      if (!files.length) {
        return
      }
      e.preventDefault()
    }
    return (
      <StyledMdeTextareaContainer className='mde__textarea__container'>
        <TextareaComponent
          ref={ref}
          className='mde__textarea'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyCommand}
          onPaste={handlePast}
          data-testid='text-area'
          {...props}
        />
      </StyledMdeTextareaContainer>
    )
  },
)
MdeTextarea.displayName = 'MdeTextarea'
