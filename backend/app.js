const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
const API_PORT = process.env.PORT || 7000;
const app = express();

/** mongoose */
const dbRoute = "mongodb://localhost:27017/trideOPrint";

mongoose.Promise = global.Promise;
mongoose.connect(dbRoute, { useNewUrlParser: true }, (err) => {
    if (err) return console.log(err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const model = require('./src/model'); //call model
const router = require('./src/router'); //importing route
router(app);

app.listen(API_PORT, () => {
    console.log('Tride O\'Print RESTful API server started on port: ' + API_PORT);
});
