import { useState } from 'react'
import axios from 'axios'
import { useAdminContext } from '../useAdminContext'
import { urlBase } from '../../Utils/constants'
import { useAuthContext } from '../../hooks/useAuthContext'

export const useLoadUsers = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAdminContext()
    const { user } = useAuthContext()
    const config = { headers: { Authorization: `Bearer ${user}` }, }

    const getData = async () => {
        setIsLoading(true)
        setError(null)
        const res = await axios
            .get(urlBase + 'usuarios', config)
            .then((res) => {
                dispatch({ type: 'GET_USERS', payload: res.data })
            })
            .catch(console.log)
    }

    return { getData, isLoading, error }
}
