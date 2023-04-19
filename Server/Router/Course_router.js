const express = require('express');
const Course_Route = express.Router();
const Course_func = require('../Modules/Course/Course');
const Course = new Course_func();

Course_Route.post('/Courses/:action', function (req, res) {
    Course.C_Func(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'message': err })
        }
        else {
            res.json({ 'status': true, 'message': result })
        }
    })
})



module.exports = Course_Route;