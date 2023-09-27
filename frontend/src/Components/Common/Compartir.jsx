import React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Typography } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TelegramIcon from '@mui/icons-material/Telegram';
import { FacebookShareButton } from 'react-share';
import { TwitterShareButton } from 'react-share';
import { WhatsappShareButton } from 'react-share';
import { PinterestShareButton } from 'react-share';
import { TelegramShareButton } from 'react-share';
import LinkIcon from '@mui/icons-material/Link';
import { useSnackbar } from '../../Context/SnackContext';



export default function Compartir(descripcion, productoImagenes) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { showSnackbar } = useSnackbar()
    const pathname = window.location.href;

    const copyLink = () => {                           
        navigator.clipboard.writeText(pathname)
        showSnackbar(`Enlace Copiado`, 'success')
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return (
        <Box>
            <ShareIcon onClick={handleOpen}/>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box display='flex' flexDirection={'column'} alignItems={'center'} sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                ¡Comparti tu producto favorito!
                </Typography>
                <Box p='2'>
                    <img src={descripcion.productoImagenes+'I01.png'} alt="" />
                </Box>
                <Box display='flex' justifyContent={'center'}>
                    <Typography>
                        {descripcion.descripcion}
                    </Typography>
                </Box>
                <Box display="flex" flexDirection={'row'} justifyContent={'space-evenly'} p={2}>
                    <Box p={1}>
                        <FacebookShareButton
                            url={pathname}
                            quotes={'¡Me gusta MR. Instruments! '}
                        >
                            <FacebookIcon />
                        </FacebookShareButton>   
                    </Box>
                    <Box p={1}>
                        <TwitterShareButton
                            url={pathname}
                            title={'¡Me gusta MR. Instruments! '}
                        >
                            <TwitterIcon />
                        </TwitterShareButton> 
                    </Box>
                    <Box p={1}>
                        <TelegramShareButton
                            url={pathname}
                            title={'¡Me gusta MR. Instruments! '}
                        >
                            <TelegramIcon />
                        </TelegramShareButton> 
                    </Box>
                    <Box p={1}>
                        <PinterestShareButton
                            url={pathname}
                            description={'¡Me gusta MR. Instruments! '}
                        >
                            <PinterestIcon />
                        </PinterestShareButton> 
                    </Box>
                    <Box p={1}>
                        <WhatsappShareButton
                            url={pathname}
                            title={'¡Me gusta MR. Instruments! '}
                        >
                            <WhatsAppIcon />
                        </WhatsappShareButton> 
                    </Box>
                    <Box p={1} style={ {'cursor':'pointer'}}>
                        <LinkIcon
                            onClick={copyLink}
                        />  
                    </Box>
                </Box>
            </Box>
            </Modal>
        </Box>
    )
}
