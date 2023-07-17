import { forwardRef, ReactNode, useCallback, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { MdePreviewProps } from './typings'
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
        <div className={styles.content} data-fc-mde-preview-content>
          {loadingPreview}
        </div>
      )
    } else {
      content = (
        <div
          className={styles.content}
          ref={ref}
          data-fc-mde-preview-content
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      )
    }
    return (
      <div data-mde-preview data-loading={loading || undefined}>
        {content}
      </div>
    )
  },
)
MdePreview.displayName = 'MdePreview'
