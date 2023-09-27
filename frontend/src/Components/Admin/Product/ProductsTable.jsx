import { Box, Card } from '@mui/material'
import { Scrollbar } from '../../Common/Scrollbar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { urlBase, config } from '../../../Utils/constants'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ProductActionsDeleteIcon from './ProductActionsDeleteIcon'
import ProductActionsModifyIcon from './ProductActionsModifyIcon'
import ProductFormModify from './ProductFormModify'

export const ProductsTable = () => {

const columns = [
    {
        field: 'id',
        headerName: 'ID',
    },
    {
        field: 'nombre',
        headerName: 'Nombre',
        flex: 1,
    },
    {
        field: 'precio',
        headerName: 'Precio',
        type: 'number',
    },
    {
        field: 'categoria',
        headerName: 'Categoria',
        headerAlign: 'right',
        align: 'right',
        valueFormatter: ({ value }) => value.titulo,
        flex: 1,
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
                    label="Modify"
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

    const [products, setProducts] = useState([])
    const getData = async () => {
        await axios
            .get(urlBase + 'productos', config)
            .then((res) => {
                setProducts(res.data)
            })
            .catch(console.log)
    }
    
    const [openDelete, setOpenDelete] = useState(false)
    const [openModify, setOpenModify] = useState(false)
    const [productoSeleccionado, setProductoSeleccionado] = useState([])
    const [dialog, setDialog] = useState({
        mensaje: '',
    })
    const handleCloseDelete = () => {
        setOpenDelete(false)
    }
    const handleCloseModify = () => {
        setOpenModify(false)
    }

    const handleModify = (row) => {
        setOpenModify(true)
        setProductoSeleccionado(row)
    }
    const handleDelete = (products) => {
        setDialog({
            mensaje: `Usted va a eliminar el producto: ${products.nombre}`,
            id: products.id,
        })
        setOpenDelete(true)
    }
    useEffect(() => {
        getData()
    }, [openDelete, openModify])
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
                        rows={products}
                        columns={columns}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                    />
                </Box>
            </Scrollbar>
            <ProductActionsModifyIcon
                title={'Editar producto'}
                handleOpen={openModify}
                handleClose={handleCloseModify}
                producto={products}
            >
                <ProductFormModify handleClose={handleCloseModify}
                producto={productoSeleccionado} />
            </ProductActionsModifyIcon>
            <ProductActionsDeleteIcon
                dialog={dialog}
                handleOpen={openDelete}
                handleClose={handleCloseDelete}
            />
        </Card>
    )
}
