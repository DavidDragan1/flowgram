import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    </head>
    
    <App />
  </StrictMode>,
)
