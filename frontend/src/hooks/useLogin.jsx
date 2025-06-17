import { useState } from 'react'
import axios from 'axios'
import { urlBase } from '../Utils/constants'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import { publicRoutes } from '../Utils/routes'
import { useSnackbar } from '../Context/SnackContext'

export const useLogin = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const { showSnackbar } = useSnackbar()
    const config = { headers: { 'Content-Type': 'application/json' } }

    const login = (email, password) => {
        setIsLoading(true)
        setError(null)
        axios
            .post(
                urlBase + 'login',
                JSON.stringify({ email, password }),
                config
            )
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(() => {
                        localStorage.setItem('user', response.data)
                        showSnackbar('Usuario logueado con éxito!', 'success')
                        setIsLoading(false)
                        dispatch({ type: 'LOGIN', payload: response.data })
                        /*navigate(`/${publicRoutes.home}`)*/
                        navigate(-1)
                    }, '1000')
                }
            })
            .catch((err) => {
                setError(err)
                showSnackbar('Credenciales Incorrectas', 'error')
                setTimeout(() => {
                    setIsLoading(false)
                }, '1000')
            })
    }
    return { login, isLoading, error }
}
