import { useRef, useState } from 'react'
import { hot } from 'react-hot-loader'
import Showdown from 'showdown'
import { Mde } from '../src'
import { MdeLanguage } from '../src/components/language'
import { MdeTabProps } from '../src/components/typings'
MdeLanguage.setLang('zh-cn')
export const App = hot(module)(() => {
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
  // const loadSuggestions = async (text: string) => {
  //   return new Promise<Suggestion[]>((accept, reject) => {
  //     setTimeout(() => {
  //       const suggestions: Suggestion[] = [
  //         {
  //           preview: 'Andre',
  //           value: '@andre',
  //         },
  //         {
  //           preview: 'Angela',
  //           value: '@angela',
  //         },
  //         {
  //           preview: 'David',
  //           value: '@david',
  //         },
  //         {
  //           preview: 'Louise',
  //           value: '@louise',
  //         },
  //       ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()))
  //       accept(suggestions)
  //     }, 250)
  //   })
  // }
  // const save: SaveImageHandler = async function* (
  //   data: ArrayBuffer,
  //   file: Blob,
  // ) {
  //   // Promise that waits for "time" milliseconds
  //   const wait = function (time: number) {
  //     return new Promise<void>((a, r) => {
  //       setTimeout(() => a(), time)
  //     })
  //   }
  //   // Upload "data" to your server
  //   // Use XMLHttpRequest.send to send a FormData object containing
  //   // "data"
  //   // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest
  //   await wait(2000)
  //   // yields the URL that should be inserted in the markdown
  //   yield 'https://picsum.photos/300'
  //   await wait(2000)
  //   // returns true meaning that the save was successful
  //   return true
  // }
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
