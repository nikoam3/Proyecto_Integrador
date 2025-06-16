import { useState } from 'react'
import axios from 'axios'
import { urlBase } from '../Utils/constants'
import { useAuthContext } from './useAuthContext'
import { useSnackbar } from '../Context/SnackContext'
import { useLogin } from './useLogin'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const { showSnackbar } = useSnackbar()
    const { login } = useLogin()

    const signUp = (nombre, apellido, email, password) => {
        setIsLoading(true)
        setError(null)
        const config = { headers: { 'Content-Type': 'application/json' } }
        axios
            .post(
                urlBase + 'usuarios',
                JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    email: email,
                    password: password,
                    userRol: 'ROLE_USER',
                }),
                config
            )
            .then((response) => {
                if (response.status === 200) {
                    login(email, password)
                }
            })
            .catch((err) => {
                setTimeout(() => {
                    showSnackbar(`${err.response.data.message}`, 'error')
                    setIsLoading(false)
                }, '1000')
            })
    }
    const signUpAdmin = (nombre, apellido, email, password, role) => {
        setIsLoading(true)
        setError(null)
        const res = axios.post(
            urlBase + 'register',
            JSON.stringify({
                nombre: nombre,
                apellido: apellido,
                email: email,
                password: password,
                userRol: role,
            }),
            config
        )

        if (res.status === 400) {
            setIsLoading(false)
            setError(res.error)
        }
        if (res.status === 200) {
            localStorage.setItem('user', res.data)
            dispatch({ type: 'LOGIN', payload: res.data })
        }
    }

    return { signUp, signUpAdmin, isLoading, error }
}
