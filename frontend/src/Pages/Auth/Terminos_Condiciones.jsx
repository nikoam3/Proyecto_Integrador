import React, { useState } from 'react'
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Snackbar,
    Grid,
    Divider
} from '@mui/material'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';

const Terminos_Condiciones = ({
    handleOpen,
    handleClose,
    title,
}) => {
    const scroll = 'paper'

    return (
        <>
            <Dialog
                maxWidth={'lg'}
                open={handleOpen}
                onClose={handleClose}
                scroll={scroll}>
                <DialogTitle sx={{
                    m: 0, p: 2,
                    typography: 'subtitle2',
                    textAlign: 'center',
                    textDecoration: 'underline',
                }}>
                    Políticas de Producto – MR. Instruments
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >

                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    TERMINOS Y CONDICIONES
                    <Typography gutterBottom>
                        Al navegar y utilizar nuestro sitio usted deja en manifiesto su conformidad y aceptación de los siguientes términos y condiciones generales. Recomendamos leerlos detenidamente y si usted considerara no estar de acuerdo y por consiguiente no aceptara alguna de las cláusulas aquí mencionadas, le solicitamos que abandone el sitio y se comunique con nuestro staff para realizar sus compras por otro medio.
                    </Typography>
                    <Grid container>
                        <Grid item xs>
                            <DialogContentText>
                                <Typography sx={{
                                    typography: 'subtitle',
                                    textAlign: 'left',
                                    textDecoration: 'underline',
                                }}>
                                    • QUEDA PROHIBIDO:
                                </Typography>
                                <Typography gutterBottom>
                                    (I) enviar o transmitir material con contenido sexual u obsceno; (II) enviar o transmitir información cuyo contenido sea, directa o indirectamente, y sin que lo siguiente se considere una limitación, transgresor, profano, abusivo, difamatorio y/o fraudulento; (III) enviar o transmitir archivos que contengan virus u otras características destructivas que puedan afectar de manera adversa el funcionamiento de una computadora ajena y/o puedan afectar el correcto funcionamiento de las mismas y/o del sitio; (IV) utilizar mrinstruments.com.ar, directa o indirectamente, para violar cualquier ley aplicable, cualquiera fuese su naturaleza, ya sea provincial, nacional o internacional; (V) utilizar nuestro servicios utilizando un nombre falso, erróneo o inexistente, ya sea como persona física o jurídica; (VI) enviar o transmitir información de propiedad de terceros o que pudiera afectar adversamente la imagen y/o los derechos de terceros.
                                </Typography>
                                <Typography sx={{
                                    typography: 'subtitle',
                                    textAlign: 'left',
                                    textDecoration: 'underline',
                                }}>
                                    • PRIVACIDAD DE LOS DATOS:
                                </Typography>
                                <Typography gutterBottom>
                                    MR. INSTRUMENTS no cederá, venderá ni entregará a otras empresas o personas físicas la información suministrada por Usted. MR. INSTRUMENTS no cederá, venderá ni negociará su base de datos con otras empresas o personas físicas. Usted acepta por el hecho de registrarse y operar con nosotros, el derecho de MR. INSTRUMENTS a comunicarse con Usted por vía electrónica o telefónica hasta que usted manifieste fehacientemente que no desea ser contactado.
                                </Typography>
                                <Typography sx={{
                                    typography: 'subtitle',
                                    textAlign: 'left',
                                    textDecoration: 'underline',
                                }}>
                                    • FUNCIONAMIENTO DEL SITIO:
                                </Typography>
                                <Typography gutterBottom >
                                    Usted acepta y reconoce que el sistema puede no siempre estar disponible debido a dificultades técnicas o fallas de Internet, o por cualquier otro motivo ajeno a MR. INSTRUMENTS razón por la cual no podrá imputársele responsabilidad alguna. El contenido de la pantalla relativa a MR. INSTRUMENTS, con sus programas, bases de datos, redes y archivos (y sin que se considere una limitación) son propiedad de MR. INSTRUMENTS. Su uso indebido, así como su reproducción serán objeto de las acciones judiciales que correspondan.
                                </Typography>
                                <Typography sx={{
                                    typography: 'subtitle',
                                    textAlign: 'left',
                                    textDecoration: 'underline',
                                }}>
                                    • STOCK Y DISPONIBILIDAD:
                                </Typography>
                                <Typography gutterBottom >
                                    MR. INSTRUMENTS cuenta con un stock permanente de la mayoría de los artículos exhibidos en este sitio; así mismo no garantiza la disponibilidad de el/los productos solicitados por el cliente en el/los talles y colores seleccionados al momento de la compra. En estos casos dependeremos, para su entrega, de la disponibilidad de nuestro proveedor. Si el producto estuviera en falta, le informaremos de manera que usted pueda optar por comprar o no hacerlo.
                                </Typography>
                                <Typography sx={{
                                    typography: 'subtitle',
                                    textAlign: 'left',
                                    textDecoration: 'underline',
                                }}>
                                    • MONTO MÍNIMO DE ALQUILER:
                                </Typography>
                                <Typography gutterBottom >
                                    MR. INSTRUMENTS establece como monto mínimo de alquiler en este sitio un valor de $100 (pesos cien) o su equivalente en Dólares estadounidenses o euros (valor del cambio al momento de realizar la transacción al tipo de cambio del Banco de la Nación Argentina).
                                </Typography>
                                <Typography sx={{
                                    typography: 'subtitle',
                                    textAlign: 'left',
                                    textDecoration: 'underline',
                                }}>
                                    • CONDICIONES DE ALQUILER:
                                </Typography>
                                <Typography gutterBottom >
                                    El tiempo mínimo de alquiler se establece en 3 meses para acceder a los precios indicados. Rogamos que para periodos inferiores a 3 meses o para alquilar por días contacten con nosotros personalmente para consultar las condiciones y precios. A la entrega del Instrumento se abonará la mensualidad correspondiente al primer mes, más una mensualidad en concepto de fianza. En los contratos que se inicien entre los días 1 al 15 del mes se abonará un mes completo, en los contratos iniciados entre el 15 y el 30 solo se abonará el 50% de una mensualidad. Si no puedes acudir a uno de nuestros puntos asociados MR. INSTRUMENTS para recoger el instrumento, devolverlo, o traerlo para reparar / puesta a punto, los gastos de transporte irán a cargo del cliente. En los instrumentos de viento en los que intervengan, cañas, compensadores, o boquillas de medidas especiales, deberán abonarse aparte, quedándose en propiedad para el arrendatario, por cuestiones obvias de salubridad. El arrendatario se compromete a mantener el instrumento en perfectas condiciones y se hace responsable de los daños, que sufra por cualquier causa, así como del extravío o robo del mismo, en cuyo caso se hará cargo de la reparación o pago del importe total del instrumento.
                                </Typography>
                            </DialogContentText>
                        </Grid>
                        <Divider orientation="vertical" flexItem >
                            {" "}
                        </Divider>
                        <Grid item xs>
                            <DialogContentText>
                                <Typography sx={{
                                    typography: 'subtitle',
                                    textAlign: 'left',
                                    textDecoration: 'underline',
                                }}>
                                    • ENVIOS:
                                </Typography>
                                <Typography gutterBottom >
                                    La mercadería es transportada por cuenta y riesgo del cliente. MR. INSTRUMENTS no se responsabiliza por la demora provocada por las logísticas al momento del despacho de los pedidos. MR. INSTRUMENTS no tiene injerencia desde que despacha la mercadería al correo o empresa de transporte y este la entrega al destino. MR. INSTRUMENTS no se responsabiliza por daños que pudiera sufrir la mercadería como consecuencia de una mala estiva o negligencia del transporte, desde el momento en que es despachada. Los envíos de mercadería quedan sujetos a la aceptación de la empresa transportista o postal, según sus condiciones de recepción por dimensiones peso y contenido. Las eventuales promociones de envío gratuito que pudiéramos publicar son exclusivas de las mercaderías que puedan ser enviadas de forma convencional por las empresas de correo postal. En caso de que un pedido o producto no aplique a las condiciones de recepción de la empresa postal, quedará sin efecto dicha promoción y el cliente podrá optar por realizar el envío por otra modalidad a su cuenta y orden, o bien cancelar la compra.
                                </Typography>
                                <Typography sx={{
                                    typography: 'subtitle',
                                    textAlign: 'left',
                                    textDecoration: 'underline',
                                }}>
                                    • PRECIOS:
                                </Typography>
                                <Typography gutterBottom >
                                    Los precios publicados son exclusivos del sitio web pudiendo encontrar ofertas y promociones que difieran de las ofrecidas en nuestros locales. En caso de notorias diferencias entre los precios reales de mercado y/o en vidriera o venta de mostrador de los locales de MR. INSTRUMENTS y el sitio web, publicados a consecuencias de claros errores técnicos o tipográficos, MR. INSTRUMENTS anulará la venta.
                                </Typography>
                                <Typography sx={{
                                    typography: 'subtitle',
                                    textAlign: 'left',
                                    textDecoration: 'underline',
                                }}>
                                    • FOTOS:
                                </Typography>
                                <Typography gutterBottom >
                                    Las fotos de los productos publicados son meramente ilustrativas, pudiendo existir diferencias menores con el producto, como así también accesorios que ejemplifiquen el uso o funcionamiento del producto y no estén incluidos en el precio. Ud. reconoce y acepta que los colores de los productos publicados pueden variar por cuestiones gráficas y/o de nitidez del catálogo web.
                                </Typography>
                                <Typography sx={{
                                    typography: 'subtitle',
                                    textAlign: 'left',
                                    textDecoration: 'underline',
                                }}>
                                    • CONDICIONES DE CAMBIOS Y O DEVOLUCIONES DE LOS PRODUCTOS:
                                </Typography>
                                <Typography gutterBottom >
                                    En caso de cambios y/o devoluciones notificarnos previamente al 011-4255549 y enviar por correo electrónico a ventas@mrinstruments.com.ar detalle del producto, referencia de orden de compra web o factura y detalle de la falla o desperfecto. El medio y costo del envío hacia nuestra dirección será asumido por el comprador, o podrá entregarlo en persona en nuestros locales comerciales. Si por alguna razón no logramos satisfacerlo con un cambio, se realizará la devolución del importe abonado únicamente del producto devuelto, no considerando gastos de envío ni embalaje. Realizamos cambios hasta 7 días después de haber recibido su compra, haciendo expresa la condición de que no se haya violentado la integridad del producto a devolver y/o sus embalajes originales.
                                    Motivos por los cuales puede solicitar una devolución:
                                    •	Producto adquirido que no haya sido despachado luego de 72hs hábiles.
                                    •	Producto errado, recibe un producto equivocado, sujeto a confirmación por nuestro departamento de ventas.
                                    •	Producto defectuoso, el producto presenta fallas y/o desperfectos de fabricación. En este caso la devolución quedará sujeta a nuestra aprobación luego de haber recibido el producto y que la falla o desperfecto haya sido confirmada por nuestro servicio técnico.
                                </Typography>
                                <Typography sx={{
                                    typography: 'subtitle',
                                    textAlign: 'left',
                                    textDecoration: 'underline',
                                }}>
                                    • CONDICIONES DE REEMBOLSO DEL PRODUCTO:
                                </Typography>
                                <Typography gutterBottom >
                                    Si el producto fue pagado con tarjeta de crédito, se hará la devolución a su tarjeta de crédito. Los tiempos de reversión de pagos con tarjetas de crédito, dependen exclusivamente de la entidad emisora de la tarjeta y pueden demorar hasta 15 días hábiles en impactar en su resumen. MR. INSTRUMENTS no se responsabiliza por estas demoras. Todos los productos que hayan sido pagados a través de pasarelas de pago o billeteras virtuales, serán reembolsados a través del mismo canal por el que fueron realizados los pagos. Para pagos realizados con depósito o transferencia directa a nuestras cuentas bancarias, MR. INSTRUMENTS contactará al cliente para que le indique una cuenta corriente o caja de ahorros en la que puede ser depositado el dinero.
                                    Los términos y condiciones de uso de mrinstruments.com.ar pueden modificarse sin previo aviso, por lo que recomendamos consultarlos frecuentemente para informarse de posibles actualizaciones.
                                </Typography>
                            </DialogContentText>
                        </Grid>
                    </Grid>

                </DialogContent>
                {/*<DialogContent dividers>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </Typography>
                    <Typography gutterBottom>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography gutterBottom>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                        magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                        ullamcorper nulla non metus auctor fringilla.
                    </Typography>
            </DialogContent>*/}
            </Dialog>
        </>
    )
}


export default Terminos_Condiciones