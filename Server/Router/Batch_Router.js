const express = require('express')
const Batch_Route = express.Router();
const Batc_Func = require('../Modules/Batch/Batch')
const Batch = new Batc_Func();

Batch_Route.post('/batch/:action', function (req, res) {
    Batch.Batc_Func(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'message': err })
        }
        else {
            res.json({ 'status': true, 'message': result })
        }
    })
})
module.exports = Batch_Route;