import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Grid, TextField, Typography, Box, Button, InputAdornment, MenuItem, Autocomplete } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import AppBreadcrumbs from "./Breadcrumbs";
import moment from "moment";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import instance from "./Host";



export default function Invoiceform() {

    const params = useParams()
    console.log(params.id);
    const [Register, RegisterChange] = useState({});
    console.log(Register);
    const [Batchlist, setBatchlist] = useState([])
    console.log(Batchlist);
    const [entrolled, setEntrolled] = useState('')
    // console.log(entrolled);
    const [BatchName, setBatchName] = useState('')
    const [CourseName, setCourseName] = useState('')

    const [PaymentMethod, setpaymentMethod] = useState('')
    const [TotalAmount, setTotalAmount] = useState('')
    const [StudentName, setStudentName] = useState('')
    const [Term, setTerm] = useState('')
    const [InvoiceDate, setInvoiceDate] = useState(moment(new Date()).format('DD-MM-YYYY'));
    const [TermAmount, setAdmissionFee] = useState('')
    const [Discount, setDiscount] = useState('')
    console.log(PaymentMethod);
    // const [BatchStartingDate, setBatchStartingDate] = useState((moment(new Date()).format('YYYY-MM-DD')));
    const [InvoiceID, setinvoiceid] = useState(parseInt(params.id))
    const Amount = entrolled.AdmissionFees

    Register.StudentName = entrolled.StudentName
    Register.CourseName = entrolled.CourseName
    Register.BatchName = entrolled.BatchName
    Register.TermAmount = Amount
    Register.InvoiceDate = InvoiceDate
    Register.Term = Term
    Register.Discount = Discount
    Register.TotalAmount = TotalAmount
    Register.PaymentMethod = PaymentMethod
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const obj = { InvoiceID, StudentName, CourseName, BatchName, TermAmount, InvoiceDate, Term, Discount, TotalAmount, PaymentMethod }
    console.log(obj);
    const OnSubmit = (data) => {
        console.log('hii');
        if (params.action == 'update') {
            instance.post("invoice/update", obj)


        }
        else {
            instance.post("invoice/create", Register)

        }


    }

    useEffect(() => {
        instance.post("students/view").then((res) => setBatchlist(res.data.message.message.message))

        if (params.action == 'update') {
            instance.post("invoice/viewbyid", { InvoiceID: parseInt(params.id) }).then((res) => {
                console.log(res)
                setStudentName(res.data.message.message.message[0].StudentName)
                setCourseName(res.data.message.message.message[0].CourseName)
                setBatchName(res.data.message.message.message[0].BatchName)
                setAdmissionFee(res.data.message.message.message[0].TermAmount)
                setDiscount(res.data.message.message.message[0].Discount)
                setTerm(res.data.message.message.message[0].Term)
                setTotalAmount(res.data.message.message.message[0].TotalAmount)
                setpaymentMethod(res.data.message.message.message[0].PaymentMethod)
                setInvoiceDate(res.data.message.message.message[0].InvoiceDate)
            });
        } else if (params.action == 'viewid') {
            //   setTua(localStorage.getItem('tua'))
            instance.post("invoice/viewbyid", { InvoiceID: parseInt(params.id) }).then((res) => {
                console.log(res.data)
                // setEdit(res.data.result.message.message[0]);
                setStudentName(res.data.message.message.message[0].StudentName)
                setCourseName(res.data.message.message.message[0].CourseName)
                setBatchName(res.data.message.message.message[0].BatchName)
                setAdmissionFee(res.data.message.message.message[0].TermAmount)
                setDiscount(res.data.message.message.message[0].Discount)
                setTerm(res.data.message.message.message[0].Term)
                setTotalAmount(res.data.message.message.message[0].TotalAmount)
                setpaymentMethod(res.data.message.message.message[0].PaymentMethod)
                setInvoiceDate(res.data.message.message.message[0].InvoiceDate)



            });
        }
        console.clear('all')
    }, [])

    const handlesubmit = (e) => {
        e.preventDefault();

    }
    const StyledTextField = styled(TextField, {
        name: "StyledTextField",
    })({
        width: 300,
        height: 40

    });
    const form = (
        <form onSubmit={handleSubmit(OnSubmit)} style={{ marginTop: '50px' }}>
            {/* <Typography variant="h4" sx={{ color: "#53687c", backgroundColor: "", borderRadius: "15px", textAlign: "center", fontWeight: "600", fontFamily: "cursive", }}>Invoice Form</Typography> */}
            <AppBreadcrumbs />
            <Box className='card' sx={{ my: 3 }}>

                <Grid container spacing={3} sx={{ p: 2 }}>

                    <Grid item xs={10} md={4}>

                        <Autocomplete

                            onChange={(e, newValue) => setEntrolled(newValue)}
                            options={Batchlist}
                            getOptionLabel={(option) => option.StudentName}

                            id="combo-box-demo"
                            value={{ StudentName: StudentName }}
                            size='small'
                            renderInput={(params) => <TextField multiline value={StudentName} fullWidth size="small" {...params} label="StudentName" />}
                        >
                        </Autocomplete>
                    </Grid>

                    <Grid item xs={10} md={4}>
                        <TextField name='CourseName' InputLabelProps={{ shrink: true }} value={entrolled.CourseName || CourseName} multiline fullWidth onChange={(e) => setCourseName(e.target.value)} size='small' label="Course Name" />
                    </Grid>
                    <Grid item xs={10} md={4}>
                        <TextField name='Batch' InputLabelProps={{ shrink: true }} value={entrolled.BatchName || BatchName} multiline fullWidth onChange={(e) => setBatchName(e.target.value)} size='small' label="Batch" />
                    </Grid>
                    <Grid item xs={10} md={4}>
                        <TextField name='Amount' InputLabelProps={{ shrink: true }} value={entrolled.AdmissionFees || TermAmount} multiline fullWidth onChange={(e) => setAdmissionFee(e.target.value)} size='small' label="Amount" />
                    </Grid>
                    <Grid item xs={10} md={4}>
                        <TextField name='Discount' InputLabelProps={{ shrink: true }} value={Discount} multiline fullWidth onChange={(e) => setDiscount(e.target.value)} size='small' label="Discount" />
                    </Grid>
                    <Grid item xs={10} md={4}>
                        <TextField name='TotalAmount' InputLabelProps={{ shrink: true }} value={TotalAmount} multiline fullWidth onChange={(e) => setTotalAmount(e.target.value)} size='small' label="TotalAmount" />
                    </Grid>
                    <Grid item xs={10} md={4}>
                        <TextField name='Term' select InputLabelProps={{ shrink: true }} value={Term} multiline fullWidth onChange={(e) => setTerm(e.target.value)} size='small' label="Term" >
                            <MenuItem value="First term">First term</MenuItem>
                            <MenuItem value="Second term">Second term</MenuItem>
                            <MenuItem value="Third term">Third term</MenuItem>

                        </TextField>
                    </Grid>
                    <Grid item xs={10} md={4}>
                        <TextField name='PaymentMethod' InputLabelProps={{ shrink: true }} value={PaymentMethod} multiline fullWidth onChange={(e) => setpaymentMethod(e.target.value)} size='small' label="paymentMethod" />
                    </Grid>


                    <Grid item xs={10} md={4}>
                        <TextField name='InvoiceDate' multiline type='date' InputLabelProps={{ shrink: true }} value={InvoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} fullWidth label="InvoiceDate" size="small" />
                    </Grid>
                </Grid>
                <Box sx={{ ml: 4 }}>
                    {params.action == 'viewid' ? '' : <Button variant="contained" color="primary" type='submit' disableRipple disableElevation sx={{ my: 4, mx: 1, }}>Add</Button>

                    }
                    <Link to="/Invoice">
                        <Button variant='contained' color='secondary' disableRipple disableElevation sx={{ my: 4, mx: 1, }}>cancel</Button>
                    </Link>
                </Box>
            </Box>
        </form>

    )

    return (
        <Box>

            {form}
        </Box>


    )
}