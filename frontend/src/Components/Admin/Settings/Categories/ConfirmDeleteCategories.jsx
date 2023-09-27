import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import axios from 'axios'
import { config, urlBase } from '../../../../Utils/constants'

const ConfirmDelete = ({ dialog, handleOpen, handleClose }) => {
    const handleDeleteConfirm = () => {
        axios
            .delete(urlBase + 'categorias/' + dialog.id, config)
            .then((res) => {
                if (res.status == 200) {
                    console.log(res.data)
                }
            })
            .catch(console.log)
    }
    return (
        <Dialog
            open={handleOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Borrar Categoria</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialog.mensaje}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancelar</Button>
                <Button onClick={() => handleDeleteConfirm()} autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDelete
