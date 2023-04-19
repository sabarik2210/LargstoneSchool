
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Grid, TextField, Box, Button, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import AppBreadcrumbs from "./Breadcrumbs";
// import dayjs from 'dayjs';
import { Batch1, Batch_date } from '../assets/JsonData/BatchForm'
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
import instance from "./Host";

export default function BatchForm() {
    const params = useParams();


    const [view1, setview] = useState([])
    const [BatchName, setBat] = useState('')
    const [Count, setCount] = useState('')
    const [Session, setSession] = useState('')
    const [EndDate, setEndDate] = useState('')
    const [StartDate, setStartDate] = useState('')
    const [StartTime, setStartTime] = useState('')
    const [EndTime, setEndTime] = useState('')
    const [BatchID, setid] = useState(parseInt(params.id))
    console.log(typeof id);
    let obj = { BatchName, Count, Session, StartDate, EndDate, StartTime, EndTime, BatchID }
    console.log(obj);
    const [BatchDetails, setBatchDetails] = useState(obj);
    const [Status, setStatus] = useState(true)
    const [Subjects, setSubjects] = useState([])
    const [edit, setEdit] = useState('')
    const [tua, setTua] = useState(false)
    console.log(BatchDetails);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const OnSubmit = (data) => {

        instance.post('Batch/create', obj).then((res) => {
            // res.data.result ? '' : alert('Not uploaded')

        })

    };
    useEffect(() => {
        if (params.action == 'update') {


            instance.post('Batch/viewbyid', { BatchID: params.id }).then((res) => {
                setEdit(res.data.message.message.message[0]);
                setBat(res.data.message.message.message[0].BatchName)
                setCount(res.data.message.message.message[0].Count)
                setSession(res.data.message.message.message[0].Session)
                setEndDate(res.data.message.message.message[0].EndDate)
                setStartDate(res.data.message.message.message[0].StartDate)
                setEndTime(res.data.message.message.message[0].StartTime)
                setStartTime(res.data.message.message.message[0].EndTime)




                console.log('edit');
            });
        } else if (params.action == 'viewid') {
            // setTua(localStorage.getItem('tua'))
            instance.post('Batch/viewbyid', { BatchID: params.id }).then((res) => {
                setEdit(res.data.message.message.message[0]);
                setBat(res.data.message.message.message[0].BatchName)
                setCount(res.data.message.message.message[0].Count)
                setSession(res.data.message.message.message[0].Session)
                setEndDate(res.data.message.message.message[0].EndDate)
                setStartDate(res.data.message.message.message[0].StartDate)
                setEndTime(res.data.message.message.message[0].StartTime)
                setStartTime(res.data.message.message.message[0].EndTime)

            });
        }
    }, []);

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
            <AppBreadcrumbs />
            <Box className='card' sx={{ my: 3 }}>
                <Grid container spacing={3} sx={{ p: 5 }}>
                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter BatchName"
                            size="small"
                            name="BatchName"
                            value={BatchName}
                            multiline
                            fullWidth

                            error={Boolean(errors?.BatchName)}
                            helperText={errors.BatchName?.message}
                            {...register('BatchName', {
                                required: 'Enter BatchName'
                            })}
                            onChange={(e) => setBat(e.target.value)}
                        />
                    </Grid>

                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter Count"
                            size="small"
                            name="Count"
                            value={Count}
                            multiline
                            fullWidth

                            error={Boolean(errors?.Count)}
                            helperText={errors.Count?.message}
                            {...register('Count', {
                                required: 'Enter Count'
                            })}
                            onChange={(e) => setCount(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter Session"
                            size="small"
                            name="Session"
                            value={Session}
                            select
                            multiline
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={Boolean(errors?.Session)}
                            helperText={errors.Session?.message}
                            {...register('Session', {
                                required: 'Enter Session'
                            })}
                            onChange={(e) => setSession(e.target.value)}
                        >
                            <MenuItem value="Morning">Morning</MenuItem>
                            <MenuItem value="AfterNoon">AfterNoon</MenuItem>
                            <MenuItem value="Saturday/Sunday">Saturday/Sunday</MenuItem>
                            <MenuItem value="FullDay">FullDay</MenuItem>

                        </TextField>
                    </Grid>
                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter Start Date"
                            type="date"
                            size="small"
                            name="StartDate"
                            // defaultValue={edit.StartDate}
                            value={moment(StartDate).utc().format('YYYY-MM-DD')}

                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={Boolean(errors?.StartDate)}
                            helperText={errors.StartDate?.message}
                            {...register('StartDate', {
                                required: 'Enter Start Date'
                            })}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Grid>

                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter End Date"
                            type="date"
                            size="small"
                            // defaultValue={new Date(edit.EndDate)}
                            value={moment(EndDate).utc().format('YYYY-MM-DD')}
                            name="EndDate"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter Start Time"
                            type="time"
                            size="small"
                            // defaultValue={edit.StartTime}
                            value={StartTime}

                            name="StartTime"
                            placeholder="hrs:mins"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter End Time"
                            type="time"
                            size="small"
                            // defaultValue={edit.EndTime}
                            value={EndTime}

                            name="EndTime"

                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => setEndTime(e.target.value)}


                        />
                    </Grid>
                </Grid>
                <Box sx={{ ml: 4 }}>
                    {params.action == 'viewid' ? '' : <Button variant="contained" color="primary" type='submit' disableRipple disableElevation sx={{ my: 4, mx: 1, }}>Add</Button>

                    }
                    <Link to="/Batch">
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

















