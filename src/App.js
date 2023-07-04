import React from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Login from './components/Login/Login'
import {useLocation} from 'react-router-dom'
import RootLayout from './components/RootLayout'
import SignUp from './components/SignUp/SignUp'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/footer/Footer'

function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/signup',
          element:<SignUp/>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App