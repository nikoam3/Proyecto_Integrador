import { useState } from 'react'
import axios from 'axios'
import { useAdminContext } from '../useAdminContext'
import { config, urlBase } from '../../Utils/constants'

export const useLoadUsers = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAdminContext()

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
