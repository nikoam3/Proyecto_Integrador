import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import AddIcon from '@mui/icons-material/Add'

import CloseIcon from '@mui/icons-material/Close'
import { IconButton, SvgIcon } from '@mui/material'

export default function FormModalButton({
    text,
    title,
    children,
    handleClose,
    handleClickOpen,
    open,
}) {
    return (
        <div>
            <Button
                onClick={handleClickOpen}
                startIcon={
                    <SvgIcon fontSize="small">
                        <AddIcon />
                    </SvgIcon>
                }
                variant="contained"
            >
                {text}
            </Button>
            <Dialog open={open} onClose={handleClose}>
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
        </div>
    )
}
