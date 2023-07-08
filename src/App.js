import React from 'react'
import './App.css'
import RootLayout from './components/RootLayout'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <RootLayout/>
    </Router>
  )
}

export default App