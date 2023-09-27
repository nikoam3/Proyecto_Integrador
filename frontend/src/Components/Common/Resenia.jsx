import * as React from 'react'
import { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import StarIcon from '@mui/icons-material/Star'
import axios from 'axios'
import { urlBase, config } from '../../Utils/constants'
import { useSnackbar } from '../../Context/SnackContext'

const labels = {
    0.5: 'Ineficiente',
    1: 'Ineficiente+',
    1.5: 'Regular',
    2: 'Regular+',
    2.5: 'Bueno',
    3: 'Bueno+',
    3.5: 'Muy bueno',
    4: 'Muy bueno+',
    4.5: 'Excelente',
    5: 'Excelente+',
}

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

const fecha = Date.now()
const ahora = new Date(fecha)

export default function Resenia({ idProducto, usuarioLog }) {
    const [value, setValue] = useState(0)
    const [hover, setHover] = useState(-1)
    const [resenias, setResenias] = useState([])
    const { showSnackbar } = useSnackbar()

    const handleClick = (newValue) => {
        const formData = {
            valoracion: newValue,
            nombreUsuario: usuarioLog.fullname,
            fechaPublicacion: ahora.getDate(),
            comentario: '',
            usuario: { id: usuarioLog.id },
            producto: { id: idProducto },
        }
        axios
            .post(urlBase + 'resenias', formData, config)
            .then((res) => {
                if (res.status === 200) {
                    showSnackbar(
                        `Calificación ${newValue} enviada con éxito!`,
                        'success'
                    )
                    setValue(0)
                }
            })
            .catch(console.log)
    }

    useEffect(() => {
        axios
            .get(urlBase + 'resenias/producto/' + idProducto, config)
            .then((res) => {
                setResenias(res.data)
                calculoValor()
            })
            .catch(console.log)
    }, [value])

    function calculoValor() {
        let cont = 0
        let suma = 0
        let valor = 0
        resenias.map((resenia) => {
            suma += resenia.valoracion
            cont += 1
        })
        valor = suma / cont
        Math.round(valor)
        setValue(Math.round(valor))
    }

    return (
        <Box
            sx={{
                width: 250,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {usuarioLog ? (
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                        handleClick(newValue)
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover)
                    }}
                    emptyIcon={
                        <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                        />
                    }
                />
            ) : (
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    readOnly
                />
            )}

            {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    )
}
