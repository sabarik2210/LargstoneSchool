const schema = require('../../Commonquerry');
const invoice_schema = new schema();

function Invoice() {

    Invoice.prototype.Inv_Func = function (req, cbk) {
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

    Invoice.prototype.View = function (req, cbk) {
        let query = 'select * from invoice'
        invoice_schema.Retrive(query, (err, result) => {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Invoice.prototype.Create = function (req, cbk) {
        var query = `INSERT INTO invoice SET ? `
        invoice_schema.create(query, req.body, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            } else {
                cbk({ 'status': true, 'message': result })
            }
        });
    };

    Invoice.prototype.Delete = function (req, cbk) {
        let query = `delete from invoice where InvoiceID=?`
        invoice_schema.delete(query, req.body.InvoiceID, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }

    Invoice.prototype.update = function (req, cbk) {
        let Invoice_ID = req.body.InvoiceID
        let query = `update  invoice set ? where InvoiceID=?`
        invoice_schema.update(query, [req.body, Invoice_ID], function (err, result) {
            console.log(req.body);
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                console.log('ji', result);
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Invoice.prototype.Viewbyid = function (req, cbk) {
        let query = `select * from Invoice where InvoiceID=?`
        invoice_schema.Viewbyid(query, req.body.InvoiceID, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
}

module.exports = Invoice;