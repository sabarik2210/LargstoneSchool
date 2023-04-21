
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Grid, TextField, Typography, Box, Button, InputAdornment, MenuItem, Chip } from "@mui/material";
import { styled } from "@mui/system";
import CoursesForm from '../assets/JsonData/CourseForm.json';
import { Link, useNavigate, useParams } from "react-router-dom";
import AppBreadcrumbs from "./Breadcrumbs";
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import instance from "./Host";




export default function CourseForm() {

    const Subject = [
        { title: 'HTML' },
        { title: 'CSS' },
        { title: 'JAVASCRIPT' },
        { title: 'PHOTOSHOP' },
        { title: 'REACTJS' },
        { title: 'NODEJS' },
        { title: 'MYSQL' },
        { title: 'MONGODB' },
        { title: 'MUI' },
        { title: 'BOOTSTRAP' },
        { title: 'ORACLE' },
        { title: 'create subject' },

    ]
    const duration = [
        { title: '6 months' },
        { title: 'create Duration' },
    ]



    const [open, setOpen] = React.useState(false);
    const [opensub, setSubOpen] = React.useState(false);
    // const [Courses, CoursesChange] = React.useState({});
    const [subj, setSubj] = useState([])
    //---------------viewbyid states
    const [CourseName, setCourseName] = useState('')

    const [Fees, setFees] = useState('')
    const [Subjects, setSubjects] = useState([])

    const [Duration, setDuration] = useState('')




    //------------------button state
    const [edit, setEdit] = useState('')
    const [viewBtn1, setBtn] = useState(localStorage.getItem('viewbtn'))
    const params = useParams();

    // var click = localStorage.getItem('viewbtn')

    const [Num, setNum] = useState('')
    // const [Dur, setDur] = useState('')
    const [sub, setSub] = useState('')

    let CourseID = parseInt(params.id)
    const Courses = { CourseID, CourseName, Fees, Subjects, Duration }


    const fixedOptions = [Subject[6]];
    const [value, setValue] = React.useState([...fixedOptions]);

    const [Durationlist, setDurat] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const createdur = () => {

        setOpen(false);
    };
    const handleClosed = () => {
        setSubOpen(false);
    };
    const createdura = () => {

        setSubOpen(false);
    };

    let DurDrop = (Num + 'months')
    Courses.Duration = DurDrop;



    let con = " "
    Subject.map(d => con += d.title + ',')
    Courses.Subjects = con;

    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const OnSubmit = (data) => {
        console.log(params.action);
        if (params.action == 'update') {

            instance.post('Courses/update', Courses).then((res) => {

            })
        }
        else {
            instance.post('Courses/create', Courses).then((res) => {

                // (res.data.message.message.message ? <Link to='/Courses'></Link> : alert('cancel'))
            })
        }


    };

    useEffect(() => {
        instance.post('Courses/view').then((res) => {

        })
        if (params.action == 'viewid') {
            setBtn(localStorage.getItem('viewbtn'))
            instance.post('Courses/viewbyid', { CourseID: params.id }).then((res) => {

                setCourseName(res.data.message.message.message[0].CourseName)
                setFees(res.data.message.message.message[0].Fees)
                setSubjects(res.data.message.message.message[0].Subjects)
                setDuration(res.data.message.message.message[0].Duration)
            })
        }
        else if (params.action == 'update') {
            instance.post('Courses/viewbyid', { CourseID: params.id }).then((res) => {
                setCourseName(res.data.message.message.message[0].CourseName)
                setFees(res.data.message.message.message[0].Fees)
                setSubjects(res.data.message.message.message[0].Subjects)
                setDuration(res.data.message.message.message[0].Duration)
            })
        }

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

    const Durat = [
        { title: Courses.Duration }
    ]

    const form = (

        <form onSubmit={handleSubmit(OnSubmit)} style={{ marginTop: '50px' }}>
            {/* <Typography variant="h4" sx={{ color: "#53687c", backgroundColor: "", borderRadius: "15px", textAlign: "center", fontWeight: "600", fontFamily: "cursive", }}>Courses Form</Typography> */}
            <AppBreadcrumbs />
            <Box className='card' sx={{ my: 3 }}>
                <Grid container spacing={3} sx={{ p: 5, }}>
                    <Grid item sm={6} md={4} xs={12} >

                        <TextField
                            id="standard-textarea"
                            label='CourseName'
                            multiline
                            variant="outlined"
                            name='CourseName'
                            value={CourseName}
                            error={Boolean(errors.CourseName)} helperText={errors.CourseName?.message}
                            {...register('CourseName', { required: 'Enter the Course Name', pattern: { value: '', message: '' }, maxLength: { value: 10, message: '' } })}
                            fullWidth size="small" placeholder='Course Name' onChange={(e) => setCourseName(e.target.value)}

                        />
                    </Grid>

                    <Grid item sm={6} md={4} xs={12} >
                        <TextField
                            id="standard-textarea"
                            label='Fees'
                            multiline
                            variant="outlined"
                            name='Fees'
                            value={Fees}
                            error={Boolean(errors.Fees)} helperText={errors.Fees?.message}
                            {...register('Fees', { required: 'Enter the Course Name', pattern: { value: '', message: '' }, maxLength: { value: 10, message: '' } })}
                            fullWidth size="small" placeholder='Course Name' onChange={e => setFees(e.target.value)}

                        />
                    </Grid>


                    {/*----------------------------Subject TextField ---------------------------------------*/}

                    <Grid item sm={6} md={4} xs={12}>
                        <Autocomplete

                            multiple
                            id="fixed-tags-demo"
                            size="small"
                            fullWidth
                            onChange={(event, newValue) => {
                                { console.log(newValue) }
                                setSubjects(newValue)
                                if (newValue.length > 0) {
                                    newValue.map((data) => {

                                        if (data.title === "create subject") {
                                            // <Button onClick={handleClickOpen}>Create</Button>
                                            <h1 style={{ color: 'red' }}>{data.title}</h1>
                                            setSubOpen(true);

                                        }
                                        else {
                                            setValue([
                                                ...fixedOptions,
                                                ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                                            ]);
                                        }
                                    }

                                    )
                                } else {
                                    setValue([
                                        ...fixedOptions,
                                        ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                                    ])
                                }
                            }}
                            options={Subject}
                            getOptionLabel={(option) => option.title}
                            renderTags={(tagValue, getTagProps) =>
                                tagValue.map((option, index) => (
                                    <Chip
                                        label={option.title}
                                        {...getTagProps({ index })}
                                        disabled={fixedOptions.indexOf(option) !== -1}
                                    />
                                ))
                            }
                            style={{ width: '100%' }}
                            renderInput={(params) => (
                                <TextField {...params} InputLabelProps={{ shrink: true }} fullWidth label="Subjects" size="small" multiline name="Subjects" placeholder="Subjects" />
                            )}
                        />
                    </Grid>
                    {/*----------------------------Subject TextField ---------------------------------------*/}

                    <Grid item sm={6} md={4} xs={12} >

                        <Autocomplete

                            onChange={(event, newValue) => {
                                if (newValue.length > 0) {
                                    newValue.map((data) => {

                                        if (data.title === 'create Duration') {

                                            <h1 style={{ fontSize: '20px', color: 'red' }}>{data.title}</h1>
                                            setOpen(true)
                                        }
                                        else {
                                            setSubj(newValue)
                                            setValue([
                                                ...fixedOptions,
                                                ...newValue?.filter((option) => fixedOptions.indexOf(option) === -1),
                                            ]);
                                        }
                                    })
                                }
                                else {
                                    setSubj(newValue)
                                    setValue([
                                        ...fixedOptions,
                                        ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                                    ]);
                                }


                            }}
                            multiple
                            id="highlights-demo"
                            size="small"
                            name='Duration'
                            options={duration}
                            renderTags={(tagValue, getTagProps) =>
                                tagValue.map((option, index) => (
                                    <Chip
                                        label={option.title}
                                        {...getTagProps({ index })}
                                        disabled={fixedOptions.indexOf(option) !== -1}
                                    />
                                ))
                            }
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField multiline {...params} label="Duration" placeholder="Duration" />
                            )}
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ ml: 4 }}>
                    {params.action == 'viewid' ? '' : <Button variant="contained" color="primary" type='submit' disableRipple disableElevation sx={{ my: 4, mx: 1, }}>Add</Button>

                    }
                    <Link to="/Courses">
                        <Button variant='contained' color='secondary' disableRipple disableElevation sx={{ my: 4, mx: 1, }}>cancel</Button>
                    </Link>
                </Box>
                <Box>

                    {/*----------------------------------- Dialog Box------------------------ */}
                    <div>

                        <Dialog open={opensub} onClose={handleClose} >
                            <DialogTitle>Subject</DialogTitle>
                            <DialogContent sx={{ display: 'flex', columnGap: '10px' }}>

                                <TextField
                                    autoFocus
                                    margin="dense"
                                    multiline
                                    id="Subject"
                                    size="small"
                                    label="Subject"
                                    type="Subject"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e) => setSub(e.target.value)}
                                />

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClosed}>Cancel</Button>
                                <Button onClick={createdura}>Add</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <div>
                        {/* <Button variant="contained" onClick={handleClickOpen} color="primary" type='submit' disableRipple disableElevation sx={{ my: 4, mx: 1, }}>Create Duration</Button> */}

                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Duration</DialogTitle>
                            <DialogContent sx={{ display: 'flex', columnGap: '10px' }}>

                                <TextField
                                    autoFocus
                                    margin="dense"
                                    multiline
                                    id="Number"
                                    size="small"
                                    label="Number"
                                    type="Number"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e) => setNum(e.target.value)}
                                />
                                {/* <TextField
                                    autoFocus
                                    margin="dense"
                                    size="small"
                                    id="date"
                                    label="date"
                                    InputLabelProps={{ shrink: true }}
                                    type="date"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e) => setDur(e.target.value)}
                                /> */}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={createdur}>Add</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Box>
            </Box>


        </form >

    )

    return (
        <Box>
            {form}
        </Box>

    )
}





















