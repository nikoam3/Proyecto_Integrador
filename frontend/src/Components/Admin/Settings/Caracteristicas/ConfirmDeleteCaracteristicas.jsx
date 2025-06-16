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
import { urlBase } from '../../../../Utils/constants'
import { useAuthContext } from '../../../../hooks/useAuthContext'

const ConfirmDeleteCaracteristicas = ({ dialog, handleOpen, handleClose }) => {
    const { user } = useAuthContext()
    const config = {headers: {Authorization :`Bearer ${user}`},}
    const handleDeleteConfirm = () => {
        axios
            .delete(urlBase + 'caracteristicas/' + dialog.id, config)
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
            <DialogTitle id="alert-dialog-title">
                Borrar Caracteristica
            </DialogTitle>
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

export default ConfirmDeleteCaracteristicas
