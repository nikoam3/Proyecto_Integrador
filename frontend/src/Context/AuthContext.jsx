import { createContext, useContext, useReducer } from 'react'

export const AuthContext = createContext()

const initialState = { user: localStorage.getItem('user') } || { user: null }

export const useAuth = () => useContext(AuthContext)

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
