import axios from 'axios';
import * as React from 'react';
import CommonTable from '../components/table/CommonTable';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import instance from './Host';


const CoursesTable = () => {

    const [Ans, setAns] = React.useState('')



    const view = (id) => {
        localStorage.setItem('viewbtn', true)
    }
    const Edit = (id) => {
        localStorage.setItem('viewbtn', false)
    }
    const Remove = (CourseID) => {
        console.log(typeof (id));

        instance.post('Courses/delete', { CourseID })
    }
    React.useEffect(() => {
        Remove()
        instance.post('Courses/view').then((res) => {
            setAns(res.data.message.message.message)
        })
    }, [])
    const header = [
        { field: "CourseID", headerName: "CourseID", width: 140, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "CourseName", headerName: "CourseName", width: 160, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "Fees", headerName: "Fees", width: 150, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "Subjects", headerName: "Subjects", width: 410, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "Duration", headerName: "Duration", width: 260, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        {
            field: "Action",
            width: 200,
            headerClassName: "super-app-theme--header", headerAlign: 'start',
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {


                return (
                    <>
                        <Link to={`/Courses/CoursesForm/viewid/${params.row.CourseID}`}>
                            <Button onClick={() => view()} sx={{ justifyContent: 'start', color: 'lightgray', p: 0 }}><VisibilityIcon /></Button>
                        </Link >

                        <Link to={`/Courses/CoursesForm/update/${params.row.CourseID}`}>
                            <Button onClick={() => Edit()} sx={{ justifyContent: 'start', color: 'blue', p: 0 }}><EditIcon /></Button>
                        </Link>
                        <Button onClick={() => Remove(params.row.CourseID)} sx={{ justifyContent: 'start', color: 'red', p: 0 }}><DeleteIcon /></Button>
                    </>
                )

            }
        },
    ];

    const rows = [...Ans]

    // const rows = [
    //     { id: 1, CourseID: "A10", CourseName: "Testing", Fees: "500000", Subject: "Selinium,Java", Duration: "6months", Terms: "3", AdmissionFees: "10000" },
    //     { id: 2, CourseID: "A11", CourseName: "Front-End Developement", Fees: "700000", Subject: "HTML,CSS,JS,React", Duration: "6months", Terms: "3", AdmissionFees: "10000" },
    //     { id: 3, CourseID: "A11", CourseName: "Front-End Developement", Fees: "700000", Subject: "HTML,CSS,JS,React", Duration: "6months", Terms: "3", AdmissionFees: "10000" },
    //     { id: 4, CourseID: "A11", CourseName: "Front-End Developement", Fees: "700000", Subject: "HTML,CSS,JS,React", Duration: "6months", Terms: "3", AdmissionFees: "10000" },
    //     { id: 5, CourseID: "A11", CourseName: "Front-End Developement", Fees: "700000", Subject: "HTML,CSS,JS,React", Duration: "6months", Terms: "3", AdmissionFees: "10000" },
    //     { id: 6, CourseID: "A11", CourseName: "Front-End Developement", Fees: "700000", Subject: "HTML,CSS,JS,React", Duration: "6months", Terms: "3", AdmissionFees: "10000" },
    //     { id: 7, CourseID: "A11", CourseName: "Front-End Developement", Fees: "700000", Subject: "HTML,CSS,JS,React", Duration: "6months", Terms: "3", AdmissionFees: "10000" },
    // ]

    return (
        <div style={{ overflowX: 'hidden' }}>
            <CommonTable header={header} rows={rows} id="CourseID" typo="Course Table" path="/Courses/CoursesForm" button="Create Courses" />
        </div>
    );
}

export default CoursesTable;