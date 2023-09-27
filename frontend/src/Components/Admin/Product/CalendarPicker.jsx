import React, { useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'
import { Box } from '@mui/material'
import axios from 'axios'
import { config, urlBase } from '../../../Utils/constants'

function getDates(startDate, endDate) {
    const dates = []
    let currentDate = startDate
    const addDays = function (days) {
        const date = new Date(this.valueOf())
        date.setDate(date.getDate() + days)
        return date
    }
    while (currentDate <= endDate) {
        dates.push(currentDate)
        currentDate = addDays.call(currentDate, 1)
    }
    return dates
}

const CalendarPicker = ({ reserveParams, setStateDates, stateDates }) => {
    const [datesReserves, setDatesReserves] = useState([])
    let dateStrings = []
    useEffect(() => {
        axios
            .get(urlBase + 'reservas/producto/' + reserveParams, config)
            .then((res) => {
                const data = res.data
                data.map((date) => {
                    if (date.reservaActiva) {
                        let reserva = {
                            fechaReserva: null,
                            fechaEntrega: null,
                        }
                        /*let [yearR, monthR, dayR] = date.fechaReserva.split('-')
                        const dateFechaReserva = new Date(
                            +yearR,
                            +monthR - 1,
                            +dayR
                        )*/
                        const dateFechaReserva = new Date(date.fechaReserva)
                        
                        /*let [dayE, monthE, yearE] = date.fechaEntrega.split('-')
                        const dateFechaEntrega = new Date(
                            +yearE,
                            +monthE - 1,
                            +dayE
                        )*/
                        const dateFechaEntrega = new Date(date.fechaEntrega)
                        reserva = {
                            fechaReserva: dateFechaReserva,
                            fechaEntrega: dateFechaEntrega,
                        }
                        dateStrings.push(
                            ...getDates(
                                reserva.fechaReserva,
                                reserva.fechaEntrega
                            )
                        )
                    }
                })
                setDatesReserves(dateStrings)
            })
            .catch(console.log)
    }, [])
    /* 
    const [open, setOpen] = useState(false)
    const refOne = useRef(null)

    useEffect(() => {
        document.addEventListener('click', hideOnClickOutside, true)
    }, [])
    const hideOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false)
        }
    } */
    return (
        <>
            {/* <input readOnly onClick={() => setOpen((open) => !open)} />
            <div ref={refOne}>
            </div> */}
            <Box width={'100%'}>
                <DateRangePicker
                    className="asdsdada"
                    staticRanges={[]}
                    inputRanges={[]}
                    onChange={(item) => setStateDates([item.selection])}
                    showSelectionPreview={false}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={stateDates}
                    direction="horizontal"
                    disabledDates={datesReserves}
                />
            </Box>
        </>
    )
}

export default CalendarPicker
