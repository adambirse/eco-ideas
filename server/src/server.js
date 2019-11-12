const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

import 'dotenv/config';

const ideaRouter = require('./routes/IdeaRoutes');
const registrationRouter = require('./routes/RegistrationRoutes');

const db = require('./models');

const errorController = require('./controllers/errorController');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cookieParser());

app.use(ideaRouter);
app.use(registrationRouter);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  errorController.get404(req, res);
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
