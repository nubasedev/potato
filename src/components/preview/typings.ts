import { ReactNode } from 'react'
import { MdeGenerateMarkdownPreview } from '../../typings/function-types'
export interface MdePreviewProps {
  loadingPreview?: ReactNode
  minHeight: number
  heightUnits: string
  generateMarkdownPreview: MdeGenerateMarkdownPreview
  markdown: string
}
