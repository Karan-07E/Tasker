import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'react-hot-toast' // for toast notifications

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>     {/* to use routing features in the frontend */}
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>
)
