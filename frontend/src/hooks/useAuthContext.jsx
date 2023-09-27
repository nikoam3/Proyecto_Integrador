import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw Error(
            'useAuthContext debe ser usado adentro del AuthContextProvider'
        )
    }
    return context
}
