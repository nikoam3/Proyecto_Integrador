const urlBase = `https://back-mr-instruments-v24.onrender.com/`
const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjYiLCJmdWxsbmFtZSI6Ik5pY29sYXMgQW1heWEiLCJ1c2VyX3JvbGUiOiJST0xFX0FETUlOIiwic3ViIjoiYW1heWEubmlrby5hZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDkwOTE4NDgsImlzcyI6Imh0dHA6Ly9lNC1tci5pbnN0cnVtZW50cy5zMy13ZWJzaXRlLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tLyIsImV4cCI6MTc4MDYzMTg0OH0.VkXfPOjxZEaCJIP6O_qK17K1JPcy5ZL-bWu-pcttPqGlEbsqajaqBkW0zpc88nRCJ0fc3KP7CH86SuYajm4jNQ'
const config = {
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
}

export { urlBase, config }