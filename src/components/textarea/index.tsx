import {
  ClipboardEvent,
  DetailedHTMLFactory,
  forwardRef,
  TextareaHTMLAttributes,
} from 'react'
import styles from './styles.module.scss'
import { MdeTextareaProps } from './typings'
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
      <div className={styles.container} data-fc-mde-textarea-container>
        <TextareaComponent
          ref={ref}
          className={styles.main}
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
