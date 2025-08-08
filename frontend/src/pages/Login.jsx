import {useContext, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import {Button, Container, Box} from '@mui/material'
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';


const Login = () => {
    const {loginUser} = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleFormData = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault()
        await loginUser(formData.email, formData.password)
    }

  return (
    <Container>
        <form onSubmit={handleSubmit}>
        <Box className='formContainer'>
            <h1>Login</h1>

            <Box className='formField'>
                <TextField label="Email" variant="outlined" name='email' onChange={handleFormData} required fullWidth />
            </Box>

            <Box className='formField'>
                <TextField type='password' label="Password" variant="outlined" name='password' onChange={handleFormData} required fullWidth />
            </Box>

            <Button type='submit' className='formButton' sx={{marginBottom:'10px'}}>Login</Button>
            <Link to='/register'>don't have an account? register!</Link>

        </Box>
        </form>
    </Container>
  )
}

export default Login