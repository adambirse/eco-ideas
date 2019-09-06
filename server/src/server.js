var morgan = require('morgan');
const express = require('express');
var bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const app = express();

import 'dotenv/config';
const allowedOrigins = process.env.ALLOWED_ORIGINS || "http://localhost:3000";

const ideaRouter = require('./routes/IdeaRoutes');
const registrationRouter = require('./routes/RegistrationRoutes');

const db = require("./models");

const errorController = require('./controllers/errorController');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", allowedOrigins);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(ideaRouter);
app.use(registrationRouter);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    errorController.get404(req,res);
});


db.sequelize
    .sync()
    .then(result => {
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log('App is listening on port ' + port);
        });

    })
    .catch(err => {
        console.log(err);
    });
