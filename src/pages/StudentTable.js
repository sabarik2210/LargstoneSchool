import React, { useEffect, useState } from 'react'
import CommonTable from '../components/table/CommonTable'
import axios from 'axios'
import instance from './Host'


const Students = () => {

    const [Ans, setAns] = useState('')
    useEffect(() => {
        instance.post('students/view').then((res) => {
            setAns(res.data.message.message.message)
            console.log(res.data);
        })
    }, [])


    const header = [
        { field: 'studentID', headerName: 'studentID', width: 120, headerClassName: 'super-app-theme--header', headerAlign: 'start' },
        { field: 'RegistrationDate', headerName: 'RegistrationDate', width: 160, headerClassName: 'super-app-theme--header', headerAlign: 'start' },
        { field: 'StudentName', headerName: 'StudentName', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'start' },
        { field: 'StudentNumber', headerName: 'StudentNumber', width: 160, headerClassName: 'super-app-theme--header', headerAlign: 'start' },
        { field: 'Email', headerName: 'Email', width: 170, headerClassName: 'super-app-theme--header', headerAlign: 'start' },
        { field: 'DateofBirth', headerName: 'DateofBirth', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'start' },
        { field: 'UGDegreeName', headerName: 'qualification', width: 140, headerClassName: 'super-app-theme--header', headerAlign: 'start' },
        { field: 'GuardianName', headerName: 'GuardianName', width: 140, headerClassName: 'super-app-theme--header', headerAlign: 'start' },
        { field: 'ParentContactNumber', headerName: 'ParentContactNumber', width: 130, headerClassName: 'super-app-theme--header', headerAlign: 'start' },
        { field: 'CourseName', headerName: 'CourseName', width: 160, headerClassName: 'super-app-theme--header', headerAlign: 'start' },
        { field: 'AdmissionFees', headerName: 'AdmissionFees', width: 140, headerClassName: 'super-app-theme--header', headerAlign: 'start' },
        { field: 'BatchName', headerName: 'BatchName', width: 80, headerClassName: 'super-app-theme--header', headerAlign: 'start' },
        { field: 'BatchStartingDate', headerName: 'BatchStartingDate', width: 160, headerClassName: 'super-app-theme--header', headerAlign: 'start' },
    ]

    // const rows = [
    //     { id: 1, StudentID: "A09", RegistrationDate: "22-08-2022", StudentName: "Rajesh", StudentNumber: "Selinium,Java", Email: "6months", DateofBirth: "3", Education: "10000", ParentName: "45", ParentNumber: "23", AdmissionFees: "5466478", Batch: "2", BatchStartDate: "5-2-2020" },
    //     { id: 2, StudentID: "A10", RegistrationDate: "22-08-2022", StudentName: "suresh", StudentNumber: "Selinium,Java", Email: "6months", DateofBirth: "3", Education: "10000", ParentName: "45", ParentNumber: "23", AdmissionFees: "5466478", Batch: "2", BatchStartDate: "5-2-2020" },
    //     { id: 3, StudentID: "A11", RegistrationDate: "22-08-2022", StudentName: "kumar", StudentNumber: "Selinium,Java", Email: "6months", DateofBirth: "3", Education: "10000", ParentName: "45", ParentNumber: "23", AdmissionFees: "5466478", Batch: "2", BatchStartDate: "5-2-2020" },
    //     { id: 4, StudentID: "A12", RegistrationDate: "22-08-2022", StudentName: "karthik", StudentNumber: "Selinium,Java", Email: "6months", DateofBirth: "3", Education: "10000", ParentName: "45", ParentNumber: "23", AdmissionFees: "5466478", Batch: "2", BatchStartDate: "5-2-2020" },
    //     { id: 5, StudentID: "A13", RegistrationDate: "22-08-2022", StudentName: "jagan", StudentNumber: "Selinium,Java", Email: "6months", DateofBirth: "3", Education: "10000", ParentName: "45", ParentNumber: "23", AdmissionFees: "5466478", Batch: "2", BatchStartDate: "5-2-2020" },
    //     { id: 6, StudentID: "A14", RegistrationDate: "22-08-2022", StudentName: "Raja", StudentNumber: "Selinium,Java", Email: "6months", DateofBirth: "3", Education: "10000", ParentName: "45", ParentNumber: "23", AdmissionFees: "5466478", Batch: "2", BatchStartDate: "5-2-2020" },
    // ]

    const rows = [...Ans]
    console.log(rows)

    return (
        <div>

            <CommonTable header={header} rows={rows} id='studentID' typo="Student Table" path="/Students/StudentsForm" button="Student Register" />

        </div>
    )
}

export default Students;
