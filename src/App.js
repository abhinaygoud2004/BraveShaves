import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import RootLayout from './components/RootLayout'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <RootLayout />
      </Router>
    </Provider>
  )
}

export default App