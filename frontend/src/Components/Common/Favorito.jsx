import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import axios from 'axios'
import { urlBase, config } from '../../Utils/constants'
import { useAuthContext } from '../../hooks/useAuthContext'

let favoritoList = [];
let newConfig = config

export default function Favorito({ idProducto, usuarioLog }) {
    const [esFavorito, setEsFavorito] = useState(false);
    const { user } = useAuthContext()
    newConfig.headers.Authorization = `Bearer ${user}`

    const revisarFavorito = () => {
      axios
        .get(urlBase + 'favoritos/usuario/' + usuarioLog.id, newConfig)
        .then((res) => {
          favoritoList = res.data;
          const favorito = favoritoList.find((productoiD) => 
          productoiD.id == idProducto
          );
            if (favorito !== undefined) {
              setEsFavorito(true);
            } else {
              setEsFavorito(false);
            }
            
        })
        .catch(console.log)
    }

    useEffect(() => {
      if(usuarioLog){
        revisarFavorito()
      }
    },[usuarioLog])

    const handleClick = () => {

        if(esFavorito === true) {
            axios
            .delete(urlBase + 'favoritos/producto/' + idProducto, newConfig)
            .then((res) => {
                if (res.status === 200) {
                    setEsFavorito(!esFavorito)
                }
            })
            .catch(console.log)
        } else {
            const formData = {
            "id": idProducto
            }
            axios
            .post(urlBase + 'favoritos', formData, newConfig)
            .then((res) => {
                if (res.status === 200) {
                  setEsFavorito(!esFavorito)
                }
            })
            .catch(console.log)
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {!usuarioLog ? (
                <FavoriteBorderIcon />
            ) : esFavorito ? (
                <FavoriteIcon style={{ color: 'red' }} 
                    onClick={() => {
                        handleClick()
                    }}
                />
            ) : (
                <FavoriteBorderIcon
                    onClick={() => {
                        handleClick()
                    }}
                />
            )}
        </Box>
    )
}
