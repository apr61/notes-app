import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import NotesProvider from './context/Notes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NotesProvider>
        <App />
        <Toaster position='bottom-center' />
      </NotesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
