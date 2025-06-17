import {
    Dialog,
    DialogTitle,
    IconButton,
} from '@mui/material'
import axios from 'axios'
import { urlBase } from '../../../Utils/constants'
import { useSnackbar } from '../../../Context/SnackContext'
import { useLoadUser } from '../../../hooks/Admin/useLoadUser'
import CloseIcon from '@mui/icons-material/Close'
import { useAuthContext } from '../../../hooks/useAuthContext'

const ActionsModifyIcon = ({
    /*user,*/
    handleOpen,
    handleClose,
    children,
    title,
}) => {
    const { user } = useAuthContext()
    let config = { headers: { Authorization: `Bearer ${user}` }, }
    config = { headers: { 'Content-Type': 'application/json' } }
    const { getDataUserUnique } = useLoadUser()
    const { showSnackbar } = useSnackbar()

    const handleModify = () => {
        axios
            .update(urlBase + 'usuarios/' + user.id, config)
            .then((res) => {
                if (res.status == 200) {
                    showSnackbar(`Usuario Actualizado con exito!`, 'success')
                    handleClose()
                }
            })
            .catch(console.log)
    }
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

export default ActionsModifyIcon
