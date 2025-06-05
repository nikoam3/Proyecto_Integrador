import { Box, IconButton, Card } from '@mui/material'
import { Scrollbar } from '../../Common/Scrollbar'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import { useEffect, useState } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { useLoadUsers } from '../../../hooks/Admin/useLoadUsers'
import { useAdminContext } from '../../../hooks/useAdminContext'
import ActionsDeleteIcon from './ActionsDeleteIcon'
import ActionsModifyIcon from './ActionsModifyIcon'
import UserFormModify from './UserFormModify'
export const UsersTable = () => {
    const { users } = useAdminContext()
    const { getData } = useLoadUsers()
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.1,
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            flex: 0.3,
        },
        {
            field: 'apellido',
            headerName: 'Apellido',
            flex: 0.3,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'userRol',
            align: 'right',
            headerAlign: 'right',
            headerName: 'Admin',
            flex: 0.2,
            renderCell: (params) => {
                if (params.value === 'ROLE_ADMIN') {
                    return <CheckIcon />
                }
                return <ClearIcon />
            },
        },
        {
            headerName: '',
            headerAlign: 'right',
            align: 'right',
            width: 150,
            cellClassName: 'actions',
            field: 'actions',
            type: 'actions',
            flex: 0.2,
            getActions: ({ row }) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Delete"
                        color="inherit"
                        onClick={() => handleModify(row)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        color="inherit"
                        onClick={() => handleDelete(row)}
                    />,
                ]
            },
        },
    ]
    useEffect(() => {
        getData()
    }, [])

    const [openDelete, setOpenDelete] = useState(false)
    const [openModify, setOpenModify] = useState(false)

    const [dialog, setDialog] = useState({
        mensaje: '',
    })
    const handleCloseDelete = () => {
        setOpenDelete(false)
    }
    const handleCloseModify = () => {
        setOpenModify(false)
    }

    const handleModify = (id) => {
        setOpenModify(true)
    }
    const handleDelete = (user) => {
        setDialog({
            mensaje: `Usted va a eliminar el usuario: ${user.nombre} ${user.apellido}`,
            id: user.id,
        })
        setOpenDelete(true)
    }
    return (
        <Card>
            <Scrollbar
                sx={{
                    '.simplebar-placeholder': {
                        display: 'none',
                    },
                }}
            >
                <Box sx={{ minWidth: 800 }}>
                    <DataGrid
                        sx={{
                            '.MuiDataGrid-cell:focus': {
                                outline: 'none',
                            },
                            '.MuiDataGrid-cell:focus-within': {
                                outline: 'none',
                            },
                        }}
                        rows={users}
                        columns={columns}
                        slotProps={{
                            pagination: {
                                labelRowsPerPage: 'Usuarios por página',
                            },
                        }}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Scrollbar>
            <ActionsModifyIcon
                title={'Editar usuario'}
                handleOpen={openModify}
                handleClose={handleCloseModify}
                user={''}
            >
                <UserFormModify />
            </ActionsModifyIcon>
            <ActionsDeleteIcon
                dialog={dialog}
                handleOpen={openDelete}
                handleClose={handleCloseDelete}
            />
        </Card>
    )
}
