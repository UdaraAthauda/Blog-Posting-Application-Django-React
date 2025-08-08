import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {

  return (
    <>

      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
