import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import NotesProvider from './context/Notes.tsx'
import TagsProvider from './context/Tags.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TagsProvider>
        <NotesProvider>
          <App />
          <Toaster position='bottom-center' />
        </NotesProvider>
      </TagsProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
