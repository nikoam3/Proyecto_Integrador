import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Css/index.css'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@mui/material/styles'
import { themeResp } from './Utils/theme.jsx'
import { ProductProvider } from './Context/ProductContext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import { SnackbarProvider } from './Context/SnackContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={themeResp}>
            <SnackbarProvider>
                <AuthProvider>
                    <ProductProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </ProductProvider>
                </AuthProvider>
            </SnackbarProvider>
        </ThemeProvider>
    </React.StrictMode>
)
