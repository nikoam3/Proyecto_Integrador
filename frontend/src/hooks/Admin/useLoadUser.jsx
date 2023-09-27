import { useState } from 'react'
import axios from 'axios'
import { useAdminContext } from '../useAdminContext'
import { config, urlBase } from '../../Utils/constants'

export const useLoadUser = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAdminContext()

    const getDataUserUnique = async (id) => {
        setIsLoading(true)
        setError(null)
        const res = await axios
            .get(urlBase + 'usuarios/' + id, config)
            .then((res) => {
                dispatch({ type: 'GET_USERS', payload: res.data })
            })
            .catch(console.log)
    }

    return { getDataUserUnique, isLoading, error }
}
