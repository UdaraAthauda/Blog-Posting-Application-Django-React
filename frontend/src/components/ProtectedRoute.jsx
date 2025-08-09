import { useState, useEffect } from "react";
import {Navigate} from 'react-router-dom'
import api from '../api/api'
import {jwtDecode} from 'jwt-decode'

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refresh_token = localStorage.getItem('refresh')

        try{
            const res = await api.post('token/refresh/', {refresh: refresh_token})

            if (res.status === 200) {
                localStorage.setItem('access', res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch(error) {
            console.log('refresh token func error: ', error)
            setIsAuthorized(false)
        }
    }


    const auth = async () => {
        const token = localStorage.getItem('access')

        if (!token) {
            setIsAuthorized(false)
            return
        }

        const decode = jwtDecode(token)
        const tokenExpiration = decode.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return <div>Loading</div>
    } else {
        return isAuthorized ? children : <Navigate to='/login' />
    }
}

export default ProtectedRoute