const nodemailer = require('nodemailer');
//TODO parameterise connections details
let transport = nodemailer.createTransport({
    host: 'localhost',
    port: 8025,
    auth: {
        user: 'smtp',
        pass: 'smtp'
    }
});

module.exports = transport;