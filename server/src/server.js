import sequelize from './database/database';

const itemController = require('./controllers/ItemController');

const express = require('express');
const {check, validationResult} = require('express-validator/check');
var bodyParser = require("body-parser");

const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


let validCategories = ['Home', 'Work'];

app.post('/api/ideas/', [
    check('text').not().isEmpty().withMessage('Text must not be empty.'),
    check('category').isIn(validCategories).withMessage(`Must be one of these values (${validCategories})`)
], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {
        itemController.add(req, res);
    }
});

// An api endpoint that returns a short list of items
app.get('/api/ideas/', (req, res) => {
    itemController.findAll(req, res);
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.json('error');
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
