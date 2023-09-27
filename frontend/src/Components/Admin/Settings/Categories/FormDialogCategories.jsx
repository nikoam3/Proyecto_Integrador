import * as React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

import CategoriesForm from './CategoriesForm'
import { Chip } from '@mui/material'

export default function FormDialogCategories() {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Chip
                label={'Agregar'}
                variant="filled"
                onClick={handleClickOpen}
                color="primary"
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agregar Categoria</DialogTitle>
                <CategoriesForm />
            </Dialog>
        </>
    )
}
