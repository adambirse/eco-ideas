import sequelize from './database/database';

var morgan = require('morgan');
const express = require('express');
var bodyParser = require("body-parser");

const app = express();

const ideaRouter = require('./routes/IdeaRoutes');

const errorController = require('./controllers/errorController');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(ideaRouter);




// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    errorController.get404(req,res);
});


sequelize
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
