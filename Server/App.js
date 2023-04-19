const db = require('./DB/index');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyparse = require('body-parser');

app.use(cors());
app.use(bodyparse.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyparse.json());


const { Course_Route, Student_Route, Invoice_Route, Batch_Route } = require('./Router/commonRouter')
app.use('/', Course_Route, Student_Route, Invoice_Route, Batch_Route)


app.listen(8001, () => {
    console.log('Backend server is Running');
})