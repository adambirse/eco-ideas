const express = require('express');
const registrationController = require('../controllers/RegistrationController');
const {check, validationResult} = require('express-validator/check');

const registrationRouter = express.Router();

registrationRouter.post('/api/create-account', [
    check('email_address').isEmail().withMessage('email address is not valid.'),
    check('password').isLength({min: 5}).withMessage('password must be a minimum of 5 characters.'),
], function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {
        registrationController.createAccount(req, res);
    }
});

registrationRouter.post('/api/authenticate', function (req, res) {
    registrationController.authenticate(req, res);
});

module.exports = registrationRouter;