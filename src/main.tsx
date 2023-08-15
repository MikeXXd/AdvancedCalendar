import React from 'react'
import ReactDOM from 'react-dom/client'
import { Calendar } from './Calendar.tsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Calendar />
  </React.StrictMode>,
)
