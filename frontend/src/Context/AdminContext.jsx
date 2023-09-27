import { createContext, useContext, useReducer } from 'react'

export const AdminContext = createContext()

const initialState = { users: [], user: {}, loading: false }

export const useAdmin = () => useContext(AdminContext)

export const adminReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return { ...state, users: action.payload }
        case 'GET_USER':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AdminProvider = ({ children }) => {
    const [state, dispatch] = useReducer(adminReducer, initialState)
    console.log('AdminContext state: ', state)
    return (
        <AdminContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AdminContext.Provider>
    )
}
