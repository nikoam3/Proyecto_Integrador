import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Grid, IconButton, Button, Box, Typography } from '@mui/material'

const CarouselImg = styled('img')({
    maxWidth: '100%',
})
const GalleryImg = styled('img')({
    width: '100px',
    height: 'auto',
})
const Carousel = ({productoImagenes}) => {
    const images = [
        'I01.png',
        'I03.png',
        'I05.png',
        'I07.png',
        'I09.png',
        'I11.png',
        'I13.png',
        'I15.png',
    ]
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedImage, setSelectedImage] = useState(images[0])

    const selectNewImage = (index, images, next = true) => {
        const condition = next
            ? selectedIndex < images.length - 1
            : selectedIndex > 0
        const nextIndex = next
            ? condition
                ? selectedIndex + 1
                : 0
            : condition
            ? selectedIndex - 1
            : images.length - 1
        setSelectedImage(images[nextIndex])
        setSelectedIndex(nextIndex)
    }

    const previous = () => {
        selectNewImage(selectedIndex, images, false)
    }
    const next = () => {
        selectNewImage(selectedIndex, images)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    display: 'inherit',
                    flexDirection: 'column',
                    alignItems: 'end',
                }}
            >
                <Typography>
                    {selectedIndex + 1}/{images.length}
                </Typography>
                <Box>
                    <IconButton onClick={previous}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton onClick={next}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box>
                <CarouselImg
                    src={`${productoImagenes}${selectedImage}`}
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: { xs: 'center', md: 'flex-start' },
                }}
            >
                {images.map((image, i) => (
                    <Box
                        sx={{
                            borderRadius: 2,
                            border: 'solid 2px',
                            borderColor: 'grey.500',
                            '&.active': {
                                borderColor: 'primary.main',
                            },
                            '&.inactive': {
                                opacity: '50%',
                            },
                        }}
                        key={i}
                        className={i == selectedIndex ? 'active' : 'inactive'}
                    >
                        <Button
                            onClick={() => {
                                setSelectedImage(images[i])
                                setSelectedIndex(i)
                            }}
                        >
                            <GalleryImg
                                draggable={'false'}
                                src={`${productoImagenes}${image}`}
                            />
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Carousel
