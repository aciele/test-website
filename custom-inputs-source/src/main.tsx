import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Detect basename dynamically - works for both GitHub Pages and local Docker
// GitHub Pages: /test-website/custom-inputs
// Local Docker: /custom-inputs
const basename = window.location.pathname.includes('/test-website/')
  ? '/test-website/custom-inputs'
  : '/custom-inputs'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
