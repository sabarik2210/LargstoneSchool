import { Box, Button, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
// import AppBreadcrumbs from '../breadCrumbs/breadcrumbs';
import InvoiceImage from '../assets/images/lrgstonecorp.png';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import moment from 'moment';
import signature from '../assets/images/signature.png';
import { Link, useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import instance from './Host';
import AppBreadcrumbs from './Breadcrumbs';

export default function PrintPage() {


    const [Address, setAddress] = useState([{ "doornum": "", "street": "", "place": "" }]);
    const [row1, setrow] = useState([])
    const [PrintPageForm, setPrintPage] = useState('')
    console.log(PrintPageForm);
    const [BatchName, setBatchName] = useState('')
    const [CourseName, setCourseName] = useState('')

    const [paymentMethod, setpaymentMethod] = useState('')
    const [TotalAmount, setTotalAmount] = useState('')

    const [StudentName, setStudentName] = useState('')
    const [Term, setTerm] = useState('')
    const [InvoiceDate, setInvoiceDate] = useState('')
    const [TermAmount, setTermAmount] = useState('')

    const [Discount, setDiscount] = useState('')
    const params = useParams();
    const OfficeAddress = (
        <Box>
            <Typography>Largstone School of Technology,</Typography>
            <Typography>No-78(20), Maharaja Nagar,</Typography>
            <Typography>Elathur Main Road, Kuthukalvalasai,</Typography>
            <Typography>Tenkasi-627803.</Typography>
        </Box>
    );
    useEffect(() => {
        instance.post('Courses/view').then((res) => {
            // console.log(res.data.message.messaage.message[0])
        })
    })
    const Read = () => {
        instance.post("invoice/viewbyid", { InvoiceID: parseInt(params.id) }).then((res) => {
            console.log(res.data);
            setPrintPage(res.data.message.message.message[0])
            setrow(res.data.message.message.message)
            setStudentName(res.data.message.message.message[0].StudentName)
            setCourseName(res.data.message.message.message[0].CourseName)
            setBatchName(res.data.message.message.message[0].BatchName)
            setTermAmount(res.data.message.message.message[0].TermAmount)
            setDiscount(res.data.message.message.message[0].Discount)
            setTerm(res.data.message.message.message[0].Term)
            setTotalAmount(res.data.message.message.message[0].TotalAmount)
            setpaymentMethod(res.data.message.message.message[0].paymentMethod)
            setInvoiceDate(res.data.message.message.message[0].InvoiceDate)
            // console.log(res.data.message.message.message[0]);
        })
    };

    // const SubTotal = TotalAmount - AdditionalDiscountAmount;
    // const GSTAmount = ((12/100) * SubTotal);
    // const GrandTotal = (GSTAmount + SubTotal);

    // const columns = [
    //     {
    //         field: "id",
    //         headerName: "No",
    //         width: 40,
    //         editable: false,
    //         headerAlign: "left", 
    //         align: "left",
    //         sortable:false,
    //         valueFormatter: params => (params.id <=2) ? params.id : ""
    //     },
    //     {
    //         field : "Description",
    //         headerName:"Description",
    //         width: 250,
    //         editable: false,
    //         headerAlign: "left", 
    //         align: "left",
    //         sortable:false,
    //     },
    //     {
    //         field : "Term",
    //         headerName:"Paying Term",
    //         width: 210,
    //         editable: false,
    //         headerAlign: "left", 
    //         align: "left",
    //         sortable:false,
    //     },
    //     {
    //         field:"UnitPrice",
    //         headerName:"Unit Price",
    //         width: 200,
    //         editable: false,
    //         headerAlign: "left", 
    //         align: "left",
    //         sortable:false,
    //     },
    //     {
    //         field:"Discount",
    //         headerName:"Discount(%)",
    //         width: 250,
    //         editable: false,
    //         headerAlign: "left", 
    //         align: "left",
    //         sortable:false,
    //     },
    //     {
    //         field:"Total",
    //         headerName:"Total Amount",
    //         width: 130,
    //         editable: false,
    //         headerAlign: "left",
    //         align: "left",
    //         sortable:false,
    //         valueFormatter: params => (params.id === 5) ? `${params.value}` : params.value
    //     },
    // ];

    // const rows = [{id:1,CourseName :CourseName, Term: Term, Discount: Discount, Total: TotalAmount}, {id: 2, CourseName : CourseName, Total: TotalAmount}, {id:3, CourseName: "Sub Total", Total: TotalAmount}, {id:4, CourseName: "GST 12%", Total: TotalAmount}, {id:5, CourseName: "Total", Total: TotalAmount}]
    const rows = [
        { InvoiceID: 1, StudentName: StudentName, CourseName: CourseName, BatchName: BatchName, Term: Term, Discount: Discount, TermAmount: TermAmount },
        { InvoiceID: '', CourseName: '', Term: 'Discount', Discount: Discount, TermAmount: Discount },
        { InvoiceID: 3, CourseName: '', Term: 'Total Amount', Discount: Discount, TermAmount: TotalAmount },
    ]

    let componentRef = useRef();

    useEffect(() => {
        Read()
        // axios.get('http://localhost:8001/students/viewbyid', { StudentID: parseInt(params.id) }).then((res) => {

        //     setNUm(res.data.message.message.message[0])
        // })
    }, [])

    const columns = [
        { field: 'InvoiceID', headerName: 'InvoiceID', width: 90 },
        {
            field: 'StudentName',
            headerName: 'StudentName',
            width: 150,

        },
        {
            field: 'CourseName',
            headerName: 'CourseName',
            width: 130,
            editable: true,
        }, {
            field: 'BatchName',
            headerName: 'BatchName',
            width: 130,
            editable: true,
        }, {
            field: 'Term',
            headerName: 'Term',
            width: 130,
            editable: true,
        }, {
            field: 'TermAmount',
            headerName: 'TermAmount',
            width: 150,
            editable: true,
        }
    ]

    return (
        <div >
            <AppBreadcrumbs />
            <Box ref={(elem) => componentRef = elem} sx={{ background: "#fff", borderRadius: "20px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", py: 3, paddingBottom: '80px' }}>
                <Grid container justifyContent="space-between">
                    <Grid item xs={8} >
                        <Box sx={{ pl: 4 }}>
                            <Typography sx={{ fontSize: "45px", verticalAlign: "center", pb: 0.5, fontWeight: "bold" }}>Invoice</Typography>
                            {OfficeAddress}
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box component='img' src={InvoiceImage} sx={{ width: '50%', }} alt='invoice' />
                    </Grid>
                </Grid>
                {/*main  */}
                <Grid container justifyContent="end" sx={{ mt: 3, p: 4 }}>
                    {/* First Column */}
                    <Grid item xs={6} >
                        <Box >
                            <Typography sx={{ fontSize: "30px", fontWeight: "700" }}>Bill to </Typography>
                            <Typography>{PrintPageForm.StudentName},</Typography>
                            <Typography>{(Address.map((val) => val.doornum)) == "" ? "(Door Number) N/A" : `# ${Address.map((val) => val.doornum)}`}</Typography>
                            <Typography>{(Address.map((val) => val.street)) == "" ? "(Street) N/A" : Address.map((val) => val.street)}</Typography>
                            <Typography>{(Address.map((val) => val.place)) == "" ? "(Place Name) N/A" : Address.map((val) => val.place)}</Typography>
                        </Box>
                    </Grid>
                    {/* Second Column */}
                    <Grid item xs={6}>
                        <Grid sx={{ mt: 5.5 }} container>
                            <Grid item xs={8}>
                                <Box>
                                    <Typography sx={{ fontWeight: "700" }}>Invoice#</Typography>
                                    <Typography sx={{ fontWeight: "700" }}>Invoice Date : {PrintPageForm.InvoiceDate}</Typography>
                                    <Typography sx={{ fontWeight: "700" }}>Contact Number : { }</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box>
                                    {/* <Typography>{InvoiceNumber}</Typography>
                                <Typography>{InvoiceGenDate}</Typography>
                                <Typography>{GuardianNumber}</Typography> */}
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sx={{ px: 4 }} >
                        {/* <InvoiceDatagrid columns={columns} rows={rows} id='id' /> */}
                        <Box>
                            <DataGrid sx={{
                                border: 0,
                                '.MuiDataGrid-columnSeparator': { display: 'none' },
                                '& .MuiDataGrid-row:nth-child(1)': { borderBottom: "1px solid black", },
                                '& .MuiDataGrid-row:nth-child(3)': { fontWeight: "bold" },
                                '& .MuiDataGrid-row:nth-child(4)': { borderBottom: "1px solid black", fontWeight: "bold" },
                                '& .MuiDataGrid-row:nth-child(5)': { fontWeight: "bold", fontSize: "18px" },
                                '.MuiDataGrid-cell': { border: 'none', }, //tableCell
                                '& .MuiDataGrid-columnHeaders': { borderBottom: "none", backgroundColor: 'rgb(250,250,251)', color: "#455560", fontSize: "14px", }, //tableHeader
                                '& .MuiDataGrid-columnHeaderTitle': { fontWeight: "bold" },
                                '& .MuiDataGrid-main': { mb: 2, mt: 4 },  //table
                            }}
                                autoHeight
                                disableColumnMenu
                                GridColDef={false}
                                hideFooter={true}
                                rows={rows}
                                getRowId={(row) => row.InvoiceID}
                                disableColumnFilter
                                disableColumnSelector
                                disableRowSelectionOnClick
                                disableMultipleRowSelection
                                disableDensitySelector
                                columns={columns}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container sx={{ mt: 10, px: 4 }} justifyContent="space-between">
                    <Grid item xs={4}>
                        <Box>
                            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Bank Details</Typography>
                            <Typography sx={{ mt: 1 }}><b>Name:</b> Karthik</Typography>
                            <Typography sx={{ mt: 0.5 }}><b>Bank :</b>Canara Bank</Typography>
                            <Typography sx={{ mt: 0.5 }}><b>Branch :</b>Tenkasi</Typography>
                            <Typography sx={{ mt: 0.5 }} ><b>ACC No. :</b>096114578451</Typography>
                            <Typography sx={{ mt: 0.5 }}><b>IFSC Code :</b>CNRB0000961</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box>
                            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Terms and Conditions</Typography>
                            <ul style={{ listStyleType: "disc", marginLeft: "0px" }}>
                                <li style={{ marginTop: "8px" }}>Payment is due within 15days</li>
                                <br></br>
                                <li style={{ marginTop: "4px" }}>CANARA BANK</li>
                                <li style={{ marginTop: "4px", listStyleType: 'none' }}></li>
                                <li style={{ marginTop: "4px", listStyleType: 'none' }}></li>

                            </ul>
                        </Box>
                    </Grid>
                    <Grid item xs={2.5}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Box component="img" width="200px" src={signature} alt="Signature" />
                            <Typography>Full Stack Developer</Typography>
                            <Typography>Tenkasi</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Typography sx={{ mt: 3, textAlign: 'center', fontFamily: 'cursive', fontSize: '18px', fontWeight: 'bold' }}>Thank You</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end", my: 4, pr: 4 }}>
                <ReactToPrint
                    trigger={() =>
                        <Button endIcon={<PrintOutlinedIcon />} sx={{ "@media print": { display: "none" } }} style={{ backgroundColor: "#4daaff", marginRight: "20px" }} disableElevation disableRipple variant='contained'>Print</Button>}
                    content={() => componentRef}
                />
                <Link to="/Invoice"><Button sx={{ "@media print": { display: "none" } }} style={{ backgroundColor: "#ff726f", }} disableElevation disableRipple variant='contained'>Back</Button></Link>
            </Box>

        </div >
    )
}


