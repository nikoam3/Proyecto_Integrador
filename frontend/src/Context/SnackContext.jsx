import { Alert, Snackbar } from '@mui/material'
import { createContext, useContext, useState } from 'react'

export const SnackbarContext = createContext()

const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [typeColor, setTypeColor] = useState('info')

    const showSnackbar = (text, color) => {
        setMessage(text)
        setTypeColor(color)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setTypeColor('info')
    }

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={typeColor}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
            {children}
        </SnackbarContext.Provider>
    )
}

export { SnackbarProvider }

export const useSnackbar = () => useContext(SnackbarContext)
