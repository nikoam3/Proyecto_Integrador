import { useAuthContext } from './useAuthContext'
import { publicRoutes } from '../Utils/routes'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
    const navigate = useNavigate()
    const { dispatch } = useAuthContext()
    const logout = () => {
        localStorage.removeItem('user')
        navigate(`/${publicRoutes.home}`)
        dispatch({ type: 'LOGOUT' })
    }
    return { logout }
}
