import React, { useState } from 'react'
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
} from '@mui/material'
import axios from 'axios'
import { urlBase, config } from '../../../Utils/constants'
import { useSnackbar } from '../../../Context/SnackContext'
import { useLoadUsers } from '../../../hooks/Admin/useLoadUsers'

const ProductActionsDeleteIcon = ({ dialog, handleOpen, handleClose }) => {
    const { getData } = useLoadUsers()
    const { showSnackbar } = useSnackbar()
    const handleDeleteConfirm = () => {
        axios
            .delete(urlBase + 'productos/' + dialog.id, config)
            .then((res) => {
                if (res.status == 200) {
                    showSnackbar(`Producto Eliminado`, 'success')
                    getData()
                    handleClose()
                }
            })
            .catch(console.log)
    }
    return (
        <>
            <Dialog
                open={handleOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Eliminar producto ID: {dialog.id}
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
        </>
    )
}

export default ProductActionsDeleteIcon
