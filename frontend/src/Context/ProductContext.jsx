import axios from 'axios'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { config, urlBase } from '../Utils/constants'

export const ProductContext = createContext()

export const isItemExists = (array, newItem) => {
    return array.some((item) => item.id === newItem.id)
}

const initialState = JSON.parse(localStorage.getItem('GlobalContext')) || {
    product: {},
    productList: [],
    favoritesList: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_LIST':
            localStorage.setItem('GlobalContext', JSON.stringify(state))
            return {
                ...state,
                productList: action.payload,
            }
        case 'GET_UNIQUE':
            localStorage.setItem('GlobalContext', JSON.stringify(state))
            return {
                ...state,
                product: action.payload,
            }
        case 'ADD_FAV':
            if (!isItemExists(state.favoritesList, action.payload)) {
                state.favoritesList.push(action.payload)
                localStorage.setItem('GlobalContext', JSON.stringify(state))
            }
            return {
                ...state,
            }
        case 'DELETE_FAV':
            const filteredState = {
                ...state,
                favoritesList: state.favoritesList.filter(
                    (fav) => fav.id !== action.payload.id
                ),
            }
            localStorage.setItem('GlobalContext', JSON.stringify(filteredState))
            return filteredState
        default:
            throw new Error()
    }
}

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        axios
            .get(urlBase + 'productos')
            .then((res) => {
                dispatch({ type: 'GET_LIST', payload: res.data })
            })
            .catch(console.log)
    }, [])

    return (
        <ProductContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}
export const useProducts = () => useContext(ProductContext)
