import { DetailedHTMLFactory, forwardRef, TextareaHTMLAttributes } from 'react'
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
  (
    {
      value,
      setValue,
      height,
      maxHeight,
      minHeight,
      heightUnits,
      textareaComponent,
      ...props
    },
    ref,
  ) => {
    const TextareaComponent = (textareaComponent ||
      'textarea') as DetailedHTMLFactory<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >
    const heightVal = height && heightUnits ? height + heightUnits : height
    const maxHeightVal =
      maxHeight && heightUnits ? maxHeight + heightUnits : maxHeight
    const minHeightVal =
      minHeight && heightUnits ? minHeight + heightUnits : minHeight
    return (
      <StyledMdeTextareaContainer className='mde__textarea__container'>
        <TextareaComponent
          className='mde__textarea'
          style={{
            height: heightVal,
            minHeight: minHeightVal,
            maxHeight: maxHeightVal,
          }}
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          data-testid='text-area'
          {...props}
        />
      </StyledMdeTextareaContainer>
    )
  },
)
MdeTextarea.displayName = 'MdeTextarea'
