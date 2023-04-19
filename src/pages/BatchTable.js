import React from 'react'
import CommonTable from '../components/table/CommonTable'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Button } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import instance from './Host'

const Batch = () => {
    const [Ans, setAns] = React.useState('')

    React.useEffect(() => {
        instance.post('Batch/view').then((res) => {

            setAns(res.data.message.message.message)

        })
    }, [])

    const view = (id) => {
        localStorage.setItem('viewbtn', true)
    }
    const Edit = (id) => {
        localStorage.setItem('viewbtn', false)
    }
    const Remove = (InvoiceID) => {
        console.log(typeof (id));

        instance.post('Batch/delete', { InvoiceID })
    }

    const header = [
        { field: "BatchID", headerName: "BatchID", width: 140, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "BatchName", headerName: "BatchName", width: 140, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "StartDate", headerName: "StartDate", width: 115, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "EndDate", headerName: "EndDate", width: 115, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "Session", headerName: "Session", width: 140, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "StartTime", headerName: "StartTime", width: 140, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "EndTime", headerName: "EndTime", width: 140, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "Count", headerName: "Count", width: 140, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        {
            field: "Action",
            width: 250,
            headerClassName: "super-app-theme--header", headerAlign: 'start',
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {


                return (
                    <>

                        <Link to={`/Batch/BatchForm/viewid/${params.row.BatchID}`}>
                            <Button onClick={() => view()} sx={{ justifyContent: 'start', color: 'lightgray', p: 0 }}><VisibilityIcon /></Button>
                        </Link >

                        <Link to={`/Batch/BatchForm/update/${params.row.BatchID}`}>
                            <Button onClick={() => Edit()} sx={{ justifyContent: 'start', color: 'blue', p: 0 }}><EditIcon /></Button>
                        </Link>

                        <Button onClick={() => Remove(params.row.BatchID)} sx={{ justifyContent: 'start', color: 'red', p: 0 }}><DeleteIcon /></Button>
                    </>
                )

            }
        },
    ]


    // const rows = [
    //     { id: 1, BatchID: "A10", BatchName: "Testing", StartDate: "22-08-2018", EndDate: "08-03-2019", Session: "6months", StartTime: "12.00", EndTime: "4.00", Count: "10", Available: "1" },
    //     { id: 2, BatchID: "A11", BatchName: "Front-End Developement", StartDate: "22-08-2018", EndDate: "08-03-2019", Session: "6months", StartTime: "12.00", EndTime: "4.00", Count: "10", Available: "1" },
    //     { id: 3, BatchID: "A12", BatchName: "Back-End Developement", StartDate: "22-08-2018", EndDate: "08-03-2019", Session: "6months", StartTime: "12.00", EndTime: "4.00", Count: "10", Available: "1" },
    //     { id: 4, BatchID: "A13", BatchName: "FullStack Developement", StartDate: "22-08-2018", EndDate: "08-03-2019", Session: "6months", StartTime: "12.00", EndTime: "4.00", Count: "10", Available: "1" },
    //     { id: 5, BatchID: "A14", BatchName: "UI/UX Designer", StartDate: "22-08-2018", EndDate: "08-03-2019", Session: "6months", StartTime: "12.00", EndTime: "4.00", Count: "10", Available: "1" },
    //     { id: 6, BatchID: "A15", BatchName: "Manual Testing", StartDate: "22-08-2018", EndDate: "08-03-2019", Session: "6months", StartTime: "12.00", EndTime: "4.00", Count: "10", Available: "1" }
    // ]


    const rows = [...Ans]

    return (
        <>

            <CommonTable header={header} rows={rows} id='BatchID' typo="Batch Table" path="/Batch/BatchForm" button="Create Batch" />
        </>
    )
}

export default Batch;