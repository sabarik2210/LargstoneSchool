const schema = require('../../Commonquerry');
const students_schema = new schema();

function Students() {

    Students.prototype.Stu_Func = function (req, cbk) {
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

    Students.prototype.View = function (req, cbk) {
        let query = 'select * from student'
        students_schema.Retrive(query, (err, result) => {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Students.prototype.Create = function (req, cbk) {
        var query = `INSERT INTO student SET ? `
        students_schema.create(query, req.body, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            } else {
                cbk({ 'status': true, 'message': result })
            }
        });
    };

    Students.prototype.Delete = function (req, cbk) {
        let query = `delete from student where StudentID=?`
        students_schema.delete(query, req.body.StudentID, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }

    Students.prototype.update = function (req, cbk) {
        let StudentID = req.body.StudentID
        let query = `update  student set ? where StudentID=?`
        students_schema.update(query, [req.body, StudentID], function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Students.prototype.ViewbyID = function (req, cbk) {
        let query = `select * from student where StudentID=?`
        students_schema.viewByID(query, req.body.StudentID, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
}

module.exports = Students;