import { createRoot } from 'react-dom/client'
import { App } from './App'
const c = document.getElementById('root')
c && createRoot(c).render(<App />)
