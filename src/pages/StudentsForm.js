import { Box, Breadcrumbs, Button, Grid, MenuItem, TextField, Typography, Link as Links } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useForm } from "react-hook-form";
import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
import moment, { utc } from 'moment/moment';
import AppBreadcrumbs from './Breadcrumbs';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import instance from './Host';

// import AppBreadcrumbs from '../breadCrumbs/breadcrumbs';


export default function RegisterForm() {
    const params = useParams()
    const handleCrumbClick = (evnt) => {
        evnt.preventDefault();
    }



    const Batch = [
        { batchID: "1", batchNum: "I", batchStartingDate: "01-04-2023" },
        { batchID: "2", batchNum: "II", batchStartingDate: "03-05-2023" },
        { batchID: "3", batchNum: "III", batchStartingDate: "02-07-2023" }];


    const [Details, setDetails] = useState({})

    // console.log(Details);

    const [CourseView, setCourse] = useState([])
    const [view, setCourseView] = useState({})


    const [Batchview, setBatch] = useState([])
    const [BatchBox, setBatchBox] = useState('')

    const [RegDate, setRegDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [AdmissionFees, setAdmissionFees] = useState("");

    Details.AdmissionFees = AdmissionFees
    Details.RegistrationDate = RegDate;
    Details.CourseName = view.CourseName
    Details.Subjects = view.Subjects
    Details.Duration = view.Duration
    Details.BatchName = BatchBox.BatchName
    Details.BatchStartingDate = BatchBox.BatchStartingDate
    Details.Session = BatchBox.Session
    Details.BatchStartingDate = BatchBox.StartDate;

    const [StudentName, setStudentName] = useState("");

    const [StudentNumber, setStudentNumber] = useState("");
    const [Email, setEmail] = useState('');
    const [DateofBirth, setDateofBirth] = useState('');

    const [SSLCboard, setSSLCboard] = useState('');
    const [SSLCschool, setSSLCschool] = useState('');
    const [SSLCPassedyear, setSSLCpassedYear] = useState('');
    const [SSLCPercentage, setSSLCPercentage] = useState('');

    const [HSCboard, setHSCboard] = useState('');
    const [HSCschool, setHSCschool] = useState('');
    const [HSCPassedyear, setHSCpassedYear] = useState('');
    const [HSCpercentage, setHSCPercentage] = useState('');

    const [UGDegreeName, setUGDegreeName] = useState('');
    const [UGCollegeName, setUGCollegeName] = useState('');
    const [UGCollegePassedYear, setUGCollegePassedYear] = useState('');
    const [UGPercentage, setUGCollegePercentage] = useState('');

    const [PGDegreeName, setPGDegreeName] = useState('');
    const [PGCollegeName, setPGCollegeName] = useState('');
    const [PGCollegePassedYear, setPGCollegePassedYear] = useState('');
    const [GCollegePercentage, setPGCollegePercentage] = useState('');

    const [PhDMajor, setPhDMajor] = useState('');
    const [PhDCollegeName, setPhDCollegeName] = useState('');
    const [PhDPassedYear, setPhDPassedYear] = useState('');
    const [PhDPercentage, setPhDPercentage] = useState('');

    const [GuardianName, setGuardianName] = useState("");
    const [ParentContactNumber, setGaurdianNumber] = useState("");
    const [AdditionalCertificate, setAdditionalCertificate] = useState([{ "id": 1, "description": "" }]);

    const [BatchNumber, setBatchNumber] = useState("I");
    const [BatchStartingDate, setBatchStartingDate] = useState((moment().utc().format('DD-MM-YYYY')));
    const [CourseName, setCourseName] = useState("");
    const [BatchName, setBatchName] = useState("");
    const [ParentOccupation, setParentOccupation] = useState("");
    const [Subject, setSubject] = useState("");
    const [Duration, setDuration] = useState("");
    const [Session, setSession] = useState("");


    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };





    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    // const dataCol = {studentName, studentNumber, email, parentName, RegDate, batchNumber}
    const { register, handleSubmit, formState: { errors }, } = useForm();




    const OnSubmit = (data) => {
        if (params.action == 'update') {

            instance.post('students/update', Details).then((res) => {
                console.log(res.data);
            })
        }
        else {
            instance.post('students/create', Details).then((res) => {

                // (res.data.message.message.message ? <Link to='/Courses'></Link> : alert('cancel'))
            })
        };
    };
    useEffect(() => {
        instance.post('students/view').then((res) => {

        })
        if (params.action == 'viewid') {
            // setBtn(localStorage.getItem('viewbtn'))
            instance.post('Students/viewbyid', { studentID: parseInt(params.id) }).then((res) => {

                setStudentName(res.data.message.message.message[0].StudentName)
                setStudentNumber(res.data.message.message.message[0].StudentNumber)
                setEmail(res.data.message.message.message[0].Email)
                setDateofBirth(res.data.message.message.message[0].DateofBirth)
                setSSLCboard(res.data.message.message.message[0].SSLCboard)
                setSSLCschool(res.data.message.message.message[0].SSLCschool)
                setSSLCpassedYear(res.data.message.message.message[0].SSLCPassedyear)
                setSSLCPercentage(res.data.message.message.message[0].SSLCPercentage)
                setHSCboard(res.data.message.message.message[0].HSCboard)
                setHSCschool(res.data.message.message.message[0].HSCschool)
                setHSCpassedYear(res.data.message.message.message[0].HSCPassedyear)
                setHSCPercentage(res.data.message.message.message[0].HSCpercentage)
                setUGDegreeName(res.data.message.message.message[0].UGDegreeName)
                setUGCollegeName(res.data.message.message.message[0].UGCollegeName)
                setUGCollegePassedYear(res.data.message.message.message[0].UGCollegePassedYear)
                setUGCollegePercentage(res.data.message.message.message[0].UGPercentage)
                setGuardianName(res.data.message.message.message[0].GuardianName)
                setGaurdianNumber(res.data.message.message.message[0].ParentContactNumber)
                setAdmissionFees(res.data.message.message.message[0].AdmissionFees)
                setAdditionalCertificate(res.data.message.message.message[0].AdditionalCertificate)
                setBatchStartingDate(res.data.message.message.message[0].BatchStartingDate)
                setCourseName(res.data.message.message.message[0].CourseName)
                setBatchName(res.data.message.message.message[0].BatchName)
                setParentOccupation(res.data.message.message.message[0].ParentOccupation)
                setSubject(res.data.message.message.message[0].Subjects)
                setDuration(res.data.message.message.message[0].Duration)
                setSession(res.data.message.message.message[0].Session)
                // setBatchName(res.data.message.message.message[0].BatchName)

            })
        }
        else if (params.action == 'update') {
            instance.post('Students/viewbyid', { studentID: parseInt(params.id) }).then((res) => {

                setStudentName(res.data.message.message.message[0].StudentName)
                setStudentNumber(res.data.message.message.message[0].StudentNumber)
                setEmail(res.data.message.message.message[0].Email)
                setDateofBirth(res.data.message.message.message[0].DateofBirth)
                setSSLCboard(res.data.message.message.message[0].SSLCboard)
                setSSLCschool(res.data.message.message.message[0].SSLCschool)
                setSSLCpassedYear(res.data.message.message.message[0].SSLCPassedyear)
                setSSLCPercentage(res.data.message.message.message[0].SSLCPercentage)
                setHSCboard(res.data.message.message.message[0].HSCboard)
                setHSCschool(res.data.message.message.message[0].HSCschool)
                setHSCpassedYear(res.data.message.message.message[0].HSCPassedyear)
                setHSCPercentage(res.data.message.message.message[0].HSCpercentage)
                setUGDegreeName(res.data.message.message.message[0].UGDegreeName)
                setUGCollegeName(res.data.message.message.message[0].UGCollegeName)
                setUGCollegePassedYear(res.data.message.message.message[0].UGCollegePassedYear)
                setUGCollegePercentage(res.data.message.message.message[0].UGPercentage)
                setGuardianName(res.data.message.message.message[0].GuardianName)
                setGaurdianNumber(res.data.message.message.message[0].ParentContactNumber)
                setAdmissionFees(res.data.message.message.message[0].AdmissionFees)
                setAdditionalCertificate(res.data.message.message.message[0].AdditionalCertificate)
                setBatchStartingDate(res.data.message.message.message[0].BatchStartingDate)
                setCourseName(res.data.message.message.message[0].CourseName)
                setBatchName(res.data.message.message.message[0].BatchName)
                setParentOccupation(res.data.message.message.message[0].ParentOccupation)
                setSubject(res.data.message.message.message[0].Subjects)
                setDuration(res.data.message.message.message[0].Duration)
                setSession(res.data.message.message.message[0].Session)

            })
        }

    }, [])

    useEffect(() => {
        instance.post('Courses/view').then((res) => {

            setCourse(res.data.message.message.message)
        })
        instance.post('Batch/view').then((res) => {

            setBatch(res.data.message.message.message)
        })
    }, [])
    const handlesubmit = (e) => { e.preventDefault() };

    return (
        <form onSubmit={handleSubmit(OnSubmit)} >
            <AppBreadcrumbs />
            <Box className='card' sx={{ my: 3 }}>
                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={2}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Student Registration</Typography>
                    </Grid>

                    <Grid item xs={10} md={3.5}>
                        <TextField multiline value={StudentName}
                            name='StudentName' {...register("StudentName", { required: "Enter the Student Name", maxLength: "20", })} error={Boolean(errors.StudentName)} helperText={errors.StudentName?.message} fullWidth onChange={(e) => (Details['StudentName'] = e.target.value)} size='small' label="Student Name" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField multiline name='StudentNumber' value={StudentNumber || ''} {...register("StudentNumber", { required: "Enter contact number" })} error={Boolean(errors.StudentNumber)} helperText={errors.StudentNumber?.message} fullWidth onChange={(e) => (Details['StudentNumber'] = e.target.value)} size='small' label="Student contact Number" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField multiline name='Email' value={Email} {...register("Email", { required: "Enter the E-mail" })} error={Boolean(errors.Email)} helperText={errors.Email?.message} fullWidth onChange={(e) => (Details['Email'] = e.target.value)} size='small' label="Email" />
                    </Grid>

                    <Grid item xs={10} md={3.5}>
                        <TextField name='DateofBirth' value={moment(DateofBirth).utc().format('YYYY-MM-DD')} InputLabelProps={{ shrink: true }} type='date' fullWidth onChange={(e) => (Details['DateofBirth'] = e.target.value)} size='small' label="Date of Birth" />
                    </Grid>
                </Grid>


                {/*-------------------------------- education ---------------------------------*/}
                <Box sx={{ width: '100%' }} paddingLeft={3.5} paddingTop={3}>
                    <Grid item xs={12} pb={2}>
                        <Typography variant='h6'>Educational Details</Typography>
                    </Grid>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ fontWeight: 'bold' }}>
                            <Tab label="SSLC" {...a11yProps(0)} />
                            <Tab label="HSC" {...a11yProps(1)} />
                            <Tab label="UG" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Grid container rowGap={3} columnGap={5} paddingLeft={0} paddingTop={3}>

                            <Grid item xs={12} >
                                <Typography sx={{ fontWeight: "bold" }}>SSLC</Typography>
                            </Grid>
                            <Grid item xs={10} md={3.5}>
                                <TextField multiline name='SSLCboard' value={SSLCboard} {...register("SSLCboard", { required: "Enter the school board", })} error={Boolean(errors.SSLCboard)} helperText={errors.SSLCboard?.message} fullWidth onChange={(e) => (Details['SSLCboard'] = e.target.value)} size='small' label="SSLCboard" sx={{ border: 'none', outline: 'none' }} />
                            </Grid>
                            <Grid item xs={10} md={3.5}>
                                <TextField multiline name='SSLCschool' value={SSLCschool} {...register("SSLCschool", { required: "Enter the school Name", })} error={Boolean(errors.SSLCschool)} helperText={errors.SSLCschool?.message} fullWidth onChange={(e) => (Details['SSLCschool'] = e.target.value)} size='small' label="School Name" />
                            </Grid>
                            <Grid item xs={10} md={3.5}>
                                <TextField multiline name='SSLCPassedyear' value={SSLCPassedyear} {...register("SSLCPassedyear", { required: "Enter the passed-out-year", })} error={Boolean(errors.SSLCPassedyear)} helperText={errors.SSLCPassedyear?.message} fullWidth onChange={(e) => (Details['SSLCPassedyear'] = e.target.value)} size='small' label="passed-out-year" />
                            </Grid>
                            <Grid item xs={10} md={3.5}>
                                <TextField multiline name='SSLCPercentage' value={SSLCPercentage} {...register("SSLCPercentage", { required: "Enter the SSLCPercentage", })} error={Boolean(errors.SSLCPercentage)} helperText={errors.SSLCPercentage?.message} fullWidth onChange={(e) => (Details['SSLCPercentage'] = e.target.value)} size='small' label="SSLCPercentage" />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Grid container rowGap={3} columnGap={5} paddingLeft={0} paddingTop={3}>
                            <Grid item xs={12}>
                                <Typography sx={{ fontWeight: "bold" }}>HSC</Typography>
                            </Grid>
                            <Grid item xs={10} md={3.5}>
                                <TextField multiline name='HSCboard' value={HSCboard} {...register("HSCboard", { required: "Enter the school bosrd" })} error={Boolean(errors.HSCboard)} helperText={errors.HSCboard?.message} fullWidth onChange={(e) => (Details['HSCboard'] = e.target.value)} size='small' label="Board" />
                            </Grid>
                            <Grid item xs={10} md={3.5}>
                                <TextField multiline name='HSCschool' value={HSCschool} {...register("HSCschool", { required: "Enter the school Name", })} error={Boolean(errors.HSCschool)} helperText={errors.HSCschool?.message} fullWidth onChange={(e) => (Details['HSCschool'] = e.target.value)} size='small' label="School Name" />
                            </Grid>
                            <Grid item xs={10} md={3.5}>
                                <TextField multiline name='HSCPassedyear' value={HSCPassedyear} {...register("HSCyear", { required: "Enter the passed-out-year", })} error={Boolean(errors.HSCPassedyear)} helperText={errors.HSCPassedyear?.message} fullWidth onChange={(e) => (Details['HSCPassedyear'] = e.target.value)} size='small' label="passed-out-year" />
                            </Grid>
                            <Grid item xs={10} md={3.5}>
                                <TextField multiline fullWidth name='HSCpercentage' value={HSCpercentage} {...register("HSCpercentage", { required: "Enter the passed-out-year", })} error={Boolean(errors.HSCpercentage)} helperText={errors.HSCpercentage?.message} onChange={(e) => (Details['HSCpercentage'] = e.target.value)} size='small' label="percentage" />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Grid container rowGap={3} columnGap={5} paddingLeft={0} paddingTop={3}>
                            <Grid item xs={12}>
                                <Typography sx={{ fontWeight: "bold" }}>Under Graduate</Typography>
                            </Grid>
                            <Grid item xs={10} md={3.5}>
                                <TextField multiline name='UGDegreeName' value={UGDegreeName} {...register("UGDegreeName", { required: "Enter the Degree", maxLength: "15", })} error={Boolean(errors.UGDegreeName)} helperText={errors.UGDegreeName?.message} fullWidth onChange={(e) => (Details['UGDegreeName'] = e.target.value)} size='small' label="UGDegreeName" />
                            </Grid>
                            <Grid item xs={10} md={3.5}>
                                <TextField multiline name='UGCollegeName' value={UGCollegeName} {...register("UGCollegeName", { required: "Enter the College Name", })} error={Boolean(errors.UGCollegeName)} helperText={errors.UGCollegeName?.message} fullWidth onChange={(e) => (Details['UGCollegeName'] = e.target.value)} size='small' label="College Name" />
                            </Grid>
                            <Grid item xs={10} md={3.5}>
                                <TextField multiline name='UGCollegePassedYear' value={UGCollegePassedYear} {...register("UGCollegePassedYear", { required: "Enter the College Passed Year", })} error={Boolean(errors.UGCollegePassedYear)} helperText={errors.UGCollegePassedYear?.message} fullWidth onChange={(e) => (Details['UGCollegePassedYear'] = e.target.value)} size='small' label="passed-out-year" />
                            </Grid>
                            <Grid item xs={10} md={3.5}>
                                <TextField multiline fullWidth name='UGPercentage' value={UGPercentage} {...register("UGPercentage", { required: "Enter the College Percentage", })} error={Boolean(errors.UGPercentage)} helperText={errors.UGPercentage?.message} onChange={(e) => (Details['UGPercentage'] = e.target.value)} size='small' label=" Percentage" />
                            </Grid>
                        </Grid>
                    </TabPanel>
                </Box>
                {/*-------------------------------- education ---------------------------------*/}

                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Parent/Guardian Details</Typography>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField multiline name='GuardianName' value={GuardianName} {...register("GuardianName", { required: "Enter the Name", })} error={Boolean(errors.GuardianName)} helperText={errors.GuardianName?.message} fullWidth onChange={(e) => (Details['GuardianName'] = e.target.value)} size='small' label="Guardian/Parent Name" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField multiline name='ParentContactNumber' value={ParentContactNumber} {...register("ParentContactNumber", { required: "Enter the Parent Contact Number", })} error={Boolean(errors.ParentContactNumber)} helperText={errors.ParentContactNumber?.message} fullWidth onChange={(e) => setGaurdianNumber(e.target.value)} size='small' label="Parent Contact Number" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField multiline name='ParentOccupation' value={ParentOccupation}{...register("ParentOccupation", { required: "Enter the ParentOccupation", })} error={Boolean(errors.ParentOccupation)} helperText={errors.ParentOccupation?.message} fullWidth onChange={(e) => (Details['ParentOccupation'] = e.target.value)} size='small' label="ParentOccupation" />
                    </Grid>
                </Grid>

                {/* <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Additional Certifications <Button sx={{ backgroundColor: '#62b4ff' }} variant='contained' onClick={() => setAdditionalCertificate([...AdditionalCertificate, { "id": AdditionalCertificate.length + 1, "description": "" }])}>Add<AddCircleOutlineIcon /></Button></Typography>
                    </Grid>
                    {AdditionalCertificate.map((val, ind) => {
                        return (<Grid item xs={10} md={3.5}>
                            <TextField multiline name='Certification' onChange={(e) =>
                                (AdditionalCertificate[ind].description = (e.target.value))} fullWidth label="add here" size='small' />
                        </Grid>)
                    })}
                </Grid> */}

                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Course Details</Typography>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete
                            onChange={(e, v) => setCourseView(v)}
                            value={{ CourseName: CourseName }}
                            id="multiple-limit-tags"
                            size="small"
                            name='CourseName'
                            options={CourseView}
                            getOptionLabel={(option) => option.CourseName}
                            renderInput={(params) => (
                                <TextField multiline {...params} value={view?.CourseName || ''} label="CourseName" placeholder="CourseName" />
                            )}
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField multiline name='AdmissionFees' value={AdmissionFees}  {...register("AdmissionFees", { required: "Enter the AdmissionFees", })} error={Boolean(errors.AdmissionFees)} helperText={errors.AdmissionFees?.message} fullWidth onChange={(e) => setAdmissionFees(e.target.value)} size='small' label="AdmissionFees" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>

                        <TextField multiline name='Subject' value={view?.Subject || Subject} fullWidth label="Subject" size="small" >

                        </TextField>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField multiline name='Duration' value={view.Duration || Duration || ""} onChange={(e) => setDuration(e.target.value)} fullWidth label="Duration" size="small" />
                    </Grid>

                    {/* inputProps={{readOnly:true}} */}
                </Grid>




                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Batch Details</Typography>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete
                            onChange={(e, v) => setBatchBox(v)}
                            id="multiple-limit-tags"
                            size="small"
                            name='BatchName'
                            value={{ BatchName: BatchName }}
                            options={Batchview}
                            getOptionLabel={(option) => option.BatchName}
                            renderInput={(params) => (
                                <TextField multiline {...params} value={view?.BatchName || ''} label="BatchName" placeholder="BatchName" />
                            )}
                            sx={{ width: '100%' }}
                        />
                    </Grid>

                    <Grid item xs={10} md={3.5}>
                        <TextField multiline name='BatchStartingDate' InputLabelProps={{ shrink: true }} value={BatchBox.StartDate || BatchStartingDate} {...register("BatchStartingDate", { required: "Enter the BatchStartingDate", })} fullWidth size='small' label="BatchStartingDate" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField multiline name='Session' value={BatchBox.Session || Session} fullWidth label="Session" size="small" onChange={(e) => setSession(e.target.value)}>

                        </TextField>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField multiline select name='Batch' value={BatchNumber} fullWidth label="Batch" size="small" onChange={(e) => setBatchNumber(e.target.value)}>
                            <MenuItem value='I'>I</MenuItem>
                            <MenuItem value='II'>II</MenuItem>
                            <MenuItem value='III'>III</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={10} md={3.5}>
                        <TextField name='RegistrationDate' InputLabelProps={{ shrink: true }} type='date' value={RegDate} fullWidth onChange={(e) => (Details['RegistrationDate'] = e.target.value)} size='small' label="Registration Date" />
                    </Grid>
                    {/* inputProps={{readOnly:true}} */}
                </Grid>
                <Box sx={{ ml: 4 }}>
                    {params.action == 'viewid' ? '' : <Button variant="contained" color="primary" type='submit' disableRipple disableElevation sx={{ my: 4, mx: 1, }}>Add</Button>

                    }
                    <Link to="/Students">
                        <Button variant='contained' color='secondary' disableRipple disableElevation sx={{ my: 4, mx: 1, }}>cancel</Button>
                    </Link>
                </Box>
            </Box>
        </form>
    )
}




































