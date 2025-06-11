import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config, urlBase } from '../../../../Utils/constants'
import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
} from '@mui/material'
import ConfirmDelete from './ConfirmDeleteCategories'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import FormDialogCategories from './FormDialogCategories'
const Categories = ({ handleClickOpen }) => {
    const [categories, setCategories] = useState([])
    const getData = () => {
        axios
            .get(urlBase + 'categorias')
            .then((res) => {
                setCategories(res.data)
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
            {categories.map((item) => (
                <Chip
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                    key={item.id}
                    label={item.titulo}
                    variant="filled"
                    onClick={handleClick}
                    onDelete={() => handleDelete(item)}
                />
            ))}
            <FormDialogCategories />
            <ConfirmDelete
                dialog={dialog}
                handleOpen={open}
                handleClose={handleClose}
            />
        </>
    )
}

export default Categories
