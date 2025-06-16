import React, { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const ProductActionsModifyIcon = ({
    producto,
    handleOpen,
    handleClose,
    children,
    title,

}) => {

    return (
        <>
            <Dialog open={handleOpen} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {children}
            </Dialog>
        </>
    )
}

export default ProductActionsModifyIcon
