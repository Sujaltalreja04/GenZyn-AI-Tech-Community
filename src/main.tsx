import { StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary'
import { FatalErrorScreen } from './components/FatalErrorScreen'

declare global {
  interface Window {
    __GENZYN_REACT_ROOT__?: Root
  }
}

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)

let rootElement = document.getElementById('root')
if (!rootElement) {
  rootElement = document.createElement('div')
  rootElement.id = 'root'
  document.body.appendChild(rootElement)
}

const reactRoot = window.__GENZYN_REACT_ROOT__ ?? createRoot(rootElement)
window.__GENZYN_REACT_ROOT__ = reactRoot

reactRoot.render(
  <StrictMode>
    <ErrorBoundary fallback={<FatalErrorScreen />}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
