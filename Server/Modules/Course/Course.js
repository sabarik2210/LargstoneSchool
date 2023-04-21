const schema = require('../../Commonquerry');
const course_schema = new schema();

function Courses() {

    Courses.prototype.C_Func = function (req, cbk) {
        const action = req.params.action;
        const self = this;
        switch (action) {
            case 'view':
                self.View(req, cbk)
                break;
            case 'viewbyid':
                self.Viewbyid(req, cbk)
                break;
            case 'create':
                self.Create(req, cbk)
                break;
            case 'delete':
                self.Delete(req, cbk)
                break;
            case 'update':
                self.update(req, cbk)
                break;
            default:
                cbk(Status = 'false', err = 'not uploaded')
        }
    }

    Courses.prototype.View = function (req, cbk) {
        let query = 'select * from courses'
        course_schema.Retrive(query, (err, result) => {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Courses.prototype.Create = function (req, cbk) {

        var query = `INSERT INTO courses SET ? `
        course_schema.create(query, req.body, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            } else {
                cbk({ 'status': true, 'message': result })
            }
        });
    };

    Courses.prototype.Delete = function (req, cbk) {

        let query = `delete from courses where CourseID=?`
        course_schema.delete(query, req.body.CourseID, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }

    Courses.prototype.update = function (req, cbk) {
        let course_id = req.body.CourseID
        let query = `update  courses set ? where CourseID=?`
        course_schema.update(query, [req.body, course_id], function (err, result) {
            console.log(req.body);
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {

                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Courses.prototype.Viewbyid = function (req, cbk) {
        let query = `select * from courses where CourseID=?`
        course_schema.Viewbyid(query, req.body.CourseID, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
}

module.exports = Courses;