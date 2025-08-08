import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Button } from '@mui/material'

const Home = () => {
    const {logoutUser} = useContext(AuthContext)
  return (
    <>
        <div>Home</div>

        <Button onClick={() => logoutUser()}>Logout</Button>

    </>
  )
}

export default Home