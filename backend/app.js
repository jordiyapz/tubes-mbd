const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const API_PORT = 7000;
const app = express();

/** mongoose */
const dbRoute = "mongodb://localhost:27017/trideOPrint";

mongoose.Promise = global.Promise;
mongoose.connect(dbRoute, { useNewUrlParser: true }, (err) => {
    if (err) return console.log(err);
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const model = require('./src/model');
const route = require('./src/route'); //importing route
route(app);

app.listen(API_PORT, () => {
    console.log('Tride O\'Print RESTful API server started on port: ' + API_PORT);
});
