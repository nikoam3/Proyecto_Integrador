import { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import { Box } from '@mui/material'
import { useProducts } from '../../Context/ProductContext'

const ProductsPagination = ({ setProducts, loading }) => {
    const { state } = useProducts()
    const pageSize = 5
    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize,
    })

    useEffect(() => {
        let data = state.productList.slice(pagination.from, pagination.to)
        setPagination({ ...pagination, count: state.productList.length })
        setProducts(data)

    }, [pagination.from, pagination.to])

    const handlePageChange = (e, page) => {
        const from = (page - 1) * pageSize
        const to = (page - 1) * pageSize + pageSize
        setPagination({ ...pagination, from: from, to: to })
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Pagination
                count={Math.ceil(pagination.count / pageSize)}
                onChange={handlePageChange}
                disabled={loading}
            />
        </Box>
    )
}

export default ProductsPagination
