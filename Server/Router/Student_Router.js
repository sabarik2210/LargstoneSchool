const express = require('express');
const Student_Route = express.Router();
const student_func = require('../Modules/Student_Register/Student');

const student = new student_func();

Student_Route.post('/students/:action', function (req, res) {
    student.Stu_Func(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'message': err })
        }
        else {
            res.json({ 'status': true, 'message': result })
        }
    })
})



module.exports = Student_Route;