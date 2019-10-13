const nodemailer = require('nodemailer');
import 'dotenv/config';

const smtp_server = process.env.MAIL_SERVER || 'localhost';
const smtp_port = process.env.MAIL_PORT || 8025;
const smtp_user = process.env.MAIL_USER || 'smtp';
const smtp_password = process.env.MAIL_PASSWORD || 'smtp';

let transport = nodemailer.createTransport({
    host: smtp_server,
    port: smtp_port,
    auth: {
        user: smtp_user,
        pass: smtp_password
    }
});

module.exports = transport;