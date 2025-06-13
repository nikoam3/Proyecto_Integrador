import axios from 'axios'
import { createContext, useContext, useEffect, useReducer, useMemo } from 'react';
import { config, urlBase } from '../Utils/constants'
import { isItemExists } from '../Utils/helpers'

export const ProductContext = createContext()

const initialState = JSON.parse(localStorage.getItem('GlobalContext')) || {
    product: {},
    productList: [],
    favoritesList: [],
    loading: true,
    error: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload,
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case 'GET_LIST':
            return {
                ...state,
                productList: action.payload,
                loading: false,
            }
        case 'GET_UNIQUE':
            return {
                ...state,
                product: action.payload,
            }
        case 'ADD_FAV':
            if (!isItemExists(state.favoritesList, action.payload)) {
                return {
                    ...state,
                    favoritesList: [...state.favoritesList, action.payload],
                };
            }
            return state;
        case 'DELETE_FAV':
            return {
                ...state,
                favoritesList: state.favoritesList.filter(
                    (fav) => fav.id !== action.payload.id
                ),
            };
        default:
            return state;
    }
}

export const ProductProvider = ({ children }) => {
    const [state, setState] = useReducer(reducer, initialState)

    useEffect(() => {
        localStorage.setItem('GlobalContext', JSON.stringify(state));
    }, [state]);

    useEffect(() => {
        const fetchProducts = async () => {
            setState({ type: 'SET_LOADING', payload: true });
            try {
                const response = await axios.get(urlBase + 'productos');
                setState({ type: 'GET_LIST', payload: response.data });
            } catch (error) {
                setState({ type: 'SET_ERROR', payload: error.message });
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const contextValue = useMemo(() => ({
        state,
        dispatch: setState,
    }), [state]);

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    )
}
export const useProducts = () => useContext(ProductContext)
