import { Children, createContext, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(localStorage.getItem('access') ? true : false)
    const navigate = useNavigate()

    const loginUser = async (email, password) => {
        try{
            const res = await api.post('token/', {email, password})

            localStorage.setItem('access', res.data.access)
            localStorage.setItem('refresh', res.data.refresh)

            setUser(true)
            navigate('/')

        } catch(error) {
            consol.log('Login error: ',error)
        }
    }

    const registerUser = async (email, full_name, bio, password, cpassword) => {
        try{
            if (password === cpassword) {
                const res = await api.post('register/', 
                    {
                        email,
                        full_name,
                        bio,
                        password,
                    }
                )

                alert('Registration successful!')
                navigate('/login')

            } else {
                alert('Paswords do not match')
            }
        } catch(error) {
            console.log('Registration error: ', error)
            alert('Something went wrong during registration.');
        }
    }

    const logoutUser = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        setUser(false)
        alert('Loging out....')
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{user, loginUser, registerUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    )

}