import {
  ClipboardEvent,
  forwardRef,
  useCallback,
  type ChangeEvent,
} from 'react'
import styles from './styles.module.scss'
import { MdeTextareaProps } from './typings'
export const MdeTextarea = forwardRef<HTMLTextAreaElement, MdeTextareaProps>(
  ({ value, setValue, textareaComponent, onKeyCommand, ...props }, ref) => {
    const TextareaComponent = textareaComponent || 'textarea'
    const handlePast = useCallback((e: ClipboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault()
      const files = e.clipboardData.files ?? []
      if (!files.length) {
        return
      }
    }, [])
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
      },
      [setValue],
    )
    return (
      <div className={styles.container} data-fc-mde-textarea-container>
        <TextareaComponent
          ref={ref}
          className={styles.main}
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyCommand}
          onPaste={handlePast}
          data-fc-mde-textarea
          {...props}
        />
      </div>
    )
  },
)
MdeTextarea.displayName = 'MdeTextarea'
