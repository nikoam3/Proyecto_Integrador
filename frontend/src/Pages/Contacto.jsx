import axios from 'axios'
import React, { useEffect } from 'react'
import { config, urlBase } from '../Utils/constants'

const Home = () => {
    useEffect(() => {
        axios
            .get(urlBase + 'productos')
            .then(console.log)
            .catch(console.log)
    }, [])

    const bodyParameters = {
        key: 'value',
    }

    return (
        <main className="">
            <h1 style={{ textAlign: 'center' }}>Contacto</h1>
        </main>
    )
}

export default Home
