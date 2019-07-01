import sequelize from './database/database';

const itemController = require('./controllers/ItemController');

const express = require('express');
const app = express();

app.get('/api/ideas/test-data', (req, res) => {
    itemController.add("Create a compost bin", "Home");
    itemController.add("Turn the tap off when brushing your teeth", "Home");
    res.json('2 Items successfully created.');
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


