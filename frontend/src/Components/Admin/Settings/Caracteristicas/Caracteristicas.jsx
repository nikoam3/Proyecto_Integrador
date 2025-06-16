import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { urlBase } from '../../../../Utils/constants'
import {
    Chip,
} from '@mui/material'
import ConfirmDelete from './ConfirmDeleteCaracteristicas'
import FormDialogCaracteristicas from './FormDialogCaracteristicas'

const Caracteristicas = ({ handleClickOpen }) => {
    const [caracteristicas, setCaracteristicas] = useState([])
    const getData = async () => {
        await axios
            .get(urlBase + 'caracteristicas')
            .then((res) => {
                setCaracteristicas(res.data)
            })
            .catch(console.log)
    }
    useEffect(() => {
        getData()
    }, [])

    const [open, setOpen] = useState(false)
    const [dialog, setDialog] = useState({
        mensaje: '',
    })
    const handleClose = () => {
        setOpen(false)
    }
    const handleClick = () => {
        console.info('You clicked the Chip.')
    }
    const handleDelete = (item) => {
        setDialog({
            mensaje: 'Usted esta por borrar la categoria: ' + item.titulo,
            id: item.id,
        })
        setOpen(true)
    }

    return (
        <>
            {caracteristicas.map((item) => (
                <Chip
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                    key={item.id}
                    label={item.titulo}
                    variant="filled"
                    onClick={handleClick}
                    onDelete={() => handleDelete(item)}
                />
            ))}
            <FormDialogCaracteristicas />
            <ConfirmDelete
                dialog={dialog}
                handleOpen={open}
                handleClose={handleClose}
            />
        </>
    )
}

export default Caracteristicas
