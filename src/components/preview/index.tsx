import { forwardRef, ReactNode, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { MdePreviewCss } from './style'
import { MdePreviewProps } from './typings'
const StyledMdePreview = styled.div``
const StyledMdePreviewContent = styled.div`
  ${MdePreviewCss}
`
export const MdePreview = forwardRef<HTMLDivElement, MdePreviewProps>(
  ({ markdown, generateMarkdownPreview, loadingPreview }, ref) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [preview, setPreview] = useState<string>('')
    const [prevMarkdown, setPrevMarkdown] = useState<string>('')
    const generatePreview = useCallback(async () => {
      setPreview(await generateMarkdownPreview(markdown))
      setLoading(false)
    }, [generateMarkdownPreview, markdown])
    useEffect(() => {
      if (markdown !== prevMarkdown) {
        generatePreview()
        setPrevMarkdown(markdown)
      }
    }, [prevMarkdown, markdown, generatePreview])
    let content: ReactNode | null = null
    if (loading) {
      content = (
        <StyledMdePreviewContent className='mde__preview__content'>
          {loadingPreview}
        </StyledMdePreviewContent>
      )
    } else {
      content = (
        <StyledMdePreviewContent
          className='mde__preview__content'
          ref={ref}
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      )
    }
    return (
      <StyledMdePreview
        className='mde__preview'
        data-loading={loading || undefined}
        data-testid='mde-preview'
      >
        {content}
      </StyledMdePreview>
    )
  },
)
MdePreview.displayName = 'MdePreview'
