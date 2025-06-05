const urlBase = `https://back-mr-instruments-v24.onrender.com/`

const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjYiLCJmdWxsbmFtZSI6Ik5pY29sYXMgQW1heWEiLCJ1c2VyX3JvbGUiOiJST0xFX0FETUlOIiwic3ViIjoiYW1heWEubmlrby5hZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDg5OTAxMzEsImlzcyI6Imh0dHA6Ly9lNC1tci5pbnN0cnVtZW50cy5zMy13ZWJzaXRlLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tLyIsImV4cCI6MTc4MDUzMDEzMX0.cJW0Sd009cW1n8lC-gtHXR4M78GmIO43Md1asdcLSUDeWKH93Ba9Pgybw9NAEQlnsRitrEhIKgVmaKVgxrzyDQ';
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

export {urlBase, config}