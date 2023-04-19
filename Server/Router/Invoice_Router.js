const express = require('express')
const Invoice_Route = express.Router();
const Invoice_Func = require('../Modules/Invoice/Invoice')
const Invoice = new Invoice_Func();

Invoice_Route.post('/invoice/:action', function (req, res) {
    Invoice.Inv_Func(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'message': err })
        }
        else {
            res.json({ 'status': true, 'message': result })
        }
    })
})
module.exports = Invoice_Route;