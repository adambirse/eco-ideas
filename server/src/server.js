import 'dotenv/config';
const express = require('express');
import data from './database/database';


const app = express();

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
    var list = ["item1", "item2", "item3"];
    res.json(data);
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.json('error');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(process.env.MY_SECRET); // an example of env variables
    console.log('App is listening on port ' + port);
});


