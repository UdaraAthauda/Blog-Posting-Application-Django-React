import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import MyBlogs from './pages/MyBlogs'
import CreatePost from './pages/CreatePost'

function App() {

  return (
    <>

      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/posts' element={<ProtectedRoute><MyBlogs /></ProtectedRoute>} />
          <Route path='/create' element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
