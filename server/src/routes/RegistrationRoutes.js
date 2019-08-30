const express = require('express');
const registrationController = require('../controllers/RegistrationController');

const registrationRouter = express.Router();

registrationRouter.post('/api/register', function (req, res) {
    registrationController.register(req, res);
});

registrationRouter.post('/api/authenticate', function (req, res) {
    registrationController.authenticate(req, res);
});

module.exports = registrationRouter;