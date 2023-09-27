import { useScrollTrigger } from '@mui/material'
import React from 'react'

const ScrollHandler = (props) => {
    console.log(trigger)

    return React.cloneElement(props.children, {
        style: {
            backgroundColor: trigger ? 'red' : 'red',
            transition: trigger ? '0.3s' : '0.5s',
            boxShadow: 'none',
        },
    })
}

const ScrollToColor = (props) => {
    return <ScrollHandler {...props}>{props.children}</ScrollHandler>
}

export default ScrollToColor
