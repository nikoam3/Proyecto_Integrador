import { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'

export const useAdminContext = () => {
    const context = useContext(AdminContext)
    if (!context) {
        throw Error(
            'useAdminContext debe ser usado adentro del AdminContextProvider'
        )
    }
    return context
}
