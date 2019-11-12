const sgMail = require('@sendgrid/mail');

const server_scheme = process.env.SERVER_SCHEME || 'http';
const server_port = process.env.SERVER_PORT || '3000';
const server_address = process.env.SERVER_ADDRESS || 'localhost';
const sender_email = process.env.SENDER_EMAIL || 'eco-ideas.com';
const valid_admin_email_address = process.env.VALID_ADMIN_EMAIL_ADDRESS || 'admin@eco-ideas.com';
const api_key = process.env.API_KEY;

sgMail.setApiKey(api_key);

exports.sendEmail = async (email_address, uuid) => {

    const registration_url = `${server_scheme}://${server_address}:${server_port}/create-account/${uuid}`;

    const body = `
    <h1>Please create an account</h1>
    <p>Click <a href=${registration_url}>here<a/> to create your account and finish the registration process</p>`;

    const text = `Go to ${registration_url} to create your account and finish the registration process`;

    const msg = {
        to: 'adambirse@gmail.com',
        from: sender_email,
        subject: 'Please create an account',
        text: text,
        html: body,
    };

    try {
        await sgMail.send(msg);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }

};

exports.checkEmail = (email_address) => {
    return (email_address === valid_admin_email_address);
};