import { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { hot } from 'react-hot-loader'
import Showdown from 'showdown'
import { Mde } from '../src'
import { MdeTabProps } from '../src/components/toolbar/typings'
// import { MdeLanguage } from '../src/components/language'
// load languages, default en
// MdeLanguage.setLang('zh-cn')
const App = hot(module)(() => {
  const [value, setValue] = useState('### Hello World')
  const refTextarea = useRef<HTMLTextAreaElement>(null)
  const [tab, setTab] = useState<MdeTabProps>('write')
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })
  const handleValueChange = (value: string) => {
    setValue(value)
  }
  const handleTabChange = (tab: MdeTabProps) => {
    setTab(tab)
  }
  return (
    <Mde
      text={value}
      setText={handleValueChange}
      onTabChange={handleTabChange}
      refTextarea={refTextarea}
      generateMarkdownPreview={async (markdown) => {
        return converter.makeHtml(markdown)
      }}
      selectedTab={tab}
      // paste={{
      //   saveImage: save,
      // }}
    />
  )
})
const c = document.getElementById('root')
c && createRoot(c).render(<App />)
