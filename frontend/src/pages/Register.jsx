import {useContext, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import {Button, Container, Box} from '@mui/material'
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';


const Register = () => {
    const {registerUser} = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: '',
        full_name: '', 
        bio: '',
        password: '',
        cpassword: '',
    })

    const handleFormData = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault()
        await registerUser(formData.email, formData.full_name, formData.bio, formData.password, formData.cpassword)
    }

  return (
    <Container>
        <form onSubmit={handleSubmit}>
        <Box className='formContainer'>
            <h1>Register</h1>

            <Box className='formField'>
                <TextField label="Email" variant="outlined" name='email' onChange={handleFormData} required fullWidth />
            </Box>

            <Box className='formField'>
                <TextField label="Full Name" variant="outlined" name='full_name' onChange={handleFormData} required fullWidth />
            </Box>

            <Box className='formField'>
                <TextField label="Bio" variant="outlined" name='bio' onChange={handleFormData} fullWidth autoComplete='off' />
            </Box>

            <Box className='formField'>
                <TextField type='password' label="Password" variant="outlined" name='password' onChange={handleFormData} required fullWidth autoComplete='off' />
            </Box>

            <Box className='formField'>
                <TextField type='password' label="Confirm Password" variant="outlined" name='cpassword' onChange={handleFormData} required fullWidth autoComplete='off' />
            </Box>

            <Button type='submit' className='formButton' variant="contained" size='large' fullWidth sx={{marginBottom:'10px'}}>Register</Button>
            <Link to='/login' style={{textDecoration:'none'}}>already have an account? login!</Link>

        </Box>
        </form>
    </Container>
  )
}

export default Register