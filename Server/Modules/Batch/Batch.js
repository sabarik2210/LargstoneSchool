const schema = require('../../Commonquerry');
const batch_schema = new schema();

function Batch() {

    Batch.prototype.Batc_Func = function (req, cbk) {
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

    Batch.prototype.View = function (req, cbk) {
        let query = 'select * from Batch'
        batch_schema.Retrive(query, (err, result) => {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Batch.prototype.Create = function (req, cbk) {
        var query = `INSERT INTO Batch SET ? `
        batch_schema.create(query, req.body, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            } else {
                cbk({ 'status': true, 'message': result })
            }
        });
    };

    Batch.prototype.Delete = function (req, cbk) {
        let query = `delete from Batch where BatchID=?`
        batch_schema.delete(query, req.body.BatchID, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }

    Batch.prototype.update = function (req, cbk) {
        let BatchID = req.body.BatchID
        let query = `update  Batch set ? where BatchID=?`
        batch_schema.update(query, [req.body, BatchID], function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Batch.prototype.Viewbyid = function (req, cbk) {
        let query = `select * from Batch where BatchID=?`
        batch_schema.viewByID(query, req.body.BatchID, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
}

module.exports = Batch;