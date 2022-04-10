import { ReactNode } from 'react'
import { MdeGenerateMarkdownPreview } from '../../typings/function-types'
export interface MdePreviewProps {
  loadingPreview?: ReactNode
  generateMarkdownPreview: MdeGenerateMarkdownPreview
  markdown: string
}
