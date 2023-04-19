import * as React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridLogicOperator,
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Button } from '@mui/material/node';
import { Link, useLocation } from 'react-router-dom';
import AppBreadcrumbs from './Breadcrumbs';
import CommonTable from '../components/table/CommonTable';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import PrintIcon from '@mui/icons-material/Print';
import instance from './Host';

export default function InvoiceTable() {

    const [Ans, setAns] = React.useState('')

    React.useEffect(() => {
        instance.post('Invoice/view').then((res) => {

            setAns(res.data.message.message.message)

        })
    }, [])

    const view = (id) => {
        localStorage.setItem('viewbtn', true)

    }
    const Edit = (id) => {
    }
    const Remove = (InvoiceID) => {
        console.log(typeof (id));

        instance.post('Invoice/delete', { InvoiceID })
    }
    const header = [
        { field: 'InvoiceID', headerClassName: 'super-app-theme--header', headerAlign: 'start', width: 145 },
        { field: 'StudentName', headerClassName: 'super-app-theme--header', headerAlign: 'start', width: 145 },
        { field: 'InvoiceDate', headerClassName: 'super-app-theme--header', headerAlign: 'start', width: 145 },
        { field: 'CourseName', headerClassName: 'super-app-theme--header', headerAlign: 'start', width: 145 },
        { field: 'BatchName', headerClassName: 'super-app-theme--header', headerAlign: 'start', width: 145 },
        { field: 'TermAmount', headerClassName: 'super-app-theme--header', headerAlign: 'start', width: 145 },
        { field: 'Term', headerClassName: 'super-app-theme--header', headerAlign: 'start', width: 145 },
        { field: 'Discount', headerClassName: 'super-app-theme--header', headerAlign: 'start', width: 145 },
        { field: 'TotalAmount', headerClassName: 'super-app-theme--header', headerAlign: 'start', width: 145 },
        { field: 'PaymentMethod', headerClassName: 'super-app-theme--header', headerAlign: 'start', width: 145 },
        {
            field: "Action",
            width: 250,
            headerClassName: "super-app-theme--header", headerAlign: 'start',
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {


                return (
                    <>
                        <Link to={`print/${params.row.InvoiceID}`}>
                            <Button>  <PrintIcon /></Button>
                        </Link>
                        <Link to={`/Invoice/InvoiceForm/viewid/${params.row.InvoiceID}`}>
                            <Button onClick={() => view()} sx={{ justifyContent: 'start', color: 'lightgray', p: 0 }}><VisibilityIcon /></Button>
                        </Link >

                        <Link to={`/Invoice/InvoiceForm/update/${params.row.InvoiceID}`}>
                            <Button onClick={() => Edit()} sx={{ justifyContent: 'start', color: 'blue', p: 0 }}><EditIcon /></Button>
                        </Link>

                        <Button onClick={() => Remove(params.row.InvoiceID)} sx={{ justifyContent: 'start', color: 'red', p: 0 }}><DeleteIcon /></Button>
                    </>
                )

            }
        },


    ];
    // const rows = [
    //     { id: 1, InvoiceID: "LG_1", StudentID: "Rajesh", Date: "22-10-2022", Course: "FrontEnd Developer", Batch: "I", TermAmount: "25000", Terms: "2", Discount: "8%", TotalAmount: "38600", PaymentMethod: "cash" },
    //     { id: 2, InvoiceID: "LG_2", StudentID: "Suresh", Date: "22-10-2022", Course: "BackEnd Developer", Batch: "II", TermAmount: "25000", Terms: "2", Discount: "8%", TotalAmount: "38600", PaymentMethod: "DebitCard" },
    //     { id: 3, InvoiceID: "LG_3", StudentID: "karthik", Date: "22-10-2022", Course: "FullStack Developer", Batch: "I", TermAmount: "25000", Terms: "2", Discount: "8%", TotalAmount: "38600", PaymentMethod: "UPI" },
    //     { id: 4, InvoiceID: "LG_4", StudentID: "kumar", Date: "22-10-2022", Course: "UI/UX Designer", Batch: "I", TermAmount: "25000", Terms: "2", Discount: "8%", TotalAmount: "38600", PaymentMethod: "cash" },
    //     { id: 5, InvoiceID: "LG_5", StudentID: "kumar", Date: "22-10-2022", Course: "UI/UX Designer", Batch: "II", TermAmount: "25000", Terms: "2", Discount: "8%", TotalAmount: "38600", PaymentMethod: "cash" },
    //     { id: 6, InvoiceID: "LG_6", StudentID: "kumar", Date: "22-10-2022", Course: "UI/UX Designer", Batch: "III", TermAmount: "25000", Terms: "2", Discount: "8%", TotalAmount: "38600", PaymentMethod: "cash" },
    // ]
    const rows = [...Ans]

    return (
        <>
            <CommonTable header={header} rows={rows} id='InvoiceID' typo="Invoice Table" path="/Invoice/InvoiceForm" button="Create Invoice" />
        </>
    );
}
