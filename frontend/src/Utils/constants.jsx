const urlBase = `http://34.82.190.71/`
const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjQiLCJmdWxsbmFtZSI6IkFnbyBDb21lbGxvIiwidXNlcl9yb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6ImFnb2NvbTkzMzNAZ21haWwuY29tIiwiaWF0IjoxNjk4ODQ5ODc2LCJpc3MiOiJodHRwOi8vZTQtbXIuaW5zdHJ1bWVudHMuczMtd2Vic2l0ZS51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS8iLCJleHAiOjE3MzAzODk4NzZ9.KN8T0EmSEbsLdJfaABaYMHNriNimQplLrD6LJ38_mNR42gKktPE8z791GeeqBEENAnLGIycaP5y7LQ_STS-jFw';
    /*'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjUiLCJmdWxsbmFtZSI6Ik5pY29sYXMgQW1heWEiLCJ1c2VyX3JvbGUiOiJST0xFX0FETUlOIiwic3ViIjoiYW1heWEubmlrb0BnbWFpbC5jb20iLCJpYXQiOjE2OTg4NTY1NzcsImlzcyI6Imh0dHA6Ly9lNC1tci5pbnN0cnVtZW50cy5zMy13ZWJzaXRlLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tLyIsImV4cCI6MTczMDM5NjU3N30.JG1JeyGjF3nv_ztGr2ff_zI3v8H15lTSd8-AN-7s-HySHDf7Ebas5ZL1dwJakRPlLPsDQ9pSV_o2szIrIUXqfA'    */
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