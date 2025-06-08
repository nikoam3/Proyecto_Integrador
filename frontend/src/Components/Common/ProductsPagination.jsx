import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import { Box } from '@mui/material'
import axios from 'axios'
import { config, urlBase } from '../../Utils/constants'

const ProductsPagination = ({ setProducts, setLoading, loading }) => {
    const pageSize = 5
    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize,
    })
    useEffect(() => {
        axios
            .get(urlBase + 'productos', config)
            .then((res) => {
                let data = res.data.slice(pagination.from, pagination.to)
                return {
                    count: res.data.length,
                    data: data,
                }
            })
            .then((res) => {
                setPagination({ ...pagination, count: res.count })
                setProducts(res.data)
                setLoading(false)
            })
            .finally(setLoading(true))
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
