import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import InvoiceTable from '../pages/InvoiceTable'
import Invoice from '../pages/InvoiceForm'
import CourseForm from '../pages/CourseForm'
import CoursesTable from '../pages/CoursesTable'
import Students from '../pages/StudentTable'
import RegisterForm from '../pages/StudentsForm'
import BatchForm from '../pages/BatchForm'
import Batch from '../pages/BatchTable'
import PrintPage from '../pages/InvoicePrint'



const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/customers' exact component={Customers} />
            <Route path='/Students' exact component={Students} />
            <Route path='/Students/StudentsForm' exact component={RegisterForm} />


            <Route path='/Courses/CoursesForm' exact component={CourseForm} />
            <Route path='/Courses/CoursesForm/:action/:id' exact component={CourseForm} />

            <Route path='/Invoice/InvoiceForm/:action/:id' exact component={Invoice} />
            <Route path='/Invoice/InvoiceForm' exact component={Invoice} />

            <Route path='/Batch/BatchForm' exact component={BatchForm} />
            <Route path='/Batch/BatchForm/:action/:id' exact component={BatchForm} />

            <Route path='/Invoice' exact component={InvoiceTable} />
            <Route path='/Courses' exact component={CoursesTable} />
            <Route path='/Batch' exact component={Batch} />

            <Route path='/Accounts' exact component={Batch} />
            <Route path='/Accounts/AccountsForm' exact component={BatchForm} />


            <Route path='/print/:id' exact component={PrintPage} />



        </Switch>
    )
}

export default Routes
