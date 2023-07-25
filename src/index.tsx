import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main>
      <Router>
        <Routes>
          <Route element={<App />} path='/*' />
        </Routes>
      </Router>
    </main>
  </React.StrictMode>
)
