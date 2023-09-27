import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { esES } from '@mui/x-data-grid'

const theme = createTheme(
    {
        palette: {
            type: 'light',
            primary: {
                main: '#F85532',
            },
            secondary: {
                main: '#af0cf0',
            },
            error: {
                main: '#d50000',
            },
            background: {
                paper: '#fffaf8',
                default: '#FFF7F7',
            },
            warning: {
                main: '#ffc107',
            },
            neutral: {
                50: '#F8F9FA',
                100: '#F3F4F6',
                200: '#E5E7EB',
                300: '#D2D6DB',
                400: '#9DA4AE',
                500: '#6C737F',
                600: '#4D5761',
                700: '#2F3746',
                800: '#1C2536',
                900: '#111927',
            },
        },
        typography: {
            fontFamily: '"REM"',
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        boxShadow: 'none',
                    },
                },
            },
        },
    },
    esES
)
export const themeResp = responsiveFontSizes(theme)
